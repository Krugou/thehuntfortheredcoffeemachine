import {interactionGroup} from '../main.js'; // assuming group is exported from main.js

export function onSelectEnd(event) {
	const controller = event.target;

	if (controller.userData.selected !== undefined) {
		const object = controller.userData.selected;
		object.material.emissive.b = 0;
		interactionGroup.attach(object);

		controller.userData.selected = undefined;
	}
}
