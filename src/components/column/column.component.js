import Factory from "../Factory";
import Card from "../card/card.module";
import {createEl, h} from "../../Element";

class Column extends Factory {
    constructor(props) {
        super();

        this.state = {
            title: props.title,
        }
    }

    _createCard() {
        const card = new Card();

        this.parentElement.insertBefore(card.render(), this);
    }

    _dblClick() {
        this.setAttribute('contenteditable', true);
        this.focus();
    }

    _onBlur() {
        this.removeAttribute('contenteditable');
    }

    render() {
        return (
            createEl(
                h('div', {className: 'columns__column column', draggable: true},
                    h('div', {
                        className: 'column__title',
                        onblur: this._onBlur,
                        ondblclick: this._dblClick,
                        contentEditable: true
                    }, 'Новая' +
                        ' колонка'),
                    h('button', {className: 'column__button button', onclick: this._createCard}, '+ Добавить карточку')
                )
            )
        )
    }
}

export default Column;