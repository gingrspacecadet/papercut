export function input({
    title = "Input",
    message = "",
    placeholder = "",
    defaultValue = "",
    confirmText = "OK",
    cancelText = "Cancel",
    validate = null   // function like so (value) => string | null
} = {}) {
    return new Promise((resolve) => {
        const root = document.createElement("div");
        root.className = "input-modal";

        root.innerHTML = `
            <div class="backdrop"></div>
            <div class="dialog">
                <h2>${title}</h2>
                ${message ? `<p>${message}</p>` : ""}
                <input type="text" placeholder="${placeholder}" />
                <div class="error"></div>
                <div class="actions">
                    <button class="cancel">${cancelText}</button>
                    <button class="confirm">${confirmText}</button>
                </div>
            </div>
        `;

        const style = document.createElement("style");
        style.textContent = `
            .input-modal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: inherit;
            }

            .input-modal .backdrop {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,.45);
                backdrop-filter: blur(6px);
                animation: bgPop .18s ease-out;
            }
            .input-modal .backdrop.popOut {
                animation: bgPopOut .18s ease-out forwards;
            }

            .input-modal .dialog {
                position: relative;
                background: #1e1e1e;
                color: white;
                padding: 24px;
                width: min(90%, 420px);
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,.5);
                animation: pop .18s ease-out;
            }
            .input-modal .dialog.popOut {
                animation: popOut .18s ease-out forwards;
            }

            .input-modal h2 {
                margin: 0 0 8px;
                font-size: 18px;
                font-weight: 400;
                cursor: default;
            }

            .input-modal p {
                margin: 0 0 14px;
                opacity: .85;
                font-weight: 300;
                cursor: default;
            }

            .input-modal input {
                width: 100%;
                box-sizing: border-box;
                padding: 8px 10px;
                border-radius: 6px;
                border: 1px solid #333;
                background: #121212;
                color: white;
                font-size: 14px;
                margin-bottom: 6px;
            }

            .input-modal input:focus {
                outline: none;
                border-color: #e8913a;
            }

            .input-modal .error {
                min-height: 16px;
                font-size: 12px;
                color: #ff6b6b;
                margin-bottom: 10px;
                cursor: default;
            }

            .input-modal .actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }

            .input-modal button { 
                height: 32px;
                min-width: 110px;
                padding-bottom: 2px;
                padding-left: 14px;
                padding-right: 14px;
                padding-top: 2px;
                border-radius: 6px;
                border: none;
                background-color: color(srgb 1 1 1 / 0.12);
                color: color(srgb 1 1 1 / 0.8);
                cursor: pointer;
                font-weight: 700;
                font-size: 13px;
                text-align: center;
                text-overflow: ellipsis;
                text-wrap-mode: nowrap;
                white-space-collapse: collapse;
                -webkit-user-select: none;
            }
            .input-modal button:hover {
                background-color: color(srgb 1 1 1 / 0.18);
            }
            .input-modal button:active {
                background-color: color(srgb 1 1 1 / 0.28);
            }

            @keyframes pop {
                from {
                    transform: scale(.96);
                    opacity: 0;
                }
            }
            @keyframes popOut {
                to {
                    transform: scale(.96);
                    opacity: 0;
                }
            }

            @keyframes bgPop {
                from {
                    background: rgba(0, 0, 0, 0);
                    backdrop-filter: blur(0px);
                }
            }
            @keyframes bgPopOut {
                to {
                    background: rgba(0, 0, 0, 0);
                    backdrop-filter: blur(0px);
                }
            }
        `;

        document.body.append(root, style);

        const input = root.querySelector("input");
        const error = root.querySelector(".error");
        const dialog = root.querySelector(".dialog");
        const backdrop = root.querySelector(".backdrop");

        input.value = defaultValue;
        input.focus();
        input.select();

        function close(value) {
            dialog.classList.add("popOut");
            backdrop.classList.add("popOut");
            setTimeout(() => {
                root.remove();
                style.remove();
                resolve(value);
            }, 180);
        };

        root.querySelector(".cancel").onclick = () => close(null);
        root.querySelector(".confirm").onclick = submit;

        root.addEventListener("keydown", (e) => {
            if (e.key === "Escape") close(null);
            if (e.key === "Enter") submit();
        });

        async function submit() {
            const value = input.value;

            if (validate) {
                const err = await validate(value);
                if (err) {
                    error.textContent = err;
                    return;
                };
            };

            close(value);
        };

        console.log("Input modal opened");
    });
};