export type Matrix3x3 = any;
export type Vector3 = any;
export type ArgumentMeta = any;
export type ColorConstructor = any;
export type ParseFunctionReturn = any;
export type ParseOptions = any;
export type ColorTypes = any;
export type PlainColorObject = any;
export type Coords = any;
/**
 * Options for {@link getAll}
 */
export type GetAllOptions = {
    /**
     * The color space to convert to. Defaults to the color's current space
     */
    space?: string | ColorSpace | undefined;
    /**
     * The number of significant digits to round the coordinates to
     */
    precision?: number | undefined;
};
export type Ref = any;
export type Color = any;
export type Cam16Object = {
    J: number;
    C: number;
    h: number;
    s: number;
    Q: number;
    M: number;
    H: number;
};
export type Methods = keyof typeof import("./index.js").default extends `deltaE${infer Method}` ? Method : string;
export type ToGamutOptions = any;
export type SerializeOptions = any;
export type OKCoeff = any;
export type ColorSpace = any;
export type FormatInterface = any;
/**
 * Remove the first element of an array type
 */
export type RemoveFirstElement<T extends any[]> = T extends [any, ...infer R] ? R : T[number][];
export type White = any;
export type RGBOptions = any;
export type ColorSerializationFormat = "hex" | "hsl" | "hwb" | "rgb" | "color" | "oklch" | "oklab" | "lch" | "lab" | "hex-alt" | "hsl-alt" | "hwb-alt" | "rgb-alt" | "color-alt" | "oklch-alt" | "oklab-alt" | "lch-alt" | "lab-alt";
/**
 * @element x-accordion
 * @part arrow - Arrow icon indicating whether the accordion is expanded or collapsed.
 * @fires expand - User expanded the accordion by clicking the arrow icon.
 * @fires collapse - User collapsed the accordion by clicking the arrow icon.
 */
export class XAccordionElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set expanded(expanded: boolean);
    /**
     * Whether the accordion is expanded.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get expanded(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the accordion is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    expand(animate?: boolean): Promise<void>;
    collapse(animate?: boolean): Promise<void>;
    #private;
}
/**
 * @element x-avatar
 */
export class XAvatarElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    #private;
}
/**
 * @element x-backdrop
 */
export class XBackdropElement extends HTMLElement {
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set ownerElement(ownerElement: HTMLElement);
    /**
     * Element below which the backdrop should be placed.
     *
     * @property
     * @type {HTMLElement}
     */
    get ownerElement(): HTMLElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    show(animate?: boolean): Promise<void>;
    hide(animate?: boolean): Promise<void>;
    #private;
}
/**
 * @element x-box
 */
export class XBoxElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set vertical(vertical: boolean);
    /**
     * Whether to use vertical (rather than horizontal) layout.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get vertical(): boolean;
    #private;
}
/**
 * @element x-button
 * @fires toggle - User toggled the button on or off by clicking it.
 */
export class XButtonElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * A unique value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set togglable(togglable: boolean);
    /**
     * Whether the widget can be toggled on/off by the user.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get togglable(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set condensed(condensed: boolean);
    /**
     * Whether the widget should take less horizontal space.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get condensed(): boolean;
    set skin(skin: "normal" | "flat" | "recessed" | "dock");
    /**
     * @property
     * @attribute
     * @type {"normal" | "flat" | "recessed" | "dock"}
     * @default "normal"
     */
    get skin(): "normal" | "flat" | "recessed" | "dock";
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    /**
     * Whether the menu or popover associated with this button is opened.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get expanded(): boolean;
    /**
     * Whether clicking this button will cause a menu or popover to show up.
     *
     * @property
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get expandable(): boolean;
    /**
     * Direct ancestor <code>x-buttons</code> element.
     *
     * @property
     * @type {XButtonsElement | null}
     * @default null
     * @readonly
     */
    readonly get ownerButtons(): XButtonsElement | null;
    "#backdrop": Element;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    expand(): Promise<void>;
    collapse(delay?: number | null): Promise<void>;
    #private;
}
/**
 * @element x-buttons
 * @fires ^toggle - User toggled a button on or off.
 */
