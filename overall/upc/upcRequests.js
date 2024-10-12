import * as u from './upcoming.js'
import * as _ from '../getThis.js';
import * as r from './reminders.js'
import * as n from './notifications.js'
import * as uh from './upcRequestsHelper.js'

function cadenceRequest(task, startDate, cadence) {
    let tags = r.addCadenceReminder(task, startDate, cadence);
    u.addReminderElement(r.getElement(task, tags));

    if (uh.todayIsCadenceDay(startDate, cadence)) {
        let nTags = n.addCadenceNotification(task);
        u.addNotificationElement(n.getElement(task, nTags));
    }
}

function dateRequest(task, eventDate, reminderDays) {
    reminderDays = reminderDays.replace(/\s+/g, '').split(',');
    let [reminder, shouldNotify] = r.addDateReminder(task, eventDate, reminderDays);
    u.addReminderElement(r.getElement(task, reminder.tags));

    if (shouldNotify) {
        let nTags = n.addDateNotification(reminder);
        u.addNotificationElement(n.getElement(task, nTags));
        /* 
            If we push notification, we should update showReminders
            handle if you get a reminder date that has already occurred/is before today
        */
    }
}




export {
    cadenceRequest,
    dateRequest
}