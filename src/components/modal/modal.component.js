import Factory from "../Factory";
import {createEl, h} from "../../utils/Element";

export default class Modal extends Factory {
    constructor(state, props) {
        super('div', props);

        this.state = {
            title: state.title
        }
    }

    _hideModal() {
        document.querySelector('.modal').classList.remove('modal__active');
    }

    render() {
        const modal = this.node;

        const modalContent = createEl(
            h('div', {className: 'modal__content'},
                h('h2', {className: 'modal__title'}, this.state.title),
                h('button', {className: 'modal__close-button', onclick: this._hideModal}, 'X')
        ))

        modal.append(modalContent);

        return (
            modal
        )
    }
}