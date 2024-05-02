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
			limit(6),
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

	loader.load(
		'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
		function (font) {
			getHighScores(db).then(highScores => {
				highScores.forEach((highScore, index) => {
					const geometry = new TextGeometry(
						` ${highScore.nickName} - ${highScore.score}`,
						{
							font: font,
							size: 1,
							height: 0.1,
						},
					);

					const material = new THREE.MeshBasicMaterial({color: 0xffffff});

					const mesh = new THREE.Mesh(geometry, material);

					// Position the text mesh
					mesh.position.set(0, index * 2, 0);
					mesh.rotation.y = Math.PI;
					// Add the text mesh to the scene
					noTeleportGroup.add(mesh);
				});
			});
		},
	);
}
