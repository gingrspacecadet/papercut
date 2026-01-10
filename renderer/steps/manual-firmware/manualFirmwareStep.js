import { BaseStep } from '../baseStep.js';
import { input } from "/app/modals.js";
import { store } from '../../app/store.js';

function validateVersion(version, min, max) {
    const isBelow = version.localeCompare(min, undefined, { numeric: true, sensitivity: 'base' });
    if (isBelow === -1) return false;

    const isAbove = version.localeCompare(max, undefined, { numeric: true, sensitivity: 'base' });
    if (isAbove === 1) return false;

    return true;
};

export default class extends BaseStep {

    async getFirmware() {
        const ver = await input({
            title: "Kindle Firmware not detected",
            message: "Please enter your kindle's firmware version",
            placeholder: "i.e. 5.12.2.2",
            confirmText: "OK",
            cancelText: "Cancel",
            validate: async (text) => {
                if (validateVersion(text, "1.2", "5.18.6")) {
                    return;
                } else {
                    return "Invalid firmware version"
                }
            }
        });

        store.set("kindle_firmware", ver);

        setTimeout(() => this.requestNavigate(1), 200);
    }

    render() {
        this.getFirmware();
        this.setDisabled({ prev: true, next: true });

        return `
            <h1>Manual Firmware</h1>
        `;
    };
};