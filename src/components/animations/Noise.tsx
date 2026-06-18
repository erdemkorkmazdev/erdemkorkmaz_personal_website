import { useEffect, useRef } from 'react';

interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
  mixBlendMode?: string;
  className?: string;
}

const Noise = ({
  patternRefreshInterval = 2,
  patternAlpha = 15,
  mixBlendMode = 'overlay',
  className = ''
}: NoiseProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef(0);
  const frameRef = useRef(0);
  const noiseDataRef = useRef<ImageData | null>(null);
  const noise32Ref = useRef<Uint32Array | null>(null);
  const canvasSize = 256;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
    };

    const initImageData = () => {
      noiseDataRef.current = ctx.createImageData(canvasSize, canvasSize);
      noise32Ref.current = new Uint32Array(noiseDataRef.current.data.buffer);
    };

    const drawGrain = () => {
      if (!noise32Ref.current) return;
      const a = patternAlpha << 24;
      for (let i = 0; i < noise32Ref.current.length; i++) {
        const v = (Math.random() * 255) | 0;
        noise32Ref.current[i] = a | (v << 16) | (v << 8) | v;
      }
    };

    const isVisibleRef = { current: true };

    const loop = () => {
      if (!isVisibleRef.current) return;
      if (frameRef.current % Math.max(1, Math.round(patternRefreshInterval)) === 0) {
        drawGrain();
        if (noiseDataRef.current) {
          ctx.putImageData(noiseDataRef.current, 0, 0);
        }
      }
      frameRef.current++;
      animationIdRef.current = requestAnimationFrame(loop);
    };

    const visObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          animationIdRef.current = requestAnimationFrame(loop);
        }
      },
      { rootMargin: '50px' }
    );
    visObserver.observe(canvas);

    resize();
    initImageData();
    drawGrain();
    if (noiseDataRef.current) {
      ctx.putImageData(noiseDataRef.current, 0, 0);
    }
    loop();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      visObserver.disconnect();
    };
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ 
        imageRendering: 'pixelated', 
        mixBlendMode: mixBlendMode as any,
        opacity: 0.4
      }}
    />
  );
};

export default Noise;
