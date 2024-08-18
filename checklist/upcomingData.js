import { upcomingAgenda } from './agendaList.js'

function rearrangeDate(dateStr) {
    let date = new Date(dateStr);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    return date;
}

function getDifferenceBwDays(end, start = '') {
    let date1;
    if (!start) date1 = new Date();
    else date1 = new Date(start);

    let date2 = new Date(end);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let differenceInDays = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    return differenceInDays;
}

function eventLive(startDate, endDate) {
    let sD = new Date(startDate);
    let eD = new Date(endDate);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    sD = sD.getTime();
    eD = eD.getTime();
    today = today.getTime();

    let eventActive = sD <= today && today <= eD;
    return eventActive
}


function numOfDays() {
    let upcoming = upcomingAgenda();
    let upcomingSection = document.querySelector(".upcoming-section");
    for (let [eventName, startDate, endDate] of upcoming) {
        if (eventLive(startDate, endDate)) {
            let timeSpan = getDifferenceBwDays(endDate, startDate);
            let remainingTimeSpan = getDifferenceBwDays(endDate);
            let remainingMonthSpan = Math.floor(remainingTimeSpan / 30);
            let percentageTimePassed = Math.round((timeSpan - remainingTimeSpan) / timeSpan * 100);

            let element = `<label class="container upcoming" data-event-name="` + eventName + `">
                            <p class="item">` + eventName + `</p>
                            <span class="remaining-days">` + remainingTimeSpan + ` days | ` + remainingMonthSpan + ` mo</span>
                            <div class="progress-bar">
                                <div class="progress">` + percentageTimePassed.toString() + `%</div>
                            </div>
                        </label>`;

            upcomingSection.innerHTML += element;

            let progressElement = document.querySelector("[data-event-name=\"" + eventName + "\"] .progress");
            progressElement.style.width = percentageTimePassed + '%';
            progressElement.title = rearrangeDate(startDate) + ' - ' + rearrangeDate(endDate);
        }
    }
    return;

}

export {
    numOfDays
}