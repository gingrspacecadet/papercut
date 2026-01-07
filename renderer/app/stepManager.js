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
        const isLast = this.currentStepIndex === this.steps.length - 1;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex; flex-direction: column;
                    width: 640px; height: 440px;
                    background: #300a24; color: white; border-radius: 8px;
                    font-family: 'Ubuntu', system-ui, sans-serif;
                }
                .content { flex: 1; padding: 30px; view-transition-name: step-anim; }
                .footer { 
                    display: flex; justify-content: flex-end; gap: 12px; 
                    padding: 16px 24px; background: rgba(0,0,0,0.3); 
                }
                button { 
                    padding: 6px 22px; border-radius: 4px; border: 1px solid #111;
                    background: #5E2750; color: white; cursor: pointer; font-weight: 500;
                }
                button.primary { background: #E95420; border-color: #AD3E17; }
                button:disabled { opacity: 0.3; cursor: not-allowed; }
                .loading { display: flex; align-items: center; justify-content: center; height: 100%; }
            </style>

            <div class="content" id="step-container"></div>

            <div class="footer">
                <button id="prev" ${this.currentStepIndex === 0 ? 'disabled' : ''}>Back</button>
                <button id="next" class="primary">${isLast ? 'Finish' : 'Next'}</button>
            </div>
        `;

        const el = document.createElement(current.tag);
        el.shadowRoot.adoptedStyleSheets = [current.sheet];
        this.shadowRoot.getElementById('step-container').appendChild(el);

        this.shadowRoot.getElementById('prev').onclick = () => this.navigate(-1);
        this.shadowRoot.getElementById('next').onclick = () => this.navigate(1);
    };
};

customElements.define('step-manager', StepManager);