import {removeListItem } from './delete.js'
import {sendToDB} from './saveData.js'



window.onload = function () {
    document.querySelector('.new-break-ideas').value = '';
    document.querySelector('.new-todo-ideas').value = '';
}

function addNewBreakItems(previousItems = null, startup = false) {
    //console.log("previousItems:" + JSON.stringify(previousItems));

    let section = document.querySelector(".on-break");

    if (previousItems) {
        section.innerHTML += createListItem(previousItems);
    } else {
        let submission = document.querySelector(".new-break-ideas").value.split("\n");
        console.log("11submission:" + JSON.stringify(submission));
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
    }

    addEventListeners();
    document.querySelector('.new-break-ideas').value = '';
    if (!startup) sendToDB();
    

}

function addNewToDos(previousItems = null, startup = false) {

    let section = document.querySelector(".to-dos");

    if (previousItems) {
        section.innerHTML += createListItem(previousItems);
    } else {
        let submission = document.querySelector(".new-todo-ideas").value.split("\n");
        console.log("99submission:" + JSON.stringify(submission));
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
    }

    addEventListeners();
    document.querySelector('.new-todo-ideas').value = '';
    if (!startup) sendToDB();
}

function addNewShoppingItems(previousItems = null, startup = false) {
    //console.log("previousItems:" + JSON.stringify(previousItems));

    let section = document.querySelector(".shopping");

    if (previousItems) {
        section.innerHTML += createListItem(previousItems);
    } else {
        let submission = document.querySelector(".new-items").value.split("\n");
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
    }
    

    addEventListeners();
    document.querySelector('.new-items').value = '';
    if (!startup) sendToDB();

}

function createListItem(submission) {
    
    let elements = "";
    for (let itemDetails of submission) {
        if (itemDetails[0].trim() == "") { continue };
        if (itemDetails[1]) {
            elements += `<label class=\"container\">
            <p class="item">${itemDetails[0]}</p>
            <input class="checkbox" type=\"checkbox\" checked>
            <span class=\"checkmark\"></span>
            <span class=\"delete\" \">X</span>
        </label>`
        } else {
            elements += `<label class=\"container\">
            <p class="item">${itemDetails[0]}</p>
            <input class="checkbox" type=\"checkbox\" >
            <span class=\"checkmark\" ></span>
            <span class=\"delete\"\">X</span>
        </label>`
        }
    }
    return elements
}



function addEventListeners() {
    for (let element of document.querySelectorAll('.checkbox')) {
        element.addEventListener('click', sendToDB);
    }
    
    for (let element of document.querySelectorAll('.delete')) {
        element.addEventListener('click', (e) => removeListItem(e));
    }
}


export {
    addNewBreakItems,
    addNewToDos,
    addNewShoppingItems
}