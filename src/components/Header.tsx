'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { chapters } from '@/data/chapters';

interface HeaderProps {
  currentChapter: number;
  scrollProgress: number;
  onChapterClick: (index: number) => void;
}

export default function Header({ currentChapter, scrollProgress, onChapterClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Animate header on mount
    gsap.fromTo('.header-content',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.2, ease: 'power3.out' }
    );

    // Handle scroll state
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="header-content px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                width="32"
                height="32"
                viewBox="0 0 80 80"
                fill="none"
                className="transition-transform duration-300 hover:scale-110"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="url(#headerLogoGradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="20"
                  stroke="url(#headerLogoGradient)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />
                <defs>
                  <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#ff6b35" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-display text-sm tracking-[0.3em] text-soft-white hidden sm:block">
              CHRONICLES
            </span>
          </div>

          {/* Progress Bar (Center) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-champagne-gold/70">
                {String(currentChapter + 1).padStart(2, '0')}
              </span>
              <span className="text-soft-white/30">/</span>
              <span className="font-mono text-xs text-soft-white/50">
                {String(chapters.length).padStart(2, '0')}
              </span>
            </div>
            <div className="w-32 h-[2px] bg-soft-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-champagne-gold via-warm-ember to-dawn-rose transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-soft-white hover:text-champagne-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Chapter Indicators */}
          <nav className="hidden md:flex items-center gap-6">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => onChapterClick(index)}
                className={`relative font-mono text-xs tracking-wider transition-all duration-300 ${
                  currentChapter === index
                    ? 'text-champagne-gold'
                    : 'text-soft-white/40 hover:text-soft-white/70'
                }`}
              >
                {chapter.number}
                {currentChapter === index && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-champagne-gold" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space/80 via-transparent to-transparent pointer-events-none" />
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-deep-space/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => {
                onChapterClick(index);
                setIsMenuOpen(false);
              }}
              className={`group flex flex-col items-center gap-2 transition-all duration-300 ${
                currentChapter === index ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <span className="font-mono text-sm tracking-widest text-champagne-gold">
                {chapter.number}
              </span>
              <span className="font-display text-2xl text-soft-white group-hover:text-champagne-gold transition-colors">
                {chapter.title}
              </span>
              <span className="text-xs text-soft-white/40 font-headline">
                {chapter.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
