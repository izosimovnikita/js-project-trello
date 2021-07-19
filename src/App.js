import Column from "./components/column/column.component";
import {createEl, h} from "./Element";

let state = {
    title: null,
    text: null,
}

function createColumn() {
    const column = new Column('Title');

    document.querySelector('.columns').append(column.render())
}

export default function App() {
    return createEl(
        h('div', {className: 'app'},
            h('div', { className: 'app__columns columns'}),
            h('button', {className: 'app__create-btn', onclick: createColumn}, '+ Создать колонку')
        )
    )
}


