import * as ur from './upc/upcRequests.js'




function makeRequests() {
    // perMonthRequests();
}

function addData(upcoming) {
    // dateData(upcoming);
    // perMonthData(upcoming);
}

function perMonthRequests() {
    // Month Occurring Today
    ur.perMonthRequest(
        'Occurrence is Today',
        getTodayDate()
    )

    // Month Occurring in the future
    ur.perMonthRequest(
        'Occurrence starts in the future',
        getDateWithOffset(71)
    )

    // Month Occurring started in the past
    ur.perMonthRequest(
        'Occurrence started in the past',
        getDateWithOffset(-60)
    )
}

function perMonthData(upcoming) {
    upcoming.reminders.push(
        {
            "type": "Per Month",
            "title": "Notify Today, starting in the past",
            "startDate": getDateMonthsAgo(3),
            "monthDate": (new Date()).getDate(),
            "nextContactDate": getTodayDate(),
            "tags": [
                "(on 11th)",
                "31d",
                "1mo"
            ]
        },
        {
            "type": "Per Month",
            "title": "Notify Today",
            "startDate": getTodayDate(),
            "monthDate": (new Date()).getDate(),
            "nextContactDate": getTodayDate(),
            "tags": [
                "(on 11th)",
                "31d",
                "1mo"
            ]
        },
        {
            "type": "Per Month",
            "title": "Notify this day in the Future",
            "startDate": getDateMonthsAgo(-3),
            "monthDate": (new Date()).getDate(),
            "nextContactDate": getDateMonthsAgo(-3),
            "tags": [
                "(on 11th)",
                "31d",
                "1mo"
            ]
        },

    );
}

function dateRequests() {
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

function dateData(upcoming) {
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
        // { // Date That occurs today
        //     "type": "Date",
        //     "title": "Make Hamburgers",
        //     "eventDate": getTodayDate(),
        //     "showRemindersOn": [

        //     ],
        //     "tags": [
        //         getTodayDate()
        //     ]
        // },
        { // Date That occurs today
            "type": "Date",
            "title": "Occurs Tomorrow",
            "eventDate": getDateWithOffset(1),
            "showRemindersOn": [

            ],
            "tags": [
                getDateWithOffset(1)
            ]
        },

    )

    upcoming.notifications.push(
        { // Date That occurs today
            "title": "Occurs Tomorrow",
            "tags": [
                getDateWithOffset(1),
                '2d'
            ]
        }
    );
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

function getDateMonthsAgo(monthsAgo) {
    const today = new Date();  // Get today's date
    const pastDate = new Date(today);  // Create a new date object to avoid modifying 'today'

    // Set the month to the past, accounting for overflow of months
    pastDate.setMonth(today.getMonth() - monthsAgo);

    return pastDate.toISOString().split('T')[0];  // Return the date in YYYY-MM-DD format
}

export {
    makeRequests,
    addData
}