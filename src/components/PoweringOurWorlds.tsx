import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, useMotionValueEvent } from 'motion/react';
import { MouseGlowContext } from '../context';

const TechCard = ({ tech, index }: { tech: any; index: number; key?: any }) => {
  const { setIsHoveringCard } = React.useContext(MouseGlowContext);
  const cardRef = useRef<HTMLDivElement>(null);
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

  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const isVisible = isInView || !isScrollingDown;

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
      className="relative p-4 md:p-5 lg:p-4 bg-black/40 backdrop-blur-sm border border-white/5 overflow-hidden transition-[border-color,box-shadow] duration-700 group cursor-default h-full flex flex-col items-start hover:border-[#efb034]/20"
    >
      <div className="mb-4 w-12 h-12 md:w-14 md:h-14 border border-white/10 flex items-center justify-center relative group-hover:border-transparent transition-all duration-500">
        <img src={tech.icon} alt={tech.name} className="w-6 h-6 md:w-7 md:h-7 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10" />
      </div>
      <div className="space-y-1 relative z-10">
        <h3 className="text-base md:text-lg font-black text-white/90 uppercase tracking-wider transition-all duration-500 group-hover:text-[#efb034] group-hover:tracking-[0.12em]">
          {tech.name}
        </h3>
        <p className="text-[10px] md:text-[11px] text-white/30 leading-relaxed font-medium transition-colors duration-500 group-hover:text-white/60 max-w-xs">
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

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const h2Opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col justify-center section-spacing lg:py-12 bg-[#060408] overflow-hidden" style={{ perspective: "1500px" }}>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#060408] to-transparent z-[25] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#060408] to-transparent z-[25] pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: The full technical background */}
        <motion.div animate={{ opacity: 0.5 }} className="absolute inset-0">
          <img src="/tech_room.png" className="w-full h-full object-cover" alt="" />
        </motion.div>

        {/* Layer 2: The Dark Overlay with a hole (mask) around the mouse */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(6, 4, 8, 0.7) 80%)`
          }}
        />
      </div>

      <div className="container-1440 relative z-10">
        <motion.div style={{ opacity: h2Opacity }} className="text-center mb-10 lg:mb-12 relative z-10">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-white uppercase leading-none mb-4 lg:mb-5 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
            POWERING OUR <span className="text-[#A855C5]">WORLDS</span>
          </h2>
          <p className="text-sm md:text-lg lg:text-base text-white/50 tracking-[0.15em] md:tracking-[0.4em] uppercase font-bold max-w-4xl mx-auto px-6">
            Built with industry-leading tools. Executed with precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto relative z-10 px-4 md:px-0">
          {techs.map((tech, i) => (
            <TechCard key={i} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoweringOurWorlds;
