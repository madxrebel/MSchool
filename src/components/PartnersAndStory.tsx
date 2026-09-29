import React from 'react';
import { School, MapPin, Quote, Building2, CheckCircle2 } from 'lucide-react';
import { PARTNER_SCHOOLS } from '../data/mockData';
import { TRUST_ORIGIN_CONTENT } from '../constants';

export const PartnersAndStory: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-20 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Origin Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] block">
              {TRUST_ORIGIN_CONTENT.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202124] tracking-tight">
              {TRUST_ORIGIN_CONTENT.headline}
            </h2>

            <p className="text-sm sm:text-base font-semibold text-[#202124] leading-relaxed">
              {TRUST_ORIGIN_CONTENT.leadText}
            </p>

            <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
              {TRUST_ORIGIN_CONTENT.bodyText}
            </p>

            <div className="p-4 rounded-xl bg-[#e8f0fe]/60 border border-[#d2e3fc] flex items-center gap-3.5">
              <div className="text-2xl sm:text-3xl font-black text-[#1a73e8]">
                {TRUST_ORIGIN_CONTENT.proofNumber}
              </div>
              <div className="text-xs font-semibold text-[#202124]">
                {TRUST_ORIGIN_CONTENT.proofLabel}
              </div>
            </div>

            <p className="text-xs font-semibold text-[#1a73e8] pt-1">
              {TRUST_ORIGIN_CONTENT.groundedMessage}
            </p>
          </div>

          {/* Testimonial / Administrator Quote Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#f8fafd] border border-[#d2e3fc] shadow-xs relative">
              <Quote className="w-8 h-8 text-[#1a73e8]/15 absolute top-6 right-6" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] flex items-center justify-center font-bold text-sm">
                  WK
                </div>
                <div>
                  <div className="font-bold text-[#202124] text-sm">{TRUST_ORIGIN_CONTENT.quoteAuthor}</div>
                  <div className="text-xs text-[#1a73e8]">{TRUST_ORIGIN_CONTENT.quoteRole}</div>
                </div>
              </div>

              <p className="text-[#3c4043] text-xs sm:text-sm leading-relaxed italic mb-4">
                {TRUST_ORIGIN_CONTENT.quote}
              </p>

              <div className="pt-3 border-t border-[#d2e3fc] flex items-center justify-between text-xs text-[#5f6368]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1e8e3e]" />
                  Active In Campus Front Desk
                </span>
                <span className="text-[#137333] font-semibold bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                  1,450 Enrolled Students
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Partner Schools Grid */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5f6368]">
              Active across partner institutions in Pakistan
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PARTNER_SCHOOLS.map((school, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] transition-colors"
              >
                <div className="text-xs font-bold text-[#202124] truncate mb-0.5">
                  {school.name}
                </div>
                <div className="text-[11px] text-[#5f6368] flex items-center gap-1 mb-1.5">
                  <MapPin className="w-3 h-3 text-[#d93025] shrink-0" />
                  <span className="truncate">{school.city}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#1a73e8] font-medium pt-1.5 border-t border-[#dadce0]">
                  <span>{school.students} Students</span>
                  <span className="text-[#5f6368]">{school.tenure}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
