
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
    return nextIntervalDate.toISOString().split('T')[0];
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
        }
    }

    return remindersToNotify;
}







export {
    getElements,
    getElement,
    setReminders,
    addCadenceReminder,
    getNextInterval,
    getReminders,
    checkForNotifications
}