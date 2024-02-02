import { readDB, writeDB } from './data/talkToDatabase.js'




loadingSettings();

function loadingSettings() {
    readDB("", loadingPage);
}

function loadingPage(response) {
    console.log("response")
    console.log(response)
    console.log(JSON.parse(response.info));

}