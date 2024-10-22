import { getTodaysInfo } from './savingUserChoice.js'
import { readDB, writeDB } from './data/talkToDatabase.js'

/* 
pull and display checkbox data based on input date changes
(we only retrieve data in this file, no writing or permanent changes)
*/

// Show the user input date and retrieve the checkboxes from that given day
function placeDate(dateString) {
    // console.log(77);
    // console.log(dateString);
    // console.log(getTodaysInfo(dateString));
    // console.log(getTodaysInfo(dateString)[1]);
    if (dateString) {
        document.querySelector(".weekday").innerHTML = getTodaysInfo(dateString)[1];
    } else {
        document.querySelector(".weekday").innerHTML = "";
    }
    document.querySelector(".previousDate").value = dateString;
    restoreCheckboxesFromGivenDate();
}

// Input Yesterday Button
function placeYesterdaysDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    placeDate(dateAsString(date));
}

// Input Clear Date Input
function placeNoDate() {
    placeDate("");
}

function placePreviousDate() {
    let inputDate = document.querySelector(".previousDate").value;
    if (inputDate == "") {
        placeYesterdaysDate();
    } else {
        let date = new Date(inputDate);
        date.setDate(date.getDate() - 1);
        placeDate(dateAsString(date));
    }

}

function placeNextDate() {
    let inputDate = document.querySelector(".previousDate").value;
    if (inputDate == "") {
        inputDate = getTodaysInfo()[0];
    }

    let date = new Date(inputDate);
    date.setDate(date.getDate() + 1);
    placeDate(dateAsString(date));

}

// Change in Input Date
function restoreCheckboxesFromGivenDate() {
    let inputDate = document.querySelector(".previousDate").value;

    if (inputDate == "") {
        retrieveSelectedCheckboxesForToday();
    } else {
        retrieveSelectedCheckboxes(inputDate);
    }

}

// Display checkboxes for whatever day is being displayed
function retrieveSelectedCheckboxes(dateAsString) {

    let fileName = dateAsString.replaceAll("/", "_");
    readDB(fileName, checkCheckboxes);
}

// Loading Todays Data
function retrieveSelectedCheckboxesForToday() {
    // console.log("retrieveSelectedCheckboxesForToday");
    retrieveSelectedCheckboxes(getTodaysInfo()[0]);
}

// purely decorative, checks the checkboxes
function checkCheckboxes(response) {
    // console.log("checkCheckboxes");
    /* 
    dayOfTheDay = {
        "date" : "09/04/2023",
        "weekday" : "Monday",
        "exercisesCompleted" : []
    }
    */
    let dayOfTheDay = response[0];
    let checkmarks = document.querySelectorAll("label .checkmark");

    // check if file previously existed
    let isEmpty = true;
    for (let key in dayOfTheDay) { isEmpty = false; break; }

    // if this is a new day make sure to uncheck any checked boxes
    if (isEmpty) {
        for (let i = 0; i < checkmarks.length; i++) {
            checkmarks[i].classList.remove("checked");
        }
    }
    // if you're returning to a previously edited day
    else if ('exercisesCompleted' in dayOfTheDay) {
        // console.log("returning to a previously edited day");

        let exercises = dayOfTheDay['exercisesCompleted'];

        for (let i = 0; i < checkmarks.length; i++) {

            if (exercises.includes(checkmarks[i].dataset.exercise)) {
                checkmarks[i].classList.add("checked");
            } else {
                checkmarks[i].classList.remove("checked");
            }
        }
    }
}

/* Utility */

function dateAsString(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    return date
}

export {
    retrieveSelectedCheckboxesForToday,
    placeNoDate,
    placePreviousDate,
    placeNextDate,
    placeYesterdaysDate
}