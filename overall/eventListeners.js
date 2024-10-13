import * as c from './component.js';
import * as _ from './getThis.js';
import * as actions from './actions.js'
import * as d from './dataManager.js'
import * as um from './upc/main.js'


function saveAllDataListener(isProduction = true) {
    if (isProduction) {
        document.querySelector(".saving").addEventListener('click', () => d.saveToDB());
    } else {
        // document.querySelector(".saving").addEventListener('click', () => d.printUserData());
        document.querySelector(".saving").addEventListener('click', () => um.printData());
    }

}

function pillarTitleListener(pillarElement) {
    _.getPillarTitle(pillarElement).addEventListener('dblclick', function () {
        collapsePillar(pillarElement);
    });
}

function collapsePillar(pillarElement) {
    let pillarTitle = pillarElement.querySelector('.pillar-title');
    let mainDiv = pillarElement.querySelector('.pillar-main');

    let startedCollapsed = mainDiv.classList.contains('hidden');

    if (startedCollapsed) {
        mainDiv.classList.remove('hidden');
        pillarTitle.style.borderWidth = '3px';
    } else {
        mainDiv.classList.add('hidden');
        pillarTitle.style.borderWidth = '0px';
    }

    d.collapsePillar(
        _.getPillarName(pillarElement),
        !startedCollapsed
    );
}

function todayCalendarBoxListener(pillarName, calendarName, calendar) {
    const todayBoxes = calendar.querySelectorAll('.today');
    todayBoxes.forEach(todayBox => {
        todayBox.addEventListener('click', function () {
            let [status, prevStatus] = toggleMultipleStatuses(todayBox, ['fulfilled', 'progressed']);
            d.updateCalendarFulfillment(pillarName, calendarName, todayBox.getAttribute('title'), status);

        });
    });

    const calendarBoxes = calendar.querySelectorAll('.day');
    calendarBoxes.forEach(box => {
        if (!Array.from(todayBoxes).includes(box)) {
            let timer;

            const startTimer = () => {
                timer = setTimeout(() => {
                    let [status, prevStatus] = toggleMultipleStatuses(box, ['fulfilled', 'progressed']);
                    d.updateCalendarFulfillment(pillarName, calendarName, box.getAttribute('title'), status);
                }, 1000); // 3000 milliseconds = 3 seconds
            };

            const clearTimer = () => {
                clearTimeout(timer);
            };

            // Mouse events
            box.addEventListener('mousedown', startTimer);
            box.addEventListener('mouseup', clearTimer);
            box.addEventListener('mouseleave', clearTimer);

            // Touch events
            box.addEventListener('touchstart', startTimer);
            box.addEventListener('touchend', clearTimer);
            box.addEventListener('touchcancel', clearTimer);
        }

    });
}

function toggleMultipleStatuses(element, statuses) {
    let updated = false;
    let status = '';
    let previous = '';

    for (let i = 0; i < statuses.length - 1; i++) {
        if (element.classList.contains(statuses[i])) {
            element.classList.remove(statuses[i]);
            element.classList.add(statuses[i + 1]);
            status = statuses[i + 1];
            previous = statuses[i];
            updated = true;
            break;
        }
    }
    if (!updated) {
        if (element.classList.contains(statuses[statuses.length - 1])) {
            // contains last class
            element.classList.remove(statuses[statuses.length - 1]);
            previous = statuses[statuses.length - 1];
        } else {
            // contains no classes
            element.classList.add(statuses[0]);
            status = statuses[0];
        }
    }


    return [status, previous];
}


function listItemListeners(listElement, listItem) {

    // CHECK BUTTON
    _.getCheckButton(listItem).addEventListener('click', function () {
        let [status, prevStatus] = toggleMultipleStatuses(listItem, ['checked', 'in-progress']);

        d.updateListItemStatus(
            _.getPillarName(listElement, false),
            _.getListTitleName(listElement),
            listItem,
            _.getListItemName(listItem),
            status, prevStatus
        );
    });


    // LIST VALUE
    let listValueElement = _.getListValue(listItem);

    let timer;
    const startTimer = () => {
        timer = setTimeout(() => {
            listItem.classList.toggle('list-item-selected');
        }, 500); // 3000 milliseconds = 3 seconds
    };

    const clearTimer = () => { clearTimeout(timer); };

    listValueElement.addEventListener('mousedown', startTimer);
    listValueElement.addEventListener('mouseup', clearTimer);
    listValueElement.addEventListener('mouseleave', clearTimer);

    // DELETE BUTTON
    _.getDeleteButton(listItem).addEventListener('click', function () {
        if (listItem.classList.contains('checked')) {
            d.deleteListItem(
                _.getPillarName(listElement, false),
                _.getListTitleName(listElement),
                listItem,
                _.getListItemName(listItem)
            );
            listItem.remove();
            actions.removeConditionTag(listElement, listItem);
            actions.collapselistItemArea(listElement);
            actions.collapseListConditionAreas(listElement);
        }
    });
}

function listConditionListener(listElement, tagElem) {
    tagElem.addEventListener('click', function () {
        // show/hide all list items associated with filter
        for (let listItem of _.getListItems(listElement, tagElem)) {
            listItem.classList.toggle('hidden');
        }
        tagElem.classList.toggle('list-condition-selected');
        // un/collapses the list area based on whether filters are selected
        actions.collapselistItemArea(listElement);

        d.selectListTag(
            _.getPillarName(listElement, false),
            _.getListTitleName(listElement),
            _.getTagName(tagElem)
        );
    });
}


