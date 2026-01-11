import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    parseOSXDrives(stdout) {
        const lines = stdout
            .trim()
            .split("\n")
            .filter(Boolean);

        const header = lines.shift();

        const headers = header
            .replace("Mounted on", "Mounted_on")
            .split(/\s+/)
            .map(h => h.toLowerCase());

        return lines.map(line => {
            const parts = line.split(/\s+/);

            if (parts.length > headers.length) {
                const fixed = parts.slice(0, headers.length - 1);
                fixed.push(parts.slice(headers.length - 1).join(" "));
                return this.parseOSXDrives_mapRow(headers, fixed);
            };

            return this.parseOSXDrives_mapRow(headers, parts);
        });
    };

    parseOSXDrives_mapRow(headers, values) {
        const obj = {};
        headers.forEach((h, i) => {
            obj[h] = values[i];
        });
        return obj;
    };

    async getDrives() {
        try {
            const os = store.getProp("OS");

            let cmd;
            if (os === "Win") {
                cmd = 'wmic logicaldisk get name'; // idk if this works but it should!
            } else if (os === "OSX") {
                cmd = 'df -H';
            } else { // linux
                cmd = 'lsblk -o NAME,VENDOR,MOUNTPOINTS -J';
            };

            const result = await Neutralino.os.execCommand(cmd);
            if (result.exitCode !== 0) {
                throw new Error(result.stdErr);
            };

            return this.parseDrives(result.stdOut);
        } catch (err) {
            console.error("Failed to fetch drives:", err);
            store.set("error_message", "Failed to access system drive list");
            setTimeout(() => this.requestNavigate(5), 200);
        };
    };

    async parseDrives(stdOut) {
        const os = store.getProp("OS");
        const select = this.shadowRoot.getElementById("devices");
        const previousValue = select.value;
        select.innerHTML = `<option value="" disabled selected hidden>Select a drive</option>`;

        if (os === "Win") {

        } else if (os === "OSX") {
            const data = this.parseOSXDrives(stdOut);
            
            const possibleDrives = data.filter((val) => val.mounted_on.startsWith("/"));
            if (possibleDrives.length > 0) {
                possibleDrives.forEach(mount => {
                    if (mount.mounted_on) {
                        const vendor = mount.mounted_on.replace("/Volumes/", "");
                        const option = document.createElement("option");
                        option.value = mount.mounted_on;
                        option.textContent = `${vendor} - ${mount.filesystem}@${mount.mounted_on}`;
                        select.appendChild(option);
                    };
                });
            };
        } else { // linux
            const data = JSON.parse(stdOut);
        
            data.blockdevices.forEach(device => {
                if (!device.children) return;
                device.children.forEach(child => {
                    if (!child.mountpoints) return;
                    child.mountpoints.forEach(mount => {
                        if (!mount.startsWith("/")) return;
                        const option = document.createElement("option");
                        option.value = mount;
                        option.textContent = `${device.vendor} - ${child.name}@${mount}`;
                        select.appendChild(option);
                    });
                });
            });
        };

        if (previousValue && [...select.options].some(o => o.value === previousValue)) {
            select.value = previousValue;
        } else {
            select.selectedIndex = 0;
        };
    };

    registerListener() {
        const select = this.shadowRoot.getElementById("devices");
        select.addEventListener("change", () => {
            this.setNextDisabled(false);
            store.set("kindle_connected", true);
            store.set("kindle_mounted_on", select.value)
        });
    };

    render() {
        this.setNextDisabled(true);

        setTimeout(() => {
            this.registerListener();

            const intervalId = setInterval(() => this.getDrives(), 2000);
            this.pageChanged(() => clearInterval(intervalId));
            
            this.getDrives();
        }, 50);

        return `
            <h1>Manual Device</h1>
            <div id="centered">
                <div id="container">
                    <p>Select the Kindle's Drive:</p>
                    <select id="devices">
                        <option value="" disabled selected hidden>Select a drive</option>
                    </select>
                    <a>Can't see your Kindle? Check if it is mounted</a>
                </div>
            </div>
        `;
    };
};