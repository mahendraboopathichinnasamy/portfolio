'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenContact: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isManualScrollingRef = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll spy, scroll progress, and hash updating
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 25);

          // Calculate total page scroll percentage
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
          }

          if (isManualScrollingRef.current) {
            ticking = false;
            return;
          }

          // Section scroll spy with sticky header offset (140px)
          const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
          const scrollPosition = scrollY + 160;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                if (activeSection !== section) {
                  setActiveSection(section);
                  window.history.replaceState(null, '', `#${section}`);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, [activeSection]);

  // Handle Escape key for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scrolling with sticky header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetSection = href.replace('#', '');
    setActiveSection(targetSection);

    isManualScrollingRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 850);

    const target = document.querySelector(href);
    if (target) {
      const topOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', href);
    }
  };

  return (
    <header className="fixed top-3 inset-x-0 z-50 flex flex-col items-center px-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-6xl transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border ${scrolled
          ? 'bg-[#050B14]/90 backdrop-blur-xl border-[#00E5FF]/30 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(0,229,255,0.14)]'
          : 'bg-[#081826]/70 backdrop-blur-md border-[#00E5FF]/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          }`}
      >
        {/* Clean Brand Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="relative w-10 h-10 rounded-full border border-[#00E5FF]/40 bg-gradient-to-br from-[#081826] via-[#050B14] to-[#03070E] flex items-center justify-center hover:scale-105 active:scale-95 hover:border-[#00E5FF] transition-all duration-300 shadow-[0_0_16px_rgba(0,229,255,0.25)] hover:shadow-[0_0_24px_rgba(0,229,255,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B14] select-none"
          aria-label="Mahendra Boopathi Portfolio Home"
        >
          <span className="font-black text-sm tracking-tight text-white select-none pl-0.5 leading-none">
            MB<span className="text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links with Animated Active Underline & Highlighted Let's Talk */}
        <div
          role="menubar"
          className="hidden md:flex items-center gap-1 bg-[#050B14]/80 border border-[#00E5FF]/20 rounded-full px-3 py-1.5 shadow-inner backdrop-blur-md"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3.5 py-2 text-xs font-semibold transition-all duration-200 min-h-[38px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${isActive
                  ? 'text-[#00E5FF] font-bold'
                  : 'text-slate-300 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-1 inset-x-3 h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] rounded-full shadow-[0_0_10px_#00E5FF]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Clean Divider */}
          <span className="w-px h-4 bg-white/15 mx-1" />

          {/* Cleanly Highlighted Let's Talk CTA inside nav pill */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#03070E] bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer min-h-[38px] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            className="w-10 h-10 rounded-full bg-white/5 border border-[#00E5FF]/30 flex items-center justify-center text-slate-200 hover:text-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF] min-h-[44px] min-w-[44px]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Scroll Progress Bar Under Navbar */}
      <div className="w-full max-w-5xl mt-1 h-[2px] bg-transparent overflow-hidden px-6">
        <div
          className="h-full bg-gradient-to-r from-[#00E5FF] via-[#22D3EE] to-[#38BDF8] shadow-[0_0_10px_#00E5FF] transition-all duration-150 rounded-full"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Slide-In Drawer with Focus Trap & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Slide-in Drawer from Right */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-[80vw] max-w-sm bg-[#050B14]/95 border-l border-[#00E5FF]/30 p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.9)]"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-[#00E5FF]/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.3)] bg-gradient-to-br from-[#081826] via-[#050B14] to-[#03070E]">
                      <span className="font-black text-xs tracking-tight text-white select-none pl-0.5 leading-none">
                        MB<span className="text-[#00E5FF] drop-shadow-[0_0_6px_#00E5FF]">.</span>
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white tracking-wider">
                      Mahendra Boopathi
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Mobile Navigation"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between min-h-[44px] ${isActive
                          ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-3 rounded-xl text-center text-sm font-bold text-[#03070E] bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
