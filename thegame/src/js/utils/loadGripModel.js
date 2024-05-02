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

		// Add the model to the first controller
		controllerGrip1.add(mymodel);

		// Clone the model
		let mymodel2 = mymodel.clone();

		// Add the cloned model to the second controller
		controllerGrip2.add(mymodel2);
	});
}
