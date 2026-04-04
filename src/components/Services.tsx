import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion, useMotionTemplate } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';

const ServiceCard = ({ service, index, scrollProgress }: { service: any; index: number; scrollProgress: any; key?: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 1. SCROLL-DRIVEN BURST (CENTER TO GRID)
  const burstProgress = useTransform(scrollProgress, [0.0, 0.2], [0, 1]);
  const flipProgress = useTransform(scrollProgress, [0.22, 0.42], [0, 1]);

  // Burst center starting points (Pixels for precision)
  const xOffset = index % 2 === 0 ? "80px" : "-80px";
  const yOffset = index < 2 ? "120px" : "-120px";

  // Stage 1: Burst outwards (0 to 0.3)
  const burstX = useTransform(burstProgress, [0, 1], [xOffset, "0px"]);
  const burstY = useTransform(burstProgress, [0, 1], [yOffset, "0px"]);

  // Stage 2: Global Upward Drift (0 to 1)
  const driftY = useTransform(scrollProgress, [0, 1], ["50px", "-20px"]);

  // Combining them via MotionTemplate for smooth 3D feel
  const y = useMotionTemplate`calc(${burstY} + ${driftY})`;
  const x = burstX;
  
  const scrollScale = useTransform(burstProgress, [0, 0.8], [0.5, 1]);
  const scrollOpacity = useTransform(burstProgress, [0, 0.2], [0, 1]);

  // Flipping effect: Unique rotation angles for each card to create a "blooming" effect
  const initialRotX = index < 2 ? 90 : -90;
  const initialRotY = index % 2 === 0 ? 30 : -30;

  const flipRotateX = useTransform(flipProgress, [0, 1], [initialRotX, 0]);
  const flipRotateY = useTransform(flipProgress, [0, 1], [initialRotY, 0]);
  const contentOpacity = useTransform(flipProgress, [0.4, 0.9], [0, 1]);

  // Smooth out the motion - higher stiffness reduces "lag" feel
  const rotateXMouse = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 220 });
  const rotateYMouse = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable hover tilt until the 180-degree flip is finished (at 0.42 progress)
    if (scrollProgress.get() < 0.42) return;

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
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: x,
        y: y,
        scale: scrollScale,
        opacity: scrollOpacity,
        rotateX: flipRotateX,
        rotateY: flipRotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-6 md:p-8 border border-white/5 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-xl group overflow-hidden"
    >
      <motion.div
        style={{
          rotateX: rotateXMouse,
          rotateY: rotateYMouse,
          opacity: contentOpacity,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col items-center text-center space-y-4"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#A855C5] group-hover:text-[#c79a40] group-hover:border-[#c79a40]/30 transition-all duration-500 shadow-2xl" style={{ transform: "translateZ(30px)" }}>
          {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-7 h-7 md:w-8 md:h-8" })}
        </div>
        <div className="space-y-2" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-base md:text-lg lg:text-xl font-black text-white uppercase tracking-wider group-hover:text-[#c79a40] transition-colors">
            {service.title}
          </h3>
          <p className="text-[10px] md:text-xs lg:text-sm text-white/50 leading-relaxed font-medium group-hover:text-white/80 max-w-[280px] transition-colors">
            {service.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25, stiffness: 100, restDelta: 0.001
  });

  // ========== ENVIRONMENTAL PARALAX LAYERS ==========
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const midLeftY = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  const midRightY = useTransform(smoothProgress, [0, 1], ["40%", "-30%"]);
  const fgY1 = useTransform(smoothProgress, [0, 1], ["50%", "-80%"]);
  const fgX1 = useTransform(smoothProgress, [0, 1], ["10%", "-5%"]);
  const fgRot1 = useTransform(smoothProgress, [0, 1], [0, -45]);
  const fgY2 = useTransform(smoothProgress, [0, 1], ["80%", "-120%"]);
  const fgRot2 = useTransform(smoothProgress, [0, 1], [0, 90]);

  const h1Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const services = [
    { icon: <Gamepad2 />, title: "Game Development", desc: "Full-cycle production from concept to launch. Deep systems, scalable architecture, and high-fidelity gameplay." },
    { icon: <Layout />, title: "UI/UX Design", desc: "Immersive interfaces crafted to disappear into the world while enhancing clarity and control." },
    { icon: <Palette />, title: "Art & Animation", desc: "Cinematic environments, stylized characters, and motion that breathes life into every frame." },
    { icon: <Zap />, title: "Live Ops & Support", desc: "Long-term evolution through content updates, balancing, and performance optimization." }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center section-spacing bg-[#060408] overflow-hidden" style={{ perspective: "2000px" }}>
      {/* Cinematic Section Blending */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[25] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[25] pointer-events-none" />
      {/* Background Layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.15)_0%,transparent_70%)] blur-[50px]" />
      </motion.div>

      <div className="container-1440 relative z-10 block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-4">
          <div className="lg:col-span-5 relative z-10 lg:translate-y-12">
            <motion.div style={{ opacity: h1Opacity }}>
              <span className="text-[#c79a40] tracking-[0.5em] uppercase text-xs font-bold mb-6 block">OUR EXPERTISE</span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-none mb-6 uppercase tracking-tighter">
                CORE <br />
                <span className="text-[#A855C5]">CAPABILITIES</span>
              </h2>
              <p className="text-base text-white/90 leading-relaxed max-w-md font-medium">
                We engineer worlds, systems, and experiences that push the boundaries of immersive strategy gaming.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {services.map((s, i) => (
                <ServiceCard key={i} service={s} index={i} scrollProgress={smoothProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Fast Foreground (Moved to background z-0 to avoid overlap) */}
      <motion.div style={{ y: fgY1, x: fgX1, rotate: fgRot1 }} className="absolute bottom-[20%] left-[-5vw] z-0 pointer-events-none opacity-50 drop-shadow-[20px_20px_30px_rgba(0,0,0,0.8)]">
        <div className="w-[12vw] h-[40vh] bg-gradient-to-tr from-[#c79a40] to-transparent clip-path-polygon-[50%_0%,_100%_100%,_0%_100%] blur-[2px]" />
      </motion.div>

      <motion.div style={{ y: fgY2, rotate: fgRot2 }} className="absolute bottom-[60%] right-[10%] z-30 pointer-events-none opacity-80 drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.8)]">
        <div className="w-[20vw] h-[20vw] border-t-[8px] border-r-[4px] border-[#A855C5] rounded-full blur-[1px] opacity-70" />
      </motion.div>
    </section>
  );
};

export default Services;
