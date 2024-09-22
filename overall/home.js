import { getData } from './tempData.js'
import * as actions from './actions.js'
import * as e from './eventListeners.js'
import * as c from './component.js'
import { initializeFirebase } from './comms/foundation.js'
import * as t from './comms/talkToDatabase.js'

/* 
NEXT:
make the collapse function
add the submit area
*/
if (true) {
    initializeFirebase();
    t.getStarted();

    t.readDBHistory(updateHistory);
    e.saveAllDataListener();
    t.readDB(loadPage);

} else {
    // initializeFirebase();
    // t.getStarted();
    // t.readDBHistory(loadPage);

    loadPage(false, getData());
}

function updateHistory(history, userData) {

    let mostRecent = JSON.stringify(userData);

    if (!history.length) {
        history.push(mostRecent);
        // console.log("New history"); console.log(history);
        t.writeDBHistory(history);
    }
    else if (mostRecent.trim() != history[history.length - 1].trim()) {
        if (history.length > 9) {
            history.shift();
        }
        history.push(mostRecent);
        // console.log("history"); console.log(history);
        t.writeDBHistory(history);
    }
}

function loadPage(usingDB, userData) {
    /* 
    add the data management element to the calendars
    */

    if (typeof userData === 'string') {
        userData = JSON.parse(userData);
    }

    for (let [pillarName, pillarData] of Object.entries(userData)) {
        let pillarElement = c.createPillar(pillarName);
        let allLists = [];
        let allPillarConditions = [];


        if (pillarData.calendar) {
            // create calendar area
            let calendarArea = c.createCalendarArea(pillarElement);
            for (let calendarData of pillarData.calendar) {
                // ADD
                // if (!('progressed' in calendarData)) calendarData.progressed = [];
                let calendar = c.createCalendar(calendarArea, calendarData);
                e.todayCalendarBoxListener(pillarName, calendarData.type, calendar);
            }
            actions.scrollCalendars();
        }

        if (pillarData.lists) {
            for (let [listName, listItems] of Object.entries(pillarData.lists)) {
                let listElement = c.createList(pillarElement, listName);

                let tags = [];
                for (let listItem of listItems) {
                    let listItemElement = c.createListItem(listElement, listItem.title, listItem.tag);
                    e.listItemListeners(listElement, listItemElement);
                    if (listItem.tag && !tags.includes(listItem.tag)) tags.push(listItem.tag);
                }

                for (let tagName of tags) {
                    let tagElement = c.createListCondition(listElement, tagName);
                    e.listConditionListener(listElement, tagElement);
                    allPillarConditions.push(tagName);
                }

                allLists.push(listName);
                actions.collapselistItemArea(listElement);
                actions.collapseListConditionAreas(listElement);
            }
        }

        let submitArea = c.createSubmitArea(pillarElement);

        for (let listName of allLists) {
            let listTag = c.createSubmitListTag(submitArea, listName);
            e.submitListListener(pillarElement, listTag);
        }

        for (let genName of ['New List', 'Delete List']) {
            let genTag = c.createSubmitGeneral(submitArea, genName);
            e.submitListListener(pillarElement, genTag);
        }

        for (let condition of allPillarConditions) {
            let conditionTag = c.createSubmitCondition(submitArea, condition);
            e.submitConditionListener(pillarElement, conditionTag);
        }

        e.submitListener(pillarElement);

    }
}

