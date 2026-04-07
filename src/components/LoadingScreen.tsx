import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import Logo from './Logo';
import WolfEyeO from './WolfEyeO';
import HexGridBackground from './HexGridBackground';
import { PRELOAD_ASSETS } from '../constants';


const LoadingScreen: React.FC<{
  onComplete: () => void;
}> = ({
  onComplete
}) => {
  const [isFinishing, setIsFinishing] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

  // Drive progress directly through MotionValues for 60fps smoothness without re-renders
  const progressMV = useMotionValue(0);
  const springProg = useSpring(progressMV, {
    damping: 35,
    stiffness: 45,
    restDelta: 0.001
  });
  
  useEffect(() => {
    const MIN_DISPLAY_MS = 2500; // Increased slightly for smoother feel
    const startTime = Date.now();
    const total = PRELOAD_ASSETS.length + 1;
    let loaded = 0;

    // smooth constant progress animation (fake progression for perceived speed)
    const baseProgress = animate(progressMV, 100, {
      duration: MIN_DISPLAY_MS / 1000,
      ease: "linear",
      autoplay: true
    });

    const onAssetLoaded = () => {
      loaded++;
      // We don't actually need to update React state per-asset, the base animation handles the visual smoothness
      if (loaded >= total) {
        baseProgress.stop();
        // Snap to real 100% smoothly
        animate(progressMV, 100, {
          duration: 0.8,
          ease: "easeOut",
          onComplete: () => {
            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);
            setTimeout(() => {
              setIsFinishing(true);
              setTimeout(onComplete, 1200);
            }, delay);
          }
        });
      }
    };

    // Track fonts/images
    document.fonts.ready.then(onAssetLoaded).catch(onAssetLoaded);
    PRELOAD_ASSETS.forEach(src => {
      const img = new Image();
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded;
      img.src = src;
    });

    return () => {
      baseProgress.stop();
    };
  }, [onComplete, progressMV]);

  return <motion.div className="fixed inset-0 z-[100] bg-[#0F0B14] flex flex-col items-center justify-center overflow-hidden" 
    initial={{ opacity: 1 }} 
    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
  >
      {/* Cinematic Background (Matches Frame 0 of the intro) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <img 
          src="/GIFFrames/frame_000_delay-0.03s.gif" 
          alt="" 
          className="w-full h-full object-cover opacity-30" 
        />
        {/* Games World Match: Deep purple atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060408] via-[#1a0b2e]/40 to-[#060408]/80" />
      </div>

      {/* Ambient Background Glow (Matches Games World / Services Section) */}
      <motion.div 
        className="absolute inset-0 z-1 pointer-events-none" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: isFinishing ? 0 : 1 }} 
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.25)_0%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.15)_0%,transparent_50%)]" />
      </motion.div>

      {/* Subtle Floating Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute w-[1px] h-[1px] bg-white/20 rounded-full blur-[0.5px]" 
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0
            }} 
            animate={{
              y: [null, "-20%"],
              opacity: [0, 0.3, 0]
            }} 
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear", 
              delay: Math.random() * 5 
            }} 
          />
        ))}
      </div>

      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center" 
        initial={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: isMobile ? 1.5 : 1.25
        }} 
        animate={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: isFinishing ? 1 : isMobile ? 1.5 : 1.25
        }} 
        transition={{
          duration: isFinishing ? 1.5 : 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: isFinishing ? 0 : 1
        }}
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
          {/* Base Logo - Always Fully Visible in White */}
          <div className="absolute inset-0">
            <Logo className="w-full h-full text-white" />
          </div>
          
          {/* Filling Logo - Progress-based color fill on top */}
          <motion.div 
            className="absolute inset-0 z-10 will-change-[clip-path]"
            style={{ 
              clipPath: useTransform(springProg, (v) => `inset(${100 - (v as number)}% 0 0 0)`)
            }}
          >
            <Logo className="w-full h-full text-[#A855C5]" useGradient={true} />
          </motion.div>
        </div>

        {/* Studio Name */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            duration: isFinishing ? 1.5 : 1.2,
            delay: isFinishing ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1]
          }} 
          className="mt-12 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl font-black tracking-[0.15em] md:tracking-[0.25em] lg:tracking-[0.3em] text-white uppercase font-display drop-shadow-[0_0_30px_rgba(168,85,197,0.3)] flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-center justify-center w-full">
            <span className="inline-block align-middle">NYTW<WolfEyeO />LF</span> <span className="text-[#A855C5]">GAMES</span>
          </h1>
        </motion.div>
      </motion.div>
    </motion.div>;
};

export default LoadingScreen;
