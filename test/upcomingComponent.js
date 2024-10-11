import * as ch from './component_helper.js';
import * as _ from './getThis.js';
import * as d from './dataManager.js';

function createUpcomingPillar() {
    let pillarString = `
        <div class="flexible pillar upcoming">
            <h1 class="pillar-title">Upcoming</h1>
            <div class="flexible pillar-main">
                <div class="flexible noti-area"></div>
                <div class="flexible reminder-area"></div>
                <div class="flexible upcoming-input-area"></div>
                <div class="flexible upcoming-action-area"></div>
            </div>
        </div>
        `
    return ch.appendAndRetrieve(_.getPage(), pillarString);
}

function createReminder(reminder) {
    let tags = '';
    for (let tagName of reminder.tags) {
        tags += `<div class="noti-tag">${tagName}</div>`;
    }
    let reminderString = `
        <div class="notification flexible">
            <div class="noti-name">${reminder.title}</div>
            <div class="upcoming-tag-area flexible">${tags}</div>
        </div>
    `;

    return ch.appendAndRetrieve(_.getReminderArea(), reminderString);
}

function createNotification(notiData) {
    let tags = '';
    for (let tagName of notiData.tags) {
        tags += `<div class="noti-tag">${tagName}</div>`;
    }
    let notiString = `
        <div class="notification flexible">
            <div class="noti-name">${notiData.title}</div>
            <div class="upcoming-tag-area flexible">${tags}</div>
        </div>
    `;

    return ch.appendAndRetrieve(_.getNotiArea(), notiString);
}

function createNotiTag(notification, notis) {
    let tag = '';
    for (let notiName of notis) {
        tag += `
            <div class="noti-tag">${notiName}</div>
        `;
    }

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getUpcomingTagArea(notification), tag);
}

function createDateInput(parent) {
    let dateInput = `
        <input type="text" id="newTask">
        <input type="date" id="newTaskDate">
        <input type="number" id="priorReminder">
        <button class="upcoming-input-btn"></div>
    `;
    return ch.appendAndRetrieveParent(_.getUpcomingInputArea(parent), dateInput);
}

function createTimerInput(parent) {
    let timerInput = `
        <input type="text" id="newTask">
        <input type="date" id="newTimerStart">
        <input type="date" id="newTimerEnd">
        <button class="upcoming-input-btn"></div>
    `;
    return ch.appendAndRetrieveParent(_.getUpcomingInputArea(parent), timerInput);
}

function createCadenceInput(parent) {
    let cadenceInput = `
        <input type="text" id="newTask">
        <input type="date" id="newStartDate">
        <input type="number" id="newCadence">
        <button class="upcoming-input-btn"></div>
    `;
    return ch.appendAndRetrieveParent(_.getUpcomingInputArea(parent), cadenceInput);
}

function createPerMonthInput(parent) {
    let cadenceInput = `
        <input type="text" id="newTask">
        <input type="number" id="newMonthDate">
        <button class="upcoming-input-btn"></div>
    `;
    return ch.appendAndRetrieveParent(_.getUpcomingInputArea(parent), cadenceInput);
}

function createNotiActionTag(parent, name) {
    let tag = `
        <div class="noti-action-tag">${name}</div>
    `;

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getUpcomingActionArea(parent), tag);
}


export {
    createUpcomingPillar,
    createNotification,
    createNotiTag,
    createNotiActionTag,
    createDateInput,
    createTimerInput,
    createCadenceInput,
    createPerMonthInput,
    createReminder
}