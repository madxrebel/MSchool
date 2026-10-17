import React from 'react';
import { GraduationCap, Phone, MessageCircle, LogIn } from 'lucide-react';
import { BRAND_CONFIG, PORTAL_URL } from '../constants';

interface FooterProps {
  onOpenBooking?: () => void;
  onNavigateToSimulator?: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#202124] text-white/70 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-[#8ab4f8] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight">{BRAND_CONFIG.name}</div>
              <div className="text-xs text-white/60">Built by school owners since 2000.</div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="tel:03358009786"
              className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#8ab4f8]" />
              {BRAND_CONFIG.supportPhoneDisplay}
            </a>
            <a
              href={BRAND_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-full bg-[#1e8e3e] hover:bg-[#188038] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={PORTAL_URL}
              className="h-10 px-4 rounded-full border border-white/20 hover:border-white/40 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </a>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 text-center text-[11px] text-white/50">
          © {new Date().getFullYear()} MSchool. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
