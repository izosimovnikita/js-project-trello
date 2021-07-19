import Factory from "../Factory";
import {createEl, h} from "../../Element";

export default class Card extends Factory {
    constructor(props) {
        super();

        this.state = {}
    }

    _dblClick() {
        this.setAttribute('contenteditable', true);
        this.focus();
    }

    _onBlur() {
        this.removeAttribute('contenteditable');

        if (!this.innerHTML.trim().length) {
            this.remove();
        }
    }

    render() {
        return createEl(
            h('div', {
                className: 'cards__card',
                ondblclick: this._dblClick,
                onblur: this._onBlur,
                draggable: true,
                contentEditable: true
            })
        )
    }
}

