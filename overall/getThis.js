import {
    getClassName,
} from './component_helper.js';


function getPage() {
    return document.querySelector(".page");
}

function getPillars() {
    return document.querySelectorAll(".pillar");
}

function getPillarMain(pillar) {
    return pillar.querySelector(".pillar-main");
}

function getPillarName(element, type = 'pillar') {
    if (type == 'listElement') {
        for (let pillar of getPillars()) {
            if (pillar.contains(element)) {
                element = pillar;
                break;
            }
        }
    }

    return element.querySelector(".pillar-title").innerText;
}

function getListArea(parent) {
    // the area that contains all lists in a pillar
    return parent.querySelector(".list-area");
}

function getListElement(parent, listTitle) {
    return parent.querySelector("." + getClassName(listTitle));
}

function getListItemArea(parent) {
    // the area that contains all list items within a list
    return parent.querySelector(".list-item-area");
}

function getListTitle(listElement) {
    // the area that contains all list items within a list
    return listElement.querySelector(".list-title");
}

function getListTitleName(listElement) {
    // the area that contains all list items within a list
    return listElement.querySelector(".list-title").innerText;
}

function getListItemName(listItem) {
    return listItem.querySelector(".list-value").innerText;
}

function getCheckButton(parent) {
    return parent.querySelector('.check');
}

function getDeleteButton(parent) {
    return parent.querySelector('.delete-line');
}

function getListConditionArea(parent) {
    return parent.querySelector(".list-condition-area");
}

function getListConditionMatches(parent) {
    const tags = parent.querySelectorAll('.list-condition-tag');
    let matches = {};
    const innerTextSet = Array.from(tags).map(tag => matches[getClassName(tag.innerText.trim())] = tag);
    return matches;
}

function getListItems(parent, tag = null) {
    if (tag instanceof Element) {
        return parent.querySelectorAll('.' + getClassName(tag.innerText));
    }
    else if (typeof tag === 'string') {
        return parent.querySelectorAll('.' + tag);
    }
    else {
        return parent.querySelectorAll('.list-item');
    }
}

function getSubmitArea(parent) {
    return parent.querySelector(".submit-area");
}


function getTextArea(parent) {
    return parent.querySelector(".submit-text-area");
}

function getSubmitButton(parent) {
    return parent.querySelector(".submit-button");
}

function getSubmitListArea(parent) {
    return parent.querySelector(".submit-list-area");
}

function getSubmitListTag(parent, tagName) {
    let tags = parent.querySelectorAll(".submit-list-tag");
    for (let tag of tags) {
        if (tag.innerText == tagName)
            return tag;
    }
    return null
}

function getSubmitGeneralArea(parent) {
    return parent.querySelector(".submit-general-area");
}

function getSubmitConditionArea(parent) {
    return parent.querySelector(".submit-condition-area");
}

function getSubmitListSelected(parent) {
    return parent.querySelector(".submit-list-selected");
}

function getSubmitConditionSelected(parent) {
    return parent.querySelector(".submit-condition-selected");
}

function getSubmitListNames(parent) {
    const tags = parent.querySelectorAll('.submit-list-tag');
    const innerTextSet = Array.from(tags).map(tag => getClassName(tag.innerText.trim()));
    return innerTextSet;
}

function getListConditionNames(parent) {
    const tags = parent.querySelectorAll('.list-condition-tag');
    const innerTextSet = Array.from(tags).map(tag => getClassName(tag.innerText.trim()));
    return innerTextSet;
}

function getSubmitConditionNames(parent) {
    const tags = parent.querySelectorAll('.submit-condition-tag');
    const innerTextSet = Array.from(tags).map(tag => getClassName(tag.innerText.trim()));
    return innerTextSet;
}

export {
    getPage,
    getListArea,
    getListElement,
    getListItemArea,
    getListTitle,
    getCheckButton,
    getDeleteButton,
    getListConditionArea,
    getListItems,
    getSubmitArea,
    getPillarMain,
    getTextArea,
    getSubmitButton,
    getSubmitListArea,
    getSubmitListTag,
    getSubmitConditionArea,
    getSubmitListSelected,
    getSubmitConditionSelected,
    getSubmitGeneralArea,
    getListConditionMatches,
    getSubmitConditionNames,
    getListConditionNames,
    getSubmitListNames,
    getListItemName,
    getPillarName,
    getListTitleName
}