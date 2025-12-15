import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
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
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
