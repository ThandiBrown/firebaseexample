import * as _ from './getThis.js';
import * as t from './comms/talkToDatabase.js'
import * as um from './upc/main.js'

let userData = {};
userData.Upcoming = {};

function returnNotifications() {
    return userData['Upcoming']['notifications']
}

function printUserData(value = userData, title = 'userData') {
    console.log(title);
    console.log(JSON.parse(JSON.stringify(value)));
    // console.log({...userData});
}

function saveToDB() {
    console.log("saveToDB");
    userData.Upcoming = um.getUpcomingData();
    console.log("userData");
    console.log(JSON.stringify(userData, null, 2));
    t.writeDB(userData);
}

function newCalendar(pillarName, calendarData) {
    // console.log("newCalendar");
    if (!('calendar' in userData[pillarName])) {
        userData[pillarName]['calendar'] = []
    }

    userData[pillarName]['calendar'].push(calendarData);
    // printUserData(userData[pillarName]['calendar']);
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

function newPillar(name, status) {
    // console.log("newPillar");
    userData[name] = {};
    userData[name]['status'] = status;
    // printUserData();
}

function collapsePillar(pillarName, isHidden) {
    if (isHidden) {
        userData[pillarName]['status'].collapsed = true;
    } else {
        userData[pillarName]['status'].collapsed = false;
    }
}

function newList(pillarName, listName) {
    // console.log("newList");
    if (!('lists' in userData[pillarName])) {
        userData[pillarName]['lists'] = {};
    }

    userData[pillarName]['lists'][listName] = {
        'items': [],
        'selectedTags': []
    };
    // printUserData();
}

function deleteList(pillarName, listName) {
    // console.log("deleteList");
    delete userData[pillarName]['lists'][listName];
    printUserData();
}

function newListItem(pillarName, listName, listItem) {
    userData[pillarName]['lists'][listName].items.push(listItem);
    // printUserData();
}

function moveListItem(pillarName, listName, listItemElement, direction) {
    let listItems = userData[pillarName]['lists'][listName].items;
    // Element's physical position within its parentt
    let index = getChildOrder(listItemElement);

    // Check if the index is correct; use "includes" in case there is extra text associated with the element name '\n' or '<br>'
    if (!isNaN(index) && index != -1 && _.getListItemName(listItemElement).includes(listItems[index].title.trim())) {
        let itemData = listItems.splice(index, 1)[0];

        if (direction == 'To Top') {
            listItems.unshift(itemData);
        } else if (direction == 'To Bottom') {
            listItems.push(itemData);
        }
    } else {
        console.log('TROUBLE FINDING: ' + itemName);
    }
    printUserData(listItems);

}

function updateListItemStatus(pillarName, listName, listElement, itemName, status, prevStatus) {
    console.log("updateListItemStatus");

    let index = getChildOrder(listElement);

    let listItems = userData[pillarName]['lists'][listName].items;

    if (!isNaN(index) && itemName.includes(listItems[index].title.trim())) {
        if (status) listItems[index][status] = true;
        if (prevStatus) listItems[index][prevStatus] = false;
    }
    printUserData(listItems);
}

function deleteListItem(pillarName, listName, listItem, itemName) {

    let index = getChildOrder(listItem);

    let listItems = userData[pillarName]['lists'][listName].items;

    if (!isNaN(index) && index != -1 && itemName.includes(listItems[index].title.trim())) {
        listItems.splice(index, 1);
    } else {
        console.log('TROUBLE FINDING: ' + itemName);
    }
    printUserData();
}

function selectListTag(pillarName, listName, tagName) {

    console.log("userData - selectListTag"); console.log(userData);
    console.log(userData[pillarName]['lists'][listName]);

    let selectedTags = userData[pillarName]['lists'][listName].selectedTags;
    if (selectedTags.includes(tagName)) {
        selectedTags.splice(selectedTags.indexOf(tagName), 1);
    } else {
        selectedTags.push(tagName);
    }
    console.log('selected');
    printUserData(userData[pillarName]['lists'][listName].selectedTags);
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
    updateListItemStatus,
    selectListTag,
    moveListItem,
    collapsePillar,
    returnNotifications,
}