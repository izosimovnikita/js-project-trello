import Factory from "../Factory";
import Cards from "../cards/cards.component";
import Card from "../card/card.component";

import store from "../../store/store";
import {createEl, h} from "../../utils/Element";

class Column extends Factory {
    constructor(props) {
        super();

        this.state = {
            draggedItem: null,
            idColumn: props.idColumn,
            idCard: 0
        }

        this.cards = createEl(
            new Cards({idColumn: this.state.id}).render()
        );
    }

    createCard() {
        store.dispatch({
            type: 'ADD_CARD',
            payload: {
                cardText: '',
                idColumn: this.state.idColumn,
                idCard: this.state.idCard
            }
        })

        const card = new Card({idCard: this.state.idCard, idColumn: this.state.idColumn});
        this.cards.append(createEl(card.render()));

        this.state.idCard += 1;
    }

    _deleteColumn(parent) {
        parent.remove();

        store.dispatch({
            type: 'DELETE_COLUMN',
            payload: {
                idColumn: this.state.idColumn
            }
        })
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
        const column = createEl(h('div', {className: 'columns__column column', draggable: true}));

        const columnTitle = createEl(
            h('div', {
                className: 'column__title',
                onblur: this._onBlur,
                ondblclick: this._dblClick,
                contentEditable: true
            }, 'Новая' +
                ' колонка')
        )

        const columnButton = createEl(
            h('button', {
                className: 'column__button button',
                onclick: () => this.createCard(this.state.idColumn)
            }, '+ Добавить' +
                ' карточку')
        )

        const columnIcon = createEl(
            h('img', {
                className: 'column__icon trash-icon',
                src: 'https://image.flaticon.com/icons/png/512/748/748023.png',
                onclick: () => this._deleteColumn(column)
            })
        )

        column.append(columnTitle);
        column.append(this.cards)
        column.append(columnButton);
        column.append(columnIcon);

        return (
            column
        )
    }
}

export default Column;