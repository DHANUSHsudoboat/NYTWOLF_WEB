import React from 'react';
import { motion } from 'motion/react';

const TopographyBackground = () => {
  // We'll create several "centers" of the topography
  const centers = [
    { x: 20, y: 30, rBase: 40, count: 12 },
    { x: 80, y: 70, rBase: 50, count: 15 },
    { x: 50, y: 50, rBase: 35, count: 10 },
    { x: 10, y: 80, rBase: 45, count: 12 },
    { x: 90, y: 20, rBase: 60, count: 18 }
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0F0B14]">
      {centers.map((center, cIdx) => (
        <div 
          key={cIdx} 
          className="absolute" 
          style={{ 
            left: `${center.x}%`, 
            top: `${center.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {Array.from({ length: center.count }).map((_, i) => {
            const radius = center.rBase + i * 15;
            const opacity = 0.25 - (i / center.count) * 0.15;
            const duration = 15 + cIdx * 5 + i * 2;
            
            return (
              <motion.div
                key={i}
                className="absolute border border-white/20 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] will-change-transform"
                style={{
                  width: radius * 3.5,
                  height: radius * 2.5,
                  left: -radius * 1.75,
                  top: -radius * 1.25,
                  opacity: opacity
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                  borderRadius: [
                    '40% 60% 70% 30% / 50% 40% 60% 50%',
                    '60% 40% 30% 70% / 40% 60% 40% 60%',
                    '40% 60% 70% 30% / 50% 40% 60% 50%'
                  ]
                }}
                transition={{
                  rotate: { duration: duration * 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: duration, repeat: Infinity, ease: "easeInOut" },
                  borderRadius: { duration: duration * 0.8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Global flowing lines for connectivity */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`flow-${i}`}
            className="absolute w-full h-[1px] bg-white/20"
            style={{ top: `${i * 7}%` }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 20 + i * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopographyBackground;
