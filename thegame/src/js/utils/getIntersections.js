import {group, raycaster} from '../main.js'; // assuming raycaster and group are exported from main.js

export function getIntersections(controller) {
	controller.updateMatrixWorld();

	raycaster.setFromXRController(controller);

	return raycaster.intersectObjects(group.children, true);
}
