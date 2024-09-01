// import { upcomingAgenda } from './agendaList.js'

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
    let differenceInDays = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    console.log("differenceInDays");
    console.log(differenceInDays);
    return differenceInDays;
}

function eventIsActive(startDate, endDate) {
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
    let upcomingSection = document.querySelector(".upcoming .content");
    for (let [eventName, startDate, endDate] of upcoming) {
        if (eventIsActive(startDate, endDate)) {
            let timeSpan = getDifferenceBwDays(endDate, startDate);
            let remainingTimeSpan = getDifferenceBwDays(endDate);
            let remainingMonthSpan = Math.round(remainingTimeSpan / 30);
            let remainingWeekSpan = Math.floor(remainingTimeSpan / 7);
            let percentageTimePassed = Math.round((timeSpan - remainingTimeSpan) / timeSpan * 100);
            let percentageText = '';
            if (percentageTimePassed > 10) {
                percentageText = percentageTimePassed.toString() + '%';
            }
            

            let element = `
            <div class="flexible timer">            
                <div class="flexible progress-bar">
                <div class="title">${eventName}</div>
                <div class="flexible bar">
                    <div class="remaining" style="width: ${(100 - percentageTimePassed)}%;"></div>
                    <div class="completed" style="width: ${percentageTimePassed}%;">${percentageText}</div>
                </div>
                </div>
                
                <div class="flexible dates">
                    <div>${remainingWeekSpan} weeks</div>
                    <div>${remainingMonthSpan} months</div>
                    <div>${remainingTimeSpan} days</div>
                </div>
                
            </div>
            `;

            upcomingSection.innerHTML += element;

        }
    }
    return;
}

function upcomingAgenda() {
    // new Date(year, month, day)
    return [
        // ['Spain Trip', '2024/01/24', '2024/04/19'],
        // ['In Spain', '2024/04/20', '2024/05/02'],
        // ['New Apartment', '2024/01/06', '2024/03/20'],
        
        ['New Orleans Trip', '2024/8/31', '2024/11/21'],
        // ['Christmas', '2024/01/01', '2024/12/25'],
        ['End of the Year', '2024/01/01', '2024/12/31'],
    ];
}

// numOfDays();

export {
    numOfDays
}