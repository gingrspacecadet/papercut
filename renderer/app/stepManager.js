import { stepImports } from "./constants.js";

class StepManager extends HTMLElement {
    constructor() {
        super();
        this.steps = []; 
        this.currentStepIndex = 0;
        this.attachShadow({ mode: 'open' });
        this.initialized = false;
    }

    async connectedCallback() {
        await this.cacheSteps();
        this.render();
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
            
            const cssPath = ComponentPath.replace(".js","") + ".css";
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
            }

            return { tag: tagName, sheet };
        });

        this.steps = await Promise.all(setupTasks);
        this.initialized = true;
    };

    async navigate(dir) {
        const next = this.currentStepIndex + dir;
        if (next < 0 || next >= this.steps.length) return;

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                this.currentStepIndex = next;
                this.render();
            });
        } else {
            this.currentStepIndex = next;
            this.render();
        };
    };

    render() {
        if (!this.initialized) {
            this.shadowRoot.innerHTML = `<div class="loading">Loading Installer...</div>`;
            return;
        };

        const current = this.steps[this.currentStepIndex];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: -webkit-fill-available;
                    color: color(srgb 1 1 1 / 0.8);
                    font-family: "Adwaita Sans", Inter, "Roboto Flex", Roboto, "Noto Sans", "Helvetica Neue", Arial, sans-serif;
                }

                .content {
                    flex: 1;
                    padding: 30px;
                    view-transition-name: step-anim;
                    overflow: auto;
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
            </style>

            <div class="content" id="step-container"></div>

            <div class="footer">
                <button id="prev">Back</button>
                <button id="next">Next</button>
            </div>
        `;

        const el = document.createElement(current.tag);
        el.shadowRoot.adoptedStyleSheets = [current.sheet];
        this.shadowRoot.getElementById('step-container').appendChild(el);

        // read step state
        const nextBtn = this.shadowRoot.getElementById('next');
        const prevBtn = this.shadowRoot.getElementById('prev');

        nextBtn.textContent = el.nextLabel;
        prevBtn.textContent = el.prevLabel;

        nextBtn.disabled = el.nextDisabled;
        prevBtn.disabled = el.prevDisabled;

        this.shadowRoot.getElementById('prev').onclick = () => this.navigate(-1);
        this.shadowRoot.getElementById('next').onclick = () => this.navigate(1);
    };
};

customElements.define('step-manager', StepManager);