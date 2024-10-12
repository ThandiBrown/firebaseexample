
import { readDB, writeDB } from './data/talkToDatabase.js'
import { getRecentlyDeleted } from './delete.js'
import { returnAgenda } from './agendaList.js'
import { addAgendaItems } from './textarea.js'
import { numOfDays } from './upcomingData.js'

numOfDays();
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


    let date = getDateTag();

    console.log("sending:" + JSON.stringify(sending));
    writeDB({ 'info': JSON.stringify(sending) }, date);

}

function getDateTag() {
    let date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    date = date.replaceAll("/", "_");
    return date;
}

function loadingPage() {
    // writeDB({'info':JSON.stringify({
    //     agenda: []
    // })});
    
    let date = getDateTag();

    readDB(date, loadData);
}

function loadData(website) {

    /*let sending = {"break":[["One",true]],"todos":[["Two",false],["hamburger",true]],"shopping":[["Gold Bond",false],["hand soap",false]]}*/

    console.log('DB Agenda');
    console.log(website[0].agenda);

    let itemsHandled = [];
    let agendaList = [];
    let activeAgenda = returnAgenda();
    let existingItems = '';
    let addedItems = '';
    let unAddedItems = '';

    let siteTasksAsDict = {};

    // change datatype to dictionary for easy lookup
    for (let [task, selectedValue] of website[0].agenda) {
        siteTasksAsDict[task] = selectedValue;
    }

    // going in order of the activeAgenda
    for (let task of activeAgenda) {
        if (task in siteTasksAsDict) {
            agendaList.push([task, siteTasksAsDict[task]]);
            existingItems += task + '\n';
        }
        // catches new additions to the activeAgenda
        else {
            agendaList.push([task, false]);
            addedItems += task + '\n';
        }
        itemsHandled.push(task);
    }

    // catches new addition to the website agenda
    for (let [task, selectedValue] of Object.entries(siteTasksAsDict)) {
        if (!itemsHandled.includes(task)) {
            agendaList.push([task, selectedValue]);
            unAddedItems += task + '\n';
        }
    }

    console.log("existingItems:" + existingItems);
    console.log("addedItems:" + addedItems);
    console.log("unAddedItems:" + unAddedItems);
    // return ;
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