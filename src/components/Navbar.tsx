import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import HeaderLogo from './HeaderLogo';


const Navbar = ({
  activeSection,
  onNavItemClick
}: {
  activeSection: string;
  onNavItemClick: (id: string) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Section tracking — keep for dev visibility if needed
  }, [activeSection]);
  const navLinks = [{
    name: 'Home',
    href: '#home',
    id: 'home'
  }, {
    name: 'Studio',
    href: '#studio',
    id: 'studio'
  }, {
    name: 'Services',
    href: '#services',
    id: 'services'
  }, {
    name: 'Games',
    href: '#projects',
    id: 'projects'
  }, {
    name: 'Careers',
    href: '#careers',
    id: 'careers'
  }, {
    name: 'Contact',
    href: '#contact',
    id: 'contact'
  }];
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg-dark/90 backdrop-blur-md py-3 md:py-4' : 'bg-transparent py-4 md:py-8'}`}>
      <div className="container-1440 flex justify-between items-center px-6 md:px-10">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="flex items-center">
          <HeaderLogo className="h-10 w-auto text-text-light" />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 xl:gap-10 items-center ">
          {navLinks.map((link, i) => <motion.a key={link.name} href={link.href} onClick={e => {
          e.preventDefault();
          onNavItemClick(link.id);
        }} initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: i * 0.1
        }} className={`text-sm font-medium tracking-widest transition-all duration-300 uppercase relative group ${activeSection === link.id || link.id === 'services' && activeSection === 'tech' ? 'text-primary' : 'text-text-light/90 hover:text-primary'}`}>
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${activeSection === link.id || link.id === 'services' && activeSection === 'tech' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </motion.a>)}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-text-light p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden bg-bg-dark/95 backdrop-blur-xl border-t border-white/5 overflow-hidden">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map(link => <a key={link.name} href={link.href} className={`text-lg font-medium transition-colors ${activeSection === link.id || link.id === 'services' && activeSection === 'tech' ? 'text-primary' : 'text-text-muted hover:text-primary'}`} onClick={e => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onNavItemClick(link.id);
          }}>
                  {link.name}
                </a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};

export default Navbar;
