import { readDB, writeDB } from './data/talkToDatabase.js'
import {
    calculateDaysSincePerformed,
    sortDates
} from './loadingPage.js'


/* 
save the user's data whenever they click a checkbox
(this is the only file that makes writes or permanent changes to thefile data)
*/

function alternateDisplay() {
    readDB("settings", changeDisplayFormat);
}

function alternateDateDisplay() {
    readDB("settings", changeShowDatesValue);
}

function changeShowDatesValue(response) {
    let opposite = response[0]["showDates"] ? false : true;
    // console.log("opposite2:" + JSON.stringify(opposite));
    let good = {
        "info": JSON.stringify({ "showDates": opposite, "original": response[0]["original"] })
    }
    writeDB("settings", good);

}

function changeDisplayFormat(response) {
    let opposite = response[0]["original"] ? false : true;
    // console.log("opposite1:" + JSON.stringify(opposite));
    let good = {
        "info": JSON.stringify({ "original": opposite, "showDates": response[0]["showDates"] })
    }
    writeDB("settings", good);

}

function saveData(checkmark) {

    readDB("_last_performed", updateLastPerformed, checkmark);

    saveSelectedCheckboxesToDB();

}


function updateLastPerformed(response) {
    // console.log("updateLastPerformed:")
    // (1) update the last performed list for a given exercise
    /* 
    lastPerformed = {
        "glute_bridges":["09/03/2023"],
        "back_rows":["08/03/2023"]
    }
    */
    let lastPerformed = response[0];
    let checkmark = response[1];

    let exerciseClicked = checkmark.dataset.exercise;
    console.log("exerciseClicked:" + JSON.stringify(exerciseClicked));
    let theDate = returnDateToUse();
    console.log("theDate:" + JSON.stringify(theDate));

    // create a new entry for new exercise types
    if (!(exerciseClicked in lastPerformed)) {
        // console.log("new exercise entry");
        lastPerformed[exerciseClicked] = [];
    }

    let dates = lastPerformed[exerciseClicked];
    console.log("dates:" + JSON.stringify(dates));

    let isChecked = checkmark.classList.contains("checked");
    console.log("isChecked:" + JSON.stringify(isChecked));


    let hasBeenDeselected = !isChecked && dates.includes(theDate);
    let hasBeenSelected = isChecked && !dates.includes(theDate);
    console.log("hasBeenSelected:" + JSON.stringify(hasBeenSelected));


    // update last performed based on type of selection
    if (hasBeenDeselected) {
        console.log("Removing from last performed");
        dates.splice(dates.indexOf(theDate), 1);
    }
    else if (hasBeenSelected) {
        if (dates.length < 5) {
            console.log("Adding to last performed because lots of space");
            dates.push(theDate);
        } else {
            dates = sortDates(dates);
            console.log("dates22:" + JSON.stringify(dates));
            console.log(theDate > dates[0]);
            let entryDateComesAfter = false;
            if (theDate.slice(-4) == dates[0].slice(-4) && theDate > dates[0]) {
                entryDateComesAfter = true;
            } else if (theDate.slice(-4) > dates[0].slice(-4)) {
                entryDateComesAfter = true;
            }
            // replace with minimum date
            if (entryDateComesAfter) {
                console.log("Adding to last performed");
                dates[0] = theDate;
            }
        }
    }

    lastPerformed[exerciseClicked] = dates;
    console.log("lastPerformed2:" + JSON.stringify(dates));

    // (2) save the new last performed list
    let good = {
        "info": JSON.stringify(lastPerformed)
    }

    writeDB("_last_performed", good);
    saveWeightClasses();
    // (3) displays days since this exercise was completed on HTML
    updateHtmlElements(lastPerformed);
}

function saveWeightClasses() {
    let weightClassDict = {};
    for (let element of document.querySelectorAll(".weight-class")) {

        let weightClass = element.innerText.trim();
        if (weightClass != '') {
            let label = element.parentNode;
            let exerciseTag = label.getAttribute('id');
            weightClassDict[exerciseTag] = weightClass;
        }
    }
    // console.log(weightClassDict);
    writeDB("weight_classes", {
        "info": JSON.stringify(weightClassDict)
    });
    return weightClassDict
}

function updateHtmlElements(lastPerformed) {
    console.log("affecting labels");
    let daysSincePerformed = calculateDaysSincePerformed(lastPerformed);

    for (let daysSinceObj of daysSincePerformed) {
        let exerciseKey = daysSinceObj.exerciseType;
        let daysSince = daysSinceObj.days;
        // console.log("daysSince:" + JSON.stringify(daysSince));
        // console.log("#" + exerciseKey);

        let lastPerformedElement = document.querySelector("#" + exerciseKey + " .lastPerformed");
        // console.log("lastPerformedElement:" + JSON.stringify(lastPerformedElement));
        // acknowledges that some exercises that were previously on the page are no longer there
        if (!lastPerformedElement) { continue };

        let exerciseName = lastPerformedElement.innerHTML.split("(")[0].trim();
        // console.log("exerciseName:" + JSON.stringify(exerciseName));

        if (daysSince < 0) {
            lastPerformedElement.innerText = exerciseName;
        }
        else if (daysSince == 1) {
            lastPerformedElement.innerText = exerciseName + " (" + daysSince + "d)";
        }
        else if (daysSince != 1) {
            lastPerformedElement.innerText = exerciseName + " (" + daysSince + "d)";
        }

    }

}


// whatever day it is, grabbed the selected checkboxes and save it to a file
function saveSelectedCheckboxesToDB() {

    let theDate = returnDateToUse();
    // console.log(30);
    let exerciseData = returnExerciseData(theDate);
    // console.log(32);
    let fileName = theDate.replaceAll("/", "_");

    let good = {
        "info": exerciseData
    }
    writeDB(fileName, good);

}


/* Utility */

function returnExerciseData(date) {
    let exerciseData = {
        "date": date,
        "weekday": getTodaysInfo(date)[1],
        "exercisesCompleted": returnCheckedExercises(),
    }
    // console.log(31);
    return JSON.stringify(exerciseData)
}

function returnCheckedExercises() {
    // console.log("returnCheckedExercises");
    let exercisesCompleted = [];
    let checkmarks = document.querySelectorAll("label .checkmark");

    for (let i = 0; i < checkmarks.length; i++) {

        if (checkmarks[i].classList.contains("checked")) {
            // console.log(77);
            // console.log(boxes[i].name);
            exercisesCompleted.push(checkmarks[i].dataset.exercise);
            // console.log(checkmarks[i].dataset.exercise);
        }
    }

    return exercisesCompleted;

}

function getTodaysInfo(dateAsString = null) {
    let date;
    if (dateAsString) {
        date = new Date(dateAsString);
    } else {
        date = new Date();
    }
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;

    var options = { weekday: 'long' }
    var weekday = new Date(dateAsString).toLocaleDateString('en-us', options);

    return [date, weekday]
}

function returnDateToUse() {
    // get the date in question
    let theDate;

    if (document.querySelector(".previousDate").value) {
        theDate = document.querySelector(".previousDate").value;
    } else {
        theDate = getTodaysInfo()[0];
    }
    // console.log("Date to use:" + theDate);
    return theDate;
}

function formatDateForObj(dateAsString) {
    dateAsString = dateAsString.split("/");
    return [dateAsString[1], dateAsString[0], dateAsString[2]].join("/");
}


export {
    getTodaysInfo,
    alternateDisplay,
    alternateDateDisplay,
    saveData
}