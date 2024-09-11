import * as c from './component.js';
import * as _ from './data.js';
import * as actions from './actions.js'

function listItemListeners(listItem) {
    _.getCheckButton(listItem).addEventListener('click', () => listItem.classList.toggle('checked'));

    _.getDeleteButton(listItem).addEventListener('click', function () {
        if (listItem.classList.contains('checked')) listItem.remove();
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
        collapselistItemArea(listElement);
    });
}

function collapselistItemArea(listElement) {
    let listItemArea = _.getListItemArea(listElement);
    let listTitle = _.getListTitle(listElement);
    if (
        _.getListItems(listItemArea, 'hidden').length == _.getListItems(listItemArea).length
    ) {
        listItemArea.classList.add('hidden');
        listTitle.style.borderWidth = '0px';
    } else {
        listItemArea.classList.remove('hidden');
        listTitle.style.borderWidth = '3px';
    }
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

        let listElement = _.getListElement(pillar, listSelected.innerText);

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
                c.createListItem(listElement, line, conditionSelected, Boolean(conditionSelected))
            );

            if (conditionSelected) {
                console.log(11);
                listConditionListener(
                    listElement,
                    c.createListCondition(listElement, conditionSelected)
                );

                submitConditionListener(
                    c.createSubmitCondition(pillar, conditionSelected)
                );
            }
        }

        collapselistItemArea(listElement);

    });

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
    collapselistItemArea,
    submitListener,
    submitListListener,
    submitConditionListener
}