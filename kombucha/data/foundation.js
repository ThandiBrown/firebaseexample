

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
	getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider,
	setPersistence, browserLocalPersistence, onAuthStateChanged, signOut,
	getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { loadingSettings } from '../main.js'


async function initializeFirebase() {
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

	// Set persistence
	await setPersistence(auth, browserLocalPersistence);

	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				console.log("User is signed in:", user.email);
				loadingSettings();   // ✅ always run after login
				resolve();
			} else {
				console.log("No user is signed in");
				const userInput = prompt("Please enter your password:");
				if (userInput !== null) {
					try {
						await signInWithEmailAndPassword(
							auth,
							"tifemon954@bitfami.com",
							userInput.toLowerCase()
						);
						console.log("Sign-in successful");
						// loadingSettings();   // ✅ also run here
						resolve();
					} catch (error) {
						console.error("Error during sign-in:", error);
						reject(error);
					}
				} else {
					console.log("User canceled the prompt");
					reject(new Error("User canceled the prompt"));
				}
			}
		});
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

initializeFirebase();