import Column from "./components/column/column.component";
import {createEl, h} from "./utils/Element";
import store from "./store/store";
import Modal from "./components/modal/modal.component";

let draggedItem = null;
let idColumn = 0;

store.subscribe((state) => console.log(state))

function createColumn() {
    store.dispatch({
        type: 'ADD_COLUMN',
        payload: {
            title: 'Новая колонка',
            idColumn
        }
    })

    const column = new Column({idColumn});
    idColumn++;

    document.querySelector('.columns').append(createEl(column.render()));
}

function dragStart(event) {
    draggedItem = event.target;

    setTimeout(() => {
        if (event.target.classList.contains('column')) {
            event.target.classList.add('selected-column');
        }
    }, 0)
}

function dragEnd(event) {
    draggedItem = null;

    if (event.target.classList.contains('column')) {
        event.target.classList.remove('selected-column');
    }
}

function dragOver(event) {
    event.preventDefault();

    if (event.target.classList.contains('column')) {
        const active = this.querySelector('.selected-column');
        const current = event.target;

        const isMoveable = active !== current && current.classList.contains('column');

        if (!isMoveable) {
            return;
        }

        const next = current === active.nextElementSibling ? current.nextElementSibling : current;

        this.insertBefore(active, next);
    }
}

function dragEnter(event) {
    event.preventDefault();
}

export default function App() {
    const modal = new Modal({title: 'Введите название карточки!'});
    document.body.append(modal.render());

    return createEl(
        h('div', {className: 'app'},
            h('div', {
                className: 'app__columns columns',
                ondragstart: dragStart,
                ondragend: dragEnd,
                ondragenter: dragEnter,
                ondragover: dragOver
            }),
            h('button', {className: 'app__create-btn', onclick: createColumn}, '+ Добавить новую колонку')
        )
    )
}


