import { MapPin, Calendar, Code2 } from 'lucide-react';
import ProfileCard from '@/components/animations/ProfileCard';
import OrbBackground from '@/components/animations/OrbBackground';
import GhostCursor from '@/components/animations/GhostCursor';
import LaserFlow from '@/components/animations/LaserFlow';

const About = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Orb Background - More prominent */}
      <div className="absolute inset-0 -z-10">
        <OrbBackground hue={186} brightness={3} bloomStrength={0.5} />
      </div>

      {/* Ghost Cursor Effect - Thicker, theme colored */}
      <GhostCursor color="hsl(186, 100%, 50%)" trailLength={35} lineWidth={5} />

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">About</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              Who I Am
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left - Profile Card with LaserFlow */}
            <div className="lg:col-span-2">
              <ProfileCard
                name="Erdem Korkmaz"
                title="Frontend & Mobile Developer"
                handle="erdemkorkmaz"
                status="Open to Work"
                onContactClick={scrollToContact}
              />

              {/* LaserFlow under ProfileCard - Reversed */}
              <div className="relative h-16 mt-4 overflow-hidden rounded-xl glass-subtle">
                <LaserFlow
                  color="hsl(186, 100%, 50%)"
                  beamCount={4}
                  speed={2}
                  beamWidth={2}
                  reverse={true}
                />
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass-card rounded-xl p-4 text-center hover-lift">
                  <p className="text-2xl font-display font-bold gradient-text">2+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div className="glass-card rounded-xl p-4 text-center hover-lift">
                  <p className="text-2xl font-display font-bold gradient-text">5+</p>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </div>
              </div>
            </div>

            {/* Right - Bio Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  <span className="text-primary font-semibold">Erdem Korkmaz</span> is a Computer Engineer
                  and frontend-focused software developer with hands-on experience in{' '}
                  <span className="text-primary">Vue.js</span>, <span className="text-primary">React.js</span>,{' '}
                  <span className="text-secondary">real-time WebSocket systems</span>, and{' '}
                  <span className="text-secondary">AI-driven anomaly detection</span>.
                </p>

                <p className="text-lg text-foreground/80 leading-relaxed mt-4">
                  He develops large-scale monitoring dashboards and intelligent alert systems at{' '}
                  <span className="font-semibold">Enekom</span>, building reactive and responsive UIs
                  that visualize real-time rail health data from IoT and drone networks.
                </p>

                <p className="text-lg text-foreground/80 leading-relaxed mt-4">
                  Erdem is passionate about turning complex data into clean, futuristic user interfaces —
                  combining engineering precision with design simplicity.
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">Ankara, Türkiye</p>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-xs text-muted-foreground">26 years old</p>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Degree</p>
                    <p className="text-xs text-muted-foreground">Computer Engineer</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Languages</h4>
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
                <span className="text-sm">Open to relocation and remote roles worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
