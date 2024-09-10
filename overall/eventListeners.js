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
        // parse user submit
        // add submit to the list
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

function submitConditionListener(conditionTag) {
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