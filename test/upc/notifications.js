
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

function remindersToNotifications(reminders) {
    for (let r of reminders) {
        if (r.type == 'Cadence') {
            addCadenceNotification(r.title);
        }
    }
}


function getNotifications() {
    return notifications;
}



export {
    setNotifications,
    getElements,
    getElement,
    addCadenceNotification,
    getNotifications,
    remindersToNotifications
}