'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Briefcase, Mail, Copy, Check } from 'lucide-react';
import { profileData } from '@/config/portfolioData';

interface CTAProps {
  onOpenContact: () => void;
}

export default function CTA({ onOpenContact }: CTAProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background glow behind CTA */}
      <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-32 bg-[#00E5FF]/15 blur-[90px] rounded-full pointer-events-none -z-10" />

      {/* Glass Strip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-12 border border-[#00E5FF]/30 shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_35px_rgba(0,229,255,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        {/* Subtle grid in background */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-semibold text-[#00E5FF] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>OPEN FOR APPLICATION &amp; MOBILE ROLES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#22D3EE] to-white drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">
              Amazing together 👋
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
            Looking for a dedicated Junior Application Developer proficient in Flutter, Ionic, full-stack
            web applications, and Python? Let&apos;s discuss how I can contribute immediately to your
            engineering team.
          </p>
        </div>

        {/* Action Buttons: Get In Touch + Copy Email */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="glow-btn-cyan px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.3)] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyEmail}
            className="glow-btn-outline px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
          >
            {showToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#00E5FF]" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Floating Copy Email Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#081826]/95 border border-[#00E5FF] px-5 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,229,255,0.3)] flex items-center gap-3 backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Email Copied to Clipboard!</p>
              <p className="text-[11px] font-mono text-[#22D3EE]">{profileData.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
