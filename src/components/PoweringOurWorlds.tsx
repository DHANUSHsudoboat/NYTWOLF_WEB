import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, useMotionValueEvent } from 'motion/react';
import { MouseGlowContext } from '../context';
import { SECTION_HEADER, SECTION_DESC, CARD_HEADER, CARD_DESC, CARD_ICON_BOX, CARD_ICON } from '../typography';

const TechCard = ({ tech, index, isMobile, scrollProgress }: { tech: any; index: number; isMobile: boolean; scrollProgress: any; key?: any }) => {
  const { setIsHoveringCard } = React.useContext(MouseGlowContext);
  const cardRef = useRef<HTMLDivElement>(null);
  
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

  // 3D Flip Angles
  const initialRotX = 45;
  const initialRotY = index % 3 === 0 ? 30 : index % 3 === 2 ? -30 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHoveringCard(true)}
      onMouseLeave={() => setIsHoveringCard(false)}
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
        rotateX: isMobile ? 0 : initialRotX,
        rotateY: isMobile ? 0 : initialRotY,
        opacity: 0,
        y: 40
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
      className="relative p-3 md:p-4 lg:p-3 bg-black/40 backdrop-blur-sm border border-white/5 overflow-hidden transition-[border-color,box-shadow] duration-700 group cursor-default h-full flex flex-col items-start hover:border-[#efb034]/20"
    >
      <div className={`mb-2 ${CARD_ICON_BOX} border border-white/10 flex items-center justify-center relative group-hover:border-transparent transition-all duration-500`}>
        <img src={tech.icon} alt={tech.name} className={`${CARD_ICON} object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10`} />
      </div>
      <div className="space-y-0.5 relative z-10">
        <h3 className={`${CARD_HEADER} text-white/90 transition-all duration-500 group-hover:text-[#efb034] group-hover:tracking-[0.12em]`}>
          {tech.name}
        </h3>
        <p className={`${CARD_DESC} text-white/30 transition-colors duration-500 group-hover:text-white/60 max-w-xs`}>
          {tech.desc}
        </p>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-20" />
    </motion.div>
  );
};

const PoweringOurWorlds = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 70,
    restDelta: 0.001
  });

  // ========== UNIDIRECTIONAL PROGRESS (TOP-TO-BOTTOM ONLY) ==========
  const unidirectionalProgress = useMotionValue(0);
  const maxProgressRef = useRef(0);
  
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest > maxProgressRef.current) {
      maxProgressRef.current = latest;
      unidirectionalProgress.set(latest);
    }
    // Reset if the section is completely below the viewport (scrolled back up past it)
    if (latest < 0.1) {
      maxProgressRef.current = 0;
      unidirectionalProgress.set(0);
    }
  });

  const techs = [
    {
      name: "Unreal Engine 5",
      desc: "Cinematic real-time rendering powered by Nanite and Lumen.",
      icon: "/icons/unreal.svg"
    },
    {
      name: "Unity",
      desc: "Flexible multi-platform game development engine.",
      icon: "/icons/unity.svg"
    },
    {
      name: "Figma",
      desc: "UI/UX prototyping and interface system design.",
      icon: "/icons/figma.svg"
    },
    {
      name: "Blender",
      desc: "3D modeling, animation, and asset creation.",
      icon: "/icons/blender.svg"
    },
    {
      name: "Adobe Creative Suite",
      desc: "Visual design, branding, and production workflows.",
      icon: "/icons/adobe.svg"
    }
  ];

  const h2Opacity = useTransform(unidirectionalProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col items-center justify-center section-spacing lg:py-6 bg-[#060408] overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[25] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[25] pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: The full technical background */}
        <motion.div animate={{ opacity: 0.5 }} className="absolute inset-0">
          <img src="/tech_room.png" className="w-full h-full object-cover" alt="" />
        </motion.div>

        {/* Layer 2: The Dark Overlay - Static on mobile, Dynamic on desktop */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: isMobile 
              ? 'rgba(6, 4, 8, 0.75)' 
              : `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(6, 4, 8, 0.7) 80%)`
          }}
        />
      </div>

      <div className="container-1440 relative z-10">
        <motion.div style={{ opacity: h2Opacity }} className="text-center mb-4 lg:mb-5 relative z-10">
          <h2 className={`${SECTION_HEADER} text-white mb-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]`}>
            POWERING OUR <span className="text-[#A855C5]">WORLDS</span>
          </h2>
          <p className={`${SECTION_DESC} text-white/50 tracking-[0.15em] md:tracking-[0.3em] uppercase max-w-4xl mx-auto px-6`}>
            Built with industry-leading tools. Executed with precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3 max-w-5xl mx-auto relative z-10 px-4 md:px-0">
          {techs.map((tech, i) => (
            <TechCard key={i} tech={tech} index={i} isMobile={isMobile} scrollProgress={unidirectionalProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoweringOurWorlds;
