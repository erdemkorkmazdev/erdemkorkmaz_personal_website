import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagicBentoCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  spotlightRadius?: number;
  enableTilt?: boolean;
  enableSpotlight?: boolean;
}

const MagicBentoCard = ({
  title,
  description,
  children,
  className = '',
  spotlightRadius = 400,
  enableTilt = true,
  enableSpotlight = true
}: MagicBentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });

    if (enableTilt) {
      const centerX = ((x / rect.width) - 0.5) * 2;
      const centerY = ((y / rect.height) - 0.5) * 2;
      setTransform({
        rotateX: -centerY * 5,
        rotateY: centerX * 5
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl glass border border-border/50 transition-all duration-300 ${className}`}
      style={{
        transform: enableTilt 
          ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
          : undefined,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight effect */}
      {enableSpotlight && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.15), transparent 40%)`
          }}
        />
      )}

      {/* Star particles effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/60"
              initial={{
                x: mousePos.x,
                y: mousePos.y,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: mousePos.x + (Math.random() - 0.5) * 100,
                y: mousePos.y + (Math.random() - 0.5) * 100,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          ))}
        </div>
      )}

      {/* Border glow */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px hsl(var(--primary) / 0.3)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {children ? (
          children
        ) : (
          <>
            <h3 className="text-lg font-display font-semibold mb-2">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MagicBentoCard;
