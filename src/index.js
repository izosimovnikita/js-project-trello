import App from "./App";
import store from "./store/store"

const root = document.getElementById('root');

const app = new App(store.getState())
root.append(app.render());
app.componentDidMount();

store.subscribe((state) => {
    window.localStorage.setItem('columns', JSON.stringify(state));
});

