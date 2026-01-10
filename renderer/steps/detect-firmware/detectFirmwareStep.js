import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    async detectFirmware() {
        if (store.getProp("kindle_connected") === false || store.getProp("kindle_mounted_on") === null) {
            return setTimeout(() => this.requestNavigate(1), 200);
        };

        try {
            const verfile = await Neutralino.filesystem.readFile(store.getProp("kindle_mounted_on") + "/system/version.txt");
            const version = verfile.match(/Kindle\s+([\d.]+)/)[1]

            if (!verfile || !version) setTimeout(() => this.requestNavigate(1), 200);
            else {
                store.set("kindle_firmware", version);
                console.log(store.getProp("kindle_firmware"));
                setTimeout(() => this.requestNavigate(2), 200);
            };
        } catch {
            setTimeout(() => this.requestNavigate(1), 200);
        };
    };
    
    render() {
        this.setDisabled({ prev: true, next: true });

        this.detectFirmware();

        return `
            <div id="centered">
                <p id="prompt">
                    <img id="prompt-detail" src="/assets/Kindle_Versions.png" draggable="false"/>
                    Fetching Kindle's firmware version...
                </p>
                <span class="loader"></span>
            </div>
        `;
    };
};