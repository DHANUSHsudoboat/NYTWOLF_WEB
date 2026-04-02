import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';

const Services = () => {
  const { setIsHoveringCard } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30, stiffness: 70, restDelta: 0.001
  });

  // ========== ENVIRONMENTAL PARALLAX LAYERS ==========
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const midLeftY = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  const midRightY = useTransform(smoothProgress, [0, 1], ["40%", "-30%"]);
  const fgY1 = useTransform(smoothProgress, [0, 1], ["50%", "-80%"]);
  const fgX1 = useTransform(smoothProgress, [0, 1], ["10%", "-5%"]);
  const fgRot1 = useTransform(smoothProgress, [0, 1], [0, -45]);
  const fgY2 = useTransform(smoothProgress, [0, 1], ["80%", "-120%"]);
  const fgRot2 = useTransform(smoothProgress, [0, 1], [0, 90]);

  // ========== CONTENT REVEAL LAYERS ==========
  const h1Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const cardsOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const services = [
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Game Development",
      desc: "Full-cycle production from concept to launch. Deep systems, scalable architecture, and high-fidelity gameplay."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "UI/UX Design",
      desc: "Immersive interfaces crafted to disappear into the world while enhancing clarity and control."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Art & Animation",
      desc: "Cinematic environments, stylized characters, and motion that breathes life into every frame."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Ops & Support",
      desc: "Long-term evolution through content updates, balancing, and performance optimization."
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center section-spacing bg-[#060408] overflow-hidden" style={{ perspective: "1500px" }}>
      {/* LAYER 1: Deep Background Atmosphere */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 pointer-events-none opacity-40 origin-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.15)_0%,transparent_70%)] blur-[50px]" />
      </motion.div>

      {/* LAYER 2: Midground Environment (Pillars / Architecture) */}
      <motion.div style={{ y: midLeftY }} className="absolute top-[20%] -left-[5%] z-0 pointer-events-none opacity-20">
        <div className="w-[30vw] h-[60vh] bg-gradient-to-b from-[#A855C5]/40 to-transparent clip-path-polygon-[10%_0%,_90%_0%,_100%_100%,_0%_100%] blur-sm rotate-[-10deg] drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" />
      </motion.div>
      <motion.div style={{ y: midRightY }} className="absolute top-[40%] -right-[10%] z-0 pointer-events-none opacity-30">
        <div className="w-[25vw] h-[50vh] bg-gradient-to-b from-[#c79a40]/20 to-transparent clip-path-polygon-[20%_0%,_80%_0%,_100%_100%,_0%_100%] blur-[2px] rotate-[15deg] drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" />
      </motion.div>

      <div className="container-1440 relative z-10 block">
        {/* ====== 1. CORE CAPABILITIES ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-4 md:mb-6 lg:mb-10 px-6 md:px-0">
          <div className="lg:col-span-5 relative z-10 lg:translate-y-12">
            <motion.div style={{ opacity: h1Opacity }}>
              <span className="text-[#c79a40] tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs font-bold mb-2 md:mb-3 lg:mb-6 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">OUR EXPERTISE</span>
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-none mb-2 md:mb-3 lg:mb-6 uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                CORE <br />
                <span className="text-[#b347d1] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">CAPABILITIES</span>
              </h2>
              <p className="text-sm md:text-sm lg:text-base text-white/90 leading-relaxed max-w-md font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                We engineer worlds, systems, and experiences that push the boundaries of immersive strategy gaming.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              style={{ opacity: cardsOpacity }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
            >
              {services.map((s, i) => (
                <div
                  key={i}
                  className="relative p-4 border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-md group overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A855C5]/0 via-[#A855C5]/10 to-[#A855C5]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out" />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <div className="w-10 h-10 md:w-11 md:h-11 lg:w-14 lg:h-14 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#A855C5] group-hover:scale-110 group-hover:text-[#c79a40] group-hover:border-[#c79a40]/30 transition-all duration-500">
                      {React.cloneElement(s.icon as React.ReactElement<any>, { className: "w-5 h-5 md:w-6 md:h-6" })}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm md:text-[13px] lg:text-lg font-black text-white uppercase tracking-wider transition-all duration-500 group-hover:text-[#c79a40]">
                        {s.title}
                      </h3>
                      <p className="text-[9px] md:text-[10px] lg:text-[11px] text-white/40 leading-relaxed font-medium transition-colors duration-500 group-hover:text-white/70">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Fast Foreground (Artifacts/Weapons intersecting content space) */}
      <motion.div style={{ y: fgY1, x: fgX1, rotate: fgRot1 }} className="absolute bottom-[20%] left-[8%] z-30 pointer-events-none opacity-90 drop-shadow-[20px_20px_30px_rgba(0,0,0,0.8)]">
        <div className="w-[12vw] h-[40vh] bg-gradient-to-tr from-[#c79a40] to-transparent clip-path-polygon-[50%_0%,_100%_100%,_0%_100%] blur-[2px]" />
      </motion.div>

      <motion.div style={{ y: fgY2, rotate: fgRot2 }} className="absolute bottom-[60%] right-[10%] z-30 pointer-events-none opacity-80 drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.8)]">
        <div className="w-[20vw] h-[20vw] border-t-[8px] border-r-[4px] border-[#A855C5] rounded-full blur-[1px] opacity-70" />
      </motion.div>
    </section>
  );
};

export default Services;
