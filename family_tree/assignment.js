
import {
    fromSameSection,
    removeFromWaitingArea,
    relationMatchingText,
    assignmentReqMet
} from './util.js'
import {
    displayTreeView
} from './load.js'










function toggleAssignmentFeature(assignButton = document.querySelector(".assign-btn")) {

    assignButton.classList.toggle('selected');
    document.querySelector(".relation-matching").classList.toggle('hidden');

    if (!assignButton.classList.contains('selected')) {
        for (let selectElement of document.querySelectorAll(".selected")) {
            selectElement.classList.remove('selected');
        }
        for (let selectElement of document.querySelectorAll(".person-box-selected")) {
            selectElement.classList.remove('person-box-selected');
        }
    }
}

function oneSelectionPerGroup(element, selectionClass = 'person-box-selected') {
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
        relationMatchingText(
            inTree ? inTree.innerText : '',
            inWaiting ? inWaiting.innerText : ''
        );
    }
}

function executeAssignment() {

    if (!assignmentReqMet()) return;

    let relationshipSelected = document.querySelector(".relation-matching .selected").innerText.trim();
    let familyData = JSON.parse(localStorage.getItem("familyData"));
    let relationTextElem = document.querySelector(".relation-matching p");

    parent = 'parent' == relationshipSelected ? relationTextElem.dataset.nameOne : relationTextElem.dataset.nameTwo;
    child = 'parent' == relationshipSelected ? relationTextElem.dataset.nameTwo : relationTextElem.dataset.nameOne;

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

    localStorage.setItem("familyData", JSON.stringify(familyData));

    let inWaitingElement = document.querySelector(".nav-sidebar .person-box-selected");
    removeFromWaitingArea(inWaitingElement);

    toggleAssignmentFeature();
    displayTreeView(document.querySelector(".current-person").innerText);
}

export {
    toggleAssignmentFeature,
    oneSelectionPerGroup,
    executeAssignment
}