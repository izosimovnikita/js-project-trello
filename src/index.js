import {createStore} from "./store/store.js";
import {columnsReducer} from "./store/reducers/reducer.js";

import {createEl, h} from "./Element.js";
import {render} from "./utils/renderDOM";


import Factory from "./components/Factory";

// import Card from './components/Card/Card.module'
// import Column from './components/Column/Column.module'

const store = createStore(columnsReducer);

let state = {
    text: null,
    title: null
}

function App() {
    return Factory.createElement('div', { className: 'app' },
        Factory.createElement('button', { className: 'app__create-btn' }, 'Создать колонку')
    )
}

function Card() {
    state.text = prompt('Введите название карточки', 'Новая карточка').trim() || 'Новая карточка';
    const card = Factory.createElement('div', {className: 'cards__card', draggable: true, text: state.text});

    this.previousElementSibling.insertAdjacentElement('beforeend', card);
}

function Column(container) {
    state.title = prompt('Введите название колонки', 'Новая колонка').trim() || 'Новая колонка';

    // Сделать возможность добавлять обработчик событий
    const column = Factory.createElement('div', { className: 'app__column column', draggable: true},
        Factory.createElement('h2', { className: 'column__title', text: state.title }),
        Factory.createElement('div', { className: 'column__cards' }),
        Factory.createElement('button', { className: 'column__button button' }, 'Добавить карточку')
    )

    container.append(column);
}

function renderView(state) {
    render(
        Factory.createElement(App, { state }),
        document.getElementById('root')
    )
}

renderView(state);