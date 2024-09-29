import { scrollCalendars } from './calendar.js'
import { getData } from './data/tempData.js'
import {
    getPillar,
    addList,
    getListItem,
    getTag,
    addSubmissionTitleTag
} from './components.js'
import {
    getClassName, appendAndRetrieve
} from './component_helper.js'
import { displayUpcomingEvents } from './upcoming.js'

let data = null;
main();
function main() {
    displayUpcomingEvents();
    starter();
    addEventListeners();

    for (let listArea of document.querySelectorAll(".wrapper")) collapseListArea(listArea);
    // scrollCalendars();
}

function starter() {

    data = getData();
    for (let [pillarName, pillarData] of Object.entries(data)) {
        if ([
            'Upkeep',
            'Entertainment'
        ].includes(pillarName)) {
            document.querySelector(".page").insertAdjacentHTML(
                'beforeend', getPillar(pillarName, pillarData)
            );
        }

    }
    // for (let pillar of data) {
    //     if ([
    //         'Upkeep',
    //         'Entertainment'
    //     ].includes(pillar.pillarName)) {
    //         document.querySelector(".page").insertAdjacentHTML(
    //             'beforeend', getPillar(pillar.pillarName, pillar.pillarData)
    //         );
    //     }

    // }
}

function addEventListeners() {
    const pillars = document.querySelectorAll('.pillar');

    pillars.forEach(pillar => {
        const listAreas = pillar.querySelectorAll('.wrapper');
        listAreas.forEach(listArea => {
            // get all tags in a list area && allow its listener to only effect that area
            const listTags = listArea.querySelectorAll('.tag');
            for (let listTag of listTags) addListTagEL(listArea, listTag);

        })

        const listItems = pillar.querySelectorAll('.list-item');
        for (let listItem of listItems) addListItemEL(listItem);

        const submissionTitles = pillar.querySelectorAll(".submission-title-area > .tag, .submission-general-area > .tag");
        for (let submissionTitle of submissionTitles) addSubmissionTitleEL(pillar, submissionTitle);

        const submissionTags = pillar.querySelectorAll(".submission-tag-area > .tag");
        for (let submissionTag of submissionTags) addSubmissionTagEL(submissionTag);

        const submitButton = pillar.querySelector('.submit-button');
        submitButton.addEventListener('click', () => submitItem(pillar));


    });

    // marking calendars
    const todayBoxes = document.querySelectorAll('.today');
    todayBoxes.forEach(todayBox => {
        todayBox.addEventListener('click', function () {
            todayBox.classList.toggle('fulfilled');
        });
    });
}

function addListItemEL(listItem) {
    const checkButton = listItem.querySelector('.check');
    const deleteButton = listItem.querySelector('.delete-line');

    checkButton.addEventListener('click', () => listItem.classList.toggle('checked'));
    deleteButton.addEventListener('click', function () {
        if (listItem.classList.contains('checked')) listItem.remove();
    });
}

function addListTagEL(listArea, tag) {
    tag.addEventListener('click', function () {
        // get all list items associated with filter
        for (let listItem of listArea.querySelectorAll('.' + getClassName(tag.innerText))) {
            listItem.classList.toggle('hidden');
        }
        tag.classList.toggle('list-tag-selected');
        // un/collapses the list area based on whether filters are selected
        collapseListArea(listArea);
    });
}

function collapseListArea(listArea) {
    let title = listArea.querySelector(".title");
    let listBoxMain = listArea.querySelector(".listbox-main");
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

function addSubmissionTitleEL(pillar, tag) {
    tag.addEventListener('click', function () {
        // only allows one category to be selected at a time
        for (let element of pillar.querySelectorAll(".list-selected")) {
            if (tag != element)
                element.classList.remove('list-selected');
        }
        // de/select current category
        tag.classList.toggle('list-selected');
    });
}

function addSubmissionTagEL(tag) {
    tag.addEventListener('click', () => tag.classList.toggle('list-tag-selected'));
}

function submitItem(pillar) {
    let submissionArea = pillar.querySelector(".submission-area");

    let submission = submissionArea.querySelector(".submit-text-area").value.trim();
    if (!submission) return;

    let listSelected = submissionArea.querySelector(".list-selected");
    if (!listSelected) return;

    let tagSelected = submissionArea.querySelector(".list-tag-selected");
    let listClass = getClassName(listSelected.innerText);

    // reset values
    submissionArea.querySelector(".submit-text-area").value = '';
    listSelected.classList.remove('list-selected');
    if (tagSelected) tagSelected.classList.remove('list-tag-selected');

    if (listClass == 'new-list') {
        /* 
        create a new list with text
        add list title to the submission bubbles
        add a new list as a category in data
        */
        submission = submission.split("\n")[0];
        addList(pillar, submission);
        let titleTag = addSubmissionTitleTag(submissionArea, submission);
        addSubmissionTitleEL(pillar, titleTag);
        saveNewList(pillar, submission);
        return;
    }

    // Loop through each textarea and print its name attribute
    let items = '';
    let itemCount = 0;
    submission = submission.split("\n");
    for (let line of submission) {
        if (!line) continue;

        let tag = '';
        let isHidden = true;

        if (tagSelected) {
            tag = tagSelected.innerText;
        } else {
            let parts = line.split('-');
            if (parts.length == 2) {
                line = parts[0];
                tag = parts[1].trim();
            }
        }
        let tagClass = getClassName(tag);

        if (tag) {
            isHidden = document.querySelectorAll('.' + tagClass).length == 0 || document.querySelectorAll('.' + tagClass + '.hidden').length > 0;

            // adding tag to tags
            if (!getTags(listSelected).includes(tagClass)) {
                let listArea = pillar.querySelector(".wrapper." + listClass);
                let listTagArea = listArea.querySelector(".list-tag-area");
                listTagArea.insertAdjacentHTML('beforeend', getTag(tag));
                addListTagEL(listArea, listTagArea.lastChild);

            }
            if (!getTags(submissionArea).includes(tagClass)) {
                let submissionTagArea = submissionArea.querySelector(".submission-tag-area");
                submissionTagArea.insertAdjacentHTML('beforeend', getTag(tag));
                addSubmissionTagEL(submissionTagArea.lastChild);
            }
        }

        // add line item
        items += getListItem({ 'title': line, 'tag': tag }, isHidden);
        itemCount++;
    }



    let listBoxMain = pillar.querySelector("." + listClass + " > .listbox > .listbox-main");
    listBoxMain.insertAdjacentHTML('beforeend', items);

    for (let listItem of getLastChildren(listBoxMain, itemCount)) {
        addListItemEL(listItem);
    }
}

function getTags(element) {
    const elements = element.querySelectorAll(`.list-tag-area > .tag`);
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

function saveNewList(pillar, title) {
    let pillarName = pillar.querySelector(".boxTitle").innerText;
    data[pillarName].lists[title] = [];
    console.log(data);
}
