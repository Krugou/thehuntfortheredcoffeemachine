import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
import {basePath, camera, renderer, scene, teleportgroup} from '../main.js';

async function loadModel(loader, modelPath, position, teleportEnabled = false) {
	loader.load(modelPath, async function (gltf) {
		const model = gltf.scene;
		model.position.set(...position);
		if (teleportEnabled) {
			teleportgroup.add(model);
		} else {
			scene.add(model);
		}
		await renderer.compileAsync(model, camera, scene);
	});
}
export function loadmodels() {
	new RGBELoader().setPath(basePath).load('hdr/Scenery.hdr', function (texture) {
		texture.mapping = THREE.EquirectangularReflectionMapping;

		scene.background = texture;
		scene.environment = texture;
		renderer.toneMappingExposure = 10.0;
		const loader = new GLTFLoader().setPath(basePath);
		loadModel(loader, 'floors/7thfloor/7thfloor.gltf', [0, 0, 0], true);
		loadModel(loader, 'floors/7thfloor/7thwalls.gltf', [0, 0, 0]);
		loadModel(loader, 'floors/7thfloor/7thdoors.gltf', [0, 0, 0]);
		loadModel(loader, 'objects/kitchen/kitchen.gltf', [0, 0, 0]);

		// loader.load('objects/tuoli/tuoli.gltf', async function (gltf) {
		// 	const model = gltf.scene;

		// 	model.position.set(11, 0, -15);

		// 	scene.add(model);
		// 	const clonedModel = model.clone();
		// 	clonedModel.position.z += 2.75; // adjust the value as needed
		// 	scene.add(clonedModel);

		// 	await renderer.compileAsync(model, camera, scene);
		// });
		loader.load('objects/smalldesk/smalldesk.gltf', async function (gltf) {
			const model = gltf.scene;
			// x-axis (left/right), y-axis (up/down), z-axis (forward/backward)

			model.position.set(10, 0, -10);
			scene.add(model);
			const clonedModel = model.clone();
			clonedModel.position.z += 2.75; // adjust the value as needed
			scene.add(clonedModel);

			await renderer.compileAsync(model, camera, scene);
		});
		loader.load('objects/hissi/hissi.gltf', async function (gltf) {
			const model = gltf.scene;

			model.position.set(0, 0, 0);
			scene.add(model);
			const clonedModel = model.clone();
			clonedModel.position.z -= 2.75; // adjust the value as needed
			scene.add(clonedModel);
			const anotherClonedModel = clonedModel.clone();
			anotherClonedModel.position.z -= 2.75; // adjust the value as needed
			scene.add(anotherClonedModel);
			await renderer.compileAsync(model, camera, scene);
		});
	});
}
