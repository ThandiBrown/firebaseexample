
import * as d from './dataManager.js'
import * as e from './eventListeners.js'
import * as uc from './upcomingComponent.js'
import * as _ from './getThis.js';


function loadUpcomingPillar(upcomingData) {
    /* 
    We need a way to stop reoccurring activities
    
    We need to update/ any passed once-occurring activities
    Do we need an ability to edit information
    
    check if the next contact date is already occurred
    determine the next contact date
        return the first date that is fourteen day interval from the start date but occurs after today
    
    Have days until, progress percentage as tags
    */

    // PILLAR
    let pillarElement = uc.createUpcomingPillar(upcomingData);
    e.pillarTitleListener(pillarElement);

    sortReminders(upcomingData.reminders);

    let allowUpdate = upcomingData.status.lastUpdated != new Date().toISOString().split('T')[0];

    // once a day, delete any reminders and add any new notifications
    if (allowUpdate) {
        upcomingData.reminders = deleteReminders(upcomingData);
        addNewNotifications(upcomingData);
        updateDailyStatus(upcomingData);
    }

    d.newUpcomingPillar(upcomingData);

    // REMINDER ELEMENTS
    for (let reminderData of upcomingData.reminders) {
        uc.createReminder(
            pillarElement,
            reminderData,
            determineReminderTags(reminderData)
        );
    }

    // NOTIFICATION ELEMENTS
    for (let notification of upcomingData.notifications) {
        uc.createNotification(
            pillarElement,
            notification
        );
    }


    // CREATE REMINDER BUTTONS
    for (let actionName of ['Date', 'Timer', 'Cadence', 'Per Month']) {
        let tag = uc.createNotiActionTag(pillarElement, actionName);
        e.actionTagListener(pillarElement, tag, actionName);
    }
}

function updateDailyStatus(upcomingData) {
    upcomingData.status.lastUpdated = (new Date()).toISOString().split('T')[0];
}

function deleteReminders(upcomingData) {
    let today = new Date();
    return upcomingData.reminders.filter(function (r) {
        if (r.occurringDate && new Date(r.occurringDate) < today) {
            return false;
        }
        return true;
    });

}

function deleteNotifications(deletedName) {
    upcomingData = upcomingData.filter(reminder => reminder.title !== reminderName)
}

function addNewNotifications(upcomingData) {
    let today = new Date();
    let notifications = [];

    for (let r of upcomingData.reminders) {
        if (r.reoccurringDate && new Date(r.nextContactDate) <= today) {
            notifications.push(getPerMonthNoti(r));
        }
        else if (r.cadence && new Date(r.nextContactDate) <= today) {
            notifications.push(getCadenceNoti(r));
        }
        else if (r.showReminder && new Date(r.showReminder) <= today) {
            notifications.push(getDateNoti(r, today));
        }
        else if (r.timerStart && new Date(r.timerStart) <= today) {
            notifications.push(getTimerNoti(r, today));
        }
    }

    upcomingData.notifications = upcomingData.notifications.concat(notifications);
}

function getPerMonthNoti(r) {
    r.nextContactDate = e.getNextDayOfMonth(r.reoccurringDate);
    let dateDictionary = {
        '1': 'st',
        '2': 'nd',
        '3': 'rd',
    };

    let suffix = dateDictionary[r.reoccurringDate] ? r.reoccurringDate in dateDictionary : 'th';

    return {
        'title': r.title,
        'tags': [`(on ${r.reoccurringDate + suffix})`],
    };
}

function getCadenceNoti(r) {
    r.nextContactDate = e.getNextInterval(r.startDate, r.cadence);
    return {
        'title': r.title,
        'tags': []
    };
}

function getDateNoti(r, today) {
    r.showReminder = r.occurringDate;
    let countdownData = calculateDaysAndMonths(today, r.occurringDate);
    let tags = [
        r.occurringDate,
        countdownData.days
    ];
    if (countdownData.dayNum > 30)
        tags.push(countdownData.months);

    return {
        'title': r.title,
        'tags': tags
    };
}

function getTimerNoti(r, today) {
    r.showReminder = r.occurringDate;
    let countdownData = calculateDaysAndMonths(today, r.occurringDate);
    let tags = [
        r.occurringDate,
        `${countdownData.days}`
    ];
    if (countdownData.dayNum > 30)
        tags.push(`${countdownData.months}`)

    tags.push(getPercentageComplete(r.timerStart, r.timerEnd));

    return {
        'title': r.title,
        'tags': tags
    };
}


function determineReminderTags(data) {
    let tags = [];

    // Per Month
    if (data.reoccurringDate) {
        tags.push(`Every ${data.reoccurringDate} of the month`);
    }

    // Cadence
    else if (data.cadence) {
        tags.push(`Every ${data.cadence} days`);
    }

    // Timer
    else if (data.timerStart) {
        tags.push(`${data.timerStart} - ${data.timerEnd}`);
    }

    // Date
    else if (data.occurringDate) {
        tags.push(`${data.occurringDate}`);
    }

    return tags;
}

function calculateDaysAndMonths(endDate) {
    const start = new Date();
    const end = new Date(endDate);

    // Calculate the difference in time (in milliseconds)
    const diffInTime = end.getTime() - start.getTime();

    // Calculate the difference in days
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    // Calculate the difference in months
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    // Total months difference, rounded to the nearest whole number
    const totalMonths = Math.round(yearsDiff * 12 + monthsDiff + (end.getDate() - start.getDate()) / 30);

    return {
        dayNum: diffInDays,
        days: diffInDays + ' d',
        months: totalMonths + ' mo'
    };
}

function getPercentageComplete(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date(); // Get today's date

    // Ensure today's date doesn't exceed the endDate
    const current = today > end ? end : today;

    // Calculate total duration between startDate and endDate (in milliseconds)
    const totalDuration = end.getTime() - start.getTime();

    // Calculate the duration from startDate to today
    const elapsedDuration = current.getTime() - start.getTime();

    // Calculate the percentage complete
    const percentageComplete = (elapsedDuration / totalDuration) * 100;

    // Return the percentage, ensuring it is not below 0 or above 100
    return Math.min(Math.max(percentageComplete, 0), 100).toFixed(0) + '%';
}

function sortReminders(reminders) {
    // Function to sort the list based on 'occurringDate'
    const sortedReminders = reminders.sort((a, b) => {
        const dateA = a.occurringDate ? new Date(a.occurringDate) : null;
        const dateB = b.occurringDate ? new Date(b.occurringDate) : null;

        // If both have occurringDate, compare the dates
        if (dateA && dateB) {
            return dateA - dateB;
        }
        // If only a has occurringDate, a comes after b
        if (dateA && !dateB) {
            return 1;
        }
        // If only b has occurringDate, b comes after a
        if (!dateA && dateB) {
            return -1;
        }
        // If neither has occurringDate, keep original order
        return 0;
    });

    return sortedReminders
}

export {
    loadUpcomingPillar
}