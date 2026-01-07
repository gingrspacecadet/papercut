export class DetectDeviceStep extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <h1>Detecting Kindle..</h1>
            <p>beep* boop* bop.</p>
        `;
    }
}
customElements.define('detect-device-step', DetectDeviceStep);