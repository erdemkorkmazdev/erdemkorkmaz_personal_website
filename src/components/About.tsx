import { MapPin, Calendar, Code2 } from 'lucide-react';
import ProfileCard from '@/components/animations/ProfileCard';
import GhostCursor from '@/components/animations/GhostCursor';
import LaserFlow from '@/components/animations/LaserFlow';
import { useI18n } from '@/i18n/LanguageContext';

const About = () => {
  const { t } = useI18n();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />

      {/* Ghost Cursor Effect - Thicker, theme colored */}
      <GhostCursor color="hsl(186, 100%, 50%)" size={1.2} intensity={0.08} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">{t('about.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              {t('about.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left - Profile Card with LaserFlow */}
            <div className="lg:col-span-2">
              <ProfileCard
                name="Erdem Korkmaz"
                title={t('about.role')}
                handle="erdemkorkmaz"
                status={t('about.openToWork')}
                onContactClick={scrollToContact}
              />



              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass-card rounded-xl p-4 text-center hover-lift">
                  <p className="text-2xl font-display font-bold gradient-text">2+</p>
                  <p className="text-sm text-muted-foreground">{t('about.yearsExp')}</p>
                </div>
                <div className="glass-card rounded-xl p-4 text-center hover-lift">
                  <p className="text-2xl font-display font-bold gradient-text">5+</p>
                  <p className="text-sm text-muted-foreground">{t('about.projectsDelivered')}</p>
                </div>
              </div>
            </div>

            {/* Right - Bio Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card rounded-2xl p-8 text-left rtl:text-right">
                <p
                  className="text-lg text-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('about.bio1') }}
                />

                <p
                  className="text-lg text-foreground/80 leading-relaxed mt-4"
                  dangerouslySetInnerHTML={{ __html: t('about.bio2') }}
                />

                <p
                  className="text-lg text-foreground/80 leading-relaxed mt-4"
                  dangerouslySetInnerHTML={{ __html: t('about.bio3') }}
                />
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-sm font-medium">{t('about.location')}</p>
                    <p className="text-xs text-muted-foreground">Ankara, Türkiye</p>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-sm font-medium">{t('about.age')}</p>
                    <p className="text-xs text-muted-foreground">26</p>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-sm font-medium">{t('about.degree')}</p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{t('about.degreeValue')}</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-sm font-mono text-primary uppercase tracking-widest mb-4 text-left rtl:text-right">{t('about.languages')}</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-lg bg-muted/50 border border-white/10">
                    <span className="text-sm font-medium">English</span>
                    <span className="text-xs text-muted-foreground ml-2">Advanced</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-muted/50 border border-white/10">
                    <span className="text-sm font-medium">German</span>
                    <span className="text-xs text-muted-foreground ml-2">Intermediate</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-muted/50 border border-white/10">
                    <span className="text-sm font-medium">Turkish</span>
                    <span className="text-xs text-muted-foreground ml-2">Native</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl glass-card border border-primary/30">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                <span className="text-sm">{t('about.relocation')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
