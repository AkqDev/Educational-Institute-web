import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface AuroraBackgroundProps {
  speed?: number;
  blend?: number;
  colorStops?: [string, string, string];
  amplitude?: number;
  className?: string;
}

const vertexShader = `
  attribute vec2 position;
  varying vec2 vUv;
  
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform float uSpeed;
  uniform float uBlend;
  uniform float uAmplitude;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  
  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x * x0.x  + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    
    float time = uTime * uSpeed;
    
    // Create layered noise
    float n1 = snoise(vec2(uv.x * 3.0 + time * 0.2, uv.y * 2.0 + time * 0.1));
    float n2 = snoise(vec2(uv.x * 5.0 - time * 0.15, uv.y * 3.0 + time * 0.2));
    float n3 = snoise(vec2(uv.x * 7.0 + time * 0.1, uv.y * 4.0 - time * 0.25));
    
    float combined = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * uAmplitude;
    
    // Create vertical gradient with noise
    float gradient = uv.y * 0.7 + 0.3;
    float distorted = gradient + combined * 0.4;
    
    // Create color bands
    float band1 = smoothstep(0.2, 0.4, distorted);
    float band2 = smoothstep(0.4, 0.6, distorted);
    float band3 = smoothstep(0.6, 0.8, distorted);
    
    // Mix colors
    vec3 color = mix(uColor1, uColor2, band1);
    color = mix(color, uColor3, band2);
    
    // Add some texture
    float textureNoise = snoise(vec2(uv.x * 10.0, uv.y * 10.0 + time * 0.3)) * 0.1;
    color += textureNoise;
    
    // Calculate alpha
    float alpha = (band1 + band2 + band3) * 0.4 * uBlend;
    alpha *= 0.8 + 0.2 * sin(time * 2.0);
    
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return [r, g, b];
};

export default function AuroraBackground({
  speed = 0.7,
  blend = 1,
  colorStops = ['#0D76BC', '#1E90FF', '#00CED1'],
  amplitude = 1.0,
  className = ''
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number>(0);
  const rendererRef = useRef<Renderer | null>(null);
  const programRef = useRef<Program | null>(null);
  
  const propsRef = useRef({ speed, blend, amplitude, colorStops });

  useEffect(() => {
    propsRef.current = { speed, blend, amplitude, colorStops };
  }, [speed, blend, amplitude, colorStops]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create renderer with proper alpha settings
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      depth: false,
      stencil: false
    });
    
    rendererRef.current = renderer;
    
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    // Style canvas
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    
    // Ensure canvas has proper dimensions
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    container.appendChild(canvas);

    // Convert colors
    const rgbColors = colorStops.map(hexToRgb) as [[number, number, number], [number, number, number], [number, number, number]];

    // Create geometry (fullscreen triangle)
    const geometry = new Triangle(gl);

    // Create program
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uBlend: { value: blend },
        uAmplitude: { value: amplitude },
        uColor1: { value: rgbColors[0] },
        uColor2: { value: rgbColors[1] },
        uColor3: { value: rgbColors[2] },
        uResolution: { value: [canvas.width, canvas.height] },
      },
      transparent: true,
    });
    
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
      
      // Force a repaint
      gl.viewport(0, 0, width, height);
    };

    // Animation loop
    let time = 0;
    const animate = (timestamp: number) => {
      animationId.current = requestAnimationFrame(animate);
      
      if (!program || !renderer) return;
      
      time = timestamp * 0.001; // Convert to seconds
      program.uniforms.uTime.value = time;
      
      // Update from current props
      const currentProps = propsRef.current;
      program.uniforms.uSpeed.value = currentProps.speed;
      program.uniforms.uBlend.value = currentProps.blend;
      program.uniforms.uAmplitude.value = currentProps.amplitude;
      
      const currentColors = currentProps.colorStops.map(hexToRgb) as [[number, number, number], [number, number, number], [number, number, number]];
      program.uniforms.uColor1.value = currentColors[0];
      program.uniforms.uColor2.value = currentColors[1];
      program.uniforms.uColor3.value = currentColors[2];
      
      // Clear and render
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.render({ scene: mesh });
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Start animation after a short delay to ensure everything is ready
    setTimeout(() => {
      animationId.current = requestAnimationFrame(animate);
    }, 100);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener('resize', handleResize);
      
      if (container && canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      
      if (renderer) {
        const gl = renderer.gl;
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      }
      
      rendererRef.current = null;
      programRef.current = null;
    };
  }, []); // Empty dependency array - only run once

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{
        background: 'transparent',
        zIndex: 0
      }}
    />
  );
}