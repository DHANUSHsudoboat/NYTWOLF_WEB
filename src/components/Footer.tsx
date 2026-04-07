import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const staggerItem: any = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};


const Footer = () => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  return <footer className="relative py-8 md:py-12 bg-black overflow-hidden group">
    {/* Massive Background Text Branding */}
    <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none select-none z-0">
      <span className="text-[9vw] font-black leading-none uppercase text-white opacity-[0.07] whitespace-nowrap translate-y-[10%] transition-all duration-1000 group-hover:opacity-[0.12] font-display">
        NYTWOLF
      </span>
    </div>

    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{
      once: true
    }} className="container-1440 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
        {/* Left Side: Copyright & Links */}
        <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center md:justify-start gap-y-4 gap-x-6 text-[10px] md:text-[11px] text-text-muted uppercase tracking-[0.2em] font-medium">
          <span className="text-white/70 whitespace-nowrap">© 2026 NYTWOLF GAMES. ALL RIGHTS RESERVED.</span>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline opacity-20">•</span>
            <span className="hover:text-primary transition-colors cursor-pointer whitespace-nowrap">Terms</span>
            <span className="opacity-20">•</span>
            <span className="hover:text-primary transition-colors cursor-pointer whitespace-nowrap">Privacy</span>
            <span className="opacity-20">•</span>
            <span className="hover:text-primary transition-colors cursor-pointer whitespace-nowrap">Cookies</span>
          </div>
        </motion.div>

        {/* Right Side: Social Icons */}
        <motion.div variants={staggerItem} className="flex items-center gap-5">
          {[{
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.31 17.41z" />
            </svg>,
            href: "https://twitter.com/NytwolfGames"
          }, {
            icon: <Linkedin size={16} />,
            href: "https://www.linkedin.com/company/nytwolf-games/"
          }, {
            icon: <Facebook size={16} />,
            href: "https://www.facebook.com/profile.php?id=61551333385719&mibextid=ZbWKwL"
          }].map((social, i) => <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHoveringCard(true)} onMouseLeave={() => setIsHoveringCard(false)} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
            {social.icon}
          </a>)}
        </motion.div>
      </div>
    </motion.div>
  </footer>;
};

export default Footer;
