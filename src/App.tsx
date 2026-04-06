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
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
// import { useIntersectionScroll } from "./hooks/useIntersectionScroll";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { PRELOAD_ASSETS } from './constants';
import { ParticleSystem, ShineOverlay, ParallaxSection, MouseParallax, FadeInWhenVisible, CinematicBackground, FogLayer } from './components/common/Layout';

const SECTIONS = ['home', 'studio', 'services', 'tech', 'projects', 'careers', 'contact'];

// Main App Entry
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('home');
  const [scrollingFromId, setScrollingFromId] = useState<string | null>(null);
  const activeSectionIdRef = useRef('home');
  const isAnimating = useRef(false);
  const lastScrollTime = useRef(Date.now());
  const touchStartY = useRef(0);

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

  const scrollToSection = useCallback((id: string, duration = 1.5) => {
    const element = document.getElementById(id);
    if (element) {
      isAnimating.current = true;
      const rect = element.getBoundingClientRect();
      const targetScroll = rect.top + window.scrollY;
      const currentScroll = window.scrollY;

      animate(currentScroll, targetScroll, {
        duration: duration,
        ease: [0.42, 0, 0.58, 1], // Premium Quintic Ease Out
        onUpdate: latest => {
          window.scrollTo(0, latest);
        },
        onComplete: () => {
          isAnimating.current = false;
          setScrollingFromId(null);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const currentSection = document.getElementById(activeSectionIdRef.current);
      let canScrollNatively = false;

      if (currentSection) {
        const rect = currentSection.getBoundingClientRect();
        // Check if there is overflow remaining in the scroll direction
        if (delta > 0 && rect.bottom > window.innerHeight + 5) {
          canScrollNatively = true;
        } else if (delta < 0 && rect.top < -5) {
          canScrollNatively = true;
        }
      }

      // Allow native scroll if within section bounds
      if (canScrollNatively) {
        return;
      }

      // Prevent native overscroll rubber-banding so programmatic animation isn't blocked by the OS
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 1200) {
        return;
      }

      if (Math.abs(delta) < 8) return; // Snappy wheel threshold

      const currentIdx = SECTIONS.indexOf(activeSectionIdRef.current);
      if (delta > 0) {
        if (currentIdx < SECTIONS.length - 1) {
          lastScrollTime.current = now;
          scrollToSection(SECTIONS[currentIdx + 1], 1.1);
        }
      } else {
        if (currentIdx > 0) {
          lastScrollTime.current = now;
          scrollToSection(SECTIONS[currentIdx - 1], 1.1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const delta = touchStartY.current - touchY;

      const currentSection = document.getElementById(activeSectionIdRef.current);
      let canScrollNatively = false;

      if (currentSection) {
        const rect = currentSection.getBoundingClientRect();
        if (delta > 0 && rect.bottom > window.innerHeight + 5) {
          canScrollNatively = true;
        } else if (delta < 0 && rect.top < -5) {
          canScrollNatively = true;
        }
      }

      if (canScrollNatively) {
        touchStartY.current = touchY;
        return; // Allow native swipe
      }

      // Prevent native overscroll rubber-banding so programmatic animation isn't blocked by the OS
      e.preventDefault();

      const now = Date.now();
      // Enforce cooldown only when taking over scroll
      if (now - lastScrollTime.current < 1200) {
        return;
      }

      if (Math.abs(delta) < 5) return; // Instant touch threshold

      const currentIdx = SECTIONS.indexOf(activeSectionIdRef.current);
      if (delta > 0) {
        if (currentIdx < SECTIONS.length - 1) {
          lastScrollTime.current = now;
          scrollToSection(SECTIONS[currentIdx + 1], 0.8);
        }
      } else {
        if (currentIdx > 0) {
          lastScrollTime.current = now;
          scrollToSection(SECTIONS[currentIdx - 1], 0.8);
        }
      }

      touchStartY.current = touchY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLoading, scrollToSection]);

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

            // Auto-scroll instantly when next section comes into view natively
            const now = Date.now();
            if (!isAnimating.current && now - lastScrollTime.current > 1200) {
              lastScrollTime.current = now;
              scrollToSection(entry.target.id, 1.2);
            }
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach(id => {
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
      <CustomCursor />
    </div>
  </MouseGlowContext.Provider>;
}