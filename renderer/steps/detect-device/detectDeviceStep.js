import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    async getOS() {
        const existingVal = store.getProp("OS");
        if (typeof existingVal == "string") return existingVal; // return cached

        const os = await Neutralino.os.getEnv("OS");
        let osName = "Linux";

        if (os && os.includes("Windows")) osName = "Win";
        else if (navigator.userAgent.includes("Mac")) osName = "OSX";

        store.set("OS", osName); // reduce calls by caching os
        return osName;
    };

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
        const os = await this.getOS();

        let cmd;
        if (os === "Win") {
            cmd = 'wmic logicaldisk get name'; // idk if this works but it should!
        } else if (os === "OSX") {
            cmd = 'df -H';
        } else { // linux
            cmd = 'lsblk -J';
        };

        const result = await Neutralino.os.execCommand(cmd);
        return this.parseDrives(result.stdOut);
    };

    async parseDrives(stdOut) {
        const os = await this.getOS();

        if (os === "Win") {

        } else if (os === "OSX") {
            const data = this.parseOSXDrives(stdOut);
            
            const possibleDrives = data.filter((val) => val.mounted_on.startsWith("/Volumes/Kindle"));
            if (possibleDrives.length < 1) return;

            const mount = possibleDrives[0];
            if (!mount.mounted_on) return;

            store.set("kindle_connected", true);
            store.set("kindle_mounted_on", mount.mounted_on);
        } else { // linux
            const data = JSON.parse(stdOut);

            const mounts = [];
            data.blockdevices.forEach(device => {
                device.children.forEach(partition => {
                    partition.mountpoints.forEach(mount => {
                        if (/^\//.test(mount)) mounts.push(mount);
                    })
                });
            });

            let found = false;
            for (const mount of mounts) {
                try {
                    const stats = await Neutralino.filesystem.getStats(
                        mount + "/system/version.txt"
                    );
                    console.log(stats);
                    // found = true;
                } catch {
                    // file doesn't exist
                };
            };
            if (found === false) {
                // this.shadowRoot.getElementById("next").click()
                // document.querySelector("step-manager").navigate(1);
            };
        };
    };

    get nextDisabled() { return true; }
    get prevDisabled() { return true; }

    render() {
        this.getDrives();
        setTimeout(() => {
            this.requestNavigate(2);
        }, 2000);

        return `
            <div id="centered">
                <p id="prompt">
                    <img id="prompt-detail" src="/assets/Kindle_Connected.png" draggable="false"/>
                    Detecting Kindle over USB...
                    <div id="test"><div/>
                </p>
                <span class="loader"></span>
            </div>
        `;
    };
};