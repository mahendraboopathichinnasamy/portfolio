'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';
import { profileData } from '@/config/portfolioData';

interface ContactSectionProps {
  onOpenContactModal?: () => void;
}

export default function ContactSection({ onOpenContactModal }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background radial glow */}
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#00E5FF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-left mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Let&apos;s Start a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#22D3EE]">
            Conversation
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
          Interested in discussing an engineering role, collaborative project, or mobile application? Reach out directly.
        </p>
      </div>

      {/* Contact Cards in 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Email Card */}
        <div className="glass-card p-5 rounded-2xl border border-[#00E5FF]/20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Direct Email
              </span>
              <a
                href={`mailto:${profileData.email}`}
                className="block text-sm font-semibold text-white hover:text-[#00E5FF] transition-colors break-all mt-0.5 focus:outline-none focus:underline"
              >
                {profileData.email}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(profileData.email, 'email')}
            title="Copy Email to Clipboard"
            aria-label="Copy Email"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
          >
            {copiedField === 'email' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Phone Card */}
        <div className="glass-card p-5 rounded-2xl border border-[#00E5FF]/20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Phone &amp; WhatsApp
              </span>
              <a
                href={`tel:${profileData.phone}`}
                className="block text-sm font-semibold text-white hover:text-[#00E5FF] transition-colors mt-0.5 focus:outline-none focus:underline"
              >
                {profileData.phoneDisplay}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(profileData.phone, 'phone')}
            title="Copy Phone Number"
            aria-label="Copy Phone"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
          >
            {copiedField === 'phone' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Location Card */}
        <div className="glass-card p-5 rounded-2xl border border-[#00E5FF]/20 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Current Location
            </span>
            <p className="text-sm font-semibold text-white mt-0.5">
              {profileData.location}
            </p>
            <span className="inline-block mt-2 text-[11px] text-[#00E5FF] font-medium">
              • Available for Remote Roles, On-site &amp; Relocation
            </span>
          </div>
        </div>
      </div>

      {/* Direct Message Dialog Launcher Banner */}
      {onOpenContactModal && (
        <div className="glass-card p-6 md:p-7 rounded-2xl border border-[#00E5FF]/25 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-gradient-to-r from-[#081826]/90 via-[#050B14]/90 to-[#081826]/90">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Prefer to Send a Direct Note?</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Open the direct messaging dialog to transmit your project requirements or hiring inquiry.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenContactModal}
            className="glow-btn-cyan px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.35)] min-h-[44px]"
          >
            <span>Send Direct Message</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
