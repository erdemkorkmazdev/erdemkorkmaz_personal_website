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
      className="relative flex items-center justify-center rounded-xl transition-colors"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'rgba(var(--card-rgb), 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        animate={{
          borderColor: isHovered ? 'hsl(var(--primary) / 0.5)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
            : 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {item.icon}
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, y: -8, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
        transition={{ duration: 0.15 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap z-50"
        style={{
          background: 'rgba(var(--card-rgb), 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {item.label}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
          style={{
            background: 'rgba(var(--card-rgb), 0.9)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />
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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 py-3 rounded-2xl ${className}`}
      style={{
        background: 'rgba(var(--card-rgb), 0.5)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.06)'
      }}
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
