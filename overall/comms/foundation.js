// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


function initializeFirebase() {
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
  // const analytics = getAnalytics(app);
}

export {
  initializeFirebase
}