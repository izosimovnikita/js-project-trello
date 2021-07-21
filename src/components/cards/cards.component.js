import Factory from "../Factory";

import store from "../../store/store";
import {createEl, h} from "../../utils/Element";

export default class Cards extends Factory {
    constructor(props) {
        super(props);

        this.state = {
            idColumn: props.idColumn
        }
    }

    _dragStart(event) {
        event.stopImmediatePropagation();
        setTimeout(() => {
            if (event.target.classList.contains('card')) {
                event.target.classList.add('selected-card');
            }
        }, 0)
    }

    _dragEnd(event) {
        event.stopImmediatePropagation();
        if (event.target.classList.contains('card')) {
            event.target.classList.remove('selected-card');
        }
    }

    _dragEnter(event) {
        event.preventDefault();
    }

    _dragOver(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (event.target.classList.contains('card')) {
            const active = this.querySelector('.selected-card');
            const current = event.target;
            const isMoveable = active !== current && current.classList.contains('card');

            if (!isMoveable) {
                return;
            }

            const next = current === active.nextElementSibling ? current.nextElementSibling : current;

            this.insertBefore(active, next);
        }
    }

    render() {
        return (
            h('div', {
                    className: 'column__cards-box cards-box', ondragstart: this._dragStart,
                    ondragend: this._dragEnd,
                    ondragover: this._dragOver,
                    ondragenter: this._dragEnter,
                },
                h('div', {
                    className: 'cards-box__cards cards'
                })
            )
        )
    }
}