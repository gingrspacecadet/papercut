import * as Neutralino from "../../vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';
import { store } from '../../app/store.js';

export default class extends BaseStep {
    render() {
        this.setLabels({ prev: "Back", next: "Quit" });
        this.setPrevDisabled(true);

        let successMessage = `
            <!-- Taken from https://github.com/rharkor/check-mark-animation/blob/main/index.html -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 214 214"
                class="check-circle"
            >
                <g fill="none" stroke="currentColor" stroke-width="2">
                    <circle
                        class="semi-transparent"
                        fill="currentColor"
                        opacity="0.15"
                        cx="107"
                        cy="107"
                        r="72"
                    ></circle>
                    <circle
                        class="colored"
                        fill="currentColor"
                        cx="107"
                        cy="107"
                        r="72"
                        opacity="0.8"
                    ></circle>
                    <polyline
                        stroke="#fff"
                        stroke-width="10"
                        points="73.5,107.8 93.7,127.9 142.2,79.4"
                        style="stroke-dasharray: 50%, 50%; stroke-dashoffset: 100%"
                    />
                </g>
            </svg>
            All done!
            <a id="prompt-sub">You can disconnect your Kindle now</a>
        `;

        const errorMessage = store.getProp('error_message');
        if (typeof errorMessage === "string") {
            successMessage = `
                <!-- Modified from https://github.com/rharkor/check-mark-animation/blob/main/index.html to show a cross instead of a check -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 214 214"
                    class="cross-circle"
                >
                    <g fill="none" stroke="currentColor" stroke-width="2">
                        <circle
                            class="semi-transparent"
                            fill="currentColor"
                            opacity="0.15"
                            cx="107"
                            cy="107"
                            r="72"
                        ></circle>
                        <circle
                            class="colored"
                            fill="currentColor"
                            cx="107"
                            cy="107"
                            r="72"
                            opacity="0.8"
                        ></circle>
                        <path id="Cross" fill="#ffffff" fill-rule="evenodd" stroke="none" d="M 133.957031 145.5 L 108.00058 119.54361 L 82.043831 145.5 L 70 133.45639 L 95.956818 107.5 L 70 81.54361 L 82.043831 69.5 L 108.00058 95.45639 L 133.957031 69.5 L 146 81.54361 L 120.044403 107.5 L 146 133.45639 Z"/>
                    </g>
                </svg>
                Failed!
                <a id="prompt-sub">
                ${errorMessage}<br>
                <br>
                You can disconnect your Kindle or retry
                </a>
            `;
            Neutralino.os.showNotification('PaperCut', errorMessage, 'ERROR');
        } else {
            Neutralino.os.showNotification('PaperCut', 'The installation is complete', 'INFO');
        };

        return `
            <div id="centered">
                <p id="prompt">
                    ${successMessage}
                </p>
            </div>
        `;
    };
};