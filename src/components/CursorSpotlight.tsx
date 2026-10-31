'use client';

import { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const emptySubscribe = () => () => {};

export default function CursorSpotlight() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isActive, setIsActive] = useState(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Responsive spring physics: fluid on both desktop mouse and mobile touch
  const springX = useSpring(mouseX, { damping: 26, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 26, stiffness: 250 });

  useEffect(() => {
    // Desktop Mouse Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    // Mobile / Tablet Touch Event Handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      if (e.touches && e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
        setIsActive(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      if (e.touches && e.touches.length > 0) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
        setIsActive(true);
      }
    };

    const handleTouchEnd = () => {
      // Gracefully fade out glow 700ms after lifting touch
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 700);
    };

    // Register Desktop Mouse Listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Register Mobile Touch Listeners
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] rounded-full pointer-events-none z-30 select-none"
      aria-hidden="true"
    >
      {/* Outer Balanced Ambient Halo (Responsive on mobile and desktop) */}
      <div
        className="absolute inset-0 rounded-full blur-[60px] sm:blur-[75px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 229, 255, 0.16) 0%, rgba(34, 211, 238, 0.08) 38%, rgba(0, 180, 216, 0.02) 65%, transparent 75%)',
        }}
      />

      {/* Inner Soft Core Accent */}
      <div
        className="absolute inset-[80px] sm:inset-[130px] rounded-full blur-[30px] sm:blur-[40px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 229, 255, 0.24) 0%, rgba(34, 211, 238, 0.10) 45%, transparent 70%)',
        }}
      />

      {/* Center Tactile Glow Focus */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full blur-[8px] sm:blur-[10px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 229, 255, 0.38) 0%, rgba(34, 211, 238, 0.15) 60%, transparent 100%)',
        }}
      />
    </motion.div>
  );
}
