import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    render() {
        this.setNextDisabled(true);
        this.setPrevDisabled(true);

        setTimeout(() => {
            this.requestNavigate(1);
        }, 2000);
        
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