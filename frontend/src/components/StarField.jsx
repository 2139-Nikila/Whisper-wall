import { useMemo } from "react";
import "../styles/starfield.css";

function StarField() {

const stars = useMemo(() => {

return Array.from({ length: 160 }, (_, i) => ({

id:i,

left:Math.random()*100,

top:Math.random()*100,

size:Math.random()*3+1,

delay:Math.random()*6,

duration:Math.random()*12+12

}));

},[]);

return(

<div className="stars-container">

{stars.map((star)=>(

<span

key={star.id}

className="star"

style={{

left:`${star.left}%`,

top:`${star.top}%`,

width:`${star.size}px`,

height:`${star.size}px`,

animationDelay:
Math.random()*2+"s",

animationDuration:
4+Math.random()*3+"s",

}}

></span>

))}

</div>

);

}

export default StarField;