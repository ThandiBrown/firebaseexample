
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

    u.createElement(
        n.getElements(upcData.notifications),
        r.getElements(upcData.reminders)
    );

    _.getPage().appendChild(u.getElement());
}


function printData() {
    console.log({
        'status': {},
        'reminders': r.getReminders(),
        'notifications': n.getNotifications()
    });
}






export {
    main,
    printData
}