import {intersected} from '../main.js'; // assuming intersected is exported from main.js

export function cleanIntersected() {
	while (intersected.length) {
		const object = intersected.pop();
		object.material.emissive.r = 0;
	}
}
