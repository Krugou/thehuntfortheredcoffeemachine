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

		loader.load('floors/2thfloor.gltf', async function (gltf) {
			const model2 = gltf.scene;

			model2.position.set(0, 0, 0);
			teleportgroup.add(model2);
			await renderer.compileAsync(model2, camera, scene);
		});
	});
}
