import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import { CinematicBackground } from './common/Layout';

const FeatureCard = React.memo(({
  feature,
  smoothProgress,
  setIsHoveringCard
}: {
  feature: any;
  smoothProgress: any;
  setIsHoveringCard: (val: boolean) => void;
}) => {
  const cardOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return <motion.div style={{
    opacity: cardOpacity
  }} onMouseEnter={() => setIsHoveringCard(true)} onMouseLeave={() => setIsHoveringCard(false)} className="relative p-5 md:p-6 lg:p-7 border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-md group overflow-hidden transition-all duration-500 hover:border-[#A855C5]/50">
    <div className="absolute inset-0 bg-gradient-to-r from-[#A855C5]/0 via-[#A855C5]/20 to-[#A855C5]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    <h3 className="text-base md:text-lg lg:text-xl font-black text-white uppercase tracking-widest mb-2 group-hover:text-[#c79a40] transition-colors">
      {feature.title}
    </h3>
    <p className="text-xs md:text-sm lg:text-base text-white/60 leading-relaxed font-medium">
      {feature.desc}
    </p>
  </motion.div>;
});



const About = () => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Apply Spring Damping to Scroll for that AAA Smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 70,
    restDelta: 0.001
  });

  // 1. Deep Background Layer (Moves very slowly down)
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  // 2. Mid-Ground Environment/Ruins Layer (Moves medium speed opposite to scroll)
  const midY = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  const midScaleX = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  // 3. Foreground Gaming Objects (Moves very fast, extreme depth)
  const fgLeftY = useTransform(smoothProgress, [0, 1], ["60%", "-80%"]);
  const fgRightY = useTransform(smoothProgress, [0, 1], ["40%", "-100%"]);
  const fgRotate = useTransform(smoothProgress, [0, 1], [15, -15]);

  // Main Text Fade Animation
  // Fade in at 0.2, hold until 0.8, then fade out
  const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Hero Right Image
  // Enter by 0.25, hold until 0.75, then exit
  const imageY = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [400, 0, 0, -400]);
  const imageScale = useTransform(smoothProgress, [0, 0.25, 1], [0.7, 1, 1.4]);
  const imageRotateY = useTransform(smoothProgress, [0, 0.25, 1], [45, 0, -45]);
  const imageClip = useTransform(smoothProgress, [0, 0.25, 0.75, 1], ["inset(100% 0 0 0)", "inset(-20% -20% -20% -20%)", "inset(-20% -20% -20% -20%)", "inset(0 0 100% 0)"]);
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
  return <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 md:py-20 lg:py-12 bg-[#060408] overflow-hidden" style={{
    perspective: "2000px"
  }}>
    {/* Cinematic Section Blending (Top & Bottom Transition) - Compact blend */}
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[60] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[60] pointer-events-none" />

    {/* ===== LAYER 0: STUDIO BACKGROUND (Visible only when covered) ===== */}
    <motion.div 
      style={{
        opacity: useTransform(smoothProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]),
        y: useTransform(smoothProgress, [0, 1], ["-5%", "5%"]),
        scale: useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1])
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <img src="/StudioBG.png" className="w-full h-full object-cover brightness-[0.25]" alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060408] via-transparent to-[#060408]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,20,60,0.1)_0%,transparent_100%)]" />
    </motion.div>

    {/* ===== LAYER 1: DEEP BACKGROUND (Slow Parallax) ===== */}
    <motion.div style={{
      y: bgY
    }} className="absolute inset-0 pointer-events-none z-[1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,20,60,0.2)_0%,transparent_100%)]" />
      {/* Giant textured background sphere (Moon/Planet illusion) */}
      <div className="absolute -top-[20%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(168,85,197,0.1)_0%,transparent_70%)] rounded-full blur-[100px]" />
    </motion.div>

    {/* ===== LAYER 2: MID-GROUND ENVIRONMENT (Medium Reverse Parallax) ===== */}
    <motion.div style={{
      y: midY,
      scaleX: midScaleX
    }} className="absolute inset-0 pointer-events-none z-[2] flex items-center justify-center opacity-30">
      {/* Stylized geometric background elements representing structures or ruins */}
      <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#A855C5] to-transparent absolute top-1/4 -rotate-6" />
      <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#A855C5] to-transparent absolute bottom-1/3 rotate-3" />
      {/* Floating background monoliths */}
      <div className="absolute left-[10%] top-[40%] w-32 h-[500px] border border-[#A855C5]/20 bg-[#0F0B14]/50 backdrop-blur-sm -rotate-12 transform-gpu" />
      <div className="absolute right-[5%] top-[20%] w-64 h-[800px] border border-[#A855C5]/10 bg-[#0F0B14]/30 backdrop-blur-sm rotate-6 transform-gpu" />
    </motion.div>

    {/* ===== MAIN CONTENT ===== */}
    <div className="container-1440 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-8 lg:mb-12 relative">

        {/* Left Column: 3D Heavy Text Reveal */}
        <motion.div style={{
          opacity: textOpacity
        }} className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tighter text-white leading-[1.05] uppercase mb-4 lg:mb-6 drop-shadow-[0_20px_50px_rgba(168,85,197,0.5)]">
              WE BUILD WORLDS <br />
              WHERE <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#c79a40] to-[#A855C5] pb-2">STRATEGY</span> <br />
              REIGNS
            </h2>

            <div className="w-16 h-1.5 bg-[#A855C5] mb-6 lg:mb-8" />

            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed max-w-xl font-medium tracking-wide">
              NYTWOLF Games is a passionate studio crafting immersive medieval sandbox worlds where every decision matters.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Static Image with Hover Animation */}
        <div className="hidden lg:block lg:col-span-6">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden border-2 border-white/10 group">
            <div className="absolute inset-0 bg-[#A855C5]/20 mix-blend-overlay z-10 pointer-events-none" />
            <img src="https://i.pinimg.com/736x/78/e8/10/78e81059f1e19ddbf772424da5409863.jpg" alt="Cinematic Medieval Landscape" className="w-full h-full object-cover brightness-[0.8] contrast-125 saturate-50 transition-all duration-[1000ms] group-hover:scale-[1.1] group-hover:saturate-100" referrerPolicy="no-referrer" />
            {/* Sci-fi/Fantasy UI Crosshairs */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#c79a40] z-20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#c79a40] z-20" />
          </div>
        </div>
      </div>

      {/* Feature Blocks: Layered Extrusion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8" style={{
        perspective: "1500px"
      }}>
        {features.map((feature, i) => <FeatureCard key={i} feature={feature} smoothProgress={smoothProgress} setIsHoveringCard={setIsHoveringCard} />)}
      </div>
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
