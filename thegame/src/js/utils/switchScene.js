import * as THREE from 'three';
import {renderer, scene} from '../main';
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
	// choose the starting location based on the target scene
	let startRotation = new THREE.Quaternion();
	let startLocation;
	switch (targetScene) {
		case '2nd-floor':
			startLocation = {
				x: 0,
				y: 0,
				z: 0,
				w: 1,
			};
			break;
		case '5th-floor':
			startLocation = {
				x: 0,
				y: 0,
				z: 0,
				w: 1,
			};
			break;
		case '6th-floor':
			startLocation = {
				x: 0,
				y: 0,
				z: 0,
				w: 1,
			};
			break;
		case '7th-floor':
			startLocation = {
				x: 0,
				y: 0,
				z: 0,
				w: 1,
			};
			break;
		default:
			startLocation = {
				x: -1,
				y: 0,
				z: 0,
				w: 1,
			};
	}

	// Set the reference space
	const baseReferenceSpace = renderer.xr.getReferenceSpace();
	const transform = new XRRigidTransform(startLocation, startRotation);
	const beginningSpot = baseReferenceSpace.getOffsetReferenceSpace(transform);
	renderer.xr.setReferenceSpace(beginningSpot);
	setTimeout(() => loadmodels(targetScene), 100);
}
