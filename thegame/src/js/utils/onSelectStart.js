import {
	getScoresFromFirebaseStart,
	updateEndTimeAndCalculateScoreFromStartTimeAndEndTime,
} from '../page.js';
import {getIntersections} from './getIntersections.js';
import {switchScene} from './switchScene.js';
export function onSelectStart(event) {
	console.log('onSelectStart');
	const controller = event.target;
	const intersections = getIntersections(controller);

	if (intersections.length > 0) {
		const intersection = intersections[0];
		console.log('🚀 ~ onSelectStart ~ intersection:', intersection);
		const objectName = intersection.object.parent.name;
		switch (objectName) {
			case '7th-floor':
			case '2nd-floor':
			case '5th-floor':
			case '6th-floor':
				console.log(objectName);
				switchScene(objectName);
				break;
			case 'finalboss':
				console.log('finalboss');
				updateEndTimeAndCalculateScoreFromStartTimeAndEndTime();
				setTimeout(() => getScoresFromFirebaseStart(), 2000);
				break;
			default: {
				const object = intersection.object;
				object.material.emissive.b = 1;
				controller.attach(object);
				controller.userData.selected = object;
			}
		}
	}

	controller.userData.targetRayMode = event.data.targetRayMode;
}
