import {removeListItem } from './delete.js'
import {sendToDB} from './saveData.js'



window.onload = function () {
    document.querySelector('.new-break-ideas').value = '';
    document.querySelector('.new-todo-ideas').value = '';
}

function addNewBreakItems(previousItems = null, startup = false) {

    let sectionName = ".on-break";
    let section = document.querySelector(sectionName);

    if (previousItems) {
        section.innerHTML += createListItem(previousItems);
    } else {
        let submission = document.querySelector(".new-break-ideas").value.split("\n");
        // console.log("11submission:" + JSON.stringify(submission));
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
    }

    addButtonEventListeners(sectionName);
    document.querySelector('.new-break-ideas').value = '';
    if (!startup) sendToDB();
    

}

function addNewToDos(previousItems = null, startup = false) {

    let sectionName = ".to-dos";
    let section = document.querySelector(sectionName);

    if (previousItems) {
        section.innerHTML += createListItem(previousItems);
    } else {
        let submission = document.querySelector(".new-todo-ideas").value.split("\n");
        // console.log("22submission:" + JSON.stringify(submission));
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
    }

    addButtonEventListeners(sectionName);
    document.querySelector('.new-todo-ideas').value = '';
    if (!startup) sendToDB();
}

function addNewShoppingItems(previousItems = null, startup = false) {
    //console.log("previousItems:" + JSON.stringify(previousItems));

    let sectionName = ".shopping";
    let section = document.querySelector(sectionName);

    if (previousItems) {
        section.innerHTML += createListItem(previousItems);
    } else {
        let submission = document.querySelector(".new-items").value.split("\n");
        // console.log("33submission:" + JSON.stringify(submission));
        for (let i = 0; i < submission.length; i++) {
            submission[i] = [submission[i], false];
        }
        section.innerHTML += createListItem(submission);
    }
    

    addButtonEventListeners(sectionName);
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
            <span class=\"delete\">X</span>
        </label>`
        } else {
            elements += `<label class=\"container\">
            <p class="item">${itemDetails[0]}</p>
            <input class="checkbox" type=\"checkbox\" >
            <span class=\"checkmark\" ></span>
            <span class=\"delete\">X</span>
        </label>`
        }
    }
    return elements
}



function addButtonEventListeners(sectionName) {
    
    for (let element of [...document.querySelectorAll(sectionName + ' .checkbox')]) {
        element.addEventListener('click', sendToDB);
    }
    
    for (let element of [...document.querySelectorAll(sectionName + ' .delete')]) {
        element.addEventListener('click', (e) => removeListItem(e));
    }
}


export {
    addNewBreakItems,
    addNewToDos,
    addNewShoppingItems
}