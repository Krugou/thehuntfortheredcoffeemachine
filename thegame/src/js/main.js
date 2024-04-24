import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
import {VRButton} from 'three/addons/webxr/VRButton.js';
import {XRControllerModelFactory} from 'three/addons/webxr/XRControllerModelFactory.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {animate} from './utils/animate.js';
import {cleanIntersected} from './utils/cleanIntersected.js';
import {getIntersections} from './utils/getIntersections.js';
import {loadmodels} from './utils/loadmodels.js';
import {onSelectEnd} from './utils/onSelectEnd.js';
import {onSelectStart} from './utils/onSelectStart.js';
import {resize} from './utils/resize.js';
import {onSqueezeEnd, onSqueezeStart} from './utils/squeeze.js';

export let basePath = '/';
export let directionalLight;
// create a new empty group to include imported models you want to interact with
export let group = new THREE.Group();
group.name = 'Interaction-Group';

export let marker, baseReferenceSpace;

// create a new empty group to include imported models you want
// to teleport with
export let teleportgroup = new THREE.Group();
teleportgroup.name = 'Teleport-Group';
export let controller1, controller2;
export let controllerGrip1, controllerGrip2;
export let raycaster;
export const intersected = [];
export const tempMatrix = new THREE.Matrix4();
// Declare variables for the scene, camera, renderer, cube, and controls
export let container, camera, scene, renderer, cube, controls;
export let lastLoggedPosition = null;
export let model2;
// Call the init function to initialize the scene
init();

/**
 * Initializes the 3D scene, camera, renderer, and objects.
 */
export function init() {
	// Create a new div element and append it to the body
	container = document.createElement('div');
	document.body.appendChild(container);

	// Create a new THREE.Scene object
	scene = new THREE.Scene();

	loadmodels();
	// add the empty group to the scene
	scene.add(teleportgroup);
	// Create a new THREE.PerspectiveCamera object
	camera = new THREE.PerspectiveCamera(
		75, // Field of view
		window.innerWidth / window.innerHeight, // Aspect ratio
		0.1, // Near clipping plane
		1000, // Far clipping plane
	);
	// Create an AudioListener and add it to the camera
	const listener = new THREE.AudioListener();
	camera.add(listener);

	// Create a global audio source
	const sound = new THREE.Audio(listener);

	// Load a sound and set it as the Audio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load('sounds/sound.mp3', function (buffer) {
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.5);
		sound.play();
	});

	// Create a new THREE.WebGLRenderer object
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);

	// Create a cube using THREE.BoxGeometry and THREE.MeshPhongMaterial
	// const geometry = new THREE.BoxGeometry(1, 1, 1);
	// const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
	// cube = new THREE.Mesh(geometry, material);
	// Add the cube to the scene
	// scene.add(cube);

	// Add a directional light to the scene
	directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	scene.add(directionalLight);

	// // Add an axes helper to the scene
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// Add ambient light to the scene
	const light = new THREE.AmbientLight(0x404040); // soft white light
	light.castShadow = true;
	scene.add(light);

	// Set the camera's position and look at the axes helper
	camera.position.set(2, 2, 2);
	camera.lookAt(axesHelper.position);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// Create new OrbitControls
	controls = new OrbitControls(camera, renderer.domElement);

	// Update the controls after any manual changes to the camera's transform
	camera.position.set(7, 3, 6);
	controls.update();
	// add the group to the scene
	scene.add(group);
	// // Set the cube's position, scale, and rotation
	// cube.position.x = 0;
	// cube.scale.set(2, 2, 2);
	// cube.rotation.y = Math.PI / 4;

	// Call the animate export function to start the animation loop
	animate();
}

initVR();
marker = new THREE.Mesh(
	new THREE.CircleGeometry(0.25, 32).rotateX(-Math.PI / 2),
	new THREE.MeshBasicMaterial({color: 0x2c2c2c}),
);
scene.add(marker);
/**
 * Initializes the VR environment.
 */
export function initVR() {
	// Enable WebXR in the renderer
	document.body.appendChild(VRButton.createButton(renderer));

	renderer.xr.enabled = true;
	renderer.xr.addEventListener(
		'sessionstart',
		() => (baseReferenceSpace = renderer.xr.getReferenceSpace()),
	);

	// Create and configure the first controller
	controller1 = renderer.xr.getController(0);
	// Add event listeners for 'selectstart' and 'selectend' events
	controller1.addEventListener('selectstart', onSelectStart);
	controller1.addEventListener('selectend', onSelectEnd);
	// Add the controller to the scene
	scene.add(controller1);

	// Create and configure the second controller
	controller2 = renderer.xr.getController(1);
	// Add event listeners for 'selectstart' and 'selectend' events
	controller2.addEventListener('selectstart', onSelectStart);
	controller2.addEventListener('selectend', onSelectEnd);
	// Add the controller to the scene
	scene.add(controller2);

	// Create a factory for controller models
	const controllerModelFactory = new XRControllerModelFactory();

	// Create and configure the grip for the first controller
	controllerGrip1 = renderer.xr.getControllerGrip(0);
	// Add a model to the grip
	// controllerGrip1.add(
	// 	controllerModelFactory.createControllerModel(controllerGrip1),
	// );
	// Add the grip to the scene
	scene.add(controllerGrip1);

	// Create and configure the grip for the second controller
	controllerGrip2 = renderer.xr.getControllerGrip(1);
	// Add a model to the grip
	// controllerGrip2.add(
	// 	controllerModelFactory.createControllerModel(controllerGrip2),
	// );
	// // Add the grip to the scene
	scene.add(controllerGrip2);
	const loader = new GLTFLoader().setPath(basePath);
	loader.load('low_poly_blue_handgun_pistol/scene.gltf', function (gltf) {
		// gltf.scene.scale.set(0.0003, 0.0003, 0.0003);
		gltf.scene.scale.set(0.1003, 0.1003, 0.1003);

		let mymodel = gltf.scene;
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

	// Create a raycaster
	raycaster = new THREE.Raycaster();

	controller1.addEventListener('squeezestart', onSqueezeStart);
	controller1.addEventListener('squeezeend', onSqueezeEnd);

	controller2.addEventListener('squeezestart', onSqueezeStart);
	controller2.addEventListener('squeezeend', onSqueezeEnd);
}

// Add an event listener for the window resize event
window.addEventListener('resize', resize, false);
