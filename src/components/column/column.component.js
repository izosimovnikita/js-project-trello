import Factory from "../Factory";
import Cards from "../cards/cards.module";
import Card from "../card/card.module";
import Button from "../button/button.module";
import {createEl, h} from "../../utils/Element";

import store from "../../store/store";
import {addCard, deleteColumn} from "../../store/reducers/actions";

class Column extends Factory {
    constructor(state, props) {
        super('div', props);

        this.state = {
            draggedItem: null,
            idColumn: state.idColumn
        }

        this.cards = new Cards({idColumn: this.state.idColumn}, {className: 'column__cards-box cards-box'}).render();
    }

    _deleteColumn(parent) {
        parent.remove();

        store.dispatch(deleteColumn({idColumn: this.state.idColumn}))
    }

    _dblClick() {
        this.setAttribute('contenteditable', true);
    }

    _onBlur() {
        if (!this.innerHTML.trim()) {
            alert('Введите заголовок!');
        } else {
            this.removeAttribute('contenteditable');
        }
    }

    render() {
        const column = this.node;

        const columnTitle = new Factory('div', {
            className: 'column__title',
            onblur: this._onBlur,
            ondblclick: this._dblClick,
            contentEditable: true
        }, 'Новая' +
            ' колонка').render()

        const columnAddButton = new Button('button', {
                className: 'column__button button',
                onclick: () => this.createCard(this.state.idColumn)
            }, '+ Добавить карточку').render();

        const columnDeleteIconBtn = new Button('img', {
                    className: 'column__icon trash-icon',
                    src: 'https://image.flaticon.com/icons/png/512/748/748023.png',
                    onclick: () => this._deleteColumn(column)
                }
            ).render()

        column.append(columnTitle);
        column.append(this.cards)
        // column.append(columnAddButton);
        column.append(columnDeleteIconBtn);

        return (
            column
        )
    }
}

export default Column;