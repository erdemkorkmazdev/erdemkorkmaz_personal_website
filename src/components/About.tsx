import { MapPin, Calendar, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
      
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
            {/* Left - Profile Card */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-8 neon-border hover-lift">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                  <span className="text-4xl font-display font-bold text-primary-foreground">EK</span>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-display font-semibold">Erdem Korkmaz</h3>
                  <p className="text-muted-foreground">Frontend & Mobile Developer</p>
                  
                  <div className="flex flex-wrap justify-center gap-3 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Ankara, Türkiye</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>26 years old</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span>Computer Engineer</span>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold gradient-text">2+</p>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-display font-bold gradient-text">5+</p>
                    <p className="text-sm text-muted-foreground">Projects Delivered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Bio Content */}
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed">
                <span className="text-primary font-semibold">Erdem Korkmaz</span> is a Computer Engineer 
                and frontend-focused software developer with hands-on experience in{' '}
                <span className="text-primary">Vue.js</span>, <span className="text-primary">React.js</span>,{' '}
                <span className="text-secondary">real-time WebSocket systems</span>, and{' '}
                <span className="text-secondary">AI-driven anomaly detection</span>.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                He develops large-scale monitoring dashboards and intelligent alert systems at{' '}
                <span className="font-semibold">Enekom</span>, building reactive and responsive UIs 
                that visualize real-time rail health data from IoT and drone networks.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                Erdem is passionate about turning complex data into clean, futuristic user interfaces — 
                combining engineering precision with design simplicity.
              </p>

              {/* Languages */}
              <div className="pt-6">
                <h4 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Languages</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 rounded-lg glass">
                    <span className="text-sm font-medium">English</span>
                    <span className="text-xs text-muted-foreground ml-2">Advanced</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg glass">
                    <span className="text-sm font-medium">German</span>
                    <span className="text-xs text-muted-foreground ml-2">Intermediate</span>
                  </div>
                  <div className="px-4 py-2 rounded-lg glass">
                    <span className="text-sm font-medium">Turkish</span>
                    <span className="text-xs text-muted-foreground ml-2">Native</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="pt-4">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/10 border border-primary/30">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm">Open to relocation and remote roles worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
