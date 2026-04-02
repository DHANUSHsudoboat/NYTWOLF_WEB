import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';


const PoweringOurWorlds = () => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });
  const [isHovered, setIsHovered] = useState(false);
  const [randomPos, setRandomPos] = useState({
    x: 50,
    y: 50
  });

  // Use Motion Values for unified coordinate tracking
  const attractorX = useMotionValue(0);
  const attractorY = useMotionValue(0);

  // High-response Springs for instant cursor tracking
  const glowX = useSpring(attractorX, {
    damping: 30,
    stiffness: 250
  });
  const glowY = useSpring(attractorY, {
    damping: 30,
    stiffness: 250
  });

  // Periodic Random Target Update
  useEffect(() => {
    if (isHovered) return;
    const updateRandom = () => {
      setRandomPos({
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60
      });
    };
    updateRandom(); // Set initial
    const interval = setInterval(updateRandom, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Update attractor target based on state
  useEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    if (isHovered) {
      attractorX.set(mousePos.x);
      attractorY.set(mousePos.y);
    } else {
      // Map percentage randomPos to current section pixels
      attractorX.set(randomPos.x / 100 * rect.width);
      attractorY.set(randomPos.y / 100 * rect.height);
    }
  }, [isHovered, mousePos, randomPos, attractorX, attractorY]);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 70,
    restDelta: 0.001
  });
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  // Mask string state for the spotlight
  const [maskStyle, setMaskStyle] = useState("");

  // Sync mask string with spring values manually to avoid re-rendering the whole img
  useEffect(() => {
    const unsubX = glowX.on("change", latestX => {
      setMaskStyle(`radial-gradient(circle 450px at ${latestX}px ${glowY.get()}px, black 0%, transparent 80%)`);
    });
    const unsubY = glowY.on("change", latestY => {
      setMaskStyle(`radial-gradient(circle 450px at ${glowX.get()}px ${latestY}px, black 0%, transparent 80%)`);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [glowX, glowY]);
  const h2Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const techOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const techs = [{
    name: "Unreal Engine 5",
    desc: "Cinematic real-time rendering powered by Nanite and Lumen.",
    icon: "/icons/unreal.svg"
  }, {
    name: "Unity",
    desc: "Flexible multi-platform game development engine.",
    icon: "/icons/unity.svg"
  }, {
    name: "Figma",
    desc: "UI/UX prototyping and interface system design.",
    icon: "/icons/figma.svg"
  }, {
    name: "Blender",
    desc: "3D modeling, animation, and asset creation.",
    icon: "/icons/blender.svg"
  }, {
    name: "Adobe Creative Suite",
    desc: "Visual design, branding, and production workflows.",
    icon: "/icons/adobe.svg"
  }];
  return <section ref={sectionRef} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative min-h-screen flex flex-col justify-center section-spacing lg:py-12 bg-[#060408] overflow-hidden" style={{
    perspective: "1500px"
  }}>
      {/* ===== Interactive Tech Room Background Spotlight ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base Image Layer - Always slightly visible */}
        <motion.div animate={{
        opacity: isHovered ? 0.35 : 0.15
      }} transition={{
        duration: 1.2
      }} className="absolute inset-0 grayscale brightness-[0.25] contrast-[1.1]">
          <img src="/tech_room.png" className="w-full h-full object-cover" alt="" loading="lazy" decoding="async" />
        </motion.div>

        {/* Ambient Wandering / Following Purple Glow */}
        <motion.div style={{
        left: glowX,
        top: glowY
      }} animate={{
        scale: isHovered ? 1 : [0.8, 1.1, 0.8]
      }} transition={{
        scale: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }} className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.3)_0%,rgba(168,85,197,0.1)_30%,transparent_70%)] blur-[80px]" />
        </motion.div>

        {/* Interactive Spotlight Overlay - Intensifies on hover */}
        <motion.div className="absolute inset-0 z-20" animate={{
        opacity: isHovered ? 0.65 : 0.3
      }} transition={{
        duration: 1.2
      }} style={{
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle
      }}>
          <img src="/tech_room.png" className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.1] grayscale-0" alt="" loading="lazy" decoding="async" />
        </motion.div>

        {/* Ambient Glow */}
        <motion.div style={{
        y: bgY
      }} className="absolute inset-0 z-0 opacity-40 origin-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.15)_0%,transparent_70%)] blur-[50px]" />
        </motion.div>
      </div>

      <div className="container-1440 relative z-10">
        <motion.div style={{
        opacity: h2Opacity
      }} className="text-center mb-4 lg:mb-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black tracking-tighter text-white uppercase leading-none mb-4 lg:mb-5 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
            POWERING OUR <span className="text-[#A855C5]">WORLDS</span>
          </h2>
          <p className="text-sm md:text-lg lg:text-base text-text-muted tracking-[0.15em] md:tracking-[0.4em] uppercase font-bold max-w-4xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-6">
            Built with industry-leading tools. Executed with precision.
          </p>
        </motion.div>

        <motion.div style={{
        opacity: techOpacity
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4 max-w-7xl mx-auto relative z-10 px-4 md:px-0">
          {techs.map((tech, i) => <div key={i} onMouseEnter={() => setIsHoveringCard(true)} onMouseLeave={() => setIsHoveringCard(false)} className="relative p-4 md:p-5 lg:p-4 bg-black/40 backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-700 group cursor-default h-full flex flex-col items-start hover:border-[#efb034]/20">
              {/* Icon Container - Border disappears on hover */}
              <div className="mb-4 w-12 h-12 md:w-14 md:h-14 border border-white/10 flex items-center justify-center relative group-hover:border-transparent transition-all duration-500">
                <img src={tech.icon} alt={tech.name} className="w-6 h-6 md:w-7 md:h-7 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10" />
              </div>

              {/* Typography Structure */}
              <div className="space-y-1 relative z-10">
                <h3 className="text-base md:text-lg font-black text-white/90 uppercase tracking-wider transition-all duration-500 group-hover:text-[#efb034] group-hover:tracking-[0.12em]">
                  {tech.name}
                </h3>
                <p className="text-[10px] md:text-[11px] text-white/30 leading-relaxed font-medium transition-colors duration-500 group-hover:text-white/60 max-w-xs">
                  {tech.desc}
                </p>
              </div>

              {/* Subtle Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-20" />
            </div>)}
        </motion.div>
      </div>
    </section>;
};

export default PoweringOurWorlds;
