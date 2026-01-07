import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    nextBtn() {
        return 'boom';
    };

    render() {
        return `
            <h1>Manual Firmware</h1>
        `;
    };
};