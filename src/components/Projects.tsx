import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'RailScreen Operator Dashboard',
    category: 'Web',
    tags: ['Web', 'IoT', 'Real-time', 'Dashboard'],
    shortDescription: 'Real-time monitoring interface for detecting rail cracks and anomalies.',
    fullDescription: 'Built with Vue.js and WebSockets; includes zoomable SVG rail map, live segment updates, and device overlays (RAG, RAR, RASP). Processes thousands of data points per second for critical infrastructure monitoring.',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 2,
    title: 'RailDrone Inspection UI',
    category: 'Web',
    tags: ['Web', 'Drone', 'AI', 'Computer Vision'],
    shortDescription: 'Web visualization tool for drone-collected data and defect detection.',
    fullDescription: 'Integrates AI inference results from PyTorch/TensorFlow and presents them as heatmaps or overlays. Enables operators to review and validate AI-detected anomalies with precision controls.',
    gradient: 'from-secondary to-neon-purple'
  },
  {
    id: 3,
    title: 'WClinico Telemedicine Platform',
    category: 'Mobile & Web',
    tags: ['Mobile', 'Web', 'HealthTech'],
    shortDescription: 'Cross-platform healthcare consultation app for doctor-patient sessions.',
    fullDescription: 'Built with Flutter (mobile) + Vue.js (admin panel), Firebase for data. Features video calling, prescription management, and secure patient records.',
    gradient: 'from-primary to-neon-cyan'
  },
  {
    id: 4,
    title: 'Virtus Lending App',
    category: 'Mobile',
    tags: ['Mobile', 'Fintech'],
    shortDescription: 'Financial application for credit request and portfolio tracking.',
    fullDescription: 'Modern UI with API-driven backend and Flutter frontend. Includes real-time credit scoring, document upload, and loan status tracking.',
    gradient: 'from-neon-purple to-secondary'
  },
  {
    id: 5,
    title: 'Dönerci Ordering App',
    category: 'Mobile',
    tags: ['Mobile', 'Firebase', 'FoodTech'],
    shortDescription: 'Restaurant ordering and campaign system.',
    fullDescription: 'Flutter + Firebase, iOS build tested via TestFlight. Features menu browsing, order customization, loyalty points, and push notifications.',
    gradient: 'from-secondary to-primary'
  }
];

const Projects = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

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
    <section id="projects" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[128px]" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">Projects</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              Featured Work
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From real-time monitoring systems to cross-platform mobile applications
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
                        View Details
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
                View More on GitHub
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
