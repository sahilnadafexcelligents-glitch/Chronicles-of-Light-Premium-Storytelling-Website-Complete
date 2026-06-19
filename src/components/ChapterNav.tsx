'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { chapters } from '@/data/chapters';

interface ChapterNavProps {
  currentChapter: number;
  onChapterClick: (index: number) => void;
}

export default function ChapterNav({ currentChapter, onChapterClick }: ChapterNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show nav after loading
    const timer = setTimeout(() => {
      setIsVisible(true);
      gsap.fromTo('.chapter-nav-dot',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, delay: 3.5, ease: 'back.out(1.7)' }
      );
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };

  const handleTouchStart = (index: number) => {
    setHoveredIndex(index);
  };

  const handleTouchEnd = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 1500);
  };

  return (
    <nav
      className={`fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      aria-label="Chapter navigation"
    >
      <div className="flex flex-col items-center gap-4">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="relative">
            {/* Tooltip */}
            <div
              className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ${
                hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-end gap-0.5">
                <span className="font-mono text-xs text-champagne-gold/80">
                  {chapter.number}
                </span>
                <span className="font-display text-sm text-soft-white">
                  {chapter.title}
                </span>
              </div>
            </div>

            {/* Dot */}
            <button
              onClick={() => onChapterClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => setHoveredIndex(index)}
              onBlur={handleMouseLeave}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              className={`chapter-nav-dot relative w-3 h-3 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space ${
                currentChapter === index
                  ? 'w-4 h-4 bg-champagne-gold shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                  : 'bg-soft-white/30 hover:bg-soft-white/60 hover:scale-125'
              }`}
              aria-label={`Go to ${chapter.title}`}
              aria-current={currentChapter === index ? 'step' : undefined}
            >
              {/* Pulse animation for active chapter */}
              {currentChapter === index && (
                <>
                  <span className="absolute inset-0 rounded-full bg-champagne-gold animate-ping opacity-20" aria-hidden="true" />
                  <span className="absolute inset-[-4px] rounded-full border border-champagne-gold/30 animate-pulse" aria-hidden="true" />
                </>
              )}
            </button>

            {/* Line connector */}
            {index < chapters.length - 1 && (
              <div
                className={`absolute left-1/2 top-full w-[1px] transition-all duration-500 ${
                  currentChapter > index
                    ? 'h-8 bg-gradient-to-b from-champagne-gold/50 to-soft-white/20'
                    : 'h-4 bg-soft-white/10'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      {/* Current chapter info */}
      <div
        className={`mt-6 text-center transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="font-mono text-xs text-soft-white/40" aria-live="polite">
          {currentChapter + 1} / {chapters.length}
        </span>
      </div>
    </nav>
  );
}
