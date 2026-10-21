import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { CTA_TEXTS, BRAND_CONFIG, PORTAL_URL, SOCIAL_LINKS } from '../constants';
import logo from '../assets/brand/logo.png';
import logoEmboss from '../assets/brand/logo-emboss.png';

interface FooterProps {
  onOpenBooking?: () => void;
  onNavigateToSimulator?: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
  /** Set to '/' on pages other than the home page so the menu links point back to it */
  homeBase?: string;
}

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SocialButton: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center transition-all hover:-translate-y-0.5"
  >
    {children}
  </a>
);

const COLUMN_HEADING = 'text-sm text-white/45 mb-4';
const LINK = 'text-base text-white hover:text-[#8ab4f8] transition-colors';

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, homeBase = '' }) => {
  return (
    <footer className="bg-[#1b1c1f] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <img src={logo} alt="MSchool Pakistan" draggable={false} className="h-20 sm:h-24 w-auto" />
            <p className="mt-6 text-lg leading-snug text-white/50">
              We turn everyday school work into one simple system, built by school owners who run schools themselves.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10 lg:gap-x-12">
            <div>
              <div className={COLUMN_HEADING}>Menu</div>
              <ul className="space-y-3">
                <li><a href={`${homeBase}#overview`} className={LINK}>Home</a></li>
                <li><a href={`${homeBase}#principal-story`} className={LINK}>Real stories</a></li>
                <li><a href={`${homeBase}#case-study`} className={LINK}>Our story</a></li>
                <li><a href={`${homeBase}#faq`} className={LINK}>FAQ</a></li>
              </ul>
            </div>

            <div>
              <div className={COLUMN_HEADING}>Contact</div>
              <ul className="space-y-3">
                <li><a href={`tel:${BRAND_CONFIG.supportPhoneTel}`} className={LINK}>{BRAND_CONFIG.supportPhoneDisplay}</a></li>
                <li>
                  <a href={BRAND_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {Object.values(SOCIAL_LINKS).some(Boolean) && (
              <div>
                <div className={COLUMN_HEADING}>Social</div>
                <div className="flex flex-wrap gap-2.5">
                  {SOCIAL_LINKS.facebook && (
                    <SocialButton href={SOCIAL_LINKS.facebook} label="MSchool on Facebook">
                      <Facebook className="w-5 h-5" />
                    </SocialButton>
                  )}
                  {SOCIAL_LINKS.instagram && (
                    <SocialButton href={SOCIAL_LINKS.instagram} label="MSchool on Instagram">
                      <Instagram className="w-5 h-5" />
                    </SocialButton>
                  )}
                  {SOCIAL_LINKS.tiktok && (
                    <SocialButton href={SOCIAL_LINKS.tiktok} label="MSchool on TikTok">
                      <TikTokIcon className="w-5 h-5" />
                    </SocialButton>
                  )}
                </div>
              </div>
            )}

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

        {/* The real logo, large and embossed into the footer (tonal, brand-tinted) */}
        <img
          src={logoEmboss}
          alt=""
          aria-hidden
          draggable={false}
          className="mx-auto mt-14 sm:mt-16 w-full max-w-[560px] select-none pointer-events-none"
          style={{ filter: 'drop-shadow(0 -1px 0 rgba(255,255,255,0.09)) drop-shadow(0 4px 4px rgba(0,0,0,0.8))' }}
        />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/45">
          <span>{new Date().getFullYear()} © MSchool Pakistan</span>
          <span>Built by school owners since 2000</span>
        </div>
      </div>
    </footer>
  );
};
