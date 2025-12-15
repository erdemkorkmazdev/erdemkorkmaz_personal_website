import { useEffect, useRef } from 'react';

interface OrbBackgroundProps {
  hue?: number;
  className?: string;
  brightness?: number;
  bloomStrength?: number;
}

const OrbBackground = ({
  hue = 186,
  className = '',
  brightness = 2.5,
  bloomStrength = 0.4
}: OrbBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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

      // Create more prominent orb effect
      const orbRadius = size * 0.35;

      // Outer bloom/glow - very large and soft
      const outerBloom = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, orbRadius * 2.5
      );
      outerBloom.addColorStop(0, `hsla(${hue}, 100%, 80%, ${0.4 * bloomStrength})`);
      outerBloom.addColorStop(0.3, `hsla(${hue + 20}, 90%, 60%, ${0.25 * bloomStrength})`);
      outerBloom.addColorStop(0.6, `hsla(${hue + 40}, 80%, 50%, ${0.1 * bloomStrength})`);
      outerBloom.addColorStop(1, 'transparent');

      ctx.fillStyle = outerBloom;
      ctx.fillRect(0, 0, width, height);

      // Animated wobble and pulse
      const wobbleX = Math.sin(time * 1.5) * 15;
      const wobbleY = Math.cos(time * 1.2) * 10;
      const pulse = 1 + Math.sin(time * 2) * 0.08;

      // Core bright center - very bright white/cyan
      const core = ctx.createRadialGradient(
        centerX + wobbleX * 0.5, centerY + wobbleY * 0.5, 0,
        centerX, centerY, orbRadius * 0.5 * pulse
      );
      core.addColorStop(0, `hsla(${hue + 40}, 100%, 98%, ${brightness * 0.4})`);
      core.addColorStop(0.3, `hsla(${hue + 30}, 100%, 90%, ${brightness * 0.35})`);
      core.addColorStop(0.6, `hsla(${hue + 20}, 95%, 80%, ${brightness * 0.25})`);
      core.addColorStop(1, 'transparent');

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 0.6 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Main orb body
      const mainOrb = ctx.createRadialGradient(
        centerX + wobbleX, centerY + wobbleY, 0,
        centerX, centerY, orbRadius * pulse
      );

      mainOrb.addColorStop(0, `hsla(${hue + 50}, 100%, 90%, ${brightness * 0.3})`);
      mainOrb.addColorStop(0.2, `hsla(${hue + 30}, 95%, 75%, ${brightness * 0.25})`);
      mainOrb.addColorStop(0.4, `hsla(${hue + 15}, 90%, 65%, ${brightness * 0.2})`);
      mainOrb.addColorStop(0.6, `hsla(${hue}, 85%, 55%, ${brightness * 0.15})`);
      mainOrb.addColorStop(0.8, `hsla(${hue - 10}, 80%, 45%, ${brightness * 0.08})`);
      mainOrb.addColorStop(1, 'transparent');

      ctx.fillStyle = mainOrb;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 1.3 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Highlight shine - top left
      const highlight = ctx.createRadialGradient(
        centerX - orbRadius * 0.25 + wobbleX * 0.3,
        centerY - orbRadius * 0.25 + wobbleY * 0.3,
        0,
        centerX, centerY, orbRadius * 0.5
      );
      highlight.addColorStop(0, `hsla(${hue + 60}, 100%, 95%, ${brightness * 0.5})`);
      highlight.addColorStop(0.3, `hsla(${hue + 40}, 90%, 85%, ${brightness * 0.25})`);
      highlight.addColorStop(0.6, `hsla(${hue + 20}, 80%, 70%, ${brightness * 0.1})`);
      highlight.addColorStop(1, 'transparent');

      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 0.8 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Secondary moving accent
      const accentAngle = time * 0.8;
      const accentX = centerX + Math.cos(accentAngle) * orbRadius * 0.3;
      const accentY = centerY + Math.sin(accentAngle * 1.3) * orbRadius * 0.25;

      const accent = ctx.createRadialGradient(
        accentX, accentY, 0,
        accentX, accentY, orbRadius * 0.35
      );
      accent.addColorStop(0, `hsla(${hue + 70}, 100%, 85%, ${brightness * 0.35})`);
      accent.addColorStop(0.5, `hsla(${hue + 50}, 90%, 70%, ${brightness * 0.15})`);
      accent.addColorStop(1, 'transparent');

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(accentX, accentY, orbRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 0.85 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue + 40}, 100%, 80%, ${0.15 + Math.sin(time * 3) * 0.05})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      time += 0.015;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [hue, brightness, bloomStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default OrbBackground;
