import {getIntersections} from './getIntersections.js';
import {switchScene} from './switchScene.js';
export function onSelectStart(event) {
	console.log('onSelectStart');
	const controller = event.target;

	const intersections = getIntersections(controller);

	if (intersections.length > 0) {
		const intersection = intersections[0];
		console.log('🚀 ~ onSelectStart ~ intersection:', intersection);
		if (intersection.object.parent.name === '7th-floor') {
			console.log('7th-floor');
			switchScene('7th-floor');
		}
		const object = intersection.object;
		object.material.emissive.b = 1;
		controller.attach(object);

		controller.userData.selected = object;
	}

	controller.userData.targetRayMode = event.data.targetRayMode;
}
