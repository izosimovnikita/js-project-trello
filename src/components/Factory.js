import {Mediator} from '../modules/mediator';

// Basic class
export default class Factory {
    constructor(props = {}) {
        const mediator = new Mediator();
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
}
