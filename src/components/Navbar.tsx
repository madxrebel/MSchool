import React, { useState, useEffect } from 'react';
import { ChevronRight, LogIn } from 'lucide-react';
import { CTA_TEXTS, PORTAL_URL } from '../constants';
import logo from '../assets/brand/logo.png';
import logoWhite from '../assets/brand/logo-white.png';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToSimulator?: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#dadce0] shadow-xs'
          : 'bg-white border-b border-[#f1f3f4]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Identity */}
        <a href="#overview" className="group shrink-0" aria-label="MSchool Pakistan, back to top">
          <img
            src={logo}
            alt="MSchool Pakistan"
            draggable={false}
            className="logo-on-light h-11 sm:h-12 w-auto group-hover:scale-[1.03] transition-transform"
          />
          <img
            src={logoWhite}
            alt=""
            aria-hidden
            draggable={false}
            className="logo-on-dark h-11 sm:h-12 w-auto group-hover:scale-[1.03] transition-transform"
          />
        </a>

        {/* Login + single CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={PORTAL_URL}
            className="h-10 px-3.5 sm:px-5 rounded-full text-sm font-semibold text-[#1a73e8] bg-white border-2 border-[#1a73e8] hover:bg-[#e8f0fe] shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-1.5 shrink-0 active:scale-98"
          >
            <LogIn className="w-4 h-4" />
            <span>{CTA_TEXTS.LOGIN}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="h-10 px-3.5 sm:px-5 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-1 cursor-pointer active:scale-98 shrink-0"
          >
            <span className="sm:hidden">{CTA_TEXTS.BOOK_DEMO_SHORT}</span>
            <span className="hidden sm:inline">{CTA_TEXTS.BOOK_FREE_DEMO}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
