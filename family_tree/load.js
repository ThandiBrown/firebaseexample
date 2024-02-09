
import {
    submitNewPerson,
    toggleNewPersonPopUp,
    addPersonToWaitingArea
} from './newPerson.js'
import {
    toggleAssignmentFeature,
    oneSelectionPerGroup,
    executeAssignment
} from './assignment.js'
import {
    addStyle,
    returnDisplayRow,
    returnPersonBox
} from './components.js'
import {
    clearPlayPage
} from './util.js'

loadPage();

function loadPage() {
    setUpWaitingArea();
    displayTreeView('Dorothy Mae Jackson Brown');
    setUpEventListeners();
}


function setUpWaitingArea() {
    for (let person of JSON.parse(localStorage.getItem("familyDataInWaiting"))) {
        addPersonToWaitingArea(person);
    }
    personBoxELs('.nav-sidebar .person-box');
}

function setUpEventListeners() {
    // 'Assign' button in waiting area
    document.querySelector(".assign-btn").addEventListener('click', (e) => toggleAssignmentFeature(e.target, true));
    // " + " button in waiting area
    document.querySelector(".add-person-btn").addEventListener('click', toggleNewPersonPopUp);

    // "submit" button in new person pop-up
    document.querySelector(".submit").addEventListener('click', submitNewPerson);
    // "cancel" button in new person pop-up
    document.querySelector(".cancel").addEventListener('click', toggleNewPersonPopUp);

    // 'Parent, Child and Submit' buttons in relation section
    document.querySelector(".parent-option").addEventListener('click', (e) => oneSelectionPerGroup(e.target, 'selected'));
    document.querySelector(".child-option").addEventListener('click', (e) => oneSelectionPerGroup(e.target, 'selected'));
    document.querySelector(".submit-relation").addEventListener('click', executeAssignment);
}


function displayTreeView(startPoint = 'd', element = null, assignmentAllowed=false) {
    console.log(33);
    console.log(assignmentAllowed);
    console.log((!assignmentAllowed && document.querySelector(".assign-btn").classList.contains('selected')));
    console.log((element != null && element.parentNode.classList.contains('nav-sidebar')));
    if (
        (!assignmentAllowed && document.querySelector(".assign-btn").classList.contains('selected')) ||
        (element != null && element.parentNode.classList.contains('nav-sidebar'))
    ) {
        console.log('Assignment selection is on, so do not update display');
        return;
    }
    clearPlayPage();

    let familyDataDB = JSON.parse(localStorage.getItem("familyData"));


    if (startPoint in familyDataDB) {
        let boxes = '';
        if (familyDataDB[startPoint].parents.length > 0) {
            for (let parent of familyDataDB[startPoint].parents) {
                boxes += returnPersonBox(parent);
            }
        }

        document.querySelector(".relation-matching").insertAdjacentHTML('beforebegin', returnDisplayRow(boxes));

        boxes = returnPersonBox(startPoint, true);
        if (familyDataDB[startPoint]) {
            // siblings
            if (familyDataDB[startPoint].parents.length > 0) {

                for (let parent of familyDataDB[startPoint].parents) {
                    for (let sibling of familyDataDB[parent].children) {
                        if (sibling == startPoint) continue;
                        boxes += returnPersonBox(sibling);
                    }
                }
            }
        }
        document.querySelector(".relation-matching").insertAdjacentHTML('beforebegin', returnDisplayRow(boxes));

        boxes = '';
        if (familyDataDB[startPoint].children.length > 0) {
            for (let child of familyDataDB[startPoint].children) {
                boxes += returnPersonBox(child);
            }
        }
        document.querySelector(".relation-matching").insertAdjacentHTML('beforebegin', returnDisplayRow(boxes));
    }

    addStyle();
    personBoxELs('.row-style .person-box');
}

function personBoxELs(boxType) {
    for (let element of document.querySelectorAll(boxType)) {
        element.addEventListener('click', (e) => displayTreeView(e.target.innerText, e.target));
        element.addEventListener('click', (e) => oneSelectionPerGroup(e.target));
    }
}

export {
    loadPage,
    setUpWaitingArea,
    setUpEventListeners,
    displayTreeView
}