export class XButtonsElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set tracking(tracking: number);
    /**
     * Specifies what should happen when user clicks a button:<br/>
     * <code>-1</code> - Do not toggle any buttons<br/>
     * <code>0</code> - Toggle the clicked button on/off and other buttons off<br/>
     * <code>1</code> - Toggle the clicked button on and other buttons off<br/>
     * <code>2</code> - Toggle the clicked button on/off<br/>
     * <code>3</code> - Toggle the clicked button on/off, but toggle off only if there is at least one other button
     * toggled on<br/>
     *
     * @property
     * @attribute
     * @type {number}
     * @default -1
     */
    get tracking(): number;
    set vertical(vertical: boolean);
    /**
     * Whether to use vertical (rahter than horizontal) layout.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get vertical(): boolean;
    set value(value: string | any[] | null);
    /**
     * Get/set the buttons that should have toggled state.
     *
     * @property
     * @type {string | Array | null}
     */
    get value(): string | any[] | null;
    connectedCallback(): void;
    #private;
}
/**
 * @element x-card
 */
export class XCardElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    #private;
}
/**
 * @element x-checkbox
 * @part indicator
 * @fires ^toggle - User toggled on or off the checkbox.
 */
export class XCheckboxElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-colorinput
 * @fires ^input
 * @fires ^change
 * @fires ^textinputmodestart
 * @fires ^textinputmodeend
 * @part input
 */
export class XColorInputElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string | null}
     * @default "#000000"
     */
    get value(): string | null;
    set space(space: "srgb" | "srgb-linear" | "p3" | "rec2020" | "a98rgb" | "prophoto" | "oklch" | "oklab" | "lch" | "lab" | "xyz-d65" | "xyz-d50");
    /**
     * @property
     * @attribute
     * @type {"srgb" | "srgb-linear" | "p3" | "rec2020" | "a98rgb" | "prophoto" | "oklch" | "oklab" | "lch" | "lab" | "xyz-d65" | "xyz-d50"}
     * @default "srgb"
     */
    get space(): "srgb" | "srgb-linear" | "p3" | "rec2020" | "a98rgb" | "prophoto" | "oklch" | "oklab" | "lch" | "lab" | "xyz-d65" | "xyz-d50";
    set alpha(alpha: boolean);
    /**
     * Whether to allow manipulation of the alpha channel.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get alpha(): boolean;
    set required(required: boolean);
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get required(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get empty(): boolean;
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get error(): boolean;
    "#format-menu": Element;
    "#backdrop": Element;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    selectAll(): void;
    clear(): void;
    reportValidity(): boolean;
    #private;
}
/**
 * @element x-colorpicker
 * @fires ^change
 * @fires ^changestart
 * @fires ^changeend
 */
export class XColorPickerElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * Any valid CSS color value.
     *
     * @property
     * @attribute
     * @type {string}
     * @default "#000000"
     */
    get value(): string;
    set alpha(alpha: boolean);
    /**
     * Whether to allow manipulation of the alpha channel.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get alpha(): boolean;
    set spaces(spaces: Array<string>);
    /**
     * Available color spaces.
     *
     * @property
     * @attribute
     * @type {Array<string>}
     * @default ["srgb", "srgb-linear", "a98rgb", "p3", "rec2020", "prophoto", "lch", "oklch", "lab", "oklab", "xyz-d65", "xyz-d50"]
     */
    get spaces(): Array<string>;
    /**
     * @property
     * @readonly
     * @type {Array<string>}
     */
    readonly get gamuts(): Array<string>;
    set disabled(disabled: boolean);
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    addGamut(id: string, label: string, isColorInGamut: (x: number, y: number, z: number) => Promise<boolean>): void;
    removeGamut(id: string): void;
    getGamutLabel(string: any): string;
    isColorInGamut(x: number, y: number, z: number, id: string): boolean;
    grab(): string | null;
    "#sliders": Element;
    #private;
}
/**
 * @element x-colorselect
 * @fires ^change
 * @fires ^changestart
 * @fires ^changeend
 * @fires collapse
 * @part popover
 */
export class XColorSelectElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string}
     * @default "#000000"
     */
    get value(): string;
    set alpha(alpha: boolean);
    /**
     * Whether to allow manipulation of the alpha channel.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get alpha(): boolean;
    set spaces(spaces: Array<string>);
    /**
     * Allowed color spaces. Value that does not match any of the provided spaces will be converted to the last space.
     *
     * @property
     * @attribute
     * @type {Array<string>}
     * @default ["srgb", "p3"]
     */
    get spaces(): Array<string>;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-contextmenu
 */
export class XContextMenuElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set disabled(disabled: boolean);
    /**
     * Whether the context menu should open when user right-clicks its parent container.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    "#backdrop": Element;
    connectedCallback(): void;
    disconnectedCallback(): void;
    open(number: any, number: any): void;
    close(): Promise<void>;
    #private;
}
/**
 * @element x-drawer
 * @fires toggle
 * @fires beforetoggle
 */
