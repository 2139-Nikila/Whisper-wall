import { motion } from "framer-motion";
import "../styles/hero.css";
import { useRef } from "react";

function Hero() {
    const heroButtonRef = useRef(null);
    const handleMouseMove = (e) => {

  const button = heroButtonRef.current;

  if (!button) return;

  const rect = button.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 180) {

    button.style.transform =
      `translate(${dx * 0.22}px, ${dy * 0.22}px) scale(1.03)`;

    button.style.boxShadow =
      "0 0 45px rgba(216,180,160,.8)";

  } else {

    button.style.transform =
      "translate(0px,0px) scale(1)";

    button.style.boxShadow =
      "0 0 20px rgba(216,180,160,.35)";

  }

};

const handleMouseLeave = () => {

  if (!heroButtonRef.current) return;

  heroButtonRef.current.style.transform =
    "translate(0px,0px) scale(1)";

  heroButtonRef.current.style.boxShadow =
    "0 0 20px rgba(216,180,160,.35)";

};
  return (
    <section className="hero"
   onMouseMove={handleMouseMove}
   onMouseLeave={handleMouseLeave}
  >
  <motion.h1
className="hero-title"
initial={{ opacity: 0, y: 80 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
>
  Whisper
  <br />
  <span>Your Story</span>
</motion.h1>

      <motion.p
className="hero-subtitle"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.7 }}
>
  Share anonymously.
  <br />
  Connect honestly.
  <br />
  Let your voice be heard.
</motion.p>

      <motion.button
      ref={heroButtonRef}
className="hero-btn"
whileHover={{ scale: 1.08 }}
whileTap={{ scale: 0.95 }}
>
  Share what's on your mind
</motion.button>
    </section>
  );
}

export default Hero;