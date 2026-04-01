import React from 'react';
import { motion } from 'motion/react';

const HexGridBackground = () => {
  // A hexagonal grid can be represented by offset rows
  // Hexagon dimensions for a flat-topped hex
  // An even denser, ultra-fine hexagonal grid
  const hexRadius = 12;
  const hexHeight = Math.sqrt(3) * hexRadius; // ~20.8
  const hexWidth = 2 * hexRadius; // 24
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0F0B14]">
      {/* Removed static grid lines as requested, keeping only pulsing technical highlights */}
      
      {/* Pulsing hex highlights for a technical feel */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/20"
            style={{
              width: 24,
              height: 21,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HexGridBackground;
