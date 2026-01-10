import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    async showDevices() {
        if (store.getProp("OS") === "Linux") {
            const { stdOut } = await Neutralino.os.execCommand("lsblk -o NAME,VENDOR,MOUNTPOINTS -J");
            const data = JSON.parse(stdOut);
            const devices = [];
    
            const select = this.shadowRoot.getElementById("devices");
            data.blockdevices.forEach(device => {
                const option = document.createElement("option");
                option.value = device.name;
                option.textContent = `${device.vendor} - ${device.name}`;
                select.appendChild(option);
            });

            select.addEventListener("change", () => {
                // const selected = JSON.parse(select.value);
                console.log("Selected device ", select.value);
            });
        }
    }
    render() {
        this.showDevices();

        return `
            <h1>Manual Device</h1>
            <select id="devices"></select>
        `;
    };
};