import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getTheme, setTheme, type Theme } from '../lib/theme';

export const ThemeToggle: React.FC = () => {
  const [theme, setThemeState] = useState<Theme>(getTheme);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        setThemeState(next);
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-[#dadce0] text-[#5f6368] hover:text-[#202124] hover:border-[#bdc1c6] transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer"
    >
      {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
};
