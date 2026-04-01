import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';


const MouseGlow = ({
  activeSectionId
}: {
  activeSectionId: string;
}) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, {
    damping: 50,
    stiffness: 400
  });
  const springY = useSpring(mouseY, {
    damping: 50,
    stiffness: 400
  });
  const [isVisible, setIsVisible] = useState(false);

  // Responsive settings based on active section
  const isHidden = activeSectionId === 'home';
  const glowColor = "radial-gradient(circle, rgba(116, 44, 134, 0.2) 0%, rgba(116, 44, 134, 0.05) 40%, transparent 70%)";
  const glowSize = '600px';
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);
  if (isHidden) return null;
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: isVisible ? 1 : 0
  }} className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-screen overflow-hidden" style={{
    x: springX,
    y: springY,
    width: glowSize,
    height: glowSize,
    translateX: "-50%",
    translateY: "-50%",
    background: glowColor,
    filter: "blur(80px)"
  }} transition={{
    duration: 0.8
  }} />;
};

export default MouseGlow;
