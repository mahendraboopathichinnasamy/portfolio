'use client';

/**
 * PetController – animation state machine + inactivity timer
 *
 * Exports:
 *   usePetController(activeSection) → { animState, bubble, onCanvasClick }
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Animation states ───────────────────────────────────────────────────────
export type AnimState =
  | 'idle'
  | 'wave'
  | 'walk'
  | 'run'
  | 'jump'
  | 'look'
  | 'sit'
  | 'think'
  | 'celebrate';

// ── Section → anim mapping ─────────────────────────────────────────────────
const SECTION_ANIM: Record<string, AnimState> = {
  home:      'wave',
  about:     'idle',
  skills:    'look',
  projects:  'think',
  education: 'idle',
  contact:   'celebrate',
};

const INACTIVITY_MS = 30_000; // 30s

// ── Hook ───────────────────────────────────────────────────────────────────
export function usePetController(activeSection: string) {
  const [animState, setAnimState] = useState<AnimState>('idle');

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSection     = useRef('');
  const isIdle          = useRef(false);

  // ── Trigger an anim state then revert to idle ─────────────────────────────
  const triggerAnim = useCallback(
    (state: AnimState, duration = 2800) => {
      setAnimState(state);
      const t = setTimeout(() => setAnimState('idle'), duration);
      return () => clearTimeout(t);
    },
    [],
  );

  // ── Section changes ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeSection || activeSection === prevSection.current) return;
    prevSection.current = activeSection;
    isIdle.current = false;

    const anim = SECTION_ANIM[activeSection] ?? 'idle';

    if (anim === 'celebrate') {
      // celebrate → wave → idle
      setAnimState('celebrate');
      const t = setTimeout(() => {
        setAnimState('wave');
        const t2 = setTimeout(() => setAnimState('idle'), 2000);
        return () => clearTimeout(t2);
      }, 3000);
      return () => clearTimeout(t);
    }

    triggerAnim(anim, anim === 'idle' ? 0 : 3000);
  }, [activeSection, triggerAnim]);

  // ── Inactivity timer ──────────────────────────────────────────────────────
  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (isIdle.current) {
      isIdle.current = false;
      setAnimState('idle');
    }
    inactivityTimer.current = setTimeout(() => {
      isIdle.current = true;
      setAnimState('sit');
    }, INACTIVITY_MS);
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach(e => window.addEventListener(e, resetInactivity, { passive: true }));
    resetInactivity(); // start timer immediately

    return () => {
      events.forEach(e => window.removeEventListener(e, resetInactivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivity]);

  // ── Click on character ────────────────────────────────────────────────────
  const onCanvasClick = useCallback(() => {
    resetInactivity();
    triggerAnim('jump', 1800);
  }, [resetInactivity, triggerAnim]);

  return { animState, onCanvasClick };
}

