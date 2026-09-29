import React from 'react';
import { PilotRequestForm } from './PilotRequestForm';
import { DEMO_FORM_CONFIG, BRAND_CONFIG } from '../constants';
import { ShieldCheck, MessageSquare, Phone } from 'lucide-react';

export const FinalDemoSection: React.FC = () => {
  return (
    <section id="book-demo" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {DEMO_FORM_CONFIG.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {DEMO_FORM_CONFIG.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            {DEMO_FORM_CONFIG.subheadline}
          </p>
        </div>

        {/* High Converting Form Card */}
        <div className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          
          <div className="mb-6 border-b border-[#f1f3f4] pb-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#202124]">
              {DEMO_FORM_CONFIG.cardTitle}
            </h3>
            <p className="text-xs text-[#5f6368] mt-1">
              {DEMO_FORM_CONFIG.cardSubtitle}
            </p>
          </div>

          <PilotRequestForm source="Final Sales Page Section" />

          {/* Direct WhatsApp / Phone alternative */}
          <div className="mt-8 pt-5 border-t border-[#f1f3f4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5f6368]">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>Direct helpline: <strong>{BRAND_CONFIG.supportPhoneDisplay}</strong></span>
            </div>

            <a
              href={BRAND_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#137333] hover:text-[#0d5324] font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Prefer WhatsApp? Message us directly</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
