export default function Movement(MoveDirection){

window.addEventListener("keydown",(e)=>{

    if(e.key === "w")  MoveDirection.front = true;
    if(e.key === "s")  MoveDirection.back = true;
    if(e.key === "d")  MoveDirection.right = true;
    if(e.key === "a")  MoveDirection.left = true;
    if(e.key === " ")  MoveDirection.jumping = true;

});

window.addEventListener("keyup",(e)=>{

    if(e.key === "w")  MoveDirection.front = false;
    if(e.key === "s")  MoveDirection.back = false;
    if(e.key === "d")  MoveDirection.right = false;
    if(e.key === "a")  MoveDirection.left = false;
    if(e.key === " ")  MoveDirection.jumping = false;

}); 

}
