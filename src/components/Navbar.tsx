import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Smartphone, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { CTA_TEXTS, BRAND_CONFIG, NAV_ITEMS } from '../constants';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onNavigateToSimulator,
  activeSection 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-[#dadce0] shadow-sm' 
          : 'bg-white border-b border-[#f1f3f4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-[#1a73e8]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-[#202124]">
              {BRAND_CONFIG.name}
            </span>
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
              {BRAND_CONFIG.badge}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold'
                  : 'text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons - Pixel-perfect aligned with identical height, border box and baseline */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => onNavigateToSimulator('mschool')}
            className="h-9 px-3.5 rounded-full text-xs font-semibold text-[#1a73e8] bg-white hover:bg-[#f8fafd] border border-[#dadce0] hover:border-[#1a73e8] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>{CTA_TEXTS.LAUNCH_DEMO_SHORT}</span>
          </button>
          
          <button
            onClick={onOpenBooking}
            className="h-9 px-4 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] border border-transparent shadow-2xs transition-all inline-flex items-center justify-center gap-1 cursor-pointer active:scale-98 shrink-0"
          >
            <span>{CTA_TEXTS.START_FREE_PILOT}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="h-8 px-3 rounded-full text-xs font-semibold bg-[#1a73e8] text-white sm:hidden inline-flex items-center justify-center"
          >
            {CTA_TEXTS.START_FREE_PILOT_SHORT}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#dadce0] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#3c4043] hover:text-[#1a73e8] hover:bg-[#f8fafd]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#f1f3f4] space-y-2">
            <button
              onClick={() => {
                onNavigateToSimulator('mschool');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full border border-[#dadce0] text-[#1a73e8] font-medium text-sm text-center"
            >
              {CTA_TEXTS.TRY_DEMO}
            </button>
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm text-center shadow-xs"
            >
              {CTA_TEXTS.START_FREE_PILOT}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
