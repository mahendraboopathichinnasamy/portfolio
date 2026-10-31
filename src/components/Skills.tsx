'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Terminal,
  Code2,
  Layout,
  Server,
  BarChart3,
  Wrench,
  Zap,
  FileSpreadsheet,
  Layers,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { skillsData } from '@/config/portfolioData';
import { Skill } from '@/types/portfolio';

function AnimatedNumber({ value, isVisible }: { value: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, isVisible]);

  return <span>{count}%</span>;
}

function SkillCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-30px' });

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#00E5FF]" />;
      case 'Tablet':
        return <Tablet className="w-5 h-5 text-[#22D3EE]" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-[#00E5FF]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#22D3EE]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#00E5FF]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#38BDF8]" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#00E5FF]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#22D3EE]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#38BDF8]" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-[#00E5FF]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#38BDF8]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#00E5FF]" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="glass-card p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(0,229,255,0.25)] min-h-[140px]"
    >
      {/* Top corner cyber glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00E5FF]/10 to-transparent pointer-events-none" />

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Header row: Icon, Level Badge & Count-up Percentage */}
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center group-hover:scale-105 group-hover:border-[#00E5FF] transition-all duration-300 shadow-[0_0_12px_rgba(0,229,255,0.15)]">
              {getSkillIcon(skill.icon)}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                {skill.level}
              </span>
              <span className="text-xs font-bold text-[#00E5FF] font-mono tracking-wider min-w-[36px] text-right">
                <AnimatedNumber value={skill.percentage} isVisible={isInView} />
              </span>
            </div>
          </div>

          {/* Skill Title */}
          <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
            <span>{skill.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
        </div>

        {/* Bottom row: Progress bar */}
        <div className="pt-3 border-t border-[#00E5FF]/10">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-slate-400">Proficiency</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
              className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] via-[#22D3EE] to-[#38BDF8] shadow-[0_0_10px_#00E5FF]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [isMobileCarousel, setIsMobileCarousel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileCarousel(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="skills" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#00E5FF]/8 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Skills &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#22D3EE]">
            Technologies
          </span>
        </h2>
      </div>

      {/* Mobile Swipe Notice */}
      <div className="sm:hidden flex items-center justify-between text-[11px] text-slate-400 mb-3 px-1">
        <span className="flex items-center gap-1.5 text-[#00E5FF]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Swipe cards to explore technologies</span>
        </span>
        <span className="font-mono">{skillsData.length} skills</span>
      </div>

      {/* Grid of Skill Cards */}
      <div
        className={`${
          isMobileCarousel
            ? 'flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 scrollbar-thin scrollbar-thumb-[#00E5FF]/30'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {skillsData.map((skill, index) => (
            <div
              key={skill.id}
              className={isMobileCarousel ? 'min-w-[85vw] max-w-[85vw] snap-center shrink-0' : ''}
            >
              <SkillCard skill={skill} index={index} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
