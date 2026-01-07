export class BaseStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    };

    connectedCallback() {
        this.shadowRoot.innerHTML = this.render();
    };

    render() {
        return ``;
    };
};