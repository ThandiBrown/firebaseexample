


function todayIsCadenceDay(startDateStr, cadence) {
    // Parse the start date string into a Date object
    let startDate = new Date(startDateStr);
    
    // Get today's date without the time part
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the difference in time (milliseconds) between today and the start date
    let timeDifference = today - startDate;

    // Convert the time difference from milliseconds to days
    let dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Check if the day difference is divisible by the cadence
    return dayDifference >= 0 && dayDifference % cadence === 0;
}





export {
    todayIsCadenceDay
}