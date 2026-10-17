import React from 'react';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MessageSquare,
  ChevronRight,
  ShieldCheck 
} from 'lucide-react';
import { CTA_TEXTS, BRAND_CONFIG } from '../constants';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigateToSimulator }) => {
  return (
    <footer className="bg-[#f8f9fa] text-[#5f6368] border-t border-[#dadce0] text-xs">
      
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Direct Contact */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#202124] tracking-tight">{BRAND_CONFIG.name}</span>
                <span className="text-[10px] uppercase font-semibold text-[#1a73e8] px-2 py-0.5 rounded-full bg-[#e8f0fe]">
                  {BRAND_CONFIG.badge}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5f6368] leading-relaxed max-w-sm">
              School management software engineered for the operational realities of Pakistani schools. Trusted by {BRAND_CONFIG.trustClaim}.
            </p>

            <div className="text-[11px] text-[#5f6368] space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <span>Direct Support: <a href="tel:03358009786" className="text-[#202124] font-medium hover:underline">{BRAND_CONFIG.supportPhoneDisplay}</a></span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#137333] shrink-0" />
                <a href={BRAND_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#137333] font-medium hover:underline">
                  Chat with us on WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <span>{BRAND_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <div className="font-bold text-[#202124] uppercase text-[11px] tracking-wider">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#5f6368]">
              <li>
                <a href="#overview" className="hover:text-[#1a73e8] transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#problems" className="hover:text-[#1a73e8] transition-colors">
                  Problems We Solve
                </a>
              </li>
              <li>
                <a href="#interactive-demo" className="hover:text-[#1a73e8] transition-colors">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href="#outcomes" className="hover:text-[#1a73e8] transition-colors">
                  Outcomes & Capabilities
                </a>
              </li>
              <li>
                <a href="#proof" className="hover:text-[#1a73e8] transition-colors">
                  Real Product Screens
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#1a73e8] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="space-y-3">
            <div className="font-bold text-[#202124] uppercase text-[11px] tracking-wider">
              Get Started
            </div>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              Book a free walkthrough for your principal, accountant, or school owner.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full h-10 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>{CTA_TEXTS.BOOK_DEMO}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#5f6368]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>Built by school owners since 2000 • Used daily by partner schools</span>
          </div>

          <div>
            © {new Date().getFullYear()} MSchool Ecosystem. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
