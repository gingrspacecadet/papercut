import { BaseStep } from '../baseStep.js';

export default class extends BaseStep {
    get nextLabel() { return 'Install'; }

    render() {
        return `
            <div id="centered">
                <h1>Install Options</h1>
                <div id="container">
                    <a>Choose the modifications you want to install:</a>
                    <div>

                    </div>
                </div>
            </div>
        `;
    };
};