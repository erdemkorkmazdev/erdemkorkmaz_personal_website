import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/i18n/LanguageContext';
import { Language, languageNames } from '@/i18n/translations';

const LanguageSwitcher = () => {
  const { language, setLanguage, dir } = useI18n();

  const languages: Language[] = ['en', 'tr', 'de', 'ar'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)'
          }}
          aria-label="Change language"
        >
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dir === 'rtl' ? 'start' : 'end'}
        className="w-40"
        style={{
          background: 'rgba(var(--card-rgb, 20, 20, 25), 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className="flex items-center justify-between cursor-pointer hover:bg-white/5"
          >
            <span className="text-sm">{languageNames[lang]}</span>
            {language === lang && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
