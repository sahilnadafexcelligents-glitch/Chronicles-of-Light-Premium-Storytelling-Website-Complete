'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export const initLenis = (): Lenis => {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const getLenis = (): Lenis | null => {
  return lenisInstance;
};

export const destroyLenis = (): void => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

export const scrollTo = (target: string | number | HTMLElement, options?: {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  easing?: (t: number) => number;
}): Promise<void> => {
  return new Promise((resolve) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        ...options,
        onComplete: () => resolve(),
      });
    } else {
      resolve();
    }
  });
};

export const stopLenis = (): void => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const startLenis = (): void => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

export default lenisInstance;
