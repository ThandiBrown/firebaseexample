import { formCalendar, scrollCalendars } from './calendar.js'
import {
    taskCategories, getClassName,
    getListItem, getConditionalListItem
} from './listBoxes.js'
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
    collapseConditionalList();
    scrollCalendars();
}

function addEventListeners() {
    // Select all textarea elements
    const boxSections = document.querySelectorAll('.boxSection');
    
    const todayBoxes = document.querySelectorAll('.today');

    const listFilters = document.querySelectorAll('.wrapper > .list-filters > .bubble');
    const submissionFilters = document.querySelectorAll('.submission-area > .list-filters > .bubble');
    
    const listTitles = document.querySelectorAll('.list-titles > .bubble');

    // text submission for any boxes
    boxSections.forEach(boxSection => {
        const textarea = boxSection.querySelector('.submit-text-area');
        const submitButton = boxSection.querySelector('.submit-button');
        const listItems = boxSection.querySelectorAll('.list-item');

        if (textarea && submitButton && listItems) {
            submitButton.addEventListener('click', () => submitItem(textarea));
            for (let listItem of listItems) addListItemEventListener(listItem);
        }
    });

    // marking calendars
    todayBoxes.forEach(todayBox => {
        todayBox.addEventListener('click', function () {
            todayBox.classList.toggle('fulfilled');
        });
    });

    listFilters.forEach(bubble => { addFilterEventListener(bubble); });
    submissionFilters.forEach(bubble => {
        bubble.addEventListener('click', () => bubble.classList.toggle('filter-selected'));
    });

    listTitles.forEach(bubble => {
        bubble.addEventListener('click', function () {
            // only allows one category to be selected at a time
            for (let element of document.querySelectorAll(".category-selected")) {
                if (bubble != element)
                    element.classList.remove('category-selected');
            }
            // de/select current category
            bubble.classList.toggle('category-selected');
        });
    });

}

function collapseConditionalList() {
    let title = document.querySelector(".conditional > .title");
    let listBoxMain = document.querySelector(".conditional > .listBoxMain");
    if (
        listBoxMain.querySelectorAll(".hidden").length == listBoxMain.querySelectorAll(".list-item").length
    ) {
        listBoxMain.classList.add('hidden');
        title.style.borderWidth = '0px';
    } else {
        listBoxMain.classList.remove('hidden');
        title.style.borderWidth = '3px';
    }
}

function submitItem(textarea) {
    let submission = textarea.value.trim();
    if (!submission) return;
    
    let categorySelected = document.querySelector(".category-selected");
    if (!categorySelected) return;

    let category = getClassName(categorySelected.innerText);
    let listBoxMain = document.querySelector("." + category + " > .listBoxMain");

    let listFilters = document.querySelector(".wrapper > .list-filters");
    let submissionFilter = document.querySelector(".submission-area > .list-filters > .filter-selected");
    console.log(submissionFilter);

    // Loop through each textarea and print its name attribute
    let items = '';
    let itemCount = 0;
    submission = submission.split("\n");
    for (let line of submission) {
        if (!line) continue;
        if (category == 'conditional') {
            let parts = line.split('-');
            let tag = '';
            if (submissionFilter) {
                tag = getClassName(submissionFilter.innerText);
            } else if (parts.length == 2) {
                line = parts[0];
                tag = getClassName(parts[1].trim());
            }
            if (tag) {
                // if new conditional
                if (!getTags().includes(tag)) {
                    listFilters.insertAdjacentHTML('beforeend', `<div class="flexible bubble">${tag}</div>`);
                    addFilterEventListener(listFilters.lastChild);
                }
                let isHidden = document.querySelectorAll('.' + tag).length == 0 || document.querySelectorAll('.' + tag + '.hidden').length > 0;
                // add line item
                items += getConditionalListItem(
                    line, tag, isHidden
                );
                itemCount++;
            }

        } else {
            items += getListItem(line);
            itemCount++;
        }
    }

    textarea.value = '';

    listBoxMain.insertAdjacentHTML('beforeend', items);

    for (let listItem of getLastChildren(listBoxMain)) {
        addListItemEventListener(listItem);
    }
}

function addListItemEventListener(listItem) {
    const checkButton = listItem.querySelector('.check');
    const deleteButton = listItem.querySelector('.delete-line');

    checkButton.addEventListener('click', () => listItem.classList.toggle('checked'));
    deleteButton.addEventListener('click', function () {
        if (listItem.classList.contains('checked')) listItem.remove();
    });
}

function addFilterEventListener(bubble) {
    bubble.addEventListener('click', function () {
        // display all list items associated with filter
        for (let listItem of document.querySelectorAll('.' + getClassName(bubble.innerText))) {
            listItem.classList.toggle('hidden');
        }
        bubble.classList.toggle('filter-selected');
        // un/collapses the conditional list based on whether filters are selected
        collapseConditionalList();
    });
}

function getTags() {
    const elements = document.querySelectorAll(`.list-filters > .bubble`);
    const innerTextSet = Array.from(elements).map(element => getClassName(element.innerText.trim()));
    return innerTextSet;
}


function getLastChildren(parentElement, num) {
    // Ensure the parent element has children
    if (!parentElement || parentElement.children.length === 0) {
        return [];
    }

    // Get the list of children
    const children = parentElement.children;

    // Calculate the start index for the last three children
    const startIndex = Math.max(children.length - num, 0);

    // Use slice to get the last three children
    return Array.from(children).slice(startIndex);
}