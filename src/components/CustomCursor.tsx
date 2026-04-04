import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Mouse Coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth movement for the following ring
  const ringX = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const ringY = useSpring(cursorY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main Core Dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[10000] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Reactive Following Ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 border border-white/50 rounded-full z-[10000] pointer-events-none"
        animate={{
          width: isClicked ? 32 : (isPointer ? 64 : 40),
          height: isClicked ? 32 : (isPointer ? 64 : 40),
          opacity: isClicked ? 1 : (isPointer ? 0.8 : 0.4),
          scale: isClicked ? 0.9 : 1,
          backgroundColor: isPointer ? 'rgba(168, 85, 197, 0.1)' : 'transparent',
          borderColor: isPointer ? '#A855C5' : 'rgba(255, 255, 255, 0.3)',
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Crosshair / Ornamentation for Pointer */}
      <AnimatePresence>
        {isPointer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed z-[10000] pointer-events-none"
            style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
          >
             <div className="absolute top-1/2 left-[-15px] w-3 h-px bg-[#A855C5]" />
             <div className="absolute top-1/2 left-[5px] w-3 h-px bg-[#A855C5]" />
             <div className="absolute top-[-15px] left-1/2 w-px h-3 bg-[#A855C5]" />
             <div className="absolute top-[5px] left-1/2 w-px h-3 bg-[#A855C5]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
