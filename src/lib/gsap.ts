'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easing curves
export const EASE = {
  elegant: 'power3.out',
  smooth: 'power2.inOut',
  dramatic: 'expo.out',
  bounce: 'elastic.out(1, 0.5)',
  snap: 'power4.out',
};

// Animation presets
export const animate = {
  fadeIn: (element: gsap.TweenTarget, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: EASE.elegant, ...options }
    );
  },

  slideUp: (element: gsap.TweenTarget, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.elegant, ...options }
    );
  },

  slideIn: (element: gsap.TweenTarget, direction: 'left' | 'right' = 'left', options: gsap.TweenVars = {}) => {
    const x = direction === 'left' ? -100 : 100;
    return gsap.fromTo(
      element,
      { x, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: EASE.elegant, ...options }
    );
  },

  scaleIn: (element: gsap.TweenTarget, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: EASE.elegant, ...options }
    );
  },

  revealText: (element: gsap.TweenTarget, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { 'clip-path': 'inset(0 100% 0 0)', opacity: 1 },
      { 'clip-path': 'inset(0 0 0 0)', duration: 1.2, ease: EASE.elegant, ...options }
    );
  },

  staggerReveal: (elements: gsap.TweenTarget, stagger: number = 0.1, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      elements,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger, ease: EASE.elegant, ...options }
    );
  },

  rotateIn: (element: gsap.TweenTarget, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { rotation: -10, scale: 0.9, opacity: 0 },
      { rotation: 0, scale: 1, opacity: 1, duration: 1, ease: EASE.elegant, ...options }
    );
  },
};

// ScrollTrigger presets
export const scrollTriggerHelper = {
  createPinnedSection: (
    trigger: Element | string,
    options: ScrollTrigger.Vars = {}
  ) => {
    return ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
      ...options,
    });
  },

  createFadeOnScroll: (
    element: Element | string,
    options: ScrollTrigger.Vars = {}
  ) => {
    return ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => animate.fadeIn(element),
      onLeaveBack: () => gsap.to(element, { opacity: 0, duration: 0.5 }),
      ...options,
    });
  },

  createSlideOnScroll: (
    element: Element | string,
    options: ScrollTrigger.Vars = {}
  ) => {
    return ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => animate.slideUp(element),
      onLeaveBack: () => gsap.to(element, { y: 60, opacity: 0, duration: 0.5 }),
      ...options,
    });
  },

  createRevealOnScroll: (
    element: Element | string,
    options: ScrollTrigger.Vars = {}
  ) => {
    return ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => animate.revealText(element),
      ...options,
    });
  },
};

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh ScrollTrigger
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export default gsap;
