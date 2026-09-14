import "../styles/toast.css";
import { AnimatePresence, motion } from "framer-motion";

function Toast({

show,

type,

message

}){

return(

<AnimatePresence>

{

show && (

<motion.div

className={`toast ${type}`}

initial={{

opacity:0,

x:150,

scale:.9

}}

animate={{

opacity:1,

x:0,

scale:1

}}

exit={{

opacity:0,

x:150,

scale:.9

}}

transition={{

duration:.35

}}

>

<div className="toast-title">

{

type==="success"

?

"✅ Success"

:

type==="error"

?

"❌ Error"

:

type==="warning"

?

"⚠ Warning"

:

"ℹ Info"

}

</div>

<div className="toast-message">

{message}

</div>

<div className="toast-progress"/>

</motion.div>

)

}

</AnimatePresence>

);

}

export default Toast;