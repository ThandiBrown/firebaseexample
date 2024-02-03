import { familyData } from './stats.js'
import { readDB, writeDB } from './data/talkToDatabase.js'




// function loadingSettings() {
    
//     // writeDB({'info':JSON.stringify({})});
//     readDB("", loadingPage);
// }

// function loadingPage(response) {
//     console.log("response")
//     console.log(response[0])

// }

function go(startPoint = 'd') {
    clearPlayPage();
    let familyDataDB = familyData();
    
    if (startPoint in familyDataDB) {
        let boxes = '';
        if (familyDataDB[startPoint].parents.length > 0) {
            for (let parent of familyDataDB[startPoint].parents) {
                boxes += returnPersonBox(parent);
            }
            document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);
        }
        
        if (familyDataDB[startPoint]) {
            let boxes = returnPersonBox(startPoint, true);
            // siblings
            if (familyDataDB[startPoint].parents.length > 0) {
                
                for (let parent of familyDataDB[startPoint].parents) {
                    for (let sibling of familyDataDB[parent].children) {
                        if (sibling == startPoint) continue;
                        boxes += returnPersonBox(sibling);
                    }
                }
            }
            document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);
        }
        
        if (familyDataDB[startPoint].children.length > 0) {
            let boxes = '';
            for (let child of familyDataDB[startPoint].children) {
                boxes += returnPersonBox(child);
            }
            document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);
        }
    }
    addEventListeners();
}

function returnDisplayRow(boxes) {
    return '<div class="display-row flex-container row-style">' + boxes + '</div>'
}

function returnPersonBox(personInfo, highlight=false) {
    let highlightClass = '';
    if (highlight) highlightClass = ' current-person'
    return '<div class="person-box' + highlightClass + '">' + personInfo + '</div>'
}

function addEventListeners() {
    for (let element of document.querySelectorAll('.person-box')) {
        element.addEventListener('click', (e) => go(e.target.innerText));
    }
}

function clearPlayPage() {
    document.querySelector(".play-page").innerHTML = '';
}

go();