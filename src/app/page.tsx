'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import ContactModal from '@/components/ContactModal';
import CursorSpotlight from '@/components/CursorSpotlight';
import FloatingScrollController from '@/components/FloatingScrollController';

export default function Home() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleOpenContact = () => {
    setContactModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050B14] text-slate-100 overflow-x-hidden selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Interactive mouse-following cyber ambient spotlight */}
      <CursorSpotlight />

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00E5FF] focus:text-[#03070E] focus:rounded-lg focus:font-bold focus:shadow-[0_0_20px_#00E5FF] transition-all"
      >
        Skip to main content
      </a>

      {/* Background ambient lighting and cyber grid texture */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0" />
      <div className="fixed inset-0 cyber-radial-overlay pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Glass Pill Navbar with Theme Toggle & Scroll-spy */}
        <Navbar onOpenContact={handleOpenContact} />

        <main id="main-content" className="flex-1 focus:outline-none">
          {/* Hero Section */}
          <Hero
            onOpenResume={() => setResumeModalOpen(true)}
            onOpenContact={handleOpenContact}
          />

          {/* Interactive About Me / Engineering Specializations Section */}
          <About onOpenContact={handleOpenContact} />

          {/* Enhanced Filterable Skills & Technologies Section */}
          <Skills />

          {/* Selected Projects Section with Tech Stack Filtering */}
          <Projects onOpenContact={handleOpenContact} />

          {/* Education & Certifications Section */}
          <Education />

          {/* Contact Section with Inline Info Cards & Dialog Launcher */}
          <ContactSection onOpenContactModal={handleOpenContact} />
        </main>

        {/* Footer with Circular Arrow */}
        <Footer />
      </div>

      {/* Futuristic Right-Side Floating Scroll Controller ONLY (Scroll Down & Up) */}
      <FloatingScrollController />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Contact Message Dialog Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
