'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface VisualElementProps {
  type: 'flame' | 'architecture' | 'forge' | 'neon' | 'digital' | 'ethereal';
  color: string;
  isActive: boolean;
}

export default function VisualElement({ type, color, isActive }: VisualElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      // Animate floating elements
      gsap.to('.float-element', {
        y: -30,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Animate rotation
      gsap.to('.rotate-element', {
        rotation: 360,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const renderVisual = () => {
    switch (type) {
      case 'flame':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#ff8c42" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
              <filter id="flameGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Main flame */}
            <path
              d="M100 180 C60 140 40 100 50 60 C60 40 80 30 100 20 C120 30 140 40 150 60 C160 100 140 140 100 180"
              fill="url(#flameGrad)"
              filter="url(#flameGlow)"
              className="animate-pulse"
              style={{ transformOrigin: '100px 150px' }}
            />
            {/* Inner flame */}
            <path
              d="M100 160 C80 130 70 100 80 70 C90 55 100 50 100 40 C100 50 110 55 120 70 C130 100 120 130 100 160"
              fill="#ffd700"
              opacity="0.8"
              className="animate-pulse"
              style={{ animationDelay: '0.3s' }}
            />
            {/* Core */}
            <ellipse cx="100" cy="150" rx="20" ry="30" fill="#fff5e0" opacity="0.6" />
          </svg>
        );

      case 'architecture':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="archGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#f5d67b" />
              </linearGradient>
            </defs>
            {/* Column 1 */}
            <rect x="30" y="60" width="20" height="120" fill="url(#archGrad)" />
            <rect x="25" y="50" width="30" height="10" fill="url(#archGrad)" />
            {/* Column 2 */}
            <rect x="90" y="40" width="20" height="140" fill="url(#archGrad)" />
            <rect x="85" y="30" width="30" height="10" fill="url(#archGrad)" />
            {/* Column 3 */}
            <rect x="150" y="60" width="20" height="120" fill="url(#archGrad)" />
            <rect x="145" y="50" width="30" height="10" fill="url(#archGrad)" />
            {/* Roof */}
            <polygon points="20,60 100,20 180,60" fill="url(#archGrad)" />
            {/* Pediment */}
            <polygon points="40,60 100,35 160,60" fill="none" stroke="url(#archGrad)" strokeWidth="2" />
          </svg>
        );

      case 'forge':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="forgeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#0099cc" />
              </linearGradient>
            </defs>
            {/* Gear 1 */}
            <g className="rotate-element" style={{ transformOrigin: '70px 80px' }}>
              <circle cx="70" cy="80" r="40" fill="none" stroke="url(#forgeGrad)" strokeWidth="4" />
              <circle cx="70" cy="80" r="30" fill="none" stroke="url(#forgeGrad)" strokeWidth="2" />
              {[...Array(8)].map((_, i) => (
                <rect
                  key={i}
                  x="66"
                  y="35"
                  width="8"
                  height="15"
                  fill="url(#forgeGrad)"
                  transform={`rotate(${i * 45} 70 80)`}
                />
              ))}
            </g>
            {/* Gear 2 */}
            <g className="rotate-element" style={{ transformOrigin: '140px 120px', animationDirection: 'reverse' }}>
              <circle cx="140" cy="120" r="30" fill="none" stroke="url(#forgeGrad)" strokeWidth="3" />
              <circle cx="140" cy="120" r="20" fill="none" stroke="url(#forgeGrad)" strokeWidth="2" />
              {[...Array(6)].map((_, i) => (
                <rect
                  key={i}
                  x="137"
                  y="86"
                  width="6"
                  height="10"
                  fill="url(#forgeGrad)"
                  transform={`rotate(${i * 60} 140 120)`}
                />
              ))}
            </g>
            {/* Sparks */}
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                className="float-element"
                cx={50 + Math.random() * 100}
                cy={50 + Math.random() * 100}
                r="2"
                fill="#00d4ff"
                opacity="0.6"
              />
            ))}
          </svg>
        );

      case 'neon':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Building outlines */}
            <g filter="url(#neonGlow)">
              <rect x="20" y="80" width="30" height="100" fill="none" stroke="#8b5cf6" strokeWidth="2" />
              <rect x="55" y="50" width="40" height="130" fill="none" stroke="#8b5cf6" strokeWidth="2" />
              <rect x="100" y="70" width="35" height="110" fill="none" stroke="#8b5cf6" strokeWidth="2" />
              <rect x="140" y="40" width="40" height="140" fill="none" stroke="#8b5cf6" strokeWidth="2" />
              {/* Windows */}
              <rect x="60" y="60" width="8" height="8" fill="#8b5cf6" opacity="0.5" />
              <rect x="75" y="60" width="8" height="8" fill="#8b5cf6" opacity="0.5" />
              <rect x="60" y="80" width="8" height="8" fill="#8b5cf6" opacity="0.8" />
              <rect x="75" y="80" width="8" height="8" fill="#8b5cf6" opacity="0.3" />
            </g>
            {/* Neon sign */}
            <path
              d="M60 130 L100 120 L140 130"
              fill="none"
              stroke="#f472b6"
              strokeWidth="3"
              filter="url(#neonGlow)"
              className="animate-pulse"
            />
          </svg>
        );

      case 'digital':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="digitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {/* Circuit lines */}
            <g stroke="url(#digitalGrad)" strokeWidth="2" fill="none">
              <path d="M20 100 L60 100 L60 60 L100 60" />
              <path d="M100 60 L100 100 L140 100 L140 140 L180 140" />
              <path d="M60 100 L60 140 L100 140 L100 180" />
              <path d="M100 100 L140 100 L140 60 L180 60" />
            </g>
            {/* Nodes */}
            <circle cx="60" cy="100" r="6" fill="#f472b6" className="animate-pulse" />
            <circle cx="100" cy="60" r="6" fill="#f472b6" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
            <circle cx="140" cy="100" r="6" fill="#f472b6" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            <circle cx="100" cy="140" r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
            {/* Data streams */}
            <line x1="30" y1="30" x2="170" y2="30" stroke="url(#digitalGrad)" strokeWidth="1" opacity="0.3" />
            <line x1="30" y1="170" x2="170" y2="170" stroke="url(#digitalGrad)" strokeWidth="1" opacity="0.3" />
          </svg>
        );

      case 'ethereal':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="etherealGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f8f8fc" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
              <filter id="etherealGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Central glow */}
            <circle cx="100" cy="100" r="60" fill="url(#etherealGrad)" filter="url(#etherealGlow)" />
            {/* Rays */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos((i * 30 * Math.PI) / 180) * 80}
                y2={100 + Math.sin((i * 30 * Math.PI) / 180) * 80}
                stroke="#d4af37"
                strokeWidth="1"
                opacity="0.4"
                className="float-element"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
            {/* Inner rings */}
            <circle cx="100" cy="100" r="40" fill="none" stroke="#f8f8fc" strokeWidth="1" opacity="0.3" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
            {/* Center light */}
            <circle cx="100" cy="100" r="10" fill="#f8f8fc" opacity="0.8" filter="url(#etherealGlow)" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full transition-all duration-1000 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      {renderVisual()}
    </div>
  );
}
