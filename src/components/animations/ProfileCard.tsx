import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  avatarUrl?: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  onContactClick?: () => void;
  className?: string;
}

// Floating code particles
const CodeParticle = ({ delay }: { delay: number }) => {
  const chars = ['{ }', '< />', '( )', '[ ]', '= >', '&&', '||', '++', '::'];
  const char = chars[Math.floor(Math.random() * chars.length)];

  return (
    <motion.div
      className="absolute text-primary/30 font-mono text-sm pointer-events-none select-none"
      initial={{
        x: Math.random() * 100 - 50 + '%',
        y: '100%',
        opacity: 0,
        rotate: Math.random() * 30 - 15
      }}
      animate={{
        y: '-20%',
        opacity: [0, 0.6, 0.6, 0],
        rotate: Math.random() * 60 - 30
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {char}
    </motion.div>
  );
};

const ProfileCard = ({
  avatarUrl,
  name,
  title,
  handle = '',
  status = 'Online',
  onContactClick,
  className = ''
}: ProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const centerX = x - 50;
    const centerY = y - 50;

    setTransform({
      rotateX: -(centerY / 6), // Increased tilt
      rotateY: centerX / 6,
      x,
      y
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <div
      className={`relative perspective-1000 ${className}`}
      style={{
        '--pointer-x': `${transform.x}%`,
        '--pointer-y': `${transform.y}%`,
      } as React.CSSProperties}
    >
      {/* Animated glow behind card */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.05 : 1
        }}
        style={{
          background: `radial-gradient(circle at ${transform.x}% ${transform.y}%, hsl(var(--primary) / 0.5) 0%, hsl(var(--secondary) / 0.3) 50%, transparent 70%)`
        }}
      />

      <motion.div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden glass-card border border-white/20 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        {/* Floating code particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <CodeParticle key={i} delay={i * 0.5} />
          ))}
        </div>

        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.4 : 0.15
          }}
          style={{
            background: `radial-gradient(circle at ${transform.x}% ${transform.y}%, hsl(var(--primary) / 0.4) 0%, transparent 50%)`
          }}
        />

        {/* Border glow animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered
              ? 'inset 0 0 0 2px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3)'
              : 'inset 0 0 0 1px transparent'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

        {/* Content */}
        <div className="relative p-8">
          {/* Avatar */}
          <motion.div
            className="relative mx-auto w-28 h-28 mb-6"
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name} avatar`}
                className="w-full h-full rounded-full object-cover border-2 border-primary/50"
                style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.3)' }}
              />
            ) : (
              <div
                className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.4)' }}
              >
                <span className="text-3xl font-display font-bold text-primary-foreground">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}

            {/* Animated ring around avatar */}
            <motion.div
              className="absolute -inset-1 rounded-full border-2 border-primary/30"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Name and title */}
          <div className="text-center mb-4">
            <motion.h3
              className="text-2xl font-display font-bold"
              animate={{ scale: isHovered ? 1.02 : 1 }}
            >
              {name}
            </motion.h3>
            <p className="text-muted-foreground mt-1">{title}</p>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm rounded-xl p-3 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold">{name[0]}</span>
                )}
              </div>
              <div className="text-left">
                {handle && <span className="text-sm text-muted-foreground block">@{handle}</span>}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">{status}</span>
                </div>
              </div>
            </div>

            {onContactClick && (
              <motion.button
                onClick={onContactClick}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
