import { Briefcase, GraduationCap, Award, Building2 } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Software Developer',
    company: 'Enekom',
    period: '10/2023 - Present',
    description: [
      'Developed real-time anomaly detection dashboards using Vue.js, React.js, HTML, CSS, and WebSocket for continuous rail-health monitoring.',
      'Integrated AI-based image processing pipelines (PyTorch, TensorFlow) for defect detection.',
      'Delivered maintainable, streaming-optimized UI architectures with real-time alerts.',
      'Contributed to mobile modules (Flutter, Dart) for extended platform integration.'
    ]
  }
];

const education = [
  {
    type: 'education',
    title: 'B.Sc. Computer Engineering',
    company: 'Atılım University',
    period: 'Graduated June 2023',
    description: [
      'Capstone Project: Developed a mobile application for group expense splitting, using OCR with Tesseract and image processing to extract text from receipts.'
    ]
  }
];

const internships = [
  {
    type: 'internship',
    title: 'Software Engineer Intern',
    company: 'BITES - Defence & Aerospace Technologies',
    period: '06/2022 - 09/2022',
    description: [
      'Developed core modules for a major defense industry project.',
      'Worked on frontend and backend web development tasks.',
      'Gained hands-on experience with React.js and enterprise-level software development.',
      'Collaborated with cross-functional teams on mission-critical systems.'
    ]
  },
  {
    type: 'internship',
    title: 'Software Engineer Intern',
    company: 'T.C. Enerji ve Tabii Kaynaklar Bakanlığı',
    period: '07/2021 - 09/2021',
    description: [
      'Implemented MVC and MVVM architectural patterns for web applications.',
      'Developed backend integrations and REST API connections.',
      'Managed database operations with MySQL and Oracle.',
      'Contributed to government-scale enterprise applications.'
    ]
  }
];

const certifications = [
  {
    title: 'AI Coding & Machine Learning',
    issuer: 'Altın Kariyer Academy',
    period: '01/2024 - 05/2024'
  },
  {
    title: 'Drone Building & Image Processing',
    issuer: 'Altın Kariyer Academy',
    period: '03/2024 - 07/2024'
  },
  {
    title: 'C#, Object-Oriented Programming',
    issuer: 'Vektörel Bilişim',
    period: '06/2019'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">Experience</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              Career Journey
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

            {/* Work Experience */}
            <div className="mb-16">
              {/* Section Title - Positioned on the left side (opposite of content) */}
              <div className="relative mb-8">
                {/* Desktop: Title on left of timeline */}
                <div className="hidden md:flex absolute right-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-end gap-3">
                  <h3 className="text-xl font-display font-semibold">Work Experience</h3>
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                {/* Mobile: Title centered */}
                <div className="flex md:hidden items-center gap-3 pl-20">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-display font-semibold">Work Experience</h3>
                </div>
                {/* Timeline dot for section */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/50 ring-4 ring-primary/20" />
              </div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary neon-glow" />

                  {/* Content - Always on the right side */}
                  <div className="md:w-[calc(50%-2rem)] md:ml-auto glass-card rounded-2xl p-6 hover-lift">
                    <span className="text-xs font-mono text-primary">{exp.period}</span>
                    <h4 className="text-lg font-semibold mt-2">{exp.title}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Internships */}
            <div className="mb-16">
              {/* Section Title - Positioned on the left side (opposite of content) */}
              <div className="relative mb-8">
                {/* Desktop: Title on left of timeline */}
                <div className="hidden md:flex absolute right-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-end gap-3">
                  <h3 className="text-xl font-display font-semibold">Internships</h3>
                  <Building2 className="w-5 h-5" style={{ color: 'hsl(280, 80%, 60%)' }} />
                </div>
                {/* Mobile: Title centered */}
                <div className="flex md:hidden items-center gap-3 pl-20">
                  <Building2 className="w-5 h-5" style={{ color: 'hsl(280, 80%, 60%)' }} />
                  <h3 className="text-xl font-display font-semibold">Internships</h3>
                </div>
                {/* Timeline dot for section */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ring-4"
                  style={{ backgroundColor: 'hsl(280, 80%, 60%, 0.5)', boxShadow: '0 0 0 4px hsl(280, 80%, 60%, 0.2)' }} />
              </div>

              {internships.map((intern, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full"
                    style={{ backgroundColor: 'hsl(280, 80%, 60%)', boxShadow: '0 0 20px hsl(280, 80%, 60%, 0.4)' }} />

                  {/* Content - Always on the right side */}
                  <div className="md:w-[calc(50%-2rem)] md:ml-auto glass-card rounded-2xl p-6 hover-lift">
                    <span className="text-xs font-mono" style={{ color: 'hsl(280, 80%, 60%)' }}>{intern.period}</span>
                    <h4 className="text-lg font-semibold mt-2">{intern.title}</h4>
                    <p className="text-muted-foreground">{intern.company}</p>
                    <ul className="mt-4 space-y-2">
                      {intern.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'hsl(280, 80%, 60%)' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="mb-16">
              {/* Section Title - Positioned on the left side (opposite of content) */}
              <div className="relative mb-8">
                {/* Desktop: Title on left of timeline */}
                <div className="hidden md:flex absolute right-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-end gap-3">
                  <h3 className="text-xl font-display font-semibold">Education</h3>
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                {/* Mobile: Title centered */}
                <div className="flex md:hidden items-center gap-3 pl-20">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <h3 className="text-xl font-display font-semibold">Education</h3>
                </div>
                {/* Timeline dot for section */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-secondary/50 ring-4 ring-secondary/20" />
              </div>

              {education.map((edu, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-secondary"
                    style={{ boxShadow: '0 0 20px hsl(var(--secondary) / 0.4)' }} />

                  {/* Content - Always on the right side */}
                  <div className="md:w-[calc(50%-2rem)] md:ml-auto glass-card rounded-2xl p-6 hover-lift">
                    <span className="text-xs font-mono text-secondary">{edu.period}</span>
                    <h4 className="text-lg font-semibold mt-2">{edu.title}</h4>
                    <p className="text-muted-foreground">{edu.company}</p>
                    <ul className="mt-4 space-y-2">
                      {edu.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              {/* Section Title - Positioned on the left side (opposite of content) */}
              <div className="relative mb-8">
                {/* Desktop: Title on left of timeline */}
                <div className="hidden md:flex absolute right-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-end gap-3">
                  <h3 className="text-xl font-display font-semibold">Certifications</h3>
                  <Award className="w-5 h-5 text-primary" />
                </div>
                {/* Mobile: Title centered */}
                <div className="flex md:hidden items-center gap-3 pl-20">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-display font-semibold">Certifications</h3>
                </div>
                {/* Timeline dot for section */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/50 ring-4 ring-primary/20" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 pl-20 md:pl-0 md:ml-[calc(50%+1rem)] md:w-[calc(50%-2rem)]">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-5 hover-lift text-center"
                  >
                    <h4 className="font-medium text-sm">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-2">{cert.issuer}</p>
                    <p className="text-xs text-primary mt-1">{cert.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
