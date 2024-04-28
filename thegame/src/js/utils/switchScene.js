import * as THREE from 'three';
import {scene} from '../main';
import {loadmodels} from './loadmodels';

export function switchScene(targetScene) {
	console.log('🚀 ~ switchScene ~ targetScene:', targetScene);
	// Clear the current scene
	for (let i = scene.children.length - 1; i >= 0; i--) {
		const object = scene.children[i];
		// Skip if the object is a light or an AxesHelper
		if (object instanceof THREE.Light || object instanceof THREE.AxesHelper) {
			continue;
		}
		// If the object is teleportgroup, noteleportgroup, or interactiongroup, remove its children
		if (
			object.name === 'Teleport-Group' ||
			object.name === 'NoTeleport-Group' ||
			object.name === 'Interaction-Group'
		) {
			while (object.children.length > 0) {
				object.remove(object.children[0]);
			}
			continue;
		}
		scene.remove(object);
	}
	setTimeout(() => loadmodels(targetScene), 3000);
}
