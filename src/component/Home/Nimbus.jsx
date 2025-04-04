import React, { useState, useEffect, useRef } from 'react';

const EdgeComet = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const requestRef = useRef();
  const trailIdCounter = useRef(0);
  const timeRef = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });

  // Define edge-following paths that stay within viewport
  const generatePaths = () => {
    const margin = 50; // Keep away from edges
    const height = Math.min(window.innerHeight, 800); // Limit vertical range
    
    return [
      // Top edge path
      {
        start: { x: margin, y: margin },
        cp1: { x: window.innerWidth * 0.3, y: margin },
        cp2: { x: window.innerWidth * 0.7, y: margin },
        end: { x: window.innerWidth - margin, y: margin }
      },
      // Right edge path
      {
        start: { x: window.innerWidth - margin, y: margin },
        cp1: { x: window.innerWidth - margin, y: height * 0.3 },
        cp2: { x: window.innerWidth - margin * 1.5, y: height * 0.7 },
        end: { x: window.innerWidth - margin * 2, y: height - margin }
      },
      // Bottom path
      {
        start: { x: window.innerWidth - margin * 2, y: height - margin },
        cp1: { x: window.innerWidth * 0.7, y: height - margin },
        cp2: { x: window.innerWidth * 0.3, y: height - margin },
        end: { x: margin, y: height - margin }
      },
      // Left edge path
      {
        start: { x: margin, y: height - margin },
        cp1: { x: margin, y: height * 0.7 },
        cp2: { x: margin, y: height * 0.3 },
        end: { x: margin, y: margin }
      }
    ];
  };

  const [paths] = useState(generatePaths());

  const getPositionOnCurve = (progress) => {
    const pathIndex = Math.floor(progress * paths.length);
    const pathProgress = (progress * paths.length) % 1;
    const path = paths[Math.min(pathIndex, paths.length - 1)];
    
    // Smooth curve calculation
    const t = pathProgress;
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    
    const newPos = {
      x: mt3 * path.start.x + 3 * mt2 * t * path.cp1.x + 3 * mt * t2 * path.cp2.x + t3 * path.end.x,
      y: mt3 * path.start.y + 3 * mt2 * t * path.cp1.y + 3 * mt * t2 * path.cp2.y + t3 * path.end.y
    };

    // Smooth transition between current and new position
    if (lastPosition.current.x !== 0) {
      const smoothFactor = 0.2;
      newPos.x = lastPosition.current.x + (newPos.x - lastPosition.current.x) * smoothFactor;
      newPos.y = lastPosition.current.y + (newPos.y - lastPosition.current.y) * smoothFactor;
    }
    
    lastPosition.current = newPos;
    return newPos;
  };

  useEffect(() => {
    const animate = (timestamp) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const progress = ((timestamp - timeRef.current) * 0.00003) % 1; // Slowed down movement
      
      const newPosition = getPositionOnCurve(progress);
      setPosition(newPosition);

      if (timestamp % 8 === 0) { // Reduced trail frequency
        const newTrail = {
          id: trailIdCounter.current++,
          x: newPosition.x,
          y: newPosition.y,
          timestamp: timestamp
        };

        setTrails(prevTrails => {
          const filtered = prevTrails
            .filter(trail => timestamp - trail.timestamp < 500) // Shorter trail duration
            .slice(-20); // Limit number of trail points
          return [...filtered, newTrail];
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Refined gradients and filters */}
          <linearGradient id="trailGradient">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>

          <filter id="cometGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="pencilEffect">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
          </filter>
        </defs>

        {/* Refined Trails */}
        <g>
          {trails.map((trail, index, array) => {
            if (index === 0) return null;
            const prevTrail = array[index - 1];
            const progress = Math.min(1, (Date.now() - trail.timestamp) / 500);
            const opacity = Math.max(0, 1 - progress ** 1.5);
            
            return (
              <line
                key={trail.id}
                x1={prevTrail.x}
                y1={prevTrail.y}
                x2={trail.x}
                y2={trail.y}
                stroke="rgba(147, 197, 253, 0.3)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity={opacity}
                style={{
                  filter: 'url(#pencilEffect)'
                }}
              />
            );
          })}
        </g>

        {/* Refined Comet */}
        <g transform={`translate(${position.x}, ${position.y})`}>
          {/* Subtle glow */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="rgba(147, 197, 253, 0.2)"
            filter="url(#cometGlow)"
          />
          
          {/* Core */}
          <circle
            cx="0"
            cy="0"
            r="3"
            fill="#93C5FD"
            filter="url(#cometGlow)"
          />
          
          {/* Center highlight */}
          <circle
            cx="0"
            cy="0"
            r="1"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    </div>
  );
};

export default EdgeComet;