export class XDrawerElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set position(position: "left");
    /**
     * Position of the drawer on the screen.
     *
     * @property
     * @attribute
     * @type {"left" || "right" || "top" || "bottom"}
     * @default "left"
     */
    get position(): "left";
    set manual(manual: boolean);
    /**
     * Manual drawer does not auto-close when user clicks the backdrop.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get manual(): boolean;
    showPopover: any;
    hidePopover: any;
    open(): any;
    close(): any;
    toggle(): void;
    #private;
}
/**
 * @element x-icon
 */
export class XIconElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set href(href: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get href(): string;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-input
 * @fires ^input
 * @fires ^change
 * @fires ^textinputmodestart
 * @fires ^textinputmodeend
 * @fires beforevalidate
 * @part input
 */
export class XInputElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set type(type: "text" | "email" | "password" | "url" | "color");
    /**
     * @property
     * @attribute
     * @type {"text" | "email" | "password" | "url" | "color"}
     * @default "text"
     */
    get type(): "text" | "email" | "password" | "url" | "color";
    set value(value: string);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @partial
     * @type {string}
     * @default ""
     */
    get value(): string;
    set minLength(minLength: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default 0
     */
    get minLength(): number;
    set maxLength(maxLength: number | number);
    /**
     * @property
     * @attribute
     * @type {number | Infinity}
     * @default Infinity
     */
    get maxLength(): number | number;
    set required(required: boolean);
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get required(): boolean;
    set readOnly(readOnly: boolean);
    /**
     * @property
     * @attribute readonly
     * @type {boolean}
     * @default false
     */
    get readOnly(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set validation(validation: "auto" | "instant" | "manual");
    /**
     * - <em>"auto"</em> - validation is performed when input loses focus and when user presses "Enter"<br/>
     * - <em>"instant"</em> - validation is performed on each key press<br/>
     * - <em>"manual"</em>  - you will call reportValidity() manually when user submits the form<br/>
     *
     * @property
     * @attribute
     * @type {"auto" | "instant" | "manual"}
     * @default "auto"
     */
    get validation(): "auto" | "instant" | "manual";
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get empty(): boolean;
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get error(): boolean;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    selectAll(): void;
    clear(): void;
    reportValidity(): boolean;
    setCustomValidity(arg: string | {
        href: string;
        args: any;
    }): void;
    #private;
}
/**
 * @element x-label
 */
export class XLabelElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get value(): string;
    set level(level: number | null);
    /**
     * @property
     * @attribute
     * @type {number | null}
     * @default null
     */
    get level(): number | null;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    #private;
}
/**
 * @element x-menu
 * @fires ^open - The menu was opened by the suer
 * @fires ^close - The menu was closed by the user
 */
export class XMenuElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    /**
     * Whether the menu is shown on screen.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @readonly
     */
    readonly get opened(): boolean;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    openOverElement(underElement: HTMLElement, overElement: HTMLElement): Promise<void>;
    openOverLabel(underLabel: XLabelElement): Promise<void>;
    openNextToElement(element: HTMLElement, direction?: "horizontal" | "vertical", elementWhitespace?: number): Promise<void>;
    openAtPoint(left: number, top: number): Promise<void>;
    close(animate?: boolean): Promise<void>;
    focusNextMenuItem(): void;
    focusPreviousMenuItem(): void;
    focusFirstMenuItem(): void;
    focusLastMenuItem(): void;
    #private;
}
/**
 * @element x-menuitem
 * @fires ^toggle - User toggled on or off the menu item.
 * @part checkmark - Checkmark icon shown when the menu item is toggled.
 * @part arrow - Arrow icon shown when the menu item contains a submenu.
 */
export class XMenuItemElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * Value associated with this menu item (usually the command name).
     *
     * @property
     * @attribute
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set togglable(togglable: boolean);
    /**
     * Whether the widget can be toggled on/off by the user.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get togglable(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    /**
     * Promise that is resolved when any trigger effects (such as blinking) are finished.
     *
     * @property
     * @type {Promise<void>}
     */
    get whenTriggerEnd(): Promise<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-menubar
 * @fires expand
 * @fires collapse
 */
declare class XMenuBarElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-message
 */
