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
if (false) {
    initializeFirebase();
    t.getStarted();

    t.readDBHistory(updateHistory);
    e.saveAllDataListener();
    t.readDB(loadPage);

} else {
    if (false) {
        initializeFirebase();
        t.getStarted();
        t.readDBHistory(loadPage);
    } else {
        e.saveAllDataListener(false);
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
        console.log("userData"); console.log(userData);
    }


    makeUpcomingPillar(userData);
    userData

    for (let [pillarName, pillarData] of Object.entries(userData)) {

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

function makeUpcomingPillar(userData) {
    /* 
    Pay rent should show up the first of every month
        keep a record of the last day logged onto website
        have a list of dates between the last day and today
        if that day is in the array [10/1/2024], add task to the list
        
    Christmas flights should show up every two weeks
    
    'Gynecologist Appointment' has a fixed date and I would like to be reminded 4 days in advance
        It would also be nice to have an upcoming dates/activities section that I can view, ordered correctly
        
    Game nights are every Tuesdays
    
    We need a way to stop reoccurring activities
    
    We need to update/ any passed once-occurring activities
    Do we need an ability to edit information
    
    
    check if the next contact date is already occurred
    determine the next contact date
        return the first date that is fourteen day interval from the start date but occurs after today
    */

    let items = [
        {
            'title': 'Pay Rent',
            'reoccurringDate': 1,
            'nextContactDate': '10/1/2024',
        },
        {
            'title': 'Christmas Flights',
            'startDate': '9/14/2024',
            'nextContactDate': '9/28/2024',
            'reoccurringCadence': 14
        },
        {
            'title': 'Gynecologist Appointment',
            'occurringDate': '12/4/2024',
            'showReminder': '11/30/2024'
            // 'priorReminderInDays': 4
        },
        {
            'title': 'Game Night',
            // 'reoccurringWeekday': 'Tuesday'
            'startDate': '9/24/2024',
            'nextContactDate': '10/1/2024',
            'reoccurringCadence': 7
        },
    ];

    let notifications = [];
    let deleteItems = [];

    for (let item of items) {

        let today = new Date();

        if (item.reoccurringDate && new Date(item.nextContactDate) <= today) {
            notifications.push(item);
            item.nextContactDate = getNextDayOfMonth(item.reoccurringDate);
        }
        else if (item.nextContactDate && new Date(item.nextContactDate) <= today) {
            notifications.push(item);
            item.nextContactDate = getNextInterval(item.startDate, item.reoccurringCadence);
        }
        else if (item.showReminder && new Date(item.showReminder) <= today) {
            // event has already occurred
            if (new Date(item.occurringDate) < today) {
                // delete from items
                deleteItems.push(item);
            } else {
                notifications.push(item);
            }
        }
    }

    console.log("notifications"); console.log(notifications);
    console.log("items"); console.log(items);
    userData.Upcoming = {
        "status": {
            "pillarType": "upcoming"
        },
        "lists": {
            "Events": {
                "items": notifications,
                "selectedTags": []
            }
        }
    }
}


function getNextDayOfMonth(num) {
    const today = new Date(); // Get today's date

    // Get the next month
    const nextMonth = today.getMonth() + 1;

    // Create a date object for the first day of the next month
    const nextDay = new Date(today.getFullYear(), nextMonth, num);

    // If the next month goes into the next year, JavaScript handles that automatically
    return nextDay.toISOString().split('T')[0];
}

function getNextInterval(startDate, cadence) {
    const today = new Date(); // Get today's date
    const start = new Date(startDate); // Convert startDate to a Date object

    // If startDate is after today, return the first 14-day interval from startDate
    if (start > today) {
        start.setDate(start.getDate() + cadence); // Add 14 days to the startDate
        return start;
    }

    // Calculate the difference in days between startDate and today
    const diffInTime = today.getTime() - start.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    // Find how many full 14-day intervals have passed
    const intervalsPassed = Math.floor(diffInDays / cadence);

    // Calculate the next date in the 14-day interval after today
    const nextIntervalDate = new Date(start);
    nextIntervalDate.setDate(start.getDate() + (intervalsPassed + 1) * cadence);

    // Format the date as YYYY-MM-DD
    return nextIntervalDate.toISOString().split('T')[0];;
}