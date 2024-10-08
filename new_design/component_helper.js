

function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}

function printIfTrue(statement, condition, returnValue = '') {
    if (typeof statement === 'function')
        return condition ? statement() : returnValue
    return condition ? statement : returnValue
}

function appendAndRetrieve(element, newElement) {
    element.insertAdjacentHTML('beforeend', newElement);
    return element.lastChild;
}

export {
    getClassName,
    printIfTrue,
    appendAndRetrieve
}