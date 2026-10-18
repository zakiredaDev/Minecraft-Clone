import * as THREE from 'three';

export default function Clouds(scene){

const clouds = new THREE.Group();
clouds.position.z = 120;
clouds.castShadow = true;

for(let i = 0; i < 15;i++){

const geo = new THREE.BoxGeometry(Math.round(Math.random() * 20) + 5,2,Math.round(Math.random() * 20) + 5);
const mat = new THREE.MeshLambertMaterial({color:0xffffff});
const cloud = new THREE.Mesh(geo,mat);
cloud.castShadow = true;

cloud.position.set(Math.round(Math.random() * 200 - 60),30,Math.round(Math.random() * 100 - 60));

clouds.add(cloud);

}

scene.add(clouds);

return { clouds };

}