import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {basePath} from '../main.js'; // assuming GLTFLoader and THREE are exported from main.js
export function loadGripModel(controllerGrip1, controllerGrip2) {
	const loader = new GLTFLoader().setPath(basePath);
	loader.load('low_poly_blue_handgun_pistol/scene.gltf', function (gltf) {
		gltf.scene.scale.set(0.1003, 0.1003, 0.1003);
		let mymodel = gltf.scene;
		mymodel.name = 'gripModel';
		mymodel.rotation.y = THREE.MathUtils.degToRad(-90);
		mymodel.rotation.x = THREE.MathUtils.degToRad(-30);

		// Move the model a little lower
		mymodel.position.set(0, -0.11, 0);

		// Add the model to the first controller
		controllerGrip1.add(mymodel);

		// Clone the model
		let mymodel2 = mymodel.clone();

		// Add the cloned model to the second controller
		controllerGrip2.add(mymodel2);
	});
}
