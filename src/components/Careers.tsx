import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion, useMotionValueEvent } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import { SECTION_HEADER, SECTION_LABEL, SECTION_DESC, CARD_HEADER, CARD_DESC, CARD_ICON_BOX, CARD_ICON, BUTTON_TEXT } from '../typography';

const CareerCard = ({ role, index, scrollProgress }: { role: any; index: number; scrollProgress: any; key?: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track if card has ever been revealed via top-down scroll
  const [hasRevealed, setHasRevealed] = useState(false);
  
  useMotionValueEvent(scrollProgress, "change", (latest: number) => {
    // Reveal cards one by one based on section progress
    const revealThreshold = 0.15 + (index * 0.03);
    if (latest >= revealThreshold && !hasRevealed) {
      setHasRevealed(true);
    }
    // Reset if section is scrolled back up significantly (to re-arm for next top-down pass)
    if (latest < 0.1) {
      setHasRevealed(false);
    }
  });

  const initialRotX = 45;
  const initialRotY = index % 3 === 0 ? 30 : index % 3 === 2 ? -30 : 0;

  // Mouse hover springs
  const rotateXMouse = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 200 });
  const rotateYMouse = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasRevealed) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      initial={{
        rotateX: initialRotX,
        rotateY: initialRotY,
        opacity: 0,
        y: 40
      }}
      animate={hasRevealed ? {
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative p-4 lg:p-4 border border-white/5 bg-[#0F0B14]/40 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-500 flex flex-col items-center text-center cursor-default hover:border-[#A855C5]/50 hover:bg-[#0F0B14]/60"
    >
      <motion.div style={{ rotateX: rotateXMouse, rotateY: rotateYMouse, transformStyle: "preserve-3d" }} className="flex flex-col items-center">
        <div className={`${CARD_ICON_BOX} rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c79a40] group-hover:scale-110 group-hover:border-[#c79a40]/40 transition-all duration-500 mb-3`} style={{ transform: "translateZ(30px)" }}>
          {React.cloneElement(role.icon as React.ReactElement<any>, { className: CARD_ICON })}
        </div>

        <div className="space-y-1.5 relative z-10" style={{ transform: "translateZ(20px)" }}>
          <h3 className={`${CARD_HEADER} text-white group-hover:text-[#c79a40] transition-colors duration-300`}>
            {role.title}
          </h3>
          <p className={`${CARD_DESC} text-white/50 transition-colors duration-500 group-hover:text-white/80`}>
            {role.text}
          </p>
        </div>
      </motion.div>
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#A855C5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const Careers = ({ onNavItemClick }: { onNavItemClick: (id: string) => void }) => {
  const { setIsHoveringCard } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 70 });

  // ========== UNIDIRECTIONAL PROGRESS (TOP-TO-BOTTOM ONLY) ==========
  const unidirectionalProgress = useMotionValue(0);
  const maxProgressRef = useRef(0);
  
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest > maxProgressRef.current) {
      maxProgressRef.current = latest;
      unidirectionalProgress.set(latest);
    }
    // Reset if the section is completely below the viewport (scrolled back up past it)
    if (latest <= 0) {
      maxProgressRef.current = 0;
      unidirectionalProgress.set(0);
    }
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const bgOpacity = useTransform(unidirectionalProgress, [0.3, 0.5], [0, 1]);
  const h1Opacity = useTransform(unidirectionalProgress, [0, 0.15], [0, 1]);
  const btnOpacity = useTransform(unidirectionalProgress, [0, 0.25], [0, 1]);

  const roles = [
    { title: "Development", icon: <Code />, text: "Build gameplay systems, tools and immersive mechanics." },
    { title: "Art", icon: <Paintbrush />, text: "Craft worlds, characters and visual storytelling." },
    { title: "Design", icon: <LayoutGrid />, text: "Shape gameplay experiences and player journeys." }
  ];

  return (
    <section ref={sectionRef} id="careers" className="relative min-h-screen flex flex-col justify-center section-spacing bg-[#0F0B14] overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[25] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[25] pointer-events-none" />
      
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 z-0 pointer-events-none origin-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(168,85,197,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168,85,197,1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.1)_0%,transparent_70%)] z-1" />
      </motion.div>

      <div className="container-1440 relative z-10 py-2 lg:py-0">
        <div className="text-center mb-5 lg:mb-4">
          <motion.div style={{ opacity: h1Opacity }}>
            <span className={`${SECTION_LABEL} text-[#c79a40] mb-2 block`}>JOIN THE GUILD</span>
            <h2 className={`${SECTION_HEADER} text-white mb-3 lg:mb-2`}>
              BUILD THE <span className="text-[#A855C5]">FUTURE</span> <br /> WITH US
            </h2>
            <p className={`${SECTION_DESC} text-text-muted max-w-xl mx-auto`}>
              We are always looking for passionate, talented individuals. At NYTWOLF, your voice matters
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto px-6 mb-5 lg:mb-4">
          {roles.map((role, i) => (
            <CareerCard key={i} role={role} index={i} scrollProgress={unidirectionalProgress} />
          ))}
        </div>

        <motion.div style={{ opacity: btnOpacity }} className="flex justify-center">
          <motion.a 
            href="https://www.linkedin.com/company/nytwolf-games/" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            className={`w-full max-w-[320px] md:w-auto px-8 md:px-10 lg:px-8 py-3 md:py-4 lg:py-3 bg-gradient-to-r from-[#A855C5] to-[#4A1C56] text-white rounded-full flex items-center justify-center gap-3 group border border-[#A855C5]/50 shadow-[0_10px_30px_rgba(168,85,197,0.3)] transition-all duration-300 ${BUTTON_TEXT}`}
          >
            View Openings
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
export default Careers;
