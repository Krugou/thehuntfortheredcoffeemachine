import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore';
import * as THREE from 'three';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {noTeleportGroup} from '../main';
import {score} from '../page';
export async function getHighScores(db) {
	try {
		// Create a query against the collection
		const q = query(
			collection(db, 'highscores'),
			orderBy('score', 'asc'),
			limit(8),
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
	const yPosition = 2.5;
	const zPosition = 54;
	const xPosition = 7;
	loader.load(
		'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
		function (font) {
			getHighScores(db).then(highScores => {
				// Create the header
				const headerGeometry = new TextGeometry('Congratulations you won!', {
					font: font,
					size: 0.12,
					height: 0.01,
				});
				const headerGeometry2 = new TextGeometry(
					'Your time was: ' + score + ' seconds',
					{
						font: font,
						size: 0.1,
						height: 0.01,
					},
				);
				const headerGeometry3 = new TextGeometry('Fastest times:', {
					font: font,
					size: 0.1,
					height: 0.01,
				});

				const headerMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

				const headerMesh = new THREE.Mesh(headerGeometry, headerMaterial);
				const headerMesh2 = new THREE.Mesh(headerGeometry2, headerMaterial);
				const headerMesh3 = new THREE.Mesh(headerGeometry3, headerMaterial);

				// Position the header mesh
				headerMesh.position.set(xPosition, yPosition + 0.5, zPosition);
				headerMesh2.position.set(xPosition, yPosition + 0.25, zPosition);
				headerMesh3.position.set(xPosition, yPosition, zPosition);
				headerMesh2.rotation.y = Math.PI;
				headerMesh.rotation.y = Math.PI;
				headerMesh3.rotation.y = Math.PI;

				// Add the header mesh to the scene
				noTeleportGroup.add(headerMesh, headerMesh2, headerMesh3);

				// Display the high scores
				highScores.forEach((highScore, index) => {
					if (highScore.score === 0) {
						return;
					}

					const geometry = new TextGeometry(
						` ${highScore.nickName} - ${highScore.score} seconds`,
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
						yPosition - 0.25 - index * verticalSpacing,
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
