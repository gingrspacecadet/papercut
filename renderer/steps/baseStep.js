export class BaseStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    connectedCallback() {
        this.shadowRoot.innerHTML = this.render();
    };

    get nextLabel() { return 'Next'; }
    get prevLabel() { return 'Back'; }
    get nextDisabled() { return false; }
    get prevDisabled() { return false; }

    render() {
        return ``;
    };
};