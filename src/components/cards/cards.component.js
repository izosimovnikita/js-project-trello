import Factory from "../../modules/Factory";

import store from "../../store/store";
import Button from "../button/button.component";
import Card from "../card/card.component";
import {createEl, h} from "../../utils/Element";
import {addCard, deleteCard, editCard} from "../../store/actions/actions";

export default class Cards extends Factory {
    constructor(state, props, children) {
        super('div', props);

        this.state = {
            idColumn: state.idColumn,
            idCard: 0,
            cards: state.cards,
            draggingItem: null,
        }
    }

    addDnD(elem) {
        elem.addEventListener('dragstart', (event) => this._dragStart(event));
        elem.addEventListener('dragend', (event) => this._dragEnd(event));
        elem.addEventListener('dragenter', (event) => this._dragEnter(event));
        elem.addEventListener('dragover', (event) => this._dragOver(event), true);
    }

    createCard(cardText = '', idCard, idColumn, isNew = true) {
        const card = new Card({
                cardText,
                idCard,
                idColumn
            },
            {
                dataId: idCard,
                formHandler: (event) => this._cardHandler(event)
            }).render();

        if (!isNew) {
            card.querySelector('.card__form').classList.add('hidden');
            card.querySelector('.form-block').classList.remove('hidden');
            this.node.insertBefore(card, this.node.lastChild);
        } else {
            this.node.lastChild.classList.add('hidden');
            this.node.insertBefore(createEl(card), this.node.lastChild);

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
                    form.nextElementSibling.querySelector('.form-block__field').innerHTML = text;
                    form.classList.add('hidden');
                    form.nextElementSibling.classList.remove('hidden');

                    this.node.lastChild.classList.remove('hidden');
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
                form.parentElement.parentElement.lastChild.classList.remove('hidden');
                form.parentElement.classList.add('animate-card');
                form.parentElement.getAnimations()
                    .forEach((anim, i) => {
                        if (i === 0) {
                            anim.onfinish = () => {
                                form.removeEventListener('click', this._cardHandler);
                                form.parentElement.remove();
                            }
                        }
                    });

                break;
            }
        }
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

        if (current.classList.contains('form-block__field')) {
            const active = document.querySelector('.selected-card');

            if (active === current || !active) {
                return;
            }

            let next;
            if (current.parentElement.parentElement === active.nextElementSibling) {
                if (!current.parentElement.parentElement.nextElementSibling) {
                    return;
                }

                next = current.parentElement.parentElement.nextElementSibling;
            } else {
                next = current.parentElement.parentElement;
            }

            event.target.parentElement.parentElement.parentElement.insertBefore(active, next);
        }
    }

    componentDidMount() {
        if (Object.values(this.state.cards).length && this.state.cards) {
            Object.values(this.state.cards).forEach(card => {
                if (card.text.trim() && card.text.length) {
                    this.createCard(card.text, card.id, this.state.idColumn, false);
                }
            });
        }
    }

    render() {
        const cards = this.node;

        const addCardButton = new Button('button', {
            className: 'column__button column-button',
            onclick: () => this.createCard('', this.state.idCard, this.state.idColumn)
        }, [
            new Factory('img', {
                className: 'column-button__icon',
                src: 'https://image.flaticon.com/icons/png/512/748/748113.png'
            }).render(),
            'Добавить карточку'
        ]).render();

        cards.append(addCardButton);
        this.addDnD(cards);

        return cards;
    }
}