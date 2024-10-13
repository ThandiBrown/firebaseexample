// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
	getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider,
	setPersistence, browserLocalPersistence, onAuthStateChanged, signOut,
	getRedirectResult
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

function logOutUser() {
	const auth = getAuth(); // Initialize Firebase Auth instance

	signOut(auth)
		.then(() => {
			console.log("User signed out successfully.");
			// Optionally, you can redirect the user or update the UI
		})
		.catch((error) => {
			console.error("Error signing out:", error);
		});
}

function initializeFirebase() {
	return new Promise((resolve, reject) => {
		try {
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
			auth.languageCode = 'en';

			// signOut(auth)
			// 	.then(() => {
			// 		console.log("User signed out successfully.");
			// 		// Optionally, you can redirect the user or update the UI
			// 	})
			// 	.catch((error) => {
			// 		console.error("Error signing out:", error);
			// 	});

			// Check for authentication state changes
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// User is already signed in
					console.log('User is already signed in:', user.email);
					resolve(); // Ensure resolve is only called here when the user is already signed in
				} else {
					// Handle sign-in process
					setPersistence(auth, browserLocalPersistence)
						.then(() => {
							const provider = new GoogleAuthProvider();

							if (isMobile()) {
								console.log('You are on a mobile device');
								return signInWithRedirect(auth, provider); // Redirect for mobile
							} else {
								console.log('You are on a desktop or non-mobile device');
								return signInWithPopup(auth, provider); // Popup for non-mobile
							}
						})
						.then((result) => {
							// This block handles sign-in for non-redirect methods (e.g. desktop popup)
							if (result && result.user) {
								console.log('User signed in:', result.user.email);
								resolve();
							}
						})
						.catch((error) => {
							console.error('Error during sign-in:', error);
							reject(error); // Reject the promise if there is an error
						});
				}
			});

			// Handle redirects (if using signInWithRedirect)
			getRedirectResult(auth)
				.then((result) => {
					if (result && result.user) {
						console.log('User signed in with redirect:', result.user.email);
						resolve();
					}
				})
				.catch((error) => {
					console.error('Error getting redirect result:', error);
					reject(error); // Handle errors during the redirect process
				});

		} catch (error) {
			reject(error); // Reject the promise if something goes wrong
		}
	});
}


function isMobile() {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Check for Android
	if (/android/i.test(userAgent)) {
		return true;
	}

	// Check for iOS devices
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return true;
	}

	return false;
}


export {
	initializeFirebase
}