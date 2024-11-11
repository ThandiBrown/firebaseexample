


function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}

function getElement(className, pillarTitle, all = false) {
    if (all) {
        return document.querySelectorAll(`.${pillarTitle} .${className}`);
    }
    return document.querySelector(`.${pillarTitle} .${className}`);
}

export {
    getClassName,
    getElement
}