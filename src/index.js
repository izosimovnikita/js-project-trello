import App from "./App";
import store from "./store/store"

const root = document.getElementById('root');

store.subscribe((state) => {
    window.localStorage.setItem('columns', JSON.stringify(state));
    console.log('localStorage', JSON.parse(window.localStorage.getItem('columns')));
    console.log('state', state);
});

function initApp() {
    const localStorage = window.localStorage.getItem('columns');

    if (localStorage) {
        const columns = JSON.parse(localStorage);

        const app = new App(columns);
        root.append(app.render());
        app.componentDidMount();
    } else {
        const app = new App(store.getState())
        root.append(app.render());
        app.componentDidMount();
    }
}

initApp();

