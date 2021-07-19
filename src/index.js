import {createStore} from "./store/store.js";
import {columnsReducer} from "./store/reducers/reducer.js";
import App from "./App";

const store = createStore(columnsReducer);

const root = document.getElementById('root');

root.append(App())