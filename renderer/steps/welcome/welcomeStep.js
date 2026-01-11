import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    async getOS() {
        const existingVal = store.getProp("os");
        if (typeof existingVal == "string") return existingVal; // return cached

        const os = await Neutralino.os.getEnv("OS");
        let osName = "Linux";

        if (os && os.includes("Windows")) osName = "Win";
        else if (navigator.userAgent.includes("Mac")) osName = "OSX";

        store.set("os", osName); // reduce calls by caching os
        return osName;
    };

    render() {
        this.setNextLabel("Continue");
        this.setPrevDisabled(true);

        this.getOS();

        setTimeout(() => {
            this.shadowRoot.querySelector("#infobar > .link:first-child").onclick = () =>
                Neutralino.os.open("https://github.com/gingrspacecadet/papercut/releases");

            this.shadowRoot.querySelector("#infobar > .link:last-child").onclick = () =>
                Neutralino.os.open("https://github.com/gingrspacecadet/papercut");

            this.shadowRoot.querySelector("#creators > a:first-child").onclick = () =>
                Neutralino.os.open("https://huckle.dev/");

            this.shadowRoot.querySelector("#creators > a:last-child").onclick = () =>
                Neutralino.os.open("https://github.com/gingrspacecadet/");
        }, 50);

        return `
            <div id="centered">
                <img id="logo" src="/assets/Logo_Light.png" draggable="false"/>
                <div id="infobar">
                    <a class="link" href="#">Releases</a>
                    <a id="version">Version 0.1.0</a>
                    <a class="link" href="#">Github</a>
                </div>
                <p id="description">
                    An installer for Kindle jailbreaks, hotfixes, and other mods.
                </p>
                <p id="creators">
                    Created By
                    <a href="#">TheHuckle</a>
                    and
                    <a href="#">gingrspacecadet</a>
                </p>
                <p id="prompt">
                    <img id="prompt-detail" src="/assets/Kindle_Connected.png" draggable="false"/>
                    Connect your Kindle over USB
                </p>
            </div>
        `;
    };
};