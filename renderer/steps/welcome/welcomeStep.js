import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    render() {
        return `
            <div class="welcome-layout">
                <h1>Welcome</h1>
                <p>Prepare to install Ubuntu. This process will guide you through partitioning and user setup.</p>
                <div class="icon-placeholder">🌐</div>
            </div>
        `;
    };
};