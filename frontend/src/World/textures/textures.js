import * as THREE from 'three';

// Loader texture

function Loader(path){

    const loader = new THREE.TextureLoader();
    const texture = loader.load(path);

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;

}

// Grass
import grass_top from './images/grass_1.png';
import grass_bottom from './images/grass_2.png';
import grass_faces from './images/grass_3.png';

// Sand
import sand_top from './images/sand_1.png';
import sand_faces from './images/sand_2.png';

// Water
import water from './images/water.png';


export default function Textures(){

const grass_material = [
    new THREE.MeshLambertMaterial({map:Loader(grass_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(grass_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(grass_top)}),
    new THREE.MeshLambertMaterial({map:Loader(grass_bottom)}),
    new THREE.MeshLambertMaterial({map:Loader(grass_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(grass_faces)})
];

const sand_material = [
    new THREE.MeshLambertMaterial({map:Loader(sand_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(sand_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(sand_top)}),
    new THREE.MeshLambertMaterial({map:Loader(sand_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(sand_faces)}),
    new THREE.MeshLambertMaterial({map:Loader(sand_faces)})
];

const water_material = [
    new THREE.MeshLambertMaterial({map:Loader(water)}),
    new THREE.MeshLambertMaterial({map:Loader(water)}),
    new THREE.MeshLambertMaterial({map:Loader(water)}),
    new THREE.MeshLambertMaterial({map:Loader(water)}),
    new THREE.MeshLambertMaterial({map:Loader(water)}),
    new THREE.MeshLambertMaterial({map:Loader(water)})
];

return { grass_material , sand_material , water_material };

}