import * as _ from '../getThis.js';
import * as eh from './elementHelper.js'
import * as request from './upcRequests.js'

let upcData;
let upcElem;

function newUpc() {
    upcData = {
        'lastUpdated': '01/01/2024',
        'reminders': [],
        'notifications': []
    }

    return upcData;
}


function setUpc(data) {
    if ('status' in data) {
        delete data.status;
        data.lastUpdated = '01/01/2024';
    }
    upcData = data;
}

function shouldUpdate() {
    return !eh.isToday(upcData.lastUpdated);
}

function updateLastUpdated() {
    upcData.lastUpdated = eh.getDateWithOffset(0);
}

function createElement(nStr = '', rStr = '') {
    let insideUpcoming = `
        <h1 class="pillar-title">Upcoming</h1>
        <div class="flexible pillar-main">
            <div class="flexible noti-area">
                ${nStr}
            </div>
            <div class="flexible reminder-area">
                ${rStr}
            </div>
            <div class="flexible upcoming-input-area">
            </div>
            <div class="flexible upcoming-action-area">
                ${getActionTags(['Cadence', 'Date', 'Per Month', 'Timer'])}
            </div>
        </div>
    `;

    upcElem = document.createElement('div');
    upcElem.classList = 'flexible pillar upcoming';
    upcElem.innerHTML = insideUpcoming;
    addEventListeners();

}

function getElement() {
    return upcElem;
}

function addReminderElement(reminderStr) {
    upcElem.querySelector(".reminder-area").insertAdjacentHTML('beforeend', reminderStr);
}

function addNotificationElement(reminderStr) {
    upcElem.querySelector(".noti-area").insertAdjacentHTML('beforeend', reminderStr);
}

function getActionTags(actions) {
    let tags = '';
    for (let actionName of actions) {
        tags += `<div class="noti-action-tag ${eh.getClassName(actionName)}">${actionName}</div>`;
    }
    return tags;
}


function addEventListeners() {
    cadenceTagEL();
    dateTagEL();
    perMonthTagEL();
    timerTagEL();
}

function timerTagEL() {
    let dateTag = upcElem.querySelector('.' + eh.getClassName('Timer'));


    dateTag.addEventListener('click', function () {
        let dateInput = `
            <input type="text" id="newTask">
            <input type="date" id="newStartDate">
            <input type="date" id="newEndDate">
            <button class="upcoming-input-btn"></div>
        `;
        _.getUpcomingInputArea(upcElem).insertAdjacentHTML('beforeend', dateInput);

        upcElem.querySelector(".upcoming-input-btn").addEventListener('click', function () {
            let task = upcElem.querySelector("#newTask").value.trim();
            let startDate = upcElem.querySelector("#newStartDate").value.trim();
            let endDate = upcElem.querySelector("#newEndDate").value.trim();
            if (!eh.isBeforeToday(endDate)) {
                request.timerRequest(task, startDate, endDate);
                _.getUpcomingInputArea(upcElem).innerHTML = '';
            }

        });
    });
}

function perMonthTagEL() {
    let dateTag = upcElem.querySelector('.' + eh.getClassName('Per Month'));


    dateTag.addEventListener('click', function () {
        let dateInput = `
            <input type="text" id="newTask">
            <input type="date" id="newDate">
            <button class="upcoming-input-btn"></div>
        `;
        _.getUpcomingInputArea(upcElem).insertAdjacentHTML('beforeend', dateInput);

        upcElem.querySelector(".upcoming-input-btn").addEventListener('click', function () {
            let task = upcElem.querySelector("#newTask").value.trim();
            let date = upcElem.querySelector("#newDate").value.trim();
            request.perMonthRequest(task, date);
            _.getUpcomingInputArea(upcElem).innerHTML = '';
        });
    });
}

function dateTagEL() {
    let dateTag = upcElem.querySelector('.' + eh.getClassName('Date'));


    dateTag.addEventListener('click', function () {
        let dateInput = `
            <input type="text" id="newTask">
            <input type="date" id="newEventDate">
            <input type="text" id="priorReminder">
            <button class="upcoming-input-btn"></div>
        `;
        _.getUpcomingInputArea(upcElem).insertAdjacentHTML('beforeend', dateInput);

        upcElem.querySelector(".upcoming-input-btn").addEventListener('click', function () {
            let task = upcElem.querySelector("#newTask").value.trim();
            let eventDate = upcElem.querySelector("#newEventDate").value.trim();
            let reminderDays = upcElem.querySelector("#priorReminder").value.trim();
            request.dateRequest(task, eventDate, reminderDays);
            _.getUpcomingInputArea(upcElem).innerHTML = '';
        });
    });
}

function cadenceTagEL() {
    let cadenceTag = upcElem.querySelector('.' + eh.getClassName('Cadence'));


    cadenceTag.addEventListener('click', function () {
        let cadenceInput = `
            <input type="text" id="newTask">
            <input type="date" id="newStartDate">
            <input type="number" id="newCadence">
            <button class="upcoming-input-btn"></div>
        `;
        _.getUpcomingInputArea(upcElem).insertAdjacentHTML('beforeend', cadenceInput);

        upcElem.querySelector(".upcoming-input-btn").addEventListener('click', function () {
            let task = upcElem.querySelector("#newTask").value.trim();
            let startDate = upcElem.querySelector("#newStartDate").value.trim();
            let cadence = upcElem.querySelector("#newCadence").value.trim();
            request.cadenceRequest(task, startDate, cadence);
            _.getUpcomingInputArea(upcElem).innerHTML = '';
        });
    });
}

function getUpcomingData() {
    return upcData;
}

function setUpcReminders(reminders) {
    upcData.reminders = reminders;
}

function setUpcNotifications(notifications) {
    upcData.notifications = notifications;
}


export {
    newUpc,
    setUpc,
    shouldUpdate,
    updateLastUpdated,
    createElement,
    getElement,
    addReminderElement,
    addNotificationElement,
    getActionTags,
    addEventListeners,
    cadenceTagEL,
    getUpcomingData,
    setUpcReminders,
    setUpcNotifications
}