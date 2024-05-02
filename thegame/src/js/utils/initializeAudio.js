import * as THREE from 'three';
import {camera} from '../main.js'; // assuming THREE and camera are exported from main.js
export function initializeAudio() {
	// Create an AudioListener and add it to the camera
	const listener = new THREE.AudioListener();
	camera.add(listener);

	// Create a global audio source
	const sound = new THREE.Audio(listener);

	// Load a sound and set it as the Audio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load('sounds/ominous.mp3', function (buffer) {
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.5);
		sound.play();
	});
}
