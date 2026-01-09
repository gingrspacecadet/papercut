import * as Neutralino from "../../vendor/neutralino/neutralino.mjs";
import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextLabel() { return 'Quit'; }
    get prevLabel() { return 'Back'; }
    get prevDisabled() { return true; }
    
    render() {
        Neutralino.os.showNotification('PaperCut', 'The installation is complete', 'INFO');

        return `
            <div id="centered">
                <p id="prompt">
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
                </p>
            </div>
        `;
    };
};