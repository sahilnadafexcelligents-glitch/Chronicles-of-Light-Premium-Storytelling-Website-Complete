export interface Chapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  narrative: string;
  accentColor: string;
  gradientStart: string;
  gradientEnd: string;
  glowColor: string;
  visualType: 'flame' | 'architecture' | 'forge' | 'neon' | 'digital' | 'ethereal';
}

export const chapters: Chapter[] = [
  {
    id: 1,
    number: '01',
    title: 'The Spark',
    subtitle: 'In the Beginning, There Was Darkness',
    narrative: "Before the first flame danced in human hands, our ancestors feared the night. For millions of years, darkness was absolute — a canvas of stars too distant to touch. Then, somewhere between instinct and imagination, came fire.",
    accentColor: '#ff6b35',
    gradientStart: '#0a0a0f',
    gradientEnd: '#1a0a0a',
    glowColor: 'glow-ember',
    visualType: 'flame',
  },
  {
    id: 2,
    number: '02',
    title: 'Civilizations',
    subtitle: 'Light Shaped Civilization',
    narrative: "From candlelit manuscripts to torchlit pathways, light became civilization's most precious resource. Great cities rose where oil lamps burned. Empires were built on the promise of illumination — a world where night became productive, and dreams could be read by candlelight.",
    accentColor: '#d4af37',
    gradientStart: '#1a0a0a',
    gradientEnd: '#0a1a0a',
    glowColor: 'glow-gold',
    visualType: 'architecture',
  },
  {
    id: 3,
    number: '03',
    title: 'The Forge',
    subtitle: "Industry's Fierce Embrace",
    narrative: "The Industrial Revolution transformed light itself. Coal smoke darkened skies as gas lamps lit new cities. Electric arcs sparked a transformation that would change everything — for the first time, humanity controlled the very fabric of day and night.",
    accentColor: '#00d4ff',
    gradientStart: '#0a1a0a',
    gradientEnd: '#0a0a1a',
    glowColor: 'glow-cyan',
    visualType: 'forge',
  },
  {
    id: 4,
    number: '04',
    title: 'Electric Dreams',
    subtitle: 'A Thousand Points of Light',
    narrative: "The grid stretched across continents. Bulbs bloomed in every window. Night became a canvas for neon poetry. A city never truly slept again — electric light had rewritten humanity's relationship with darkness, transforming cities into constellations of human ambition.",
    accentColor: '#8b5cf6',
    gradientStart: '#0a0a1a',
    gradientEnd: '#1a1a2a',
    glowColor: 'glow-violet',
    visualType: 'neon',
  },
  {
    id: 5,
    number: '05',
    title: 'Digital Dawn',
    subtitle: 'The New Illumination',
    narrative: "Screens became windows to infinite worlds. Light pixels painted dreams on glass. We carry suns in our pockets now — glowing rectangles that connect billions of minds across the void. The digital age has given us a new kind of illumination: knowledge at the speed of light.",
    accentColor: '#f472b6',
    gradientStart: '#1a1a2a',
    gradientEnd: '#2a1a3a',
    glowColor: 'glow-rose',
    visualType: 'digital',
  },
  {
    id: 6,
    number: '06',
    title: 'Eternal Light',
    subtitle: 'The Light Within',
    narrative: "From fire to fiber optics, from torch to tablet, we have always been creatures of light. Not the light we see with our eyes, but the light we create with our dreams. As long as there are dreamers, there will be illumination. The light never goes out. It transforms. It continues. It lives on in us.",
    accentColor: '#f8f8fc',
    gradientStart: '#2a1a3a',
    gradientEnd: '#0a0a0f',
    glowColor: 'glow-gold',
    visualType: 'ethereal',
  },
];

export const getChapterColor = (index: number): string => {
  return chapters[index]?.accentColor || chapters[0].accentColor;
};
