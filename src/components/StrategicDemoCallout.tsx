import React from 'react';
import { MessageSquare, Calendar, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG, CTA_TEXTS } from '../constants';

interface StrategicDemoCalloutProps {
  onOpenBooking: () => void;
}

export const StrategicDemoCallout: React.FC<StrategicDemoCalloutProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-14 sm:py-18 bg-[#1a73e8] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem] -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <span className="text-xs font-bold uppercase tracking-wider text-[#d2e3fc] mb-2 block">
          Practical Live Walkthrough
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          See MSchool running a real school.
        </h2>

        <p className="text-sm sm:text-base text-[#e8f0fe] max-w-2xl mx-auto leading-relaxed mb-8">
          Bring your principal, accountant or administrator. We’ll show you how MSchool fits into your school’s daily operations without any setup hassle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto h-11.5 px-6 rounded-full text-sm font-semibold text-[#1a73e8] bg-white hover:bg-[#f8fafd] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Calendar className="w-4 h-4 text-[#1a73e8]" />
            <span>{CTA_TEXTS.BOOK_DEMO}</span>
          </button>

          <a
            href={BRAND_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-11.5 px-6 rounded-full text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{CTA_TEXTS.TALK_WHATSAPP}</span>
          </a>
        </div>

        <p className="text-xs text-[#d2e3fc] mt-4 font-normal">
          Direct local support from Karachi • Phone & WhatsApp: {BRAND_CONFIG.supportPhoneDisplay}
        </p>

      </div>
    </section>
  );
};
