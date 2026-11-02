'use client';

/**
 * PortfolioPet – Static Companion Character
 *
 * Renders the original high-resolution transparent cartoon character PNG
 * stationed directly on the upper side of the footer border line above
 * the social links.
 *
 * - Perfectly stationary (0 unwanted layout shifts, 0 movement)
 * - Razor-sharp native resolution
 * - Subtle ground underglow resting his sneakers on the line
 * - Z-index layered above swarm cursor particles
 */

import React from 'react';
import Image from 'next/image';
import './pet.css';

export default function PortfolioPet() {
  return (
    <div className="pet-root" aria-label="Portfolio companion">
      <div className="pet-character-wrap" data-pet="true">
        <Image
          src="/images/companion-character.png"
          alt="Portfolio Companion"
          width={90}
          height={135}
          priority
          className="pet-character-img"
        />
        {/* Subtle ground contact shadow / underglow on footer line */}
        <div className="pet-ground-glow" />
      </div>
    </div>
  );
}
