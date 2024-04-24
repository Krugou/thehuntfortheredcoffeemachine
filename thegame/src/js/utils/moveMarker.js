import {
	controller1,
	controller2,
	marker,
	raycaster,
	teleportgroup,
	tempMatrix,
} from '../main.js'; // assuming these are exported from main.js
export let INTERSECTION;
export function moveMarker() {
	INTERSECTION = undefined;
	if (controller1.userData.isSqueezing === true) {
		tempMatrix.identity().extractRotation(controller1.matrixWorld);
		raycaster.ray.origin.setFromMatrixPosition(controller1.matrixWorld);
		raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
		const intersects = raycaster.intersectObjects(teleportgroup.children, true);
		if (intersects.length > 0) {
			INTERSECTION = intersects[0].point;
			console.log(intersects[0]);
			console.log(INTERSECTION);
		}
	} else if (controller2.userData.isSqueezing === true) {
		tempMatrix.identity().extractRotation(controller2.matrixWorld);
		raycaster.ray.origin.setFromMatrixPosition(controller2.matrixWorld);
		raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
		const intersects = raycaster.intersectObjects(teleportgroup.children, true);
		if (intersects.length > 0) {
			INTERSECTION = intersects[0].point;
		}
	}
	if (INTERSECTION) marker.position.copy(INTERSECTION);
	marker.visible = INTERSECTION !== undefined;
}