export class XMessageElement extends HTMLElement {
    static observedAttributes: string[];
    set href(href: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get href(): string;
    set args(args: {
        [x: string]: string | number;
    });
    /**
     * @property
     * @attribute
     * @type {Object.<string, string | number>}
     * @default {}
     */
    get args(): {
        [x: string]: string | number;
    };
    set autocapitalize(autocapitalize: boolean);
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get autocapitalize(): boolean;
    set ellipsis(ellipsis: boolean);
    /**
     * Whether to show an ellipsis at the end of the message text.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get ellipsis(): boolean;
    /**
     * @property
     * @type {Promise<void>}
     */
    get whenReady(): Promise<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-nav
 * @fires ^toggle - User toggled a nav item
 */
export class XNavElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * The value of the currently toggled nav item. Null if there is no nav item toggled.
     *
     * @property
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    connectedCallback(): void;
    #private;
}
/**
 * @element x-navitem
 * @fires ^expand - User expanded a collapsed navigation item.
 * @fires ^collapse - User collapsed an expanded navigation item.
 */
export class XNavItemElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get value(): string;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set expanded(expanded: boolean);
    /**
     * Whether the navigation item is expanded.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get expanded(): boolean;
    /**
     * Whether the navigation item could be expanded.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get expandable(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    expand(animate?: boolean): Promise<void>;
    collapse(animate?: boolean): Promise<void>;
    #private;
}
/**
 * @element x-notification
 */
export class XNotificationElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set opened(opened: boolean);
    /**
     * Whether the notification is currently open.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get opened(): boolean;
    set timeout(timeout: number);
    /**
     * Time (in milliseconds) after which this notification should disappear.<br/>
     * Set to 0 to disable the timeout.<br/>
     * Set to -1 to disable the timeout and make the notification permanent.
     *
     * @property
     * @attribute
     * @type {number}
     * @default 0
     */
    get timeout(): number;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-numberinput
 * @fires ^change
 * @fires ^changestart
 * @fires ^changeend
 * @fires ^textinputmodestart
 * @fires ^textinputmodeend
 */
export class XNumberInputElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: number | null);
    /**
     * @property
     * @attribute
     * @type {number | null}
     * @default null
     */
    get value(): number | null;
    set min(min: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default -Infinity
     */
    get min(): number;
    set max(max: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default Infinity
     */
    get max(): number;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set precision(value: number);
    /**
     * Maximal number of digits to be shown after the dot. This setting affects only the display value.
     *
     * @property
     * @attribute
     * @type {number}
     * @default 20
     */
    get precision(): number;
    set step(step: number);
    /**
     * Number by which value should be incremented or decremented when up or down arrow key is pressed.
     *
     * @property
     * @attribute
     * @type {number}
     * @default 1
     */
    get step(): number;
    set prefix(prefix: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get prefix(): string;
    set suffix(suffix: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get suffix(): string;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-pager
 * @fires toggle
 * @part item
 * @part toggled-item
 */
export class XPagerElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: number);
    /**
     * The current page number.
     *
     * @property
     * @attribute
     * @type {number}
     * @default 1
     */
    get value(): number;
    set max(max: number);
    /**
     * The total number of pages.
     *
     * @property
     * @attribute
     * @type {number}
     * @default 5
     */
    get max(): number;
    set controls(controls: Array<"prev" | "next" | "first" | "last" | "nth">);
    /**
     * Available controls.
     *
     * @property
     * @attribute
     * @type {Array<"prev" | "next" | "first" | "last" | "nth">}
     * @default ["prev", "nth", "next"]
     */
    get controls(): Array<"prev" | "next" | "first" | "last" | "nth">;
    set href(href: string | null);
    /**
     * If specified, each pager item will be rendered as a link.
     *
     * @property
     * @attribute
     * @type {string | null}
     * @default null
     */
    get href(): string | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-popover
 * @fires ^open - User opened the popover.
 * @fires ^close - User closed the popover.
 */
export class XPopoverElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    /**
     * Whether the popover is currently open.
     *
     * @property
     * @attribute
     * @readonly
     * @type boolean
     * @default false
     */
    readonly get opened(): boolean;
    set modal(modal: boolean);
    /**
     * Whether the popover should close when user clicks an object outside it.
     *
     * @property
     * @attribute
     * @type boolean
     * @default false
     */
    get modal(): boolean;
    "#backdrop": Element;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    /**
     * Open the popover next to the given point, rect or element.<br/>
     * Returns a promise that is resolved when the popover finishes animating.
     *
     * @method
     * @type {(DOMPoint || DOMRect || Element) => Promise<void>}
     */
    open(context: any, animate?: boolean): any;
    close(boolean: any): Promise<any>;
    #private;
}
/**
 * @element x-progressbar
 * @part bar
 */
export class XProgressbarElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: number | null);
    /**
     * Current progress, in percentages.
     *
     * @property
     * @attribute
     * @type {number | null}
     * @default null
     */
    get value(): number | null;
    set max(max: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default 1
     */
    get max(): number;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-radio
 * @part indicator
 * @part indicator-dot
 * @fires ^toggle - User toggled the radio on or off
 */
export class XRadioElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * Value associated with this widget.
     *
     * @property
     * @attribute
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @copyright 2016-2025 JarosÅ‚aw Foksa
 * @license MIT (check LICENSE.md for details)
 */
/**
 * @element x-radios
 * @fires ^toggle - User toggled a radio.
 */
export class XRadiosElement extends HTMLElement {
    set value(value: string | null);
    /**
     * @property
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    connectedCallback(): void;
    #private;
}
/**
 * @element x-select
 * @part arrow
 * @fires ^change {oldValue:string?, newValue:string?}
 */
export class XSelectElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * @property
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    "#backdrop": Element;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-shortcut
 */
export class XShortcutElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: Array<string>);
    /**
     * The keyboard shortcut in form of an array of <a href="https://www.w3.org/TR/uievents-key/">DOM key names</a>.
     * The attribute value keys should be separated by a "+" sign.
     *
     * @property
     * @attribute
     * @type {Array<string>}
     * @default [[]]
     */
    get value(): Array<string>;
    /**
     * <a href="https://www.w3.org/TR/uievents-key/#keys-modifier">Modifier key names</a> contained by <code>value</code>.
     *
     * @property
     * @type {Array<string>}
     * @default [[]]
     * @readonly
     */
    readonly get modKeys(): Array<string>;
    /**
     * Non-modifier key name contained by <code>value</code>.
     *
     * @property
     * @type {string | null}
     * @default null
     * @readonly
     */
    readonly get normalKey(): string | null;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-slider
 * @fires ^change
 * @fires ^changestart
 * @fires ^changeend
 * @part thumbs
 * @part thumb
 * @part start-thumb
 * @part end-thumb
 * @part track
 * @part groove-track
 * @part range-track
 * @part tick
 * @part first-tick
 * @part last-tick
 * @part range-tick
 */
export class XSliderElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set min(min: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default 0
     */
    get min(): number;
    set max(max: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default 100
     */
    get max(): number;
    set value(value: number | Array<number, number>);
    /**
     * @property
     * @attribute
     * @type {number | Array<number, number>}
     * @default 0
     */
    get value(): number | Array<number, number>;
    set step(step: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default 1
     */
    get step(): number;
    set ticks(ticks: boolean);
    /**
     * Whether to draw a tick mark for each step.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get ticks(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    /**
     * Whether the slider is showing a range value.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get range(): boolean;
    /**
     * @property
     * @attribute
     * @type {"start" | "end" | null}
     * @default null
     * @readonly
     *
     * Whether the start or end grippie is being dragged by the user.
     */
    readonly get dragging(): "start" | "end" | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-stepper
 * @part increment-button - Increment button.
 * @part decrement-button - Decrement button.
 * @part increment-arrow - SVG arrow image belonging to the increment button.
 * @part decrement-arrow - SVG arrow image belonging to the decrement button.
 * @fires ^increment - Fired every 100ms while user is holding down the increment button.
 * @fires ^decrement - Fired every 100ms while user is holding down the decrement button.
 * @fires ^incrementstart - User pressed the increment button.
 * @fires ^decrementstart - User pressed the decrement button.
 * @fires ^incrementend - User released the increment button.
 * @fires ^decrementend - User released the decrement button.
 */
export class XStepperElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set disabled(disabled: true | false | "increment" | "decrement");
    /**
     * Whether the widget is disabled.
     *
     * Set to <code>true</code> or <code>false</code> to disable both buttons. Set to <code>"increment"</code> or
     * <code>"decrement"</code> to disable only a single button.
     *
     * @property
     * @attribute
     * @type {true | false | "increment" | "decrement"}
     * @default false
     */
    get disabled(): true | false | "increment" | "decrement";
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-swatch
 */
export class XSwatchElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * Color value following the <a href="https://www.w3.org/TR/css-color-3/#colorunits">CSS syntax</a>.
     *
     * @property
     * @attribute
     * @type {string}
     * @default "white"
     */
    get value(): string;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-switch
 * @part indicator
 * @part indicator-track
 * @part indicator-thumb
 * @fires toggle - User toggled on or off the switch.
 */
export class XSwitchElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    #private;
}
/**
 * @element x-tab
 * @part selection-indicator - Horizontal line indicating that the tab is toggled.
 */
export class XTabElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get value(): string;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    animateSelectionIndicator(toTab: any): any;
    #private;
}
/**
 * @element x-tabs
 * @fires ^change - Toggled tab has changed.
 */
export class XTabsElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * The value of the currently toggled tab. Null if there is no tab toggled.
     *
     * @property
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    connectedCallback(): void;
    #private;
}
/**
 * @element x-tag
 * @part main
 * @part scope
 * @part remove-button
 * @fires ^remove - User clicked the remove button of a removable tag.
 */
export class XTagElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string | null);
    /**
     * @property
     * @attribute
     * @type {string | null}
     * @default null
     */
    get value(): string | null;
    set removable(removable: boolean);
    /**
     * @property
     * @attribute
     * @type boolean
     * @default false
     */
    get removable(): boolean;
    set toggled(toggled: boolean);
    /**
     * Whether the widget is toggled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get toggled(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
/**
 * @element x-tags
 * @fires toggle
 */
export class XTagsElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: Array<string>);
    /**
     * @property
     * @type {Array<string>}
     * @default [[]]
     */
    get value(): Array<string>;
    #private;
}
/**
 * @element x-tagsinput
 * @fires input
 * @fires change
 * @fires add
 * @fires remove
 * @fires ^textinputmodestart
 * @fires ^textinputmodeend
 * @part input
 * @part suggestions
 */
