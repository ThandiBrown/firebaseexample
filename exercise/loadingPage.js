import { readDB, writeDB } from './data/talkToDatabase.js'
import { returnExercises } from './exerciseList.js'
import {
    retrieveSelectedCheckboxesForToday,
    placeYesterdaysDate
} from './userInputDate.js'
import {
    getTodaysInfo,
    alternateDisplay,
    alternateDateDisplay,
    saveData
} from './savingUserChoice.js'

import {
    placeNoDate,
    placePreviousDate,
    placeNextDate,
} from './userInputDate.js'
import {
    removeClickableElements
} from './viewOnly.js'
/* 
pulls data from files relevant to today and sets up the page display accurately on the data stored
*/
window.onload = function () {
    document.querySelector('.previousDate').value = '';
}

loadingSettings();



function loadingSettings() {
    readDB("", loadingPage);
}

function loadingPage(response) {
    let exerciseInformationObj = response[0];

    let settings = JSON.parse(exerciseInformationObj.settings.info);
    let lastPerformed = JSON.parse(exerciseInformationObj._last_performed.info);
    let weightClassDict = JSON.parse(exerciseInformationObj.weight_classes.info);

    displayDaysSinceLastPerformed(settings, lastPerformed, true);
    retrieveSelectedCheckboxesForToday();
    addEventListeners();
    addWeightClasses(weightClassDict);
    let viewOnly = JSON.parse(document.querySelector('#url-input').textContent);
    if (viewOnly) {
        removeClickableElements();
    }

}

function addWeightClasses(weightClassDict) {

    for (let element of document.querySelectorAll(".weight-class")) {

        let label = element.parentNode;
        let exerciseTag = label.getAttribute('id');
        if (exerciseTag in weightClassDict) {
            element.innerText = weightClassDict[exerciseTag];
        }
    }
}

