import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items: DockItem[];
  className?: string;
  magnification?: number;
  baseItemSize?: number;
}

const DockIcon = ({
  item,
  mouseX,
  baseItemSize,
  magnification
}: {
  item: DockItem;
  mouseX: any;
  baseItemSize: number;
  magnification: number;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    [baseItemSize, magnification, baseItemSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={item.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center justify-center w-full h-full">
        {item.icon}
      </div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, y: -8, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
        transition={{ duration: 0.15 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-md border border-border text-xs font-medium whitespace-nowrap z-50"
      >
        {item.label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card/90 border-b border-r border-border rotate-45" />
      </motion.div>
    </motion.button>
  );
};

const Dock = ({
  items,
  className = '',
  magnification = 70,
  baseItemSize = 50
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 py-3 rounded-2xl glass-strong border border-border/50 ${className}`}
    >
      {items.map((item, index) => (
        <DockIcon
          key={index}
          item={item}
          mouseX={mouseX}
          baseItemSize={baseItemSize}
          magnification={magnification}
        />
      ))}
    </motion.div>
  );
};

export default Dock;
