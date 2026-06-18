import { useEffect, useRef } from 'react';

interface GradientTextProps {
  text: string;
  className?: string;
  animationSpeed?: number;
  showBorder?: boolean;
  gradient?: string;
}

const GradientText = ({
  text,
  className = '',
  animationSpeed = 3,
  showBorder = false,
  gradient
}: GradientTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    textElement.style.backgroundSize = '200%';
    textElement.style.backgroundClip = 'text';
    textElement.style.webkitBackgroundClip = 'text';
    textElement.style.color = 'transparent';
    textElement.style.backgroundImage = gradient ||
      'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))';
    textElement.style.animation = `gradientTextShift ${animationSpeed}s ease infinite`;
  }, [animationSpeed, gradient]);

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      style={{
        ...(showBorder && {
          WebkitTextStroke: '1px rgba(255,255,255,0.1)',
        })
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
