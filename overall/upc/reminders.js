import {
    getClassName,
    getNextInterval,
    dateFormatted,
    isToday,
    getOrdinalIndicator,
    getNextDateOfTheMonth,
    calculateDaysAndMonths
} from './elementHelper.js'

let reminders;

function getElements(rData) {
    let allRemindersString = '';
    for (let r of rData) {
        allRemindersString += getElement(r.title, r.tags);
    }

    return allRemindersString;
}


function getElement(task, tags) {
    let tagElemStr = '';
    for (let tagName of tags) {
        tagElemStr += `<div class="noti-tag">${tagName}</div>`;
    }
    let reminderString = `
        <div class="notification flexible">
            <div class="noti-name">${task}</div>
            <div class="upcoming-tag-area flexible">${tagElemStr}</div>
        </div>
    `;

    return reminderString;
}


function setReminders(value) {
    reminders = value;
}


function addCadenceReminder(task, startDate, cadence) {
    let tags = [
        `Every ${cadence} days`
    ];

    reminders.push({
        'type': 'Cadence',
        'title': task,
        'startDate': startDate,
        'cadence': cadence,
        'nextContactDate': getNextInterval(startDate, cadence),
        'tags': tags,
    });

    return tags
}


function addDateReminder(task, eventDate, reminderDays) {

    let showRemindersOn = [];
    let shouldNotify = false;
    let tags = [
        `${eventDate}`
    ];

    // order from highest to lowest
    reminderDays = reminderDays.sort((a, b) => Number(b) - Number(a));
    // console.log("reminderDays"); console.log(reminderDays);

    let today = new Date();
    for (let day of reminderDays) {
        let date = new Date(eventDate);
        date.setDate(date.getDate() - day);
        if (date > today) {
            showRemindersOn.push(dateFormatted(date));
        } else if (isToday(dateFormatted(date))) {
            shouldNotify = true;
        }
    }

    // console.log("showRemindersOn"); console.log(showRemindersOn);

    reminders.push({
        'type': 'Date',
        'title': task,
        'eventDate': eventDate,
        'showRemindersOn': showRemindersOn,
        'tags': tags,
    });
    // console.log('reminders:');
    // console.log(reminders.slice(-1)[0]);
    return [reminders.slice(-1)[0], shouldNotify];
}


function addPerMonthReminder(task, calDate) {

    let shouldNotify = false;
    let today = new Date();
    let monthDate = calDate.split('-')[2];
    let hasStarted = new Date(calDate) <= today;

    let nextContactDate;
    if (hasStarted) {
        nextContactDate = getNextDateOfTheMonth(monthDate);
    } else {
        nextContactDate = calDate;
    }

    let countdownData = calculateDaysAndMonths(nextContactDate);
    let tags = [
        `(on ${monthDate}${getOrdinalIndicator(parseInt(monthDate))})`,
        countdownData.days
    ];
    if (countdownData.dayNum > 30)
        tags.push(`${countdownData.months}`)

    // if occurrence has started and is today
    if (hasStarted && today.getDate() == parseInt(monthDate)) {
        console.log('Notifying Request');
        shouldNotify = true;
    }


    reminders.push({
        'type': 'Per Month',
        'title': task,
        'startDate': calDate,
        'monthDate': monthDate,
        'nextContactDate': nextContactDate,
        'tags': tags,
    });
    console.log('Per Month Reminder:');
    console.log(JSON.stringify(reminders.slice(-1)[0], null, 2));

    return [reminders.slice(-1)[0], shouldNotify];
}


function getReminders() {
    return reminders;
}


function checkForNotifications() {
    let remindersToNotify = [];
    let today = new Date();

    for (let r of reminders) {
        if (r.type == 'Cadence') {
            if (new Date(r.nextContactDate) <= today) {
                remindersToNotify.push(structuredClone(r));
                r.nextContactDate = getNextInterval(r.startDate, r.cadence);
            }
        } else if (r.type == 'Date') {

            if (new Date(r.eventDate) <= today) {
                remindersToNotify.push(structuredClone(r));
            } else {
                let shouldNotify = false;
                while (new Date(r.showRemindersOn[0]) <= today) {
                    r.showRemindersOn.shift();
                    shouldNotify = true;
                }
                if (shouldNotify) {
                    remindersToNotify.push(structuredClone(r));
                }
            }

        } else if (r.type == 'Per Month') {
            // if has started and occurs today
            if (new Date(r.startDate) <= today && today.getDate() == parseInt(r.monthDate)) {
                remindersToNotify.push(structuredClone(r));
                r.nextContactDate = getNextDateOfTheMonth(r.monthDate);
            }
        }
    }

    return remindersToNotify;
}


function removeCompletedReminders() {
    let today = new Date();
    reminders = reminders.filter(function (r) {
        let completed = false;
        if (r.type == 'Date' && new Date(r.eventDate) <= today) {
            completed = true;
        }

        if (!completed) {
            return r;
        }

    });

}

function updateTags() {
    for (let r of reminders) {
        if (r.type == 'Per Month') {
            let countdownData = calculateDaysAndMonths(r.nextContactDate);
            let tags = [
                r.tags[0],
                countdownData.days
            ];
            if (countdownData.dayNum > 30)
                tags.push(`${countdownData.months}`)

            r.tags = tags;
        }
    }

}

export {
    getElements,
    getElement,
    setReminders,
    addCadenceReminder,
    getNextInterval,
    getReminders,
    checkForNotifications,
    addDateReminder,
    removeCompletedReminders,
    addPerMonthReminder,
    updateTags
}