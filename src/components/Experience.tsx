import { Briefcase, GraduationCap, Award } from 'lucide-react';

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
              <div className="flex items-center gap-3 mb-8 md:justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-display font-semibold">Work Experience</h3>
              </div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary neon-glow" />
                  
                  <div className="md:w-[calc(50%-2rem)] md:ml-auto glass rounded-2xl p-6 hover-lift">
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

            {/* Education */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8 md:justify-center">
                <GraduationCap className="w-5 h-5 text-secondary" />
                <h3 className="text-xl font-display font-semibold">Education</h3>
              </div>

              {education.map((edu, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-secondary" 
                       style={{ boxShadow: '0 0 20px hsl(var(--secondary) / 0.4)' }} />
                  
                  <div className="md:w-[calc(50%-2rem)] glass rounded-2xl p-6 hover-lift">
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
              <div className="flex items-center gap-3 mb-8 md:justify-center">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-display font-semibold">Certifications</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:pl-0">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="glass rounded-xl p-5 hover-lift text-center"
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
