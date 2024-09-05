import { getCalendar, scrollCalendars } from './calendar.js'
import { getData } from './data/tempData.js'
import {
    getPillar,
    getListItem,
    getBubble
} from './components.js'
import {
    organizeUpkeepTasks,
    getClassName,
    printIfTrue
} from './listBoxes.js'
import { displayUpcomingEvents } from './upcoming.js'


main();
function main() {
    // displayUpcomingEvents();

    starter();

    addEventListeners();
    // collapseConditionalList();
    // scrollCalendars();
}

function starter() {
    // let data = {};
    // data.filters = ['car', 'work hours', 'Chinue\'s House'];
    // data.listTitles = ['Time Sensitive', 'Conditional', 'Backlog'];
    // data.listData = organizeUpkeepTasks();
    // data.calendars = ['exercise', 'eating'];

    // document.querySelector(".page").insertAdjacentHTML(
    //     'afterbegin', getPillar('Upkeep', data)
    // );
    // document.querySelector(".page").insertAdjacentHTML(
    //     'afterbegin', getPillar('Entertainment', {})
    // );

    let data = getData();
    for (let [pillarName, pillarData] of Object.entries(data)) {
        document.querySelector(".page").insertAdjacentHTML(
            'afterbegin', getPillar(pillarName, pillarData)
        );
    }
}







function addEventListeners() {
    // Select all textarea elements
    const pillars = document.querySelectorAll('.pillar');

    const todayBoxes = document.querySelectorAll('.today');

    const listFilters = document.querySelectorAll('.wrapper > .condition-filters > .bubble');
    const submissionFilters = document.querySelectorAll('.submission-area > .condition-filters > .bubble');

    const listTitles = document.querySelectorAll('.list-titles > .bubble');

    // text submission for any boxes
    pillars.forEach(pillar => {
        const textarea = pillar.querySelector('.submit-text-area');
        const submitButton = pillar.querySelector('.submit-button');
        const listItems = pillar.querySelectorAll('.list-item');

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
    submissionFilters.forEach(bubble => { addSubmissionFilterEventListener(bubble); });

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

    let listFilters = document.querySelector(".wrapper > .condition-filters");
    let submissionFilterArea = document.querySelector(".submission-area > .condition-filters");

    let submissionFilter = printIfTrue(
        () => submissionFilterArea.querySelector(".filter-selected"), submissionFilterArea, []
    );

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
                    listFilters.insertAdjacentHTML('beforeend', getBubble(tag));
                    submissionFilterArea.insertAdjacentHTML('beforeend', getBubble(tag));
                    addFilterEventListener(listFilters.lastChild);
                    addSubmissionFilterEventListener(submissionFilterArea.lastChild);
                }
                let isHidden = document.querySelectorAll('.' + tag).length == 0 || document.querySelectorAll('.' + tag + '.hidden').length > 0;
                // add line item
                items += getListItem(line, tag);
                itemCount++;
            }

        } else {
            items += getListItem(line);
            itemCount++;
        }
    }

    textarea.value = '';

    listBoxMain.insertAdjacentHTML('beforeend', items);

    for (let listItem of getLastChildren(listBoxMain, itemCount)) {
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

function addSubmissionFilterEventListener(bubble) {
    bubble.addEventListener('click', () => bubble.classList.toggle('filter-selected'));
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
    const elements = document.querySelectorAll(`.condition-filters > .bubble`);
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


