import { readDB, writeDB } from './data/talkToDatabase.js'




// loadingSettings();

function loadingSettings() {
    
    quantity = {
        "mango": 3,
        "apple": 2,
        "passionfruit": 3
    }
    
    // writeDB({'info':JSON.stringify({})});
    readDB("", loadingPage);
}

function loadingPage(response) {
    console.log("response")
    console.log(response[0])

}


function process(e) {
    console.log(e.target.id);
    toggleDisplay(e.target.id + "-selected");
    toggleDisplay(e.target.id + "-quantity");
}

function toggleDisplay(id) {
  const el = document.getElementById(id);
  if (!el) return; // safety check

  if (el.style.display != "block") {
    el.style.display = "block"; // show it
  } else {
    el.style.display = "none"; // hide it
  }
}


document.getElementById("mango").addEventListener("click", (e) => process(e));
