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
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  // Spring-smoothed progress drives the logo fill height
  const progressMV = useMotionValue(0);
  const springProg = useSpring(progressMV, {
    damping: 35,
    stiffness: 45
  });
  const fillHeight = useTransform(springProg, [0, 100], ['0%', '100%']);
  useEffect(() => {
    progressMV.set(progress);
  }, [progress, progressMV]);
  useEffect(() => {
    const MIN_DISPLAY_MS = 2000;
    const startTime = Date.now();
    const total = PRELOAD_ASSETS.length + 1; // +1 for fonts
    let loaded = 0;
    let actualPct = 0;

    // We want the progress to start from 0 and move smoothly even if loading is instant
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (MIN_DISPLAY_MS / 50)); // Targeted to reach 100 in 3s
        return Math.min(Math.max(next, actualPct), 100);
      });
    }, 50);

    const onAssetLoaded = () => {
      loaded++;
      actualPct = Math.round(loaded / total * 100);
      
      if (loaded >= total) {
        clearInterval(interval);
        setProgress(100);
        const elapsed = Date.now() - startTime;
        // Wait for MIN_DISPLAY_MS and then add an extra 800ms grace period 
        // to ensure the spring-smoothed fill animation actually reaches 100%
        const delay = Math.max(0, MIN_DISPLAY_MS - elapsed) + 800;
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(onComplete, 1200);
        }, delay);
      }
    };

    // Track fonts
    document.fonts.ready.then(onAssetLoaded).catch(onAssetLoaded);

    // Track images
    PRELOAD_ASSETS.forEach(src => {
      const img = new Image();
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded; // count errors so we never get stuck
      img.src = src;
    });

    return () => clearInterval(interval);
  }, [onComplete]);

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
        {Array.from({ length: 15 }).map((_, i) => (
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
          scale: typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 1.25
        }} 
        animate={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: isFinishing ? 1 : typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 1.25
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
        <motion.div animate={{
        opacity: progress > 0 ? 1 : 0,
        y: progress > 0 ? 0 : 10
      }} transition={{
        duration: isFinishing ? 1.5 : 1.2,
        delay: isFinishing ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1]
      }} className="mt-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl font-black tracking-[0.15em] md:tracking-[0.25em] lg:tracking-[0.3em] text-white uppercase font-display drop-shadow-[0_0_30px_rgba(168,85,197,0.3)] flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-center justify-center w-full">
            <span className="inline-block align-middle">NYTW<WolfEyeO />LF</span> <span className="text-[#A855C5]">GAMES</span>
          </h1>
        </motion.div>
      </motion.div>
    </motion.div>;
};

export default LoadingScreen;
