import { formCalendar } from './calendar.js'
import {
    taskCategories, conditionalTopics, getClassName,
    getListItem, getConditionalListItem
} from './listCategories.js'
import { displayUpcomingEvents } from './upcoming.js'


main();
function main() {
    // displayUpcomingEvents();
    // formCalendar('eating');
    // formCalendar('exercise');


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
    const conditionalBubbles = document.querySelectorAll('.conditional-topics > .bubble');
    const categoryBubbles = document.querySelectorAll('.category-names > .bubble');


    boxSections.forEach(boxSection => {

        const boxMain = boxSection.querySelector('.boxMain');
        const textarea = boxSection.querySelector('.submit-text-area');
        const submitButton = boxSection.querySelector('.submit-button');
        const listItems = boxSection.querySelectorAll('.list-item');

        if (boxMain && textarea && submitButton) {
            // boxSection.innerHTML += submissionTextArea();

            submitButton.addEventListener('click', () => submitItem(textarea, listItems));

        }
        addListItemEventListeners(listItems);

    });

    todayBoxes.forEach(todayBox => {
        todayBox.addEventListener('click', function () {
            todayBox.classList.toggle('fulfilled');
        });
    });

    for (let calendar of calendars) {
        calendar.scrollTop = calendar.scrollHeight;
    }

    conditionalBubbles.forEach(bubble => {
        bubble.addEventListener('click', function () {
            for (let listItem of document.querySelectorAll('.' + getClassName(bubble.innerText))) {
                listItem.classList.toggle('hidden');
            }
            bubble.classList.toggle('filter-selected');
            toggleConditional();
        });
    });
    categoryBubbles.forEach(bubble => {
        bubble.addEventListener('click', function () {
            for (let element of document.querySelectorAll(".category-selected")) {
                if (bubble != element)
                    element.classList.remove('category-selected');
            }
            bubble.classList.toggle('category-selected');
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


function addListItemEventListeners(listItems) {

    for (let listItem of listItems) {
        const checkButton = listItem.querySelector('.check');
        const deleteButton = listItem.querySelector('.delete-line');
        checkButton.addEventListener('click', function () {
            listItem.classList.toggle('checked');
        });
        deleteButton.addEventListener('click', function () {
            if (listItem.classList.contains('checked')) {
                listItem.remove();
            }
        });
    }
}

function submitItem(textarea, listItems) {
    let categorySelected = document.querySelector(".category-selected");
    if (!categorySelected) categorySelected = 'backlog';

    let category = getClassName(categorySelected.innerText);
    let listCategoryMainSection = document.querySelector("." + category + " > .main");

    let conditionalTopics = document.querySelector(".conditional-topics");

    // Loop through each textarea and print its name attribute
    let submission = textarea.value.trim();
    if (!submission) return;

    let items = '';
    submission = submission.split("\n");
    for (let line of submission) {
        if (!line) continue;
        if (category == 'conditional') {
            let parts = line.split('-');
            if (parts.length == 2) {
                line = parts[0];
                let tag = getClassName(parts[1].trim());
                // if new conditional
                if (!getTags().includes(tag)) {
                    conditionalTopics.insertAdjacentHTML('beforeend', `<div class="flexible bubble">${tag}</div>`);
                    addConditionalBubbleEventListener(conditionalTopics.lastChild);
                } else {
                    console.log('seen it:' + tag);
                }
                items += getConditionalListItem(line, tag);
            }

        } else {
            items += getListItem(line);
        }
    }

    listCategoryMainSection.innerHTML += items;

    // textarea.value = '';
    // addListItemEventListeners(listItems);

}

function addConditionalBubbleEventListener(bubble) {
    bubble.addEventListener('click', function () {
        for (let listItem of document.querySelectorAll('.' + getClassName(bubble.innerText))) {
            listItem.classList.toggle('hidden');
        }
        bubble.classList.toggle('filter-selected');
        toggleConditional();
    });
}

function getTags() {
    const elements = document.querySelectorAll(`.conditional-topics > .bubble`);

    const innerTextSet = Array.from(elements).map(element => getClassName(element.innerText.trim()));

    return innerTextSet;
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
