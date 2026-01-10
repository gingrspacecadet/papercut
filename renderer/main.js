import * as Neutralino from "./vendor/neutralino/neutralino.mjs";
import "./app/stepManager.js";

Neutralino.init();

const menu = [
    {
        id: 'app', text: 'PaperCut',
        menuItems: [
            { id: 'restart', text: 'Restart', shortcut: 'R' },
            { id: 'quit', text: 'Quit PaperCut', shortcut: 'Q' },
        ]
    }
];

await Neutralino.window.setMainMenu(menu);
await Neutralino.events.on('mainMenuItemClicked', async (evt) => {
    if (evt.detail.id == "restart") await Neutralino.app.restartProcess();
    if (evt.detail.id == "quit") await Neutralino.app.exit();
});
console.log("Set Main Menu");

// Debug Mode right click for inspect element
// Shift + 1 to allow right click
let isDebugOn = false;
let debugKey = "Digit1";
window.addEventListener("keydown", function(e) {
    if (e.shiftKey && e.code === debugKey) {
        (async () => {
            await Neutralino.os.showNotification('Debug Mode', 'You have enabled debug mode until you restart PaperCut', 'WARNING');
            isDebugOn = true;
        })();
    };
});
window.addEventListener("contextmenu", function(e) {
    if (!isDebugOn) e.preventDefault();
}, false);
console.log("Listening for Debug Keybind");