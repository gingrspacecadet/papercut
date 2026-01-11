import * as Neutralino from "/vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    initDropdown() {
        // code below inside this function is taken from https://codepen.io/ibaslogic/pen/NPKdday. All credits given.
        const customSelect = this.shadowRoot.querySelector(".custom-select");
        const selectButton = customSelect.querySelector(".select-button");
        const dropdown = customSelect.querySelector(".select-dropdown");
        const options = dropdown.querySelectorAll("li");
        const selectedValue = selectButton.querySelector(".selected-value");

        let focusedIndex = -1;

        const toggleDropdown = (expand = null) => {
            const isOpen =
                expand !== null ? expand : dropdown.classList.contains("hidden");
            dropdown.classList.toggle("hidden", !isOpen);
            selectButton.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                focusedIndex = [...options].findIndex((option) =>
                    option.classList.contains("selected")
                );
                focusedIndex = focusedIndex === -1 ? 0 : focusedIndex;
                updateFocus();
            } else {
                focusedIndex = -1;
            };
        };

        const updateFocus = () => {
            options.forEach((option, index) => {
                if (option) {
                    option.setAttribute("tabindex", index === focusedIndex ? "0" : "-1");
                    if (index === focusedIndex) option.focus();
                }
            });
        };

        const handleOptionSelect = (option) => {
            options.forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedValue.textContent = option.textContent.trim(); // Update selected value

            if (option.dataset.value === "clear") {
                // Reset to the default value
                selectedValue.textContent = "Select a drive";
                options.forEach((opt) => opt.classList.remove("selected"));
                customSelect.dispatchEvent(
                    new CustomEvent("change", {
                        bubbles: true,
                        composed: true,
                        detail: { value: undefined }
                    })
                );
                return;
            }

            const value = option.dataset.value ?? option.value;
            customSelect.dispatchEvent(
                new CustomEvent("change", {
                    bubbles: true,
                    composed: true,
                    detail: { value }
                })
            );
        };

        this.shadowRoot.addEventListener("click", (e) => {
            const option = e.target.closest('li[role="option"]');
            if (!option) return;

            handleOptionSelect(option);
            toggleDropdown(false);
        });

        dropdown.addEventListener("clear", () => {
            selectedValue.textContent = "Select a drive";
            options.forEach(opt => opt.classList.remove("selected"));

            customSelect.dispatchEvent(
                new CustomEvent("change", {
                    bubbles: true,
                    composed: true,
                    detail: { value: null }
                })
            );
        });

        selectButton.addEventListener("click", () => {
            toggleDropdown();
        });

        selectButton.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                toggleDropdown(true);
            } else if (event.key === "Escape") {
                toggleDropdown(false);
            }
        });

        dropdown.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                focusedIndex = (focusedIndex + 1) % options.length;
                updateFocus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusedIndex = (focusedIndex - 1 + options.length) % options.length;
                updateFocus();
            } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOptionSelect(options[focusedIndex]);
                toggleDropdown(false);
            } else if (event.key === "Escape") {
                toggleDropdown(false);
            }
        });

        this.shadowRoot.addEventListener("click", (event) => {
            const isOutsideClick = !customSelect.contains(event.target);

            if (isOutsideClick) {
                toggleDropdown(false);
            }
        });
    };

    async getDrives() {
        try {
            const os = store.getProp("os");

            let cmd;
            if (os === "Win") {
                cmd = 'wmic logicaldisk where "DriveType=2" get DeviceID,VolumeName';
            } else if (os === "OSX") {
                cmd = 'system_profiler SPStorageDataType -json';
            } else { // linux
                cmd = 'lsblk -o NAME,VENDOR,MOUNTPOINTS -J';
            };

            const result = await Neutralino.os.execCommand(cmd);
            if (result.exitCode !== 0) {
                throw new Error(result.stdErr);
            };

            return this.parseDrives(result.stdOut);
        } catch (err) {
            console.error("Failed to fetch drives:", err);
            store.set("error_message", "Failed to access system drive list");
            setTimeout(() => this.requestNavigate(5), 200);
        };
    };

    async parseDrives(stdOut) {
        const os = store.getProp("os");
        const select = this.shadowRoot.getElementById("select-dropdown");

        select.innerHTML = ``;

        if (os === "Win") {
            const lines = stdOut
                .split(/\r?\n/)
                .map(l => l.trim())
                .filter(Boolean);

            lines.shift(); // remove headers

            lines.forEach(line => {
                const [device, volume] = line.split(/\s{2,}/);

                if (!device) return;

                const option = document.createElement("li");
                option.role = "option";
                option.dataset.value = `${device}\\`;

                option.textContent = volume
                    ? `${volume} @ ${device}\\`
                    : `Removable Drive @ ${device}\\`;

                select.appendChild(option);
            });
        } else if (os === "OSX") {
            const data = JSON.parse(stdOut);

            if (data.SPStorageDataType && data.SPStorageDataType.length > 0) {
                const allDrives = data.SPStorageDataType;
                const possibleDrives = allDrives.filter((val) => val._name && val.bsd_name && val.mount_point && val.mount_point.startsWith("/") && val.writable === "yes");
                if (possibleDrives.length > 0) {
                    possibleDrives.forEach(mount => {
                        const option = document.createElement("li");
                        option.role = 'option';
                        option.dataset.value = mount.mount_point;
                        option.textContent = `${mount._name} - ${mount.bsd_name}@${mount.mount_point}`;
                        select.appendChild(option);
                    });
                };
            };
        } else { // linux
            const data = JSON.parse(stdOut);

            data.blockdevices.forEach(device => {
                if (!device.children) return;
                device.children.forEach(child => {
                    if (!child.mountpoints) return;
                    child.mountpoints.forEach(mount => {
                        if (!mount.startsWith("/")) return;
                        const option = document.createElement("li");
                        option.role = 'option';
                        option.dataset.value = mount;
                        option.textContent = `${device.vendor} - ${child.name}@${mount}`;
                        select.appendChild(option);
                    });
                });
            });
        };

        let lastValue = store.getProp("kindle_mounted_on");
        if (lastValue) {
            const match = [...select.children].find(
                li => li.dataset.value === lastValue
            );
            if (!match) select.dispatchEvent(new Event("clear"));
        };
    };

    registerListener() {
        const customSelect = this.shadowRoot.querySelector(".custom-select");
        customSelect.addEventListener("change", (e) => {
            if (!e.detail.value || e.detail.value == null) {
                this.setNextDisabled(true);
                store.set("kindle_connected", false);
                store.set("kindle_mounted_on", null);
                store.set("kindle_firmware", null);
                return;
            };

            const value = e.detail.value;

            this.setNextDisabled(false);
            store.set("kindle_connected", true);
            store.set("kindle_mounted_on", value);
            store.set("kindle_firmware", null);
        });
    };

    render() {
        this.setNextDisabled(true);

        setTimeout(() => {
            this.initDropdown();
            this.registerListener();

            const intervalId = setInterval(() => this.getDrives(), 2000);
            this.pageChanged(() => clearInterval(intervalId));

            this.getDrives();
        }, 50);

        return `
            <div id="centered">
                <h1>Manual Device</h1>
                <div id="container">
                    <p>Select the Kindle's Drive:</p>

                    <!-- Custom dropdown html from https://codepen.io/ibaslogic/pen/NPKdday. All credits given. -->
                    <div class="custom-select">
                        <button
                            id="dropdown-button"
                            class="select-button"
                            role="combobox"
                            aria-label="select button"
                            aria-haspopup="listbox"
                            aria-expanded="false"
                            aria-controls="select-dropdown"
                            tabindex="-1"
                        >
                            <span class="selected-value">Select a drive</span>
                            <span class="arrow"></span>
                        </button>
                        <ul
                            class="select-dropdown hidden"
                            role="listbox"
                            id="select-dropdown"
                            aria-labelledby="dropdown-button"
                        ></ul>
                    </div>
                    <a>Can't see your Kindle? Check if it is mounted</a>
                </div>
            </div>
        `;
    };
};