import Factory from "../Factory";
import store from "../../store/store";
import {createEl, h} from "../../utils/Element";

export default class Card extends Factory {
    constructor(props) {
        super();

        this.state = {
            edit: true,
            value: '',
            idCard: props.idCard,
            idColumn: props.idColumn
        }
    }

    _formHandler(event) {
        event.preventDefault();

        const target = event.target;
        const form = event.currentTarget;

        switch (target.name) {
            case 'save': {
                this.state.value = form.field.value;
                this.state.edit = false;

                if (!this.state.value.trim()) {
                    document.querySelector('.modal').classList.add('modal__active')
                } else {
                    const div = this._createCardField();

                    form.replaceWith(div);
                }

                store.dispatch({
                    type: 'EDIT_CARD',
                    payload: {
                        newCardText: this.state.value,
                        idCard: this.state.idCard,
                        idColumn: this.state.idColumn
                    }
                })

                break;
            }
            case 'delete': {
                form.remove();

                store.dispatch({
                    type: 'DELETE_CARD',
                    payload: {
                        idCard: this.state.idCard,
                        idColumn: this.state.idColumn
                    }
                })

                break;
            }
        }
    }

    _editCard(elem, value) {
        this.state.edit = true;

        const form = createEl(
            h('form', {
                    className: 'cards__card card',
                    onclick: (event) => this._formHandler(event)
                },
                h('input', {
                    type: 'text',
                    className: 'card__input',
                    name: 'field',
                    value
                }),
                h('input', {type: 'submit', value: 'Сохранить', className: 'card__save', name: 'save'}),
                h('input', {type: 'submit', value: 'Удалить', className: 'card__delete', name: 'delete'})
            )
        )

        elem.replaceWith(form);
    }

    _createCardField() {
        const card = createEl(h('div', {className: 'cards__card card', draggable: true}));
        const cardField = createEl(h('div', {className: 'card__field'}, this.state.value));
        const editIcon = createEl(
            h('img', {
                className: 'card__icon pencil-icon',
                src: 'https://image.flaticon.com/icons/png/512/117/117476.png',
                onclick: () => this._editCard(card, cardField.innerHTML)
            })
        )

        card.append(cardField);
        card.append(editIcon);

        return card;
    }

    render() {
        return (
            h('form', {
                    className: 'cards__card card',
                    onclick: (event) => this._formHandler(event)
                },
                h('input', {
                    type: 'text',
                    className: 'card__input',
                    name: 'field',
                    autofocus: true
                }),
                h('input', {type: 'submit', value: 'Сохранить', className: 'card__save', name: 'save'}),
                h('input', {type: 'submit', value: 'Удалить', className: 'card__delete', name: 'delete'})
            )
        )
    }
}


