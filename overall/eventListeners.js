import * as c from './component.js';
import * as _ from './data.js';
import * as actions from './actions.js'

function listItemListeners(listElement, listItem) {
    _.getCheckButton(listItem).addEventListener('click', () => listItem.classList.toggle('checked'));

    _.getDeleteButton(listItem).addEventListener('click', function () {
        if (listItem.classList.contains('checked')) {
            listItem.remove();
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
        console.log("pillar");
        console.log(pillar);
        console.log("listElement");
        console.log(listElement);

        /* 
        NEXT: start writing logic for general buttons
        consider creating an object on a new JavaScript page
        That can be written to for new data entered, such as a new list being stored
        or a new list item
        consider breaking this method down into new functions ---> or starting a new function now with this change
        */

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
                c.createListItem(listElement, line, conditionSelected, Boolean(conditionSelected))
            );

            if (conditionSelected) {
                listConditionListener(
                    listElement,
                    c.createListCondition(listElement, conditionSelected)
                );

                console.log("pillar");
                console.log(pillar);
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
    submitConditionListener
}