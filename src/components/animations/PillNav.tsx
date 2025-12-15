import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: NavItem[];
  className?: string;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

const PillNav = ({
  items,
  className = '',
  isDark = true,
  onThemeToggle
}: PillNavProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center ${className}`}
    >
      <motion.div
        className={`flex items-center gap-2 px-3 py-2.5 rounded-full transition-all duration-300 ${isScrolled
            ? 'shadow-xl shadow-primary/10'
            : ''
          }`}
        style={{
          background: 'rgba(var(--card-rgb, 20, 20, 25), 0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
            : 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#');
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
          }}
        >
          <span className="text-sm font-display font-bold text-primary-foreground">EK</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {items.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {/* Pill background */}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="pill-bg"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  initial={false}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}

              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle */}
        <motion.button
          onClick={onThemeToggle}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          whileHover={{
            scale: 1.05,
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.95 }}
        className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 rounded-2xl ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        style={{
          background: 'rgba(var(--card-rgb, 20, 20, 25), 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            className="w-full px-6 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
          >
            {item.label}
          </button>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default PillNav;
