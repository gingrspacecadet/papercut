import { LitElement, html, css } from '../vendor/lit/lit-core.min.js';
import { steps } from "./constants.js";

class StepManager extends LitElement {
    static properties = {
        currentStepIndex: { type: Number },
        steps: { type: Array }
    };

    constructor() {
        super();
        this.currentStepIndex = 0;
        this.steps = steps;
    };

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            height: 400px;
            width: 600px;
            border: 1px solid #ccc;
        }
        .content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }
        .footer {
            display: flex;
            justify-content: flex-end;
            padding: 10px;
            gap: 10px;
            background: var(--xel-panel-background, #f5f5f5);
        }
    `;

    render() {
        const currentTag = this.steps[this.currentStepIndex];

        return html`
            <div class="content">
                ${this.renderStep(currentTag)}
            </div>

            <div class="footer">
                <x-button @click="${this.previous}" ?disabled="${this.currentStepIndex === 0}">
                <x-label>Back</x-label>
                </x-button>
                
                <x-button @click="${this.next}" variant="primary">
                <x-label>${this.currentStepIndex === this.steps.length - 1 ? 'Finish' : 'Next'}</x-label>
                </x-button>
            </div>
        `;
    };

    renderStep(tagName) {
        const tag = document.createElement(tagName);
        return html`${tag}`;
    };

    next() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
        };
    };

    previous() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
        };
    };
};

customElements.define('step-manager', StepManager);