'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/data/chapters';
import { initLenis, scrollTo, destroyLenis } from '@/lib/lenis';

// Dynamic imports for client-side only components
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const ChapterNav = dynamic(() => import('@/components/ChapterNav'), { ssr: false });
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false });
const Chapter = dynamic(() => import('@/components/Chapter'), { ssr: false });
const ParticleSystem = dynamic(() => import('@/components/ParticleSystem'), { ssr: false });
const MouseGlow = dynamic(() => import('@/components/MouseGlow'), { ssr: false });
const VisualElement = dynamic(() => import('@/components/VisualElement'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Handle loading complete
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => setIsReady(true), 100);
  }, []);

  // Initialize scroll tracking after loading
  useEffect(() => {
    if (!isLoading && isReady) {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis smooth scrolling
      const lenis = initLenis();

      // Track scroll position for chapter updates
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);

        // Determine current chapter
        const chapterHeight = window.innerHeight;
        const newChapter = Math.min(
          Math.floor(scrollTop / chapterHeight),
          chapters.length - 1
        );
        if (newChapter !== currentChapter) {
          setCurrentChapter(newChapter);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Create scroll triggers for each chapter
      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: `#chapter-${chapter.id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentChapter(index),
          onEnterBack: () => setCurrentChapter(index),
        });
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        destroyLenis();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [isLoading, isReady, currentChapter]);

  // Handle chapter navigation click
  const handleChapterClick = useCallback((index: number) => {
    const element = document.getElementById(`chapter-${chapters[index].id}`);
    if (element) {
      scrollTo(element, {
        offset: 0,
        duration: 1.5,
      });
    }
  }, []);

  // Get current chapter colors
  const currentChapterData = chapters[currentChapter];

  return (
    <main ref={mainRef} className="relative">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Three.js Background */}
      <ThreeBackground
        gradientStart={currentChapterData.gradientStart}
        gradientEnd={currentChapterData.gradientEnd}
        isActive={!isLoading}
      />

      {/* Particle System */}
      <ParticleSystem
        color={currentChapterData.accentColor}
        count={40}
        isActive={!isLoading}
      />

      {/* Mouse Glow Effect */}
      <MouseGlow
        color={currentChapterData.accentColor}
        size={500}
        isActive={!isLoading}
      />

      {/* Header */}
      <Header
        currentChapter={currentChapter}
        scrollProgress={scrollProgress}
        onChapterClick={handleChapterClick}
      />

      {/* Chapter Navigation */}
      <ChapterNav
        currentChapter={currentChapter}
        onChapterClick={handleChapterClick}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {chapters.map((chapter, index) => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            index={index}
            isActive={index === currentChapter}
          />
        ))}
      </div>

      {/* Final Section - Footer */}
      <footer className="relative z-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-deep-space to-black">
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-champagne-gold via-warm-ember to-dawn-rose" />
              <svg
                width="100"
                height="100"
                viewBox="0 0 80 80"
                fill="none"
                className="relative"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="url(#footerLogoGradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="25"
                  stroke="url(#footerLogoGradient)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M40 15 L40 65 M15 40 L65 40"
                  stroke="url(#footerLogoGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#ff6b35" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 gradient-text">
            Chronicles of Light
          </h2>

          {/* Subtitle */}
          <p className="font-headline text-lg tracking-widest text-soft-white/60 mb-12">
            A JOURNEY THROUGH HUMAN ILLUMINATION
          </p>

          {/* Credits */}
          <div className="space-y-4 mb-16">
            <p className="font-body text-lg text-soft-white/50">
              A visual storytelling experience exploring humanity&apos;s relationship with light.
            </p>
            <p className="font-mono text-xs tracking-widest text-soft-white/30">
              CRAFTED WITH PASSION &bull; TOLD WITH PURPOSE
            </p>
          </div>

          {/* Divider */}
          <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-champagne-gold to-transparent mb-12" />

          {/* Footer info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <span className="font-mono text-xs tracking-wider text-soft-white/40">
              {new Date().getFullYear()} &bull; ALL RIGHTS RESERVED
            </span>
            <span className="font-headline text-xs tracking-widest text-champagne-gold/60">
              PREMIUM DIGITAL EXPERIENCE
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-champagne-gold/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% {
              opacity: 0.2;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.5);
            }
          }
        `}</style>
      </footer>

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </main>
  );
}
