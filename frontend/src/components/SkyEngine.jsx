import { useMemo } from "react";
import "../styles/skyEngine.css";

function SkyEngine() {

const stars = useMemo(() => {

return Array.from(
{ length: 370 },
(_,i)=>({

id:i,

left:Math.random()*100,

top:Math.random()*100,

size:Math.random()*3+1,

delay:Math.random()*8,

duration:12+Math.random()*18

})

);

},[]);

return(

<div className="sky">

{

stars.map(star=>(

<span

key={star.id}

className="sky-star"

style={{

left:`${star.left}%`,

top:`${star.top}%`,

width:`${star.size}px`,

height:`${star.size}px`,

animationDelay:`${star.delay}s`,

animationDuration:`${star.duration}s`

}}

></span>

))

}

</div>

);

}

export default SkyEngine;