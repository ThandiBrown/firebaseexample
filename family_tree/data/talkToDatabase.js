
import { getDatabase, set, ref, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt5E7wCHIyhjJH_X6sYHYTQazkqgvrf8c",
  authDomain: "chatapp-bce24.firebaseapp.com",
  projectId: "chatapp-bce24",
  storageBucket: "chatapp-bce24.appspot.com",
  messagingSenderId: "128044238435",
  appId: "1:128044238435:web:32493c2367afdf733a9a56",
  measurementId: "G-P74SQZ7CKC",
  databaseURL: "https://chatapp-bce24-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
initializeApp(firebaseConfig);


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