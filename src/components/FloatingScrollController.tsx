'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

export default function FloatingScrollController() {
  const [hoveredHalf, setHoveredHalf] = useState<'up' | 'down' | null>(null);

  const getCurrentSectionIndex = () => {
    const scrollPosition = window.pageYOffset + 150;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i]);
      if (el && el.offsetTop <= scrollPosition) {
        return i;
      }
    }
    return 0;
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  const handleScrollUp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      scrollToSection(SECTIONS[currentIndex - 1]);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollDown = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < SECTIONS.length - 1) {
      scrollToSection(SECTIONS[currentIndex + 1]);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex items-center select-none"
      aria-label="Scroll Up and Down"
    >
      {/* Tooltip on Hover */}
      <AnimatePresence>
        {hoveredHalf && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full mr-3 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#050B14]/95 border border-[#00E5FF]/40 text-[11px] font-mono font-semibold text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] pointer-events-none"
          >
            {hoveredHalf === 'up' ? 'SCROLL UP ▲' : 'SCROLL DOWN ▼'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Futuristic Mouse Scroll Capsule with Static Glowing Dot */}
      <div className="relative w-6 sm:w-7 h-12 sm:h-14 rounded-full border-2 border-[#00E5FF] bg-[#050B14]/90 backdrop-blur-md shadow-[0_0_18px_rgba(0,229,255,0.45)] hover:shadow-[0_0_26px_rgba(0,229,255,0.75)] hover:border-[#22D3EE] transition-all duration-300 flex items-center justify-center p-1 overflow-hidden group">
        {/* Static Glowing Cyan Dot (No Up/Down Animation) */}
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] pointer-events-none" />

        {/* Top Half Click Area: Scroll UP */}
        <button
          onClick={handleScrollUp}
          onMouseEnter={() => setHoveredHalf('up')}
          onMouseLeave={() => setHoveredHalf(null)}
          aria-label="Scroll Up"
          className="absolute top-0 inset-x-0 h-1/2 cursor-pointer z-10 focus:outline-none"
          title="Click to Scroll Up"
        />

        {/* Bottom Half Click Area: Scroll DOWN */}
        <button
          onClick={handleScrollDown}
          onMouseEnter={() => setHoveredHalf('down')}
          onMouseLeave={() => setHoveredHalf(null)}
          aria-label="Scroll Down"
          className="absolute bottom-0 inset-x-0 h-1/2 cursor-pointer z-10 focus:outline-none"
          title="Click to Scroll Down"
        />
      </div>
    </div>
  );
}
