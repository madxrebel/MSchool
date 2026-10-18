import React from 'react';
import { GraduationCap } from 'lucide-react';
import { CTA_TEXTS, BRAND_CONFIG, PORTAL_URL } from '../constants';

interface FooterProps {
  onOpenBooking?: () => void;
  onNavigateToSimulator?: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

const COLUMN_HEADING = 'text-sm text-white/45 mb-4';
const LINK = 'text-base text-white hover:text-[#8ab4f8] transition-colors';

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#1b1c1f] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-white/10 text-[#8ab4f8] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </span>
              <span className="text-2xl font-extrabold tracking-tight">{BRAND_CONFIG.name}</span>
            </div>
            <p className="mt-6 text-lg leading-snug text-white/50">
              We turn everyday school work into one simple system, built by school owners who run schools themselves.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-10 lg:gap-x-16">
            <div>
              <div className={COLUMN_HEADING}>Menu</div>
              <ul className="space-y-3">
                <li><a href="#overview" className={LINK}>Home</a></li>
                <li><a href="#principal-story" className={LINK}>Real stories</a></li>
                <li><a href="#case-study" className={LINK}>Our story</a></li>
                <li><a href="#faq" className={LINK}>FAQ</a></li>
              </ul>
            </div>

            <div>
              <div className={COLUMN_HEADING}>Contact</div>
              <ul className="space-y-3">
                <li><a href="tel:03358009786" className={LINK}>{BRAND_CONFIG.supportPhoneDisplay}</a></li>
                <li>
                  <a href={BRAND_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className={COLUMN_HEADING}>Account</div>
              <ul className="space-y-3">
                <li><a href={PORTAL_URL} className={LINK}>Login</a></li>
                {onOpenBooking && (
                  <li>
                    <button onClick={onOpenBooking} className={`${LINK} cursor-pointer text-left`}>
                      {CTA_TEXTS.BOOK_FREE_DEMO}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Embossed wordmark: an SVG so it always spans the full width exactly */}
        <svg
          viewBox="0 0 800 150"
          className="w-full mt-16 sm:mt-20 select-none"
          style={{ filter: 'drop-shadow(0 -1px 0 rgba(255,255,255,0.07)) drop-shadow(0 3px 3px rgba(0,0,0,0.75))' }}
          role="img"
          aria-label="MSchool"
        >
          <text
            x="0"
            y="132"
            textLength="800"
            lengthAdjust="spacingAndGlyphs"
            fontSize="168"
            fontWeight="800"
            fill="#25272b"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            MSCHOOL
          </text>
        </svg>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/45">
          <span>{new Date().getFullYear()} © MSchool</span>
          <span>Built by school owners since 2000</span>
        </div>
      </div>
    </footer>
  );
};
