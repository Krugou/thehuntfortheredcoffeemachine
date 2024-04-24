import * as THREE from 'three';
import {baseReferenceSpace, renderer} from '../main.js';
import {INTERSECTION} from './moveMarker.js';
export function onSqueezeStart() {
	this.userData.isSqueezing = true;
	console.log('Controller squeeze started');
}

export function onSqueezeEnd() {
	this.userData.isSqueezing = false;
	console.log('squeezeend');
	if (INTERSECTION) {
		const offsetPosition = {
			x: -INTERSECTION.x,
			y: -INTERSECTION.y,
			z: -INTERSECTION.z,
			w: 1,
		};
		const offsetRotation = new THREE.Quaternion();
		const transform = new XRRigidTransform(offsetPosition, offsetRotation);
		const teleportSpaceOffset =
			baseReferenceSpace.getOffsetReferenceSpace(transform);
		renderer.xr.setReferenceSpace(teleportSpaceOffset);
	}
}
