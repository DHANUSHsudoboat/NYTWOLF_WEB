import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';


const WolfEyeO = React.memo(({
  className = ""
}: {
  className?: string;
}) => <svg viewBox="0 0 100 100" className={`h-[0.84em] w-auto inline-block align-middle relative top-[-0.2em] left-[-0.125em] mx-[0.1em] ${className}`} fill="currentColor">
    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="16" fill="none" />
    <path d="M50 25 Q58 50 50 75 Q42 50 50 25 Z" fill="currentColor" />
  </svg>);

export default WolfEyeO;
