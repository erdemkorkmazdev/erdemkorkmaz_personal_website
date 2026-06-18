import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Github, Linkedin, Mail } from 'lucide-react';
import PillNav from '@/components/animations/PillNav';
import Dock from '@/components/animations/Dock';
import GhostCursor from '@/components/animations/GhostCursor';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useI18n } from '@/i18n/LanguageContext';

const Index = () => {
  const { t } = useI18n();

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const dockItems = [
    {
      icon: <Github className="w-6 h-6 text-muted-foreground" />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/erdemkorkmazdev', '_blank')
    },
    {
      icon: <Linkedin className="w-6 h-6 text-muted-foreground" />,
      label: 'LinkedIn',
      onClick: () => window.open('https://linkedin.com/in/erdem-korkmaz-14a3b91b4', '_blank')
    },
    {
      icon: <Mail className="w-6 h-6 text-muted-foreground" />,
      label: 'Email',
      onClick: () => window.location.href = 'mailto:erdemkorkmaz06@gmail.com'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Erdem Korkmaz | Frontend & Mobile App Developer</title>
        <meta
          name="description"
          content="Erdem Korkmaz is a frontend and mobile app developer specializing in Vue.js, React.js, Flutter, and real-time systems. Building dashboards and cross-platform apps in Ankara, Türkiye."
        />
        <meta name="keywords" content="Erdem Korkmaz, Frontend Developer, Mobile Developer, Vue.js, React.js, Flutter, Ankara, Türkiye" />
        <meta property="og:title" content="Erdem Korkmaz | Frontend & Mobile App Developer" />
        <meta property="og:description" content="I build real-time dashboards and cross-platform apps that connect people, data, and design." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://erdemkorkmaz.dev" />
      </Helmet>

      {/* Ghost Cursor — fixed, behind all interactive content */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <GhostCursor
          color="hsla(249, 61%, 45%, 1.00)"
          trailLength={5}
          bloomStrength={0.5}
          bloomRadius={0.05}
          edgeIntensity={0}
          zIndex={1}
        />
      </div>

      <div className="min-h-screen bg-background">
        <PillNav items={navItems} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <Dock items={dockItems} />
      </div>
    </>
  );
};

export default Index;
