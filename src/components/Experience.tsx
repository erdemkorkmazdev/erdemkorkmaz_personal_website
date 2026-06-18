import { Briefcase, GraduationCap, Award, Building2 } from 'lucide-react';
import { useI18n } from '@/i18n/LanguageContext';
import ColorBends from '@/components/animations/ColorBends';

const Experience = () => {
  const { t } = useI18n();

  const experiences = [
    {
      type: 'work',
      title: t('experienceContent.enekom.title'),
      company: t('experienceContent.enekom.company'),
      period: t('experienceContent.enekom.period'),
      description: [
        t('experienceContent.enekom.desc1'),
        t('experienceContent.enekom.desc2'),
        t('experienceContent.enekom.desc3'),
        t('experienceContent.enekom.desc4')
      ]
    }
  ];

  const education = [
    {
      type: 'education',
      title: t('experienceContent.education.title'),
      company: t('experienceContent.education.company'),
      period: t('experienceContent.education.period'),
      description: [
        t('experienceContent.education.desc')
      ]
    }
  ];

  const internships = [
    {
      type: 'internship',
      title: t('experienceContent.bites.title'),
      company: t('experienceContent.bites.company'),
      period: t('experienceContent.bites.period'),
      description: [
        t('experienceContent.bites.desc1'),
        t('experienceContent.bites.desc2'),
        t('experienceContent.bites.desc3'),
        t('experienceContent.bites.desc4')
      ]
    },
    {
      type: 'internship',
      title: t('experienceContent.ministry.title'),
      company: t('experienceContent.ministry.company'),
      period: t('experienceContent.ministry.period'),
      description: [
        t('experienceContent.ministry.desc1'),
        t('experienceContent.ministry.desc2'),
        t('experienceContent.ministry.desc3'),
        t('experienceContent.ministry.desc4')
      ]
    }
  ];

  const certifications = [
    {
      title: t('experienceContent.cert1.title'),
      issuer: t('experienceContent.cert1.issuer'),
      period: t('experienceContent.cert1.period')
    },
    {
      title: t('experienceContent.cert2.title'),
      issuer: t('experienceContent.cert2.issuer'),
      period: t('experienceContent.cert2.period')
    },
    {
      title: t('experienceContent.cert3.title'),
      issuer: t('experienceContent.cert3.issuer'),
      period: t('experienceContent.cert3.period')
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ColorBends />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">{t('experience.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4">
              {t('experience.title')}
            </h2>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

            {/* Work Experience */}
            <div className="mb-16">
              <div className="relative mb-8">
                <div className="hidden md:flex absolute right-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-end gap-3">
                  <h3 className="text-xl font-display font-semibold">{t('experience.work')}</h3>
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex md:hidden items-center gap-3 pl-20 rtl:pr-20">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-display font-semibold">{t('experience.work')}</h3>
                </div>
              </div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  {/* Card Checkpoint */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_theme(colors.primary.DEFAULT)] z-10" />
                  <div className={`md:w-[calc(50%-2rem)] glass-card rounded-2xl p-6 hover-lift text-left rtl:text-right md:ml-auto`}>
                    <span className="text-xs font-mono text-primary">{exp.period.replace('Present', t('experience.present'))}</span>
                    <h4 className="text-lg font-semibold mt-2">{exp.title}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-left rtl:text-right">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Internships */}
            <div className="mb-16">
              <div className="relative mb-8">
                <div className="hidden md:flex absolute left-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-start gap-3">
                  <Building2 className="w-5 h-5" style={{ color: 'hsl(280, 80%, 60%)' }} />
                  <h3 className="text-xl font-display font-semibold">{t('experience.internships')}</h3>
                </div>
                <div className="flex md:hidden items-center gap-3 pl-20 rtl:pr-20">
                  <Building2 className="w-5 h-5" style={{ color: 'hsl(280, 80%, 60%)' }} />
                  <h3 className="text-xl font-display font-semibold">{t('experience.internships')}</h3>
                </div>
              </div>

              {internships.map((intern, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[hsl(280,80%,60%)] shadow-[0_0_10px_hsl(280,80%,60%)] z-10" />
                  <div className={`md:w-[calc(50%-2rem)] glass-card rounded-2xl p-6 hover-lift text-left rtl:text-right ${index === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}>
                    <span className="text-xs font-mono" style={{ color: 'hsl(280, 80%, 60%)' }}>{intern.period}</span>
                    <h4 className="text-lg font-semibold mt-2">{intern.title}</h4>
                    <p className="text-muted-foreground">{intern.company}</p>
                    <ul className="mt-4 space-y-2">
                      {intern.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'hsl(280, 80%, 60%)' }} />
                          <span className="text-left rtl:text-right">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Education - Title Right, Card Left */}
            <div className="mb-16">
              <div className="relative mb-8">
                {/* Title now on Right */}
                <div className="hidden md:flex absolute left-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-start gap-3">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <h3 className="text-xl font-display font-semibold">{t('experience.education')}</h3>
                </div>
                <div className="flex md:hidden items-center gap-3 pl-20 rtl:pr-20">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <h3 className="text-xl font-display font-semibold">{t('experience.education')}</h3>
                </div>
              </div>

              {education.map((edu, index) => (
                <div key={index} className="relative pl-20 md:pl-0 mb-12 last:mb-0">
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_theme(colors.secondary.DEFAULT)] z-10" />
                  {/* Card Left */}
                  <div className={`md:w-[calc(50%-2rem)] glass-card rounded-2xl p-6 hover-lift text-left rtl:text-right md:mr-auto`}>
                    <span className="text-xs font-mono text-secondary">{edu.period}</span>
                    <h4 className="text-lg font-semibold mt-2">{edu.title}</h4>
                    <p className="text-muted-foreground">{edu.company}</p>
                    <ul className="mt-4 space-y-2">
                      {edu.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          <span className="text-left rtl:text-right">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications (Grid remains, just keeping it consistent) */}
            <div>
              <div className="relative mb-8">
                <div className="hidden md:flex absolute right-[calc(50%+2rem)] w-[calc(50%-3rem)] items-center justify-end gap-3">
                  <h3 className="text-xl font-display font-semibold">{t('experience.certifications')}</h3>
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="flex md:hidden items-center gap-3 pl-20 rtl:pr-20">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-display font-semibold">{t('experience.certifications')}</h3>
                </div>
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
