import {
    getClassName,
    printIfTrue, appendAndRetrieve, getSubmitConditionNames, getListConditionNames
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
            <div class="list scrolling">
                <div class="list-title">${listTitle}</div>
                <div class="list-item-area"></div>
            </div>
            <div class="flexible list-condition-area"></div>
        </div>
    `;
    return appendAndRetrieve(_.getListArea(pillar), listString);
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

function createSubmitList(pillar, listName) {
    let listTagString = `
        <div class="flexible submit-list-tag">${listName}</div>
        `;

    return appendAndRetrieve(_.getSubmitListArea(pillar), listTagString);
}

function createSubmitGeneral(pillar, genName) {
    let generalTagString = `
        <div class="flexible submit-general-tag">${genName}</div>
        `;

    return appendAndRetrieve(_.getSubmitGeneralArea(pillar), generalTagString);
}

function createSubmitCondition(pillar, condition) {
    // no repeat tags
    if (getSubmitConditionNames(pillar).includes(condition)) return;

    let conditionTagsString = `
        <div class="flexible submit-condition-tag">${condition}</div>
        `;

    return appendAndRetrieve(_.getSubmitConditionArea(pillar), conditionTagsString);
}


export {
    createPillar,
    createList,
    createListItem,
    createListCondition,
    createSubmitArea,
    createSubmitList,
    createSubmitCondition,
    createSubmitGeneral
}