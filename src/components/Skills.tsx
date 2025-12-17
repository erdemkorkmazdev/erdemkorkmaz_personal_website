import {
  Code2,
  Smartphone,
  Brain,
  Wrench
} from 'lucide-react';
import ScrollVelocity from '@/components/animations/ScrollVelocity';
import { useI18n } from '@/i18n/LanguageContext';

const techTexts = [
  'Vue.js • React.js • TypeScript • Flutter • Firebase • TensorFlow • WebSocket • Python • Dart • HTML5 • CSS3 • Tailwind',
  'PyTorch • REST API • Git • VS Code • Figma • PostgreSQL • MySQL • Docker • Linux • GSAP • Framer Motion'
];

const Skills = () => {
  const { t } = useI18n();

  const skillCategories = [
    {
      title: t('skills.categories.frontend'),
      icon: Code2,
      color: 'from-primary to-primary/60',
      skills: [
        'Vue.js (Composition API, Vue 3)',
        'React.js',
        'JavaScript (ES6+), TypeScript',
        'HTML5 / CSS3 / Tailwind',
        'Responsive & reactive UI design',
        'WebSocket & real-time systems'
      ]
    },
    {
      title: t('skills.categories.mobile'),
      icon: Smartphone,
      color: 'from-secondary to-secondary/60',
      skills: [
        'Flutter & Dart',
        'Firebase integrations',
        'API consumption & UI sync',
        'Cross-platform development'
      ]
    },
    {
      title: t('skills.categories.ai'),
      icon: Brain,
      color: 'from-neon-purple to-secondary',
      skills: [
        'Python (AI integration)',
        'PyTorch, TensorFlow',
        'OCR (Tesseract)',
        'REST API consumption'
      ]
    },
    {
      title: t('skills.categories.tools'),
      icon: Wrench,
      color: 'from-primary to-neon-cyan',
      skills: [
        'Git / GitLab',
        'Linux, VS Code',
        'Figma (for UI)',
        'Agile / SCRUM collaboration'
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">{t('skills.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              {t('skills.title')}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t('skills.description')}
            </p>
          </div>

          {/* Skill Categories Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 hover-lift group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">{category.title}</h3>
                </div>

                {/* Skills List */}
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground/80 text-left">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width ScrollVelocity Tech Stack */}
      <div className="mb-8">
        <h4 className="text-sm font-mono text-primary uppercase tracking-widest mb-6 text-center">
          {t('skills.coreTech')}
        </h4>
      </div>

      <ScrollVelocity
        texts={techTexts}
        velocity={40}
        className="text-3xl md:text-5xl text-foreground/30 hover:text-foreground/50 transition-colors duration-500"
        containerClassName="py-8 -mx-6"
      />
    </section>
  );
};

export default Skills;
