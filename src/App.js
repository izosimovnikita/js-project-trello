import Column from "./components/column/column.module";
import Modal from "./components/modal/modal.module";
import ThemeSwitcher from "./components/theme-switcher/theme-switcher.module";
import {createEl, h} from "./utils/Element";

const themes = require('./assets/themes/themes.json');

import store from "./store/store";
import {addColumn} from "./store/actions/actions";
import Button from "./components/button/button.component";
import Factory from "./modules/Factory";

export default class App extends Factory {
    constructor(state) {
        super();


        this.state = state;

        this.idColumn = 0;
        this.draggedItem = null;
    }

    _dragStart(event) {
        if (event.target.classList.contains('column')) {
            setTimeout(() => {
                event.target.classList.add('selected-column');
            }, 0)
        } else {
            event.preventDefault();
        }
    }

    _dragEnd(event) {
        if (event.target.classList.contains('column')) {
            event.target.classList.remove('selected-column');
        }
    }

    _dragOver(event) {
        event.preventDefault();
        const current = event.target;

        if (event.target.classList.contains('column')) {
            const active = this.querySelector('.selected-column');

            if (active === current || !active) {
                return;
            }

            const next = current === active.nextElementSibling ? current.nextElementSibling : current;

            this.insertBefore(active, next);
        }
    }

    _dragEnter(event) {
        event.preventDefault();
    }

    createColumn(title, idColumn, cards, isNew = true) {
        const column = new Column({title, idColumn, cards}, {
            className: 'columns__column column',
            draggable: true
        }).render();

        if (isNew) {
            store.dispatch(addColumn({title, idColumn, cards}));
        }

        this.idColumn = idColumn + 1;
        document.querySelector('.columns').append(column);
    }

    componentDidMount() {
        if (Object.values(this.state).length && this.state) {
            Object.values(this.state).forEach(column => {
                    this.createColumn(column.title, column.id, column.cards, false)
                }
            );
        }
    }

    render() {
        const app = new Factory('div', {className: 'app'}).render();

        const columns = new Factory('div', {
            className: 'app__columns columns',
            ondragstart: this._dragStart,
            ondragend: this._dragEnd,
            ondragenter: this._dragEnter,
            ondragover: this._dragOver
        }).render();

        const addColumnBtn = new Button('button', {
            className: 'app__create-btn',
            onclick: () => this.createColumn('Заголовок списка', this.idColumn, {})
        }, [
            new Factory('img', {
                className: 'column-button__icon',
                src: 'https://image.flaticon.com/icons/png/512/748/748113.png'
            }).render(),
            'Добавить новый список'
        ]).render();

        const themeSwitcher = new ThemeSwitcher({themes}).render();

        app.append(columns);
        app.append(addColumnBtn);
        app.append(themeSwitcher);

        const modal = new Modal({title: 'Введите название карточки!'}, {className: 'modal'}).render();
        const signature = new Factory('img', {className: 'signature', src: 'https://i.imgur.com/8DB2Ao6.png'}).render()

        document.body.append(modal);
        document.body.append(signature);

        return (
            app
        )

    }
}


