'use client';

import * as THREE from 'three';
import { gsap } from 'gsap';

// Painted texture shader
const paintedVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const paintedFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTransition;
  uniform float uMouseInfluence;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for(int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }
  
  // Brush stroke effect
  float brushStroke(vec2 p, float time) {
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0)),
                  fbm(p + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2) + 0.15*time),
                  fbm(p + 4.0*q + vec2(8.3, 2.8) + 0.126*time));
    return fbm(p + 4.0*r);
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse / uResolution;
    
    // Create flowing painted effect
    float time = uTime * 0.1;
    
    // Distance from mouse for interaction
    float mouseDist = distance(uv, mouse);
    float mouseEffect = smoothstep(0.5, 0.0, mouseDist) * uMouseInfluence;
    
    // Multiple layers of noise for painted texture
    float brush1 = brushStroke(uv * 3.0, time);
    float brush2 = brushStroke(uv * 5.0 + vec2(10.0), time * 0.7);
    float brush3 = brushStroke(uv * 8.0 + vec2(20.0), time * 0.5);
    
    // Combine brush strokes
    float painted = brush1 * 0.5 + brush2 * 0.3 + brush3 * 0.2;
    
    // Mouse influence on the painted texture
    painted += mouseEffect * 0.3;
    
    // Create color gradient between two colors
    vec3 color = mix(uColor1, uColor2, painted * 0.5 + 0.5);
    
    // Add subtle highlights
    float highlight = smoothstep(0.4, 0.6, painted) * 0.1;
    color += highlight;
    
    // Vignette effect
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.2);
    color *= vignette * 0.3 + 0.7;
    
    // Mouse glow
    float glow = smoothstep(0.4, 0.0, mouseDist) * 0.15;
    color += glow * uColor2;
    
    // Subtle grain
    float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233) + time)) * 43758.5453) - 0.5) * 0.03;
    color += grain;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface ThreeSceneConfig {
  container: HTMLElement;
  onProgress?: (progress: number) => void;
}

export class PaintedBackground {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private animationId: number = 0;
  private mouse: THREE.Vector2 = new THREE.Vector2(0.5, 0.5);
  private targetMouse: THREE.Vector2 = new THREE.Vector2(0.5, 0.5);
  private startTime: number;
  private isRunning: boolean = false;

  // Color transitions
  private currentColors = {
    color1: new THREE.Color('#0a0a0f'),
    color2: new THREE.Color('#1a0a0a'),
  };

  private targetColors = {
    color1: new THREE.Color('#0a0a0f'),
    color2: new THREE.Color('#1a0a0a'),
  };

  constructor(config: ThreeSceneConfig) {
    this.startTime = Date.now();

    // Scene setup
    this.scene = new THREE.Scene();

    // Orthographic camera for 2D rendering
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.z = 1;

    // Renderer setup with error handling
    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      config.container.appendChild(this.renderer.domElement);
    } catch (error) {
      console.warn('WebGL not available, using CSS fallback');
      // Create a fallback div instead
      const fallback = document.createElement('div');
      fallback.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, #0a0a0f 0%, #1a0a0a 100%);
      `;
      config.container.appendChild(fallback);
      // Create a dummy renderer that does nothing
      this.renderer = {
        domElement: fallback,
        render: () => {},
        setSize: () => {},
        dispose: () => {},
      } as unknown as THREE.WebGLRenderer;
    }

    // Shader material
    this.material = new THREE.ShaderMaterial({
      vertexShader: paintedVertexShader,
      fragmentShader: paintedFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor1: { value: this.currentColors.color1 },
        uColor2: { value: this.currentColors.color2 },
        uTransition: { value: 0 },
        uMouseInfluence: { value: 1.0 },
      },
    });

    // Full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Event listeners
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.targetMouse.x = event.clientX;
    this.targetMouse.y = window.innerHeight - event.clientY;
  };

  private handleResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  };

  public setColors(gradientStart: string, gradientEnd: string, transitionDuration: number = 1.5) {
    this.targetColors.color1.set(gradientStart);
    this.targetColors.color2.set(gradientEnd);

    // Animate color transition
    gsap.to(this.currentColors.color1, {
      r: this.targetColors.color1.r,
      g: this.targetColors.color1.g,
      b: this.targetColors.color1.b,
      duration: transitionDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.material.uniforms.uColor1.value.copy(this.currentColors.color1);
      },
    });

    gsap.to(this.currentColors.color2, {
      r: this.targetColors.color2.r,
      g: this.targetColors.color2.g,
      b: this.targetColors.color2.b,
      duration: transitionDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.material.uniforms.uColor2.value.copy(this.currentColors.color2);
      },
    });
  }

  public setMouseInfluence(influence: number) {
    gsap.to(this.material.uniforms.uMouseInfluence, {
      value: influence,
      duration: 0.5,
    });
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  public stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private animate = () => {
    if (!this.isRunning) return;

    // Skip WebGL rendering if using fallback
    if (!this.renderer.domElement.tagName) {
      this.animationId = requestAnimationFrame(this.animate);
      return;
    }

    // Smooth mouse following
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Update uniforms
    this.material.uniforms.uTime.value = (Date.now() - this.startTime) * 0.001;
    this.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);

    // Render
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (e) {
      // WebGL context lost or other error
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    this.stop();
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
    this.renderer.dispose();
    this.material.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

export default PaintedBackground;
