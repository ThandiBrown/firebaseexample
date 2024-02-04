import {
    toggleAssignmentFeature,
    oneSelectionPerGroup,
    executeAssignment
} from './assignment.js'
import {
    addStyle,
    returnDisplayRow,
    returnPersonBox,
    personBoxEventListeners
} from './components.js'
import {
    clearPlayPage,
    toggleNewPersonPopUp,
    addPersonToWaitingArea
} from './util.js'

loadPage();

function loadPage() {
    addToWaitingArea();
    displayTreeView('d');
    setUpEventListeners();
}


function addToWaitingArea() {
    for (let person of JSON.parse(localStorage.getItem("familyDataInWaiting"))) {
        addPersonToWaitingArea(person);
    }
}

function setUpEventListeners() {
    // 'Assign' button in waiting area
    document.querySelector(".assign-btn").addEventListener('click', (e) => toggleAssignmentFeature(e.target));
    // " + " button in waiting area
    document.querySelector(".add-person-btn").addEventListener('click', toggleNewPersonPopUp);

    // "submit" button in new person pop-up
    document.querySelector(".submit").addEventListener('click', function () {
        let personInfo = document.querySelector(".person-input").innerText.trim();
        if (personInfo != '') {
            addPersonToWaitingArea(personInfo);
            toggleNewPersonPopUp();
        }
    });
    // "cancel" button in new person pop-up
    document.querySelector(".cancel").addEventListener('click', toggleNewPersonPopUp);

    // 'Parent, Child and Submit' buttons in relation section
    document.querySelector(".parent-option").addEventListener('click', (e) => oneSelectionPerGroup(e.target, 'selected'));
    document.querySelector(".child-option").addEventListener('click', (e) => oneSelectionPerGroup(e.target, 'selected'));
    document.querySelector(".submit-relation").addEventListener('click', executeAssignment);
}


function displayTreeView(startPoint = 'd', element = null) {
    if (
        document.querySelector(".assign-btn").classList.contains('selected') ||
        (element != null && element.parentNode.classList.contains('nav-sidebar'))
    ) {
        return;
    }
    clearPlayPage();
    // let familyDataDB = familyData1();
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
    personBoxEventListeners();

}

export {
    loadPage,
    addToWaitingArea,
    setUpEventListeners,
    displayTreeView
}