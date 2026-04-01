import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';


const HeroBackground = ({
  className = ""
}: {
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = {
    damping: 30,
    stiffness: 100
  };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-2%", "2%"]);
  const fogX = useTransform(mouseXSpring, [-0.5, 0.5], ["-8%", "8%"]);
  const fogY = useTransform(mouseYSpring, [-0.5, 0.5], ["-8%", "8%"]);
  const particlesX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
  const particlesY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const {
        innerWidth,
        innerHeight
      } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  const particles = Array.from({
    length: 20
  });
  return <div className={`absolute inset-0 z-0 overflow-hidden bg-[#000000] ${className}`}>
      {/* Cinematic Background Image Layer */}
      <motion.div style={{
      x: bgX,
      y: bgY
    }} className="absolute inset-0 opacity-[0.9] pointer-events-none overflow-hidden">
        <motion.img src="/HomeBg.png" alt="Cinematic Game Environment" className="w-full h-full object-cover object-center grayscale-[0.1] contrast-[1.15] brightness-[1.1]" transition={{
        duration: 40,
        repeat: Infinity,
        ease: "easeInOut"
      }} loading="eager" />
      </motion.div>

      {/* Atmospheric Fog Layer 1 - Slow Movement */}
      <motion.div style={{
      x: fogX,
      y: fogY
    }} animate={{
      opacity: [0.15, 0.3, 0.15],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 25,
      repeat: Infinity,
      ease: "linear"
    }} className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/10 to-transparent blur-[120px]" />
      </motion.div>

      {/* Atmospheric Fog Layer 2 - Faster Counter-Movement */}
      <motion.div style={{
      x: useTransform(mouseXSpring, [-0.5, 0.5], ["10%", "-10%"]),
      y: useTransform(mouseYSpring, [-0.5, 0.5], ["10%", "-10%"])
    }} animate={{
      opacity: [0.1, 0.2, 0.1],
      x: [0, 50, 0]
    }} transition={{
      duration: 35,
      repeat: Infinity,
      ease: "linear"
    }} className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(116,44,134,0.15)_0%,transparent_60%)] blur-[80px]" />
      </motion.div>

      {/* Atmospheric Particles (Embers/Dust) */}
      <motion.div style={{
      x: particlesX,
      y: particlesY
    }} className="absolute inset-0 pointer-events-none z-30">
        {particles.map((_, i) => <motion.div key={i} initial={{
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        opacity: Math.random() * 0.4,
        scale: Math.random() * 1.5
      }} animate={{
        y: [null, "-120%"],
        x: [null, (Math.random() - 0.5) * 20 + "%"],
        opacity: [null, 0]
      }} transition={{
        duration: Math.random() * 30 + 30,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 15
      }} className={`absolute w-[1.5px] h-[1.5px] rounded-full ${i % 4 === 0 ? 'bg-primary/30' : 'bg-white/10'}`} />)}
      </motion.div>
    </div>;
};

export default HeroBackground;
