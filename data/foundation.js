// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
