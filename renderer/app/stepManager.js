import * as Neutralino from "../vendor/neutralino/neutralino.mjs";
import { stepImports } from "./constants.js";

class StepManager extends HTMLElement {
    constructor() {
        super();
        this.steps = [];
        this.currentStepIndex = 0;
        this.navigating = false;
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        await this.cacheSteps();
        this.renderStep();
    }

    toKebabCase(str) {
        return str.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
    }

    async cacheSteps() {
        const modules = await Promise.all(
            stepImports.map(path => import(path))
        );

        const setupTasks = modules.map(async (mod, index) => {
            const ComponentClass = mod.default;
            const ComponentPath = stepImports[index];

            const urlParts = ComponentPath.split('/');
            const fileNameWithExt = urlParts[urlParts.length - 1];
            const fileName = fileNameWithExt.split('.')[0];

            const tagName = this.toKebabCase(fileName);

            const cssPath = ComponentPath.replace(".js", "") + ".css";
            let sheet = new CSSStyleSheet();
            try {
                const response = await fetch(cssPath);
                if (response.ok) {
                    const cssText = await response.text();
                    await sheet.replace(cssText);
                }
            } catch (e) { console.warn(`CSS not found: ${cssPath}`); }

            if (!customElements.get(tagName)) {
                customElements.define(tagName, ComponentClass);
                console.log("Defined custom component", tagName, ComponentClass);
            }

            return { tag: tagName, sheet };
        });

        this.steps = await Promise.all(setupTasks);
        console.log("Cached Step .js and .css files");
    };

    navigate(dir) {
        if (this.navigating == true) return;

        const next = this.currentStepIndex + dir;
        if (next >= this.steps.length) return Neutralino.app.exit();
        if (next < 0) return;

        this.navigating = true;

        console.log("Navigating", dir);

        const container = this.shadowRoot.getElementById('step-container');
        const currentEl = container.firstElementChild;

        if (currentEl) {
            container.classList.remove('enter-prev', 'enter-next');
            container.classList.add(
                'step',
                dir > 0 ? 'exit-next' : 'exit-prev'
            );

            container.addEventListener('animationend', () => {
                this.currentStepIndex = next;
                this.renderStep(dir);
            }, { once: true });
        } else {
            this.currentStepIndex = next;
            this.renderStep(dir);
        };
    };

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: -webkit-fill-available;
                    color: color(srgb 1 1 1 / 0.8);
                    font-family: "Adwaita Sans", Inter, "Roboto Flex", Roboto, "Noto Sans", "Helvetica Neue", Arial, sans-serif;
                    overflow: clip;
                    position: fixed;
                }

                .content {
                    flex: 1;
                    padding: 30px;
                    overflow: auto;
                    margin: 10px;
                }

                .footer { 
                    display: flex;
                    justify-content: space-between;
                    gap: 12px; 
                    padding: 16px;
                }
                button { 
                    height: 32px;
                    min-width: 110px;
                    padding-bottom: 2px;
                    padding-left: 14px;
                    padding-right: 14px;
                    padding-top: 2px;
                    border-radius: 6px;
                    border: none;
                    background-color: color(srgb 1 1 1 / 0.12);
                    color: color(srgb 1 1 1 / 0.8);
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 13px;
                    text-align: center;
                    text-overflow: ellipsis;
                    text-wrap-mode: nowrap;
                    white-space-collapse: collapse;
                    -webkit-user-select: none;
                }
                button:hover {
                    background-color: color(srgb 1 1 1 / 0.18);
                }
                button:active {
                    background-color: color(srgb 1 1 1 / 0.28);
                }
                button:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                /* base */
                .step {
                    animation-duration: 250ms;
                    animation-fill-mode: both;
                }

                /* OUT */
                .step.exit-next {
                    animation-name: fade-out, slide-out-left;
                }
                .step.exit-prev {
                    animation-name: fade-out, slide-out-right;
                }

                /* IN */
                .step.enter-next {
                    animation-name: fade-in, slide-in-right;
                }
                .step.enter-prev {
                    animation-name: fade-in, slide-in-left;
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                }
                @keyframes fade-out {
                    to { opacity: 0; }
                }

                @keyframes slide-in-right {
                    from { transform: translateX(20px); }
                }
                @keyframes slide-in-left {
                    from { transform: translateX(-20px); }
                }

                @keyframes slide-out-left {
                    to { transform: translateX(-20px); }
                }
                @keyframes slide-out-right {
                    to { transform: translateX(20px); }
                }

                /* width */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                /* Track */
                ::-webkit-scrollbar-track {
                    background: transparent;
                }

                /* Handle */
                ::-webkit-scrollbar-thumb {
                    transition: background 0.3s;
                    background: #2f2f2fff;
                    border-radius: 10px;
                }

                /* Handle on hover */
                ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            </style>

            <div class="content" id="step-container">
                <div class="loading">Loading PaperCut..</div>
            </div>

            <div class="footer">
                <button id="prev">Back</button>
                <button id="next">Next</button>
            </div>
        `;

        this.shadowRoot.getElementById('prev').onclick = () => this.navigate(-1);
        this.shadowRoot.getElementById('next').onclick = () => this.navigate(1);

        document.addEventListener("keypress", (e) => {
            if (e.key == "Backspace" &&
                this.shadowRoot.getElementById('prev').disabled == false
            ) {
                this.navigate(-1);
            };
            if (e.key == "Enter" &&
                this.shadowRoot.getElementById('next').disabled == false
            ) {
                this.navigate(1);
            };
        });

        console.log("Renderer Step Container");
    };

    renderStep(dir = 1) {
        const container = this.shadowRoot.getElementById('step-container');
        container.innerHTML = ``;

        const current = this.steps[this.currentStepIndex];
        const el = document.createElement(current.tag);

        el.addEventListener('navigate', (e) => {
            this.navigate(e.detail.direction);
        });
        el.addEventListener('step-update', () => {
            this.syncButtons(el);
        });

        el.shadowRoot.adoptedStyleSheets = [current.sheet];
        container.appendChild(el);

        el.parentElement.classList.remove('exit-prev', 'exit-next');
        el.parentElement.classList.add(
            'step',
            dir > 0 ? 'enter-next' : 'enter-prev'
        );

        this.syncButtons(el);

        setTimeout(() => this.navigating = false, 100);

        console.log("Renderer Step:", current.tag);
    };

    syncButtons(el) {
        const nextBtn = this.shadowRoot.getElementById('next');
        const prevBtn = this.shadowRoot.getElementById('prev');

        nextBtn.textContent = el.nextLabel;
        prevBtn.textContent = el.prevLabel;

        nextBtn.disabled = el.nextDisabled;
        prevBtn.disabled = el.prevDisabled;

        console.log("Buttons Sync:", el);
    };
};

customElements.define('step-manager', StepManager);