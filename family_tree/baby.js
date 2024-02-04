import { familyData1 } from './stats.js'
import { readDB, writeDB } from './data/talkToDatabase.js'




// function loadingSettings() {

//     // writeDB({'info':JSON.stringify({})});
//     readDB("", loadingPage);
// }

// function loadingPage(response) {
//     console.log("response")
//     console.log(response[0])

// }

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
        element.addEventListener('click', (e) => displayTreeView(e.target.innerText, e.target));
        element.addEventListener('click', (e) => updateSelection(e.target));
    }
}

function clearPlayPage() {
    for (let element of document.querySelectorAll(".row-style")) {
        element.remove();
    }
}

function addEventListeners2() {
    // addEventListeners();
    addGenEL();
    addToWaitingAreaEventListener();
}

function addGenEL() {
    document.querySelector(".add-person-btn").addEventListener('click', toggleAddPersonVisibility);
    document.querySelector(".cancel").addEventListener('click', toggleAddPersonVisibility);

    document.querySelector(".assign-btn").addEventListener('click', (e) => selectionProcess(e.target));
    document.querySelector(".parent-option").addEventListener('click', (e) =>updateSelection(e.target, 'selected'));
    document.querySelector(".child-option").addEventListener('click', (e) =>updateSelection(e.target, 'selected'));
    document.querySelector(".submit-relation").addEventListener('click', formObject);
    
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

function selectionProcess(assignButton = document.querySelector(".assign-btn")) {
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

function updateSelection(element, selectionClass = 'person-box-selected') {
    if (!document.querySelector(".assign-btn").classList.contains('selected')) return;
    let selection = document.querySelectorAll("." + selectionClass);
    element.classList.add(selectionClass);

    for (let selectedElement of selection) {
        if (fromSameSection(element, selectedElement)) {
            selectedElement.classList.remove(selectionClass);
            break;
        }
    }

    if (selectionClass == 'person-box-selected') {
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
    let relationDisplay = document.querySelector(".relation-matching p");
    relationDisplay.innerText = inTreeName + ' is the __________ of ' + inWaitingName;
    relationDisplay.dataset.nameOne = inTreeName;
    relationDisplay.dataset.nameTwo = inWaitingName;
}

function assignRelation() {
    localStorage.setItem("familyData", familyData);

    localStorage.getItem("familyData");
}

function formObject() {
    
    if (!checks()) return ;
    
    // TODO: check here to make sure nodes are selected
    let familyData = JSON.parse(localStorage.getItem("familyData"));
    let relationDisplay = document.querySelector(".relation-matching p");
    
    let relationship;
    
    console.log('document.querySelector(".relation-matching .selected")');
    console.log(document.querySelector(".relation-matching .selected"));
    if ('parent' == document.querySelector(".relation-matching .selected").innerText.trim()) {
        relationship = relationDisplay.dataset.nameOne + ', ' + relationDisplay.dataset.nameTwo;
    } else {
        relationship = relationDisplay.dataset.nameTwo + ', ' + relationDisplay.dataset.nameOne;
    }

    console.log("relationship")
    console.log(relationship)
    
    let [parent, child] = relationship.split(', ');

    if (parent in familyData && !(child in familyData[parent].children)) {
        familyData[parent].children.push(child);
    } else {
        familyData[parent] = {
            parents: [],
            children: [child]
        };
    }

    if (child in familyData && !(parent in familyData[parent].parents)) {
        familyData[child].parents.push(parent);
    } else {
        familyData[child] = {
            parents: [parent],
            children: []
        };
    }
    // console.log(familyData);
    localStorage.setItem("familyData", JSON.stringify(familyData));
    
    let inWaitingElement = document.querySelector(".nav-sidebar .person-box-selected");
    updateWaitingArea(inWaitingElement.innerText);
    
    inWaitingElement.remove();
    selectionProcess();
    displayTreeView(document.querySelector(".current-person").innerText);
}

function checks() {
        
    let relationIsSelected = document.querySelector(".parent-option").classList.contains('selected') || document.querySelector(".child-option").classList.contains('selected');
    
    let peopleAreSelected = document.querySelector(".row-style .person-box-selected") != null && document.querySelector(".nav-sidebar .person-box-selected") != null;
    
    return relationIsSelected && peopleAreSelected;
    
}

function dataCheck() {
    let familyDataDB = familyData1();
    localStorage.setItem("familyData", JSON.stringify(familyDataDB));
    let familyData = JSON.parse(localStorage.getItem("familyData"));
    for (const [key, personData] of Object.entries(familyData)) {
        console.log("key:" + JSON.stringify(key));
        for (let child of personData.children) {
            if (!child in familyData) {
                console.log('No Entry For: ' + child);
            }
            // console.log(77);
        }
    }

}

function updateWaitingArea(personName) {
    let familyDataInWaiting = JSON.parse(localStorage.getItem("familyDataInWaiting"));
    familyDataInWaiting.splice(familyDataInWaiting.indexOf(personName), 1);
    localStorage.setItem("familyDataInWaiting", JSON.stringify(familyDataInWaiting));
}

// dataCheck();

export {
    displayTreeView,
    addStyle,
    returnDisplayRow,
    returnPersonBox,
    addEventListeners,
    clearPlayPage,
    addEventListeners2,
    addGenEL,
    addToWaitingAreaEventListener,
    toggleAddPersonVisibility,
    addPersonToWaitingArea,
    selectionProcess,
    updateSelection,
    fromSameSection,
    updateRelationMatching,
    assignRelation,
    formObject,
    dataCheck
}