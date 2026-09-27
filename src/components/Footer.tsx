import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ChevronRight 
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigateToSimulator }) => {
  return (
    <footer className="bg-[#f8f9fa] text-[#5f6368] border-t border-[#dadce0] text-xs">
      
      {/* Top Pre-Footer Callout (Google Workspace Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="bg-[#f8fafd] border border-[#d2e3fc] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1a73e8]">
              Get Started with MSchool
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#202124]">
              Ready to transform your school's daily administration?
            </h3>
            <p className="text-sm text-[#5f6368]">
              Join 20+ partner institutions and experience zero-lag school operations.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-xs whitespace-nowrap cursor-pointer transition-all active:scale-98 flex items-center gap-1.5"
          >
            <span>Start Free 30-Day Pilot</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#202124] tracking-tight">MSchool</span>
                <span className="text-[10px] uppercase font-semibold text-[#1a73e8] px-2 py-0.5 rounded-full bg-[#e8f0fe]">
                  Workspace
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5f6368] leading-relaxed max-w-sm">
              “Empowering Educators, Simplifying Administration.” Complete school management and early childhood learning suite trusted by over 20 institutions.
            </p>

            <div className="text-[11px] text-[#5f6368] space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <span>Support & WhatsApp: 0335-8009786</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <span>inquiries@mschoolecosystem.com</span>
              </div>
            </div>
          </div>

          {/* Ecosystem Products */}
          <div className="space-y-2.5">
            <div className="font-bold text-[#202124] uppercase text-[11px] tracking-wider">
              Ecosystem Products
            </div>
            <ul className="space-y-2 text-xs text-[#5f6368]">
              <li>
                <button 
                  onClick={() => onNavigateToSimulator('mschool')}
                  className="hover:text-[#1a73e8] cursor-pointer transition-colors"
                >
                  MSchool Core Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSimulator('mkids')}
                  className="hover:text-[#b06000] cursor-pointer transition-colors"
                >
                  mKids Early Learning Suite
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSimulator('mschool')}
                  className="hover:text-[#137333] cursor-pointer transition-colors"
                >
                  mAttendance High-Speed Sweep
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSimulator('mschool')}
                  className="hover:text-[#c5221f] cursor-pointer transition-colors"
                >
                  Maymar Academy Parent App
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSimulator('thermal')}
                  className="hover:text-[#1a73e8] cursor-pointer transition-colors"
                >
                  58mm Thermal Printer Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-2.5">
            <div className="font-bold text-[#202124] uppercase text-[11px] tracking-wider">
              School Pilot
            </div>
            <p className="text-xs text-[#5f6368]">
              Request a free 30-day evaluation for your school or book a guided demonstration.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#f1f3f4] text-[#1a73e8] border border-[#dadce0] font-semibold text-xs cursor-pointer transition-colors"
              >
                Request Free Pilot
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#5f6368] text-[11px]">
          <div>
            &copy; 2026 MSchool Ecosystem. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for educators and schools</span>
            <Heart className="w-3 h-3 text-[#d93025] fill-[#d93025]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
