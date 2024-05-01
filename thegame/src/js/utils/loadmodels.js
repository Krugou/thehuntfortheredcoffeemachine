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
		if (teleportEnabled) {
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
	if (target === '2nd-floor') {
		new RGBELoader().setPath(basePath).load('hdr/office.hdr', function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
			renderer.toneMappingExposure = 10.0;
			const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
			const light = new THREE.AmbientLight(0x404040); // soft white light
			scene.add(light, directionalLight);

			const loader = new GLTFLoader().setPath(basePath);
			loadModel(loader, 'floors/2ndfloor/2thfloor.gltf', [0, 0, 0], true);
			loadModel(loader, 'floors/2ndfloor/2thwalls.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/2ndfloor/2thdoors.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/2ndfloor/2thlockers.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/2ndfloor/2thpillars.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/2ndfloor/2thOutsideDoors.gltf', [0, 0, 0]);

			loader.load('objects/sohva/sohva.gltf', async function (gltf) {
				const model = gltf.scene;
				model.scale.set(0.5, 0.5, 0.5);
				model.rotation.set(0, 3.15, 0);
				model.position.set(3, 0.2, -4);
				noTeleportGroup.add(model);

				const clonedModel = model.clone();
				clonedModel.position.set(-3, 0.2, -4);
				clonedModel.rotation.set(0, 0, 0);
				noTeleportGroup.add(clonedModel);

				const anotherClonedModel = model.clone();
				anotherClonedModel.position.set(0, 0.2, 0);
				anotherClonedModel.rotation.set(0, 1.6, 0);
				noTeleportGroup.add(anotherClonedModel);

				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/smalldesk/smalldesk.gltf', async function (gltf) {
				const model = gltf.scene;
				// x-axis (left/right), y-axis (up/down), z-axis (forward/backward)

				model.position.set(-14, 0, 14);
				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				// clonedModel.position.z += 2.75; // adjust the value as needed
				clonedModel.position.set(0, 0, 0);
				noTeleportGroup.add(clonedModel);
				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/hissi/hissi.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(15, 0, 17);

				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissidown.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(15, 0, 17);

				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissiup.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(15, 0, 17);

				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				model.children[0].name = '5th-floor';
				clonedModel.children[0].name = '5th-floor';
				anotherClonedModel.children[0].name = '5th-floor';
				interactionGroup.add(model, clonedModel, anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/tuoli/tuoli.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(-8, 0, 11);
				model.scale.set(0.4, 0.4, 0.4);

				noTeleportGroup.add(model);
				await renderer.compileAsync(model, camera, scene);
			});
		});
	}
	if (target === '5th-floor') {
		new RGBELoader().setPath(basePath).load('hdr/office.hdr', function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
			renderer.toneMappingExposure = 10.0;
			const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
			const light = new THREE.AmbientLight(0x404040); // soft white light
			scene.add(light, directionalLight);
			const loader = new GLTFLoader().setPath(basePath);
			loadModel(loader, 'floors/5thfloor/5thfloor.gltf', [0, 0, 0], true);
			loadModel(loader, 'floors/5thfloor/5thwalls.gltf', [0, 0, 0]);
			loadModel(loader, 'objects/kitchen/kitchen.gltf', [-0.1, 0, -1.1]);

			loader.load('objects/hissi/hissi.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 1.5);

				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.5; // adjust the value as needed
				noTeleportGroup.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.5; // adjust the value as needed
				noTeleportGroup.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});

			loader.load('objects/hissi/hissiup.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 1.5);

				const clonedModel = model.clone();
				clonedModel.position.z -= 2.5; // adjust the value as needed

				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.5; // adjust the value as needed

				await renderer.compileAsync(model, camera, scene);
				model.children[0].name = '6th-floor';
				clonedModel.children[0].name = '6th-floor';
				anotherClonedModel.children[0].name = '6th-floor';
				interactionGroup.add(model, clonedModel, anotherClonedModel);
			});
			loader.load('objects/hissi/hissidown.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 1.5);

				const clonedModel = model.clone();
				clonedModel.position.z -= 2.5; // adjust the value as needed

				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.5; // adjust the value as needed

				await renderer.compileAsync(model, camera, scene);
				model.children[0].name = '2nd-floor';
				clonedModel.children[0].name = '2nd-floor';
				anotherClonedModel.children[0].name = '2nd-floor';
				interactionGroup.add(model, clonedModel, anotherClonedModel);
			});
		});
	}

	if (target === '6th-floor') {
		new RGBELoader().setPath(basePath).load('hdr/office.hdr', function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
			renderer.toneMappingExposure = 10.0;
			const loader = new GLTFLoader().setPath(basePath);
			const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
			const light = new THREE.AmbientLight(0x404040); // soft white light
			scene.add(light, directionalLight);
			loadModel(loader, 'floors/6thfloor/6thfloor.gltf', [0, 0, 0], true);
			loadModel(loader, 'floors/6thfloor/6thwalls.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/6thfloor/6thdoors.gltf', [0, 0, 0]);
			loadModel(loader, 'objects/kitchen/kitchen.gltf', [0, 0, 0]);

			loader.load('objects/smalldesk/smalldesk.gltf', async function (gltf) {
				const model = gltf.scene;
				// x-axis (left/right), y-axis (up/down), z-axis (forward/backward)

				model.position.set(10, 0, -10);
				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				// clonedModel.position.z += 2.75; // adjust the value as needed
				clonedModel.position.set(0, 0, 0);

				console.log(clonedModel);
				noTeleportGroup.add(clonedModel);

				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissi.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 0);

				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissidown.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 0);

				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				model.children[0].name = '5th-floor';
				clonedModel.children[0].name = '5th-floor';
				anotherClonedModel.children[0].name = '5th-floor';
				interactionGroup.add(model, clonedModel, anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissiup.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 0);

				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				model.children[0].name = '7th-floor';
				clonedModel.children[0].name = '7th-floor';
				anotherClonedModel.children[0].name = '7th-floor';
				interactionGroup.add(model, clonedModel, anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
		});
	}
	if (target === '7th-floor') {
		new RGBELoader().setPath(basePath).load('hdr/office.hdr', function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
			renderer.toneMappingExposure = 10.0;
			const loader = new GLTFLoader().setPath(basePath);
			const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
			const light = new THREE.AmbientLight(0x404040); // soft white light
			scene.add(light, directionalLight);
			loadModel(loader, 'floors/7thfloor/7thfloor.gltf', [0, 0, 0], true);
			loadModel(loader, 'floors/7thfloor/7thwalls.gltf', [0, 0, 0]);
			loadModel(loader, 'floors/7thfloor/7thdoors.gltf', [0, 0, 0]);
			// loadModel(loader, 'floors/7thfloor/extraStuff.gltf', [0, 0, 0]);
			loadModel(loader, 'objects/kitchen/kitchen.gltf', [0, 0, 0]);

			loader.load('objects/smalldesk/smalldesk.gltf', async function (gltf) {
				const model = gltf.scene;
				// x-axis (left/right), y-axis (up/down), z-axis (forward/backward)

				model.position.set(10, 0, -10);
				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				// clonedModel.position.z += 2.75; // adjust the value as needed
				clonedModel.position.set(0, 0, 0);
				clonedModel.children[0].name = '7th-floor';
				console.log(clonedModel);
				noTeleportGroup.add(clonedModel);

				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissi.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 0);

				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissidown.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 0);

				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed

				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed

				model.children[0].name = '6th-floor';
				clonedModel.children[0].name = '6th-floor';
				anotherClonedModel.children[0].name = '6th-floor';
				interactionGroup.add(model, clonedModel, anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
			loader.load('objects/hissi/hissiup.gltf', async function (gltf) {
				const model = gltf.scene;

				model.position.set(0, 0, 0);

				noTeleportGroup.add(model);
				const clonedModel = model.clone();
				clonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(clonedModel);
				const anotherClonedModel = clonedModel.clone();
				anotherClonedModel.position.z -= 2.75; // adjust the value as needed
				noTeleportGroup.add(anotherClonedModel);
				await renderer.compileAsync(model, camera, scene);
			});
		});
	}
}
