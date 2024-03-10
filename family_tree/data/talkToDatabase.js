
import { getDatabase, set, ref, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_VetYgcatX096x78XWbWycpqnoxDPnTU",
    authDomain: "thandihome-5cd92.firebaseapp.com",
    databaseURL: "https://thandihome-5cd92-default-rtdb.firebaseio.com",
    projectId: "thandihome-5cd92",
    storageBucket: "thandihome-5cd92.appspot.com",
    messagingSenderId: "45814184020",
    appId: "1:45814184020:web:e2644a5720b5f8254055c1"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);


let folderName = "newFolder"
const db = getDatabase();


function writeDB(value, subfolder='') {
    
    let divider = "/";
    set(ref(db, folderName + divider + subfolder), value)
        .then(() => {
            alert("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        })
        ;
}

function readDB(subfolder, method, ...args) {
    
    let divider = "/";
    if (subfolder == "") {
        divider = "";
    }

    const dbref = ref(db);

    return get(child(dbref, folderName + divider + subfolder))
        .then((snapshot) => {
            if (snapshot.exists()) {

                let taskInformation = snapshot.val();
                taskInformation = JSON.parse(taskInformation.info);
                method([taskInformation, ...args]);

            } else {
                method([{}, ...args]);

                // alert('No data found');
                // let good = {
                //     "info":JSON.stringify({})
                // }
                // writeDB(subfolder, good);
            }
        })
        .catch((error) => {
            alert('unsuccessful, error ' + error);
        });

}


export {
    writeDB,
    readDB
}