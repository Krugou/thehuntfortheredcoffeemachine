import * as THREE from 'three';
import {
	camera,
	controller1,
	controller2,
	controls,
	directionalLight,
	renderer,
	scene,
} from '../main.js'; // assuming these are exported from main.js
import {cleanIntersected} from './cleanIntersected.js';
import {intersectObjects} from './intersectObjects.js';
import {moveMarker} from './moveMarker.js';
export let clock = new THREE.Clock();
/**
 * Animates the scene.
 */
export function animate() {
	renderer.setAnimationLoop(function () {
		cleanIntersected();
		intersectObjects(controller1);
		intersectObjects(controller2);
		moveMarker();
		controls.update();

		if (directionalLight) {
			directionalLight.position.x = Math.sin(clock.getElapsedTime()) * 0.02;
			directionalLight.position.z = Math.cos(clock.getElapsedTime()) * 0.02;
		}

		renderer.render(scene, camera);
	});
}
