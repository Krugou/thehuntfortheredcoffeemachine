import * as THREE from 'three';
import {VRButton} from 'three/addons/webxr/VRButton.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {animate} from '/js/utils/animate.js';
import {configureControllers} from '/js/utils/configureControllers';
import {loadmodels} from '/js/utils/loadmodels.js';
import {onSelectEnd} from '/js/utils/onSelectEnd.js';
import {onSelectStart} from '/js/utils/onSelectStart.js';
import {resize} from '/js/utils/resize.js';
import {onSqueezeEnd, onSqueezeStart} from '/js/utils/squeeze.js';
export let basePath = '/';
export let directionalLight;
export let interactionGroup = new THREE.Group();
interactionGroup.name = 'Interaction-Group';
export let marker, baseReferenceSpace;
export let teleportgroup = new THREE.Group();
teleportgroup.name = 'Teleport-Group';
export let controller1, controller2;
export let controllerGrip1, controllerGrip2;
export let raycaster;
export const intersected = [];
export const tempMatrix = new THREE.Matrix4();
export let container, camera, scene, renderer, cube, controls;
export let lastLoggedPosition = null;
export let model2;

start();

/**
 * Initializes the 3D scene, camera, renderer, and objects.
 */
export function start() {
	// Create a new div element and append it to the body
	container = document.createElement('div');
	document.body.appendChild(container);

	// Create a new THREE.Scene object
	scene = new THREE.Scene();

	loadmodels();
	scene.add(teleportgroup);
	// Create a new THREE.PerspectiveCamera object
	camera = new THREE.PerspectiveCamera(
		75, // Field of view
		window.innerWidth / window.innerHeight, // Aspect ratio
		0.1, // Near clipping plane
		30, // Far clipping plane
	);

	// Create a new THREE.WebGLRenderer object
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);

	// Add a directional light to the scene
	directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	scene.add(directionalLight);

	// Add an axes helper to the scene
	const axesHelper = new THREE.AxesHelper(4);
	axesHelper.position.set(-4, 0, -15);
	scene.add(axesHelper);

	// Add ambient light to the scene
	const light = new THREE.AmbientLight(0x404040); // soft white light
	scene.add(light);

	// Set the camera's position and look at the axes helper
	camera.position.set(-4, 4, -14);
	// camera.lookAt(axesHelper.position);

	// Create new OrbitControls
	controls = new OrbitControls(camera, renderer.domElement);

	controls.update();
	scene.add(interactionGroup);

	// Call the animate export function to start the animation loop
	animate();
}

initVR();
marker = new THREE.Mesh(
	new THREE.CircleGeometry(0.25, 32).rotateX(-Math.PI / 2),
	new THREE.MeshBasicMaterial({color: 0x404040}),
);
scene.add(marker);

// start location on vr start
const startLocation = {
	x: 2,
	y: 0,
	z: 16,
	w: 1,
};
export const startRotation = new THREE.Quaternion();
/**
 * Initializes the VR environment.
 */
export function initVR() {
	// Enable WebXR in the renderer
	document.body.appendChild(VRButton.createButton(renderer));

	renderer.xr.enabled = true;
	renderer.xr.addEventListener('sessionstart', () => {
		baseReferenceSpace = renderer.xr.getReferenceSpace();
		const transform = new XRRigidTransform(startLocation, startRotation);
		const beginningSpot = baseReferenceSpace.getOffsetReferenceSpace(transform);
		renderer.xr.setReferenceSpace(beginningSpot);
	});

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

	configureControllers(
		controller1,
		controller2,
		controllerGrip1,
		controllerGrip2,
	);
	// Create a raycaster
	raycaster = new THREE.Raycaster();

	controller1.addEventListener('squeezestart', onSqueezeStart);
	controller1.addEventListener('squeezeend', onSqueezeEnd);

	controller2.addEventListener('squeezestart', onSqueezeStart);
	controller2.addEventListener('squeezeend', onSqueezeEnd);
}

window.addEventListener('resize', resize, false);
