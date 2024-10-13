function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}

function getNextInterval(startDate, cadence) {
    const today = moment().startOf('day'); // Get today's date, set time to start of the day
    const start = moment(startDate, 'YYYY-MM-DD').startOf('day'); // Parse startDate and set to start of the day

    // If startDate is after today, return the first interval from startDate
    if (start.isAfter(today)) {
        return start.add(cadence, 'days').format('YYYY-MM-DD'); // Return the first interval date
    }

    // Calculate the difference in days between startDate and today
    const diffInDays = today.diff(start, 'days');

    // Find how many full intervals have passed
    const intervalsPassed = Math.floor(diffInDays / cadence);

    // Calculate the next date in the cadence interval after today
    const nextIntervalDate = start.add((intervalsPassed + 1) * cadence, 'days');

    // Return the next interval date in YYYY-MM-DD format
    return nextIntervalDate.format('YYYY-MM-DD');
}

function dateFormatted(date) {
    return date.toISOString().split('T')[0];
}
// Function to check if the date string is today
function isTheDay(dateString) {
    let timeZone = moment.tz.guess();

    // Parse the input date in the specified time zone
    const inputDate = moment.tz(dateString, "YYYY-MM-DD", timeZone);

    // Get today's date in the same time zone
    const today = moment.tz(timeZone);

    // Compare only by the day in the specified time zone
    return inputDate.isSame(today, 'day');
}

function beforeOrOnToday(dateString) {
    let timeZone = moment.tz.guess();
    const today = moment.tz(timeZone).startOf('day'); // Get today's date in the specified timezone
    const inputDate = moment.tz(dateString, 'YYYY-MM-DD', timeZone).startOf('day'); // Parse the input date in the same timezone

    if (inputDate.isBefore(today) || inputDate.isSame(today)) {
        return true;
    } else {
        return false;
    }
}

function isBeforeToday(dateString) {
    let timeZone = moment.tz.guess();
    const today = moment.tz(timeZone).startOf('day'); // Get today's date in the specified timezone
    const inputDate = moment.tz(dateString, 'YYYY-MM-DD', timeZone).startOf('day'); // Parse the input date in the same timezone

    if (inputDate.isBefore(today)) {
        return true;
    } else {
        return false;
    }
}

function getOrdinalIndicator(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = num % 100;

    // Check if the number is in the special cases (11, 12, 13)
    if (remainder >= 11 && remainder <= 13) {
        return suffixes[0]; // "th"
    }

    // Get the appropriate suffix based on the last digit
    return (suffixes[num % 10] || suffixes[0]); // Default to "th" for numbers >= 20
}

function getNextDateOfTheMonth(day) {
    const today = moment().startOf('day'); // Get today's date and set time to start of the day
    let nextDate = moment().date(day).startOf('day'); // Set the day for the current month and reset time

    // Check if today is past the given day in the current month
    if (today.date() >= day) {
        // Move to the next month if today is past the given day
        nextDate.add(1, 'month');
    }

    // Ensure the day doesn't exceed the number of days in the next month
    const lastDayOfNextMonth = nextDate.clone().endOf('month').date(); // Get the last day of the next month
    if (day > lastDayOfNextMonth) {
        nextDate.date(lastDayOfNextMonth); // Adjust the date to the last day of the month if necessary
    }

    return nextDate.format('YYYY-MM-DD'); // Return the date in YYYY-MM-DD format
}

function calculateDaysAndMonths(endDate) {
    const start = moment().startOf('day');  // Get today's date and set time to start of the day
    const end = moment(endDate, 'YYYY-MM-DD').startOf('day');  // Parse endDate and set to start of the day

    // Calculate the difference in days
    const diffInDays = end.diff(start, 'days');

    // Calculate the difference in months, including partial months
    const totalMonths = end.diff(start, 'months', true);  // The 'true' flag includes partial months

    return {
        dayNum: diffInDays,
        days: diffInDays + 'd',
        months: Math.round(totalMonths) + 'mo'  // Round total months to nearest whole number
    };
}

function getPercentageComplete(startDate, endDate) {
    const start = moment(startDate, 'YYYY-MM-DD').startOf('day');  // Parse startDate
    const end = moment(endDate, 'YYYY-MM-DD').startOf('day');  // Parse endDate
    const today = moment().startOf('day');  // Get today's date and set time to the start of the day

    // Ensure today's date doesn't exceed the endDate
    const current = today.isAfter(end) ? end : today;

    // Calculate total duration between startDate and endDate (in milliseconds)
    const totalDuration = end.diff(start);

    // Calculate the duration from startDate to today
    const elapsedDuration = current.diff(start);

    // Calculate the percentage complete
    const percentageComplete = (elapsedDuration / totalDuration) * 100;

    // Return the percentage, ensuring it is not below 0 or above 100
    return Math.min(Math.max(percentageComplete, 0), 100).toFixed(0) + '%';
}

function getDateWithOffset(days) {
    let timeZone = moment.tz.guess();
    const today = moment.tz(timeZone).startOf('day'); // Get today's date and set to start of the day

    // Add or subtract the specified number of days
    const offsetDate = today.add(days, 'days');

    // Return the date in YYYY-MM-DD format
    return offsetDate.format('YYYY-MM-DD');
}

export {
    getClassName,
    getNextInterval,
    dateFormatted,
    isTheDay,
    getOrdinalIndicator,
    getNextDateOfTheMonth,
    calculateDaysAndMonths,
    getPercentageComplete,
    beforeOrOnToday,
    isBeforeToday,
    getDateWithOffset
}