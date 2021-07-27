import App from "./App";
import store from "./store/store"
import {startApp} from "./modules/customEvents";

document.addEventListener('startapp', function () {
    const app = new App(store.getState())
    root.append(app.render());
    app.componentDidMount();

    store.subscribe((state) => {
        window.localStorage.setItem('columns', JSON.stringify(state));
    });
})

const root = document.getElementById('root');
root.dispatchEvent(startApp);





