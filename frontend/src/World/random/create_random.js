// Import SimplexNoise

import { SimplexNoise } from 'three/addons';

export default function CreateWorld(){

const noise = new SimplexNoise();

// Control in world size and max height for blocks
const CONSTANTS = {
    x:100,
    z:100,
    max_height:15
}

const WORLD_DATA = [];

// Generate terrain heightmap using noise

function CreateTerrain(){

for(let x = 0;x < CONSTANTS.x;x++){

    for(let z = 0;z < CONSTANTS.z;z++){

      const height = Math.round((noise.noise(x * 0.04,z * 0.04) * 5) + 6);

      for(let y = 0;y < height;y++){

         SaveBlocks(x,y,z);

      }

    }
  }

  localStorage.setItem("WORLD_DATA",JSON.stringify(WORLD_DATA));

}

CreateTerrain();

// Save Map Matrixs

function SaveBlocks(x,y,z){

  if(y < 2){

    WORLD_DATA.push({type:"water",pos:{x:x,y:y,z:z}});

  }else if(y >= 2 && y < 4){

    WORLD_DATA.push({type:"sand",pos:{x:x,y:y,z:z}});

  }else if(y >= 4){

    WORLD_DATA.push({type:"grass",pos:{x:x,y:y,z:z}});

  }

 }

 // Set defualt
 localStorage.setItem("current_block","grass");
}