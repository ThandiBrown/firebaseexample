import { familyData } from './stats.js'
import { readDB, writeDB } from './data/talkToDatabase.js'




// function loadingSettings() {

//     // writeDB({'info':JSON.stringify({})});
//     readDB("", loadingPage);
// }

// function loadingPage(response) {
//     console.log("response")
//     console.log(response[0])

// }

function go(startPoint = 'd', element) {
    if (
        document.querySelector(".assign-btn").classList.contains('selected') || 
        element.parentNode.classList.contains('nav-sidebar')
    ) {
        return ;
    }
    clearPlayPage();
    let familyDataDB = familyData();

    if (startPoint in familyDataDB) {
        let boxes = '';
        if (familyDataDB[startPoint].parents.length > 0) {
            for (let parent of familyDataDB[startPoint].parents) {
                boxes += returnPersonBox(parent);
            }
        }
        document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);

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
        document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);

        boxes = '';
        if (familyDataDB[startPoint].children.length > 0) {
            for (let child of familyDataDB[startPoint].children) {
                boxes += returnPersonBox(child);
            }
        }
        document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);
    }
    addStyle();
    addEventListeners();
}

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

function addEventListeners() {
    for (let element of document.querySelectorAll('.person-box')) {
        element.addEventListener('click', (e) => go(e.target.innerText, e.target));
        element.addEventListener('click', (e) => updateSelection(e.target));
    }
}

function clearPlayPage() {
    document.querySelector(".play-page").innerHTML = '';
}

function addEventListeners2() {
    addEventListeners();
    addGenEL();
    addToWaitingAreaEventListener();
}

function addGenEL() {
    document.querySelector(".add-person-btn").addEventListener('click', toggleAddPersonVisibility);
    document.querySelector(".cancel").addEventListener('click', toggleAddPersonVisibility);
    
    document.querySelector(".assign-btn").addEventListener('click', (e) => selectionProcess(e.target));
        document.querySelector(".parent-option").addEventListener('click', function(e) {
            updateSelection(e.target, 'selected');
    });
    document.querySelector(".child-option").addEventListener('click', function(e) {
        updateSelection(e.target, 'selected');
    });
}

function addToWaitingAreaEventListener() {
    document.querySelector(".submit").addEventListener('click', function () {
        let personInfo = document.querySelector(".person-input").innerText.trim();
        if (personInfo != '') {
            addPersonToWaitingArea(personInfo);
            toggleAddPersonVisibility();
        }
    });
}

function toggleAddPersonVisibility() {
    document.querySelector(".add-person").classList.toggle('hidden');
}

function addPersonToWaitingArea(personInfo) {
    document.querySelector(".add-person-btn").insertAdjacentHTML('afterend', returnPersonBox(personInfo));
}

function selectionProcess(assignButton) {
    document.querySelector(".relation-matching").classList.toggle('hidden');
    assignButton.classList.toggle('selected');
    if (!assignButton.classList.contains('selected')) {
        for (let selectElement of document.querySelectorAll(".selected")) {
            selectElement.classList.remove('selected');
        }
        for (let selectElement of document.querySelectorAll(".person-box-selected")) {
            selectElement.classList.remove('person-box-selected');
        }
    }
}

function updateSelection(element, selectionClass='person-box-selected') {
    if (!document.querySelector(".assign-btn").classList.contains('selected')) return;
    let selection = document.querySelectorAll("." + selectionClass);
    element.classList.add(selectionClass);

    for (let selectedElement of selection) {
        if (fromSameSection(element, selectedElement)) {
            selectedElement.classList.remove(selectionClass);
            break;
        }
    }
    
    if (selectionClass=='person-box-selected') {
        let inTree = document.querySelector(".row-style ." + selectionClass);
        let inWaiting = document.querySelector(".nav-sidebar ." + selectionClass);
        updateRelationMatching(
            inTree ? inTree.innerText : '',
            inWaiting ? inWaiting.innerText : ''
        );
    }
    
}

function fromSameSection(pickedElement, selectedElement) {
    for (let section of ['nav-sidebar', 'row-style', 'relation-matching']) {
        if (pickedElement.parentNode.classList.contains(section) && 
        selectedElement.parentNode.classList.contains(section)) {
            return true;
        }
    }
    return false;
}

function updateRelationMatching(inTreeName = 'Thandi', inWaitingName = 'Wayne') {
    document.querySelector(".relation-matching p").innerText = inTreeName + ' is the __________ of ' + inWaitingName;
}

addEventListeners2();
// updateRelationMatching();

// go();