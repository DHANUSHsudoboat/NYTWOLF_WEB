import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, animate, useReducedMotion, useMotionTemplate } from 'motion/react';
import { ChevronRight, Gamepad2, Layout, Palette, Cpu, Users, Mail, ArrowUpRight, Menu, X, Globe, Zap, Layers, Box, Linkedin, Instagram, Facebook, Code, Paintbrush, LayoutGrid, Compass, Mouse } from 'lucide-react';
import { MouseGlowContext } from '../context';
import Footer from './Footer';
import Logo from './Logo';


const Contact = () => {
  const {
    setIsHoveringCard
  } = React.useContext(MouseGlowContext);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 70,
    restDelta: 0.001
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [puzzleVal, setPuzzleVal] = useState(0);

  // High-performance smooth motion for the puzzle shard
  const puzzleX = useMotionValue(0);
  const smoothPuzzleX = useSpring(puzzleX, { damping: 25, stiffness: 200 });

  // Sync state to motion value
  useEffect(() => {
    puzzleX.set(puzzleVal);
  }, [puzzleVal, puzzleX]);

  // Create template at top level (Rule of Hooks)
  const leftPos = useMotionTemplate`${smoothPuzzleX}%`;
  const [result, setResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setResult({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      return;
    }
    if (!isVerified) {
      setResult({
        type: 'error',
        message: 'Please verify that you are not a robot.'
      });
      return;
    }
    setIsSubmitting(true);
    setResult(null);
    const payload = {
      NAME: formData.name,
      EMAIL: formData.email,
      SUBJECT: formData.subject,
      MESSAGE: formData.message
    };
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'YOUR_WEBHOOK_URL_HERE'; // Fallback for dev
    console.log(webhookUrl);
    try {
      // Send the payload as JSON, but keep no-cors to prevent browser blocking.
      // Note: Google Apps Script needs to handle POST requests and CORS internally 
      // (often by having a doPost function return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON))
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      // With no-cors, we can't read the response properly (it's opaque).
      // We assume success if the fetch didn't throw a network error.
      setResult({
        type: 'success',
        message: 'Message sent successfully!'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setResult({
        type: 'error',
        message: 'Connection error. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========== ENVIRONMENTAL PARALLAX LAYERS ==========
  // Deep Background
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  // Midground (Mystical Portal / Floating Symbols)
  const midLeftY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
  const midLeftRot = useTransform(smoothProgress, [0, 1], [0, 45]);
  const midRightY = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  // Foreground Fast Objects (Energy Particles / Raven Silhouette)
  const fgY1 = useTransform(smoothProgress, [0, 1], ["40%", "-70%"]);
  const fgRot1 = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const fgY2 = useTransform(smoothProgress, [0, 1], ["60%", "-90%"]);
  const fgRot2 = useTransform(smoothProgress, [0, 1], [30, -30]);

  // ========== CONTENT REVEAL LAYERS ==========
  const contentOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const formOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return <section ref={sectionRef} id="contact" className="relative min-h-screen flex flex-col pt-20 md:pt-0 pb-0 bg-[#0F0B14] overflow-hidden" style={{
    perspective: "1500px"
  }}>

    {/* LAYER 1: Deep Background Atmosphere */}
    <motion.div style={{
      y: bgY
    }} className="absolute inset-0 z-0 pointer-events-none opacity-40 origin-center">
      <div className="absolute inset-0 bg-[#0F0B14] opacity-80 z-10" />
      <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,197,0.15)_0%,transparent_70%)] blur-[80px]" />
    </motion.div>

    {/* LAYER 2: Midground Environment (Mystical Portal / Symbols) */}
    <motion.div style={{
      y: midLeftY,
      rotate: midLeftRot
    }} className="absolute top-[10%] -left-[10%] z-0 pointer-events-none opacity-20">
      <div className="w-[30vw] h-[30vw] border-[2px] border-[#A855C5] rounded-full flex items-center justify-center">
        <div className="w-[80%] h-[80%] border-[1px] border-[#c79a40] rounded-full rotate-45" />
      </div>
    </motion.div>
    <motion.div style={{
      y: midRightY
    }} className="absolute -top-[5%] -right-[5%] z-0 pointer-events-none opacity-30">
      <div className="w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(199,154,64,0.05)_0%,transparent_60%)] blur-2xl" />
    </motion.div>

    <div className="flex-1 flex items-center z-10">
      <div className="container-1440 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
          <div className="lg:col-span-6">
            <motion.div style={{ opacity: contentOpacity }}>
              <span className="text-[#c79a40] tracking-[0.5em] uppercase text-xs font-bold mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">SEND A RAVEN</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black mb-6 md:mb-10 uppercase tracking-tighter text-white leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                LET'S <span className="text-[#A855C5]">TALK</span>.
              </h2>
              <p className="text-base md:text-lg text-text-muted mb-4 md:mb-8 max-w-sm font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Whether you're a potential partner, a member of the press, or just want to say hello, we'd love to hear from you.
              </p>
              <div className="space-y-8">
                <div onMouseEnter={() => setIsHoveringCard(true)} onMouseLeave={() => setIsHoveringCard(false)} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl border border-white/10 bg-[#0F0B14] shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#A855C5] group-hover:border-[#c79a40]/50 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(199,154,64,0.3)] transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <a href="mailto:hello@nytwolfgames.com?subject=Nytwolf%20Website%20Inquiry" className="text-xl font-bold text-white tracking-wider group-hover:text-[#c79a40] transition-colors">
                    hello@nytwolfgames.com
                  </a>
                </div>
                <a href="https://maps.app.goo.gl/UdhxKFLM2aGkF4ex6" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHoveringCard(true)} onMouseLeave={() => setIsHoveringCard(false)} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl border border-white/10 bg-[#0F0B14] shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#A855C5] group-hover:border-[#c79a40]/50 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(199,154,64,0.3)] transition-all duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-wider group-hover:text-[#c79a40] transition-colors">Coimbatore, India</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div style={{ opacity: formOpacity }} className="lg:col-span-6">
            <form onSubmit={handleSubmit} onMouseEnter={() => setIsHoveringCard(true)} onMouseLeave={() => setIsHoveringCard(false)} className="space-y-4 bg-black/40 p-5 md:p-8 rounded-2xl border border-[#A855C5]/20 shadow-[0_30px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group">
              {/* Mystical Altar Ambient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,197,0.15)_0%,transparent_60%)] pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="NAME" className="bg-black/50 border border-white/10 p-4 text-xs tracking-[0.2em] text-white focus:border-[#c79a40]/70 focus:bg-[#140D1B] outline-none transition-all duration-300 rounded-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL" className="bg-black/50 border border-white/10 p-4 text-xs tracking-[0.2em] text-white focus:border-[#c79a40]/70 focus:bg-[#140D1B] outline-none transition-all duration-300 rounded-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" />
              </div>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="SUBJECT" className="w-full bg-black/50 border border-white/10 p-4 text-xs tracking-[0.2em] text-white focus:border-[#A855C5]/70 focus:bg-[#140D1B] outline-none transition-all duration-300 rounded-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative z-10" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="MESSAGE" rows={3} className="w-full bg-black/50 border border-white/10 p-4 text-xs tracking-[0.2em] text-white focus:border-[#A855C5]/70 focus:bg-[#140D1B] outline-none transition-all duration-300 rounded-lg resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative z-10" />

              {/* Custom Human Verification Task */}
              <div className="relative z-10 space-y-3">
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 cursor-pointer select-none group/btn ${isVerified
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-[#A855C5]/40'
                    }`}
                  onClick={() => {
                    if (!isVerified) {
                      setPuzzleVal(0);
                      setIsPuzzleOpen(true);
                    }
                  }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isVerified ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-white/5 text-white/40 group-hover/btn:text-[#A855C5]'}`}>
                    {isVerified ? (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    ) : (
                      <Box className="w-5 h-5 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className={`text-[10px] tracking-[0.2em] font-black uppercase transition-colors ${isVerified ? 'text-green-400' : 'text-white/60 group-hover/btn:text-white'}`}>
                      {isVerified ? 'VERIFIED HUMAN' : 'VERIFY HUMANITY'}
                    </p>
                    <p className="text-[9px] text-white/30 tracking-widest uppercase">
                      {isVerified ? 'Access Granted' : 'Solve the Wolf Puzzle'}
                    </p>
                  </div>
                  {!isVerified && <ArrowUpRight className="ml-auto w-4 h-4 text-white/20 group-hover/btn:text-[#A855C5] transition-all" />}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r from-[#A855C5] to-[#4A1C56] text-white py-4 font-bold tracking-[0.3em] uppercase text-xs hover:from-[#c79a40] hover:to-[#916b20] transition-all duration-500 rounded-lg shadow-[0_10px_30px_rgba(168,85,197,0.4)] border border-[#A855C5]/50 hover:border-[#c79a40]/50 relative z-10 overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </span>
              </button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl text-center text-sm font-bold tracking-wider relative z-10 ${result.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {result.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>

    {/* ========== WOLF CHALLENGE MODAL (CAPTCHA) ========== */}
    <AnimatePresence>
      {isPuzzleOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPuzzleOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#140D1B] border border-[#A855C5]/30 p-8 rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,197,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 text-center mb-8">
              <span className="text-[#c79a40] tracking-[0.5em] uppercase text-[10px] font-bold mb-3 block">SECURITY CHALLENGE</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">ALIGN THE <span className="text-[#A855C5]">SHARD</span></h3>
              <p className="text-xs text-white/40 mt-2 tracking-wide uppercase font-medium">Slide the fragment to restore the symbol</p>
            </div>

            {/* Ritual Snap (Pattern Match Slide) */}
            <div className="space-y-8">
              <div className="relative h-48 bg-black/80 rounded-2xl border border-white/5 flex items-center justify-center group/puzzle overflow-hidden select-none">
                {/* Targets along the track - Dynamic spacing */}
                <div className="absolute inset-x-4 sm:inset-x-8 flex justify-between items-center pointer-events-none opacity-20">
                  {[
                    { id: 'mirrored', transform: 'scaleX(-1)' },
                    { id: 'correct', transform: 'rotate(0deg)' },
                    { id: 'upside', transform: 'rotate(180deg)' },
                    { id: 'tilted', transform: 'rotate(90deg)' }
                  ].map((target, i) => (
                    <div key={i} className="relative flex flex-col items-center">
                      <div style={{ transform: target.transform }}>
                        <Logo className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                      </div>
                      {/* Snap Marking */}
                      <div className="mt-2 w-1 h-1 bg-[#A855C5] rounded-full" />
                    </div>
                  ))}
                </div>

                {/* The SHARD that moves */}
                <motion.div
                  className="absolute z-20 w-24 h-24 flex items-center justify-center pointer-events-none"
                  style={{
                    left: leftPos,
                    translateX: "-50%"
                  }}
                >
                  <Logo className="w-16 h-16 sm:w-20 sm:h-20 text-[#A855C5] shadow-[0_0_30px_rgba(168,85,197,0.8)] filter brightness-125" />
                </motion.div>
              </div>

              {/* Interactive Drag Track */}
              <div className="space-y-6">
                <div ref={sliderRef} id="slider-track" className="relative w-full h-14 bg-black/60 rounded-full border border-white/10 p-1.5 group overflow-hidden">
                  {/* Fill Bar */}
                  <motion.div
                    className="absolute inset-y-1.5 left-1.5 bg-gradient-to-r from-[#A855C5]/40 to-[#A855C5] rounded-full shadow-[0_0_30px_rgba(168,85,197,0.3)] pointer-events-none"
                    style={{ width: leftPos }}
                  />

                  {/* The Drag Thumb */}
                  <motion.div
                    drag="x"
                    dragConstraints={sliderRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={(_, info) => {
                      const track = sliderRef.current;
                      if (track) {
                        const trackWidth = track.clientWidth - 56;
                        const percent = (info.point.x - track.getBoundingClientRect().left - 28) / trackWidth * 100;
                        setPuzzleVal(Math.min(Math.max(percent, 0), 100));
                      }
                    }}
                    className="absolute left-1.5 top-1.5 w-11 h-11 bg-white rounded-full shadow-[0_0_20px_white/60] cursor-grab active:cursor-grabbing flex items-center justify-center z-50"
                    style={{ x: 0 }}
                  >
                    <Zap className="w-6 h-6 text-[#A855C5]" />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="text-[10px] tracking-[0.5em] text-white font-black whitespace-nowrap">ALIGN WITH TRUE WOLF</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (puzzleVal >= 34 && puzzleVal <= 40) {
                      setIsVerified(true);
                      setTimeout(() => setIsPuzzleOpen(false), 500);
                    } else {
                      setPuzzleVal(0);
                    }
                  }}
                  className="w-full py-4 font-black tracking-[0.4em] uppercase text-xs rounded-xl transition-all duration-500 border bg-[#A855C5] text-white border-white/20 shadow-[0_15px_30px_rgba(168,85,197,0.4)] hover:bg-[#c79a40] hover:border-[#c79a40]/50 active:scale-[0.98]"
                >
                  Confirm Alignment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* LAYER 3: Fast Foreground (Energy Particles) */}
    <motion.div style={{
      y: fgY1,
      rotate: fgRot1
    }} className="absolute bottom-[20%] left-[5%] z-30 pointer-events-none opacity-60 drop-shadow-[10px_10px_20px_rgba(0,0,0,0.8)]">
      <div className="w-[10vw] h-[10vw] border-[4px] border-[#c79a40] border-dashed rounded-full blur-[2px] animate-spin-slow opacity-50" />
    </motion.div>
    <motion.div style={{
      y: fgY2,
      rotate: fgRot2
    }} className="absolute top-[30%] right-[10%] z-30 pointer-events-none opacity-70 drop-shadow-[10px_10px_20px_rgba(0,0,0,0.8)]">
      <div className="w-[5vw] h-[20vh] bg-gradient-to-b from-[#A855C5] to-transparent clip-path-polygon-[50%_0%,_100%_20%,_50%_100%,_0%_20%] blur-[4px] rotate-[-20deg]" />
    </motion.div>

    <div className="mt-4 bg-black/80 border-t border-white/5 backdrop-blur-lg">
      <Footer />
    </div>

  </section>;
};

export default Contact;
