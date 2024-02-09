
import {
    returnPersonBox
} from './components.js'
import {
    addPersonToWaitingData
} from './util.js'



function toggleNewPersonPopUp() {
    // New Person transparent pop-up
    document.querySelector(".add-person").classList.toggle('hidden');
}

function addPersonToWaitingArea(personInfo) {
    document.querySelector(".add-person-btn").insertAdjacentHTML('afterend', returnPersonBox(personInfo));
}

function submitNewPerson() {
    let personInfo = document.querySelector(".person-input").innerText.trim();
    if (personInfo != '') {
        addPersonToWaitingArea(personInfo);
        addPersonToWaitingData(personInfo);
        toggleNewPersonPopUp();
        newPersonBoxELs();
    }
}

function newPersonBoxELs() {
    let element = [...document.querySelectorAll('.nav-sidebar .person-box')][0];

    element.addEventListener('click', (e) => displayTreeView(e.target.innerText, e.target));
    element.addEventListener('click', (e) => oneSelectionPerGroup(e.target));
}


export {
    submitNewPerson,
    toggleNewPersonPopUp,
    addPersonToWaitingArea
}