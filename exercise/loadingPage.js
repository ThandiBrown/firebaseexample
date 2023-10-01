import { readDB, writeDB } from './data/talkToDatabase.js'

import { retrieveSelectedCheckboxesForToday } from './userInputDate.js'
import { 
    getTodaysInfo,
    alternateDisplay,
    alternateDateDisplay,
    saveData
} from './savingUserChoice.js'

import{
    placeNoDate,
    placePreviousDate,
    placeNextDate,
} from './userInputDate.js'

/* 
pulls data from files relevant to today and sets up the page display accurately on the data stored
*/
window.onload = function() {
    document.querySelector('.previousDate').value = '';
}

loadingSettings();

function loadingSettings() {
    readDB("settings", loadingPage);
}

function loadingPage(response) {
    let settings = response[0];
    // console.log("settings:" + JSON.stringify(settings));
    readDB("_last_performed", displayDaysSinceLastPerformed, true, settings);
    retrieveSelectedCheckboxesForToday();
    addEventListeners();
}

function displayDaysSinceLastPerformed(response) {
    // console.log("displayDaysSinceLastPerformed");
    let lastPerformed = response[0];
    let loading = response[1];
    let settings = response[2];

    let daysSincePerformed = calculateDaysSincePerformed(lastPerformed);
    daysSincePerformed = sortDaysSincePerformed(daysSincePerformed);

    if (loading) {
        // console.log("loading");
        addExerciseElementsToHtml(daysSincePerformed, settings);
    }
}

function calculateDaysSincePerformed(lastPerformed) {
    /* 
    lastPerformed = {
        "glute_bridges":["09/03/2023"],
        "back_rows":["08/03/2023"]
    }
    */

    let differenceInDays;
    let daysSincePerformed = [];


    // console.log("21lastPerformed");
    // console.log(lastPerformed);

    // for every exercise type
    for (let exerciseType in lastPerformed) {

        // console.log("exerciseType:" + JSON.stringify(exerciseType));

        // Calculate days since performed
        // no last date saved
        if (lastPerformed[exerciseType].length == 0) {
            differenceInDays = -1;
        }
        else if (lastPerformed[exerciseType].length > 0) {

            let dates = lastPerformed[exerciseType];
            dates = sortDates(dates);

            let lastDay = dates[dates.length - 1];
            differenceInDays = numDaysFromToday(lastDay);
        }

        // console.log("differenceInDays");
        // console.log(differenceInDays);

        // Save
        daysSincePerformed.push({
            exerciseType: exerciseType,
            days: differenceInDays

        });
    }
    /* 
    daysSincePerformed = [
        {
            exerciseType: "back_rows", 
            days: 1
            
        },
        {
            exerciseType: "glute_bridge", 
            days: 32
            
        }
    ]
    */
    return daysSincePerformed;
}

function sortDaysSincePerformed(daysSincePerformed) {

    daysSincePerformed.sort((a, b) => b.days - a.days);

    // reformat
    for (let i = 0; i < daysSincePerformed.length; i++) {
        daysSincePerformed[i] = { [daysSincePerformed[i]["exerciseType"]]: daysSincePerformed[i]["days"] };
    }
    // console.log("daysSincePerformed");
    // console.log(daysSincePerformed);
    /* 
    daysSincePerformed = [
        {"back row":1},
        {"glute bridge":32}
    ]
    */
    return daysSincePerformed

}


// Loading Page Data
function addExerciseElementsToHtml(daysSincePerformed, settings) {
    let originalFormat = settings["original"];
    let shouldShowDates = settings["showDates"];
    
    // console.log("originalFormat:" + JSON.stringify(originalFormat));
    /* 
    daysSincePerformed = [
        {"glute bridge":32},
        {"back row":1},
    ]
    */
    let exerciseInputArea = document.querySelector(".exerciseInput");

    let htmlElements = originalFormat ? originalDisplay(daysSincePerformed) : formExerciseElements(daysSincePerformed);

    exerciseInputArea.innerHTML += htmlElements;
    if (!shouldShowDates) {
        for (let element of document.querySelectorAll(".lastPerformed")) {
            element.style.display = 'none';
        }
    }
    addEventListeners2();
}

function formExerciseElements(daysSincePerformed) {
    let exerciseDict = returnExercisesAsDict();
    let elements = "";

    // create particular elements for all the days in which you have data on when it was last performed
    for (let i = 0; i < daysSincePerformed.length; i++) {
        let lastPerformed = daysSincePerformed[i];

        let exerciseKey = Object.keys(lastPerformed)[0];
        let days = lastPerformed[exerciseKey];
        let exerciseName = exerciseDict[exerciseKey];
        
        // it takes in consideration that something that was in the list has changed or is no longer there
        if (!(exerciseKey in exerciseDict)) {continue};
        
        let dayDisplay;
        if (days < 0) {
            dayDisplay = "";
        }
        else if (days == 1) {
            dayDisplay = "(" + days + "d)";
        }
        else if (days != 1) {
            dayDisplay = "(" + days + "d)";
        }

        elements += "<label id=\"" + exerciseKey + "\" class=\"container\"><span class=\"lastPerformed\">" + dayDisplay + "</span>" + exerciseName + "<input type=\"checkbox\" name=\"" + exerciseKey;
        elements += "\" ><span class=\"checkmark\"></span></label>";

        delete exerciseDict[exerciseKey];
    }

    // print all remaining elements as normal
    for (let exerciseKey in exerciseDict) {
        let exerciseName = exerciseDict[exerciseKey];
        elements += "<label id=\"" + exerciseKey + "\" class=\"container\">" + exerciseName + "<input type=\"checkbox\" name=\"" + exerciseKey + "\"><span class=\"checkmark\"></span><span class=\"lastPerformed\"></span></label>";

    }
    return elements

}

