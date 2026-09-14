import { useMemo } from "react";

function Glitter() {

  const particles = useMemo(() => {

    return Array.from({ length: 80 }, (_, i) => ({

      id: i,

      left: Math.random() * 100,

      top: Math.random() * 100,

      delay: Math.random() * 5,

      duration: 2 + Math.random() * 3,

      size: Math.random() * 3 + 1,

    }));

  }, []);

  return (

    <div className="glitter-container">

      {particles.map((p) => (

        <span

          key={p.id}

          className="glitter"

          style={{

            left: `${p.left}%`,

            top: `${p.top}%`,

            width: `${p.size}px`,

            height: `${p.size}px`,

            animationDelay: `${p.delay}s`,

            animationDuration: `${p.duration}s`,

          }}

        />

      ))}

    </div>

  );

}

export default Glitter;