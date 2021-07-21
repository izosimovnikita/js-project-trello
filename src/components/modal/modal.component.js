import Factory from "../Factory";
import {createEl, h} from "../../utils/Element";

export default class Modal extends Factory {
    constructor(props) {
        super();

        this.state = {
            title: props.title
        }
    }

    _hideModal() {
        document.querySelector('.modal').classList.remove('modal__active');
    }

    render() {
        return createEl(
            h('div', {className: 'modal'},
                h('div', {className: 'modal__content'},
                    h('h2', {className: 'modal__title'}, this.state.title),
                    h('button', {className: 'modal__close-button', onclick: this._hideModal}, 'X')
                )
            )
        )
    }
}