import * as THREE from 'three';

export default function CreateBlocks(camera , renderer , blockMeshes){

const raycaster = new THREE.Raycaster();

// Set center of screen as aim
const pointer = new THREE.Vector2();
pointer.set(0,0);


// Add block
function create_blocks(){

// Go ray from camera to center screen under aim
raycaster.setFromCamera(pointer,camera);

const hit = raycaster.intersectObjects(Object.values(blockMeshes),false)[0];

if(!hit) return;

const mesh = hit.object;
const id = hit.instanceId;

const matrix = new THREE.Matrix4();
const position = new THREE.Vector3();
const rotation = new THREE.Quaternion();
const scale = new THREE.Vector3();

// Extract position ,roptation ,scale

mesh.getMatrixAt(id,matrix);
matrix.premultiply(mesh.matrixWorld).decompose(position,rotation,scale);

if(!hit.face) return;

const normal = hit.face.normal;

// Set current position for new block
const pos = {
    x:Math.round(position.x + normal.x),
    y:Math.round(position.y + normal.y),
    z:Math.round(position.z + normal.z)
}

const type = localStorage.getItem("current_block");

const targetMesh = {
    grass:blockMeshes.grass_instance,
    sand:blockMeshes.sand_instance,
    water:blockMeshes.water_instance 
}[type];


const newId = targetMesh.count;
const newMatrix = new THREE.Matrix4().makeTranslation(pos.x,pos.y,pos.z);

targetMesh.setMatrixAt(newId,newMatrix);
targetMesh.count++;
targetMesh.instanceMatrix.needsUpdate = true;

const world_data = JSON.parse(localStorage.getItem("WORLD_DATA")) || "[]";

const if_founded = world_data.find(block => block.pos === pos);

if(if_founded) return;

 world_data.push({type:type,pos});
 localStorage.setItem("WORLD_DATA",JSON.stringify(world_data));

}


// Breake block 
function delete_blocks(){

 raycaster.setFromCamera(pointer,camera);

 const hit = raycaster.intersectObjects(Object.values(blockMeshes),false)[0];

if(!hit) return;

const instanceId = hit.instanceId;
const mesh = hit.object;

// Set type of instance
const typeMesh = mesh === blockMeshes.grass_instance ? "grass" : mesh === blockMeshes.sand_instance ? "sand" : "water";

    const matrix2 = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();

// Extract position ,roptation ,scale

mesh.getMatrixAt(instanceId,matrix2);
matrix2.premultiply(mesh.matrixWorld).decompose(position,rotation,scale);

const lastId = mesh.count - 1;

if(instanceId !== lastId){

  const world_data = JSON.parse(localStorage.getItem("WORLD_DATA")) || "[]";

     console.log(world_data);

    const matrix = new THREE.Matrix4();
    mesh.getMatrixAt(lastId,matrix);
    mesh.setMatrixAt(instanceId,matrix);

    mesh.count = lastId;
    mesh.instanceMatrix.needsUpdate = true;

   world_data.forEach((block , index) => {
    
    if(block.pos.x == position.x && block.pos.y == position.y && block.pos.z == position.z){
      world_data.splice(index,1);
      console.log(world_data.length);
      localStorage.setItem("WORLD_DATA",JSON.stringify(world_data));

    }

   });


}

}

// Broke and CReate with mouse
  renderer.domElement.addEventListener("pointerdown", (event) => {
  if (event.button === 0) {
     create_blocks();
  } else if (event.button === 2) {
     delete_blocks();
  }
});

// Disable defualt list 
renderer.domElement.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});



}