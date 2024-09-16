

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

function insertAndRetrieve(element, newElement) {
    element.insertAdjacentHTML('afterbegin', newElement);
    return element.lastElementChild;
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
            'tag': ''
        });
    }
    // console.log("newRecords"); console.log(newRecords);
    newRecords = chunkAndModifyArray(newRecords, 7);

    console.log("newRecords");
    console.log(newRecords);
    return newRecords
}

function generateDatesFrom(startDateParam) {
    // Convert startDateParam to a Date object if it's not already
    const today = new Date();
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
    for (let i = 0; i < Math.round(
        (today - startDate) / (1000 * 60 * 60 * 24)
    ); i++) {

        // Format the date as YYYY-MM-DD
        dates.push(currentDate.toISOString().split('T')[0]);
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
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
                console.log(chunk[chunk.length - 1]);
                chunk[chunk.length - 1].tag = 'today';
            }
            // Fill the rest of the chunk with zeros
            while (chunk.length < chunkSize) {
                chunk.push({
                    'date': '', 'fulfilled': '', 'tag': 'upcoming-days'
                });
            }
        }

        result.push(chunk);
    }

    console.log('result');
    console.log(result);
    return result;
}

export {
    getClassName,
    printIfTrue,
    appendElem,
    appendAndRetrieve,
    insertAndRetrieve,
    returnRecordsAsBool
}