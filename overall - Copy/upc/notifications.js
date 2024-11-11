import {
    getClassName,
    getNextInterval,
    dateFormatted,
    isTheDay,
    getOrdinalIndicator,
    getNextDateOfTheMonth,
    calculateDaysAndMonths
} from './elementHelper.js'

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
    addNotification(task, tags);
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

    addNotification(r.title + additionalText, tags);
    return tags;
}

function addPerMonthNotification(r) {
    let tags = [
        `(on ${r.monthDate}${getOrdinalIndicator(parseInt(r.monthDate))})`,
    ];

    addNotification(r.title, tags);
    return tags;
}

function addNotification(title, tags) {
    notifications.push({
        'title': title,
        'tags': tags,
    });
}

function remindersToNotifications(reminders) {
    for (let r of reminders) {
        if (r.type == 'Cadence') {
            addCadenceNotification(r.title);
        } else if (r.type == 'Date') {
            addDateNotification(r);
        } else if (r.type == 'Per Month') {
            addPerMonthNotification(r);
        }
    }
}


function getNotifications() {
    return notifications;
}


function updateTags(reminders) {
    let nTags = {};
    for (let r of reminders) {

        if (r.type == 'Date') {
            let countdownData = calculateDaysAndMonths(r.eventDate);
            let tags = [
                r.eventDate,
                `${countdownData.days}`
            ];

            if (countdownData.dayNum > 30)
                tags.push(`${countdownData.months}`)

            nTags[r.title] = tags;
        }
    }

    for (let n of notifications) {
        if (n.title in nTags) {
            n.tags = nTags[n.title];
        }
    }

}

function getDeleteNotiFunc() {
    let notifications = getNotifications();
    // Function to remove notification
    const deleteNotification = () => {
        // Get the clicked notification element
        const notificationElements = document.querySelectorAll(".noti-area .upcoming-selected");
        if (!notificationElements) return;

        // Get the title and tags from the notification div
        for (let notificationDiv of notificationElements) {
            const title = notificationDiv.querySelector('.noti-name').textContent;
            const tags = Array.from(notificationDiv.querySelectorAll('.noti-tag')).map(tag => tag.textContent);

            // Find the corresponding entry in the notifications array and remove it
            const index = notifications.findIndex(noti => noti.title === title && JSON.stringify(noti.tags) === JSON.stringify(tags));

            if (index !== -1) {
                notifications.splice(index, 1);  // Remove from the array
                // console.log(`Removed notification: ${title}`);
                // console.log(`Updated notifications array:`, notifications);
                // Remove the notification from the DOM
                notificationDiv.remove();
            }

        }
    };

    return deleteNotification;
}



export {
    setNotifications,
    getElements,
    getElement,
    addCadenceNotification,
    getNotifications,
    remindersToNotifications,
    addDateNotification,
    addPerMonthNotification,
    updateTags,
    getDeleteNotiFunc
}