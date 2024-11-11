import * as a from './actions.js'
import * as el from './eventListeners.js'
import {
    getClassName,
    getElement
} from './helper.js'

let pillarElement;
let pillarData;

function main(pillarTitle, pillarObj) {
    pillarData = pillarObj;
    displayPillarElement(pillarTitle);

    if (pillarData.lists) {
        displayListArea(pillarTitle);
        displaySubmitArea(pillarTitle);

        for (let [listTitle, listData] of Object.entries(pillarData.lists)) {
            displayList(pillarTitle, listTitle);
            displaySubmitListTag(pillarTitle, listTitle);

            for (let item of listData.items) {
                if (item.tag) {
                    displayListItem(pillarTitle, listTitle, item.title, `hidden ${getClassName(item.tag)}`);
                    displayListConditionTag(pillarTitle, listTitle, item.tag);
                    displaySubmitConditionTag(pillarTitle, item.tag);
                } else {
                    displayListItem(pillarTitle, listTitle, item.title);
                }
            }
        }
    }

}

function displayPillarElement(title) {
    pillarElement = document.createElement('div');
    pillarElement.classList = `flexible pillar ${getClassName(title)}`;
    pillarElement.insertAdjacentHTML('beforeend', `
        <h1 class="pillar-title">${title}</h1>
        <div class="flexible pillar-main">
        </div>
    `);

    document.querySelector(".page").appendChild(pillarElement);
}

function displayListArea(pillarTitle) {

    let listAreaString = `
    <div class="flexible list-area">
    </div>
    `;
    document.querySelector(`.${getClassName(pillarTitle)} .pillar-main`).insertAdjacentHTML('beforeend', listAreaString);

}

function displaySubmitArea(pillarTitle) {
    let pillarTitleAsClass = getClassName(pillarTitle)
    let submitAreaString = `
    <div class="flexible submit-area">
        <div class="submit-input flexible">
            <textarea class="submit-text-area"></textarea>
            <button class="submit-button"></button>
        </div>
        <div class="flexible submit-list-area">
        </div>
        <div class="flexible submit-general-area">
            <div class="flexible submit-general-tag">New List</div>
            
            <div class="flexible submit-general-tag">Delete List</div>
            
            <div class="flexible submit-general-tag">To Top</div>
            
            <div class="flexible submit-general-tag">To Bottom</div>
        </div>
        <div class="flexible submit-condition-area">
        </div>
    </div>
    `;
    document.querySelector(`.${pillarTitleAsClass} .pillar-main`).insertAdjacentHTML('beforeend', submitAreaString);

    document.querySelector(`.${pillarTitleAsClass} .submit-button`).addEventListener('click', () => el.submitToListEL(pillarTitleAsClass));
}

function displaySubmitListTag(pillarTitle, listTitle) {
    let listTagString = `
    <div class="flexible submit-list-tag">${listTitle}</div>
    `;

    document.querySelector(`.${getClassName(pillarTitle)} .submit-list-area`).insertAdjacentHTML('beforeend', listTagString);
}

function displaySubmitConditionTag(pillarTitle, tagTitle) {
    let conditionString = `
    <div class="flexible submit-condition-tag">${tagTitle}</div>
    `;

    document.querySelector(`.${getClassName(pillarTitle)} .submit-condition-area`).insertAdjacentHTML('beforeend', conditionString);
}

function displayList(pillarTitle, listTitle) {
    let listString = `
    <div class="flexible wrapper ${getClassName(listTitle)}">
        <div class="list">
            <div class="list-title" style="border-width: 3px;">${listTitle}</div>
            <div class="list-item-area scrolling">
                
            </div>
        </div>
        <div class="flexible list-condition-area" style="padding: 0px;">
        </div>
    </div>
    `;

    document.querySelector(`.${getClassName(pillarTitle)} .list-area`).insertAdjacentHTML('beforeend', listString);
}

function displayListConditionTag(pillarTitle, listTitle, tagTitle) {
    let pillarAsClass = getClassName(pillarTitle);
    let listAsClass = getClassName(listTitle);
    let tagAsClass = getClassName(tagTitle);

    let conditionString = `
    <div class="flexible list-condition-tag">${tagTitle}</div>
    `;

    let conditionArea = getElement('list-condition-area', `${pillarAsClass} .${listAsClass}`);
    conditionArea.insertAdjacentHTML('beforeend', conditionString);
    let tag = conditionArea.querySelector(`.list-condition-tag:last-child`);

    tag.addEventListener('click', function () {
        tag.classList.toggle('list-condition-selected');

        let associatedListItems = getElement(tagAsClass, `${pillarAsClass} .${listAsClass}`, true);

        for (let listItem of associatedListItems) {
            listItem.classList.toggle('hidden');
        }
    });


}

function displayListItem(pillarTitle, listTitle, itemTitle, tagTitle = "") {
    let pillarAsClass = getClassName(pillarTitle);
    let listAsClass = getClassName(listTitle);
    let listItemString = `
    <div class="flexible list-item ${tagTitle}">
        <div class="check"></div>
        <div class="flexible list-value">${itemTitle}</div>
        <div class="delete-line"></div>
    </div>
    `;

    let itemArea = getElement('list-item-area', `${pillarAsClass} .${listAsClass}`);
    itemArea.insertAdjacentHTML('beforeend', listItemString);

    let listItem = itemArea.querySelector(`.list-item:last-child`);

    listItem.querySelector(`.check`).addEventListener('click',
        () => a.toggleMultipleStatuses(listItem, ['checked', 'in-progress', 'movable'])
    );

    listItem.querySelector(`.delete-line`).addEventListener('click',
        () => deleteListItem(listItem)
    );

}

function deleteListItem(listItem) {
    if (listItem.classList.contains('checked')) {
        listItem.remove();
    }
}




export {
    main,
    displayPillarElement,
    displayListArea,
    displaySubmitArea,
    displaySubmitListTag,
    displaySubmitConditionTag,
    displayList,
    displayListConditionTag,
    displayListItem
}