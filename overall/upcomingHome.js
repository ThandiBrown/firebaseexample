
import * as actions from './actions.js'
import * as e from './eventListeners.js'
import * as uc from './upcomingComponent.js'


function loadUpcomingPillar(upcomingData) {
    let pillarElement = uc.createPillar('Upcoming', upcomingData.status);
    e.pillarTitleListener(pillarElement);

    for (let notification of upcomingData.notifications) {
        let notificationElement = uc.createUpcomingTask(pillarElement, notification.title);

        // console.log(notification);
        if (true && notification.occurringDate) {
            let tags = [];
            let today = new Date().toString();
            tags.push(notification.occurringDate);

            let countdownData = calculateDaysAndMonths(
                today,
                notification.occurringDate
            );

            tags.push(countdownData.days);

            if (countdownData.dayNum > 30) {
                tags.push(countdownData.months);
            }

            if (notification.timerStart) {
                tags.push(getPercentageComplete(notification.timerStart, notification.timerEnd));
            }

            uc.createNotiTag(notificationElement, tags);
        }
    }

    for (let actionName of ['Date', 'Timer', 'Cadence', 'Per Month']) {
        let tag = uc.createNotiActionTag(pillarElement, actionName);
        e.actionTagListener(pillarElement, tag, actionName);
    }
}

function calculateDaysAndMonths(startDate, endDate) {
    const start = new Date(startDate);
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



export {
    loadUpcomingPillar
}