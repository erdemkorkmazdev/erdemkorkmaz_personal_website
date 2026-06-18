import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Quote, Shield, Globe, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MagicBentoCard from '@/components/animations/MagicBentoCard';
import Noise from '@/components/animations/Noise';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { useI18n } from '@/i18n/LanguageContext';

// RailScreen images
import haberturkImg from '@/assets/projects/railacoustic/haberturk.jpg';
import dashboardOverviewImg from '@/assets/projects/railacoustic/dashboard-overview.png';
import railMapImg from '@/assets/projects/railacoustic/rail-map.png';
import deviceMonitoringImg from '@/assets/projects/railacoustic/device-monitoring.png';

// Enekom QM images
import enekomScreen01 from '@/assets/projects/enekom-qm/screen-01.png';
import enekomScreen02 from '@/assets/projects/enekom-qm/screen-02.png';
import enekomScreen03 from '@/assets/projects/enekom-qm/screen-03.png';
import enekomScreen04 from '@/assets/projects/enekom-qm/screen-04.png';
import enekomScreen05 from '@/assets/projects/enekom-qm/screen-05.png';
import enekomScreen06 from '@/assets/projects/enekom-qm/screen-06.png';

// SWIR Surveillance System
// TODO: Add the demo GIF to src/assets/projects/swir/demo.gif
// then uncomment the line below and pass it to the swirDemoGif field:
// import swirDemoGif from '@/assets/projects/swir/demo.gif';
const swirDemoGif: string | null = null; // replace null with the import above once the file is added

// WClinico images
import wclinicoFullPage from '@/assets/projects/wclinico/full-page.png';
import wclinicoDemo from '@/assets/projects/wclinico/demo.mov';

interface Screenshot {
    src: string;
    alt: string;
    className?: string;
}

interface Testimonial {
    quote: string;
    author: string;
}

