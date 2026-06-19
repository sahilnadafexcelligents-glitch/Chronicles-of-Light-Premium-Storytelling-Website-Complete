'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MouseGlowProps {
  color?: string;
  size?: number;
  isActive: boolean;
}

export default function MouseGlow({ 
  color = '#d4af37', 
  size = 400, 
  isActive 
}: MouseGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Animate the glow following cursor
  useEffect(() => {
    if (glowRef.current && isActive) {
      gsap.to(glowRef.current, {
        x: position.x,
        y: position.y,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [position, isActive]);

  // Check if device is touch/mobile
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={glowRef}
      className={`fixed pointer-events-none z-[2] transition-opacity duration-500 ${
        isActive && isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: size,
        height: size,
        left: 0,
        top: 0,
        transform: `translate(-50%, -50%)`,
      }}
      aria-hidden="true"
    >
      {/* Main glow gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(
            circle,
            ${color}15 0%,
            ${color}08 30%,
            ${color}03 50%,
            transparent 70%
          )`,
        }}
      />

      {/* Inner bright spot */}
      <div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-40"
        style={{
          background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
        }}
      />

      {/* Secondary ring */}
      <div
        className="absolute inset-8 rounded-full opacity-20"
        style={{
          border: `1px solid ${color}30`,
        }}
      />

      {/* Animated rings */}
      <div
        className="absolute inset-0 rounded-full opacity-10 animate-glow-pulse"
        style={{
          border: `1px solid ${color}20`,
        }}
      />
      <div
        className="absolute inset-4 rounded-full opacity-15 animate-glow-pulse animation-delay-500"
        style={{
          border: `1px solid ${color}25`,
        }}
      />
      <div
        className="absolute inset-8 rounded-full opacity-10 animate-glow-pulse animation-delay-1000"
        style={{
          border: `1px solid ${color}20`,
        }}
      />
    </div>
  );
}
