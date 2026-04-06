import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion, useMotionValueEvent } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';

const CareerCard = ({ role, index, scrollProgress }: { role: any; index: number; scrollProgress: any; key?: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll direction detection
  const { scrollY } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && !isScrollingDown) {
      setIsScrollingDown(true);
    } else if (current < previous && isScrollingDown) {
      setIsScrollingDown(false);
    }
  });

  const isInView = useInView(cardRef, { once: false, amount: 0.1 });
  const isVisible = isInView || !isScrollingDown;

  const initialRotX = 45;
  const initialRotY = index % 3 === 0 ? 30 : index % 3 === 2 ? -30 : 0;

  // Mouse hover springs
  const rotateXMouse = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 25, stiffness: 200 });
  const rotateYMouse = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
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
      style={{ transformStyle: "preserve-3d" }}
      className="group relative p-8 border border-white/5 bg-[#0F0B14]/40 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-500 flex flex-col items-center text-center cursor-default hover:border-[#A855C5]/50 hover:bg-[#0F0B14]/60"
    >
      <motion.div style={{ rotateX: rotateXMouse, rotateY: rotateYMouse, transformStyle: "preserve-3d" }} className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c79a40] group-hover:scale-110 group-hover:border-[#c79a40]/40 transition-all duration-500 mb-6" style={{ transform: "translateZ(30px)" }}>
          {React.cloneElement(role.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
        </div>

        <div className="space-y-3 relative z-10" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-black text-white uppercase tracking-widest group-hover:text-[#c79a40] transition-colors duration-300">
            {role.title}
          </h3>
          <p className="text-xs text-white/50 leading-relaxed font-medium transition-colors duration-500 group-hover:text-white/80">
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

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const bgOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.85, 1], [0, 1, 1, 0]);
  const h1Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const btnOpacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

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
        <div className="text-center mb-8">
          <motion.div style={{ opacity: h1Opacity }}>
            <span className="text-[#c79a40] tracking-[0.5em] uppercase text-[10px] md:text-xs font-bold mb-4 block">JOIN THE GUILD</span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-none mb-6 uppercase tracking-tighter text-white">
              BUILD THE <span className="text-[#A855C5]">FUTURE</span> <br /> WITH US
            </h2>
            <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
              We are always looking for passionate, talented individuals. At NYTWOLF, your voice matters
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 mb-12">
          {roles.map((role, i) => (
            <CareerCard key={i} role={role} index={i} scrollProgress={smoothProgress} />
          ))}
        </div>

        <motion.div style={{ opacity: btnOpacity }} className="flex justify-center">
          <motion.a 
            href="https://www.linkedin.com/company/nytwolf-games/" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="px-12 py-5 bg-gradient-to-r from-[#A855C5] to-[#4A1C56] text-white font-bold uppercase tracking-[0.3em] text-sm rounded-3xl flex items-center gap-4 group border border-[#A855C5] shadow-[0_10px_30px_rgba(168,85,197,0.4)]"
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
