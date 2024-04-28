import {
	controller1,
	controller2,
	marker,
	noTeleportGroup,
	raycaster,
	teleportGroup,
	tempMatrix,
} from '../main.js'; // assuming these are exported from main.js

export let INTERSECTION;

export function moveMarker() {
	INTERSECTION = undefined;
	if (controller1.userData.isSqueezing === true) {
		tempMatrix.identity().extractRotation(controller1.matrixWorld);
		raycaster.ray.origin.setFromMatrixPosition(controller1.matrixWorld);
		raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
		const intersects = raycaster.intersectObjects(
			[...teleportGroup.children, ...noTeleportGroup.children],
			true,
		);
		if (intersects.length > 0) {
			INTERSECTION = intersects[0].point;
		}
	} else if (controller2.userData.isSqueezing === true) {
		tempMatrix.identity().extractRotation(controller2.matrixWorld);
		raycaster.ray.origin.setFromMatrixPosition(controller2.matrixWorld);
		raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
		const intersects = raycaster.intersectObjects(
			[...teleportGroup.children, ...noTeleportGroup.children],
			true,
		);
		if (intersects.length > 0) {
			INTERSECTION = intersects[0].point;
			// fix the y-axis to 0
			INTERSECTION.y = 0;
		}
	}
	if (INTERSECTION) marker.position.copy(INTERSECTION);
	marker.visible = INTERSECTION !== undefined;
}
