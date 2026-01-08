import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    render() {
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