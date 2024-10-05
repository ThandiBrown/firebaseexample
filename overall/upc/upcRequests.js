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






export {
    cadenceRequest
}