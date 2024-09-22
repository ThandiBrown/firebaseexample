import * as ch from './component_helper.js';
import * as _ from './getThis.js';
import * as d from './dataManager.js';

function createPillar(title) {
    let pillarString = `
        <div class="flexible pillar ${ch.getClassName(title)}">
            <h1 class="pillar-title">${title}</h1>
            <div class="flexible pillar-main">
                <div class="flexible list-area"></div>
            </div>
        </div>
        `

    d.newPillar(title);
    return ch.appendAndRetrieve(_.getPage(), pillarString);
}

function createCalendarArea(pillar) {
    let areaString = `<div class="flexible calendar-area"></div>`
    return ch.insertAndRetrieve(_.getPillarMain(pillar), areaString);
}

function createCalendar(calendarArea, calendarData) {
    let fulfillment = ch.returnRecordsAsBool(calendarData);
    let calendarString = '';
    for (let week of fulfillment) {
        calendarString += '<div class="flexible day-row">'
        for (let day of week) {
            calendarString += `
                <div class="day
                ${ch.printIfTrue(' fulfilled', day.fulfilled)}
                ${ch.printIfTrue(' progressed', day.progressed)}
                ${ch.printIfTrue(' ' + day.tag, day.tag)}" 
                title="${day.date}"
                ></div>`
        }
        calendarString += '</div>'
    }

    calendarString = `
        <div class="flexible calendar ${calendarData.type}">${calendarString}</div>
    `

    d.newCalendar(
        _.getPillarName(calendarArea, 'calendarArea'), calendarData
    );

    return ch.appendAndRetrieve(calendarArea, calendarString);
}

function createList(pillar, listTitle) {
    let listString = `
        <div class="flexible wrapper ${ch.getClassName(listTitle)}">
            <div class="list">
                <div class="list-title">${listTitle}</div>
                <div class="list-item-area scrolling"></div>
            </div>
            <div class="flexible list-condition-area"></div>
        </div>
    `;

    d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getListArea(pillar), listString);
}

function isExistingList(parent, listName) {
    return _.getSubmitListNames(parent).includes(ch.getClassName(listName))
}

function createListItem(listElement, taskDescription, tag = '', isHidden = true) {
    let tagClass = tag ? `
        ${ch.printIfTrue('hidden', isHidden)} ${ch.getClassName(tag)}
    ` : '';
    let listItemString = `
        <div class="flexible list-item ${tagClass}">
            <div class="check"></div>
            <div class="flexible list-value">${taskDescription}
            </div>
            <div class="delete-line"></div>
        </div>
    `;

    d.newListItem(
        _.getPillarName(listElement, 'listElement'),
        _.getListTitleName(listElement),
        taskDescription,
        tag
    );
    return ch.appendAndRetrieve(_.getListItemArea(listElement), listItemString);
}

function createListCondition(listElement, tagName) {
    // no repeat tags
    if (_.getListConditionNames(listElement).includes(tagName)) return;
    let listConditionString = `
        <div class="flexible list-condition-tag">${tagName}</div>
    `;
    return ch.appendAndRetrieve(_.getListConditionArea(listElement), listConditionString);
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
    return ch.appendAndRetrieve(_.getPillarMain(pillar), submitAreaString);
}

function createSubmitListTag(parent, listName) {
    /* Adds the title name as the tag*/

    let listTagString = `
        <div class="flexible submit-list-tag">${listName}</div>
        `;

    return ch.appendAndRetrieve(_.getSubmitListArea(parent), listTagString);
}

function createSubmitGeneral(parent, genName) {
    let generalTagString = `
        <div class="flexible submit-general-tag">${genName}</div>
        `;

    return ch.appendAndRetrieve(_.getSubmitGeneralArea(parent), generalTagString);
}

function createSubmitCondition(parent, condition) {
    // no repeat tags
    if (_.getSubmitConditionNames(parent).includes(condition)) return;

    let conditionTagsString = `
        <div class="flexible submit-condition-tag">${condition}</div>
        `;

    return ch.appendAndRetrieve(_.getSubmitConditionArea(parent), conditionTagsString);
}


export {
    createCalendar,
    createPillar,
    createList,
    isExistingList,
    createListItem,
    createListCondition,
    createSubmitArea,
    createSubmitListTag,
    createSubmitCondition,
    createSubmitGeneral,
    createCalendarArea
}