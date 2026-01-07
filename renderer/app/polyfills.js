// CSSStyleSheet // OSX WebView // Safari
(() => {
    let supported = false;

    try {
        const s = new CSSStyleSheet();
        s.replaceSync(":root{}");
        supported = true;
    } catch { }

    if (supported) return;

    console.warn("[CSSStyleSheet polypill] WKWebView detected");

    class _CSSStyleSheet {
        constructor() {
            this._cssText = "";
            this._elementMap = new Map();
        };

        replaceSync(cssText) {
            this._cssText = cssText;

            for (const [key, value] of this._elementMap) {
                value.textContent = cssText;
            }
        };

        replace(cssText) {
            this.replaceSync(cssText);
            return Promise.resolve();
        };

        get cssRules() {
            if (!this._elementMap ||!this._elementMap.values || !this._elementMap.values[0] || !this._elementMap.values[0].sheet) return [];

            try {
                return this._elementMap.values[0].sheet.cssRules || [];
            } catch {
                return [];
            };
        };
    };

    Object.defineProperty(window, "CSSStyleSheet", {
        configurable: true,
        writable: true,
        value: _CSSStyleSheet
    });

    Object.defineProperty(Document.prototype, "adoptedStyleSheets", {
        configurable: true,
        get() {
            return this._adoptedStyleSheets || [];
        },
        set(sheets) {
            this._adoptedStyleSheets = sheets;

            for (const sheet of sheets) {
                if (!sheet._elementMap) {
                    sheet._elementMap = new Map();
                }

                let styleEl = sheet._elementMap.get(this);

                if (!styleEl) {
                    styleEl = document.createElement("style");
                    styleEl.setAttribute("data-polypill", "");
                    styleEl.textContent = sheet._cssText;
                    sheet._elementMap.set(this, styleEl);
                }

                if (!styleEl.isConnected) {
                    this.appendChild(styleEl);
                }
            }
        }
    });

    Object.defineProperty(ShadowRoot.prototype, "adoptedStyleSheets", {
        configurable: true,
        get() {
            return this._adoptedStyleSheets || [];
        },
        set(sheets) {
            this._adoptedStyleSheets = sheets;

            for (const sheet of sheets) {
                if (!sheet._elementMap) {
                    sheet._elementMap = new Map();
                }

                let styleEl = sheet._elementMap.get(this);

                if (!styleEl) {
                    styleEl = document.createElement("style");
                    styleEl.setAttribute("data-polypill", "");
                    styleEl.textContent = sheet._cssText;
                    sheet._elementMap.set(this, styleEl);
                }

                if (!styleEl.isConnected) {
                    requestAnimationFrame(() => {
                        this.appendChild(styleEl);
                    });
                }
            }
        }
    });
})();