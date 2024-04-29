import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
import {
	basePath,
	camera,
	interactionGroup,
	noTeleportGroup,
	renderer,
	scene,
	teleportGroup,
} from '../main.js';

async function loadModel(loader, modelPath, position, teleportEnabled = false) {
	loader.load(modelPath, async function (gltf) {
		const model = gltf.scene;
		model.position.set(...position);
		if (teleportEnabled && modelPath.includes('floor')) {
			console.log('teleport');
			teleportGroup.add(model);
		} else {
			console.log('noTeleport');
			noTeleportGroup.add(model);
		}
		await renderer.compileAsync(model, camera, scene);
	});
}
export function loadmodels(target) {
	if (target === '7th-floor') {
		new RGBELoader().setPath(basePath).load('hdr/office.hdr', function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
			renderer.toneMappingExposure = 10.0;
			const loader = new GLTFLoader().setPath(basePath);
			loadModel(loader, 'floors/7thfloor/7thfloor.gltf', [0, 0, 0], true);
			loadModel(loader, 'floors/7thfloor/7thwalls.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/7thfloor/7thdoors.gltf', [0, 0, 0]);
			// loadModel(loader, 'floors/7thfloor/extraStuff.gltf', [0, 0, 0]);
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
				// clonedModel.position.z += 2.75; // adjust the value as needed
				clonedModel.position.set(0, 0, 0);
				clonedModel.children[0].name = '7th-floor';
				console.log(clonedModel);
				interactionGroup.add(clonedModel);

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
	if (target === '2th-floor') {
		new RGBELoader().setPath(basePath).load('hdr/office.hdr', function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
			renderer.toneMappingExposure = 10.0;
			const loader = new GLTFLoader().setPath(basePath);
			loadModel(loader, 'floors/2ndfloor/2thfloor.gltf', [0, 0, 0], true);

			// loader.load('objects/tuoli/tuoli.gltf', async function (gltf) {
			// 	const model = gltf.scene;

			// 	model.position.set(11, 0, -15);

			// 	scene.add(model);
			// 	const clonedModel = model.clone();
			// 	clonedModel.position.z += 2.75; // adjust the value as needed
			// 	scene.add(clonedModel);

			// 	await renderer.compileAsync(model, camera, scene);
			// });
			loader.load('objects/sohva/sohva.gltf', async function (gltf) {
				const model = gltf.scene;
				// x-axis (left/right), y-axis (up/down), z-axis (forward/backward)

				model.position.set(3, -0.5, -4);
				model.rotation.set(0, 3.1, 0.05);
				scene.add(model);
				const clonedModel = model.clone();
				// clonedModel.position.z += 2.75; // adjust the value as needed

				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/smalldesk/smalldesk.gltf', async function (gltf) {
				const model = gltf.scene;
				// x-axis (left/right), y-axis (up/down), z-axis (forward/backward)

				model.position.set(-14, 0, 14);
				scene.add(model);
				const clonedModel = model.clone();
				// clonedModel.position.z += 2.75; // adjust the value as needed
				clonedModel.position.set(0, 0, 0);
				clonedModel.children[0].name = '2th-floor';
				console.log(clonedModel);
				interactionGroup.add(clonedModel);

				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/hissi/hissi.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(15, 0, 17);

				scene.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				scene.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				scene.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/tuoli/tuoli.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(-8, 0, 10);

				scene.add(model);
				await renderer.compileAsync(model, camera, scene);
			});
		});
	}
}
