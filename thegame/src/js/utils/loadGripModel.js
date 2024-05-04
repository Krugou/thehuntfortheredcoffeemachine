import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {basePath} from '../main.js'; // assuming GLTFLoader and THREE are exported from main.js
export function loadGripModel(controllerGrip1, controllerGrip2) {
	const loader = new GLTFLoader().setPath(basePath);
	//loader.load('low_poly_blue_handgun_pistol/scene.gltf', function (gltf) {
	loader.load('cup/scene.gltf', function (gltf) {
		//gltf.scene.scale.set(0.1003, 0.1003, 0.1003);
		gltf.scene.scale.set(0.05, 0.05, 0.05);
		let mymodel = gltf.scene;
		mymodel.name = 'gripModel';
		mymodel.rotation.y = THREE.MathUtils.degToRad(-65);
		mymodel.rotation.x = THREE.MathUtils.degToRad(-80);
		mymodel.rotation.z = THREE.MathUtils.degToRad(-5);

		// Move the model a little lower
		mymodel.position.set(0, 0, 0);

		let mymodel2 = mymodel.clone();
		// Add the model to the first controller
		controllerGrip1.add(mymodel);
		// Create a directional light
		// Create a directional light
		const light = new THREE.SpotLight(0xffffff, 0.9);
		light.position.set(0, 0, 0);
		light.angle = Math.PI / 2; // Narrow the light cone
		light.penumbra = 0.2; // Controls the softness of the light's edge
		light.decay = 1; // Controls how the light intensity decreases over distance
		light.distance = 50;

		// Create a new Object3D to serve as the light's target
		const target = new THREE.Object3D();

		// Position the target in front of the light along the z-axis
		target.position.set(0, 0, -1);

		// Set the light's target
		light.target = target;

		controllerGrip2.add(light);

		// Add the target to the controllerGrip2 so it moves with the light
		controllerGrip2.add(light.target);

		// Add the cloned model to the second controller
		controllerGrip2.add(mymodel2);
	});
}
