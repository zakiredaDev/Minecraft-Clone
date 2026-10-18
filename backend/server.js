import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server,{cors:{origin:"*"}});

const rooms = [];

io.on("connection",(socket)=>{

    // create room
socket.on("createRoom",({ Room_Key }) => {
 rooms.push({key:Room_Key,players:[{socketId:socket.id}],max:5});
 socket.join(Room_Key);
});

  // join room
socket.on("JoinRoom",({ Room_Key }) => {

rooms.forEach((room)=>{
    if(room.key === Room_Key && room.players.length < room.max){
        room.players.push({socketId:socket.id});
        socket.join(Room_Key);
        io.to(room.key).emit("user_join",{count:room.players.length,players:room.players});
    }
});

});

// Movement
socket.on("set_player_move",({ x , y , z }) => {
   rooms.forEach((room)=>{
       room.players.forEach((player)=>{
         if(player.socketId === socket.id){
              player["pos"] = {x:x,y:y,z:z};
              socket.to(room.key).emit("get_player_move",{data:player});
         }
      });
   }); 
});














});




server.listen(2000);
