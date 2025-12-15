import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagicBentoCard from '@/components/animations/MagicBentoCard';

const projects = [
    {
        id: 1,
        title: 'RailScreen Operator Dashboard',
        category: 'Web',
        tags: ['Vue.js', 'WebSocket', 'IoT', 'Real-time', 'Dashboard'],
        shortDescription: 'Real-time monitoring interface for detecting rail cracks and anomalies.',
        fullDescription: 'Built with Vue.js and WebSockets; includes zoomable SVG rail map, live segment updates, and device overlays (RAG, RAR, RASP). Processes thousands of data points per second for critical infrastructure monitoring.',
        features: [
            { title: 'Real-time Map', description: 'Zoomable SVG rail map with live updates' },
            { title: 'Device Monitoring', description: 'RAG, RAR, RASP device status overlays' },
            { title: 'Alert System', description: 'Instant notifications for detected anomalies' },
            { title: 'Data Processing', description: 'Handles thousands of data points per second' }
        ],
        gradient: 'from-primary to-secondary'
    },
    {
        id: 2,
        title: 'RailDrone Inspection UI',
        category: 'Web',
        tags: ['Vue.js', 'PyTorch', 'TensorFlow', 'AI', 'Computer Vision'],
        shortDescription: 'Web visualization tool for drone-collected data and defect detection.',
        fullDescription: 'Integrates AI inference results from PyTorch/TensorFlow and presents them as heatmaps or overlays. Enables operators to review and validate AI-detected anomalies with precision controls.',
        features: [
            { title: 'AI Integration', description: 'PyTorch/TensorFlow inference visualization' },
            { title: 'Heatmap Overlays', description: 'Visual representation of defect probabilities' },
            { title: 'Validation Tools', description: 'Review and approve AI-detected anomalies' },
            { title: 'Precision Controls', description: 'Fine-tune detection parameters' }
        ],
        gradient: 'from-secondary to-neon-purple'
    },
    {
        id: 3,
        title: 'WClinico Telemedicine Platform',
        category: 'Mobile & Web',
        tags: ['Flutter', 'Vue.js', 'Firebase', 'HealthTech'],
        shortDescription: 'Cross-platform healthcare consultation app for doctor-patient sessions.',
        fullDescription: 'Built with Flutter (mobile) + Vue.js (admin panel), Firebase for data. Features video calling, prescription management, and secure patient records.',
        features: [
            { title: 'Video Calling', description: 'Real-time doctor-patient consultations' },
            { title: 'Prescription Management', description: 'Digital prescriptions and history' },
            { title: 'Patient Records', description: 'Secure health data storage' },
            { title: 'Admin Panel', description: 'Vue.js dashboard for management' }
        ],
        gradient: 'from-primary to-neon-cyan'
    },
    {
        id: 4,
        title: 'Virtus Lending App',
        category: 'Mobile',
        tags: ['Flutter', 'REST API', 'Fintech'],
        shortDescription: 'Financial application for credit request and portfolio tracking.',
        fullDescription: 'Modern UI with API-driven backend and Flutter frontend. Includes real-time credit scoring, document upload, and loan status tracking.',
        features: [
            { title: 'Credit Scoring', description: 'Real-time credit assessment' },
            { title: 'Document Upload', description: 'Secure document processing' },
            { title: 'Loan Tracking', description: 'Real-time application status' },
            { title: 'Portfolio View', description: 'Complete financial overview' }
        ],
        gradient: 'from-neon-purple to-secondary'
    },
    {
        id: 5,
        title: 'Dönerci Ordering App',
        category: 'Mobile',
        tags: ['Flutter', 'Firebase', 'FoodTech'],
        shortDescription: 'Restaurant ordering and campaign system.',
        fullDescription: 'Flutter + Firebase, iOS build tested via TestFlight. Features menu browsing, order customization, loyalty points, and push notifications.',
        features: [
            { title: 'Menu System', description: 'Interactive menu with customization' },
            { title: 'Loyalty Program', description: 'Points and rewards system' },
            { title: 'Push Notifications', description: 'Order updates and campaigns' },
            { title: 'Order Tracking', description: 'Real-time order status' }
        ],
        gradient: 'from-secondary to-primary'
    }
];

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const project = projects.find(p => p.id === Number(id));

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
                    <Button onClick={() => navigate('/')}>Go Back Home</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{project.title} | Erdem Korkmaz</title>
                <meta name="description" content={project.fullDescription} />
            </Helmet>

            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/')}
                                className="gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Github className="w-4 h-4" />
                                    Source
                                </Button>
                                <Button size="sm" className="gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className={`pt-24 pb-12 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} />

                    <div className="container mx-auto px-6 py-16 relative z-10">
                        <span className="text-xs font-mono text-primary-foreground/80 uppercase tracking-wider">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mt-4">
                            {project.title}
                        </h1>
                        <p className="text-lg text-primary-foreground/80 mt-4 max-w-2xl">
                            {project.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-primary-foreground backdrop-blur-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto">
                            {/* Description */}
                            <div className="glass rounded-2xl p-8 mb-12">
                                <h2 className="text-2xl font-display font-semibold mb-4">About the Project</h2>
                                <p className="text-foreground/80 leading-relaxed">
                                    {project.fullDescription}
                                </p>
                            </div>

                            {/* Features Grid with MagicBentoCard */}
                            <h2 className="text-2xl font-display font-semibold mb-6">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {project.features.map((feature, index) => (
                                    <MagicBentoCard
                                        key={index}
                                        title={feature.title}
                                        description={feature.description}
                                        className={index === 0 ? 'md:col-span-2' : ''}
                                    />
                                ))}
                            </div>

                            {/* Screenshots Placeholder */}
                            <h2 className="text-2xl font-display font-semibold mb-6">Screenshots</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <MagicBentoCard
                                        key={i}
                                        title={`Screenshot ${i}`}
                                        className={i === 1 ? 'col-span-2 row-span-2' : ''}
                                    >
                                        <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
                                            <span className="text-muted-foreground text-sm">Image placeholder</span>
                                        </div>
                                    </MagicBentoCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectDetail;
