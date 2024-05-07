import * as THREE from 'three';
import {
	baseReferenceSpace,
	noTeleportGroup,
	raycaster,
	renderer,
} from '../main.js';
import {INTERSECTION} from './moveMarker.js';
export function onSqueezeStart() {
	this.userData.isSqueezing = true;
	console.log('Controller squeeze started');
}

export function onSqueezeEnd() {
	this.userData.isSqueezing = false;
	console.log('squeezeend');
	if (INTERSECTION) {
		// Check if the intersection is within the noTeleportGroup
		const intersectsNoTeleport = raycaster.intersectObjects(
			noTeleportGroup.children,
			true,
		);
		if (
			intersectsNoTeleport.length > 0 &&
			intersectsNoTeleport[0].point.equals(INTERSECTION)
		) {
			// If it is, don't teleport
			return;
		}

		// Calculate the distance between the current position and the intersection
		const currentPosition = renderer.xr.getCamera().position;
		const distance = currentPosition.distanceTo(INTERSECTION);

		// If the distance is more than 2 meters, don't teleport
		if (distance > 6) {
			return;
		}

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
