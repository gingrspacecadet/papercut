import * as Neutralino from "./vendor/neutralino/neutralino.mjs";
import "./app/stepManager.js";

window.__PC_Neutralino__ = Neutralino;
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

(async() => {
    const os = await Neutralino.os.getEnv("OS");
    if (os && os.includes("Windows")) return;

    await Neutralino.window.setMainMenu(menu);
    await Neutralino.events.on('mainMenuItemClicked', async (evt) => {
        if (evt.detail.id == "restart") await Neutralino.app.restartProcess();
        if (evt.detail.id == "quit") await Neutralino.app.exit();
    });
    console.log("Set Main Menu");
})();

// Debug Mode right click for inspect element
// Shift + 1 to allow right click
let isDebugOn = false;
let debugKey = "Digit1";
window.addEventListener("keydown", function(e) {
    if (e.shiftKey && e.code === debugKey && isDebugOn === false) {
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

// stop annoying scroll bounce
const scrollContainer = document.querySelector('step-manager').shadowRoot.querySelector("#step-container");
let scrollContainerHovered = false;

function isScrollable(el) {
    if (!el) return false;

    const style = getComputedStyle(el);
    const overflowY = style.overflowY;

    if (overflowY !== 'auto' && overflowY !== 'scroll') return false;

    return el.scrollHeight > el.clientHeight;
};

scrollContainer.addEventListener('mouseover', (e) => {
    scrollContainerHovered = true;
}, { passive: false });
scrollContainer.addEventListener('mouseleave', (e) => {
    scrollContainerHovered = false;
}, { passive: false });

window.addEventListener('wheel', (e) => {
    if (!isScrollable(scrollContainer) || !scrollContainerHovered) e.preventDefault();
}, { passive: false });