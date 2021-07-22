import Factory from "../Factory";

import store from "../../store/store";
import Button from "../button/button.component";
import Card from "../card/card.component";
import {createEl, h} from "../../utils/Element";
import {addCard, deleteCard, editCard} from "../../store/reducers/actions";

export default class Cards extends Factory {
    constructor(state, props) {
        super('div', props);

        this.addDnD(this.node);

        this.addCardButton = new Button('button', {
            className: 'column__button button',
            onclick: () => this.createCard(this.state.idColumn)
        }, '+ Добавить карточку').render();

        this.state = {
            edit: false,
            idColumn: state.idColumn,
            idCard: 0
        }
    }

    addDnD(elem) {
        elem.addEventListener('dragstart', this._dragStart);
        elem.addEventListener('dragend', this._dragEnd);
        elem.addEventListener('dragenter', this._dragEnter);
        elem.addEventListener('dragover', this._dragOver);
    }

    createCard() {
        this.state.edit = true;

        const card = new Card({
                idCard: this.state.idCard,
                idColumn: this.state.idColumn
            },
            {
                dataId: this.state.idCard,
                className: 'cards-box__card card',
                onclick: (event) => this._cardHandler(event, this.state.idCard)
            }).render();

        this.node.lastChild.remove();
        this.node.append(createEl(card));

        store.dispatch(addCard({cardText: '', idColumn: this.state.idColumn, idCard: this.state.idCard}))
        this.state.idCard += 1;
    }

    _cardHandler(event) {
        event.preventDefault();

        const target = event.target;
        const form = event.currentTarget;
        const idCard = target.parentElement.dataset.id;

        switch (target.name) {
            case 'save': {
                this.state.value = form.field.value;
                this.state.edit = false;

                if (!this.state.value.trim()) {
                    document.querySelector('.modal').classList.add('modal__active')
                } else {
                    const div = this._createCardField(idCard);

                    form.parentElement.append(this.addCardButton)
                    form.replaceWith(div);
                }

                store.dispatch(editCard({
                    newCardText: this.state.value,
                    idCard,
                    idColumn: this.state.idColumn
                }))

                break;
            }
            case 'delete': {
                this.state.edit = false;
                store.dispatch(deleteCard({idCard, idColumn: this.state.idColumn}))

                form.parentElement.append(this.addCardButton)
                form.remove();

                break;
            }
        }
    }

    _createCardField(id) {
        const card = new Factory('div', {className: 'cards-box__card card', dataId: id, draggable: true}).render()
        const cardField = new Factory('div', {className: 'card__field'}, this.state.value).render();
        const editIconBtn = new Button('img', {
            className: 'card__icon pencil-icon',
            src: 'https://image.flaticon.com/icons/png/512/117/117476.png',
            onclick: () => this._editCard(card, cardField.innerHTML, id)
        }).render()

        card.append(cardField);
        card.append(editIconBtn);

        return card;
    }

    _editCard(elem, value, id) {
        this.state.edit = true;

        const card = new Card({
                idCard: this.state.idCard,
                idColumn: this.state.idColumn,
                value
            },
            {
                dataId: id,
                className: 'cards-box__card card',
                onclick: (event) => this._cardHandler(event, this.state.idCard)
            }).render();

        elem.replaceWith(card);
    }

    _dragStart(event) {
        event.stopImmediatePropagation();
        setTimeout(() => {
            if (event.target.classList.contains('card')) {
                event.target.classList.add('selected-card');
            }
        }, 0)
    }

    _dragEnd(event) {
        event.stopImmediatePropagation();
        if (event.target.classList.contains('card')) {
            event.target.classList.remove('selected-card');
        }
    }

    _dragEnter(event) {
        event.preventDefault();
    }

    _dragOver(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (event.target.classList.contains('card')) {
            const active = this.querySelector('.selected-card');
            const current = event.target;
            const isMoveable = active !== current && current.classList.contains('card');

            if (!isMoveable) {
                return;
            }

            const next = current === active.nextElementSibling ? current.nextElementSibling : current;

            this.insertBefore(active, next);
        }
    }

    render() {
        const cards = this.node;
        cards.append(this.addCardButton);

        return (
            cards
        )
    }
}