
let notifications;



function setNotifications(value) {
    notifications = value;
}

function getElements(nData) {
    let allNotificationsString = '';
    for (let n of nData) {
        allNotificationsString += getElement(n.title, n.tags);
    }

    return allNotificationsString;
}

function getElement(task, tags) {
    let tagElemStr = '';
    for (let tagName of tags) {
        tagElemStr += `<div class="noti-tag">${tagName}</div>`;
    }
    let notiString = `
        <div class="notification flexible">
            <div class="noti-name">${task}</div>
            <div class="upcoming-tag-area flexible">${tagElemStr}</div>
        </div>
    `;

    return notiString;
}

function addCadenceNotification(task) {
    let tags = [];
    notifications.push({
        'title': task,
        'tags': tags,
    });
    return tags;
}

function addDateNotification(r) {
    let additionalText = '';
    let countdownData = calculateDaysAndMonths(r.eventDate);
    let tags = [
        r.eventDate,
        `${countdownData.days}`
    ];

    if (countdownData.dayNum > 30)
        tags.push(`${countdownData.months}`)

    if (countdownData.dayNum != 0)
        additionalText = ' Reminder';

    notifications.push({
        'title': r.title + additionalText,
        'tags': tags,
    });
    return tags;
}

function remindersToNotifications(reminders) {
    for (let r of reminders) {
        if (r.type == 'Cadence') {
            addCadenceNotification(r.title);
        } else if (r.type == 'Date') {
            addDateNotification(r);
        }
    }
}


function getNotifications() {
    return notifications;
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
        days: diffInDays + 'd',
        months: totalMonths + 'mo'
    };
}


export {
    setNotifications,
    getElements,
    getElement,
    addCadenceNotification,
    getNotifications,
    remindersToNotifications,
    addDateNotification
}