import * as _ from './getThis.js';
import * as t from './comms/talkToDatabase.js'

const userData = {};

function printUserData(value = userData) {
    console.log("userData");
    console.log(JSON.parse(JSON.stringify(value)));
    // console.log({...userData});
}

function saveToDB() {
    console.log("saveToDB");
    console.log("userData"); console.log(userData);
    t.writeDB(userData);
}

function newCalendar(pillarName, calendarData) {
    // console.log("newCalendar");
    if (!('calendar' in userData[pillarName])) {
        userData[pillarName]['calendar'] = []
    }

    userData[pillarName]['calendar'].push(calendarData);
    printUserData(userData[pillarName]['calendar']);
}

function updateCalendarFulfillment(pillarName, calendarType, dateString, status) {
    // console.log("updateCalendarFulfillment");
    // ignore empty strings (ignore upcoming-days boxes)
    if (!dateString) return;
    for (let calendar of userData[pillarName]['calendar']) {
        if (calendar.type == calendarType) {
            if (status == 'fulfilled') {
                calendar.fulfilled.push(dateString);
            } else if (status == 'progressed') {
                calendar.fulfilled.splice(calendar.fulfilled.indexOf(dateString), 1);
                calendar.progressed.push(dateString);
            } else {
                calendar.progressed.splice(calendar.progressed.indexOf(dateString), 1);
            }
            printUserData(calendar);
            break;
        }
    }

}

function newPillar(name) {
    // console.log("newPillar");
    userData[name] = {};
    // printUserData();
}

function newList(pillarName, listName) {
    // console.log("newList");
    if (!('lists' in userData[pillarName])) {
        userData[pillarName]['lists'] = {}
    }

    userData[pillarName]['lists'][listName] = [];
    // printUserData();
}

function deleteList(pillarName, listName) {
    // console.log("deleteList");
    delete userData[pillarName]['lists'][listName];
    printUserData();
}

function newListItem(pillarName, listName, listItem) {
    userData[pillarName]['lists'][listName].push(listItem);
    // printUserData();
}

function updateListItemStatus(pillarName, listName, listElement, itemName, status, prevStatus) {
    console.log("updateListItemStatus");

    let index = getChildOrder(listElement);

    let listItems = userData[pillarName]['lists'][listName];

    if (!isNaN(index) && itemName.includes(listItems[index].title.trim())) {
        if (status) listItems[index][status] = true;
        if (prevStatus) listItems[index][prevStatus] = false;
    }
    printUserData(listItems);
}

function deleteListItem(pillarName, listName, listElement, itemName) {

    let index = getChildOrder(listElement);

    let listItems = userData[pillarName]['lists'][listName];

    if (!isNaN(index) && itemName.includes(listItems[index].title.trim())) {
        listItems.splice(index, 1);
    }
    printUserData();
}

function getChildOrder(child) {
    // Get the parent element
    const parent = child.parentElement;

    // Get all children of the parent
    const children = Array.from(parent.children);

    // Find the index of the child element in the children array
    const index = children.indexOf(child);

    return index;
}



export {
    newPillar,
    newList,
    newListItem,
    deleteListItem,
    printUserData,
    deleteList,
    saveToDB,
    newCalendar,
    updateCalendarFulfillment,
    updateListItemStatus
}