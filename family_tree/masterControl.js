import { familyData1 } from './stats.js'
import {
    displayTreeView,
    addStyle,
    returnDisplayRow,
    returnPersonBox,
    addEventListeners,
    clearPlayPage,
    addEventListeners2,
    addGenEL,
    addToWaitingAreaEventListener,
    toggleAddPersonVisibility,
    addPersonToWaitingArea,
    selectionProcess,
    updateSelection,
    fromSameSection,
    updateRelationMatching,
    assignRelation,
    formObject,
    dataCheck
} from './baby.js'

// dataCheck();
// addEventListeners2();
// updateRelationMatching();

// displayTreeView();

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const numbers = [
    " zt5T1Ks1",
    " lWVxM8fb",
    " W3Ln0V1T",
    " mBubQ6mD",
    " VMiL17k1",
    " BHDeQSjI",
    " bzfg3vCk",
    " pe90IhWN",
    " OTaPIjQb",
    " WsZGno6l",
    " aBfUuu6A",
    " 72vLr7W6",
    " p2VjwnYo"
]


function generateString(length = 8) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function addToWaitingArea() {
    for (let number of JSON.parse(localStorage.getItem("familyDataInWaiting"))) {
        addPersonToWaitingArea(number);
    }
}

function name1() {
    // localStorage.setItem("familyDataInWaiting", JSON.stringify(numbers));
    // let familyDataDB = familyData1();
    // localStorage.setItem("familyData", JSON.stringify(familyDataDB));
    addToWaitingArea();
    console.log(document.querySelector(".relation-matching"));
    displayTreeView();
    addEventListeners2();
}

name1();