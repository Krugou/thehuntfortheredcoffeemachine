import {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import {renderer, scene, start, startVR} from './main';
import {displayHighScores} from './utils/scoreSystem';
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
export let userDocId;

// Get a reference to the body element
const body = document.querySelector('body');
body.className =
	'h-screen w-screen bg-gray-100 flex items-center justify-center';

// Create a container div
const div = document.createElement('div');
div.className = 'bg-white rounded-lg shadow-lg p-10 text-center';

// Create a new element
const title = document.createElement('h1');
title.textContent = 'The Hunt for the Red Coffee Machine';

// Add Tailwind CSS classes to the title
title.className = 'text-4xl text-red-500 mb-5';
div.appendChild(title);

// Create an input container
const inputDiv = document.createElement('div');
inputDiv.className = 'flex justify-center items-center space-x-4';

// Create an input field
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter desired nickname';
input.className =
	'border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ';

// Create a button
const button = document.createElement('button');
button.textContent = 'Start';
button.className =
	'bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-800';

// Add an event listener to the button
button.addEventListener('click', startGame);

// Add an event listener to the input field
input.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		startGame();
	}
});

inputDiv.appendChild(input);
inputDiv.appendChild(button);
div.appendChild(inputDiv);
body.appendChild(div);
function startGame() {
	if (input.value === '') {
		alert('Please enter a nickname');
		return;
	}
	const nickName = input.value;
	addUserToFirestore(nickName);
	// Remove input field and button after user has entered their name
	input.remove();
	button.remove();
	start();
	startVR();
	// Add VRButton after user has entered their name
	const vrButton = VRButton.createButton(renderer);
	div.appendChild(vrButton);

	// Check if VR is supported
	navigator.xr.isSessionSupported('immersive-vr').then(supported => {
		if (supported) {
			// Enter VR mode after user has entered their name
			navigator.xr
				.requestSession('immersive-vr', {
					optionalFeatures: ['local-floor', 'bounded-floor'],
				})
				.then(session => {
					renderer.xr.setSession(session);
				});
		} else {
			console.error('VR not supported');
		}
	});
}

async function addUserToFirestore(nickName) {
	try {
		const docRef = await addDoc(collection(db, 'highscores'), {
			nickName: nickName,
			startTime: serverTimestamp(),
			endTime: serverTimestamp(),
			score: 0,
		});

		// Get the document ID
		userDocId = docRef.id;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}
export async function updateEndTimeAndCalculateScoreFromStartTimeAndEndTime() {
	try {
		const userRef = doc(db, 'highscores', userDocId);

		// Update the end time in the document
		await updateDoc(userRef, {
			endTime: serverTimestamp(),
		});

		// Get the updated document
		const userDoc = await getDoc(userRef);

		const score = calculateScore(
			userDoc.data().startTime,
			userDoc.data().endTime,
		);

		// Update the score in the document
		await updateDoc(userRef, {
			score: score,
		});
	} catch (e) {
		console.error('Error updating document: ', e);
	}
}
export async function getScoresFromFirebaseStart() {
	displayHighScores(scene, db);
}
function calculateScore(startTime, endTime) {
	// Replace this with your score calculation logic
	return endTime.seconds - startTime.seconds;
}
