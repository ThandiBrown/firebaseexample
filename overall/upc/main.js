
import * as _ from '../getThis.js';
import * as u from './upcoming.js'
import * as r from './reminders.js'
import * as n from './notifications.js'


function main(upcData) {
    if (Object.keys(upcData).length === 0) {
        upcData = u.newUpc();
        console.log("newUpc");
    } else {
        u.setUpc(upcData);
        console.log("setUpc");
    }

    r.setReminders(upcData.reminders);
    n.setNotifications(upcData.notifications);

    if (u.shouldUpdate()) {
        console.log('Performing Daily Update');
        let remindersToNotify = r.checkForNotifications();
        n.remindersToNotifications(remindersToNotify);

        r.removeCompletedReminders();
        r.updateTags();
        n.updateTags(r.getReminders());

        u.updateLastUpdated();
    }

    u.createElement(
        n.getElements(n.getNotifications()),
        r.getElements(r.getReminders())
    );

    _.getPage().appendChild(u.getElement());
}


function printData() {
    console.log(u.getUpcomingData());
}

function getUpcomingData() {
    u.setUpcReminders(r.getReminders());
    u.setUpcNotifications(n.getNotifications());
    return u.getUpcomingData();
}





export {
    main,
    printData,
    getUpcomingData
}