// --- Testimonial Carousel ---
const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
    const [current, setCurrent] = useState(0);
    const { t } = useI18n();

    const next = useCallback(() => {
        setCurrent(i => (i + 1) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [next]);

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.testimonials')}</h2>
            <div className="relative glass rounded-2xl p-8 overflow-hidden">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                <div className="relative min-h-[120px] flex items-center">
                    {testimonials.map((item, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
                                i === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                            }`}
                        >
                            <p className="text-foreground/80 italic leading-relaxed text-lg pl-8">
                                "{item.quote}"
                            </p>
                            <p className="text-primary font-medium mt-4 pl-8">
                                — {item.author}
                            </p>
                        </div>
                    ))}
                </div>
                {testimonials.length > 1 && (
                    <div className="flex items-center justify-end gap-2 mt-4">
                        <button
                            onClick={() => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)}
                            className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <div className="flex gap-1.5">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- WClinico Screenshot Panel ---
const WClinicoScreenshotPanel = () => {
    const [showScrollHint, setShowScrollHint] = useState(true);
    const { t } = useI18n();

    useEffect(() => {
        const timer = setTimeout(() => setShowScrollHint(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)]">
            <div
                className="relative rounded-2xl overflow-hidden border border-border/30"
                onScroll={() => setShowScrollHint(false)}
            >
                <div
                    className="overflow-y-auto max-h-[80vh] lg:max-h-[calc(100vh-8rem)] scrollbar-hide"
                    onScroll={() => setShowScrollHint(false)}
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 94%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 94%, transparent 100%)',
                    }}
                >
                    <img
                        src={wclinicoFullPage}
                        alt="WClinico platform full page"
                        className="w-full h-auto"
                        loading="lazy"
                    />
                </div>
                <div className="absolute inset-0 pointer-events-none z-10">
                    <Noise patternAlpha={10} patternRefreshInterval={3} />
                </div>

                {/* Scroll hint - more prominent */}
                <div
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 transition-all duration-1000 ${
                        showScrollHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                    <span className="text-xs font-mono uppercase tracking-widest text-white bg-black/70 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 shadow-lg">
                        {t('projectDetail.scroll')}
                    </span>
                    <div className="animate-bounce">
                        <ChevronDown className="w-5 h-5 text-white drop-shadow-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SWIR GIF Panel ---
const SWIRGifPanel = ({ gifSrc }: { gifSrc: string | null }) => {
    const { t } = useI18n();
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.screenshots')}</h2>
            <div className="relative rounded-2xl overflow-hidden border border-border/30 glass">
                {gifSrc ? (
                    <img
                        src={gifSrc}
                        alt="SWIR Surveillance System - Live Interface Demo"
                        className="w-full h-auto"
                    />
                ) : (
                    <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-neon-purple/10 to-primary/10">
                        <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                            <span className="text-2xl">🎬</span>
                        </div>
                        <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">Demo GIF</p>
                    </div>
                )}
                <div className="absolute inset-0 pointer-events-none">
                    <Noise patternAlpha={6} patternRefreshInterval={3} />
                </div>
            </div>
        </div>
    );
};

// --- Phone Mockup Gallery ---
const PhoneMockupGallery = ({ screenshots, gradient }: { screenshots: Screenshot[]; gradient: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useI18n();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="mb-12">
            <h2 className="text-2xl font-display font-semibold mb-8">{t('projectDetail.screenshots')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {screenshots.map((shot, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.12,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{
                            scale: 1.04,
                            rotateY: 5,
                            z: 50,
                            transition: { duration: 0.3 },
                        }}
                        className="group relative"
                        style={{ perspective: '1000px' }}
                    >
                        {/* Gradient glow behind phone */}
                        <div
                            className={`absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
                        />

                        {/* Phone frame */}
                        <div className="relative rounded-[2rem] border-[3px] border-foreground/20 bg-black overflow-hidden shadow-2xl group-hover:shadow-primary/20 group-hover:border-primary/40 transition-all duration-500">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-24 h-6 bg-black rounded-b-2xl" />

                            {/* Screen */}
                            <div className="relative">
                                <img
                                    src={shot.src}
                                    alt={shot.alt}
                                    className="w-full h-auto aspect-[9/19.5] object-cover"
                                    loading="lazy"
                                />
                                {/* Subtle screen reflection */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            {/* Bottom bar */}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-foreground/20 rounded-full" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Main Component ---
const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useI18n();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [id]);

    const projects = useMemo(() => [
        {
            id: 1,
            title: t('projectDetails.railscreen.title'),
            category: t('projectDetails.railscreen.category'),
            tags: ['Vue.js', 'WebSocket', 'IoT', 'Real-time', 'Dashboard'],
            shortDescription: t('projectDetails.railscreen.shortDescription'),
            fullDescription: t('projectDetails.railscreen.fullDescription'),
            features: [
                { title: t('projectDetails.railscreen.features.f1.title'), description: t('projectDetails.railscreen.features.f1.description') },
                { title: t('projectDetails.railscreen.features.f2.title'), description: t('projectDetails.railscreen.features.f2.description') },
                { title: t('projectDetails.railscreen.features.f3.title'), description: t('projectDetails.railscreen.features.f3.description') },
                { title: t('projectDetails.railscreen.features.f4.title'), description: t('projectDetails.railscreen.features.f4.description') },
            ],
            gradient: 'from-primary to-secondary',
            screenshots: [
                { src: haberturkImg, alt: 'Haberturk news coverage', className: 'col-span-2 row-span-2' },
                { src: railMapImg, alt: 'Rail map view', className: '' },
                { src: deviceMonitoringImg, alt: 'Device monitoring', className: '' },
                { src: dashboardOverviewImg, alt: 'Dashboard overview', className: 'col-span-3' },
            ] as Screenshot[],
            screenshotLayout: 'desktop' as const,
            visitUrl: null as string | null,
            testimonials: [
                { quote: t('projectDetails.railscreen.testimonial1'), author: t('projectDetails.railscreen.testimonial1Author') },
                { quote: t('projectDetails.railscreen.testimonial2'), author: t('projectDetails.railscreen.testimonial2Author') },
            ] as Testimonial[],
            isPatented: true,
            impact: {
                description: t('projectDetails.railscreen.impact'),
                result: t('projectDetails.railscreen.result'),
                reach: t('projectDetails.railscreen.reach'),
                stats: [
                    { value: '300+', label: language === 'tr' ? 'Günlük Sefer' : language === 'de' ? 'Tägliche Züge' : language === 'ar' ? 'رحلة يومية' : 'Daily Services' },
                    { value: '50+', label: language === 'tr' ? 'Operatör' : language === 'de' ? 'Betreiber' : language === 'ar' ? 'مشغل' : 'Operators' },
                    { value: '5', label: language === 'tr' ? 'Ülke' : language === 'de' ? 'Länder' : language === 'ar' ? 'دول' : 'Countries' },
                    { value: '24/7', label: language === 'tr' ? 'Kesintisiz İzleme' : language === 'de' ? 'Überwachung' : language === 'ar' ? 'مراقبة مستمرة' : 'Monitoring' },
                ],
            },
        },
        {
            id: 2,
            title: t('projectDetails.enekomQm.title'),
            category: t('projectDetails.enekomQm.category'),
            tags: ['Flutter', 'Dart', 'Riverpod', 'Clean Architecture', 'Retrofit & Dio', 'Firebase'],
            shortDescription: t('projectDetails.enekomQm.shortDescription'),
            fullDescription: t('projectDetails.enekomQm.fullDescription'),
            features: [
                { title: t('projectDetails.enekomQm.features.f1.title'), description: '' },
                { title: t('projectDetails.enekomQm.features.f2.title'), description: '' },
                { title: t('projectDetails.enekomQm.features.f3.title'), description: '' },
                { title: t('projectDetails.enekomQm.features.f4.title'), description: '' },
                { title: t('projectDetails.enekomQm.features.f5.title'), description: '' },
                { title: t('projectDetails.enekomQm.features.f6.title'), description: '' },
            ],
            gradient: 'from-secondary to-neon-purple',
            screenshots: [
                { src: enekomScreen01, alt: 'Enekom QM Screen 1', className: '' },
                { src: enekomScreen02, alt: 'Enekom QM Screen 2', className: '' },
                { src: enekomScreen03, alt: 'Enekom QM Screen 3', className: '' },
                { src: enekomScreen04, alt: 'Enekom QM Screen 4', className: '' },
                { src: enekomScreen05, alt: 'Enekom QM Screen 5', className: '' },
                { src: enekomScreen06, alt: 'Enekom QM Screen 6', className: '' },
            ] as Screenshot[],
            screenshotLayout: 'mobile' as const,
            visitUrl: null as string | null,
            testimonials: [] as Testimonial[],
            isPatented: false,
            impact: null,
        },
        {
            id: 3,
            title: t('projectDetails.wclinico.title'),
            category: t('projectDetails.wclinico.category'),
            tags: ['Flutter', 'Vue.js', 'Firebase', 'HealthTech', 'AI'],
            shortDescription: t('projectDetails.wclinico.shortDescription'),
            fullDescription: t('projectDetails.wclinico.fullDescription'),
            features: [
                { title: t('projectDetails.wclinico.features.f1.title'), description: t('projectDetails.wclinico.features.f1.description') },
                { title: t('projectDetails.wclinico.features.f2.title'), description: t('projectDetails.wclinico.features.f2.description') },
                { title: t('projectDetails.wclinico.features.f3.title'), description: t('projectDetails.wclinico.features.f3.description') },
                { title: t('projectDetails.wclinico.features.f4.title'), description: t('projectDetails.wclinico.features.f4.description') },
                { title: t('projectDetails.wclinico.features.f5.title'), description: t('projectDetails.wclinico.features.f5.description') },
                { title: t('projectDetails.wclinico.features.f6.title'), description: t('projectDetails.wclinico.features.f6.description') },
                { title: t('projectDetails.wclinico.features.f7.title'), description: t('projectDetails.wclinico.features.f7.description') },
            ],
            gradient: 'from-primary to-neon-cyan',
            screenshots: [] as Screenshot[],
            screenshotLayout: 'desktop' as const,
            visitUrl: 'https://us-wclinico.liyalabs.com',
            testimonials: [
                { quote: t('projectDetails.wclinico.testimonial1'), author: t('projectDetails.wclinico.testimonial1Author') },
                { quote: t('projectDetails.wclinico.testimonial2'), author: t('projectDetails.wclinico.testimonial2Author') },
            ] as Testimonial[],
            isPatented: false,
            impact: null,
        },
        {
            id: 4,
            title: t('projectDetails.virtus.title'),
            category: t('projectDetails.virtus.category'),
            tags: ['Flutter', 'REST API', 'Fintech'],
            shortDescription: t('projectDetails.virtus.shortDescription'),
            fullDescription: t('projectDetails.virtus.fullDescription'),
            features: [
                { title: t('projectDetails.virtus.features.f1.title'), description: t('projectDetails.virtus.features.f1.description') },
                { title: t('projectDetails.virtus.features.f2.title'), description: t('projectDetails.virtus.features.f2.description') },
                { title: t('projectDetails.virtus.features.f3.title'), description: t('projectDetails.virtus.features.f3.description') },
                { title: t('projectDetails.virtus.features.f4.title'), description: t('projectDetails.virtus.features.f4.description') },
            ],
            gradient: 'from-neon-purple to-secondary',
            screenshots: [] as Screenshot[],
            screenshotLayout: 'desktop' as const,
            visitUrl: null as string | null,
            testimonials: [] as Testimonial[],
            isPatented: false,
            impact: null,
        },
        {
            id: 5,
            title: t('projectDetails.swir.title'),
            category: t('projectDetails.swir.category'),
            tags: ['React', 'FastAPI', 'WebSocket', 'Canvas API', 'Python'],
            shortDescription: t('projectDetails.swir.shortDescription'),
            fullDescription: t('projectDetails.swir.fullDescription'),
            features: [
                { title: t('projectDetails.swir.features.f1.title'), description: t('projectDetails.swir.features.f1.description') },
                { title: t('projectDetails.swir.features.f2.title'), description: t('projectDetails.swir.features.f2.description') },
                { title: t('projectDetails.swir.features.f3.title'), description: t('projectDetails.swir.features.f3.description') },
                { title: t('projectDetails.swir.features.f4.title'), description: t('projectDetails.swir.features.f4.description') },
                { title: t('projectDetails.swir.features.f5.title'), description: t('projectDetails.swir.features.f5.description') },
                { title: t('projectDetails.swir.features.f6.title'), description: t('projectDetails.swir.features.f6.description') },
            ],
            gradient: 'from-neon-purple to-primary',
            screenshots: [] as Screenshot[],
            screenshotLayout: 'desktop' as const,
            visitUrl: null as string | null,
            testimonials: [] as Testimonial[],
            isPatented: true,
            impact: null,
        }
    ], [language]);

    const project = projects.find(p => p.id === Number(id));

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">{t('projectDetail.notFound')}</h1>
                    <Button onClick={() => navigate('/')}>{t('projectDetail.goHome')}</Button>
                </div>
            </div>
        );
    }

    const isWClinico = project.id === 3;
    const isRailScreen = project.id === 1;
    const isSwir = project.id === 5;

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
                                {t('projectDetail.back')}
                            </Button>
                            <div className="flex items-center gap-2">
                                {project.visitUrl && (
                                    <Button size="sm" className="gap-2" asChild>
                                        <a href={project.visitUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4" />
                                            {t('projectDetail.visit')}
                                        </a>
                                    </Button>
                                )}
                                <LanguageSwitcher />
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
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-mono text-primary-foreground/80 uppercase tracking-wider">
                                {project.category}
                            </span>
                            {project.isPatented && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-primary-foreground backdrop-blur-sm border border-white/20">
                                    <Shield className="w-3 h-3" />
                                    {t('projectDetail.erciPatent')}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground">
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

                {/* RailScreen Impact Stats Bar */}
                {isRailScreen && project.impact && (
                    <div className="border-b border-border/50 bg-muted/30">
                        <div className="container mx-auto px-6">
                            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                                {project.impact.stats.map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Content - WClinico gets special split layout */}
                {isWClinico ? (
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                    {/* LEFT: Content */}
                                    <div className="flex-1 lg:max-w-[55%]">
                                        <div className="glass rounded-2xl p-8 mb-12">
                                            <h2 className="text-2xl font-display font-semibold mb-4">{t('projectDetail.aboutProject')}</h2>
                                            <p className="text-foreground/80 leading-relaxed">
                                                {project.fullDescription}
                                            </p>
                                        </div>

                                        <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.keyFeatures')}</h2>
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

                                        {/* WClinico Testimonials */}
                                        {project.testimonials.length > 0 && (
                                            <TestimonialCarousel testimonials={project.testimonials} />
                                        )}
                                    </div>

                                    {/* RIGHT: Full-page screenshot with fade + grain */}
                                    <WClinicoScreenshotPanel />
                                </div>

                                {/* Demo Video */}
                                <div className="mt-16">
                                    <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.demo')}</h2>
                                    <div className="relative rounded-2xl overflow-hidden border border-border/30 glass">
                                        <video
                                            src={wclinicoDemo}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-auto rounded-2xl"
                                        />
                                        <div className="absolute inset-0 pointer-events-none">
                                            <Noise patternAlpha={8} patternRefreshInterval={4} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="py-16">
                        <div className="container mx-auto px-6">
                            <div className="max-w-5xl mx-auto">
                                {/* Description */}
                                <div className="glass rounded-2xl p-8 mb-12">
                                    <h2 className="text-2xl font-display font-semibold mb-4">{t('projectDetail.aboutProject')}</h2>
                                    <p className="text-foreground/80 leading-relaxed">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                {/* SWIR GIF panel */}
                                {isSwir && (
                                    <SWIRGifPanel gifSrc={swirDemoGif} />
                                )}

                                {/* Screenshots (moved to top) */}
                                {!isSwir && project.screenshots && project.screenshots.length > 0 && (
                                    project.screenshotLayout === 'mobile' ? (
                                        <PhoneMockupGallery screenshots={project.screenshots} gradient={project.gradient} />
                                    ) : (
                                        <div className="mb-12">
                                            <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.screenshots')}</h2>
                                            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                                                {project.screenshots.map((shot, i) => (
                                                    <MagicBentoCard
                                                        key={i}
                                                        title={shot.alt}
                                                        className={shot.className || ''}
                                                        enableTilt={false}
                                                    >
                                                        <img
                                                            src={shot.src}
                                                            alt={shot.alt}
                                                            className="w-full h-full object-cover rounded-lg"
                                                            loading="lazy"
                                                        />
                                                    </MagicBentoCard>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}

                                {/* Features Grid */}
                                <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.keyFeatures')}</h2>
                                <div className={`grid grid-cols-1 md:grid-cols-2 ${project.screenshotLayout === 'mobile' ? 'md:grid-cols-3' : ''} gap-4 mb-12`}>
                                    {project.features.map((feature, index) => (
                                        <MagicBentoCard
                                            key={index}
                                            title={feature.title}
                                            description={feature.description}
                                            className={project.screenshotLayout === 'mobile' ? '' : (index === 0 ? 'md:col-span-2' : '')}
                                        />
                                    ))}
                                </div>

                                {/* RailScreen Impact Section */}
                                {isRailScreen && project.impact && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-display font-semibold mb-6">{t('projectDetail.impact')}</h2>
                                        <div className="space-y-4">
                                            <div className="glass rounded-2xl p-8">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                    <p className="text-foreground/80 leading-relaxed">{project.impact.description}</p>
                                                </div>
                                            </div>
                                            <div className="glass rounded-2xl p-8">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <h3 className="font-semibold mb-2">{t('projectDetail.results')}</h3>
                                                        <p className="text-foreground/80 leading-relaxed">{project.impact.result}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="glass rounded-2xl p-8">
                                                <div className="flex items-start gap-3">
                                                    <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                                    <p className="text-foreground/80 leading-relaxed">{project.impact.reach}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Testimonials (moved to bottom) */}
                                {project.testimonials.length > 0 && (
                                    <TestimonialCarousel testimonials={project.testimonials} />
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
};

export default ProjectDetail;
