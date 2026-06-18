import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/LanguageContext';
import Galaxy from '@/components/animations/Galaxy';

const Projects = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { t, language } = useI18n();

  const projects = useMemo(() => [
    {
      id: 1,
      title: t('projectDetails.railscreen.title'),
      category: t('projectDetails.railscreen.category'),
      tags: ['Web', 'IoT', 'Real-time', 'Dashboard'],
      shortDescription: t('projectDetails.railscreen.shortDescription'),
      fullDescription: t('projectDetails.railscreen.fullDescription'),
      gradient: 'from-primary to-secondary'
    },
    {
      id: 2,
      title: t('projectDetails.enekomQm.title'),
      category: t('projectDetails.enekomQm.category'),
      tags: ['Mobile', 'Flutter', 'Clean Architecture', 'Firebase'],
      shortDescription: t('projectDetails.enekomQm.shortDescription'),
      fullDescription: t('projectDetails.enekomQm.fullDescription'),
      gradient: 'from-secondary to-neon-purple'
    },
    {
      id: 3,
      title: t('projectDetails.wclinico.title'),
      category: t('projectDetails.wclinico.category'),
      tags: ['Mobile', 'Web', 'HealthTech'],
      shortDescription: t('projectDetails.wclinico.shortDescription'),
      fullDescription: t('projectDetails.wclinico.fullDescription'),
      gradient: 'from-primary to-neon-cyan'
    },
    {
      id: 4,
      title: t('projectDetails.virtus.title'),
      category: t('projectDetails.virtus.category'),
      tags: ['Mobile', 'Fintech'],
      shortDescription: t('projectDetails.virtus.shortDescription'),
      fullDescription: t('projectDetails.virtus.fullDescription'),
      gradient: 'from-neon-purple to-secondary'
    },
    {
      id: 5,
      title: t('projectDetails.swir.title'),
      category: t('projectDetails.swir.category'),
      tags: ['React', 'FastAPI', 'WebSocket', 'Defense', 'Python'],
      shortDescription: t('projectDetails.swir.shortDescription'),
      fullDescription: t('projectDetails.swir.fullDescription'),
      gradient: 'from-neon-purple to-primary'
    }
  ], [language]);

  const handleCardClick = (projectId: number) => {
    if (expandedId === projectId) {
      setExpandedId(null);
    } else {
      setExpandedId(projectId);
    }
  };

  const handleViewDetails = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black">
      {/* Top gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[hsl(220,25%,6%)] to-transparent pointer-events-none z-10" />
      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(220,25%,6%)] to-transparent pointer-events-none z-10" />

      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1.2}
          glowIntensity={0.2}
          saturation={0.1}
          hueShift={140}
          twinkleIntensity={0.1}
          rotationSpeed={0.1}
          repulsionStrength={0.5}
          autoCenterRepulsion={0}
          starSpeed={0.4}
          speed={1}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">{t('projects.title')}</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              {t('projects.subtitle')}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t('projects.description')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden hover-lift group cursor-pointer"
                onClick={() => handleCardClick(project.id)}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left - Gradient Visual */}
                  <div className={`lg:w-72 h-48 lg:h-auto bg-gradient-to-br ${project.gradient} relative flex-shrink-0`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-display font-bold text-primary-foreground/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1 p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-mono text-primary uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-display font-semibold mt-2">
                          {project.title}
                        </h3>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${expandedId === project.id ? 'rotate-90' : ''
                          }`}
                      />
                    </div>

                    <p className="text-foreground/80 mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Expanded Content */}
                    <div className={`overflow-hidden transition-all duration-300 ${expandedId === project.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      <p className="text-muted-foreground mb-4">
                        {project.fullDescription}
                      </p>

                      {/* View Details Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="group/btn gap-2 mb-4"
                        onClick={(e) => handleViewDetails(e, project.id)}
                      >
                        {t('projects.viewDetails')}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="group" asChild>
              <a
                href="https://github.com/erdemkorkmazdev"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('projects.viewMoreGithub')}
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