export class XTagsInputElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    /**
     * @property
     * @type {Array<string>}
     * @default [[]]
     * @readonly
     */
    readonly get value(): Array<string>;
    set delimiter(delimiter: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ","
     */
    get delimiter(): string;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set suggestions(suggestions: boolean);
    /**
     * Whether to show a popover with suggestions.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get suggestions(): boolean;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    clear(): void;
    getSuggestions(string: any): Array<XTagElement>;
    #private;
}
/**
 * @element x-texteditor
 * @fires ^input
 * @fires ^change
 * @fires ^textinputmodestart
 * @fires ^textinputmodeend
 * @fires beforevalidate
 */
export class XTextEditorElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set value(value: string);
    /**
     * @property
     * @attribute
     * @type {string}
     * @default ""
     */
    get value(): string;
    set minLength(minLength: number);
    /**
     * @property
     * @attribute
     * @type {number}
     * @default 0
     */
    get minLength(): number;
    set maxLength(maxLength: number | number);
    /**
     * @property
     * @attribute
     * @type {number | Infinity}
     * @default Infinity
     */
    get maxLength(): number | number;
    set required(required: boolean);
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get required(): boolean;
    set mixed(mixed: boolean);
    /**
     * Whether the widget in in "mixed" state.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get mixed(): boolean;
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    set validation(validation: "auto" | "instant" | "manual");
    /**
     * - <em>"auto"</em> - validation is performed when input loses focus and when user presses "Enter"<br/>
     * - <em>"instant"</em> - validation is performed on each key press<br/>
     * - <em>"manual"</em>  - you will call reportValidity() manually when user submits the form<br/>
     *
     * @property
     * @attribute
     * @type {"auto" | "instant" | "manual"}
     * @default "auto"
     */
    get validation(): "auto" | "instant" | "manual";
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get empty(): boolean;
    /**
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     * @readonly
     */
    readonly get error(): boolean;
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    reportValidity(): boolean;
    /**
     * @method
     * @type {(string || {href:string, args:Object}) => void}
     */
    setCustomValidity(arg: any): void;
    #private;
}
/**
 * @element x-throbber
 */
