// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


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

	const user = auth.currentUser;


	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			console.log("user"); console.log(user);
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			console.log('error');
		});
}


export {
	initializeFirebase
}