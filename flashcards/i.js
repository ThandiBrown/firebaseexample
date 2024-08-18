import { readDB, writeDB } from './data/talkToDatabase.js'
import { fc_data } from './flashCardData.js';
import { RandomNumberGenerator } from './randomTracker.js';



let i = 10;

let flashCardData = fc_data();
let problemNumbers = Object.keys(flashCardData);

const rng = new RandomNumberGenerator(0, problemNumbers.length - 1);

// loadingSettings();
loadingPage('');

function loadingSettings() {
    
    // writeDB({'info':JSON.stringify(fc_data())});
    // readDB("", loadingPage);
}

function loadingPage(response) {
    
    // let db_data = response[0];
    // console.log("response");
    // console.log(fc_data);
    // console.log(fc_data['115'].name);
    // console.log(problemNumbers[i]);
    // displayCard(fc_data[problemNumbers[i]]);
    
    addEventListeners();
    displayCard(flashCardData[problemNumbers[i]]);
}


function nextProblem() {
    
    if (i < problemNumbers.length - 1) {
        i++;
        let nextKey = problemNumbers[i];
        console.log("i:" + JSON.stringify(i));
        rng.addSuggestedNumber(i);
        displayCard(flashCardData[nextKey]);
    }
    
}

function previousProblem() {
    
    if (0 < i) {
        i--;
        let nextKey = problemNumbers[i];
        console.log("i:" + JSON.stringify(i));
        rng.addSuggestedNumber(i);
        displayCard(flashCardData[nextKey]);
    }
    
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function randomProblem() {
    
    // let randomIntInclusive, nextKey = '0';
    // while (nextKey == '0' || previousKey == nextKey) {
    let randomIntInclusive = rng.getRandomNumber();
    // randomIntInclusive = getRandomIntInclusive(0, problemNumbers.length - 1);
    let nextKey = problemNumbers[randomIntInclusive];
    console.log("randomIntInclusive:" + JSON.stringify(randomIntInclusive));
    
    // }
    
    displayCard(flashCardData[nextKey]);
    // previousKey = nextKey;
}

function displayCard(flashcard) {
    
    for (let value of ['title center', 'hint', 'note', 'code code', 'problem']) {
        if (flashcard[value.split(' ')[0]]) {
            document.querySelector("." + value).innerHTML = flashcard[value.split(' ')[0]].replace(/\n/g, '<br>');
        }
        
    }
    for (let value of ['hint', 'note', 'code']) {
        setDisplay('.' + value, false);
        if (flashcard[value] === null) {
            setDisplay('#problem' + value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), false);
        } else {
            setDisplay('#problem' + value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), true);
        }
    }
}




function addEventListeners() {
    // document.getElementById('').addEventListener('onblur', () => restoreCheckboxesFromGivenDate());
    document.getElementById('nextProblem').addEventListener('click', () => nextProblem());
    document.getElementById('previousProblem').addEventListener('click', () => previousProblem());
    document.getElementById('randomProblem').addEventListener('click', () => randomProblem());
    document.getElementById('problemHint').addEventListener('click', () => toggleDisplay('.hint'));
    document.getElementById('problemNote').addEventListener('click', () => toggleDisplay('.note'));
    document.getElementById('problemCode').addEventListener('click', () => toggleDisplay('.code'));
    // document.getElementById('5').addEventListener('click', () => placeNextDate());
    // document.getElementById('6').addEventListener('click', () => alternateDisplay());
    // document.getElementById('7').addEventListener('click', () => alternateDateDisplay());

}

function setDisplay(elementId, shouldShow) {
    
    var element = document.querySelector(elementId)

    if (!element) {
        console.error('Element not found');
        return;
    }

    // Check whether to show or hide the element
    if (shouldShow && element.style.display === 'none') {
        // Show the element
        element.style.display = element.dataset.display || '';
    } 
    else if (!shouldShow && element.style.display != 'none') {
        // Hide the element and store its current display value
        element.dataset.display = element.style.display; // Store the current display value
        element.style.display = 'none'; // Hide the element
    }
}

function toggleDisplay(elementId) {
    // Get the element by its ID
    var element = document.querySelector(elementId)

    if (!element) {
        console.error('Element not found');
        return;
    }

    // Check the current display value
    if (element.style.display === 'none') {
        // If display is 'none', set it to its default display value
        element.style.display = element.dataset.display || '';
    } else {
        // If display is not 'none', hide the element
        element.dataset.display = element.style.display; // Store the current display value
        element.style.display = 'none'; // Hide the element
    }
}

// Example usage:
// Assuming there is an element with the ID 'myElement' in your HTML
// toggleDisplay('myElement');
