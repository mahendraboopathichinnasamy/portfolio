'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Check,
  MessageSquare,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Body scroll lock & Escape key listener
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

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formState.name.trim()) {
      errors.name = 'Please provide your full name.';
    } else if (formState.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formState.message.trim()) {
      errors.message = 'Please write a brief message.';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real-world asynchronous API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setFormErrors({});
    }, 1200);
  };

  const handleClose = () => {
    setFormSubmitted(false);
    setFormErrors({});
    onClose();
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#081826] border border-[#00E5FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.2)] z-10 max-h-[90vh] overflow-y-auto text-left"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#00E5FF]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="contact-modal-title" className="text-lg font-bold text-white tracking-tight">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-slate-400">
                    All messages trigger direct notification. I respond promptly within 24 hours.
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close Contact Dialog"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] transition-colors cursor-pointer min-h-[44px] min-w-[44px] shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-center space-y-3 my-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] text-[#00E5FF] flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_#00E5FF]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! Your note has been received and I will reply to your email address shortly.
                </p>
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 transition-colors min-h-[44px] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={handleClose}
                    className="glow-btn-cyan px-5 py-2 rounded-xl text-xs font-bold min-h-[44px] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="modal-contact-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-[#00E5FF]">*</span>
                    </label>
                    <input
                      id="modal-contact-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'modal-name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#050B14]/80 border text-white placeholder-slate-500 text-xs focus:outline-none transition-all min-h-[44px] ${
                        formErrors.name
                          ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#00E5FF]/20 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]'
                      }`}
                    />
                    {formErrors.name && (
                      <p id="modal-name-error" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="modal-contact-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-[#00E5FF]">*</span>
                    </label>
                    <input
                      id="modal-contact-email"
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'modal-email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-[#050B14]/80 border text-white placeholder-slate-500 text-xs focus:outline-none transition-all min-h-[44px] ${
                        formErrors.email
                          ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#00E5FF]/20 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]'
                      }`}
                    />
                    {formErrors.email && (
                      <p id="modal-email-error" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="modal-contact-subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject / Project Context
                  </label>
                  <input
                    id="modal-contact-subject"
                    type="text"
                    placeholder="e.g. Junior Developer Role / Mobile App Consultation"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#050B14]/80 border border-[#00E5FF]/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all min-h-[44px]"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="modal-contact-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message <span className="text-[#00E5FF]">*</span>
                  </label>
                  <textarea
                    id="modal-contact-message"
                    rows={4}
                    placeholder="Tell me about your team, tech stack, or project goals..."
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? 'modal-message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-[#050B14]/80 border text-white placeholder-slate-500 text-xs focus:outline-none transition-all resize-none min-h-[110px] ${
                      formErrors.message
                        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-[#00E5FF]/20 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]'
                    }`}
                  />
                  {formErrors.message && (
                    <p id="modal-message-error" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button with Loading State */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glow-btn-cyan w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#00E5FF] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#03070E]" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message Now</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
