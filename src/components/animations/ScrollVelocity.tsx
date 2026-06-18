import { useRef, useEffect } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollXRef = useRef<number[]>(texts.map(() => 0));
  const velocityRef = useRef(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number;
    const isVisibleRef = { current: true };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      velocityRef.current = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    const animate = () => {
      if (!isVisibleRef.current) return;

      scrollXRef.current = scrollXRef.current.map((x, i) => {
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
      });

      // Direct DOM update — no React state, no re-renders
      scrollerRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translateX(${scrollXRef.current[i]}px)`;
      });

      velocityRef.current *= 0.95; // Decay velocity
      rafId = requestAnimationFrame(animate);
    };

    // Pause when off-screen
    let visObserver: IntersectionObserver | null = null;
    if (sectionRef.current) {
      visObserver = new IntersectionObserver(
        ([entry]) => {
          const wasVisible = isVisibleRef.current;
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !wasVisible) {
            rafId = requestAnimationFrame(animate);
          }
        },
        { rootMargin: '100px' }
      );
      visObserver.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      visObserver?.disconnect();
    };
  }, [velocity, texts.length]);

  return (
    <section ref={sectionRef} className={containerClassName}>
      {texts.map((text, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
        >
          <div
            ref={el => scrollerRefs.current[index] = el}
            className={`flex whitespace-nowrap font-display font-bold ${className}`}
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
