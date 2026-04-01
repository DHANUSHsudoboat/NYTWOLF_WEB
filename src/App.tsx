import { MouseGlowContext } from './context';
import HeaderLogo from './components/HeaderLogo';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Careers from './components/Careers';
import Contact from './components/Contact';
import FeaturedProject from './components/FeaturedProject';
import PoweringOurWorlds from './components/PoweringOurWorlds';
import MouseGlow from './components/MouseGlow';
import Navbar from './components/Navbar';
// import { useIntersectionScroll } from "./hooks/useIntersectionScroll";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { PRELOAD_ASSETS } from './constants';
import { ParticleSystem, ShineOverlay, ParallaxSection, MouseParallax, FadeInWhenVisible, CinematicBackground, FogLayer } from './components/common/Layout';

// Main App Entry
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('home');
  const [scrollingFromId, setScrollingFromId] = useState<string | null>(null);
  const activeSectionIdRef = useRef('home');
  const isAnimating = useRef(false);

  // Mouse Parallax Motion Values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = {
    damping: 40,
    stiffness: 120
  };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isAnimating.current = true;
      const rect = element.getBoundingClientRect();
      const targetScroll = rect.top + window.scrollY;
      const currentScroll = window.scrollY;
      animate(currentScroll, targetScroll, {
        duration: 1,
        ease: "easeOut",
        onUpdate: latest => {
          window.scrollTo(0, latest);
        },
        onComplete: () => {
          isAnimating.current = false;
          setScrollingFromId(null);
        }
      });
    }
  };

  const sections = ['home', 'studio', 'services', 'tech', 'projects', 'careers', 'contact'];

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (activeSectionIdRef.current !== entry.target.id) {
            setScrollingFromId(activeSectionIdRef.current);
            setActiveSectionId(entry.target.id);
            activeSectionIdRef.current = entry.target.id;
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  return <MouseGlowContext.Provider value={{
    isHoveringCard,
    setIsHoveringCard
  }}>
      <div className="min-h-screen selection:bg-primary selection:text-white relative font-sans overflow-x-hidden bg-[#060408]">
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <motion.div key="content" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1.2,
        ease: "easeOut"
      }}>
          <Navbar activeSection={activeSectionId} onNavItemClick={scrollToSection} />

          {/* Background RUINS is now handled within Hero component */}

          <main className="relative z-10">
            <div id="home" className={`section-focus-layer relative overflow-hidden min-h-screen flex flex-col justify-center ${activeSectionId === 'home' || scrollingFromId === 'home' ? 'active' : ''}`}>
              <Hero mouseX={mouseXSpring} mouseY={mouseYSpring} />
            </div>
            <div id="studio" className={`section-focus-layer relative overflow-hidden min-h-screen flex flex-col justify-center ${activeSectionId === 'studio' || scrollingFromId === 'studio' ? 'active' : ''}`}>
              <About />
            </div>
            <div id="services" className={`section-focus-layer relative overflow-hidden min-h-screen flex flex-col justify-center ${activeSectionId === 'services' || scrollingFromId === 'services' ? 'active' : ''}`}>
              <Services />
            </div>
            <div id="tech" className={`section-focus-layer relative overflow-hidden min-h-screen flex flex-col justify-center ${activeSectionId === 'tech' || scrollingFromId === 'tech' ? 'active' : ''}`}>
              <PoweringOurWorlds />
            </div>
            <div id="projects" className={`section-focus-layer relative overflow-hidden min-h-screen flex flex-col justify-center ${activeSectionId === 'projects' || scrollingFromId === 'projects' ? 'active' : ''}`}>
              <FeaturedProject />
            </div>
            <div id="careers" className={`section-focus-layer relative overflow-hidden min-h-screen flex flex-col justify-center ${activeSectionId === 'careers' || scrollingFromId === 'careers' ? 'active' : ''}`}>
              <Careers onNavItemClick={scrollToSection} />
            </div>
            <div id="contact" className={`section-focus-layer relative overflow-hidden min-h-screen ${activeSectionId === 'contact' || scrollingFromId === 'contact' ? 'active' : ''}`}>
              <Contact />
            </div>
          </main>
        </motion.div>
        <MouseGlow activeSectionId={activeSectionId} />
      </div>
    </MouseGlowContext.Provider>;
}