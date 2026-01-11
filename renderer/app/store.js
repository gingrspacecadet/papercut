import { State } from "./state.js";

export const store = new State({
    error_message: null,
    os: null,
    kindle_connected: false,
    kindle_mounted_on: null,
    kindle_firmware: null,
});

store.bindToCSS({
    prefix: "store",
    map: [
        "os"
    ]
});