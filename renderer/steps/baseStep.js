export class BaseStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._nextLabel = 'Next';
        this._prevLabel = 'Back';
        this._nextDisabled = false;
        this._prevDisabled = false;
        this._changeCallback = () => {};
    };

    connectedCallback() {
        this.shadowRoot.innerHTML = this.render();
    };

    requestNavigate(direction = 1) {
        console.log("Step Navigation Event Emitted", { direction });
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
    get changeCallback() { return this._changeCallback; };

    // btn setters
    setNextDisabled(value = true) {
        console.log("Next Btn Disable State Changed:", this._nextDisabled);
        this._nextDisabled = Boolean(value);
        this._notifyUpdate();
    };

    setPrevDisabled(value = true) {
        console.log("Prev Btn Disable State Changed:", this._prevDisabled);
        this._prevDisabled = Boolean(value);
        this._notifyUpdate();
    };

    setNextLabel(text) {
        console.log("Next Btn Label State Changed:", this._nextLabel);
        this._nextLabel = text;
        this._notifyUpdate();
    };

    setPrevLabel(text) {
        console.log("Prev Btn Label State Changed:", this._prevLabel);
        this._prevLabel = text;
        this._notifyUpdate();
    };

    setLabels({ next, prev }) {
        console.log("Btn Labels States Changed:", { next, prev });
        if (next !== undefined) this._nextLabel = next;
        if (prev !== undefined) this._prevLabel = prev;
        this._notifyUpdate();
    };

    setDisabled({ next, prev }) {
        console.log("Btn Disabled States Changed:", { next, prev });
        if (next !== undefined) this._nextDisabled = next;
        if (prev !== undefined) this._prevDisabled = prev;
        this._notifyUpdate();
    };

    pageChanged(callback) {
        console.log("Page changed callback:", callback);
        this._changeCallback = callback;
    };

    _notifyUpdate() {
        console.log("Re-rendering buttons");
        this.dispatchEvent(new CustomEvent('step-update', {
            bubbles: true,
            composed: true
        }));
    };

    render() {
        console.log("Render Body is empty");
        return ``;
    };
};