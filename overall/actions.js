import * as _ from './data.js';

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

export {
    collapseListConditionAreas,
    collapselistItemArea
}