import {
    getClassName,
    printIfTrue, appendAndRetrieve, getSubmitConditionNames, getListConditionNames,
    getSubmitListNames
} from './component_helper.js';
import * as _ from './data.js';

function createPillar(title) {
    let pillarString = `
        <div class="flexible pillar ${getClassName(title)}">
            <h1 class="pillar-title">${title}</h1>
            <div class="flexible pillar-main">
                <div class="flexible list-area"></div>
            </div>
        </div>
        `
    return appendAndRetrieve(_.getPage(), pillarString);
}

function createList(pillar, listTitle) {
    let listString = `
        <div class="flexible wrapper ${getClassName(listTitle)}">
            <div class="list">
                <div class="list-title">${listTitle}</div>
                <div class="list-item-area scrolling"></div>
            </div>
            <div class="flexible list-condition-area"></div>
        </div>
    `;
    return appendAndRetrieve(_.getListArea(pillar), listString);
}

function isExistingList(parent, listName) {
    return getSubmitListNames(parent).includes(getClassName(listName))
}

function createListItem(listElement, taskDescription, tag = '', isHidden = true) {
    let tagClass = tag ? `
        ${printIfTrue('hidden', isHidden)} ${getClassName(tag)}
    ` : '';
    let listItemString = `
        <div class="flexible list-item ${tagClass}">
            <div class="check"></div>
            <div class="flexible list-value">${taskDescription}
            </div>
            <div class="delete-line"></div>
        </div>
    `;
    return appendAndRetrieve(_.getListItemArea(listElement), listItemString);
}

function createListCondition(listElement, tagName) {
    // no repeat tags
    if (getListConditionNames(listElement).includes(tagName)) return;
    let listConditionString = `
        <div class="flexible list-condition-tag">${tagName}</div>
    `;
    return appendAndRetrieve(_.getListConditionArea(listElement), listConditionString);
}

function createSubmitArea(pillar) {
    let submitAreaString = `
    <div class="flexible submit-area">
        <div class="submit-input flexible">
            <textarea class="submit-text-area"></textarea>
            <button class="submit-button"></button>
        </div>
        <div class="flexible submit-list-area"></div>
        <div class="flexible submit-general-area"></div>
        <div class="flexible submit-condition-area"></div>
    </div>
    `
    return appendAndRetrieve(_.getPillarMain(pillar), submitAreaString);
}

function createSubmitListTag(parent, listName) {
    /* Adds the title name as the tag*/
    
    let listTagString = `
        <div class="flexible submit-list-tag">${listName}</div>
        `;

    return appendAndRetrieve(_.getSubmitListArea(parent), listTagString);
}

function createSubmitGeneral(parent, genName) {
    let generalTagString = `
        <div class="flexible submit-general-tag">${genName}</div>
        `;

    return appendAndRetrieve(_.getSubmitGeneralArea(parent), generalTagString);
}

function createSubmitCondition(parent, condition) {
    console.log("parent");
    console.log(parent);
    // no repeat tags
    if (getSubmitConditionNames(parent).includes(condition)) return;

    let conditionTagsString = `
        <div class="flexible submit-condition-tag">${condition}</div>
        `;

    return appendAndRetrieve(_.getSubmitConditionArea(parent), conditionTagsString);
}


export {
    createPillar,
    createList,
    isExistingList,
    createListItem,
    createListCondition,
    createSubmitArea,
    createSubmitListTag,
    createSubmitCondition,
    createSubmitGeneral
}