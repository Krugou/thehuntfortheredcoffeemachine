import * as THREE from 'three';

let scoreText;
let font;
let hudCamera;

// Function to initialize the score
export function initializeScore(scene, renderer, width, height) {
    // Create a loader for the font
    const loader = new THREE.FontLoader();

    // Create a camera for the HUD
    hudCamera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 10);
    hudCamera.position.z = 10;

    // Load a font
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
        font = loadedFont;

        // Create a geometry for the score text
        const geometry = new THREE.TextGeometry('Score: 0', {
            font: font,
            size: 20,
            height: 0.1,
        });

        // Create a material for the score text
        const material = new THREE.MeshBasicMaterial({color: 0xffffff});

        // Create a mesh for the score text
        scoreText = new THREE.Mesh(geometry, material);

        // Position the score text
        scoreText.position.set(width / 2 - 50, height / 2 - 50, 0);

        // Add the score text to the scene
        scene.add(scoreText);
    });
}

// Function to update the score
export function updateScore(scene, newScore) {
    // Remove the old score text from the scene
    scene.remove(scoreText);

    // Update the geometry of the score text
    scoreText.geometry = new THREE.TextGeometry('Score: ' + newScore, {
        font: font,
        size: 20,
        height: 0.1,
    });

    // Add the updated score text to the scene
    scene.add(scoreText);
}