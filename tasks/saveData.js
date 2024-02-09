
import { readDB, writeDB } from './data/talkToDatabase.js'
import {getRecentlyDeleted} from './delete.js'
import {
    addNewBreakItems,
    addNewToDos,
    addNewShoppingItems
} from './textarea.js'

loadingPage();

function sendToDB() {
    /* 
    get all of the elements
    get all of the text inside and save it in a list
    assign the list to a dictionary key related to breaks
    submit information
    */

    let sending = {};
    let c = 0;

    for (let value of [".on-break", ".to-dos", ".shopping"]) {
        let itemContainers = document.querySelector(value).querySelectorAll(".container");
        let todoItems = [];
        for (let itemContainer of itemContainers) {
            todoItems.push([
                itemContainer.querySelector(".item").innerText.trim(),
                itemContainer.querySelector(".checkbox").checked,
            ]);
        }
        if (c == 0) {
            sending.break = todoItems;
        } else if (c == 1) {
            sending.todos = todoItems;
        } else if (c == 2) {
            sending.shopping = todoItems;
        }

        c += 1;
    }

    console.log("sending: " + JSON.stringify(sending));

    writeDB({'info':JSON.stringify(sending)});
}

function loadingPage() {
    readDB(loadData);
}

function loadData(response) {
    /*let sending = {"break":[["One",true]],"todos":[["Two",false],["hamburger",true]],"shopping":[["Gold Bond",false],["hand soap",false]]}*/
    let taskInformation = response[0]
    // let listItems = '';
    // for (const [key, listOfItems] of Object.entries(taskInformation)) {
    //     for (let itemStatus of listOfItems) {
    //         listItems += itemStatus[0] + '\n';
    //     }
    // }
    // console.log(listItems);
    
    
    addNewToDos(taskInformation.todos, true);
    addNewShoppingItems(taskInformation.shopping, true);
    addNewBreakItems(taskInformation.break, true);
    addEventListeners();
    
    
}


function addEventListeners() {
    document.getElementById('1').addEventListener('click', () => addNewBreakItems());
    document.getElementById('2').addEventListener('click', () => addNewToDos());
    document.getElementById('3').addEventListener('click', () => addNewShoppingItems());
    document.getElementById('4').addEventListener('click', () => getRecentlyDeleted());
}

export {
    sendToDB
}