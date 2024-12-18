

function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}

function printIfTrue(statement, condition, returnValue = '') {
    if (typeof statement === 'function')
        return condition ? statement() : returnValue
    return condition ? statement : returnValue
}

function appendElem(element, newElement) {
    element.insertAdjacentHTML('beforeend', newElement);
}

function appendAndRetrieve(element, newElement) {
    element.insertAdjacentHTML('beforeend', newElement);
    return element.lastElementChild;
}

function appendAndRetrieveParent(element, newElement) {
    element.insertAdjacentHTML('beforeend', newElement);
    return element;
}

function insertAndRetrieve(element, newElement) {
    element.insertAdjacentHTML('afterbegin', newElement);
    return element.firstElementChild;
}


function returnRecordsAsBool(calendarData) {

    /* produce a list of booleans from the start date of the record keeping until now
    the value should be true if a record was stored at that day
    */
    let newRecords = [];

    // console.log('calendarData.fulfilled');
    // console.log(calendarData.fulfilled);
    let allDates = generateDatesFrom(calendarData.startDate);
    // console.log("allDates");
    // console.log(allDates);
    for (let date of allDates) {
        newRecords.push({
            'date': date,
            'fulfilled': calendarData.fulfilled.includes(date),
            'progressed': calendarData.progressed.includes(date),
            'tag': ''
        });
    }
    newRecords = chunkAndModifyArray(newRecords, 7);

    return newRecords
}

function generateDatesFrom(startDateParam) {
    let timeZone = moment.tz.guess();
    const today = moment.tz(timeZone).startOf('day'); // Get today's date at the start of the day in the given time zone
    let startDate;

    // Convert startDateParam to a Moment.js object if it's a string or Date object
    if (typeof startDateParam === 'string') {
        startDate = moment.tz(startDateParam, 'YYYY-MM-DD', timeZone).startOf('day');
    } else if (moment.isDate(startDateParam)) {
        startDate = moment.tz(startDateParam, timeZone).startOf('day');
    } else {
        throw new Error("Invalid start date format. Provide a string or Date object.");
    }

    // Ensure startDate is before or equal to today
    if (startDate.isAfter(today)) {
        throw new Error("Start date must be before or equal to today.");
    }

    const dates = [];
    let currentDate = startDate.clone(); // Clone the startDate for iteration

    // Loop to generate dates from startDate to today
    while (currentDate.isSameOrBefore(today)) {
        // Add the formatted date to the list
        dates.push(currentDate.format('YYYY-MM-DD'));
        // Move to the next day
        currentDate.add(1, 'day');
    }

    return dates;
}

function generateDatesFromOld(startDateParam) {
    // Convert startDateParam to a Date object if it's not already
    const today = getCentralTime();
    let startDate;

    if (typeof startDateParam === 'string') {
        startDate = new Date(startDateParam);
    } else if (startDateParam instanceof Date) {
        startDate = startDateParam;
    } else {
        throw new Error("Invalid start date format. Provide a string or Date object.");
    }

    // Ensure startDate is before today
    if (startDate > today) {
        throw new Error("Start date must be before today.");
    }

    const dates = [];
    let currentDate = new Date(startDate);

    // Loop to generate dates from startDate to today
    // using this instead of a while
    for (let i = 0; i < Math.round(
        (today - startDate) / (1000 * 60 * 60 * 24)
    ) + 1; i++) {
        if (currentDate <= today) {
            // Format the date as YYYY-MM-DD
            dates.push(currentDate.toISOString().split('T')[0]);
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        } else {
            break;
        }
    }

    return dates;
}

function getCentralTime(date = new Date()) {
    // Create a date object from the input or use the current date
    let utc = date.getTime() + date.getTimezoneOffset() * 60000;

    // Offset for Central Time (CT) which is UTC-6 or UTC-5 (during DST)
    const offset = -6; // Central Standard Time (CST) UTC-6
    // const offset = -5; // Central Daylight Time (CDT) UTC-5 (during DST)

    // Return the date in Central Time
    return new Date(utc + 3600000 * offset);
}

function chunkAndModifyArray(list, chunkSize) {
    if (chunkSize <= 0) {
        throw new Error("Chunk size must be greater than 0.");
    }

    const result = [];

    // Break up the list into chunks of size chunkSize
    for (let i = 0; i < list.length; i += chunkSize) {
        const chunk = list.slice(i, i + chunkSize);
        // console.log("chunk"); console.log(chunk);

        // If this is the last chunk, modify it
        if (i + chunkSize >= list.length) {
            // Set the last element to 1 if the chunk is not empty
            if (chunk.length > 0) {
                chunk[chunk.length - 1].tag = 'today';
            }
            // Fill the rest of the chunk with zeros
            while (chunk.length < chunkSize) {
                chunk.push({
                    'date': '', 'fulfilled': '', 'progressed': '', 'tag': 'upcoming-days'
                });
            }
        }

        result.push(chunk);
    }

    return result;
}

export {
    getClassName,
    printIfTrue,
    appendElem,
    appendAndRetrieve,
    insertAndRetrieve,
    returnRecordsAsBool,
    appendAndRetrieveParent
}