import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import { ShineOverlay, FogLayer, ParticleSystem, MouseParallax } from './common/Layout';
import Logo from './Logo';
import WolfEyeO from './WolfEyeO';

const Hero = ({
  mouseX,
  mouseY
}: {
  mouseX: any;
  mouseY: any;
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 70,
    restDelta: 0.001
  });

  // Background Parallax Transforms (Moved from App.tsx)
  const bgX = useTransform(mouseX, [0, 1], ["-1.5%", "1.5%"]);
  const bgYParallax = useTransform(mouseY, [0, 1], ["-1.5%", "1.5%"]);
  const bgScale = useTransform(mouseY, [0, 1], [1.12, 1.15]);

  // Mouse Parallax Transforms for other layers
  const mouseStatueX = useTransform(mouseX, [0, 1], ["-1%", "1%"]);
  const mouseStatueY = useTransform(mouseY, [0, 1], ["-0.5%", "0.5%"]);
  const mouseGrassX = useTransform(mouseX, [0, 1], ["-2%", "2%"]);
  const mouseGrassY = useTransform(mouseY, [0, 1], ["-1%", "1%"]);
  const mouseTreeX = useTransform(mouseX, [0, 1], ["-1.5%", "1.5%"]);
  const mouseTreeY = useTransform(mouseY, [0, 1], ["-0.75%", "0.75%"]);


  // Layer 2: Statue Mid - Slight depth
  const statueYScroll = useTransform(smoothProgress, [0, 0.6], ["0%", "-5%"]);
  const statueScale = useTransform(smoothProgress, [0, 6], [1, 1.01]);
  const statueRotateY = useTransform(smoothProgress, [0, 0.6], [0, 1]);

  // Layer 3: Grass Foreground - Moderate depth
  const grassYScroll = useTransform(smoothProgress, [0, 0.6], ["0%", "-10%"]);
  const grassScale = useTransform(smoothProgress, [0, 0.6], [1, 1.03]);

  // Layer 4: Right Tree - Moderate depth
  const treeYScroll = useTransform(smoothProgress, [0, 0.6], ["0%", "-8%"]);
  const treeRotate = useTransform(smoothProgress, [0, 0.6], [0, -1]);
  const treeScale = useTransform(smoothProgress, [0, 0.6], [1, 1.02]);

  // Text content fades out
  const opacityText = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  // Fog Parallax
  const fogMidY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  return <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#060408]" style={{
    perspective: "1000px"
  }}>
      
      {/* ===== Layer 1: Deep Background Ruins (Moved from App.tsx) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Fade Gradient for Navbar visibility */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#060408] to-transparent z-10" />

        <motion.img 
          style={{
            x: bgX,
            y: bgYParallax,
            scale: bgScale
          }} 
          src="/bg_ruins.png" 
          className="w-[140vw] h-[140vh] left-[0vw] top-[-40vh] object-cover object-bottom grayscale-[0.05] contrast-[1.1] brightness-[0.7] absolute will-change-transform" 
          alt="Deep Background" 
          fetchPriority="high" 
          decoding="async" 
        />

        {/* Cinematic Black Overlay for Readability */}
        <div className="absolute inset-0 bg-black/15 z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] z-25" />
      </div>

      {/* Cinematic Diagonal Shine Sweep */}
      <ShineOverlay delay={1.5} duration={3} />

      {/* ===== Layer 2: Statue (Left, distinct, some padding) ===== */}
      <motion.div style={{
      y: statueYScroll,
      x: mouseStatueX,
      translateY: mouseStatueY,
      scale: statueScale,
      rotateY: statueRotateY,
      transformStyle: "preserve-3d"
    }} className="hidden min-[450px]:block absolute bottom-[0%] md:bottom-[-10%] lg:bottom-[-18%] left-[-10vw] md:left-[-5vw] lg:left-[2vw] z-10 pointer-events-none origin-bottom will-change-transform">
        <motion.img src="/statue.png" className="h-[135vh] md:h-[135vh] lg:h-[185vh] w-auto max-w-[100vw] md:max-w-[85vw] lg:max-w-[80vw] object-contain object-bottom drop-shadow-[50px_0_30px_rgba(0,0,0,0.3)]" alt="Statue" loading="eager" fetchPriority="high" decoding="async" />
      </motion.div>

      {/* ===== Atmospheric Fog Mid ===== */}
      <FogLayer color="rgba(255,255,255,0.02)" speed={25} opacity={0.1} className="z-15" yOffset={fogMidY as any} />

      {/* ===== Layer 3: Grass Foreground (Bottom Left Edge) ===== */}
      <motion.div style={{
      y: grassYScroll,
      x: useTransform(smoothProgress, [0, 0.6], ["0%", "-2%"]),
      translateX: mouseGrassX,
      translateY: mouseGrassY,
      scale: grassScale
    }} className="hidden min-[450px]:block absolute bottom-[-2%] md:bottom-[-8%] lg:bottom-[-9%] left-[-2vw] z-20 pointer-events-none origin-bottom-left will-change-transform">
        <motion.img src="/grass.png" className="w-[120vw] md:w-[75vw] lg:w-[66vw] min-w-[300px] h-auto object-contain object-bottom drop-shadow-[20px_0_30px_rgba(0,0,0,0.8)]" alt="Grass" loading="eager" decoding="async" />
      </motion.div>

      {/* ===== Layer 4: Right Tree Foreground (Bottom Right Edge) ===== */}
      <motion.div style={{
      y: treeYScroll,
      x: useTransform(smoothProgress, [0, 0.6], ["0%", "-1%"]),
      translateX: mouseTreeX,
      translateY: mouseTreeY,
      rotate: treeRotate,
      scale: treeScale
    }} className="hidden min-[450px]:block absolute bottom-[0%] md:bottom-[-8%] lg:bottom-[-9%] right-[-5vw] md:right-[-2vw] lg:right-[-5vw] z-20 pointer-events-none origin-bottom-right will-change-transform">
        <motion.img src="/tree.png" className="w-[110vw] md:w-[60vw] lg:w-[45vw] min-w-[280px] h-auto object-contain object-bottom drop-shadow-[-20px_0_30px_rgba(0,0,0,0.8)]" alt="Tree" loading="eager" decoding="async" />
      </motion.div>

      {/* ===== Subtle Mystical Particles ===== */}
      <ParticleSystem count={prefersReducedMotion ? 8 : 20} />

      {/* Main Text Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-5xl translate-y-[15px] md:translate-y-[15px] lg:translate-y-[15px]">
        <div className="mb-12 relative animate-none">
          <MouseParallax factor={40}>
            <div className="relative">
              <Logo className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-white" useGradient={false} />
            </div>
          </MouseParallax>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl font-black tracking-[0.15em] md:tracking-[0.25em] lg:tracking-[0.3em] text-white uppercase font-display drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-center">
            <span className="inline-block align-middle">NYTW<WolfEyeO />LF</span> <span className="text-[#A855C5]">GAMES</span>
          </h1>

          <div className="flex flex-col items-center gap-1 mt-2">
            <p className="text-[11px] sm:text-sm lg:text-base text-[#c79a40] tracking-[0.2em] font-medium uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Strategic Worlds Controlled Execution
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Three Cascading Chevrons */}
      <motion.div style={{
      opacity: opacityText
    }} initial={{
      opacity: 1
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 2.5,
      duration: 1
    }} className="absolute bottom-[2vh] sm:bottom-[3vh] md:bottom-[4vh] lg:bottom-[5vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0 pointer-events-none">
        {[0, 1, 2].map(i => <motion.div key={i} animate={{
        opacity: [0.15, 1, 0.15],
        y: [0, 5, 0]
      }} transition={{
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.22
      }}>
            <svg className="w-[16px] md:w-[18px] lg:w-[22px] h-auto" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 11L21 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>)}
      </motion.div>

    </section>;
};

export default Hero;
