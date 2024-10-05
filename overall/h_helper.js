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
        days: diffInDays + ' d',
        months: totalMonths + ' mo'
    };
}

function getDaysBefore(date, daysBefore) {
    let priorDate = new Date(date);
    priorDate.setDate(priorDate.getDate() - daysBefore);
    return priorDate.toISOString().split('T')[0];
}

function getPercentageComplete(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date(); // Get today's date

    // Ensure today's date doesn't exceed the endDate
    const current = today > end ? end : today;

    // Calculate total duration between startDate and endDate (in milliseconds)
    const totalDuration = end.getTime() - start.getTime();

    // Calculate the duration from startDate to today
    const elapsedDuration = current.getTime() - start.getTime();

    // Calculate the percentage complete
    const percentageComplete = (elapsedDuration / totalDuration) * 100;

    // Return the percentage, ensuring it is not below 0 or above 100
    return Math.min(Math.max(percentageComplete, 0), 100).toFixed(0) + '%';
}

function getNextInterval(startDate, cadence) {
    const today = new Date(); // Get today's date
    const start = new Date(startDate); // Convert startDate to a Date object

    // If startDate is after today, return the first 14-day interval from startDate
    if (start > today) {
        start.setDate(start.getDate() + cadence); // Add 14 days to the startDate
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


export {
    calculateDaysAndMonths,
    getDaysBefore,
    getPercentageComplete,
    getNextInterval
}