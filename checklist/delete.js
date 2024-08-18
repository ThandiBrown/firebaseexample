import {sendToDB} from './saveData.js'

let recentlyDeleted;
let recentlyDeletedParent;
let checkedStatus;

function removeListItem(e) {
    let listItem = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    e.target.parentNode.parentNode.removeChild(listItem);
    setRecentlyDeleted(parent, listItem)
    // no need to add sendToDB(); here because it is attached to the input and is triggered anyway
}

function setRecentlyDeleted(parent, deleted) {
    recentlyDeletedParent = parent;
    recentlyDeleted = deleted;
    checkedStatus = deleted.querySelector(".checkbox").checked;
}

function getRecentlyDeleted() {

    if (recentlyDeletedParent && recentlyDeleted) {
        recentlyDeleted.querySelector("input").checked = checkedStatus;
        recentlyDeletedParent.appendChild(recentlyDeleted);
        recentlyDeletedParent = null;
        recentlyDeleted = null;
        checkedStatus = null;
        sendToDB();
    }

}

export{
    removeListItem,
    getRecentlyDeleted
}