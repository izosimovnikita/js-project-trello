import columnsReducer from "./reducers/columnsReducer";
import cardsReducer from "./reducers/cardReducer";
import combineReducers from "./reducers/combineReducers";
import appReducer from "./reducers/appReducer";

export const createStore = (reducer, initialState) => {
    return {
        listeners: [],
        state: reducer(initialState, {type: null}),
        dispatch(action) {
            this.state = reducer(this.state, action);
            this.listeners.forEach(listener => listener(this.state))
        },
        getState() {
            return this.state;
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