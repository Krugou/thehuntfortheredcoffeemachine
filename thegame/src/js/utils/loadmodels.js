import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
import {basePath, camera, renderer, scene, teleportgroup} from '../main.js';
export function loadmodels() {
	new RGBELoader().setPath(basePath).load('hdr/Scenery.hdr', function (texture) {
		texture.mapping = THREE.EquirectangularReflectionMapping;

		scene.background = texture;
		scene.environment = texture;
		renderer.toneMappingExposure = 10.0;
		const loader = new GLTFLoader().setPath(basePath);
		loader.load('floors/7thfloor/7thfloor.gltf', async function (gltf) {
			const model = gltf.scene;

			model.position.set(0, 0, 0);
			teleportgroup.add(model);
			await renderer.compileAsync(model, camera, scene);
		});
		loader.load('floors/7thfloor/7thwalls.gltf', async function (gltf) {
			const model = gltf.scene;

			model.position.set(0, 0, 0);
			scene.add(model);
			await renderer.compileAsync(model, camera, scene);
		});
		loader.load('floors/7thfloor/7thdoors.gltf', async function (gltf) {
			const model = gltf.scene;

			model.position.set(0, 0, 0);
			scene.add(model);
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
