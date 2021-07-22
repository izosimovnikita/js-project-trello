import {Mediator} from '../modules/mediator';
import {createEl, h} from "../utils/Element";

// Basic class
export default class Factory {
    constructor(tagName = 'div', props = {}, children = []) {
        const mediator = new Mediator();

        if (children.length) {
            this.node = createEl(h(tagName, props, children));
        } else {
            this.node = createEl(h(tagName, props));
        }
    }

    appendTo(parent) {
        parent.append(this.node);
    }

    addHandler(name, func) {
        this.node.addEventListener(name, func);
    }

    render() {
        const element = this.node;

        return (
            element
        )
    }
}
