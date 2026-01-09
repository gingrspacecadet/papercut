export class State {
    #state;
    #listeners = new Set();

    constructor(initialState = {}) {
        this.#state = structuredClone(initialState);
    };

    get() {
        return this.#state;
    };

    getProp(key) {
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
        this.#listeners.add(fn);
        fn(this.#state);
        return () => this.#listeners.delete(fn);
    };

    subscribeTo(key, fn) {
        let prev = this.#state[key];
        return this.subscribe(state => {
            if (!Object.is(prev, state[key])) {
                prev = state[key];
                fn(state[key]);
            };
        });
    };

    #emit() {
        for (const fn of this.#listeners) fn(this.#state);
    };
};