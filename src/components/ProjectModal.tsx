'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Tag, Layers, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  onOpenContact,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Dialog Card with smooth scale-up & exit */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#081826] border border-[#00E5FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,229,255,0.2)] z-10 max-h-[90vh] overflow-y-auto text-left"
          >
            {/* Close button with 44px min target */}
            <button
              onClick={onClose}
              aria-label="Close Project Details Modal"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-semibold mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{project.category}</span>
              </div>
              <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#22D3EE] font-mono mt-0.5">
                {project.metrics}
              </p>
            </div>

            {/* Project Preview Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#00E5FF]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] mb-6 bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-3 mb-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                Project Architecture &amp; Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Engineering Highlights from Resume */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                Technical Implementation Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Tags */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#00E5FF]" />
                Technologies &amp; Libraries Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-[#00E5FF]/15 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors min-h-[44px] cursor-pointer"
              >
                Close Window
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="glow-btn-cyan px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 min-h-[44px] cursor-pointer"
                >
                  <span>Discuss This Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
