import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
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

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Studio', href: '#studio', id: 'studio' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Games', href: '#projects', id: 'projects' },
    { name: 'Careers', href: '#careers', id: 'careers' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0F0B14]/90 backdrop-blur-md py-2 md:py-3' : 'bg-transparent py-3 md:py-6'}`}>
      <div className="container-1440 flex justify-between items-center px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center"
        >
          <HeaderLogo className="h-11 w-auto text-white" />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 xl:gap-10 items-center">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              onClick={e => {
                e.preventDefault();
                onNavItemClick(link.id);
              }} 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              className={`text-xs xl:text-sm 2xl:text-base font-bold uppercase tracking-[0.2em] font-display transition-all duration-300 relative group ${
                activeSection === link.id || (link.id === 'services' && activeSection === 'tech') 
                  ? 'text-primary' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-[2.5px] transition-all duration-500 shadow-[0_0_12px_rgba(168,85,197,0.7)] ${
                activeSection === link.id || (link.id === 'services' && activeSection === 'tech') 
                  ? 'w-full bg-primary' 
                  : 'w-0 group-hover:w-full bg-primary/80'
              }`} />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden bg-[#0F0B14]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 font-display tracking-widest">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-lg font-medium transition-colors ${
                    activeSection === link.id || (link.id === 'services' && activeSection === 'tech') 
                      ? 'text-primary' 
                      : 'text-white/60 hover:text-primary'
                  }`} 
                  onClick={e => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavItemClick(link.id);
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
