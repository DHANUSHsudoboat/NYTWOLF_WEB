import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { MouseGlowContext } from '../../context';

export const ParticleSystem = React.memo(({
  count = 20
}: {
  count?: number;
}) => {
  const particles = React.useMemo(() => Array.from({
    length: count
  }, () => ({
    x: Math.random() * 100,
    y0: Math.random() * 100,
    y1: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 10 + 10
  })), [count]);
  return <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p, i) => <motion.div key={i} className="absolute w-1 h-1 bg-[#c79a40]/40 rounded-full blur-[1px]" initial={{
      x: `${p.x}%`,
      y: `${p.y0}%`,
      opacity: p.opacity
    }} animate={{
      y: [`${p.y0}%`, `${p.y1}%`],
      opacity: [0.2, 0.5, 0.2]
    }} transition={{
      duration: p.duration,
      repeat: Infinity,
      ease: "linear"
    }} style={{
      translateZ: 0,
      willChange: "transform, opacity"
    }} />)}
    </div>;
});

export const ShineOverlay = React.memo(({
  delay = 1.5,
  duration = 6,
  className = "z-[40]"
}: {
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div initial={{
      x: "-150%",
      y: "-150%"
    }} animate={{
      x: "250%",
      y: "250%"
    }} transition={{
      duration: duration,
      delay: delay,
      ease: [0.16, 1, 0.3, 1],
      repeat: Infinity,
      repeatDelay: 6
    }} className="absolute w-[300%] h-[1000px] bg-gradient-to-b from-transparent via-white/[0.12] to-transparent rotate-[-45deg] blur-[150px]" style={{
      top: '-100%',
      left: '-100%'
    }} />
      <motion.div initial={{
      x: "-150%",
      y: "-150%"
    }} animate={{
      x: "250%",
      y: "250%"
    }} transition={{
      duration: duration * 1.1,
      delay: delay + 0.2,
      ease: [0.16, 1, 0.3, 1],
      repeat: Infinity,
      repeatDelay: 6.2
    }} className="absolute w-[300%] h-[150px] bg-gradient-to-b from-transparent via-white/[0.15] to-transparent rotate-[-45deg] blur-[80px]" style={{
      top: '-100%',
      left: '-100%'
    }} />
    </div>;
});

export const FogLayer = React.memo(({ opacity = 0.4, speed = 20, color = "rgba(168,85,197,0.15)", className = "", yOffset = "0%" }: { opacity?: number, speed?: number, color?: string, className?: string, yOffset?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        animate={{
          x: ["-20%", "0%"],
          opacity: [opacity * 0.7, opacity, opacity * 0.7],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 w-[200%] h-full opacity-40 bg-[radial-gradient(ellipse_at_center,var(--fog-color)_0%,transparent_70%)]"
        // @ts-ignore
        style={{ "--fog-color": color, y: yOffset }}
      />
    </div>
  );
});

export const ParallaxSection = ({
  children,
  speed = 0.1,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return <motion.div ref={ref} style={{
    y,
    opacity
  }} className={className}>
      {children}
    </motion.div>;
};

export const MouseParallax = ({
  children,
  factor = 20,
  className = ""
}: {
  children: React.ReactNode;
  factor?: number;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {
    damping: 30,
    stiffness: 100
  });
  const springY = useSpring(y, {
    damping: 30,
    stiffness: 100
  });
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / factor);
    y.set((e.clientY - centerY) / factor);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
    x: springX,
    y: springY
  }} className={className}>
      {children}
    </motion.div>;
};

export const FadeInWhenVisible = ({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 40
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: "-150px"
  }} transition={{
    duration: 0.6,
    ease: "easeOut",
    delay: delay
  }} className="h-full">
      {children}
    </motion.div>;
};

export const CinematicBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const {
    isHoveringCard
  } = React.useContext(MouseGlowContext);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isInside = e.clientY >= rect.top && e.clientY <= rect.bottom;
      setIsHovering(isInside);
      if (isInside) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#0F0B14]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1322]/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,197,0.04)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,197,0.03)_0%,transparent_60%)]" />
      <motion.div className="absolute h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,197,0.18)_0%,transparent_70%)] blur-[80px]" style={{
      x: useTransform(mouseX, x => x - 400),
      y: useTransform(mouseY, y => y - 400),
      opacity: isHovering ? isHoveringCard ? 0 : 1 : 0
    }} animate={{
      opacity: isHovering ? isHoveringCard ? 0 : 1 : 0
    }} transition={{
      duration: 0.5
    }} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({
        length: 8
      }).map((_, i) => <motion.div key={i} initial={{
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5
      }} animate={{
        y: [null, "-20%"],
        opacity: [0, 0.15, 0],
        x: [null, (Math.random() - 0.5) * 5 + "%"]
      }} transition={{
        duration: Math.random() * 20 + 20,
        repeat: Infinity,
        ease: "linear"
      }} className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]" />)}
      </div>
    </div>;
};
