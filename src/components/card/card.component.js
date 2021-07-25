import Factory from "../../modules/Factory";
import Button from "../button/button.component";

export default class Card extends Factory {
    constructor(state, props, children) {
        super('form', props, children);

        this.state = {
            cardText: state.cardText || '',
            idCard: state.idCard,
            idColumn: state.idColumn
        }

        this.props = props;
    }

    _editCard(event) {
        event.preventDefault();

        event.currentTarget.previousElementSibling.firstChild.value = event.currentTarget.innerHTML;
        event.currentTarget.parentElement.classList.add('hidden');
        event.currentTarget.parentElement.previousElementSibling.classList.remove('hidden');
    }

    render() {
        return (
            new Factory('div', {
                    className: 'cards-box__card card',
                    draggable: true
                },
                [
                    new Factory('form', {
                            className: 'card__form card-form',
                            dataId: this.props.dataId,
                            onclick: this.props.formHandler
                        }, [
                            new Factory('input', {
                                type: 'text',
                                className: 'card-form__input',
                                name: 'field',
                                value: this.state.cardText,
                                autofocus: true
                            }).render(),
                            new Factory('input', {
                                type: 'submit',
                                value: 'Сохранить',
                                className: 'card-form__save',
                                name: 'save'
                            }).render(),
                            new Factory('input', {
                                type: 'submit',
                                value: 'Удалить',
                                className: 'card-form__delete',
                                name: 'delete'
                            }).render()
                        ]
                    ).render(),

                    new Factory('div', {
                            className: 'card__form form-block hidden',
                            dataId: this.props.dataId,
                        },
                        [
                            new Factory('div', {className: 'form-block__field'}, this.state.cardText).render(),
                            new Button('img', {
                                className: 'form-block__icon pencil-icon',
                                src: 'https://image.flaticon.com/icons/png/512/117/117476.png',
                                onclick: (event) => this._editCard(event, this.props.dataId)
                            }).render()
                        ]
                    ).render()
                ]
            ).render()
        )
    }
}


