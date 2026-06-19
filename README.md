# Chronicles of Light

A cinematic, award-worthy digital storytelling experience exploring humanity's relationship with light — from ancient fire to digital luminescence.

![Chronicles of Light](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.160-white)

## ✨ Features

- **Cinematic Storytelling** - Six immersive chapters that unfold as you scroll
- **Three.js Painted Background** - Custom shader creating flowing brush stroke effects
- **GSAP Animations** - Smooth, professional scroll-triggered reveals
- **Lenis Smooth Scrolling** - Premium momentum-based scrolling experience
- **Dynamic Color Themes** - Each chapter has its own color palette
- **Particle Systems** - Ambient floating particles that respond to your cursor
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Accessibility First** - Skip links, ARIA labels, reduced motion support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sahilnadafexcelligents-glitch/Chronicles-of-Light-Premium-Storytelling-Website-Complete.git

# Navigate to project
cd Chronicles-of-Light-Premium-Storytelling-Website-Complete

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles & animations
├── components/
│   ├── Chapter.tsx         # Individual chapter sections
│   ├── ChapterNav.tsx     # Side navigation dots
│   ├── Header.tsx          # Fixed header with progress
│   ├── LoadingScreen.tsx   # Animated loading screen
│   ├── MouseGlow.tsx       # Cursor-following glow effect
│   ├── ParticleSystem.tsx   # Canvas particle animation
│   ├── ThreeBackground.tsx # Three.js shader background
│   └── VisualElement.tsx   # SVG chapter illustrations
├── lib/
│   ├── gsap.ts             # GSAP animation utilities
│   ├── lenis.ts            # Lenis smooth scroll wrapper
│   ├── three-scene.ts      # Three.js scene setup & shaders
│   └── useReducedMotion.ts # Reduced motion preference hook
└── data/
    └── chapters.ts         # Chapter content & metadata
```

## 🎨 Chapters

| Chapter | Title | Theme |
|---------|-------|-------|
| 01 | The Spark | Fire & Discovery |
| 02 | Civilizations | Architecture & Candlelight |
| 03 | The Forge | Industry & Electricity |
| 04 | Electric Dreams | Neon & Urban Life |
| 05 | Digital Dawn | Screens & Connectivity |
| 06 | Eternal Light | Reflection & Legacy |

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Animations**: [GSAP](https://greensock.com/gsap/) + ScrollTrigger
- **Smooth Scroll**: [Lenis](https://lenis.studio/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## ⚡ Performance

- Optimized fonts via `next/font` (zero layout shift)
- AVIF/WebP image formats
- Dynamic imports for client-only components
- GPU-accelerated animations
- Production console removal
- Bundle size: **~141 KB** First Load JS

## ♿ Accessibility

- Skip-to-content navigation
- Keyboard navigation support
- ARIA labels on all interactive elements
- `prefers-reduced-motion` support
- Semantic HTML structure
- Focus-visible states

## 📊 SEO

- Comprehensive metadata
- Open Graph & Twitter Card support
- Schema.org structured data (JSON-LD)
- Canonical URLs
- Semantic heading hierarchy

## 🎬 Development

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 📝 License

ISC License - See LICENSE file for details.

---

Crafted with passion & told with purpose ✨
