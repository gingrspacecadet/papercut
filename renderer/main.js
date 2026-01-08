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

document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);