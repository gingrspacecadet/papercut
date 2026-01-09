export class BaseStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    connectedCallback() {
        this.shadowRoot.innerHTML = this.render();
    };

    requestNavigate(direction = 1) {
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: { direction }
        }));
    }

    get nextLabel() { return 'Next'; }
    get prevLabel() { return 'Back'; }
    get nextDisabled() { return false; }
    get prevDisabled() { return false; }

    render() {
        return ``;
    };
};