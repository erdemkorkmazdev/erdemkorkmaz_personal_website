import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Github, Linkedin, Mail } from 'lucide-react';
import PillNav from '@/components/animations/PillNav';
import Dock from '@/components/animations/Dock';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

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

      <div className="min-h-screen bg-background">
        <PillNav
          items={navItems}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />
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
