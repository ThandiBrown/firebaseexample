import * as ur from './upc/upcRequests.js'




function makeRequests() {
    // Date With Reminder of Today
    // ur.dateRequest(
    //     'Make Hamburgers',
    //     getDateWithOffset(7),
    //     '7'
    // );
    // // Date With Reminder of Before Today
    // ur.dateRequest(
    //     'Make Hamburgers',
    //     getDateWithOffset(7),
    //     '7, 10'
    // );
    // Date With No Reminders
    // ur.dateRequest(
    //     'Make Hamburgers',
    //     getDateWithOffset(7),
    //     ''
    // );
    // Date that occurs today
    // ur.dateRequest(
    //     'Make Hamburgers',
    //     getDateWithOffset(0),
    //     ''
    // );
}

function addData(upcoming) {
    upcoming.reminders.push(
        // { // Date That Will Notify Today
        //     "type": "Date",
        //     "title": "Make Hamburgers",
        //     "eventDate": "10-19-2024",
        //     "showRemindersOn": [
        //         getTodayDate()
        //     ],
        //     "tags": [
        //         "10-19-2024"
        //     ]
        // },
        { // Date That occurs today
            "type": "Date",
            "title": "Make Hamburgers",
            "eventDate": getTodayDate(),
            "showRemindersOn": [

            ],
            "tags": [
                getTodayDate()
            ]
        },
    )
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getDateWithOffset(days) {
    const today = new Date();

    // Add or subtract the days
    today.setDate(today.getDate() + days);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export {
    makeRequests,
    addData
}