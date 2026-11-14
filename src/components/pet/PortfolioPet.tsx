'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './pet.css';

export default function PortfolioPet() {
  const [greetingSignal, setGreetingSignal] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
    if (!showGreeting) return;
    const greetingTimer = window.setTimeout(() => setShowGreeting(false), 3000);
    return () => window.clearTimeout(greetingTimer);
  }, [showGreeting, greetingSignal]);

  const greet = () => {
    setGreetingSignal((current) => current + 1);
    setShowGreeting(true);
  };

  return (
    <div className="pet-root">
      <div className="pet-walk-track">
      <div className="pet-walker">
      <button
        type="button"
        className="pet-character-wrap"
        aria-label="Portfolio companion. Click to say hi."
        onClick={greet}
      >
        <span className={`pet-greeting ${showGreeting ? 'pet-greeting-visible' : ''}`} aria-hidden="true">
          Hi!
        </span>

        <span className="pet-facing">
        <Image
          src="/images/companion-character.png"
          alt="Companion with curly brown hair, black hoodie and cargo trousers, and black-and-white sneakers"
          width={682}
          height={1024}
          sizes="(max-width: 640px) 112px, 132px"
          className="pet-character-img"
        />
        </span>

        <span className="pet-ground-glow" aria-hidden="true" />
      </button>
      </div>
      </div>
    </div>
  );
}
