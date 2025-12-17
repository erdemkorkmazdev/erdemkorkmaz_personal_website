import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import LaserFlow from './LaserFlow';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  onContactClick?: () => void;
}

const ProfileCard = ({ name, title, handle, status, onContactClick }: ProfileCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Calculate rotation based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000">
      {/* LaserFlow Decoration - Below Card */}
      <div className="absolute top-[73%] left-1/2 -translate-x-1/2 w-[170%] h-[300px] z-[-1] pointer-events-none opacity-50">
        <LaserFlow
          color="#ff0443"
          horizontalBeamOffset={0.5}
          verticalBeamOffset={0}
          wispDensity={1.5}
        />
      </div>

      {/* Behind Gradient (Ambient Glow) */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/10 blur-[80px] opacity-40 rounded-full pointer-events-none"
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full aspect-[3/4] rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden group"
      >
        {/* Shine/Glare Effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: `radial-gradient(
              circle at ${50 + x.get() * 100}% ${50 + y.get() * 100}%,
              rgba(255,255,255,0.15) 0%,
              transparent 60%
            )`
          }}
        />

        {/* Grain Texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Image / Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10">

          {/* Top Bar: Status */}
          <div className="w-full flex justify-between items-start">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-white/90">{status}</span>
            </div>
            {/* 3D Floating Icon/Logo placeholder */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
              <span className="font-display font-bold text-lg">EK</span>
            </div>
          </div>

          {/* Center: Avatar (Placeholder for person.png) */}
          <div className="relative w-48 h-48 my-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-2xl" />
            <img
              src="https://github.com/shadcn.png"
              alt={name}
              className="w-full h-full object-cover rounded-full border-2 border-white/10 relative z-10 shadow-2xl"
              draggable={false}
            />
          </div>

          {/* Bottom: Info */}
          <div className="w-full space-y-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-2 px-2 -mx-2 -mb-2 rounded-b-[2rem]">
            <div className="text-center">
              <h3 className="text-2xl font-display font-bold text-white mb-1">{name}</h3>
              <p className="text-white/60 text-sm font-medium mb-2">@{handle}</p>
              <p className="text-primary font-medium text-sm">{title}</p>
            </div>

            <Button
              onClick={onContactClick}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
