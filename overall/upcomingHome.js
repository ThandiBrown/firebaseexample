
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

    // REMINDER AND NOTIFICATION ELEMENTS
    for (let reminderData of upcomingData.reminders) {
        uc.createReminder(
            pillarElement,
            reminderData,
            determineReminderTags(reminderData)
        );

        // ADD ANY NEW NOTIFICATIONS
        if (allowUpdate)
            addNewNotification(reminderData);
    }

    if (allowUpdate)
        d.updateNotificationStatus();

    // SHOW UP-TO-DATE NOTIFICATIONS
    for (let notification of d.returnNotifications()) {
        uc.createNotification(
            pillarElement,
            notification
        );
    }


    // CREATE REMINDER BUTTONS
    for (let actionName of ['Date', 'Timer', 'Cadence', 'Per Month']) {
        let tag = uc.createNotiActionTag(pillarElement, actionName);
        // e.actionTagListener(pillarElement, tag, actionName);
    }
}

function addNewNotification(r) {
    let today = new Date();
    let notifications = [];


    // Per Month, nextContactDate is today or has passed
    if (r.reoccurringDate && new Date(r.nextContactDate) <= today) {
        r.nextContactDate = e.getNextDayOfMonth(r.reoccurringDate);
        let dateDictionary = {
            '1': 'st',
            '2': 'nd',
            '3': 'rd',
        };

        let suffix = dateDictionary[r.reoccurringDate] ? r.reoccurringDate in dateDictionary : 'th';

        notifications.push({
            'title': r.title,
            'tags': [`(on ${r.reoccurringDate + suffix})`],
        });
    }
    // Cadence, nextContactDate is today or has passed
    else if (r.reoccurringCadence && new Date(r.nextContactDate) <= today) {
        r.nextContactDate = e.getNextInterval(r.startDate, r.reoccurringCadence);
        notifications.push({
            'title': r.title,
            'tags': []
        })
    }
    // Date, showReminder date is today or has passed
    else if (r.showReminder && new Date(r.showReminder) <= today) {
        // event has passed
        if (new Date(r.occurringDate) < today) {
            // delete from notis
            d.deleteReminder(r.title);
        } else {
            r.showReminder = r.occurringDate;
            let countdownData = calculateDaysAndMonths(today, r.occurringDate);
            let tags = [
                r.occurringDate,
                `${countdownData.days}`
            ];
            if (countdownData.dayNum > 30)
                tags.push(`${countdownData.months}`)

            notifications.push({
                'title': r.title,
                'tags': tags
            });

        }
    }
    // Timer, timerStart date is today or has passed
    else if (r.timerStart && new Date(r.timerStart) <= today) {
        // event has passed
        if (new Date(r.timerEnd) < today) {
            // delete from notis && reminders
            d.deleteReminder(r.title);
        } else {
            r.showReminder = r.occurringDate;
            let countdownData = calculateDaysAndMonths(today, r.occurringDate);
            let tags = [
                r.occurringDate,
                `${countdownData.days}`
            ];
            if (countdownData.dayNum > 30)
                tags.push(`${countdownData.months}`)

            tags.push(getPercentageComplete(r.timerStart, r.timerEnd));

            notifications.push({
                'title': r.title,
                'tags': tags
            });

        }
    }

    if (notifications.length) {
        d.newNotification(notifications);
        d.updateReminder(r);
    }
}

function determineReminderTags(data) {
    let tags = [];

    // Per Month
    if (data.reoccurringDate) {
        tags.push(`Every ${data.reoccurringDate} of the month`);
    }

    // Cadence
    else if (data.reoccurringCadence) {
        tags.push(`Every ${data.reoccurringCadence} days`);
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

function calculateDaysAndMonths(startDate, endDate) {
    const start = new Date(startDate);
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