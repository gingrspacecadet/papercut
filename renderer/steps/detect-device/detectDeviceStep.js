import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';
import { input } from "/app/modals.js";

export default class extends BaseStep {
    constructor() {
        super();
        this.detectionTimeout = null;
        this.stopped = false;
    };

    stopDetection() {
        this.stopped = true;

        if (this.detectionTimeout) {
            clearTimeout(this.detectionTimeout);
            this.detectionTimeout = null;
        };

        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        };
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
        if (this.stopped) return;

        try {
            const os = store.getProp("os");

            let cmd;
            if (os === "Win") {
                cmd = 'wmic logicaldisk where "DriveType=2" get DeviceID,VolumeName';
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
            this.stopDetection();
            store.set("error_message", "Failed to access system drive list");
            setTimeout(() => this.requestNavigate(6), 200);
        };
    };

    async parseDrives(stdOut) {
        const os = store.getProp("os");

        let found = false;
        let mounted_on = null;

        if (os === "Win") {
            const lines = stdOut
                .split(/\r?\n/)
                .map(l => l.trim())
                .filter(Boolean);

            lines.shift(); // remove headers

            for (const line of lines) {
                const [device, volume] = line.split(/\s{2,}/);

                if (volume && volume.toLowerCase().includes("kindle")) {
                    found = true;
                    mounted_on = `${device}\\`;
                    break;
                }
            }
        } else if (os === "OSX") {
            const data = this.parseOSXDrives(stdOut);
            
            const possibleDrives = data.filter((val) => val.mounted_on.startsWith("/Volumes/Kindle"));
            if (possibleDrives.length > 0) {
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
                            };

                            const mnt = await Neutralino.os.execCommand("mktemp -d");
                            const res = await Neutralino.os.execCommand(`sudo mount /dev/${part.name} ${mnt.stdOut}` , { stdIn: `${passwd}\n`});
                            if (res.exitCode !== 0) {
                                found = false;
                                return;
                            };

                            mounted_on = mnt.stdOut;
                        };
                    });
                };
            });
        };

        if (found) {
            this.stopDetection();

            store.set("kindle_connected", true);
            store.set("kindle_mounted_on", mounted_on);
            store.set("kindle_firmware", null);
            setTimeout(() => this.requestNavigate(2), 200);
        } else {
            this.retryTimeout = setTimeout(() => {
                if (!this.stopped) this.getDrives();
            }, 2000); // retry
        };
    };

    render() {
        this.setDisabled({ prev: true, next: true });

        this.startTimeout();
        this.pageChanged(() => this.stopDetection());
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