import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  containerClassName?: string;
}

const ScrollVelocity = ({
  texts,
  velocity = 100,
  className = '',
  containerClassName = ''
}: ScrollVelocityProps) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollX, setScrollX] = useState<number[]>(texts.map(() => 0));
  const velocityRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      velocityRef.current = delta;
      directionRef.current = delta > 0 ? 1 : -1;
      lastScrollY = currentScrollY;
    };

    const animate = () => {
      setScrollX(prev => prev.map((x, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        const speed = velocity * 0.01;
        const scrollEffect = velocityRef.current * 0.5 * direction;
        let newX = x - (speed * direction) - scrollEffect;
        
        // Reset position for infinite scroll effect
        const resetPoint = -2000;
        if (Math.abs(newX) > Math.abs(resetPoint)) {
          newX = 0;
        }
        
        return newX;
      }));
      
      velocityRef.current *= 0.95; // Decay velocity
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [velocity, texts.length]);

  return (
    <section className={containerClassName}>
      {texts.map((text, index) => (
        <div
          key={index}
          ref={el => containerRefs.current[index] = el}
          className="relative overflow-hidden"
        >
          <div
            ref={el => scrollerRefs.current[index] = el}
            className={`flex whitespace-nowrap font-display font-bold ${className}`}
            style={{ transform: `translateX(${scrollX[index]}px)` }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="flex-shrink-0 mx-4">
                {text}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ScrollVelocity;
