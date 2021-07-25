import {Mediator} from './mediator';
import {createEl, h} from "../utils/Element";

// Basic class
export default class Factory {
    constructor(tagName = 'div', props = {}, children = []) {
        const mediator = new Mediator();

        if (children.length) {
            this.node = createEl(h(tagName, props, ...children));
        } else {
            this.node = createEl(h(tagName, props));
        }
    }

    static createElement(type, config, ...children) {
        const key = config ? (config.key || null) : null;
        const props = config || {};
        props.children = children;

        if (children.length === 1) {
            props.children = children[0];
        } else {
            props.children = children;
        }

        return {
            type,
            key,
            props
        }
    }

    setState(newState) {
        this.state = {
            ...this.state,
            newState
        }
    }

    appendTo(parent) {
        parent.append(this.node);
    }

    render() {
        const element = this.node;

        return (
            element
        )
    }
}
