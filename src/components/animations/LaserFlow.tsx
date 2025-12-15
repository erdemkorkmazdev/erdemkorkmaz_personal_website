import { useRef, useEffect } from 'react';

interface LaserFlowProps {
    color?: string;
    beamCount?: number;
    beamWidth?: number;
    speed?: number;
    className?: string;
    reverse?: boolean;
}

const LaserFlow = ({
    color = 'hsl(186, 100%, 50%)',
    beamCount = 6,
    beamWidth = 2,
    speed = 3,
    className = '',
    reverse = false
}: LaserFlowProps) => {
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

        interface Beam {
            x: number;
            y: number;
            length: number;
            speed: number;
            opacity: number;
        }

        const beams: Beam[] = [];

        const initBeams = () => {
            const rect = canvas.getBoundingClientRect();
            beams.length = 0;
            for (let i = 0; i < beamCount; i++) {
                beams.push({
                    x: reverse ? rect.width + Math.random() * 200 : -Math.random() * 200,
                    y: (rect.height / (beamCount + 1)) * (i + 1) + (Math.random() - 0.5) * 20,
                    length: 80 + Math.random() * 120,
                    speed: (speed + Math.random() * 2) * (reverse ? -1 : 1),
                    opacity: 0.3 + Math.random() * 0.7
                });
            }
        };

        initBeams();

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            beams.forEach((beam) => {
                // Update position
                beam.x += beam.speed;

                // Reset when off screen
                if (!reverse && beam.x > rect.width + beam.length) {
                    beam.x = -beam.length;
                    beam.y = Math.random() * rect.height;
                    beam.opacity = 0.3 + Math.random() * 0.7;
                } else if (reverse && beam.x < -beam.length) {
                    beam.x = rect.width + beam.length;
                    beam.y = Math.random() * rect.height;
                    beam.opacity = 0.3 + Math.random() * 0.7;
                }

                // Draw beam with gradient
                const gradient = ctx.createLinearGradient(
                    beam.x - beam.length, beam.y,
                    beam.x, beam.y
                );

                if (reverse) {
                    gradient.addColorStop(0, color);
                    gradient.addColorStop(1, 'transparent');
                } else {
                    gradient.addColorStop(0, 'transparent');
                    gradient.addColorStop(1, color);
                }

                ctx.beginPath();
                ctx.moveTo(beam.x - beam.length, beam.y);
                ctx.lineTo(beam.x, beam.y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = beamWidth;
                ctx.lineCap = 'round';
                ctx.globalAlpha = beam.opacity;
                ctx.stroke();

                // Glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;

                // Head glow
                ctx.beginPath();
                ctx.arc(beam.x, beam.y, beamWidth + 1, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = beam.opacity * 0.8;
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            });

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [color, beamCount, beamWidth, speed, reverse]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
};

export default LaserFlow;
