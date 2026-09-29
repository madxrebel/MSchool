import React from 'react';
import { PilotRequestForm } from './PilotRequestForm';
import { DEMO_FORM_CONFIG, BRAND_CONFIG, CTA_TEXTS } from '../constants';
import { ShieldCheck, MessageSquare, Phone, CalendarCheck, Check } from 'lucide-react';

export const FinalDemoSection: React.FC = () => {
  return (
    <section id="book-demo" className="py-16 sm:py-22 bg-[#f8f9fa] text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
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

        {/* 3-Step Low Risk Process Bar (What happens after you click) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {DEMO_FORM_CONFIG.steps.map((step, idx) => (
            <div 
              key={idx}
              className="p-4.5 rounded-2xl bg-white border border-[#dadce0] shadow-2xs flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[#e8f0fe] text-[#1a73e8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.step}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs sm:text-sm text-[#202124]">{step.title}</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* High Converting Form Card */}
        <div className="bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          
          <div className="mb-6 border-b border-[#f1f3f4] pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
              <h3 className="text-lg sm:text-xl font-extrabold text-[#202124]">
                {DEMO_FORM_CONFIG.cardTitle}
              </h3>
            </div>
            <p className="text-xs text-[#5f6368]">
              {DEMO_FORM_CONFIG.cardSubtitle}
            </p>
          </div>

          <PilotRequestForm source="Final Sales Page Section" />

          {/* Reassurance Checklist */}
          <div className="mt-6 pt-4 border-t border-[#f1f3f4] grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#5f6368]">
            <div className="flex items-center gap-1.5 font-medium text-[#202124]">
              <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
              <span>Zero sales pressure</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[#202124]">
              <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
              <span>15 minutes tailored demo</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[#202124]">
              <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
              <span>No credit card or contract</span>
            </div>
          </div>

          {/* Direct WhatsApp / Phone alternative */}
          <div className="mt-6 pt-4 border-t border-[#f1f3f4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5f6368]">
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
