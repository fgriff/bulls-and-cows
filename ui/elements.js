export function elem(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.assign(node, props);
    for (const child of children) {
        node.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
}
export function clear(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
