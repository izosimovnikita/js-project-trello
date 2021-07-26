import Factory from "../../modules/Factory";
import Cards from "../cards/cards.module";
import Button from "../button/button.module";

import store from "../../store/store";
import {deleteColumn, editColumnTitle} from "../../store/actions/actions";

export default class Column extends Factory {
    constructor(state, props, children) {
        super('div', props);

        this.state = {
            draggedItem: null,
            idColumn: state.idColumn,
            title: state.title,
            cards: state.cards
        }
    }

    _deleteColumn(event) {
        event.target.parentElement.classList.add('animate-col');
        event.target.parentElement.getAnimations()
            .forEach((anim, i) => {
                if (i === 0) {
                    anim.onfinish = () => event.target.parentElement.remove();
                }
            });

        store.dispatch(deleteColumn({idColumn: this.state.idColumn}))
    }

    _editTitle(event) {
        if (event.target.classList.contains('title-box__block')) {
            event.target.previousElementSibling.value = event.target.innerHTML;
            event.target.previousElementSibling.classList.remove('hidden');
            event.target.classList.add('hidden');
        } else {
            event.preventDefault();
        }
    }

    _onFocutOutTitle(event) {
        if (event.target.classList.contains('title-box__textarea')) {
            if (!event.target.value.trim()) {
                alert('Введите заголовок!');
            } else {
                event.target.nextElementSibling.innerHTML = event.target.value;
                event.target.nextElementSibling.classList.remove('hidden');
                event.target.classList.add('hidden');

                store.dispatch(editColumnTitle({
                    idColumn: this.state.idColumn,
                    newColumnTitle: event.target.value
                }))
            }
        } else {
            event.preventDefault();
        }
    }

    render() {
        const column = new Factory('div', {
            className: 'columns__column column',
            draggable: true}).render();

        const titleBox = new Factory('div', {
            className: 'column__title-box title-box',
            onClick: (event) => this._editTitle(event),
            onFocusOut: (event) => this._onFocutOutTitle(event)
        }).render();

        const textareaTitle = new Factory('textarea', {
            className: 'title-box__textarea hidden',
            maxLength: '512',
            spellcheck: false
        }).render()

        const blockTitle = new Factory('div', {
            className: 'title-box__block',
        }, this.state.title).render();

        const cardsBox = new Cards({
                idColumn: this.state.idColumn,
                cards: this.state.cards
            }, {className: 'column__cards-box cards-box'}
        );

        const deleteBtn = new Button('img', {
                className: 'column__icon trash-icon',
                src: 'https://image.flaticon.com/icons/png/512/748/748023.png',
                onclick: (event) => this._deleteColumn(event)
            }
        ).render();

        titleBox.append(textareaTitle);
        titleBox.append(blockTitle);
        column.append(titleBox);
        column.append(cardsBox.render());
        cardsBox.componentDidMount();
        column.append(deleteBtn);

        return column;
    }
}