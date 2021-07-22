import Factory from "../Factory";

export default class Button extends Factory {
    constructor(tagName, props, children) {
        super(tagName, props, children);
    }

    render() {
        return this.node;
    }
}