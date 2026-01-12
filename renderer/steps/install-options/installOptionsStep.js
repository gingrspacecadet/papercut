import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    validateVersion(version, min, max) {
        const isBelow = version.localeCompare(min, undefined, { numeric: true, sensitivity: 'base' });
        if (isBelow === -1) return false;

        const isAbove = version.localeCompare(max, undefined, { numeric: true, sensitivity: 'base' });
        if (isAbove === 1) return false;

        return true;
    };

    async populateMods() {
        const firmware = store.getProp("kindle_firmware");
        const list = this.shadowRoot.getElementById("mods");

        const jailbreaks = await Neutralino.resources.readFile("/renderer/data/jailbreaks.json");
        const jbs = JSON.parse(jailbreaks);

        let jailbreakFound = false;
        (() => {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown-section");

            const header = document.createElement("h3");
            header.textContent = 'Jailbreaks';
            header.classList.add("dropdown-header");

            const content = document.createElement("div");
            content.classList.add("dropdown-content");

            let checkedBest = false;
            jbs.forEach(({ min, max, jailbreak }) => {
                const label = document.createElement("label");
                label.classList.add("checkbox-item");

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "jailbreak_group";
                radio.value = jailbreak;
                radio.setAttribute('data-type', 'jailbreak');

                const isSupported = this.validateVersion(firmware, min, max);

                if (!isSupported) {
                    radio.disabled = true;
                    label.classList.add("disabled");
                };
                if (!checkedBest && isSupported) {
                    store.set("jailbreak_selected", jailbreak);
                    radio.checked = true;
                    checkedBest = true;
                    jailbreakFound = true;
                };

                label.appendChild(radio);
                label.appendChild(document.createTextNode(jailbreak));
                label.appendChild(document.createElement("br"));
                content.appendChild(label);
            });

            header.addEventListener("click", () => {
                header.classList.toggle("open");
                const isOpen = content.classList.toggle("open");

                if (isOpen) {
                    content.style.height = content.scrollHeight + "px";
                } else {
                    content.style.height = content.scrollHeight + "px";
                    requestAnimationFrame(() => {
                        content.style.height = "0px";
                    });
                }
            });

            dropdown.appendChild(header);
            dropdown.appendChild(content);
            list.appendChild(dropdown);
        })();

        if (jailbreakFound) {
            //this.setNextDisabled(false);
        } else {
            store.set("error_message", "No jailbreaks support your device");
            setTimeout(() => this.requestNavigate(2), 200);
        };

        const data = await Neutralino.resources.readFile("/renderer/data/mods.json");
        const mods = JSON.parse(data);

        Object.entries(mods).forEach(([sectionName, sectionMods]) => {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown-section");

            const header = document.createElement("h3");
            header.textContent = sectionName;
            header.classList.add("dropdown-header");

            const content = document.createElement("div");
            content.classList.add("dropdown-content");

            sectionMods.forEach(mod => {
                const label = document.createElement("label");
                label.classList.add("checkbox-item");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "mods[]";
                checkbox.value = mod;
                checkbox.setAttribute('data-type', 'mod');

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(mod));
                label.appendChild(document.createElement("br"));
                content.appendChild(label);
            });

            header.addEventListener("click", () => {
                header.classList.toggle("open");
                const isOpen = content.classList.toggle("open");

                if (isOpen) {
                    content.style.height = content.scrollHeight + "px";
                } else {
                    content.style.height = content.scrollHeight + "px";
                    requestAnimationFrame(() => {
                        content.style.height = "0px";
                    });
                }
            });

            dropdown.appendChild(header);
            dropdown.appendChild(content);
            list.appendChild(dropdown);
        });


        list.addEventListener("change", (e) => {
            const target = e.target;

            if (target.getAttribute('data-type') === 'jailbreak') {
                store.set("jailbreak_selected", target.value);
            };

            const selectedMods = [...this.shadowRoot.querySelectorAll('#mods input[data-type="mod"]:checked')].map(cb => cb.value);
            store.set("mods_enabled", selectedMods);
            
            if (selectedMods.length === 0) {
                this.setNextDisabled(true);
            } else {
                this.setNextDisabled(false);
            };
        });
    };

    render() {
        this.setNextLabel('Install');
        this.setNextDisabled(true);

        store.set("jailbreak_selected", null);
        store.set("mods_enabled", []);
        setTimeout(() => this.populateMods(), 50);

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