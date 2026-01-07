import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextLabel() { return 'Next'; }
    get prevLabel() { return 'Back'; }
    get nextDisabled() { return true; }
    get prevDisabled() { return true; }
    
    render() {
        return `
            <h1>done! YAY!</h1>
        `;
    };
};