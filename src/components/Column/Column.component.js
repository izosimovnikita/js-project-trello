import {createEl, h} from "../../Element";
import Factory from "../Factory";

class Column extends Factory {
    constructor(props) {
        super();
        this.title = props.title;
    }

    render() {
        const column = (
            h('div', {className: 'app__column column', draggable: true},
                h('h2', {className: 'column__title', text: this.title}),
                h('div', {className: 'column__cards cards'}),
                h('button', {className: 'column__button button', onclick: props.createCard}, 'Добавить карточку')
            )
        )

        return createEl(column);
    }
}

export default Column;