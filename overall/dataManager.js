import * as _ from './getThis.js';
import * as t from './comms/talkToDatabase.js'

const userData = {};

function printUserData() {
    console.log(JSON.parse(JSON.stringify(userData)));
    // console.log({...userData});
}

function saveToDB() {
    console.log("saveToDB");
    t.writeDB(userData, '');
}

function newPillar(name) {
    console.log("newPillar");
    userData[name] = {};
    printUserData();
}

function newList(pillarName, listName) {
    console.log("newList");
    if (!('lists' in userData[pillarName])) {
        userData[pillarName]['lists'] = {}
    }

    userData[pillarName]['lists'][listName] = [];
    printUserData();
}

function deleteList(pillarName, listName) {
    console.log("deleteList");
    delete userData[pillarName]['lists'][listName];
    printUserData();
}

function newListItem(pillarName, listName, itemName, tag = '') {
    console.log("newListItem");
    let listItem = {};

    listItem['title'] = itemName;

    if (tag) {
        listItem['tag'] = tag;
    }

    userData[pillarName]['lists'][listName].push(listItem);
    printUserData();
}

function deleteListItem(pillarName, listName, itemName) {
    console.log("deleteListItem");
    let listItems = userData[pillarName]['lists'][listName];
    let index;
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].title.trim() == itemName.trim()) {
            index = i;
            break;
        }
    }
    if (index) {
        listItems.splice(index, 1);
    }
    printUserData();
}



export {
    newPillar,
    newList,
    newListItem,
    deleteListItem,
    printUserData,
    deleteList,
    saveToDB
}