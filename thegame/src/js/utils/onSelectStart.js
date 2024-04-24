import {getIntersections} from './getIntersections.js';

export function onSelectStart(event) {
	const controller = event.target;

	const intersections = getIntersections(controller);

	if (intersections.length > 0) {
		const intersection = intersections[0];

		const object = intersection.object;
		object.material.emissive.b = 1;
		controller.attach(object);

		controller.userData.selected = object;
	}

	controller.userData.targetRayMode = event.data.targetRayMode;
}
