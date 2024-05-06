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
import {displayHighScores, getHighScores} from './utils/scoreSystem';
// Initialize Firebase
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};
/*
console.log(import.meta.env.VITE_APP_FIREBASE_API_KEY);
console.log(import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN);
console.log(import.meta.env.VITE_APP_FIREBASE_PROJECT_ID);
console.log(import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET);
console.log(import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log(import.meta.env.VITE_APP_FIREBASE_APP_ID);
*/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export let userDocId;

// Get a reference to the body element
const body = document.querySelector('body');
body.className =
	'h-screen w-screen bg-gray-100 flex items-center justify-center';

// Create a container div
const div = document.createElement('div');
div.className = 'bg-white rounded-lg shadow-lg p-10 text-center border-t-8 border-red-500';

// Create a new element
const title = document.createElement('h1');
title.textContent = 'The Hunt For The Red Coffee Machine';

const wrapper = document.createElement('div');
wrapper.className = 'flex flex-col items-center';

const title2 = document.createElement('p');
title2.textContent = 'How-to-Play:';
title2.className = 'font-bold text-2xl pb-4 text-left w-3/4';
const instructions = document.createElement('p');
instructions.innerHTML =
	'The goal of the game is to locate the <span class="text-red-500 font-bold">red</span> coffee machine so your cup can be happy. ☕ <br>';
instructions.className = 'text-base mb-3 text-left w-3/4';

const instructions2 = document.createElement('ul');
instructions2.innerHTML = `
  <li class="pb-2">Move between floors by using the elevator buttons. Activate the buttons using the <span class="font-bold">trigger button</span> on your controller.</li>
  <li>Teleport to different locations within the same floor using the <span class="font-bold">squeeze button</span> on your controller.</li>
`;
instructions2.classList='list-disc list-inside text-base text-left mb-5 w-3/4';

// Add Tailwind CSS classes to the title
title.className = 'text-4xl text-red-500 mb-5 font-bold';
div.appendChild(title);
div.appendChild(wrapper);
wrapper.appendChild(title2);
wrapper.appendChild(instructions);
wrapper.appendChild(instructions2);

// Create an input container
const inputDiv = document.createElement('div');
inputDiv.className = 'flex justify-center space-x-4 mb-5';

// Create an input field
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter desired nickname';
input.className =
	'border border-gray-300 rounded-lg p-5 focus:outline-none focus:ring-2 focus:ring-red-500 ';

// Create a button
const button = document.createElement('button');
button.textContent = 'Start';
button.className =
	'bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-800 font-bold uppercase';

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
wrapper.appendChild(inputDiv);
const highScoresList = document.createElement('ul');
highScoresList.className = 'text-center m-2 list-decimal';
const lifirst = document.createElement('p');
lifirst.textContent = 'High Scores:';
lifirst.className='text-2xl font-bold pb-2';
highScoresList.appendChild(lifirst);
getHighScores(db).then(scores => {
	scores.forEach(score => {
		const li = document.createElement('li');
		li.innerHTML = `${score.nickName}: <span class="text-red-500"> ${score.score} seconds</span>`;
		li.className = 'text-left';
		highScoresList.appendChild(li);
	});
});
wrapper.appendChild(highScoresList);

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
		});

		// Get the document ID
		userDocId = docRef.id;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}
export let score 
export async function updateEndTimeAndCalculateScoreFromStartTimeAndEndTime() {
	try {
		const userRef = doc(db, 'highscores', userDocId);

		// Update the end time in the document
		await updateDoc(userRef, {
			endTime: serverTimestamp(),
		});

		// Get the updated document
		const userDoc = await getDoc(userRef);

		score = calculateScore(
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