import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    render() {
        this.setDisabled({ prev: true, next: true });

        setTimeout(() => {
            this.requestNavigate(1);
        }, 2000);
        console.log(`Firmware version ${store.getProp("kindle_firmware")}`);
        console.log(`Mods to be installed: ${store.getProp("mods_enabled")}`);
        console.log(`Drive to install to: ${store.getProp("kindle_mounted_on")}`);
        
        return `
            <div id="centered">
                <p id="prompt">
                    <img id="prompt-hammer" src="/assets/Hammer.png" draggable="false"/>
                    <img id="prompt-detail" src="/assets/Kindle_Connected.png" draggable="false"/>
                    Installing selected options...
                </p>
                <span class="loader"></span>
            </div>
        `;
    };
};