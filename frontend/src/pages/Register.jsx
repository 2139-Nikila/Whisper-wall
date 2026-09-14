import "../styles/login.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Toast from "../components/Toast";

function Register() {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [anonymousName, setAnonymousName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Temporary toast state
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: ""
  });

  const showToast = (type, message) => {

    setToast({
      show: true,
      type,
      message
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: ""
      });
    }, 3000);

  };

  const getPasswordStrength = () => {

    if (password.length === 0)
      return "";

    let score = 0;

    if (password.length >= 6)
      score++;

    if (/[A-Z]/.test(password))
      score++;

    if (/[0-9]/.test(password))
      score++;

    if (/[^A-Za-z0-9]/.test(password))
      score++;

    if (score <= 1)
      return "Weak";

    if (score === 2)
      return "Medium";

    if (score === 3)
      return "Strong";

    return "Excellent";
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !anonymousName ||
      !dateOfBirth ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      showToast(
        "error",
        "Please fill all fields"
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      showToast(
        "error",
        "Enter a valid email"
      );

      return;
    }

    if (password !== confirmPassword) {

      showToast(
        "error",
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await fetch(
          "http://localhost:8080/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              firstName,
              lastName,
              anonymousName,
              dateOfBirth,
              email,
              password
            })
          }
        );

      const data = await response.json();

if (!response.ok) {
  throw new Error(
    data.message || "Registration failed"
  );
}

      showToast(
        "success",
        "🎉 Registration Successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      showToast(
        "error",
        error.message
      );

    } finally {

      setLoading(false);

    }

  };
  return (

    <div className="login-page">
        <Toast

show={toast.show}

type={toast.type}

message={toast.message}

/>

      <motion.div
        className="login-card"
        initial={{
          opacity: 0,
          y: 40
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.7
        }}
      >

        <h1 className="login-title">
          Join WhisperWall
        </h1>

        <p className="login-subtitle">
          Create your anonymous identity
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>
              setFirstName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e)=>
              setLastName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Anonymous Name"
            value={anonymousName}
            onChange={(e)=>
              setAnonymousName(e.target.value)
            }
          />

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e)=>
              setDateOfBirth(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <div className="password-container">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
            />

            <span
              className="password-toggle"
              onClick={()=>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {
                showPassword
                  ? <FaEyeSlash/>
                  : <FaEye/>
              }
            </span>

          </div>

          {
            getPasswordStrength() !== "" &&
            (
              <p
                className={
                  `password-strength ${getPasswordStrength().toLowerCase()}`
                }
              >
                {getPasswordStrength()}
              </p>
            )
          }

          <div className="password-container">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <span
              className="password-toggle"
              onClick={()=>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {
                showConfirmPassword
                  ? <FaEyeSlash/>
                  : <FaEye/>
              }
            </span>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {
              loading
                ? "Creating Account..."
                : "✨ Create Account"
            }

          </button>

        </form>

        <p className="register-text">
          Already have an account?
        </p>

        <button
          className="register-btn"
          type="button"
          onClick={()=>
            navigate("/login")
          }
        >
          Login
        </button>

      </motion.div>

    </div>

  );

}

export default Register;

