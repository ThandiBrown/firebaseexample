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

function go() {
    let familyDataDB = familyData();
    let startPoint = 'd';
    
    if (startPoint in familyDataDB) {
        let boxes = '';
        if (familyDataDB[startPoint].parents.length > 0) {
            for (let parent of familyDataDB[startPoint].parents) {
                boxes += returnPersonBox(parent);
            }
            document.querySelector(".play-page").innerHTML += returnDisplayRow(boxes);
        }
        // siblings
        if (familyDataDB[startPoint].parents.length > 0) {
            let boxes = returnPersonBox(startPoint);
            for (let parent of familyDataDB[startPoint].parents) {
                for (let sibling of familyDataDB[parent].children) {
                    if (sibling == startPoint) continue;
                    boxes += returnPersonBox(sibling);
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
}

function returnDisplayRow(boxes) {
    return '<div class="display-row flex-container row-style">' + boxes + '</div>'
}

function returnPersonBox(personInfo) {
    return '<div class="person-box">' + personInfo + '</div>'
}

// go();