export class XThrobberElement extends HTMLElement {
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set size(size: "small" | "large" | null);
    /**
     * @property
     * @attribute
     * @type {"small" | "large" | null}
     * @default null
     */
    get size(): "small" | "large" | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
/**
 * @element x-titlebar
 * @part buttons
 * @part button
 * @part close-button
 * @part minimize-button
 * @part maximize-button
 * @part icon
 * @fires buttonclick - User clicked a titlebar button.
 */
export class XTitlebarElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set maximized(maximized: boolean);
    /**
     * Whether the window is maximized.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get maximized(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    #private;
}
/**
 * @element x-tooltip
 */
export class XTooltipElement extends HTMLElement {
    static observedAttributes: string[];
    static "__#private@#shadowTemplate": DocumentFragment | HTMLElement;
    static "__#private@#shadowStyleSheet": CSSStyleSheet;
    set type(type: "hint" | "error");
    /**
     * @property
     * @attribute
     * @type {"hint" | "error"}
     * @default "hint"
     */
    get type(): "hint" | "error";
    set disabled(disabled: boolean);
    /**
     * Whether the widget is disabled.
     *
     * @property
     * @attribute
     * @type {boolean}
     * @default false
     */
    get disabled(): boolean;
    /**
     * Whether the tooltip is currently open.
     *
     * @property
     * @attribute
     * @readonly
     * @type {boolean}
     * @default false
     */
    readonly get opened(): boolean;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    disconnectedCallback(): void;
    /**
     * Open the tooltip next to the given point, rect or element.<br/>
     * Returns a promise that is resolved when the tooltip finishes animating.
     *
     * @method
     * @type {(DOMPoint || DOMRect || Element) => Promise<void>}
     */
    open(context: any, animate?: boolean): any;
    close(boolean: any): Promise<void>;
    #private;
}
/**
 * @singleton
 * @fires themechange
 * @fires iconschange
 * @fires localeschange
 * @fires configchange
 * @fires accentcolorchange
 */
declare var Xel: {
    /**
     * URL to a CSS file with Xel theme definition.
     *
     * @type {string | null}
     */
    get theme(): string | null;
    set theme(value: string | null);
    /**
     * URLs to SVG files with icons.
     *
     * @type {Array<string>}
     */
    get icons(): Array<string>;
    set icons(urls: Array<string>);
    /**
     * URLs to files with localizations.
     * Each file name should consist from ISO 639 language code (e.g. "en"), optionally followed by "-" and ISO 3166
     * territory, e.g. "en", "en-US" or "en-GB".
     *
     * @type {Array<string>}
     */
    get locales(): Array<string>;
    set locales(urls: Array<string>);
    /**
     * @type {string}
     */
    get locale(): string;
    /**
     * Accent color.
     *
     * @type {string}
     */
    get accentColor(): string;
    set accentColor(value: string);
    /**
     * Specifies the storage area to be used for reading and writing the config
     *
     * @type {Storage}
     * @default localStorage
     */
    get configStorage(): Storage;
    set configStorage(storage: Storage);
    readonly whenThemeReady: any;
    readonly whenIconsReady: any;
    readonly whenLocalesReady: any;
    /**
     * @type {CSSStyleSheet}
     */
    get themeStyleSheet(): CSSStyleSheet;
    /**
     * @type {Object.<string, string>}
     */
    get presetAccentColors(): {
        [x: string]: string;
    };
    /**
     * @type {"none" | "titlecase"}
     */
    get autocapitalize(): "none" | "titlecase";
    queryIcon(selector: string): SVGSymbolElement;
    queryMessage(selector: string, args?: {
        [x: string]: any;
    }): {
        id: string;
        attribute?: string;
        format: string;
        content: string;
        fallback: boolean;
    };
    getConfig(key: string, defaultValue?: any): any;
    setConfig(key: string, value: any): void;
    clearConfig(): void;
    "__#private@#theme": any;
    "__#private@#accentColor": any;
    "__#private@#icons": any[];
    "__#private@#locales": any[];
    "__#private@#localesIds": any[];
    "__#private@#autocapitalize": string;
    "__#private@#themeStyleSheet": CSSStyleSheet;
    "__#private@#iconsElements": any[];
    "__#private@#localesBundle": any;
    "__#private@#configStorage": Storage;
    "__#private@#themeReadyCallbacks": any[];
    "__#private@#iconsReadyCalbacks": any[];
    "__#private@#localesReadyCallbacks": any[];
    "__#private@#onHeadChange"(): void;
    "__#private@#onStorageChange"(event: any): void;
    "__#private@#fetchTheme"(url: any): any;
    "__#private@#loadTheme"(url: any): any;
    "__#private@#loadIcons"(urls: any): any;
    "__#private@#loadLocales"(urls: any): any;
    "__#private@#updateAutocapitlizeProperty"(): void;
    "__#private@#updateThemeColors"(): Promise<void>;
    "__#private@#getSettings"(): {
        theme: any;
        accentColor: any;
        icons: any;
        locales: any;
    };
    "__#private@#getThemeImportRules"(themeText: any): any[][];
    /** @deprecated */
    get iconsets(): string[];
    set iconsets(iconsets: string[]);
    /** @deprecated */
    readonly whenIconsetsReady: any;
    "__#private@#events": {};
    addEventListener(eventName: string, listener: Function): void;
    removeEventListener(eventName: string, listener: Function): void;
    dispatchEvent(event: CustomEvent): void;
};
/**
 * Class to represent a color space
 */
declare class ColorSpace {
    static registry: {};
    static get all(): any[];
    static register(id: any, space: any, ...args: any[]): any;
    /**
     * Lookup ColorSpace object by name
     * @param {ColorSpace | string} name
     */
    static get(space: any, ...alternatives: any[]): any;
    /**
     * Look up all color spaces for a format that matches certain criteria
     * @param {object | string} filters
     * @param {Array<ColorSpace>} [spaces=ColorSpace.all]
     * @returns {Format | null}
     */
    static findFormat(filters: object | string, spaces?: Array<ColorSpace>): Format | null;
    /**
     * Get metadata about a coordinate of a color space
     *
     * @static
     * @param {Array | string} ref
     * @param {ColorSpace | string} [workingSpace]
     * @return {Object}
     */
    static resolveCoord(ref: any[] | string, workingSpace?: ColorSpace | string): any;
    static DEFAULT_FORMAT: {
        type: string;
        name: string;
    };
    constructor(options: any);
    id: any;
    name: any;
    base: any;
    aliases: any;
    fromBase: any;
    toBase: any;
    coords: any;
    white: any;
    formats: any;
    gamutSpace: any;
    inGamut(coords: any, { epsilon }?: {
        epsilon?: number;
    }): any;
    referred: any;
    get isUnbounded(): any;
    get cssId(): any;
    get isPolar(): boolean;
    /**
     * Lookup a format in this color space
     * @param {string | object | Format} format - Format id if string. If object, it's converted to a `Format` object and returned.
     * @returns {Format}
     */
    getFormat(format: string | object | Format): Format;
    /**
     * Check if this color space is the same as another color space reference.
     * Allows proxying color space objects and comparing color spaces with ids.
     * @param {string | ColorSpace} space ColorSpace object or id to compare to
     * @returns {boolean}
     */
    equals(space: string | ColorSpace): boolean;
    to(space: any, coords: any, ...args: any[]): any;
    from(space: any, coords: any, ...args: any[]): any;
    toString(): string;
    getMinCoords(): any[];
}
/**
 * Remove the first element of an array type
 * @template {any[]} T
 * @typedef {T extends [any, ...infer R] ? R : T[number][]} RemoveFirstElement
*/
/**
 * @class Format
 * @implements {Omit<FormatInterface, "coords" | "serializeCoords">}
 * Class to hold a color serialization format
 */
declare class Format implements Omit<FormatInterface, "coords" | "serializeCoords"> {
    /**
     * @param {Format | FormatInterface} format
     * @param {RemoveFirstElement<ConstructorParameters<typeof Format>>} args
     * @returns {Format}
     */
    static get(format: Format | FormatInterface, space?: ColorSpace): Format;
    /**
     * @param {FormatInterface} format
     * @param {ColorSpace} space
     */
    constructor(format: FormatInterface, space?: ColorSpace);
    type: string;
    name: string;
    spaceCoords: any;
    /** @type {Type[][]} */
    coords: Type[][];
    space: ColorSpace;
    /**
     * @param {Coords} coords
     * @param {number} precision
     * @param {Type[]} types
     */
    serializeCoords(coords: Coords, precision: number, types: Type[]): any;
    /**
     * Validates the coordinates of a color against a format's coord grammar and
     * maps the coordinates to the range or refRange of the coordinates.
     * @param {Coords} coords
     * @param {[string, string, string]} types
     */
    coerceCoords(coords: Coords, types: [string, string, string]): any;
    /**
     * @returns {boolean | Required<FormatInterface>["serialize"]}
     */
    canSerialize(): boolean | Required<FormatInterface>["serialize"];
}
declare class Type {
    static get(type: any, ...args: any[]): Type;
    /**
     * @param {any} type
     * @param {import("./types.js").CoordMeta} coordMeta
     */
    constructor(type: any, coordMeta: any);
    type: any;
    coordMeta: any;
    coordRange: any;
    /** @type {[number, number]} */
    range: [number, number];
    /** @returns {[number, number]} */
    get computedRange(): [number, number];
    get unit(): "" | "%" | "deg";
    /**
     * Map a number to the internal representation
     * @param {number} number
     */
    resolve(number: number): number;
    /**
     * Serialize a number from the internal representation to a string
     * @param {number} number
     * @param {number} [precision]
     */
    serialize(number: number, precision?: number): string;
    toString(): any;
    /**
     * Returns a percentage range for values of this type
     * @param {number} scale
     * @returns {[number, number]}
     */
    percentageRange(scale?: number): [number, number];
}
export { XMenuBarElement as XMenubarElement, Xel as default };