import * as THREE from 'three';
import Textures from '../textures/textures';

export default function DrawWorld(scene){

const { grass_material , sand_material , water_material } = Textures();
const MAP_SIZE = 100 * 100;

const GEO_BLOCK = new THREE.BoxGeometry(1,1,1);

// Set instanced
const grass_instance = new THREE.InstancedMesh(GEO_BLOCK ,grass_material ,MAP_SIZE * 11);
const sand_instance = new THREE.InstancedMesh(GEO_BLOCK ,sand_material ,MAP_SIZE * 2);
const water_instance = new THREE.InstancedMesh(GEO_BLOCK ,water_material ,MAP_SIZE * 2);

// Add cast and recieve shadow 
grass_instance.castShadow = true
sand_instance.castShadow = true;
water_instance.castShadow = true;
grass_instance.receiveShadow = true
sand_instance.receiveShadow = true;
water_instance.receiveShadow = true;

// Add instanced to scene
scene.add(grass_instance);
scene.add(sand_instance);
scene.add(water_instance);

const WORLD_DATA = JSON.parse(localStorage.getItem("WORLD_DATA"));

const Indexs = {
    grass:0,
    sand:0,
    water:0
}

const matrix = new THREE.Matrix4();


// Add Matrixs (Blocks) to InstancedMesh

WORLD_DATA.forEach(block => {
    
if(block.type == "water"){

matrix.makeTranslation(block.pos.x,block.pos.y,block.pos.z);

water_instance.setMatrixAt(Indexs[block.type],matrix);

Indexs[block.type]++;

}else if(block.type == "sand"){

matrix.makeTranslation(block.pos.x,block.pos.y,block.pos.z);

sand_instance.setMatrixAt(Indexs[block.type],matrix);

Indexs[block.type]++;

}else if(block.type == "grass"){

matrix.makeTranslation(block.pos.x,block.pos.y,block.pos.z);

grass_instance.setMatrixAt(Indexs[block.type],matrix);

Indexs[block.type]++;

}


});

// Update real count
grass_instance.count = Indexs["grass"];
sand_instance.count = Indexs["sand"];
water_instance.count = Indexs["water"];

grass_instance.instanceMatrix.needsUpdate = true;
sand_instance.instanceMatrix.needsUpdate = true;
water_instance.instanceMatrix.needsUpdate = true;

return {grass_instance , sand_instance , water_instance};

}