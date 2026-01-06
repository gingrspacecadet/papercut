import { LitElement, html } from '../../vendor/lit/lit-core.min.js';
class WelcomeStep extends LitElement {
    render() {
        return html`
            <x-box vertical>
                <h1>Welcome to Ubuntu</h1>
                <p>This will guide you through the installation process.</p>
            </x-box>
        `;
    };
};

customElements.define('welcome-step', WelcomeStep);