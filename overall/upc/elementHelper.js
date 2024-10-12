function getClassName(value) {
    return value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
}


function getNextInterval(startDate, cadence) {
    const today = new Date(); // Get today's date
    const start = new Date(startDate); // Convert startDate to a Date object

    // If startDate is after today, return the first 14-day interval from startDate
    if (start > today) {
        // start.setDate(start.getDate() + cadence); // Add 14 days to the startDate
        return start;
    }

    // Calculate the difference in days between startDate and today
    const diffInTime = today.getTime() - start.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    // Find how many full 14-day intervals have passed
    const intervalsPassed = Math.floor(diffInDays / cadence);

    // Calculate the next date in the 14-day interval after today
    const nextIntervalDate = new Date(start);
    nextIntervalDate.setDate(start.getDate() + (intervalsPassed + 1) * cadence);

    // Format the date as YYYY-MM-DD
    return nextIntervalDate.toISOString().split('T')[0];
}

function dateFormatted(date) {
    return date.toISOString().split('T')[0];
}
// Function to check if the date string is today
function isToday(dateString) {
    let timeZone = moment.tz.guess();

    // Parse the input date in the specified time zone
    const inputDate = moment.tz(dateString, "YYYY-MM-DD", timeZone);

    // Get today's date in the same time zone
    const today = moment.tz(timeZone);

    // Compare only by the day in the specified time zone
    return inputDate.isSame(today, 'day');
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
    const today = new Date();
    const currentMonth = today.getMonth(); // Get the current month (0-indexed)
    const currentYear = today.getFullYear(); // Get the current year

    // Create a date for the given day in the current month
    const nextDate = new Date(currentYear, currentMonth, day);

    // Check if the day has already passed in the current month
    if (today.getDate() >= day) {
        // If today is past the given day, move to the next month
        nextDate.setMonth(currentMonth + 1);
    }

    // If the given day exceeds the number of days in the next month,
    // set the date to the last day of that month
    const lastDayOfNextMonth = new Date(currentYear, nextDate.getMonth() + 1, 0).getDate();
    if (day > lastDayOfNextMonth) {
        nextDate.setDate(lastDayOfNextMonth);
    }

    return nextDate.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
}


function calculateDaysAndMonths(endDate) {
    const start = new Date();
    const end = new Date(endDate);

    // Calculate the difference in time (in milliseconds)
    const diffInTime = end.getTime() - start.getTime();

    // Calculate the difference in days
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    // Calculate the difference in months
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    // Total months difference, rounded to the nearest whole number
    const totalMonths = Math.round(yearsDiff * 12 + monthsDiff + (end.getDate() - start.getDate()) / 30);

    return {
        dayNum: diffInDays,
        days: diffInDays + 'd',
        months: totalMonths + 'mo'
    };
}

export {
    getClassName,
    getNextInterval,
    dateFormatted,
    isToday,
    getOrdinalIndicator,
    getNextDateOfTheMonth,
    calculateDaysAndMonths
}