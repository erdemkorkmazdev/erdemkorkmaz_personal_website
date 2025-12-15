import { useEffect, useRef } from 'react';

interface GhostCursorProps {
  color?: string;
  trailLength?: number;
  lineWidth?: number;
  className?: string;
}

const GhostCursor = ({
  color = 'hsl(186, 100%, 50%)',
  trailLength = 40,
  lineWidth = 4,
  className = ''
}: GhostCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; age: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    resize();
    window.addEventListener('resize', resize);
    parent.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Add new point
      points.current.push({
        x: mouse.current.x,
        y: mouse.current.y,
        age: 0
      });

      // Update and draw points
      points.current = points.current.filter(point => {
        point.age += 1;
        return point.age < trailLength;
      });

      // Draw trail
      if (points.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);

        for (let i = 1; i < points.current.length; i++) {
          const point = points.current[i];
          const prevPoint = points.current[i - 1];

          // Smooth curve
          const midX = (prevPoint.x + point.x) / 2;
          const midY = (prevPoint.y + point.y) / 2;
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, midX, midY);
        }

        // Draw with gradient
        const gradient = ctx.createLinearGradient(
          points.current[0].x, points.current[0].y,
          points.current[points.current.length - 1].x,
          points.current[points.current.length - 1].y
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.3, color);
        gradient.addColorStop(1, color);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Draw glow layer
        ctx.shadowBlur = 25;
        ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw cursor dot with glow
      if (points.current.length > 0) {
        const lastPoint = points.current[points.current.length - 1];

        // Outer glow
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, lineWidth + 6, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', ', 0.2)').replace('hsl', 'hsla');
        ctx.fill();

        // Main dot
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, lineWidth + 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner bright core
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, lineWidth / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [color, trailLength, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
    />
  );
};

export default GhostCursor;
