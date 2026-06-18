'use client';

import { useEffect, useRef, useState } from 'react';
import { PaintedBackground } from '@/lib/three-scene';

interface ThreeBackgroundProps {
  gradientStart: string;
  gradientEnd: string;
  isActive: boolean;
}

export default function ThreeBackground({ gradientStart, gradientEnd, isActive }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const paintedBgRef = useRef<PaintedBackground | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Initialize Three.js scene
    const paintedBg = new PaintedBackground({
      container: canvasRef.current,
    });

    paintedBgRef.current = paintedBg;

    // Start animation after a short delay
    const timer = setTimeout(() => {
      paintedBg.start();
      setIsReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      paintedBg.destroy();
      paintedBgRef.current = null;
    };
  }, []);

  // Update colors when chapter changes
  useEffect(() => {
    if (paintedBgRef.current && isReady) {
      paintedBgRef.current.setColors(gradientStart, gradientEnd, 1.5);
    }
  }, [gradientStart, gradientEnd, isReady]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Three.js Canvas */}
      <div ref={canvasRef} className="absolute inset-0" />

      {/* Additional overlay layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space/40 via-transparent to-deep-space/30" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}
