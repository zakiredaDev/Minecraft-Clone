import World from "./World/world";
import Draw_player from "./World/draw_world/draw_player";
import { io } from "socket.io-client";

// Settings connections
const socket = io("http://192.168.14.1:2000");
let socket_statue = false;
socket.on("connect",()=>{socket_statue = true});
const { scene } = World(socket);

// Contants
const chunk_players = [];

document.querySelector("main").querySelectorAll("div").forEach((block)=>{

   if(block.getAttribute("id") == localStorage.getItem("current_block")){
      block.classList.add("active");
   }

});


document.querySelector("main").querySelectorAll("div").forEach((block)=>{

block.addEventListener("click",(e)=>{

   const type = e.target.closest("div").getAttribute("id");
   e.target.closest("div").classList.add("active");
   
    localStorage.setItem("current_block",type);

    document.querySelector("main").querySelectorAll("div").forEach((item)=>{
        if(item.getAttribute("id") != localStorage.getItem("current_block")){
              item.classList.remove("active");
        }
    });

  });

});


//Generate simple key
function generatekey(){

const values = [1,2,3,4,5,6,7,8,9,0];
let result = "";

for(let i = 0;i < 4;i++){
  result += values[Math.round(Math.random() * 9)];
}

return result;

}

const $ = (selector) => document.querySelector(selector);

// Create room
$(".create_room_option").addEventListener("click",()=>{

if(!socket_statue) return;

const key_room = generatekey();

socket.emit("createRoom",{Room_Key:key_room});

$(".contentRoom").innerHTML = `<strong>KEY: <span>${key_room}</span></strong>
     <div class="players_room">
      <h3>Connected players : <span class="count_players">0</span> / 5</h3>
     </div>`;

});


//Join room
$(".join_room_option").addEventListener("click",()=>{

if(!socket_statue) return;

$(".contentRoom").innerHTML = `<input placeholder="0000" type="text" maxlength="4" required class="keyRoom">
     <button class="join_room">Join Room <i class="fa-solid fa-right-to-bracket"></i></button>`;

$(".join_room").addEventListener("click",()=>{

if($(".keyRoom").value.trim().length !== 4) return;

socket.emit("JoinRoom",{Room_Key:$(".keyRoom").value.trim()});

$(".contentRoom").innerHTML = `<strong>KEY: <span>${$(".keyRoom").value.trim()}</span></strong>
     <div class="players_room">
      <h3>Connected players : <span class="count_players">0</span> / 5</h3>
     </div>`;

});

});


// Get player move
socket.on("get_player_move",({ data }) => {
  get_move(data);
});

//Connections game
function NewJoin(){
  socket.on("user_join",({ count , players }) => {
     $(".count_players").innerHTML = count;
          //Draw player
         SetPlayers(players);
   });
 }

NewJoin();

// Save players and Draw them
function SetPlayers(players){
   players.forEach((player_data)=>{
         if(player_data.socketId === socket.id) return;
         if(chunk_players.some((player) => player.Id === player_data.socketId)) return;
         const { playerMesh } = Draw_player(scene);
         chunk_players.push({Id:player_data.socketId , mesh:playerMesh});
    });
  }


// Move player
function get_move(player_data){
 chunk_players.forEach((player)=>{
   if(player.Id === player_data.socketId){
     player["pos"] = player_data.pos;
     player.mesh.position.set(player["pos"].x,player["pos"].y,player["pos"].z);
   }
 });
}