function submitListener(pillar) {
    // assign listener
    _.getSubmitButton(pillar).addEventListener('click', function () {
        // get user submit
        let textArea = _.getTextArea(pillar);
        let userText = textArea.value.trim();
        if (!userText) return;

        let listSelected = _.getSubmitListSelected(pillar);
        if (!listSelected) return;

        let conditionSelected = _.getSubmitConditionSelected(pillar);

        let buttonText = listSelected.innerText;

        resetValues(textArea, listSelected, conditionSelected);

        if (buttonText == 'New List') {
            newListRequest(pillar, userText);
            return;
        } else if (buttonText == 'Delete List') {
            deleteListRequest(pillar, userText);
            return;
        }

        let listElement = _.getListElement(pillar, buttonText);

        // parse user submit
        // add submit to the list
        for (let line of userText.split('\n')) {

            if (conditionSelected) {
                conditionSelected = conditionSelected.innerText
            } else {
                // if a condition wasn't selected, check if one was written
                line = line.split('-');
                if (line.length > 1) {
                    conditionSelected = line.pop().trim();
                    line = line.join(' - ');
                } else {
                    conditionSelected = '';
                    line = line[0];
                }
            }

            listItemListeners(
                listElement,
                c.createListItem(listElement, {
                    'title': line,
                    'tag': conditionSelected
                }, Boolean(conditionSelected))
            );

            if (conditionSelected) {
                listConditionListener(
                    listElement,
                    c.createListCondition(listElement, conditionSelected)
                );

                submitConditionListener(
                    pillar,
                    c.createSubmitCondition(pillar, conditionSelected)
                );
            }
        }

        actions.collapselistItemArea(listElement);

    });

}

function movementListeners(genTag, direction) {
    genTag.addEventListener('click', function () {
        const selectedElements = document.querySelectorAll('.list-item-selected');

        selectedElements.forEach(element => {

            d.moveListItem(
                _.getPillarName(element, false),
                _.getListTitleName(element.parentNode.parentNode),
                element,
                direction
            );

            if (direction == 'To Top') {
                element.parentNode.insertBefore(element, element.parentNode.firstChild);
            } else if (direction == 'To Bottom') {
                element.parentNode.appendChild(element);
            }

            element.classList.remove('list-item-selected');
        });
    });
}

function newListRequest(pillar, userText) {
    /* submethod of submitListener */
    // create list
    let listName = userText.split('\n')[0].trim();
    if (c.isExistingList(pillar, listName)) return;

    let listElement = c.createList(pillar, listName);

    // add list to selectable buttons
    let listTag = c.createSubmitListTag(pillar, listName);
    submitListListener(pillar, listTag);
    actions.collapselistItemArea(listElement);
    actions.collapseListConditionAreas(listElement);
}

function resetValues(textArea, listSelected, conditionSelected) {
    /* submethod of submitListener */
    textArea.value = '';
    listSelected.classList.remove('submit-list-selected');
    if (conditionSelected) conditionSelected.classList.remove('submit-condition-selected');
}

function deleteListRequest(pillar, userText) {
    /* submethod of submitListener */
    // remove list element
    let listName = userText.split('\n')[0].trim();
    _.getListElement(pillar, listName).remove();

    // remove list tag
    _.getSubmitListTag(pillar, listName).remove();

    d.deleteList(_.getPillarName(pillar), listName);
}

function submitListListener(pillar, listTag) {
    listTag.addEventListener('click', function () {
        // only allows one category to be selected at a time
        for (let element of pillar.querySelectorAll(".submit-list-selected")) {
            if (listTag != element)
                element.classList.remove('submit-list-selected');
        }
        // de/select current category
        listTag.classList.toggle('submit-list-selected');
    });
}

function submitConditionListener(pillar, conditionTag) {
    if (!conditionTag) return;
    // only allows one category to be selected at a time
    for (let element of pillar.querySelectorAll(".submit-condition-selected")) {
        if (conditionTag != element)
            element.classList.remove('submit-condition-selected');
    }
    conditionTag.addEventListener('click', () => conditionTag.classList.toggle('submit-condition-selected'));
}



function getNextDayOfMonth(num) {
    const today = new Date(); // Get today's date

    // Get the next month
    const nextMonth = today.getMonth() + 1;

    // Create a date object for the first day of the next month
    const nextDay = new Date(today.getFullYear(), nextMonth, num);

    // If the next month goes into the next year, JavaScript handles that automatically
    return nextDay.toISOString().split('T')[0];
}

function getNextInterval(startDate, cadence) {
    const today = new Date(); // Get today's date
    const start = new Date(startDate); // Convert startDate to a Date object

    // If startDate is after today, return the first 14-day interval from startDate
    if (start > today) {
        start.setDate(start.getDate() + cadence); // Add 14 days to the startDate
        return start;
    }

    // Calculate the difference in days between startDate and today
    const diffInTime = today.getTime() - start.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    // Find how many full 14-day intervals have passed
    const intervalsPassed = Math.floor(diffInDays / cadence);

    // Calculate the next date in the 14-day interval after today
    const nextIntervalDate = new Date(start);
    nextIntervalDate.setDate(start.getDate() + (intervalsPassed + 1) * cadence);

    // Format the date as YYYY-MM-DD
    return nextIntervalDate.toISOString().split('T')[0];;
}

export {
    saveAllDataListener,
    pillarTitleListener,
    collapsePillar,
    todayCalendarBoxListener,
    toggleMultipleStatuses,
    listItemListeners,
    listConditionListener,
    submitListener,
    movementListeners,
    newListRequest,
    resetValues,
    deleteListRequest,
    submitListListener,
    submitConditionListener,
    getNextDayOfMonth,
    getNextInterval
}