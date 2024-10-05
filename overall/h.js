import * as hh from './h_helper.js'
import * as uc from './upcomingComponent.js'


const userData = {
    "Upcoming": {
        "status": {
            "pillarType": "upcoming",
            "lastUpdated": "2024-09-28"
        },

        "notifications": [],
        "reminders": []
    }
};

main();

function main() {
    uc.createUpcomingPillar();

    // no notifications but can be seen in reminders
    processRequest({
        'type': 'Date',
        'title': 'Future Event - No Notis',
        'occurringDate': '09/30/2024',
    });
    // can be seen in both reminders and active notifications
    processRequest({
        'type': 'Date',
        'title': 'Future Event - Yes Notis',
        'occurringDate': '09/31/2024',
        'remindDaysBefore': 4
    });
    // can be seen in reminders and future notifications
    processRequest({
        'type': 'Date',
        'title': 'Future Event - Future Notis',
        'occurringDate': '10/05/2024',
        'remindDaysBefore': 4
    });
    // ignored because it has passed
    processRequest({
        'type': 'Date',
        'title': 'Past Event - Don\'t Show',
        'occurringDate': '09/28/2024',
    });
    // Active Timer
    processRequest({
        'type': 'Timer',
        'title': 'Active Timer',
        'timerStart': '01/01/2024',
        'timerEnd': '12/31/2024'
    });
    // 
    processRequest({
        'type': 'Cadence',
        'title': 'Active Cadence',
        'startDate': '09/24/2024',
        'reoccurringCadence': 7
    });


    console.log("userData"); console.log(JSON.stringify(userData, null, 4));
    // document.querySelector(".page").innerHTML = JSON.stringify(userData, null, 4);
}

function processRequest(request) {
    if (shouldDeleteReminder(request)) return;

    // Date With Reminder
    if (request.type == 'Date' && request.remindDaysBefore) {
        let reminder = {
            'title': request.title,
            'occurringDate': request.occurringDate,
            'showReminder': hh.getDaysBefore(request.occurringDate, request.remindDaysBefore),
            'tags': getDateTags(request)
        };
        addReminderData(reminder);
        uc.createReminder(reminder);

        if (shouldNotifyNow(reminder)) {
            let notification = {
                'title': request.title,
                'tags': getDateTags(request)
            };
            addNotificationData(notification);
            uc.createNotification(notification);
        }

    }

    // Standalone Date
    else if (request.type == 'Date') {
        let reminder = {
            'title': request.title,
            'occurringDate': request.occurringDate,
            'tags': getDateTags(request)
        };

        addReminderData(reminder);
        uc.createReminder(reminder);
    }

    // Timer, reminder only
    else if (request.type == 'Timer') {
        let reminder = {
            'title': request.title,
            'timerStart': request.timerStart,
            'timerEnd': request.timerEnd,
            'occurringDate': request.timerEnd,
        };

        reminder.tags = getTimerTags(reminder);

        addReminderData(reminder);
        uc.createReminder(reminder);
    }

    // Cadence
    else if (request.type == 'Cadence') {
        let reminder = {
            'title': request.title,
            'startDate': request.startDate,
            'reoccurringCadence': request.reoccurringCadence,
            'nextContactDate': hh.getNextInterval(request.startDate, request.reoccurringCadence),
            'tags': getCadenceRTags(request)
        };
        addReminderData(reminder);
        uc.createReminder(reminder);

        if (shouldNotifyNow(reminder)) {
            let notification = {
                'title': request.title,
                'tags': getDateTags(request)
            };
            addNotificationData(notification);
            uc.createNotification(notification);
        }

    }

}

function addReminderData(rData) {
    // Add the new reminder to the list
    userData.Upcoming.reminders.push(rData);

    // Sort the list based on occurringDate if it exists
    userData.Upcoming.reminders.sort((a, b) => {
        const dateA = a.occurringDate ? new Date(a.occurringDate) : null;
        const dateB = b.occurringDate ? new Date(b.occurringDate) : null;

        // Handle cases where one or both reminders don't have occurringDate
        if (dateA && dateB) {
            return dateA - dateB; // Sort by date
        } else if (dateA) {
            return -1; // Keep items with dates before those without dates
        } else if (dateB) {
            return 1; // Keep items with dates before those without dates
        } else {
            return 0; // No dates, so maintain current order
        }
    });
}

function shouldDeleteReminder(rData) {
    if (rData.occurringDate && new Date(rData.occurringDate) < new Date()) {
        return true;
    }
    if (rData.startDate && new Date(rData.startDate) < new Date()) {
        return true;
    }
    return false;
}

function shouldNotifyNow(rData) {
    if (rData.showReminder && new Date(rData.showReminder) <= new Date()) {
        return true;
    }
    else if (rData.reoccurringCadence && new Date(rData.nextContactDate) <= today) {
        return true;
    }
    return false;
}

function addNotificationData(nData) {
    userData.Upcoming.notifications.push(nData);
}


function getDateTags(data) {
    let countdownData = hh.calculateDaysAndMonths(data.occurringDate);

    let tags = [
        data.occurringDate,
        countdownData.days
    ];

    if (countdownData.dayNum > 30)
        tags.push(countdownData.months);

    return tags;
}


function getTimerTags(data) {
    let countdownData = hh.calculateDaysAndMonths(data.occurringDate);

    let tags = [
        `${data.timerStart} - ${data.timerEnd}`,
        countdownData.days
    ];

    if (countdownData.dayNum > 30)
        tags.push(countdownData.months);

    tags.push(hh.getPercentageComplete(data.timerStart, data.timerEnd));

    return tags;
}

function getCadenceRTags(data) {
    return [`Every ${data.reoccurringCadence} days`];
}



