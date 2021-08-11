import App from "./App";
import store from "./store/store"
import {startApp} from "./modules/customEvents";

// document.addEventListener('startapp', function () {
//
// })

const root = document.getElementById('root');
const app = new App(store.getState())
root.append(app.render());
app.componentDidMount();

store.subscribe((state) => {
    window.localStorage.setItem('columns', JSON.stringify(state));
});
// root.dispatchEvent(startApp);





