import {interactionGroup, raycaster} from '../main.js';

export function getIntersections(controller) {
	controller.updateMatrixWorld();

	raycaster.setFromXRController(controller);

	return raycaster.intersectObjects(interactionGroup.children, true);
}
