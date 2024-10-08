


function getCalendar(calendarType) {
    let calendar = `<div class="flexible ${calendarType} calendar">`;

    let amountAnswered = 16;
    let weekElement = '';
    for (let i = 0; i < Math.ceil(amountAnswered / 7); i++) {
        weekElement += `<div class="flexible day-row">`;

        const randomBooleans = generateRandomBooleans(7);
        for (let j = 0; j < randomBooleans.length; j++) {

            let fulfilled = randomBooleans[j];
            let dayCount = i * 7 + j + 1;

            if (dayCount > amountAnswered) {
                weekElement += `<div class="day upcoming-days"></div>`;
            }
            else if (dayCount == amountAnswered) {
                weekElement += `<div class="day today"></div>`;
            }
            else if (!fulfilled) {
                weekElement += `<div class="day"></div>`;
            }
            else if (fulfilled) {
                weekElement += `<div class="day fulfilled"></div>`;
            }
        }

        weekElement += `</div>`;
    }
    calendar += weekElement + `</div>`
    return calendar
}

function scrollCalendars() {
    const calendars = document.querySelectorAll('.calendar');
    for (let calendar of calendars) {
        calendar.scrollTop = calendar.scrollHeight;
    }
}

// Function to generate a list of random boolean values
function generateRandomBooleans(count) {
    const booleans = [];

    for (let i = 0; i < count; i++) {
        // Generate a random boolean value
        const randomBoolean = Math.random() > 0.5;
        booleans.push(randomBoolean);
    }

    return booleans;
}

// getCalendar("exercise");
// getCalendar("eating");
export {
    getCalendar,
    scrollCalendars
}







