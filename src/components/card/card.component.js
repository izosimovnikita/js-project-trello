import Factory from "../Factory";

import store from "../../store/store";

export default class Card extends Factory {
    constructor(state, props) {
        super('form', props);

        this.state = {
            value: state.value || '',
            idCard: state.idCard,
            idColumn: state.idColumn
        }
    }

    render() {
        const form = this.node;

        const cardInput = new Factory('input', {
            type: 'text',
            className: 'card__input',
            name: 'field',
            autofocus: true,
            value: this.state.value
        }).render();

        const saveBtn = new Factory('input', {
            type: 'submit',
            value: 'Сохранить',
            className: 'card__save',
            name: 'save'
        }).render();

        const deleteBtn = new Factory('input', {
            type: 'submit',
            value: 'Удалить',
            className: 'card__delete',
            name: 'delete'
        }).render()

        form.append(cardInput);
        form.append(saveBtn);
        form.append(deleteBtn);

        return (
            form
        )
    }
}


