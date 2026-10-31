'use client';

import { ArrowUp, Heart, Mail, Phone, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { socialLinks } from '@/config/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <GithubIcon className="w-4 h-4" />;
      case 'Linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'Mail':
        return <Mail className="w-4 h-4" />;
      case 'Phone':
        return <Phone className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative border-t border-[#00E5FF]/15 bg-[#03070E]/80 backdrop-blur-md pt-8 pb-12 px-4 md:px-8">
      {/* Top Row: Four Icons on Left, Clean Rounded Icon on Right */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Four Icons on the Left side cleanly */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target={social.url.startsWith('http') ? '_blank' : undefined}
              rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={social.ariaLabel}
              className="w-10 h-10 rounded-full bg-[#081826]/80 border border-[#00E5FF]/30 flex items-center justify-center text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/15 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </div>

        {/* Clean Rounded Icon on the Right side */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to Top"
          className="w-10 h-10 rounded-full bg-[#081826]/80 border border-[#00E5FF]/30 text-[#00E5FF] flex items-center justify-center hover:bg-[#00E5FF] hover:text-[#03070E] hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          &copy; 2026 Mahendra Boopathi. Built with Next.js, TypeScript &amp; Tailwind CSS.
        </p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3 h-3 text-[#00E5FF] fill-[#00E5FF]" /> for modern mobile &amp; web engineering
        </p>
      </div>
    </footer>
  );
}
