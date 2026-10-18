import * as THREE from "three";

export default function Draw_player(scene){

const geo = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshBasicMaterial({color:0x901010});
const player = new THREE.Mesh(geo,mat);
player.position.set(Math.round(Math.random() * 50),20,Math.round(Math.random() * 50));

scene.add(player);

const playerMesh = player;

return { playerMesh };

}