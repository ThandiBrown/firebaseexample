

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider,
  setPersistence, browserLocalPersistence, onAuthStateChanged, signOut,
  getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";



async function initializeFirebase() {
  // Firebase configuration
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
  const auth = getAuth(app);

  // logOut(auth);
  // return;

  // Set persistence to browser local storage
  await setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return new Promise((resolve, reject) => {
        // Listen for authentication state changes
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log("User is signed in:", user.email);
            resolve(); // Resolve the promise if the user is signed in
          } else {
            console.log("No user is signed in");

            // Prompt for password
            const userInput = prompt("Please enter your password:");
            if (userInput !== null) {
              console.log("User entered: " + userInput);
              try {
                // Sign in the user
                await signInWithEmailAndPassword(auth, 'biras64482@edectus.com', userInput);
                resolve(); // Resolve the promise if sign-in is successful
              } catch (error) {
                console.error("Error during sign-in:", error);
                reject(error); // Reject the promise if there is an error
              }
            } else {
              console.log("User canceled the prompt");
              reject(new Error("User canceled the prompt"));
            }
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
      throw error; // Rethrow the error if persistence setup fails
    });
}




// Sign-up function
function signUp(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}

// Sign-in function
function signIn(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Sign-out function
function logOut(auth) {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
}


export {
  initializeFirebase,
  signUp,
  signIn,
  logOut
}