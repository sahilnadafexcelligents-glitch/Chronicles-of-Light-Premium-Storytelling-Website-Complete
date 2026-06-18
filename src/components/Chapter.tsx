'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chapter as ChapterType } from '@/data/chapters';
import { Flame, Building2, Factory, Zap, Monitor, Sparkles } from 'lucide-react';

interface ChapterProps {
  chapter: ChapterType;
  index: number;
  isActive: boolean;
}

const visualIcons = {
  flame: Flame,
  architecture: Building2,
  forge: Factory,
  neon: Zap,
  digital: Monitor,
  ethereal: Sparkles,
};

export default function Chapter({ chapter, index, isActive }: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([numberRef.current, titleRef.current, subtitleRef.current, narrativeRef.current, visualRef.current, lineRef.current], {
        opacity: 0,
        y: 60,
      });

      // Create timeline for chapter reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate in sequence
      tl.to(numberRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(lineRef.current, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .to(narrativeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
        .to(visualRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  const VisualIcon = visualIcons[chapter.visualType];

  return (
    <section
      ref={sectionRef}
      id={`chapter-${chapter.id}`}
      className={`relative min-h-screen flex items-center justify-center py-20 transition-opacity duration-700 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
      data-chapter={index}
    >
      {/* Background gradient layer */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(180deg, ${chapter.gradientStart} 0%, ${chapter.gradientEnd} 100%)`,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Content container */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Chapter number */}
            <div className="flex items-center gap-4">
              <span
                ref={numberRef}
                className="chapter-number font-mono text-lg tracking-[0.3em] text-soft-white/60"
                style={{ color: chapter.accentColor }}
              >
                CHAPTER {chapter.number}
              </span>
              <div ref={lineRef} className="flex-1 h-[1px] bg-gradient-to-r from-current to-transparent origin-left scale-x-0" 
                style={{ color: chapter.accentColor }} />
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-soft-white"
            >
              {chapter.title}
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-headline text-lg md:text-xl tracking-wide text-soft-white/70"
              style={{ color: `${chapter.accentColor}aa` }}
            >
              {chapter.subtitle}
            </p>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent"
              style={{ color: chapter.accentColor }} />

            {/* Narrative */}
            <p
              ref={narrativeRef}
              className="font-body text-lg md:text-xl leading-relaxed text-soft-white/80 max-w-xl"
            >
              {chapter.narrative}
            </p>

            {/* Decorative quote mark */}
            <div className="relative">
              <span
                className="absolute -left-4 -top-4 font-display text-8xl opacity-10 select-none"
                style={{ color: chapter.accentColor }}
              >
                &ldquo;
              </span>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div ref={visualRef} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 blur-3xl scale-75 opacity-30"
                style={{
                  background: `radial-gradient(circle, ${chapter.accentColor}40 0%, transparent 70%)`,
                }}
              />

              {/* Visual container */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center transform scale-95"
              >
                {/* Rotating border */}
                <div
                  className="absolute inset-0 rounded-full border-[2px] border-dashed opacity-30 animate-spin-slow"
                  style={{
                    borderColor: chapter.accentColor,
                    animationDuration: '30s',
                  }}
                />

                {/* Inner rotating ring */}
                <div
                  className="absolute inset-4 rounded-full border border-current opacity-20"
                  style={{
                    borderColor: chapter.accentColor,
                    animation: 'spin 20s linear infinite reverse',
                  }}
                />

                {/* Center icon container */}
                <div className="relative z-10">
                  {/* Pulsing glow */}
                  <div
                    className="absolute inset-0 blur-xl opacity-40 animate-pulse"
                    style={{ backgroundColor: chapter.accentColor }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${chapter.accentColor}20 0%, transparent 50%, ${chapter.accentColor}10 100%)`,
                      border: `1px solid ${chapter.accentColor}40`,
                    }}
                  >
                    <VisualIcon
                      size={64}
                      className="transform transition-transform duration-700"
                      style={{
                        color: chapter.accentColor,
                        filter: `drop-shadow(0 0 20px ${chapter.accentColor})`,
                      }}
                    />
                  </div>
                </div>

                {/* Orbiting particles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: chapter.accentColor,
                      boxShadow: `0 0 10px ${chapter.accentColor}`,
                      animation: `orbit ${10 + i * 2}s linear infinite`,
                      transform: `rotate(${i * 60}deg) translateX(140px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-mono text-xs tracking-widest text-soft-white/40">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-soft-white/40 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              backgroundColor: chapter.accentColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* CSS for orbiting particles */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
}
