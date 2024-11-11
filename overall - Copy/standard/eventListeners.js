import {
    getClassName,
    getElement
} from './helper.js'


function submitToListEL(pillarTitle) {

    // get user submit
    let textArea = getElement('submit-text-area', pillarTitle);
    let userText = textArea.value.trim();
    if (!userText) return;


    let btnSelected = getElement('submit-list-selected', pillarTitle);
    if (!btnSelected) return;

    let conditionSelected = getElement('submit-condition-selected', pillarTitle);

    let buttonText = btnSelected.innerText;

    resetValues(textArea, btnSelected, conditionSelected);

    if (buttonText == 'New List') {
        newListRequest(pillar, userText);
        return;
    } else if (buttonText == 'Delete List') {
        deleteListRequest(pillar, userText);
        return;
    }

    let listElement = getElement(getClassName(buttonText), pillarTitle);

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

    // actions.collapselistItemArea(listElement);
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

    // Touch events
    listValueElement.addEventListener('touchstart', startTimer);
    listValueElement.addEventListener('touchend', clearTimer);
    listValueElement.addEventListener('touchcancel', clearTimer);

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

function resetValues(textArea, btnSelected, conditionSelected) {
    /* submethod of submitListener */
    textArea.value = '';
    btnSelected.classList.remove('submit-list-selected');
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
    submitToListEL
}





