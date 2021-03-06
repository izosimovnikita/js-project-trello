function isCustomProp(name) {
    return isEventProp(name);
}

function setBooleanProp($target, name, value) {
    if (value) {
        $target.setAttribute(name, value);
        $target[name] = true;
    } else {
        $target[name] = false;
    }
}

function removeBooleanProp($target, name) {
    $target.removeAttribute(name);
    $target[name] = false;
}
function removeProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    } else if (name === 'className') {
        $target.removeAttribute('class');
    } else if (typeof value === 'boolean') {
        removeBooleanProp($target, name);
    } else {
        $target.removeAttribute(name);
    }
}

function setProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    } else if (name === 'className') {
        $target.setAttribute('class', value)
    } else if (name.slice(0, 4) === 'data') {
        $target.dataset.id = value;
    } else if (typeof value === 'boolean') {
        setBooleanProp($target, name, value);
    } else {
        $target.setAttribute(name, value);
    }
}

function setProps($target, props) {
    Object.keys(props).forEach(name => {
        setProp($target, name, props[name]);
    });
}

function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}

function updateProps($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}

function isEventProp(name) {
    return /^on/.test(name);
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

function addEventListeners($target, props) {
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            if (Array.isArray(props[name])) {
                $target.addEventListener(
                    extractEventName(name),
                    props[name][0],
                    props[name][1]
                )
            } else {
                $target.addEventListener(
                    extractEventName(name),
                    props[name]
                )
            }
        }
    });
}

function changed(node1, node2) {
    return (typeof node1 !== typeof node2)
        || (typeof node1 === 'string' && node1 !== node2)
        || (node1.type !== node2.type);
}

export function h(type, props, ...children) {
    return {type, props: props || {}, children};
}

export function createEl(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    if (node instanceof Element) {
        return node;
    }

    const $el = document.createElement(node.type);
    setProps($el, node.props);
    addEventListeners($el, node.props);
    node.children
        .map(createEl)
        .forEach($el.appendChild.bind($el));
    return $el;
}

export function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) { // ???????? ?????? ???????????? ????????
        $parent.appendChild(
            createEl(newNode)
        );
    } else if (!newNode) { // ???????? ?????? ?????????? ????????
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) { // ???????? ???????? ????????????????????
        $parent.replaceChild(
            createEl(newNode),
            $parent.childNodes[index]
        );
    } else if (newNode.type) { // ???????? ?? ???????? ???????? ????????
        updateProps(
            $parent.childNodes[index],
            newNode.props,
            oldNode.props
        );
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;

        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}