import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Noise from '@/components/animations/Noise';
import OrbBackground from '@/components/animations/OrbBackground';
import GradientText from '@/components/animations/GradientText';
import { useI18n } from '@/i18n/LanguageContext';

const Hero = () => {
  const { t } = useI18n();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Orb Background - Vue-bits style WebGL */}
      <div className="absolute inset-0 z-0">
        <OrbBackground hue={180} hoverIntensity={0.3} rotateOnHover={true} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 text-center pointer-events-none">
        <div className="space-y-6 sm:space-y-8 max-w-[min(56rem,76vmin)] mx-auto">
          {/* Badge with Noise Effect */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border animate-fade-in relative overflow-hidden">
            {/* Noise overlay for glitch effect */}
            <Noise patternAlpha={8} mixBlendMode="overlay" patternRefreshInterval={3} />
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse relative z-10" />
            <span className="text-sm font-medium text-muted-foreground relative z-10">{t('hero.status')}</span>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight animate-fade-in delay-100">
            <GradientText
              text="Erdem Korkmaz"
              className="inline"
              animationSpeed={4}
              gradient="linear-gradient(90deg, #00d4ff, #ffffff, #7ee8fa, #ffffff, #00d4ff)"
            />
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light animate-fade-in delay-200">
            {t('hero.title')}
          </p>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-[min(42rem,62vmin)] mx-auto leading-relaxed animate-fade-in delay-300">
            {t('hero.tagline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-12 animate-fade-in delay-400 pointer-events-auto">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-medium px-8"
              >
                {t('hero.viewProjects')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted font-medium px-8"
                asChild
              >
                <a href="/ErdemKorkmaz_CV.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  {t('hero.downloadCv')}
                </a>
              </Button>
            </div>

            {/* Scroll indicator - Moved inside flow with gap */}
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
