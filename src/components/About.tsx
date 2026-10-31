'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Globe,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Briefcase,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { profileData } from '@/config/portfolioData';

interface AboutProps {
  onOpenContact: () => void;
}

type TabType = 'focus' | 'terminal' | 'strengths';

export default function About({ onOpenContact }: AboutProps) {
  const [activeTab, setActiveTab] = useState<TabType>('focus');
  const [terminalTab, setTerminalTab] = useState<'profile' | 'mobile' | 'contact'>('profile');
  const [copied, setCopied] = useState(false);

  const handleCopyCli = () => {
    const cliData = `// Mahendra Boopathi.C - Developer Profile
Name: "${profileData.name}"
Role: "${profileData.role}"
Specialization: ["Flutter", "Ionic", "Full Stack Web", "Python"]
Email: "${profileData.email}"
Phone: "${profileData.phoneDisplay}"
Location: "${profileData.location}"
Status: "${profileData.availability}"`;

    navigator.clipboard.writeText(cliData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const focusCards = [
    {
      icon: <Smartphone className="w-6 h-6 text-[#00E5FF]" />,
      title: 'Mobile App Development',
      badge: 'Flutter & Ionic',
      description:
        'Crafting responsive, native-feel cross-platform apps for Android & iOS using Flutter, Dart, Ionic, and Capacitor. Focused on smooth 60fps animations and clean state management.',
      tags: ['Flutter', 'Dart', 'Ionic', 'Capacitor', 'Mobile UI'],
    },
    {
      icon: <Globe className="w-6 h-6 text-[#22D3EE]" />,
      title: 'Full Stack Web Architecture',
      badge: 'Modern Web',
      description:
        'Architecting fast, accessible web applications using modern JavaScript/TypeScript, HTML5, CSS3, Node.js REST APIs, and responsive design systems with sleek dark-mode glassmorphism.',
      tags: ['TypeScript', 'JavaScript', 'HTML5/CSS3', 'Node.js', 'Tailwind'],
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#38BDF8]" />,
      title: 'Python & Data Analytics',
      badge: 'GUVI Certified',
      description:
        'Writing clean Python automation scripts, object-oriented software, and building interactive business intelligence dashboards using Power BI and Tableau.',
      tags: ['Python 3', 'Data Structures', 'Power BI', 'Tableau', 'Excel'],
    },
  ];

  const strengths = [
    {
      title: 'Cross-Platform Velocity',
      desc: 'Single codebase deployment to Android, iOS, and Web without compromising platform-specific user experience.',
    },
    {
      title: 'Pixel-Perfect Modern UI/UX',
      desc: 'Eye for dark futurism, accessible typography, fluid micro-interactions, and responsive layouts.',
    },
    {
      title: 'Continuous Industry Upskilling',
      desc: 'Actively certified in Advanced Python (GUVI) and Full Stack Web (Udemy), with quick mastery of emerging frameworks.',
    },
    {
      title: 'Clear Engineering Communication',
      desc: 'Collaborative mindset, structured documentation, and clean version control with Git and GitHub.',
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#00E5FF]/8 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Building Scalable{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#22D3EE] to-[#38BDF8]">
            Mobile &amp; Web Applications
          </span>
        </h2>
      </div>

      {/* Interactive Tabs Header */}
      <div className="flex items-center justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#081826]/80 border border-[#00E5FF]/20 backdrop-blur-md gap-1 shadow-lg max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('focus')}
            className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[44px] flex items-center gap-2 ${
              activeTab === 'focus' ? 'text-[#03070E]' : 'text-slate-300 hover:text-white'
            }`}
          >
            {activeTab === 'focus' && (
              <motion.div
                layoutId="activeAboutTab"
                className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Core Specializations
            </span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[44px] flex items-center gap-2 ${
              activeTab === 'terminal' ? 'text-[#03070E]' : 'text-slate-300 hover:text-white'
            }`}
          >
            {activeTab === 'terminal' && (
              <motion.div
                layoutId="activeAboutTab"
                className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              Interactive CLI Profile
            </span>
          </button>

          <button
            onClick={() => setActiveTab('strengths')}
            className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[44px] flex items-center gap-2 ${
              activeTab === 'strengths' ? 'text-[#03070E]' : 'text-slate-300 hover:text-white'
            }`}
          >
            {activeTab === 'strengths' && (
              <motion.div
                layoutId="activeAboutTab"
                className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Engineering Strengths
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {activeTab === 'focus' && (
          <motion.div
            key="focus"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {focusCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="glass-card p-6 md:p-7 flex flex-col justify-between rounded-2xl border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all duration-300 group hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center group-hover:scale-105 group-hover:border-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                      {card.icon}
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#00E5FF]/15">
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto glass-card rounded-2xl border border-[#00E5FF]/30 overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(0,229,255,0.1)] mb-12"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#050B14]/90 border-b border-[#00E5FF]/20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  mb@developer-machine:~/{terminalTab}.json
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTerminalTab('profile')}
                  className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                    terminalTab === 'profile'
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  profile.json
                </button>
                <button
                  onClick={() => setTerminalTab('mobile')}
                  className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                    terminalTab === 'mobile'
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  mobile-stack.dart
                </button>
                <button
                  onClick={() => setTerminalTab('contact')}
                  className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                    terminalTab === 'contact'
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  contact.env
                </button>
                <button
                  onClick={handleCopyCli}
                  aria-label="Copy Terminal Output"
                  className="ml-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#00E5FF] text-xs font-mono text-[#00E5FF] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs sm:text-sm bg-[#03070E]/95 overflow-x-auto leading-relaxed">
              {terminalTab === 'profile' && (
                <pre className="text-slate-300">
                  <span className="text-slate-500">{'// Developer Profile Descriptor'}</span>
                  {'\n'}&#123;
                  {'\n'}  <span className="text-[#00E5FF]">&quot;name&quot;</span>: <span className="text-emerald-300">&quot;Mahendra Boopathi.C&quot;</span>,
                  {'\n'}  <span className="text-[#00E5FF]">&quot;currentRole&quot;</span>: <span className="text-emerald-300">&quot;Junior Application Developer&quot;</span>,
                  {'\n'}  <span className="text-[#00E5FF]">&quot;primaryDomains&quot;</span>: [
                  {'\n'}    <span className="text-amber-300">&quot;Mobile App Development (Flutter, Dart, Ionic)&quot;</span>,
                  {'\n'}    <span className="text-amber-300">&quot;Full Stack Web (JavaScript, React, Node.js)&quot;</span>,
                  {'\n'}    <span className="text-amber-300">&quot;Python Automation &amp; Data Visualization&quot;</span>
                  {'\n'}  ],
                  {'\n'}  <span className="text-[#00E5FF]">&quot;academics&quot;</span>: &#123;
                  {'\n'}    <span className="text-[#22D3EE]">&quot;degree&quot;</span>: <span className="text-emerald-300">&quot;B.Com (Computer Applications)&quot;</span>,
                  {'\n'}    <span className="text-[#22D3EE]">&quot;institution&quot;</span>: <span className="text-slate-400">&quot;Vidyasagar College of Arts and Science&quot;</span>,
                  {'\n'}    <span className="text-[#22D3EE]">&quot;grade&quot;</span>: <span className="text-[#00E5FF]">&quot;First Class Distinction (80%)&quot;</span>
                  {'\n'}  &#125;,
                  {'\n'}  <span className="text-[#00E5FF]">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;Actively Interviewing for Junior Application Developer Positions&quot;</span>
                  {'\n'}&#125;
                </pre>
              )}

              {terminalTab === 'mobile' && (
                <pre className="text-slate-300">
                  <span className="text-slate-500">{'// Flutter & Mobile Architecture Snapshot'}</span>
                  {'\n'}<span className="text-[#22D3EE]">import</span> <span className="text-amber-300">&apos;package:flutter/material.dart&apos;</span>;
                  {'\n'}
                  {'\n'}<span className="text-[#00E5FF]">class</span> <span className="text-emerald-300">MobileAppCapability</span> &#123;
                  {'\n'}  <span className="text-[#22D3EE]">final</span> String framework = <span className="text-amber-300">&quot;Flutter 3.x &amp; Ionic Framework&quot;</span>;
                  {'\n'}  <span className="text-[#22D3EE]">final</span> List&lt;String&gt; capabilities = [
                  {'\n'}    <span className="text-amber-300">&quot;State Management (Riverpod, Provider)&quot;</span>,
                  {'\n'}    <span className="text-amber-300">&quot;Native Device APIs &amp; Capacitor Plugins&quot;</span>,
                  {'\n'}    <span className="text-amber-300">&quot;Offline-first Caching with SQLite &amp; Hive&quot;</span>,
                  {'\n'}    <span className="text-amber-300">&quot;REST API &amp; JSON Serialization&quot;</span>
                  {'\n'}  ];
                  {'\n'}
                  {'\n'}  <span className="text-[#22D3EE]">bool</span> <span className="text-[#00E5FF]">isReadyForProduction</span>() =&gt; <span className="text-[#00E5FF]">true</span>;
                  {'\n'}&#125;
                </pre>
              )}

              {terminalTab === 'contact' && (
                <div>
                  <pre className="text-slate-300">
                    <span className="text-slate-500"># Direct Connectivity Variables</span>
                    {'\n'}DEV_NAME=<span className="text-emerald-300">&quot;Mahendra Boopathi.C&quot;</span>
                    {'\n'}EMAIL=<span className="text-emerald-300">&quot;mahendraboopathichinnasamy@gmail.com&quot;</span>
                    {'\n'}PHONE=<span className="text-emerald-300">&quot;+91 93452 60331&quot;</span>
                    {'\n'}LOCATION=<span className="text-emerald-300">&quot;Udumalpet, Tamil Nadu, India&quot;</span>
                    {'\n'}AVAILABILITY=<span className="text-emerald-300">&quot;Immediate / Full-time&quot;</span>
                  </pre>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Ready to start a conversation?</span>
                    <button
                      onClick={onOpenContact}
                      className="glow-btn-cyan px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Direct Message</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'strengths' && (
          <motion.div
            key="strengths"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12"
          >
            {strengths.map((str) => (
              <div
                key={str.title}
                className="glass-card p-6 rounded-2xl border border-[#00E5FF]/20 flex items-start gap-4 hover:border-[#00E5FF]/50 transition-all shadow-md"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{str.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{str.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
