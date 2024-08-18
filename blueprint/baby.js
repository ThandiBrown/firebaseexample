import { readDB, writeDB } from './data/talkToDatabase.js'




// loadingSettings();

function loadingSettings() {
    
    // writeDB({'info':JSON.stringify({})});
    readDB("", loadingPage);
}

function loadingPage(response) {
    console.log("response")
    console.log(response[0])

}