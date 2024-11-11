import {
    getPercentageComplete,
    getNextInterval,
    dateFormatted,
    isTheDay,
    getOrdinalIndicator,
    getNextDateOfTheMonth,
    calculateDaysAndMonths,
    isBeforeOrOnToday,
    isBeforeToday
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
    reminders.sort((a, b) => {
        let aDate;
        let bDate;
        if (a.nextContactDate) {
            aDate = a.nextContactDate;
        } else if (a.eventDate) {
            aDate = a.eventDate;
        } else if (a.endDate) {
            aDate = a.endDate;
        } else {
            aDate = '2026-01-01';
        }

        if (b.nextContactDate) {
            bDate = b.nextContactDate;
        } else if (b.eventDate) {
            bDate = b.eventDate;
        } else if (b.endDate) {
            bDate = b.endDate;
        } else {
            bDate = '2026-01-01';
        }

        const dateA = aDate ? new Date(aDate) : null;
        const dateB = bDate ? new Date(bDate) : null;

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


function addCadenceReminder(task, startDate, cadence) {
    let tags = [
        `Every ${cadence} days`
    ];

    reminders.push({
        'type': 'Cadence',
        'title': task,
        'startDate': startDate,
        'displayDate': getDisplayDate(startDate),
        'cadence': cadence,
        'nextContactDate': getNextInterval(startDate, cadence),
        'tags': tags,
    });

    return tags
}


function addDateReminder(task, eventDate, reminderDays) {

    let showRemindersOn = [];
    let shouldNotify = false;
    let countdownData = calculateDaysAndMonths(eventDate);
    let tags = [
        `${getDisplayDate(eventDate)}`,
        countdownData.days
    ];
    if (countdownData.dayNum > 30)
        tags.push(`${countdownData.months}`)

    // order from highest to lowest
    reminderDays = reminderDays.sort((a, b) => Number(b) - Number(a));
    // console.log("reminderDays"); console.log(reminderDays);

    let today = new Date();
    for (let day of reminderDays) {
        let date = new Date(eventDate);
        date.setDate(date.getDate() - day);
        if (date > today) {
            showRemindersOn.push(dateFormatted(date));
        } else if (isTheDay(dateFormatted(date))) {
            shouldNotify = true;
        }
    }

    // console.log("showRemindersOn"); console.log(showRemindersOn);

    reminders.push({
        'type': 'Date',
        'title': task,
        'eventDate': eventDate,
        'displayDate': getDisplayDate(eventDate),
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
    let hasStarted = isBeforeOrOnToday(calDate);

    let nextContactDate;
    if (hasStarted) {
        nextContactDate = getNextDateOfTheMonth(monthDate);
    } else {
        nextContactDate = calDate;
    }

    let countdownData = calculateDaysAndMonths(nextContactDate);
    let tags = [
        `(on ${parseInt(monthDate)}${getOrdinalIndicator(parseInt(monthDate))})`,
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
        'displayDate': getDisplayDate(nextContactDate),
        'monthDate': monthDate,
        'nextContactDate': nextContactDate,
        'tags': tags,
    });
    console.log('Per Month Reminder:');
    console.log(JSON.stringify(reminders.slice(-1)[0], null, 2));

    return [reminders.slice(-1)[0], shouldNotify];
}


function addTimerReminder(task, startDate, endDate) {

    if (isBeforeToday(endDate)) {
        return [{}, false];
    }

    let shouldNotify = false;
    let hasStarted = isBeforeOrOnToday(startDate);
    let tags;

    if (!hasStarted) {
        let countdownData = calculateDaysAndMonths(startDate);
        tags = [
            // `${countdownData.days} til start`
            '(starts)',
            countdownData.days
        ];
        tags.push(`${getDisplayDate(startDate)}`)
        if (countdownData.dayNum > 30)
            tags.push(`${countdownData.months}`)

    } else {
        let countdownData = calculateDaysAndMonths(endDate);
        tags = [
            countdownData.days
        ];
        if (countdownData.dayNum > 30)
            tags.push(`${countdownData.months}`)

        tags.push(getPercentageComplete(startDate, endDate));
    }

    reminders.push({
        'type': 'Timer',
        'title': task,
        'startDate': startDate,
        'displayDate': getDisplayDate(startDate),
        'endDate': endDate,
        'tags': tags,
    });
    console.log('Timer Reminder:');
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
            if (isBeforeOrOnToday(r.nextContactDate)) {
                remindersToNotify.push(structuredClone(r));
                r.nextContactDate = getNextInterval(r.startDate, r.cadence);
            }
        } else if (r.type == 'Date') {

            if (isBeforeOrOnToday(r.eventDate)) {
                console.log(99);
                remindersToNotify.push(structuredClone(r));
            } else {
                let shouldNotify = false;
                while (isBeforeOrOnToday(r.showRemindersOn[0])) {
                    r.showRemindersOn.shift();
                    shouldNotify = true;
                }
                if (shouldNotify) {
                    remindersToNotify.push(structuredClone(r));
                }
            }

        } else if (r.type == 'Per Month') {
            // if has started and occurs today
            if (isBeforeOrOnToday(r.startDate) && isBeforeOrOnToday(r.nextContactDate)) {
                remindersToNotify.push(structuredClone(r));
                r.nextContactDate = getNextDateOfTheMonth(r.monthDate);
                r.displayDate = getDisplayDate(r.nextContactDate);
            }
        }
    }

    return remindersToNotify;
}


function removeCompletedReminders() {
    reminders = reminders.filter(function (r) {
        let completed = false;
        if (r.type == 'Date' && isBeforeOrOnToday(r.eventDate)) {
            completed = true;
        } else if (r.type == 'Timer' && isBeforeToday(r.endDate)) {
            completed = true;
        }

        if (!completed) {
            return r;
        }

    });

}

function updateTags() {
    for (let r of reminders) {
        if (['Per Month', 'Date'].includes(r.type)) {
            let countdownData;
            if ('nextContactDate' in r) {
                countdownData = calculateDaysAndMonths(r.nextContactDate);
            } else if ('eventDate' in r) {
                countdownData = calculateDaysAndMonths(r.eventDate);
            }

            let tags = [];
            tags.push(r.displayDate);
            tags.push(`${countdownData.days}`);

            if (countdownData.dayNum > 30)
                tags.push(`${countdownData.months}`);

            r.tags = tags;

        } else if (r.type == 'Timer') {
            let tags = [];
            let hasStarted = isBeforeOrOnToday(r.startDate);
            let countdownData;

            if (!hasStarted) {
                tags.push(r.displayDate);
                countdownData = calculateDaysAndMonths(r.startDate);
                tags.push('(starts)')
            } else {
                countdownData = calculateDaysAndMonths(r.endDate);
            }

            tags.push(countdownData.days);

            if (countdownData.dayNum > 30)
                tags.push(`${countdownData.months}`)

            if (hasStarted)
                tags.push(getPercentageComplete(r.startDate, r.endDate));


            r.tags = tags;
        }
    }

}

function getDeleteReminderFunc() {
    let reminders = getReminders();
    // Function to remove reminder
    const deleteReminder = () => {
        // Get the clicked reminder element
        const reminderElements = document.querySelectorAll(".reminder-area .upcoming-selected");
        if (!reminderElements) return;

        // Get the title and tags from the reminder div
        for (let reminderDiv of reminderElements) {
            const title = reminderDiv.querySelector('.noti-name').textContent;
            const tags = Array.from(reminderDiv.querySelectorAll('.noti-tag')).map(tag => tag.textContent);

            // Find the corresponding entry in the reminders array and remove it
            const index = reminders.findIndex(noti => noti.title === title && JSON.stringify(noti.tags) === JSON.stringify(tags));

            if (index !== -1) {
                reminders.splice(index, 1);  // Remove from the array
                // console.log(`Removed reminder: ${title}`);
                // console.log(`Updated reminders array:`, reminders);
                // Remove the reminder from the DOM
                reminderDiv.remove();
            }
        }
    };

    return deleteReminder;
}

function getDisplayDate(startDate) {
    const [year, month, day] = startDate.split("-");
    return `${month}/${day}`;
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
    updateTags,
    addTimerReminder,
    getDeleteReminderFunc
}