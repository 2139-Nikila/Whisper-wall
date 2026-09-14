import "../styles/login.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Toast from "../components/Toast";

function Login() {
  const [email,setEmail]=useState("");
const [showPassword,setShowPassword]=useState(false);
const showToast=(type,message)=>{

setToast({

show:true,

type,

message

});

setTimeout(()=>{

setToast({

show:false,

type:"",

message:""

});

},3000);

};
const getPasswordStrength = () => {

  if(password.length===0)
    return "";

  let score=0;

  if(password.length>=6)
    score++;

  if(/[A-Z]/.test(password))
    score++;

  if(/[0-9]/.test(password))
    score++;

  if(/[^A-Za-z0-9]/.test(password))
    score++;

  if(score<=1)
    return "Weak";

  if(score===2)
    return "Medium";

  if(score===3)
    return "Strong";

  return "Excellent";

};
const [password,setPassword]=useState("");
const [toast,setToast]=useState({

show:false,

type:"",

message:""

});
const navigate = useNavigate();
const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await response.json();

    localStorage.setItem(
      "token",
      data.token
    );
showToast(
"success",
"🎉 Login Successful!"
);

setTimeout(() => {

  navigate("/dashboard");

}, 1500);

navigate("/dashboard");

  }
   catch(error){

showToast(
  "error",
  error.message
);

}

};

  return (

    <div className="login-page">

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Continue your anonymous journey
        </p>

        <form onSubmit={handleLogin}>

          <input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

          <div className="password-container">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<span
className="password-toggle"
onClick={()=>
setShowPassword(!showPassword)
}
>

{
showPassword
?

<FaEyeSlash/>

:

<FaEye/>

}

</span>

</div>
{
getPasswordStrength()!=="" && (

<p className={`password-strength ${getPasswordStrength().toLowerCase()}`}>

{getPasswordStrength()}

</p>

)
}
          <button
            type="submit"
            className="login-btn"
          >
            ✦ Continue Your Story
          </button>

        </form>

        <p className="register-text">
          Don't have an account?
        </p>

       <button
className="register-btn"
type="button"
onClick={() => navigate("/register")}
>
Create Account
</button>

      </motion.div>
       
       <Toast

show={toast.show}

type={toast.type}

message={toast.message}

/>

    </div>

  );

}

export default Login;