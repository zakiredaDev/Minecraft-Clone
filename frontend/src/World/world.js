import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';
import CreateWorld from './random/create_random';
import DrawWorld from './draw_world/draw_world';
import Sun from './sky/sun';
import Clouds from './sky/cloud';
import Movement from './movement/move';
import CreateBlocks from './create_blocks/create_blocks';


// Main function
export default function World(socket){

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('rgb(51, 130, 186)');
//scene.fog = new THREE.Fog('#54595b',0.1,100);

// Create camera
const camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,0.1,500);
camera.position.set(17,12,10);
scene.add(camera);

// Set WebGLRenderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

// Set OrbitControls 
const Controls = new PointerLockControls(camera,renderer.domElement);

renderer.domElement.addEventListener("click",()=>{
   Controls.lock();
});

// Light
const { directional_light , ambient_light} = Sun();
scene.add(directional_light);
scene.add(directional_light.target);
scene.add(ambient_light);

// Clouds 
const { clouds } = Clouds(scene);


// Movement
const SPEED = 0.25;

let MoveDirection = {
    front:false,
    back:false,
    right:false,
    left:false,
    jumping:false
};

Movement(MoveDirection);

function MovePLayer(){

  if(MoveDirection["front"]) Controls.moveForward(SPEED);
  if(MoveDirection["back"]) Controls.moveForward(-SPEED);
  if(MoveDirection["left"]) Controls.moveRight(-SPEED);
  if(MoveDirection["right"]) Controls.moveRight(SPEED);
  if(MoveDirection["jumping"]) camera.position.y += 0.5;
  if(!MoveDirection["jumping"] && camera.position.y > 10) camera.position.y -= 0.8;

}

function setMove(){
  socket.emit("set_player_move",{x:camera.position.x,y:camera.position.y,z:camera.position.z});
}

// Create World or Load old
const is_found = localStorage.getItem('WORLD_DATA') ? true : false;
if(!is_found){

     CreateWorld();
    const blocksMeshs = DrawWorld(scene);
    CreateBlocks(camera , renderer , blocksMeshs);
}

// Draw world
if(is_found) {

    const blocksMeshs = DrawWorld(scene);
    CreateBlocks(camera , renderer , blocksMeshs);

}

function loop(){
     requestAnimationFrame(loop);

     if(clouds.position.z > -50) clouds.position.z -= 0.01;
     if(clouds.position.z < -60) clouds.position.z = 80;

     MovePLayer();
     if (Object.values(MoveDirection).some(Boolean)) setMove();
    renderer.render(scene,camera);
}

loop();

return { scene };

}
