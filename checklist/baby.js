import { readDB, writeDB } from './data/talkToDatabase.js'




loadingSettings();

function loadingSettings() {
    readDB("", loadingPage);
}

function loadingPage(response) {
    console.log("response:" + JSON.stringify(response));

}