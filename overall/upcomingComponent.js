import * as ch from './component_helper.js';
import * as _ from './getThis.js';
import * as d from './dataManager.js';

function createPillar(title, status) {
    let pillarString = `
        <div class="flexible pillar ${ch.getClassName(title)}">
            <h1 class="pillar-title">${title}</h1>
            <div class="flexible pillar-main">
                <div class="flexible noti-area"></div>
                <div class="flexible noti-input-area"></div>
                <div class="flexible noti-action-area"></div>
            </div>
        </div>
        `

    d.newPillar(title, status);
    return ch.appendAndRetrieve(_.getPage(), pillarString);
}

function createUpcomingTask(pillar, notiName) {
    let task = `
        <div class="notification flexible">
            <div class="noti-name">${notiName}</div>
            <div class="noti-tag-area flexible"></div>
        </div>
    `;

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getNotiArea(pillar), task);
}

function createNotiTag(notification, notis) {
    let tag = '';
    for (let notiName of notis) {
        tag += `
            <div class="noti-tag">${notiName}</div>
        `;
    }

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getNotiTagArea(notification), tag);
}

function createDateInput(parent) {
    let dateInput = `
        <input type="text" id="newTask" name="newTask">
        <input type="date" id="newTaskDate" name="newTaskDate">
        <input type="number" id="priorReminder" name="priorReminder">
        <button class="submitNotiInput"></div>
    `;
    return ch.appendAndRetrieveParent(_.getNotiInputArea(parent), dateInput);
}

function createNotiActionTag(parent, name) {
    let tag = `
        <div class="noti-action-tag">${name}</div>
    `;

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getNotiActionArea(parent), tag);
}


export {
    createPillar,
    createUpcomingTask,
    createNotiTag,
    createNotiActionTag,
    createDateInput
}