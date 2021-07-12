import {createEl, h} from "../../Element";
import Factory from "../Factory";

class Card extends Factory {
    constructor(tagName, props) {
        super();

        this.state = {
            draggable: props.draggable,
            className: props.className
        }
    }

    //'cards__card'
    render() {
        return (
            createEl(
                h('div',
            {className: this.state.className, draggable: this.state.draggable},
            'Карточка'
                )
            )
        )
    }
}

export default Card;