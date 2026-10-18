import * as THREE from 'three';

// Make sun light

export default function Sun(){

const directional_light = new THREE.DirectionalLight(0xffffff,2.5);
directional_light.castShadow = true;
directional_light.position.set(35, 55, 80);
directional_light.target.position.set(50, 0, 50);
directional_light.shadow.mapSize.set(2048, 2048);
directional_light.shadow.camera.left = -90;
directional_light.shadow.camera.right = 90;
directional_light.shadow.camera.top = 90;
directional_light.shadow.camera.bottom = -90;
directional_light.shadow.camera.near = 0.3;
directional_light.shadow.camera.far = 300;
directional_light.shadow.camera.updateProjectionMatrix();


const ambient_light = new THREE.AmbientLight(0xffffff,0.5);

return {directional_light , ambient_light};

}
