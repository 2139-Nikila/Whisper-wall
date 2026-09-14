import { useEffect } from "react";

function Parallax() {

useEffect(()=>{

const move=(e)=>{

const x=(window.innerWidth/2-e.clientX)/45;
const y=(window.innerHeight/2-e.clientY)/45;

document.documentElement.style.setProperty(
"--mouse-x",
`${x}px`
);

document.documentElement.style.setProperty(
"--mouse-y",
`${y}px`
);

};

window.addEventListener("mousemove",move);

return()=>window.removeEventListener(
"mousemove",
move
);

},[]);

return null;

}

export default Parallax;