function displayDaysSinceLastPerformed(settings, lastPerformed, loading) {
    // console.log("lastPerformed")
    // console.log(lastPerformed)

    // let lastPerformed = response[0];
    // let loading = response[1];
    // let settings = response[2];

    // an object containing a list of exercises and how long since they've been performed
    let daysSincePerformed = calculateDaysSincePerformed(lastPerformed);
    // console.log("daysSincePerformed")
    // console.log(daysSincePerformed)
    // this list order from least number of days to greatest
    daysSincePerformed = sortDaysSincePerformed(daysSincePerformed);

    // may be an unnecessary variable since this is the only time this method is called (when loading)
    if (loading) {
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
            // console.log("dates")
            // console.log(dates)

            let lastDay = dates[dates.length - 1];
            differenceInDays = numDaysFromToday(lastDay);
            // console.log("differenceInDays")
            // console.log(differenceInDays)
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


//  last big loading method
function addExerciseElementsToHtml(daysSincePerformed, settings) {
    // determines how the exercises should be shown
    let originalFormat = settings["original"];
    let shouldShowDates = settings["showDates"];

    // console.log("originalFormat:" + JSON.stringify(originalFormat));
    /* 
    daysSincePerformed = [
        {"glute bridge":32},
        {"back row":1},
    ]
    */
    let exerciseInputArea = document.querySelector(".page");

    let htmlElements = originalFormat ? displayByExerciseOrder(daysSincePerformed) : displayByDayOrder(daysSincePerformed);

    exerciseInputArea.innerHTML += htmlElements;

    if (!shouldShowDates) {
        for (let element of document.querySelectorAll(".lastPerformed")) {
            element.style.display = 'none';
        }
    }

    addEventListeners2();
}

function displayByDayOrder(daysSincePerformed) {
    let exerciseDict = returnExercisesAsDict();
    let elements = "";

    // prints in order of daysSincePerformed
    for (let lastPerformed of daysSincePerformed) {

        let exerciseKey = Object.keys(lastPerformed)[0];
        let days = lastPerformed[exerciseKey];

        // it takes in consideration that something that was in the list has changed or is no longer there
        if (!(exerciseKey in exerciseDict)) { continue };

        elements += getLineWithDates(days, exerciseDict, exerciseKey);

        delete exerciseDict[exerciseKey];
    }

    // print all remaining elements as normal
    for (let exerciseKey in exerciseDict) {
        elements += getLine(exerciseDict, exerciseKey);
    }
    return elements

}

function displayByExerciseOrder(daysSincePerformed) {
    // console.log("daysSincePerformed")
    // console.log(daysSincePerformed)

    /* 
    daysSincePerformed = [
        {"glute bridge":32},
        {"back row":1},
    ]
    */
    let exerciseDict = returnExercisesAsDict();
    let elements = "";
    // turn list of objects into one large object
    let flattened = {};
    /*
        {
            "glute bridge":32,
            "back row":1
        }
    */

    for (let lastPerformed of daysSincePerformed) {
        let exerciseKey = Object.keys(lastPerformed)[0];
        let days = lastPerformed[exerciseKey];

        flattened[exerciseKey] = days;
    }

    // prints in order of exerciseDict
    for (let exerciseKey in exerciseDict) {

        if (exerciseKey in flattened) {
            let days = flattened[exerciseKey];
            elements += getLineWithDates(days, exerciseDict, exerciseKey);
        }
        else {
            elements += getLine(exerciseDict, exerciseKey);
        }
    }
    return elements
}

function getLine(exerciseDict, exerciseKey, dayDisplay = "") {
    let exerciseName = exerciseDict[exerciseKey];
    let weightClassColor = determineWeightClassColor(exerciseName)

    let element =
        "<label id=\"" + exerciseKey + "\" class=\"container " + getBoldClass(exerciseName) + "\">" +
        "<span class=\"lastPerformed\">" + dayDisplay + "</span>" +
        exerciseName +
        "<span class=\"checkmark\" data-exercise=\"" + exerciseKey + "\"></span>" +
        "<div class=\"weight-class " + weightClassColor + "\" contenteditable=\"true\">" + "</div>" +
        "</label>";
    return element;
}

function getBoldClass(exerciseName) {
    let classColor = ''
    if ([
        "Biceps", "Triceps", "External Rotation", "Shoulder Shrugs", "Planks", "Core Lifts", "Side Leg Raises", "Quad Sets", "Clamshells", "Calf Raises"].includes(exerciseName)) {
        classColor = 'performance-easy';
    }
    return classColor;
}

function determineWeightClassColor(exerciseName) {
    if ([
        "Quad Sets", "Scapular Raise", "Shoulder Pinches", "Planks", "Core Lifts", "Side Leg Raises", "Quad Sets", "Clamshells", "Calf Raises",

        "Diagonal Leg Raise", "Quad Leg Raise", "Glute Bridges", "Single Leg Glute Bridges", "Chest Stretches", "Leg Stretches",].includes(exerciseName)) {
        return 'easy'
    } else if ([
        "Biceps", "Triceps", "External Rotation", "Shoulder Shrugs", "Weighted Hip Thrust", "Outer Thigh Machine", "Inner Quad Machine", "Hamstring Curl",

        "Front Raise", "Lateral Raise", "Posterior Raise", "Scapular Raise", "Chest Press", "ITWYs", "Lat Pulldown",].includes(exerciseName)) {
        return 'gym'
    } else if ([
        "Hand Exercises",
        "Four Way Neck Lifts", "Extensors", "Flexors", "Finger Bands", "Neck Stretches", "Shoulder Stretches", "Arm Stretches",].includes(exerciseName)) {
        return 'night'
    }
    else {
        return 'standard'
    }
}

function getLineWithDates(days, exerciseDict, exerciseKey) {
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

    return getLine(exerciseDict, exerciseKey, dayDisplay);
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
    for (let element of document.querySelectorAll('.checkmark')) {
        element.addEventListener('click', function (e) {
            e.target.classList.toggle("checked");
            console.log(e.target.innerText + ' clicked');
            saveData(e.target);
        });
    }

}


/* Utility */
function numDaysFromToday(lastDay) {
    lastDay = new Date(lastDay);

    // console.log("lastDay:" + JSON.stringify(lastDay));
    let today = new Date(getTodaysInfo()[0]);
    // console.log("today:" + JSON.stringify(today));

    let differenceInTime = today.getTime() - lastDay.getTime();
    // console.log("differenceInTime")
    // console.log(differenceInTime)
    // return differenceInTime / (1000 * 3600 * 24);
    return Math.floor(differenceInTime / (1000 * 3600 * 24));

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

export {
    calculateDaysSincePerformed,
    sortDates
}