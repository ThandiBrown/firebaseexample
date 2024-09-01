import { formCalendar } from './calendar.js'
import { taskCategories, conditionalTopics, getClassName } from './listCategories.js'
import { displayUpcomingEvents } from './upcoming.js'


main();
function main() {
    displayUpcomingEvents();
    formCalendar('eating');
    formCalendar('exercise');
    

    taskCategories('Time Sensitive');

    taskCategories('Conditional', true);
    taskCategories('Backlog');
    addEventListeners();
}

function addEventListeners() {
    // Select all textarea elements
    const boxSections = document.querySelectorAll('.boxSection');
    // console.log(boxSections);
    const todayBoxes = document.querySelectorAll('.today');
    const calendars = document.querySelectorAll('.calendar');
    const bubbles = document.querySelectorAll('.bubble');


    boxSections.forEach(boxSection => {

        const boxMain = boxSection.querySelector('.boxMain .main');
        const textarea = boxSection.querySelector('.submit-text-area');
        const submitButton = boxSection.querySelector('.submit-button');
        const listItems = boxSection.querySelectorAll('.list-item');

        if (boxMain && textarea && submitButton) {
            // boxSection.innerHTML += submissionTextArea();

            submitButton.addEventListener('click', function () {
                // Loop through each textarea and print its name attribute
                let submission = textarea.value.trim();
                if (submission) {
                    let newContent = '';
                    submission = submission.split("\n");
                    for (let line of submission) {
                        newContent += newListItem(line);
                    }
                    boxMain.innerHTML += newContent;
                    textarea.value = '';
                    addListItemEventListeners(listItems, boxMain);
                }

            });


        }
        addListItemEventListeners(listItems, boxMain);

    });

    todayBoxes.forEach(todayBox => {
        todayBox.addEventListener('click', function () {
            todayBox.classList.toggle('fulfilled');
        });
    });

    for (let calendar of calendars) {
        calendar.scrollTop = calendar.scrollHeight;
    }

    bubbles.forEach(bubble => {
        bubble.addEventListener('click', function () {
            for (let listItem of document.querySelectorAll('.' + getClassName(bubble.innerText))) {
                listItem.classList.toggle('hidden');
            }
            bubble.classList.toggle('filter-selected');
            toggleConditional();
        });
    });

    toggleConditional();
}

function toggleConditional() {
    let title = document.querySelector(".conditional > .title");
    let main = document.querySelector(".conditional > .main");
    if (
        main.querySelectorAll(".hidden").length == main.querySelectorAll(".list-item").length
    ) {
        main.classList.add('hidden');
        title.style.borderWidth = '0px';
    } else {
        main.classList.remove('hidden');
        title.style.borderWidth = '3px';
    }
}


function addListItemEventListeners(listItems, boxMain) {

    for (let listItem of listItems) {
        const checkButton = listItem.querySelector('.check');
        const deleteButton = listItem.querySelector('.delete-line');
        checkButton.addEventListener('click', function () {
            listItem.classList.toggle('checked');
        });
        deleteButton.addEventListener('click', function () {
            if (listItem.classList.contains('checked')) {
                boxMain.removeChild(listItem);
            }
        });
    }
}



function newListItem(lineContent) {
    let listElement = `
    <div class="flexible list-item">
        <div class="check"></div>
        <div class="list-value">${lineContent}</div>
        <div class="delete-line"></div>
    </div>
    `;
    return listElement
}

function submissionTextArea() {
    let submissionTextArea = `
    <div class="submit-to-list flexible">
        <textarea class="submit-text-area" id=""></textarea>
        <button class="submit-button"></button>
    </div>
    `;
    return submissionTextArea;
}
