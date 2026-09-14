import { motion } from "framer-motion";
import { useRef } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    const buttonRef = useRef(null);
    const handleMouseMove = (e) => {

  const button = buttonRef.current;

  if (!button) return;

  const rect = button.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distanceX = e.clientX - centerX;
  const distanceY = e.clientY - centerY;

  const distance = Math.sqrt(
    distanceX * distanceX +
    distanceY * distanceY
  );

  if (distance < 140) {

    button.style.transform = `translate(${distanceX * 0.18}px, ${distanceY * 0.18}px)`;

  } else {

    button.style.transform = "translate(0px,0px)";

  }

};

const handleMouseLeave = () => {

  if (buttonRef.current) {

    buttonRef.current.style.transform =
      "translate(0px,0px)";

  }

};
  return (
    <motion.nav
  className="navbar"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="logo">
        WhisperWall
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
<Link to="/stories">Stories</Link>
<Link to="/leaderboard">Leaderboard</Link>
<Link to="/login">Login</Link>
<Link to="/feed">Stories</Link>
      </div>

      <button
  ref={buttonRef}
  className="share-btn"
  id="shareBtn"
>
  ✦ Tell Your Story
</button>
    </motion.nav>
  );
}

export default Navbar;