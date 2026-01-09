import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextDisabled() { return true; }
    get prevDisabled() { return true; }

    render() {
        setTimeout(() => {
            this.requestNavigate(2);
        }, 2000);

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