'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Phone, MapPin, Award, CheckCircle2, FileText } from 'lucide-react';
import { profileData, educationData, certificationsData, skillsData } from '@/config/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#081826] border border-[#00E5FF]/30 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.2)] z-10 max-h-[90vh] overflow-y-auto text-left"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#00E5FF]/20">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00E5FF]" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Official Resume &amp; Credentials
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-semibold text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#03070E] transition-all flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close Resume Modal"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Resume Content Container */}
            <div className="space-y-6">
              {/* Top Identity Block */}
              <div className="bg-[#050B14]/80 p-6 rounded-2xl border border-[#00E5FF]/20">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profileData.name}
                </h1>
                <p className="text-sm font-semibold text-[#00E5FF] mt-1">{profileData.role}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                    {profileData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
                    {profileData.phoneDisplay}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#00E5FF]" />
                    {profileData.email}
                  </span>
                </div>
              </div>

              {/* Objective */}
              <div>
                <h2 className="text-xs font-bold font-mono tracking-widest text-[#00E5FF] uppercase mb-2">
                  CAREER OBJECTIVE
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  {profileData.summary}
                </p>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-bold font-mono tracking-widest text-[#00E5FF] uppercase mb-2">
                  EDUCATION
                </h2>
                <div className="space-y-2.5">
                  {educationData.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <h3 className="text-sm font-bold text-white">{edu.institution}</h3>
                        <p className="text-xs text-slate-300">{edu.degree}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#00E5FF]">{edu.score}</span>
                        <p className="text-[11px] text-slate-400">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-xs font-bold font-mono tracking-widest text-[#00E5FF] uppercase mb-2">
                  TECHNICAL PROFICIENCIES
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsData.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>
                        {skill.name} ({skill.percentage}%)
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-xs font-bold font-mono tracking-widest text-[#00E5FF] uppercase mb-2">
                  INDUSTRY CERTIFICATIONS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certificationsData.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-[#00E5FF]" />
                        <h3 className="text-xs font-bold text-white">{cert.title}</h3>
                      </div>
                      <p className="text-[11px] text-[#22D3EE] font-medium">{cert.issuer}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                        {cert.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
