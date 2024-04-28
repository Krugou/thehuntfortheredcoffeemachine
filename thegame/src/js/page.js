import 'firebase/firestore';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import {renderer, start, startVR} from './main';

import {initializeApp} from 'firebase/app';
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
} from 'firebase/firestore';
// Initialize Firebase
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};
console.log(import.meta.env.VITE_APP_FIREBASE_API_KEY);
console.log(import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN);
console.log(import.meta.env.VITE_APP_FIREBASE_PROJECT_ID);
console.log(import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET);
console.log(import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log(import.meta.env.VITE_APP_FIREBASE_APP_ID);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a reference to the body element
const body = document.querySelector('body');
body.className = 'h-screen w-screen';
// Create a container div
const div = document.createElement('div');
div.className =
	' text-black dark:bg-black bg-white dark:text-white   flex justify-center items-center flex-col h-screen w-screen';

// Create a new element
const title = document.createElement('h1');
title.textContent = 'the Hunt for the Red Coffee Machine';

// Add Tailwind CSS classes to the title
title.className = 'text-4xl text-green dark:text-slate-500 text-center mt-5 ';
div.appendChild(title);

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter username';
input.className =
	'text-center text-black dark:text-white text-white dark:bg-black mt-4';
input.style.margin = 'auto'; // Center the input field

// Add an event listener to the input field
input.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		const userName = input.value;
		console.log('🚀 ~ userName:', userName);
		addUserToFirestore(userName);
		// Remove input field after user has entered their name
		input.remove();
		start();
		// Add VRButton after user has entered their name
		div.appendChild(VRButton.createButton(renderer));
		startVR();
	}
});

div.appendChild(input);
// Append the new element to the body
body.appendChild(div);
async function addUserToFirestore(userName) {
	try {
		await addDoc(collection(db, 'users'), {
			name: userName,
			startTime: serverTimestamp(),
		});
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}
