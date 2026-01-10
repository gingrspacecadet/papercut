import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';
import { input } from "/app/modals.js";

export default class extends BaseStep {
    constructor() {
        super();
        this.detectionTimeout = null;
    };

    startTimeout(seconds = 6) {
        this.detectionTimeout = setTimeout(() => {
            this.requestNavigate(1); // manual mode
        }, seconds * 1000);
    };

    clearTimeout() {
        if (this.detectionTimeout) {
            clearTimeout(this.detectionTimeout);
        };
    };

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
        try {
            const os = await this.getOS();

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
            this.clearTimeout();
            store.set("error_message", "Failed to access system drive list");
            setTimeout(() => this.requestNavigate(6), 200);
        };
    };

    async parseDrives(stdOut) {
        const os = await this.getOS();

        let found = false;
        let mounted_on = null;

        if (os === "Win") {

        } else if (os === "OSX") {
            const data = this.parseOSXDrives(stdOut);
            
            const possibleDrives = data.filter((val) => val.mounted_on.startsWith("/Volumes/Kindle"));
            if (possibleDrives.length < 1) {
                const mount = possibleDrives[0];
                if (mount.mounted_on) {
                    found = true;
                    mounted_on = mount.mounted_on;
                };
            };
        } else { // linux
            const data = JSON.parse(stdOut);
            const mounts = [];

            data.blockdevices.forEach(device => {
                if (device.vendor && device.vendor.toLowerCase().includes("kindle")) {
                    device.children.forEach(async part => {
                            found = true;
                            if (part.mountpoints.some(point => point.startsWith("/"))) {
                                mounts.push(part.name);
                                mounted_on = part.mountpoints.find(point => point.startsWith("/"));
                            } else {
                                let passwd = null;
                                const passwdNeeded = await Neutralino.os.execCommand("sudo -n true");
                                if (passwdNeeded.exitCode !== 0) {
                                    passwd = await input({
                                        title: "Password needed",
                                        message: "Enter your password",
                                        placeholder: "",
                                        confirmText: "OK",
                                        cancelText: "Cancel",
                                        validate: async (text) => {
                                            const result = await Neutralino.os.execCommand('sudo -v', {
                                                stdIn: `${text}\n`
                                            });
                                            if (result.exitCode !== 0) return "The password is incorrect"
                                            return;
                                        }
                                    });
                                }

                                const mnt = await Neutralino.os.execCommand("mktemp -d").stdOut;
                                const res = await Neutralino.os.execCommand(`sudo mount /dev/${part.name} ${mnt}` , { stdIn: `${passwd}\n`});
                                if (res.exitCode !== 0) {
                                    found = false;
                                    return;
                                }

                                mounted_on = mnt;
                            };
                    });
                };
            });
        };

        if (found) {
            this.clearTimeout();

            store.set("kindle_connected", true);
            store.set("kindle_mounted_on", mounted_on);
            this.requestNavigate(2);
        } else {
            setTimeout(() => this.getDrives(), 2000); // retry
        };
    };

    render() {
        this.setDisabled({ prev: true, next: true });

        this.startTimeout();
        this.getDrives();

        return `
            <div id="centered">
                <p id="prompt">
                    <img id="prompt-detail" src="/assets/Kindle_Connected.png" draggable="false"/>
                    Detecting Kindle over USB...
                </p>
                <span class="loader"></span>
            </div>
        `;
    };
};