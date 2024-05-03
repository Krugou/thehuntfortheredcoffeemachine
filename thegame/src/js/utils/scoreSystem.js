import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore';
import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {noTeleportGroup} from '../main';
async function getHighScores(db) {
	try {
		// Create a query against the collection
		const q = query(
			collection(db, 'highscores'),
			orderBy('score', 'asc'),
			limit(5),
		);

		const querySnapshot = await getDocs(q);
		let highScores = [];
		querySnapshot.forEach(doc => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
			highScores.push(doc.data());
		});
		return highScores;
	} catch (e) {
		console.error('Error getting documents: ', e);
	}
}
export async function displayHighScores(scene, db) {
	const loader = new FontLoader();
	const yPosition = 2;
	const zPosition = 54;
	const xPosition = 7;
	loader.load(
		'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
		function (font) {
			getHighScores(db).then(highScores => {
				// Create the header
				const headerGeometry = new TextGeometry(
					'Congratulations you won! Fastest Times:',
					{
						font: font,
						size: 0.12,
						height: 0.01,
					},
				);

				const headerMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

				const headerMesh = new THREE.Mesh(headerGeometry, headerMaterial);

				// Position the header mesh
				headerMesh.position.set(xPosition, yPosition, zPosition);
				headerMesh.rotation.y = Math.PI;

				// Add the header mesh to the scene
				noTeleportGroup.add(headerMesh);

				// Display the high scores
				highScores.forEach((highScore, index) => {
					const geometry = new TextGeometry(
						` ${highScore.nickName} - ${highScore.score}`,
						{
							font: font,
							size: 0.1,
							height: 0.01,
						},
					);

					const material = new THREE.MeshBasicMaterial({color: 0xffffff});

					const mesh = new THREE.Mesh(geometry, material);

					// Position the text mesh
					const verticalSpacing = 0.2; // Define the vertical spacing between each mesh
					mesh.position.set(
						xPosition,
						yPosition - 0.5 - index * verticalSpacing,
						zPosition,
					);
					mesh.rotation.y = Math.PI;

					// Add the text mesh to the scene
					noTeleportGroup.add(mesh);
				});
			});
		},
	);
}
