import * as _ from '../getThis.js';
import * as eh from './elementHelper.js'
import * as request from './upcRequests.js'

let upcData;
let upcElem;

function newUpc() {
    upcData = {
        'status': {},
        'reminders': [],
        'notifications': []
    }

    return upcData;
}


function setUpc(data) {
    upcData = data;
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
            <div class="flexible upcoming-input-area"></div>
            <div class="flexible upcoming-action-area">
                ${getActionTags(['Cadence'])}
            </div>
        </div>
    `;

    upcElem = document.createElement('div');
    upcElem.classList = 'flexible pillar upcoming';
    upcElem.innerHTML = insideUpcoming;
    console.log("upcElem"); console.log(upcElem);
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


export {
    newUpc,
    setUpc,
    createElement,
    getElement,
    addReminderElement,
    addNotificationElement
}