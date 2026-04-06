import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import { ParticleSystem } from './common/Layout';





const FeaturedProject = () => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,       // Increased for more control and less bounce
    stiffness: 55,     // Lowered for a slower, more cinematic motion
    mass: 1,           // Added weight for a more "heavy" feel
    restDelta: 0.0001
  });

  // ========== ANIMATED KNIGHT FRAMES ==========
  const totalFrames = 153;
  const frames = React.useMemo(() =>
    Array.from({ length: totalFrames }, (_, i) =>
      `/KnightSwordFrames/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`
    ), []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastIndexRef = useRef<number>(-1);

  // Preload images into objects
  useEffect(() => {
    let loadedCount = 0;
    frames.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        imagesRef.current[idx] = img;
        // Draw first frame once loaded and if it's the first image
        if (idx === 0) {
          renderCanvas(0);
        }
      };
    });
  }, [frames]);

  const renderCanvas = (index: number) => {
    // Avoid redundant renders
    if (index === lastIndexRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Set dimensions once or when changed (though frames should be consistent)
    if (canvas.width !== img.naturalWidth) canvas.width = img.naturalWidth;
    if (canvas.height !== img.naturalHeight) canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw directly - can add subtle motion blur if we track delta, but single frames are cleaner
    ctx.drawImage(img, 0, 0);
    lastIndexRef.current = index;
  };

  const knightFrame = useMotionValue(0);
  const [animationPhase, setAnimationPhase] = useState<'intro' | 'active' | 'outro'>('intro');

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Thresholds: entrance phase is before 0.25, exit phase is after 0.75
      if (latest < 0.25) {
        if (animationPhase !== 'intro') setAnimationPhase('intro');
      } else if (latest < 0.75) {
        if (animationPhase !== 'active') setAnimationPhase('active');
      } else {
        if (animationPhase !== 'outro') setAnimationPhase('outro');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, animationPhase]);

  useEffect(() => {
    let target = 0;
    if (animationPhase === 'active') target = 100;
    if (animationPhase === 'outro') target = 153;

    animate(knightFrame, target, {
      duration: 1.8,
      ease: [0.42, 0, 0.58, 1]
    });
  }, [animationPhase, knightFrame]);

  useEffect(() => {
    const unsubscribe = knightFrame.on("change", (latest) => {
      const index = Math.min(Math.max(Math.round(latest), 0), totalFrames - 1);
      renderCanvas(index);
    });
    return () => unsubscribe();
  }, [knightFrame, totalFrames]);

  // ========== AAA CINEMATIC PARALLAX LAYERS ==========

  // Cleaned up transforms: Removed scale (zoom) and kept only subtle Y parallax
  const skyY = useTransform(smoothProgress, [0, 1], ["0%", "5%"]);

  const battlefieldY = useTransform(smoothProgress, [0, 1], ["0%", "-5%"]);
  const battlefieldX = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);

  // Knight: Vertical descent profile (Top to Bottom motion on scroll)
  const knightY = useTransform(smoothProgress, [0, 1], ["-25%", "25%"]);

  // 4. Content Reveal
  const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // 5. Atmospheric Enhancements - Simplified
  const vignetteOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]);
  const lightShift = useTransform(smoothProgress, [0, 1], ["rgba(168,85,197,0.05)", "rgba(199,154,64,0.05)"]);
  const containerVariants: any = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.45, 0, 0.58, 1]
      }
    }
  };
  const itemVariants: any = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.45, 0, 0.58, 1]
      }
    }
  };
  return <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center section-spacing bg-[#060408] overflow-hidden" style={{
    perspective: "1500px"
  }}>
    {/* Cinematic Section Blending */}
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[60] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[60] pointer-events-none" />

    {/* LAYER 1: Background Sky */}
    <motion.div style={{
      y: skyY,
      translateZ: 0
    }} className="absolute inset-x-[-5%] inset-y-[-10%] z-0 pointer-events-none will-change-transform">
      <img src="/sky.png" className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]" alt="" loading="lazy" />
    </motion.div>

    {/* LAYER 2: Midground Battlefield */}
    <motion.div style={{
      y: battlefieldY,
      translateZ: 0
    }} className="absolute inset-0 z-10 pointer-events-none will-change-transform opacity-60 flex items-center justify-center overflow-hidden">
      <img src="/battlefield.png" className="w-full h-full object-cover brightness-[0.8] contrast-[1.15] saturate-[1.1]" alt="" />
    </motion.div>




    <motion.div style={{
      y: knightY,
      translateZ: 0
    }} className="hidden md:block absolute bottom-[-2%] md:bottom-[-5%] lg:bottom-[-8%] left-[-15%] xl:left-[-10%] w-[90vw] md:w-[70vw] lg:w-[45vw] z-30 pointer-events-none will-change-transform origin-bottom">
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
        style={{ mixBlendMode: 'screen' }}
      />
    </motion.div>

    {/* ATMOSPHERIC: Dynamic Vignette */}
    <motion.div style={{
      opacity: vignetteOpacity
    }} className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,4,8,0.8)_100%)]" />

    {/* ATMOSPHERIC: Gradient Lighting Shifter */}
    <motion.div style={{
      backgroundColor: lightShift
    }} className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay" />

    <div className="container-1440 relative z-50">
      <motion.div style={{
        opacity: textOpacity
      }} className="max-w-4xl will-change-transform">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-10%"
        }} className="space-y-10">
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="text-[#c79a40] tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs font-bold block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">CURRENT WORLD</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tighter text-white uppercase leading-[1.05] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              PROJECT <br />
              <span className="text-white">GREEN LEAF</span>
            </h2>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base md:text-xl lg:text-2xl text-text-muted leading-relaxed font-medium italic max-w-2xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] border-l-4 border-[#efb034]/70 pl-6 md:pl-8">

            A brutal medieval sandbox where kingdoms rise, alliances fracture, and every decision echoes across generations
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 md:gap-4 pt-4">
            {["Grand Strategy", "Medieval Sandbox", "PC"].map((tag, i) => <span key={i} className="px-4 py-1.5 md:px-6 md:py-2.5 bg-black/60 backdrop-blur-xl text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] border border-white/10 text-white hover:border-[#c79a40]/50 hover:text-[#c79a40] transition-all duration-500 rounded-none shadow-2xl">
              {tag}
            </span>)}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-[#efb034]/15 backdrop-blur-md border border-[#efb034]/40 rounded-full shadow-[0_0_40px_rgba(239,176,52,0.25)]">
                <motion.div animate={{
                  opacity: [0.6, 1, 0.6]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} className="w-2.5 h-2.5 rounded-full bg-[#efb034] shadow-[0_0_15px_#efb034]" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  IN DEVELOPMENT
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>

  </section>;
};

export default FeaturedProject;
