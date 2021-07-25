import Factory from "../../modules/Factory";
import Button from "../button/button.component";

export default class Card extends Factory {
    constructor(state, props, children) {
        super('form', props, children);

        this.state = {
            value: state.value || '',
            idCard: state.idCard,
            idColumn: state.idColumn
        }

        this.props = props;
    }

    render() {
        return  (
            new Factory('form', {
                    className: this.props.className,
                    dataId: this.props.dataId,
                    onclick: this.props.onclick
                }, [
                    new Factory('input', {
                        type: 'text',
                        className: 'card__input',
                        name: 'field',
                        value: this.state.value,
                        autofocus: true
                    }).render(),
                    new Factory('input', {
                        type: 'submit',
                        value: 'Сохранить',
                        className: 'card__save',
                        name: 'save'
                    }).render(),
                    new Factory('input', {
                        type: 'submit',
                        value: 'Удалить',
                        className: 'card__delete',
                        name: 'delete'
                    }).render()
                ]
            ).render()
        )
    }
}


