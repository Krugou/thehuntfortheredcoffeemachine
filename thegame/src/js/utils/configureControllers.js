import * as THREE from 'three';
import {renderer, scene} from '../main.js';
import {loadGripModel} from './loadGripModel.js';
export function configureControllers(
	controller1,
	controller2,
	controllerGrip1,
	controllerGrip2,
) {
	// Create and configure the grip for the first controller
	controllerGrip1 = renderer.xr.getControllerGrip(0);

	// Add the grip to the scene
	scene.add(controllerGrip1);

	// Create and configure the grip for the second controller
	controllerGrip2 = renderer.xr.getControllerGrip(1);

	scene.add(controllerGrip2);
	loadGripModel(controllerGrip1, controllerGrip2);

	// Create a line geometry
	const geometry = new THREE.BufferGeometry().setFromPoints([
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, -1),
	]);

	// Create a line using the geometry
	const line = new THREE.Line(geometry);
	line.name = 'line';
	line.scale.z = 5;

	// Add a clone of the line to each controller
	controller1.add(line.clone());
	controller2.add(line.clone());
}
