import React from 'react';
import { School, MapPin, Quote } from 'lucide-react';
import { PARTNER_SCHOOLS } from '../data/mockData';

export const PartnersAndStory: React.FC = () => {
  return (
    <section id="story" className="py-14 sm:py-18 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section - Streamlined, low-text presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          <div className="lg:col-span-6 space-y-3.5">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] block">
              Proven in Real Schools
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
              Engineered by educators, <br />
              <span className="text-[#1a73e8]">
                built for high-speed counters.
              </span>
            </h2>

            <p className="text-sm text-[#5f6368] leading-relaxed">
              Designed specifically to eliminate rush-hour fee lines, paper register bottlenecks, and lost receipts. Powered by instant Bluetooth thermal slips, 15-second attendance, and direct WhatsApp communication.
            </p>

            <div className="pt-2 flex items-center gap-5">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#1a73e8]">20+</div>
                <div className="text-[11px] text-[#5f6368] font-medium">Partner Campuses</div>
              </div>
              <div className="w-[1px] h-8 bg-[#dadce0]" />
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#f29900]">25k+</div>
                <div className="text-[11px] text-[#5f6368] font-medium">Active Students</div>
              </div>
              <div className="w-[1px] h-8 bg-[#dadce0]" />
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#1e8e3e]">99.98%</div>
                <div className="text-[11px] text-[#5f6368] font-medium">Fee Accuracy</div>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="lg:col-span-6">
            <div className="p-5 sm:p-7 rounded-2xl bg-[#f8fafd] border border-[#d2e3fc] shadow-2xs relative">
              <Quote className="w-7 h-7 text-[#1a73e8]/15 absolute top-5 right-5" />
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold text-xs">
                  WK
                </div>
                <div>
                  <div className="font-bold text-[#202124] text-xs sm:text-sm">Wali Khan</div>
                  <div className="text-[11px] text-[#1a73e8]">Principal & Campus Administrator</div>
                </div>
              </div>

              <p className="text-[#3c4043] text-xs sm:text-sm leading-relaxed italic mb-3">
                “When hundreds of parents visit the fee counter on peak days, you cannot afford frozen software. MSchool prints 58mm thermal receipts in two seconds and updates balances with zero errors.”
              </p>

              <div className="pt-2.5 border-t border-[#d2e3fc] flex items-center justify-between text-[11px] text-[#5f6368]">
                <span>Verified Partner Campus</span>
                <span className="text-[#137333] font-semibold bg-[#e6f4ea] px-2 py-0.5 rounded-full">1,450 Students</span>
              </div>
            </div>
          </div>

        </div>

        {/* Partner Schools Grid */}
        <div>
          <div className="text-center mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#5f6368]">Trusted by partner institutions</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {PARTNER_SCHOOLS.map((school, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] transition-colors"
              >
                <div className="text-xs font-bold text-[#202124] truncate mb-0.5">
                  {school.name}
                </div>
                <div className="text-[11px] text-[#5f6368] flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-[#d93025] shrink-0" />
                  <span className="truncate">{school.city}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#1a73e8] font-medium pt-1 border-t border-[#dadce0]">
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
