import { getData } from './tempData.js'
import * as actions from './actions.js'
import * as e from './eventListeners.js'
import * as c from './component.js'
import * as um from './upc/main.js'
import * as fin from './fin/main2.js'
import * as standard from './standard/standardPillar.js'
import * as standardEL from './standard/eventListeners.js'
import * as a from './comms/alternate.js'
import * as t from './comms/talkToDatabase.js'
import * as test from './upc/testing.js'

/* 
NEXT:
make the collapse function
add the submit area
*/

if (false) {
    a.initializeFirebase()
        .then(() => {
            // console.log('We Made It');
            // Runs after initializeFirebase is complete
            t.getStarted();

            t.readDBHistory(updateHistory);
            e.saveAllDataListener();
            t.readDB(loadPage);
        })
        .catch((error) => {
            console.error("Error initializing Firebase:", error);
        });

} else {
    if (false) {
        a.initializeFirebase()
            .then(() => {
                // Runs after initializeFirebase is complete
                t.getStarted();
                t.readDBHistory(loadPage);
            })
            .catch((error) => {
                console.error("Error initializing Firebase2:", error);
            });

    } else if (true) {
        if (false) {
            a.initializeFirebase()
                .then(() => {
                    // Runs after initializeFirebase is complete
                    t.getStarted();
                })
                .catch((error) => {
                    console.error("Error initializing Firebase2:", error);
                });
            e.saveAllDataListener(true);
        } else {
            e.saveAllDataListener(false);
        }
        loadPage(false, getData());
    }
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
        NEXT:
        adding the upcoming element, maybe some reoccurring features
    */

    if (typeof userData === 'string') {
        userData = JSON.parse(userData);
    }

    console.log("userData"); console.log(JSON.stringify(userData, null, 2));

    for (let [pillarName, pillarData] of Object.entries(userData)) {

        if (pillarName == 'Upcoming') {
            // test.addData(userData.Upcoming);
            um.main(userData.Upcoming);
            // test.makeRequests();
            continue;
        } else if (pillarName == 'Finances') {
            fin.main(userData.Finances);
            continue;
        }

        standard.main(pillarName, pillarData);
        return;
        let pillarElement = c.createPillar(pillarName, pillarData.status);
        let allLists = [];
        let allPillarConditions = [];

        e.pillarTitleListener(pillarElement);

        if (pillarData.calendar) {
            // create calendar area
            let calendarArea = c.createCalendarArea(pillarElement);
            for (let calendarData of pillarData.calendar) {
                let calendar = c.createCalendar(calendarArea, calendarData);
                e.todayCalendarBoxListener(pillarName, calendarData.type, calendar);
            }
            actions.scrollCalendars();
        }

        if (pillarData.lists) {

            for (let [listName, listData] of Object.entries(pillarData.lists)) {

                let listElement = c.createList(pillarElement, listName);

                let tags = [];
                for (let listItem of listData.items) {
                    let listItemElement = c.createListItem(listElement, listItem);
                    e.listItemListeners(listElement, listItemElement);

                    if (listItem.tag && !tags.includes(listItem.tag)) {
                        tags.push(listItem.tag);
                    }
                }

                for (let tagName of tags) {
                    let tagElement = c.createListCondition(listElement, tagName);
                    e.listConditionListener(listElement, tagElement);
                    allPillarConditions.push(tagName);

                    // select selected tags
                    if (pillarData.lists[listName].selectedTags.includes(tagName)) {
                        tagElement.click();
                    }
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

        for (let genName of ['To Top', 'To Bottom']) {
            let genTag = c.createSubmitGeneral(submitArea, genName);
            e.movementListeners(genTag, genName);
        }

        for (let condition of allPillarConditions) {
            let conditionTag = c.createSubmitCondition(submitArea, condition);
            e.submitConditionListener(pillarElement, conditionTag);
        }

        e.submitListener(pillarElement);
        if (pillarData.status.collapsed) e.collapsePillar(pillarElement);
    }
}



