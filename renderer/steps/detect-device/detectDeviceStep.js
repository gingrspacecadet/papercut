import { BaseStep } from '../baseStep.js';
import '/app/state.js';

import * as Neutralino from "/vendor/neutralino/neutralino.mjs";

export default class extends BaseStep {
    async getDrives() {
        const os = await Neutralino.os.getEnv("OS");
        window.STATE.OS = os;   // store it globally to reduce calls

        let cmd;
        if (os && os.includes("Windows")) {
            cmd = 'wmic logicaldisk get name'; // idk if this works but it should!
        } else if (navigator.userAgent.includes("Mac")) {
            cmd = 'df -H';
        } else {
            cmd = 'lsblk -J';
        }

        const result = await Neutralino.os.execCommand(cmd);
        return this.parseDrives(result.stdOut);
    }

    async parseDrives(json) {
        const data = JSON.parse(json);
        const os = window.STATE.OS;

        if (os && os.includes("Windows")) {

        } else if (navigator.userAgent.includes("Mac")) {

        } else {
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
                }
            }
            if (found === false) {
                // this.shadowRoot.getElementById("next").click()
                // document.querySelector("step-manager").navigate(1);
            }
        }
    }

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