import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextDisabled() { return true; }
    get prevDisabled() { return true; }

    render() {
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