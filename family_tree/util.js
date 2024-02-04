
import {
    returnPersonBox
} from './components.js'
import { originalFamilyData } from './data/stats.js'

function dataCheck() {
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

function resetData(familyTree = true, inWaiting = true) {
    if (inWaiting) {
        const numbers = [
            " zt5T1Ks1",
            " lWVxM8fb",
            " W3Ln0V1T",
            " mBubQ6mD",
            " VMiL17k1",
            " BHDeQSjI",
            " bzfg3vCk",
            " pe90IhWN",
            " OTaPIjQb",
            " WsZGno6l",
            " aBfUuu6A",
            " 72vLr7W6",
            " p2VjwnYo"
        ]
        localStorage.setItem("familyDataInWaiting", JSON.stringify(numbers));
    }

    if (familyTree) {
        localStorage.setItem("familyDataOld", localStorage.getItem("familyData"));
        localStorage.setItem("familyData", JSON.stringify(originalFamilyData()));
    }

}

function generateString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



function clearPlayPage() {
    for (let element of document.querySelectorAll(".row-style")) {
        element.remove();
    }
}

function toggleNewPersonPopUp() {
    // New Person transparent pop-up
    document.querySelector(".add-person").classList.toggle('hidden');
}

function addPersonToWaitingArea(personInfo) {
    document.querySelector(".add-person-btn").insertAdjacentHTML('afterend', returnPersonBox(personInfo));
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

function removeFromWaitingArea(inWaitingElement) {
    let personName = inWaitingElement.innerText;
    let familyDataInWaiting = JSON.parse(localStorage.getItem("familyDataInWaiting"));

    familyDataInWaiting.splice(familyDataInWaiting.indexOf(personName), 1);
    localStorage.setItem("familyDataInWaiting", JSON.stringify(familyDataInWaiting));
    inWaitingElement.remove();
}

function relationMatchingText(inTreeName = 'Thandi', inWaitingName = 'Wayne') {
    let relationDisplay = document.querySelector(".relation-matching p");
    relationDisplay.innerText = inTreeName + ' is the __________ of ' + inWaitingName;
    relationDisplay.dataset.nameOne = inTreeName;
    relationDisplay.dataset.nameTwo = inWaitingName;
}

function assignmentReqMet() {
    let relationIsSelected = document.querySelector(".parent-option").classList.contains('selected') || document.querySelector(".child-option").classList.contains('selected');
    let peopleAreSelected = document.querySelector(".row-style .person-box-selected") != null && document.querySelector(".nav-sidebar .person-box-selected") != null;

    return relationIsSelected && peopleAreSelected;
}


export {
    dataCheck,
    resetData,
    generateString,
    clearPlayPage,
    toggleNewPersonPopUp,
    addPersonToWaitingArea,
    fromSameSection,
    removeFromWaitingArea,
    relationMatchingText,
    assignmentReqMet
}