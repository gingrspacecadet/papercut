import { State } from "./state.js";

export const store = new State({
    error_message: null,
    OS: null,
    kindle_connected: false,
    kindle_mounted_on: null,
    kindle_firmware: null,
});