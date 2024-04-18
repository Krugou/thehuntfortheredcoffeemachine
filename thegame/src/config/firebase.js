// Import the functions you need from the SDKs you need
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	// @ts-ignore
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	// @ts-ignore
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	// @ts-ignore
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
	// @ts-ignore
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	// @ts-ignore
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
	// @ts-ignore
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
