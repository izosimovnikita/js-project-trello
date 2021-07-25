import Factory from "../../modules/Factory";

import store from "../../store/store";
import Button from "../button/button.component";
import Card from "../card/card.component";
import {createEl, h} from "../../utils/Element";
import {addCard, deleteCard, editCard} from "../../store/actions/actions";

export default class Cards extends Factory {
    constructor(state, props, children) {
        super('div', props);

        this.addDnD(this.node);

        this.addCardButton = new Button('button', {
            className: 'column__button button',
            onclick: () => this.createCard('', this.state.idCard, this.state.idColumn)
        }, '+ Добавить карточку').render();

        this.state = {
            idColumn: state.idColumn,
            idCard: 0,
            cards: state.cards,
            draggingItem: null,
            edit: false
        }
    }

    addDnD(elem) {
        elem.addEventListener('dragstart', (event) => this._dragStart(event));
        elem.addEventListener('dragend', (event) => this._dragEnd(event));
        elem.addEventListener('dragenter', (event) => this._dragEnter(event));
        elem.addEventListener('dragover', (event) => this._dragOver(event), true);
        elem.addEventListener('drop', (event) => this._dragDrop(event), true);
    }

    createCard(cardText, idCard, idColumn, isNew = true) {
        let card;

        if (!isNew) {
            card = this._createCardField(cardText, idCard);

            this.node.insertBefore(card, this.node.lastChild);
            store.dispatch(addCard({cardText, idColumn, idCard}))
            return;
        } else {
            card = new Card({
                    idCard,
                    idColumn,
                    isNew
                },
                {
                    dataId: this.state.idCard,
                    className: 'cards-box__card card',
                    onclick: (event) => this._cardHandler(event)
                }).render();

            this.node.lastChild.remove();
            this.node.append(createEl(card));

            store.dispatch(addCard({cardText, idColumn, idCard}))
        }

        this.state.idCard = idCard + 1;
    }

    _cardHandler(event) {
        event.preventDefault();

        const target = event.target;
        const form = event.currentTarget;
        const idCard = target.parentElement.dataset.id;

        switch (target.name) {
            case 'save': {
                const text = form.field.value;

                if (!text.trim()) {
                    document.querySelector('.modal').classList.add('modal__active')
                } else {
                    const div = this._createCardField(text, idCard);

                    form.parentElement.append(this.addCardButton)
                    form.replaceWith(div);
                }

                store.dispatch(editCard({
                    newCardText: text,
                    idCard,
                    idColumn: this.state.idColumn
                }))

                break;
            }
            case 'delete': {
                store.dispatch(deleteCard({idCard, idColumn: this.state.idColumn}))

                form.parentElement.append(this.addCardButton)
                form.remove();

                break;
            }
        }
    }

    _createCardField(cardText, id) {
        console.log('card text', cardText)
        const card = new Factory('div', {className: 'cards-box__card card', dataId: id, draggable: true}).render()
        const cardField = new Factory('div', {className: 'card__field'}, cardText).render();
        const editIconBtn = new Button('img', {
            className: 'card__icon pencil-icon',
            src: 'https://image.flaticon.com/icons/png/512/117/117476.png',
            onclick: () => this._editCard(card, cardField.innerHTML, id)
        }).render();

        card.append(cardField);
        card.append(editIconBtn);

        return card;
    }

    _editCard(elem, value, id) {
        const card = new Card({
                idCard: this.state.idCard,
                idColumn: this.state.idColumn,
                value
            },
            {
                dataId: id,
                className: 'cards-box__card card',
                onclick: (event) => this._cardHandler(event)
            }).render();

        elem.replaceWith(card);
    }

    _dragStart(event) {
        this.state.draggingItem = event.target;

        if (event.target.classList.contains('card')) {
            event.stopPropagation();
            setTimeout(() => {
                event.target.classList.add('selected-card');
            }, 0)
        } else {
            event.preventDefault();
        }
    }

    _dragEnd(event) {
        this.state.draggingItem = null;

        event.stopPropagation();
        if (event.target.classList.contains('card')) {
            event.target.classList.remove('selected-card');
        }
    }

    _dragEnter(event) {
        event.preventDefault();
    }

    _dragOver(event) {
        event.stopPropagation();
        event.preventDefault();

        const current = event.target;

        if (current.classList.contains('card__field')) {
            const active = document.querySelector('.selected-card');

            if (active === current || !active) {
                return;
            }

            let next;
            if (current.parentElement === active.nextElementSibling) {
                if (!current.parentElement.nextElementSibling) {
                    return;
                }

                next = current.parentElement.nextElementSibling;
            } else {
                next = current.parentElement;
            }

            event.target.parentElement.parentElement.insertBefore(active, next);
        }
    }

    _dragDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        // event.target.parentElement.insertBefore(this.state.draggingItem, event.target.parentElement)
    }

    componentDidMount() {
        // if (Object.values(this.state.cards).length && this.state.cards) {
        //     Object.values(this.state.cards).forEach(card => {
        //         console.log('card id', card.id)
        //         console.log('card text', card.text)
        //         this.createCard(card.text, card.id, this.state.idColumn, false);
        //     });
        // }
    }

    render() {
        const cards = this.node;
        cards.append(this.addCardButton);

        return cards;
    }
}