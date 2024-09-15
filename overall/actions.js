import * as _ from './getThis.js';
import * as ch from './component_helper.js';

function collapseListConditionAreas(listElement) {
    /* 
    If the tag area is empty, collapse it
    */
    let area = listElement.querySelector(".list-condition-area");
    if (area.innerText.trim() == '') {
        area.style.padding = '0px';
    }
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

function removeConditionTag(listElement, listItem) {
    /* 
        once an item is deleted, check if that was the last instance of see if the attached condition was the last task with that condition, if so remove
    */

    // key - tag name, value - DOM Element Match
    let conditionMatches = _.getListConditionMatches(listElement);

    for (let tagName of _.getListConditionNames(listElement)) {
        if (listItem.classList.contains(tagName)) {
            if (_.getListItems(listElement, tagName).length == 0) {
                conditionMatches[tagName].remove();
            }
        }
    }
}

export {
    collapseListConditionAreas,
    collapselistItemArea,
    removeConditionTag
}