'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  // Typing animation for subtitle/roles
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = [
    'Junior Application Developer',
    'Flutter & Ionic Mobile Developer',
    'Full Stack Web Developer',
    'Python Programmer & Data Analyst',
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const topOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', '#projects');
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#00E5FF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Main Glass Hero Container */}
      <div className="relative rounded-3xl bg-[#081826]/60 backdrop-blur-2xl border border-[#00E5FF]/20 shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(0,229,255,0.08)] p-6 md:p-10 lg:p-12 overflow-hidden">
        {/* Subtle decorative grid overlay inside container */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Introductions and Call to Actions (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            {/* Greeting & Single-Line Name */}
            <div>
              <p className="text-sm md:text-base font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                Hi, I&apos;m
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-extrabold tracking-tight text-white leading-tight whitespace-nowrap">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#22D3EE]">
                  Mahendra
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                  Boopathi
                </span>
              </h1>
            </div>

            {/* Typing Subtitle */}
            <div className="h-8 flex items-center">
              <span className="text-base sm:text-lg font-semibold text-slate-300">
                {displayedText}
              </span>
              <span className="inline-block w-2 h-5 ml-1 bg-[#00E5FF] animate-blink" />
            </div>

            {/* Description from Resume */}
            <p className="text-sm md:text-base text-slate-300/90 leading-relaxed max-w-2xl">
              Junior Application Developer proficient in cross-platform mobile application development with
              Flutter &amp; Ionic, full-stack web architectures with Node.js, and Python software
              solutions. Passionate about engineering responsive mobile and web experiences.
            </p>

            {/* Resized Smaller Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="glow-btn-cyan px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 group cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
              >
                <span>View My Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="glow-btn-outline px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View &amp; Download CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Enlarged Portrait Image placed cleanly on the Right Side (5 columns) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px] aspect-square rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#00E5FF]/40 via-[#22D3EE]/20 to-transparent shadow-[0_0_40px_rgba(0,229,255,0.25)]"
            >
              {/* Inner container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050B14]">
                <Image
                  src="/images/hero-portrait.png"
                  alt="Mahendra Boopathi - Full Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                {/* Radial gradient mask to fade bottom seamlessly */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/40 via-transparent to-[#050B14]/40" />

                {/* Cyber HUD Corner Elements */}
                <div className="absolute top-2.5 left-2.5 text-[9px] font-mono text-[#00E5FF]/80 bg-black/60 px-2 py-0.5 rounded border border-[#00E5FF]/30 backdrop-blur-xs shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                  DEV_SYS // ACTIVE
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <div className="inline-block px-3.5 py-1 rounded-full bg-[#050B14]/90 border border-[#00E5FF]/30 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-200">
                      Junior App Developer • Flutter &amp; Web
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
