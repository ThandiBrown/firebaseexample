import * as _ from './getThis.js';
// import * as t from './comms/talkToDatabase.js'

const userData = {};

function printUserData() {
    //- console.log(JSON.parse(JSON.stringify(userData)));
    // //- console.log({...userData});
}

function saveToDB() {
    //- console.log("saveToDB");
    // t.writeDB(userData, '');
}

function newPillar(name) {
    //- console.log("newPillar");
    userData[name] = {};
    printUserData();
}

function newList(pillarName, listName) {
    //- console.log("newList");
    if (!('lists' in userData[pillarName])) {
        userData[pillarName]['lists'] = {}
    }

    userData[pillarName]['lists'][listName] = [];
    printUserData();
}

function deleteList(pillarName, listName) {
    //- console.log("deleteList");
    delete userData[pillarName]['lists'][listName];
    printUserData();
}

function newListItem(pillarName, listName, itemName, tag = '') {
    //- console.log("newListItem");
    let listItem = {};

    listItem['title'] = itemName;

    if (tag) {
        listItem['tag'] = tag;
    }

    userData[pillarName]['lists'][listName].push(listItem);
    printUserData();
}

function deleteListItem(pillarName, listName, listElement, itemName) {
    //- console.log("deleteListItem");
    //- console.log("listName:" + JSON.stringify(listName));
    //- console.log(listElement);
    

    let index = getChildOrder(listElement);
    //- console.log("index:" + JSON.stringify(index));

    let listItems = userData[pillarName]['lists'][listName];
    //- console.log("listItems:" + JSON.stringify(listItems));
    
    if (!isNaN(index) && itemName.includes(listItems[index].title.trim())) {
        listItems.splice(index, 1);
    }
    printUserData();
}

function getChildOrder(child) {
    // Get the parent element
    const parent = child.parentElement;

    // Get all children of the parent
    const children = Array.from(parent.children);
    //- console.log("children");
    //- console.log(children);

    // Find the index of the child element in the children array
    const index = children.indexOf(child);

    return index;
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