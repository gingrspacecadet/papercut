import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    async populateMods() {
        const data = await Neutralino.resources.readFile("/renderer/data/mods.json");
        const mods = JSON.parse(data);

        const list = this.shadowRoot.getElementById("mods");
        mods.mods.forEach(mod => {
            const label = document.createElement("label");
            label.classList.add("checkbox-item");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "mods[]";
            checkbox.value = mod;
            
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(mod));
            label.appendChild(document.createElement("br"));
            list.appendChild(label);
        });
        
        list.addEventListener("change", () => {
            const selected = [...this.shadowRoot.querySelectorAll('#mods input:checked')].map(cb => cb.value);
            store.set("mods_enabled", selected);
            if (selected.length === 0) {
                this.setNextDisabled(true);
            } else {
                this.setNextDisabled(false);
            }
        });
    }

    render() {
        this.setNextLabel('Install');
        this.setNextDisabled(true);
        this.populateMods();

        return `
            <div id="centered">
                <h1>Install Options</h1>
                <div id="container">
                    <p>Choose the modifications you want to install:</p>
                    <div id="mods"></div>
                </div>
            </div>
        `;
    };
};