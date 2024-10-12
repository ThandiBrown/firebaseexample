import { removeListItem } from './delete.js'
import { sendToDB } from './saveData.js'




window.onload = function () {
    document.querySelector('.new-agenda-items').value = '';
}

function addAgendaItems(agenda = null, startup = false) {

    let section = document.querySelector(".the-agenda");

    if (agenda) {
        section.innerHTML += createListItem(agenda);
    } else {
        let submission = document.querySelector(".new-agenda-items").value.split("\n");
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
        
    }

    addEventListeners();
    document.querySelector('.new-agenda-items').value = '';
    if (!startup) sendToDB();
}


function createListItem(submission) {

    let elements = "";
    for (let itemDetails of submission) {
        if (itemDetails[0].trim() == "") { continue };
        let checked = '';
        if (itemDetails[1]) {
            checked = ' checked';
        }

        elements += `<label class=\"container\">
            <p class="item">${itemDetails[0]}</p>
            <input class="checkbox" type=\"checkbox\"` + checked + `>
            <span class=\"checkmark\" ></span>
            <span class=\"delete\"\">X</span>
        </label>`
    }
    return elements
}



function addEventListeners() {

    for (let element of [...document.querySelectorAll('.checkbox')]) {
        element.addEventListener('click', sendToDB);
    }

    for (let element of [...document.querySelectorAll('.delete')]) {
        element.addEventListener('click', (e) => removeListItem(e));
    }
}


export {
    addAgendaItems
}