import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    render() {
        return `
            <div id="centered">
                <p id="prompt">
                    <img id="prompt-detail" src="/assets/Kindle_Connected.png" draggable="false"/>
                    Detecting Kindle over USB...
                </p>
                <span class="loader"></span>
            </div>
        `;
    };
};