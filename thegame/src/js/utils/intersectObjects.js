import {intersected} from '../main.js';
import {getIntersections} from './getIntersections.js';

export function intersectObjects(controller) {
	// Do not highlight in mobile-ar
	if (controller.userData.targetRayMode === 'screen') return;

	// Do not highlight when already selected
	if (controller.userData.selected !== undefined) return;

	const line = controller.getObjectByName('line');
	const intersections = getIntersections(controller);

	if (intersections.length > 0) {
		const intersection = intersections[0];

		const object = intersection.object;
		object.material.emissive.r = 1;
		intersected.push(object);

		line.scale.z = intersection.distance;
	} else {
		line.scale.z = 5;
	}
}