function originalDisplay(daysSincePerformed) {
    /* 
    daysSincePerformed = [
        {"glute bridge":32},
        {"back row":1},
    ]
    */
    let exerciseDict = returnExercisesAsDict();
    let elements = "";
    let combined = {};
    
    for (let lastPerformed of daysSincePerformed) {
        let exerciseKey = Object.keys(lastPerformed)[0];
        let days = lastPerformed[exerciseKey];
        
        combined[exerciseKey] = days;
        
    }
    // console.log("combined:" + JSON.stringify(combined));

    // print all remaining elements as normal
    for (let exerciseKey in exerciseDict) {
        let exerciseName = exerciseDict[exerciseKey];
        
        if (exerciseKey in combined) {
            let dayDisplay;
            let days = combined[exerciseKey];
            
            if (days < 0) {
                dayDisplay = "";
            }
            else if (days == 1) {
                dayDisplay = "(" + days + "d)";
            }
            else if (days != 1) {
                dayDisplay = "(" + days + "d)";
            }
            elements += "<label id=\"" + exerciseKey + "\" class=\"container\"><span class=\"lastPerformed\">" + dayDisplay + "</span>" + exerciseName + "<input type=\"checkbox\" name=\"" + exerciseKey;
            elements += "\" ><span class=\"checkmark\"></span></label>";
        }
        else {
            elements += "<label id=\"" + exerciseKey + "\" class=\"container\">" + exerciseName + "<input type=\"checkbox\" name=\"" + exerciseKey + "\" ><span class=\"checkmark\"></span><span class=\"lastPerformed\"></span></label>";
        }
        

    }
    return elements
}


function addEventListeners() {
    document.getElementById('1').addEventListener('onblur', () => restoreCheckboxesFromGivenDate());
    document.getElementById('2').addEventListener('click', () => placeYesterdaysDate());
    document.getElementById('3').addEventListener('click', () => placeNoDate());
    document.getElementById('4').addEventListener('click', () => placePreviousDate());
    document.getElementById('5').addEventListener('click', () => placeNextDate());
    document.getElementById('6').addEventListener('click', () => alternateDisplay());
    document.getElementById('7').addEventListener('click', () => alternateDateDisplay());
    
}

function addEventListeners2() {
    for (let element of document.querySelectorAll('input[type=checkbox]')) {
        element.addEventListener('click', (e) => saveData(e));
    }
    
}


/* Utility */
function numDaysFromToday(lastDay) {
    lastDay = new Date(lastDay);
    let today = new Date(getTodaysInfo()[0]);

    let differenceInTime = today.getTime() - lastDay.getTime();
    return differenceInTime / (1000 * 3600 * 24);

}

function dateToNum(d) {
    // Convert date "06/26/2016" to 20160626
    d = d.split("/"); return Number(d[2] + d[0] + d[1]);
}

function sortDates(dates) {

    dates.sort(function (a, b) {
        return dateToNum(a) - dateToNum(b);
    });

    // console.log(dates);

    return dates;
}

function returnExercisesAsKeys() {
    let exercises = returnExercises();
    for (let i = 0; i < exercises.length; i++) {
        exercises[i] = exercises[i].replaceAll(" ", "_").toLowerCase();
    }
    return exercises
}

function returnExercisesAsDict() {
    let exercises = returnExercises();
    let keys = returnExercisesAsKeys();

    let exerciseDict = {};
    for (let i = 0; i < keys.length; i++) {
        exerciseDict[keys[i]] = exercises[i];
    }
    return exerciseDict;
}

function returnExercises() {
    return [
        "Banded Joint Isolation",
        "Soft Tissue Work",
        "Dynamic Arm Movement",

        "ITWYs",
        "External Rotation",
        "Scapular Raise",
        
        "Extensors",
        "Flexors",
        "Finger Bands",
        
        "Four Way Neck Lifts",
        
        "Shoulder Shrugs",
        "Shoulder Pinches",
        "Back Rows",
        "Lat Pulldown",
        
        "Front Raise",
        "Lateral Raise",
        "Posterior Raise",
        
        "Chest Press",
        
        "Biceps",
        "Triceps",
        
        
        "Straight Leg Raise",
        "Side Leg Raise",
        "Standing Kickbacks",
        "Diagonal Leg Raise",
        "Quad Leg Raise",
        "Clamshells",
        "Glute Bridges",
        "Single Leg Glute Bridges",
        "Calf Raises",
        
        //"Stretches",
        // "Neck Rotation",
        // "Neck Side",
        // "Scapular Pull",
        
        // "Three Way Pole",
        // "Doorway Stretch",
        // "Arm Wall Rotation",
        
        // "Fingertip Stretch",
        // "Extensor Stretch",
        // "Flexor Stretch",
        // "Nerve Glide",
        
        "Neck Stretches",
        "Shoulder Stretches",
        "Chest Stretches",
        "Arm Stretches",
        "Leg Stretches",
        // "Hip Flexors",
        // "Middle Legs",
        // "Glutes",
        // "Hamstrings",
        // "Calves",
        // "Ankles",
        // "Foot Soles"
    ];
}


export {
    calculateDaysSincePerformed
}