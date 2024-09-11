import {
    getClassName,
} from './component_helper.js';


function getPage() {
    return document.querySelector(".page");
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

function getListTitle(parent) {
    // the area that contains all list items within a list
    return parent.querySelector(".list-title");
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

function getPillarMain(parent) {
    return parent.querySelector(".pillar-main");
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
    getSubmitConditionArea,
    getSubmitListSelected,
    getSubmitConditionSelected,
    getSubmitGeneralArea
}