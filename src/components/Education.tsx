'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Calendar,
  Languages,
} from 'lucide-react';
import {
  educationData,
  certificationsData,
  interestsAndLanguages,
} from '@/config/portfolioData';

export default function Education() {
  return (
    <section id="education" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#00E5FF]/8 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Education &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#22D3EE]">
            Certifications
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column: Education Timeline */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#00E5FF]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#00E5FF]/15">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Academic Journey</h3>
                <p className="text-xs text-slate-400">Formal degrees and schooling</p>
              </div>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#00E5FF] before:via-[#00E5FF]/30 before:to-transparent">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Glowing Node Dot */}
                  <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#050B14] border-2 border-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_10px_#00E5FF] transition-all" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold text-[#00E5FF] flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {edu.year}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF]">
                      Score: {edu.score}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-medium text-slate-300 mt-0.5">{edu.institution}</p>
                  {edu.details && (
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{edu.details}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Industry Certifications */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#00E5FF]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#00E5FF]/15">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Professional Certifications</h3>
                <p className="text-xs text-slate-400">Industry-recognized technical credentials</p>
              </div>
            </div>

            <div className="space-y-6">
              {certificationsData.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-[#00E5FF]/15 hover:border-[#00E5FF]/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-semibold text-[#22D3EE]">{cert.issuer}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 shrink-0">
                      VERIFIED
                    </span>
                  </div>

                  <p className="text-xs text-slate-300/90 leading-relaxed mt-2">
                    {cert.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cert.skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Languages Glass Strip */}
      <div className="glass-card p-5 rounded-xl border border-[#00E5FF]/15 flex items-start gap-4">
        <div className="w-9 h-9 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
          <Languages className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-2">Languages Spoken</h4>
          <div className="flex flex-wrap gap-2">
            {interestsAndLanguages.languages.map((lang) => (
              <div
                key={lang.name}
                className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-200"
              >
                <span className="font-semibold text-white">{lang.name}</span>
                <span className="text-[11px] text-slate-400 ml-1.5">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
