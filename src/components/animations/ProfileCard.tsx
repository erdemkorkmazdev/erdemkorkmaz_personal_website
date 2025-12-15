import { useRef, useEffect, useState } from 'react';

interface ProfileCardProps {
  avatarUrl?: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  onContactClick?: () => void;
  className?: string;
}

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const centerX = x - 50;
    const centerY = y - 50;
    
    setTransform({
      rotateX: -(centerY / 10),
      rotateY: centerX / 10,
      x,
      y
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, x: 50, y: 50 });
  };

  return (
    <div 
      ref={wrapRef}
      className={`relative perspective-1000 ${className}`}
      style={{
        '--pointer-x': `${transform.x}%`,
        '--pointer-y': `${transform.y}%`,
      } as React.CSSProperties}
    >
      {/* Behind gradient glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-60 blur-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${transform.x}% ${transform.y}%, hsl(var(--primary) / 0.4) 0%, hsl(var(--secondary) / 0.2) 50%, transparent 70%)`
        }}
      />
      
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden glass-strong border border-border/50 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shine effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at ${transform.x}% ${transform.y}%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`
          }}
        />

        {/* Content */}
        <div className="relative p-8">
          {/* Avatar */}
          <div className="relative mx-auto w-28 h-28 mb-6">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name} avatar`}
                className="w-full h-full rounded-full object-cover border-2 border-primary/30"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-primary-foreground">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            
            {/* Status indicator */}
            <div className="absolute bottom-1 right-1 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/90 backdrop-blur-sm border border-border text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">{status}</span>
            </div>
          </div>

          {/* User info */}
          {handle && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold">{name[0]}</span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">@{handle}</span>
            </div>
          )}

          {/* Name and title */}
          <div className="text-center">
            <h3 className="text-xl font-display font-semibold mb-1">{name}</h3>
            <p className="text-muted-foreground">{title}</p>
          </div>

          {/* Contact button */}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="w-full mt-6 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Me
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
