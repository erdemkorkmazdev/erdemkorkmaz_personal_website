import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GhostCursorProps {
  color?: string;
  size?: number;
  intensity?: number;
}

const GhostCursor = ({
  color = '#ff0443ff',
  size = 0.58,
  intensity = 0.02
}: GhostCursorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Fullscreen quad with glow shader
    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform vec3 uColor;
      uniform float uSize;
      uniform float uIntensity;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        // Aspect ratio correction
        vec2 ratio = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 normalizedMouse = uMouse * ratio;
        vec2 normalizedUv = uv * ratio;
        
        vec2 d = normalizedUv - normalizedMouse;
        float dist = length(d);
        
        // Soft glow effect
        float glow = uIntensity / (dist + 0.01);
        
        // Soft Falloff
        float alpha = smoothstep(uSize, 0.0, dist);
        
        vec3 col = uColor * glow;
        
        gl_FragColor = vec4(col, alpha * glow * 0.5);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor: { value: new THREE.Color(color) },
        uSize: { value: size },
        uIntensity: { value: intensity }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse position - directly set, no smoothing
    const mouse = new THREE.Vector2(0.5, 0.5);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to 0..1, instant update
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      material.uniforms.uTime.value = time * 0.001;
      // Direct mouse position - no interpolation/delay
      material.uniforms.uMouse.value.copy(mouse);

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [color, size, intensity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default GhostCursor;
