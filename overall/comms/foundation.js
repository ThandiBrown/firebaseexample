// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
	getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider,
	setPersistence, browserLocalPersistence, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


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
	authenticate(app);
}

function authenticate(app) {
	const auth = getAuth(app);
	auth.languageCode = 'en';

	// const user = auth.currentUser;

	// Listen for changes in the authentication state
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, no need to re-authenticate
			console.log('User is already signed in:', user.email);
		} else {
			// No user is signed in, proceed with Google login
			setPersistence(auth, browserLocalPersistence)
				.then(() => {
					const provider = new GoogleAuthProvider();
					return signInWithRedirect(auth, provider);
				})
				.then((result) => {
					// The signed-in user info can be accessed here
					console.log('User signed in:', result.user.email);
				})
				.catch((error) => {
					// Handle errors here
					console.error('Error during sign-in:', error);
				});
		}
	});

}


export {
	initializeFirebase
}