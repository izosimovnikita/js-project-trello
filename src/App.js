import Column from "./components/column/column.module";
import Modal from "./components/modal/modal.module";
import {createEl, h} from "./utils/Element";

import store from "./store/store";
import {addColumn} from "./store/reducers/actions";
import Button from "./components/button/button.component";

let draggedItem = null;
let idColumn = 0;

store.subscribe((state) => console.log(state))

function createColumn() {
    store.dispatch(addColumn({title: 'Новая колонка', idColumn}));

    const column = new Column({idColumn}, {className: 'columns__column column', draggable: true}).render();
    idColumn++;

    document.querySelector('.columns').append(createEl(column));
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
    const addColumnBtn = new Button('button', {className: 'app__create-btn', onclick: createColumn}, '+ Добавить' +
        ' новую колонку').render();

    const modal = new Modal({title: 'Введите название карточки!'}, {className: 'modal'}).render();

    document.body.append(modal);

    return createEl(
        h('div', {className: 'app'},
            h('div', {
                className: 'app__columns columns',
                ondragstart: dragStart,
                ondragend: dragEnd,
                ondragenter: dragEnter,
                ondragover: dragOver
            }),
            (addColumnBtn)
        )
    )
}


