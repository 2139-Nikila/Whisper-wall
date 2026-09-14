import { useMemo } from "react";

function ShootingStars() {
  const meteors = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: Math.random() * 60,
      left: Math.random() * 100,
      delay:2+ Math.random() * 3,
      duration: 1 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <div className="meteor-container">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="meteor"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default ShootingStars;