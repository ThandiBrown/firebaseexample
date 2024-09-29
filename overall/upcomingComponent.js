import * as ch from './component_helper.js';
import * as _ from './getThis.js';
import * as d from './dataManager.js';

function createUpcomingPillar(upcomingData) {
    let pillarString = `
        <div class="flexible pillar upcoming">
            <h1 class="pillar-title">Upcoming</h1>
            <div class="flexible pillar-main">
                <div class="flexible noti-area"></div>
                <div class="flexible noti-all-area"></div>
                <div class="flexible noti-input-area"></div>
                <div class="flexible noti-action-area"></div>
            </div>
        </div>
        `

    d.newUpcomingPillar(upcomingData);
    return ch.appendAndRetrieve(_.getPage(), pillarString);
}

function createReminder(pillar, reminderData, tagNames) {
    let tags = '';
    for (let tagName of tagNames) {
        tags += `<div class="noti-tag">${tagName}</div>`;
    }
    let reminderString = `
        <div class="notification flexible">
            <div class="noti-name">${reminderData.title}</div>
            <div class="noti-tag-area flexible">${tags}</div>
        </div>
    `;

    return ch.appendAndRetrieve(_.getNotiAllArea(pillar), reminderString);
}

function createNotification(pillar, notiData) {
    let tags = '';
    for (let tagName of notiData.tags) {
        tags += `<div class="noti-tag">${tagName}</div>`;
    }
    let reminderString = `
        <div class="notification flexible">
            <div class="noti-name">${notiData.title}</div>
            <div class="noti-tag-area flexible">${tags}</div>
        </div>
    `;

    return ch.appendAndRetrieve(_.getNotiArea(pillar), reminderString);
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
        <input type="text" id="newTask">
        <input type="date" id="newTaskDate">
        <input type="number" id="priorReminder">
        <button class="submitNotiInput"></div>
    `;
    return ch.appendAndRetrieveParent(_.getNotiInputArea(parent), dateInput);
}

function createTimerInput(parent) {
    let timerInput = `
        <input type="text" id="newTask">
        <input type="date" id="newTimerStart">
        <input type="date" id="newTimerEnd">
        <button class="submitNotiInput"></div>
    `;
    return ch.appendAndRetrieveParent(_.getNotiInputArea(parent), timerInput);
}

function createCadenceInput(parent) {
    let cadenceInput = `
        <input type="text" id="newTask">
        <input type="date" id="newStartDate">
        <input type="number" id="newCadence">
        <button class="submitNotiInput"></div>
    `;
    return ch.appendAndRetrieveParent(_.getNotiInputArea(parent), cadenceInput);
}

function createPerMonthInput(parent) {
    let cadenceInput = `
        <input type="text" id="newTask">
        <input type="number" id="newMonthDate">
        <button class="submitNotiInput"></div>
    `;
    return ch.appendAndRetrieveParent(_.getNotiInputArea(parent), cadenceInput);
}

function createNotiActionTag(parent, name) {
    let tag = `
        <div class="noti-action-tag">${name}</div>
    `;

    // d.newList(_.getPillarName(pillar), listTitle);
    return ch.appendAndRetrieve(_.getNotiActionArea(parent), tag);
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