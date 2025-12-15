import { Github, Linkedin, Mail } from 'lucide-react';
import DockComponent from './animations/Dock';

const SocialDock = () => {
  const items = [
    {
      icon: <Github className="w-6 h-6 text-foreground" />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/erdemkorkmazdev', '_blank')
    },
    {
      icon: <Linkedin className="w-6 h-6 text-foreground" />,
      label: 'LinkedIn',
      onClick: () => window.open('https://linkedin.com/in/erdem-korkmaz-14a3b91b4', '_blank')
    },
    {
      icon: <Mail className="w-6 h-6 text-foreground" />,
      label: 'Email',
      onClick: () => window.location.href = 'mailto:erdemkorkmaz06@gmail.com'
    }
  ];

  return <DockComponent items={items} />;
};

export default SocialDock;
