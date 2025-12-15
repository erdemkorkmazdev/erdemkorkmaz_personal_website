import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Futuristic background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Open to opportunities</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight animate-fade-in delay-100">
            <span className="gradient-text">Erdem</span>
            <br />
            <span className="text-foreground">Korkmaz</span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light animate-fade-in delay-200">
            Frontend & Mobile App Developer
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
            I build <span className="text-primary font-medium">real-time dashboards</span> and{' '}
            <span className="text-secondary font-medium">cross-platform apps</span> that connect people, data, and design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in delay-400">
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-medium px-8"
            >
              View Projects
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted font-medium px-8"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 animate-fade-in delay-500">
            <a 
              href="https://github.com/erdemkorkmazdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:neon-border transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://linkedin.com/in/erdem-korkmaz-14a3b91b4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:neon-border transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="mailto:erdemkorkmaz06@gmail.com"
              className="p-3 rounded-full glass hover:neon-border transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
