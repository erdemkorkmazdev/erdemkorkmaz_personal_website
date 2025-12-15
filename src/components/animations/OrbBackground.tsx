import { useEffect, useRef, useState } from 'react';

interface OrbBackgroundProps {
  hue?: number;
  className?: string;
}

const OrbBackground = ({ hue = 200, className = '' }: OrbBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const size = Math.min(width, height);

      ctx.clearRect(0, 0, width, height);

      // Create multiple layered gradients for orb effect
      const orbRadius = size * 0.4;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, orbRadius * 1.5
      );
      outerGlow.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.3)`);
      outerGlow.addColorStop(0.5, `hsla(${hue + 40}, 80%, 50%, 0.15)`);
      outerGlow.addColorStop(1, 'transparent');
      
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, width, height);

      // Animated inner orb
      const wobble = Math.sin(time * 2) * 10;
      const pulse = 1 + Math.sin(time * 3) * 0.05;

      // Main orb gradient
      const gradient = ctx.createRadialGradient(
        centerX + wobble, centerY - wobble * 0.5, 0,
        centerX, centerY, orbRadius * pulse
      );
      
      gradient.addColorStop(0, `hsla(${hue + 60}, 100%, 85%, 0.9)`);
      gradient.addColorStop(0.3, `hsla(${hue + 30}, 90%, 65%, 0.7)`);
      gradient.addColorStop(0.6, `hsla(${hue}, 80%, 55%, 0.5)`);
      gradient.addColorStop(0.8, `hsla(${hue - 20}, 70%, 40%, 0.3)`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * pulse * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Secondary highlight
      const highlight = ctx.createRadialGradient(
        centerX - orbRadius * 0.3, centerY - orbRadius * 0.3, 0,
        centerX, centerY, orbRadius * 0.6
      );
      highlight.addColorStop(0, `hsla(${hue + 60}, 100%, 90%, 0.6)`);
      highlight.addColorStop(0.5, `hsla(${hue + 40}, 80%, 70%, 0.2)`);
      highlight.addColorStop(1, 'transparent');

      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Moving accent
      const accentX = centerX + Math.cos(time) * orbRadius * 0.4;
      const accentY = centerY + Math.sin(time * 1.3) * orbRadius * 0.3;
      
      const accent = ctx.createRadialGradient(
        accentX, accentY, 0,
        accentX, accentY, orbRadius * 0.4
      );
      accent.addColorStop(0, `hsla(${hue + 80}, 100%, 80%, 0.4)`);
      accent.addColorStop(1, 'transparent');

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(accentX, accentY, orbRadius * 0.5, 0, Math.PI * 2);
      ctx.fill();

      time += 0.01;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [hue]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mousePos.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        };
      }}
    />
  );
};

export default OrbBackground;
