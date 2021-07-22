import columnsReducer from "./reducers/columnsReducer";
import cardsReducer from "./reducers/cardReducer";
import combineReducers from "./reducers/combineReducers";
import appReducer from "./reducers/appReducer";

export const createStore = (reducer, initialState = undefined) => {
    return {
        listeners: [],
        state: initialState,
        dispatch(action) {
            this.state = reducer(this.state, action);
            this.listeners.forEach(listener => listener(this.state))
        },
        subscribe(newListener) {
            this.listeners.push(newListener);

            return () => {
                const index = this.listeners.indexOf(newListener);
                this.listeners.splice(index, 1);
            }
        }
    }
}

const store = createStore(appReducer);

export default store;