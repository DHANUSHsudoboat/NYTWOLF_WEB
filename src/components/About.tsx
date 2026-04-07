import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion, useMotionValueEvent } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import { CinematicBackground } from './common/Layout';

import { useMotionTemplate } from 'motion/react';

const FeatureCard = React.memo(({
  feature,
  index,
  setIsHoveringCard
}: {
  feature: any;
  index: number;
  setIsHoveringCard: (val: boolean) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isInView = useInView(cardRef, { once: false, amount: 0.1 });
  const isVisible = isInView;

  const initialRotX = 45;
  const initialRotY = index === 0 ? 30 : index === 2 ? -30 : 0;

  // Mouse hover tilt
  const rotateXMouse = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 220 });
  const rotateYMouse = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    mouseX.set(mouseXPos / width - 0.5);
    mouseY.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHoveringCard(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringCard(true)}
      onMouseLeave={handleMouseLeave}
      initial={{
        rotateX: initialRotX,
        rotateY: initialRotY,
        opacity: 0,
        y: 40
      }}
      animate={isVisible ? {
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        y: 0
      } : {
        rotateX: initialRotX,
        rotateY: initialRotY,
        opacity: 0,
        y: 40
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative p-5 md:p-6 lg:p-7 border border-white/10 bg-[#0F0B14]/40 backdrop-blur-none md:backdrop-blur-md group overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#c79a40]/50 group-hover:border-t-[#c79a40]/80 group-hover:border-b-[#c79a40]/80 group-hover:shadow-[0_0_30px_rgba(199,154,64,0.1)] before:absolute before:inset-0 before:bg-gradient-to-t before:from-[#c79a40]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 contain-content"
    >
      {/* Top Border Accent Glow */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#c79a40]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <motion.div
        style={{
          rotateX: rotateXMouse,
          rotateY: rotateYMouse,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 space-y-4"
      >
        <h3 className="text-base md:text-lg lg:text-xl font-black text-white uppercase tracking-widest mb-2 group-hover:text-[#c79a40] transition-colors relative z-10" style={{ transform: "translateZ(20px)" }}>
          {feature.title}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-white/50 leading-relaxed font-medium relative z-10 group-hover:text-white/80 transition-colors duration-500" style={{ transform: "translateZ(10px)" }}>
          {feature.desc}
        </p>
      </motion.div>

      {/* Interactive Bottom Glow Bar */}
      <div className="absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-[#c79a40]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
});



const About = () => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  const isMobile = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Apply even higher response for 1-second animation feel
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 150,
    restDelta: 0.001
  });

  // 1. Deep Background Layer (Moves very slowly down)
  // Optimization: Disable background parallax on mobile to save CPU/GPU cycles
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "0%" : "15%"]);

  // 2. Mid-Ground Environment/Ruins Layer
  const midY = useTransform(smoothProgress, [0, 1], ["20%", isMobile ? "20%" : "-20%"]);
  const midScaleX = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  // 3. Foreground Gaming Objects (Moves very fast, extreme depth)
  const fgLeftY = useTransform(smoothProgress, [0, 1], ["60%", "-80%"]);
  const fgRightY = useTransform(smoothProgress, [0, 1], ["40%", "-100%"]);
  const fgRotate = useTransform(smoothProgress, [0, 1], [15, -15]);

  // ========== CONTENT REVEAL LAYERS (Coordinated for snap landing) ==========
  const h1Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const cardsOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Heading reveal styles (Triggered as we scroll towards section)
  const h2Y = useTransform(smoothProgress, [0.2, 0.42], [40, 0]);
  const h2RotX = useTransform(smoothProgress, [0.2, 0.42], [45, 0]);
  const h2RotY = useTransform(smoothProgress, [0.2, 0.42], [30, 0]);

  // Cards reveal group (Ensures cards settle before snapping)
  const cardsY = useTransform(smoothProgress, [0.25, 0.48], [150, 0]);
  const cardsRotX = useTransform(smoothProgress, [0.25, 0.48], [isMobile ? 0 : 30, 0]);
  const cardsClip = useTransform(smoothProgress, [0.25, 0.48], ["inset(100% 0 0 0)", "inset(-5% 0 -5% 0)"]);
  const features = [{
    title: "Strategic Depth",
    desc: "Meaningful systems. No shallow gameplay."
  }, {
    title: "Living Worlds",
    desc: "Dynamic AI and evolving environments."
  }, {
    title: "Player Agency",
    desc: "Every decision shapes the realm."
  }];
  return <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 md:py-16 lg:py-8 bg-[#060408] overflow-hidden" style={{
    perspective: "2000px"
  }}>
    {/* Cinematic Section Blending (Top & Bottom Transition) - Compact blend */}
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[60] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[60] pointer-events-none" />

    {/* ===== LAYER 1: DEEP BACKGROUND (Slow Parallax) ===== */}
    <motion.div style={{
      y: bgY
    }} className="absolute inset-0 pointer-events-none z-[1] gpu-layer will-change-transform">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,20,60,0.2)_0%,transparent_100%)]" />
      {/* Giant textured background sphere (Moon/Planet illusion) */}
      <div className="absolute -top-[20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(168,85,197,0.1)_0%,transparent_70%)] rounded-full blur-[100px]" />
    </motion.div>

    {/* ===== LAYER 2: MID-GROUND ENVIRONMENT (Medium Reverse Parallax) ===== */}
    <motion.div style={{
      y: midY,
      scaleX: midScaleX
    }} className="absolute inset-0 pointer-events-none z-[2] flex items-center justify-center opacity-30 gpu-layer will-change-transform">
      {/* Stylized geometric background elements representing structures or ruins */}
      <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#A855C5] to-transparent absolute top-1/4 -rotate-6" />
      <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#A855C5] to-transparent absolute bottom-1/3 rotate-3" />
      {/* Floating background monoliths */}
      <div className="absolute left-[10%] top-[40%] w-32 h-[500px] border border-[#A855C5]/20 bg-[#0F0B14]/50 backdrop-blur-sm -rotate-12 transform-gpu gpu-layer" />
      <div className="absolute right-[5%] top-[20%] w-64 h-[800px] border border-[#A855C5]/10 bg-[#0F0B14]/30 backdrop-blur-sm rotate-6 transform-gpu gpu-layer" />
    </motion.div>

    {/* ===== MAIN CONTENT ===== */}
    <div className="container-1440 relative z-10 flex flex-col gap-8 md:gap-12 py-8 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-2 lg:mb-4 relative">

        {/* Left Column: Cinematic Heading Reveal */}
        <motion.div
          style={{
            opacity: h1Opacity,
            y: h2Y,
            rotateX: isMobile ? 0 : h2RotX,
            rotateY: isMobile ? 0 : h2RotY,
            transformStyle: isMobile ? "flat" : "preserve-3d"
          }}
          className="lg:col-span-6 space-y-4 md:space-y-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-black tracking-tighter text-white leading-[1.05] uppercase mb-1 lg:mb-2 drop-shadow-[0_20px_50px_rgba(168,85,197,0.5)]">
              WE BUILD WORLDS <br />
              WHERE <span className="text-[#A855C5]">STRATEGY</span> <br />
              REIGNS
            </h2>

            <div className="w-16 h-1 bg-[#A855C5] mb-3 lg:mb-4" />

            <p className="text-sm md:text-base lg:text-base xl:text-lg text-white/80 leading-relaxed max-w-xl font-medium tracking-wide">
              NYTWOLF Games is a passionate studio crafting immersive medieval sandbox worlds where every decision matters.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Static Image with Hover Animation */}
        <div className="hidden lg:block lg:col-span-6">
          <div className="relative aspect-video rounded-sm overflow-hidden border-2 border-white/10 group">
            <div className="absolute inset-0 bg-[#A855C5]/20 mix-blend-overlay z-10 pointer-events-none" />
            <img src="https://i.pinimg.com/736x/78/e8/10/78e81059f1e19ddbf772424da5409863.jpg" alt="Cinematic Medieval Landscape" className="w-full h-full object-cover brightness-[0.8] contrast-125 saturate-50 transition-all duration-[1000ms] group-hover:scale-[1.1] group-hover:saturate-100" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            {/* Sci-fi/Fantasy UI Crosshairs */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#c79a40] z-20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#c79a40] z-20" />
          </div>
        </div>
      </div>

      {/* Feature Blocks: Clean 3D Reveal */}
      <motion.div
        style={{
          opacity: cardsOpacity,
          transformStyle: "preserve-3d"
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 pb-2"
      >
        {features.map((feature, i) => <FeatureCard key={i} feature={feature} index={i} setIsHoveringCard={setIsHoveringCard} />)}
      </motion.div>
    </div>

    {/* ===== LAYER 3: FAST FOREGROUND (High Speed Parallax) ===== */}
    <motion.div style={{
      y: fgLeftY,
      rotate: fgRotate
    }} className="absolute -left-[10%] top-[40%] w-[30vw] h-[30vw] pointer-events-none z-50 mix-blend-screen opacity-40">
      <div className="w-full h-full border-[40px] border-[#A855C5] rounded-full blur-[80px]" />
    </motion.div>

    <motion.div style={{
      y: fgRightY,
      rotate: useTransform(fgRotate, v => -v)
    }} className="absolute -right-[5%] top-[60%] w-[20vw] h-[20vw] pointer-events-none z-50 mix-blend-screen opacity-50">
      {/* Sharp geometric foreground element simulating a shard or weapon edge flying past */}
      <div className="w-full h-full bg-gradient-to-tr from-[#c79a40] to-transparent clip-path-polygon-[50%_0%,_100%_100%,_0%_100%] blur-[4px] rotate-45" />
    </motion.div>

  </section>;
};

export default About;
