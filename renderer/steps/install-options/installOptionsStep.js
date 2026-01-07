import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextLabel() { return 'Install'; }

    render() {
        return `
            <h1>install options</h1>
        `;
    };
};