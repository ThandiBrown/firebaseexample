

function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}

function printIfTrue(statement, condition, returnValue = '') {
    if (typeof statement === 'function')
        return condition ? statement() : returnValue
    return condition ? statement : returnValue
}

function append(element, newElement) {
    element.insertAdjacentHTML('beforeend', newElement);
}

function appendAndRetrieve(element, newElement) {
    element.insertAdjacentHTML('beforeend', newElement);
    return element.lastElementChild;
}

function getSubmitConditionNames(parent) {
    const tags = parent.querySelectorAll('.submit-condition-tag');
    const innerTextSet = Array.from(tags).map(tag => getClassName(tag.innerText.trim()));
    return innerTextSet;
}

function getListConditionNames(parent) {
    const tags = parent.querySelectorAll('.list-condition-tag');
    const innerTextSet = Array.from(tags).map(tag => getClassName(tag.innerText.trim()));
    return innerTextSet;
}

export {
    getClassName,
    printIfTrue,
    append,
    appendAndRetrieve,
    getSubmitConditionNames,
    getListConditionNames
}