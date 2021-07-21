import {columnsReducer} from "./reducers/reducer";

export const createStore = (reducer) => {
    return {
        listeners: [],
        state: undefined,
        dispatch(action) {
            this.state = reducer(this.state, action);
            this.listeners.forEach(listener => listener(this.state))
        },
        subscribe(newListener) {
            this.listeners.push(newListener);
        }
    }
}

const store = createStore(columnsReducer)

export default store;