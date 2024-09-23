import * as c from './component.js';
import * as _ from './getThis.js';
import * as actions from './actions.js'
import * as d from './dataManager.js'


function saveAllDataListener() {
    document.querySelector(".saving").addEventListener('click', () => d.saveToDB());
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

    console.log("status"); console.log(status);
    console.log("previous"); console.log(previous);
    return [status, previous];
}


function listItemListeners(listElement, listItem) {

    _.getCheckButton(listItem).addEventListener('click', function () {
        let [status, prevStatus] = toggleMultipleStatuses(listItem, ['checked', 'in-progress']);
        console.log("status"); console.log(status);
        console.log("prevStatus"); console.log(prevStatus);

        d.updateListItemStatus(
            _.getPillarName(listElement, 'listElement'),
            _.getListTitleName(listElement),
            listItem,
            _.getListItemName(listItem),
            status, prevStatus
        );
    });

    _.getDeleteButton(listItem).addEventListener('click', function () {
        if (listItem.classList.contains('checked')) {
            d.deleteListItem(
                _.getPillarName(listElement, 'listElement'),
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
            _.getPillarName(listElement, 'listElement'),
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



export {
    listItemListeners,
    listConditionListener,
    submitListener,
    submitListListener,
    submitConditionListener,
    saveAllDataListener,
    todayCalendarBoxListener
}