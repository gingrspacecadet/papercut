// CSSStyleSheet // OSX WebView // Safari
(() => {
    let supported = false;

    try {
        const s = new CSSStyleSheet();
        s.replaceSync(":root{}");
        supported = true;
    } catch { }

    if (supported) return; // native path

    console.warn("[CSSStyleSheet polypill] WKWebView detected");

    class FakeCSSStyleSheet {
        constructor() {
            this._cssText = "";
            this._styleEl = null;
        }

        replaceSync(cssText) {
            this._cssText = cssText;

            if (!this._styleEl) {
                this._styleEl = document.createElement("style");
                this._styleEl.setAttribute("data-polypill", "");
                this._styleEl.textContent = cssText;
                document.head.appendChild(this._styleEl);
            } else {
                this._styleEl.textContent = cssText;
            }
        }

        replace(cssText) {
            this.replaceSync(cssText);
            return Promise.resolve();
        }

        get cssRules() {
            // Best-effort cssRules emulation
            if (!this._styleEl || !this._styleEl.sheet) return [];

            try {
                return this._styleEl.sheet.cssRules || [];
            } catch {
                // CSP / cross-origin safety
                return [];
            }
        }
    }

    Object.defineProperty(window, "CSSStyleSheet", {
        configurable: true,
        writable: true,
        value: FakeCSSStyleSheet
    });

    // Patch adoptedStyleSheets so code doesn't crash
    Object.defineProperty(Document.prototype, "adoptedStyleSheets", {
        configurable: true,
        get() {
            return this._adoptedStyleSheets || [];
        },
        set(sheets) {
            this._adoptedStyleSheets = sheets;

            for (const sheet of sheets) {
                if (sheet._styleEl && !sheet._styleEl.isConnected) {
                    document.head.appendChild(sheet._styleEl);
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
                if (sheet._styleEl && !sheet._styleEl.isConnected) {
                    this.appendChild(sheet._styleEl);
                }
            }
        }
    });
})();