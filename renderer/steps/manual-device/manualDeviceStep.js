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
                if (!device.children) return;
                device.children.forEach(child => {
                    if (!child.mountpoints) return;
                    child.mountpoints.forEach(mount => {
                        if (!mount.startsWith("/")) return;
                        const option = document.createElement("option");
                        option.value = mount;
                        option.textContent = `${device.vendor} - ${child.name}@${mount}`;
                        select.appendChild(option);
                    })
                })
            });

            select.addEventListener("change", () => {
                // const selected = JSON.parse(select.value);
                this.setNextDisabled(false);
                store.set("kindle_connected", true);
                store.set("kindle_mounted_on", select.value)
                console.log("Selected mountpoint ", store.getProp("kindle_mounted_on"));
            });
        }
    }
    render() {
        this.setNextDisabled(true);
        this.showDevices();

        return `
            <h1>Manual Device</h1>
            <h2>Remember to mount your kindle!</h2>
            <select id="devices">
                <option value="" disabled selected hidden>Select the kindle drive</option>
            </select>
        `;
    };
};