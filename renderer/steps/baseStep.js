export class BaseStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._nextLabel = 'Next';
        this._prevLabel = 'Back';
        this._nextDisabled = false;
        this._prevDisabled = false;
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
    };

    // btn getters
    get nextLabel() { return this._nextLabel; };
    get prevLabel() { return this._prevLabel; };
    get nextDisabled() { return this._nextDisabled; };
    get prevDisabled() { return this._prevDisabled; };

    // btn setters
    setNextDisabled(value = true) {
        this._nextDisabled = Boolean(value);
        this._notifyUpdate();
    };

    setPrevDisabled(value = true) {
        this._prevDisabled = Boolean(value);
        this._notifyUpdate();
    };

    setNextLabel(text) {
        this._nextLabel = text;
        this._notifyUpdate();
    };

    setPrevLabel(text) {
        this._prevLabel = text;
        this._notifyUpdate();
    };

    setLabels({ next, prev }) {
        if (next !== undefined) this._nextLabel = next;
        if (prev !== undefined) this._prevLabel = prev;
        this._notifyUpdate();
    };

    setDisabled({ next, prev }) {
        if (next !== undefined) this._nextDisabled = next;
        if (prev !== undefined) this._prevDisabled = prev;
        this._notifyUpdate();
    };

    _notifyUpdate() {
        this.dispatchEvent(new CustomEvent('step-update', {
            bubbles: true,
            composed: true
        }));
    };

    render() {
        return ``;
    };
};