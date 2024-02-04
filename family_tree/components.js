import {
    oneSelectionPerGroup
} from './assignment.js'

import {
    displayTreeView
} from './load.js'

function addStyle() {
    for (let rowElem of document.querySelectorAll(".row-style")) {
        let listOfPersonBoxes = [...rowElem.querySelectorAll(".person-box")];

        if (listOfPersonBoxes.length > 0) {
            listOfPersonBoxes[0].classList.add('first-listed');
            listOfPersonBoxes[listOfPersonBoxes.length - 1].classList.add('last-listed');
        }
    }
}

function returnDisplayRow(boxes) {
    let emptyClass = '';
    if (!boxes) emptyClass = ' empty-row';
    return '<div class="flex row-style' + emptyClass + '">' + boxes + '</div>';
}

function returnPersonBox(personInfo, highlight = false) {
    let highlightClass = '';
    if (highlight) highlightClass = ' current-person';
    return '<div class="person-box' + highlightClass + '">' + personInfo + '</div>';
}

function personBoxEventListeners() {
    for (let element of document.querySelectorAll('.person-box')) {
        element.addEventListener('click', (e) => displayTreeView(e.target.innerText, e.target));
        element.addEventListener('click', (e) => oneSelectionPerGroup(e.target));
    }
}

export {
    addStyle,
    returnDisplayRow,
    returnPersonBox,
    personBoxEventListeners
}