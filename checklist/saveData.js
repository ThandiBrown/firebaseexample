
import { readDB, writeDB } from './data/talkToDatabase.js'
import { getRecentlyDeleted } from './delete.js'
import { returnAgenda } from './agendaList.js'
import {
    addAgendaItems
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

    for (let value of [".the-agenda"]) {
        let itemContainers = document.querySelector(value).querySelectorAll(".container");
        let todoItems = [];
        for (let itemContainer of itemContainers) {
            todoItems.push([
                itemContainer.querySelector(".item").innerText.trim(),
                itemContainer.querySelector(".checkbox").checked,
            ]);
        }
        if (c == 0) {
            sending.agenda = todoItems;
        }

        c += 1;
    }

    console.log("sending: " + JSON.stringify(sending));

    let date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    writeDB({ 'info': JSON.stringify(sending) }, date.replaceAll("/", "_"));
}

function loadingPage() {
    // writeDB({'info':JSON.stringify({
    //     agenda: []
    // })});
    let date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;

    readDB(date.replaceAll("/", "_"), loadData);
}

function loadData(response) {
    /*let sending = {"break":[["One",true]],"todos":[["Two",false],["hamburger",true]],"shopping":[["Gold Bond",false],["hand soap",false]]}*/
    
    let agendaList = [];
    let activeAgenda = returnAgenda();
    

    // function(taskInformation.list, true);
    // addAgendaItems(agendaList, true);
    for (let value of response[0].agenda) {
        
        if (activeAgenda.includes(value[0])) {
            agendaList.push(value);
        }
    }
    
    addAgendaItems(agendaList, true);

    addEventListeners();

}


function addEventListeners() {
    document.getElementById('1').addEventListener('click', () => addAgendaItems());
    document.getElementById('4').addEventListener('click', () => getRecentlyDeleted());
}

export {
    sendToDB
}