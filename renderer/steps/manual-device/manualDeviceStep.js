import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    async getDrives() {
        try {
            const os = store.getProp("os");

            let cmd;
            if (os === "Win") {
                cmd = 'wmic logicaldisk get name'; // idk if this works but it should!
            } else if (os === "OSX") {
                cmd = 'system_profiler SPStorageDataType -json';
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
        const os = store.getProp("os");
        const select = this.shadowRoot.getElementById("devices");

        const previousValue = select.value;
        select.innerHTML = `<option value="" disabled selected hidden>Select a drive</option>`;

        if (os === "Win") {

        } else if (os === "OSX") {
            const data = JSON.parse(stdOut);

            if (data.SPStorageDataType && data.SPStorageDataType.length > 0) {
                const allDrives = data.SPStorageDataType;
                const possibleDrives = allDrives.filter((val) => val._name && val.bsd_name && val.mount_point && val.mount_point.startsWith("/") && val.writable === "yes");
                if (possibleDrives.length > 0) {
                    possibleDrives.forEach(mount => {
                        const option = document.createElement("option");
                        option.value = mount.mount_point;
                        option.textContent = `${mount._name} - ${mount.bsd_name}@${mount.mount_point}`;
                        select.appendChild(option);
                    });
                };
            };
            
            /*const possibleDrives = data.filter((val) => val.mounted_on.startsWith("/"));
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
            };*/
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