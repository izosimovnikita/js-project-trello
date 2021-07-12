export const createStore = (reducer) => {
    return {
        listeners: [],
        state: null,
        dispatch(action) {
            this.state = reducer(this.state, action);
            this.listeners.forEach(listener => listener(this.state))
        },
        subscribe(newListener) {
            this.listeners.push(newListener);
        }
    }
}