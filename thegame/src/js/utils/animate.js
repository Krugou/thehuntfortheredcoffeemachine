import * as THREE from 'three';
import {
	ambientLight,
	camera,
	controller1,
	controller2,
	controls,
	flicker,
	renderer,
	scene,
} from '../main.js';
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
		if (flicker) {
			ambientLight.intensity = Math.abs(
				Math.sin(clock.getElapsedTime() * Math.PI),
			);
		} else {
			ambientLight.intensity = 0;
		}

		renderer.render(scene, camera);
	});
}
