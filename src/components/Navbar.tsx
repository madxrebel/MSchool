import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Smartphone, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

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

  const navItems = [
    { id: 'ecosystem', label: 'Ecosystem Suite' },
    { id: 'simulator', label: 'Live App Demo' },
    { id: 'portals', label: '12 School Portals' },
    { id: 'features', label: 'Platform Advantage' },
    { id: 'pricing', label: 'Transparent Pricing' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-[#dadce0] shadow-sm' 
          : 'bg-white border-b border-[#f1f3f4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Identity - Google Workspace inspired clean logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-[#1a73e8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#202124]">
                MSchool
              </span>
              <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]">
                Workspace
              </span>
            </div>
            <p className="text-[11px] text-[#5f6368] font-normal hidden sm:block">
              Integrated School OS & Learning Suite
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold'
                  : 'text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => onNavigateToSimulator('mschool')}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#1a73e8] hover:bg-[#f8fafd] border border-[#dadce0] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#1a73e8]" />
            <span>Interactive Demo</span>
          </button>
          
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <span>Start Free 30-Day Pilot</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a73e8] text-white sm:hidden"
          >
            Get Pilot
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#dadce0] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
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
              Launch Live App Demo
            </button>
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm text-center shadow-xs"
            >
              Start Free 30-Day School Pilot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
