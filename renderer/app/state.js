export class State {
    #state;
    #listeners = new Set();

    constructor(initialState = {}) {
        this.#state = structuredClone(initialState);
    };

    get() {
        console.log("State Fetched:", this.#state);
        return this.#state;
    };

    getProp(key) {
        console.log("State Prop Fetched:", key, this.#state[key]);
        return this.#state[key];
    };

    set(key, value) {
        if (Object.is(this.#state[key], value)) return;
        this.#state = { ...this.#state, [key]: value };
        this.#emit();
    };

    patch(obj) {
        this.#state = { ...this.#state, ...obj };
        this.#emit();
    };

    update(fn) {
        const next = fn(this.#state);
        if (next !== this.#state) {
            this.#state = next;
            this.#emit();
        };
    };

    subscribe(fn) {
        console.log("Global State Listener registered:", fn);
        this.#listeners.add(fn);
        fn(this.#state);
        return () => this.#listeners.delete(fn);
    };

    subscribeTo(key, fn) {
        console.log("State Listener registered:", key, fn);
        let prev = this.#state[key];
        return this.subscribe(state => {
            if (!Object.is(prev, state[key])) {
                prev = state[key];
                fn(state[key]);
            };
        });
    };

    #emit() {
        console.log("State Update:", this.#state);
        for (const fn of this.#listeners) fn(this.#state);
    };

    bindToCSS({
        target = document.documentElement,
        prefix = "state",
        map = null
    } = {}) {
        return this.subscribe(state => {
            for (const [key, value] of Object.entries(state)) {
                if (map && !map.includes(key)) continue;

                target.dataset[`${prefix}${key[0].toUpperCase()}${key.slice(1)}`] =
                    value ?? "";

                target.style.setProperty(
                    `--${prefix}-${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`,
                    value ?? ""
                );
            }
        });
    }
};