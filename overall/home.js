import { getData } from './tempData.js'
import * as actions from './actions.js'
import * as e from './eventListeners.js'
import * as c from './component.js'

/* 
NEXT:
make the collapse function
add the submit area
*/
loadPage();
function loadPage() {
    for (let [pillarName, pillarData] of Object.entries(getData())) {
        let pillarElement = c.createPillar(pillarName);
        let allLists = [];
        let allPillarConditions = [];

        if (pillarData.lists) {
            for (let [listName, listItems] of Object.entries(pillarData.lists)) {
                let listElement = c.createList(pillarElement, listName);

                let tags = [];
                for (let listItem of listItems) {
                    let listItemElement = c.createListItem(listElement, listItem.title, listItem.tag);
                    e.listItemListeners(listItemElement);
                    if (listItem.tag && !tags.includes(listItem.tag)) tags.push(listItem.tag);
                }

                for (let tagName of tags) {
                    let tagElement = c.createListCondition(listElement, tagName);
                    e.listConditionListener(listElement, tagElement);
                    allPillarConditions.push(tagName);
                }

                allLists.push(listName);
                e.collapselistItemArea(listElement);
                actions.collapseListConditionAreas(listElement);
            }
        }

        let submitArea = c.createSubmitArea(pillarElement);

        for (let listName of allLists) {
            let listTag = c.createSubmitList(submitArea, listName);
            e.submitListListener(pillarElement, listTag);
        }

        for (let genName of ['New List', 'Delete List']) {
            let genTag = c.createSubmitGeneral(submitArea, genName);
            e.submitListListener(pillarElement, genTag);
        }

        for (let condition of allPillarConditions) {
            let conditionTag = c.createSubmitCondition(submitArea, condition);
            e.submitConditionListener(pillarElement, conditionTag);
        }

        e.submitListener(pillarElement);

    }
}

