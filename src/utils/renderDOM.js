import Factory from "../components/Factory";
import App from "../App";

function evaluate(virtualNode) {
    if (typeof virtualNode !== 'object') {
        return virtualNode;
    }

    if (typeof virtualNode.type === 'function') {
        return evaluate((virtualNode.type)(virtualNode.props));
    }

    const props = virtualNode.props || {};

    return {
        ...virtualNode,
        props: {
            ...props,
            children: Array.isArray(props.children) ? props.children.map(evaluate) : [evaluate(props.children)]
        }
    }
}

function isEventProp(name) {
    return /^on/.test(name);
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

function addEventListeners(target, name, props) {
    target.addEventListener(
        extractEventName(name),
        props
    );
}

function sync(virtualNode, realNode) {
    // Sync element
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
            if (name === 'children' || name === 'key') {
                return;
            }

            if (isEventProp(name)) {
                addEventListeners(realNode, name, value);
            }

            if (realNode[name] !== value) {
                realNode[name] = value
            }
        })
    }

    if (virtualNode.key) {
        realNode.dataset.key = virtualNode.key;
    }

    if (typeof virtualNode !== 'object' && virtualNode !== realNode.nodeValue) {
        realNode.nodeValue = virtualNode;
    }

    // Sync child nodes
    const virtualChildren = virtualNode.props ? virtualNode.props.children || [] : [];
    const realChildren = realNode.childNodes;

    for (let i = 0; i < virtualChildren.length || i < realChildren.length; i++) {
        const virtualChild = virtualChildren[i];
        const realChild = realChildren[i];

        // Remove
        if (virtualChild === undefined && realChild !== undefined) {
            realNode.remove(realChild);
        }

        // Update
        if (realChild !== undefined && virtualChild !== undefined && (virtualChild.type || '') === (realChild.tagName || '').toLowerCase()) {
            sync(virtualChild, realChild);
        }

        // Replace
        if (realChild !== undefined && virtualChild !== undefined && (virtualChild.type || '') !== (realChild.tagName || '').toLowerCase()) {
            const newRealChild = createRealNodeByVirtual(virtualChild)
            sync(virtualChild, newRealChild);
            realNode.replaceChild(newRealChild, realChild);
        }

        // Add
        if (virtualChild !== undefined && realChild === undefined) {
            const newRealChild = createRealNodeByVirtual(virtualChild)
            sync(virtualChild, newRealChild);
            realNode.appendChild(newRealChild);
        }
    }
}

function createRealNodeByVirtual(virtualChild) {
    if (typeof virtualChild !== 'object') {
        return document.createTextNode('');
    }
    return document.createElement(virtualChild.type);
}

export default function render(virtualDom, realDomRoot) {
    const evaluatedVirtualDom = evaluate(virtualDom);

    const virtualDomRoot = {
        type: realDomRoot.tagName.toLowerCase(),
        props: {
            id: realDomRoot.id,
            ...realDomRoot.props,
            children: [
                evaluatedVirtualDom
            ]
        }
    }

    sync(virtualDomRoot, realDomRoot);
}

export function renderView(state) {
    render(
        Factory.createElement(App, { state }),
        document.getElementById('root')
    )
}