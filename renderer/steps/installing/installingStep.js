import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextDisabled() { return true; }
    get prevDisabled() { return true; }

    render() {
        return `
            <h1>Installing... beep bop</h1>
        `;
    };
};