'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animate progress
    gsap.to({ value: 0 }, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(this.targets()[0].value);
      },
    });

    // Animate logo reveal
    gsap.fromTo('.loading-logo', 
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    // Animate particles
    gsap.fromTo('.loading-particle', 
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'back.out(1.7)' }
    );

    // Hide loading screen after animation
    const timer = setTimeout(() => {
      gsap.to('.loading-content', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsVisible(false);
          onComplete();
        },
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content relative z-10 flex flex-col items-center justify-center">
        {/* Particle ring */}
        <div className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="loading-particle absolute w-2 h-2 rounded-full bg-gradient-to-r from-champagne-gold to-warm-ember"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 30}deg) translateX(100px)`,
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="loading-logo flex flex-col items-center">
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-champagne-gold/30 via-warm-ember/20 to-transparent" />
            
            {/* Logo mark */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="relative z-10"
            >
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="url(#logoGradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <circle
                cx="40"
                cy="40"
                r="25"
                stroke="url(#logoGradient)"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M40 15 L40 65 M15 40 L65 40"
                stroke="url(#logoGradient)"
                strokeWidth="1"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Title */}
          <h1 className="mt-8 font-display text-2xl tracking-widest text-soft-white">
            CHRONICLES
          </h1>
          <p className="font-headline text-sm tracking-[0.4em] text-champagne-gold/80 mt-2">
            OF LIGHT
          </p>
        </div>

        {/* Progress bar */}
        <div className="loading-progress">
          <div
            className="loading-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <p className="font-mono text-xs tracking-widest text-soft-white/40 mt-4">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-champagne-gold/5" />
    </div>
  );
}
