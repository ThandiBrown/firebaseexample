
import * as actions from './actions.js'
import * as e from './eventListeners.js'
import * as uc from './upcomingComponent.js'


function loadUpcomingPillar(upcomingData) {
    let pillarElement = uc.createPillar('Upcoming', upcomingData.status);
    e.pillarTitleListener(pillarElement);

    for (let notification of upcomingData.notifications) {
        let notificationElement = uc.createUpcomingTask(pillarElement, notification.title);


        if (notification.occurringDate) {
            let tags = [];
            let today = new Date().toString();
            tags.push(notification.occurringDate);

            if (notification.timerStart) {
                let countdownData = calculateDaysAndMonths(
                    today,
                    notification.timerEnd
                );
                tags.push(countdownData.days + ' d');
                tags.push(countdownData.months + ' mo');
            }
            else {
                let countdownData = calculateDaysAndMonths(
                    today,
                    notification.occurringDate
                );
                tags.push(countdownData.days + ' d');
                if (countdownData.days > 30) {
                    tags.push(countdownData.months + ' mo');
                }
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
        days: diffInDays,
        months: totalMonths
    };
}


export {
    loadUpcomingPillar
}