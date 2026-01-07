import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextLabel() { return 'Continue'; }
    get prevDisabled() { return true; }

    render() {
        return `
            <div id="centered">
                <img id="logo" src="/assets/Logo_Light.png"/>
                <h3 id="version">Version 0.1.0</h3>
                <p id="description">
                    An installer for Kindle jailbreaks, hotfixes, and other mods.
                </p>
                <p id="creators">
                    Created By
                    <a href="https://huckle.dev">TheHuckle</a>
                    and
                    <a href="https://github.com/gingrspacecadet">gingrspacecadet</a>
                </p>
                <p id="prompt">
                    <img id="prompt-detail" src="/assets/Kindle_Connected.png"/>
                    Connect your Kindle over USB
                </p>
            </div>
        `;
    };
};