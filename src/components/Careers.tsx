import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';

const Careers = ({
  onNavItemClick
}: {
  onNavItemClick: (id: string) => void;
}) => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLElement>(null);
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

  // ========== ENVIRONMENTAL PARALLAX LAYERS ==========
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const midLeftY = useTransform(smoothProgress, [0, 1], ["5%", "-15%"]);
  const midRightY = useTransform(smoothProgress, [0, 1], ["10%", "-20%"]);
  const skyGlowOpacity = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 0.1, 1, 0]);

  // ========== CONTENT REVEAL LAYERS ==========
  const bgOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.85, 1], [0, 1, 1, 0]);
  const h1Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const btnOpacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  const roles = [
    {
      title: "Development",
      icon: <Code />,
      text: "Build gameplay systems, tools and immersive mechanics."
    },
    {
      title: "Art",
      icon: <Paintbrush />,
      text: "Craft worlds, characters and visual storytelling."
    },
    {
      title: "Design",
      icon: <LayoutGrid />,
      text: "Shape gameplay experiences and player journeys."
    }
  ];

  return (
    <section ref={sectionRef} id="careers" className="relative min-h-screen flex flex-col justify-center section-spacing bg-[#0F0B14] overflow-hidden border-t border-white/5" style={{ perspective: "1500px" }}>
      {/* LAYER 1: Background */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-[-5%] z-0 pointer-events-none origin-center">
        <img src="/buildthefutureBG.png" alt="Build the Future Background" className="w-full h-full object-cover object-center brightness-[0.6] contrast-[1.1] saturate-[0.8]" loading="lazy" />
        
        {/* Scroll-Driven Glow Overlay */}
        <motion.img 
          style={{ 
            opacity: skyGlowOpacity,
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 60%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 60%)"
          }} 
          src="/buildthefutureBG.png" 
          className="absolute inset-0 w-full h-full object-cover object-center mix-blend-color-dodge contrast-[1.5] brightness-[1.2] saturate-[1.2]" 
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,4,8,0.4)_0%,rgba(6,4,8,0.95)_100%)] z-10" />
      </motion.div>

      <div className="container-1440 relative z-10 py-2 lg:py-0">
        <div className="text-center mb-8">
          <motion.div style={{ opacity: h1Opacity }}>
            <span className="text-[#c79a40] tracking-[0.5em] uppercase text-[10px] md:text-xs font-bold mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">JOIN THE GUILD</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
              BUILD THE <span className="text-[#A855C5]">FUTURE</span> <br /> WITH US
            </h2>
            <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4">
              We are always looking for passionate, talented individuals. At NYTWOLF, your voice matters.
            </p>
          </motion.div>
        </div>

        <motion.div style={{ opacity: cardOpacity }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 mb-12">
          {roles.map((role, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setIsHoveringCard(true)} 
              onMouseLeave={() => setIsHoveringCard(false)} 
              className="group relative p-8 border border-white/5 bg-[#0F0B14]/40 backdrop-blur-md transition-all duration-500 flex flex-col items-center text-center cursor-default hover:border-[#A855C5]/50 hover:bg-[#0F0B14]/60"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c79a40] group-hover:scale-110 group-hover:border-[#c79a40]/40 transition-all duration-500 mb-6">
                {React.cloneElement(role.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
              </div>

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl font-black text-white uppercase tracking-widest group-hover:text-[#c79a40] transition-colors duration-300">
                  {role.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-medium transition-colors duration-500 group-hover:text-white/80">
                  {role.text}
                </p>
              </div>

              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#A855C5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        <motion.div style={{ opacity: btnOpacity }} className="flex justify-center">
          <motion.a 
            href="https://www.linkedin.com/company/nytwolf-games/" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="px-12 py-5 bg-gradient-to-r from-[#A855C5] to-[#4A1C56] text-white font-bold uppercase tracking-[0.3em] text-sm rounded-3xl flex items-center gap-4 group border border-[#A855C5] shadow-[0_10px_30px_rgba(168,85,197,0.4)] transition-all relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              View Openings
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;
