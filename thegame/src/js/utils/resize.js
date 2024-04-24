import {camera, renderer} from '../main.js';
/**
 * Resizes the camera and renderer based on the window dimensions.
 */
export function resize() {
	// Update the camera's aspect ratio based on the new window dimensions
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// Update the renderer's size based on the new window dimensions
	renderer.setSize(window.innerWidth, window.innerHeight);
}
