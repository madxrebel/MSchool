import React from 'react';
import { School, CheckCircle2, MapPin, Quote } from 'lucide-react';
import { PARTNER_SCHOOLS } from '../data/mockData';

export const PartnersAndStory: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-20 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] block">
              Educational Heritage
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#202124] tracking-tight">
              Built by educators, <br />
              <span className="text-[#1a73e8]">
                for real classrooms.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              Our roots are in school leadership. Running institutions ourselves, we experienced first-hand the daily frustrations of lost paper fee registers, billing disputes, chaotic morning attendance, and software that froze at the counter.
            </p>

            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              We engineered MSchool to solve these real-world challenges: rapid 15-second attendance sweeps, instant zero-wait fee processing, physical 58mm thermal receipts, printed early-childhood textbooks with playful tablet games, and active WhatsApp parent communication.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1a73e8]">20+</div>
                <div className="text-xs text-[#5f6368] font-medium">Partner Schools</div>
              </div>
              <div className="w-[1px] h-10 bg-[#dadce0]" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#f29900]">25,000+</div>
                <div className="text-xs text-[#5f6368] font-medium">Students Enrolled</div>
              </div>
              <div className="w-[1px] h-10 bg-[#dadce0]" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1e8e3e]">99.98%</div>
                <div className="text-xs text-[#5f6368] font-medium">Fee Accuracy</div>
              </div>
            </div>
          </div>

          {/* Testimonial Card (Google Workspace Style) */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#f8fafd] border border-[#d2e3fc] shadow-xs relative">
              <Quote className="w-8 h-8 text-[#1a73e8]/15 absolute top-6 right-6" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center font-bold text-sm">
                  WK
                </div>
                <div>
                  <div className="font-bold text-[#202124] text-sm">Wali Khan</div>
                  <div className="text-xs text-[#1a73e8]">Principal & Campus Administrator</div>
                </div>
              </div>

              <p className="text-[#3c4043] text-sm leading-relaxed italic mb-4">
                “When hundreds of parents visit the fee counter on the 10th of the month, you cannot afford slow screens. MSchool prints receipts in two seconds and updates balances with zero errors. It has completely transformed our counter operations.”
              </p>

              <div className="pt-3 border-t border-[#d2e3fc] flex items-center justify-between text-xs text-[#5f6368]">
                <span>Verified Partner Campus</span>
                <span className="text-[#137333] font-semibold bg-[#e6f4ea] px-2 py-0.5 rounded-full">1,450 Students</span>
              </div>
            </div>
          </div>

        </div>

        {/* Partner Schools Grid */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#202124]">Trusted by partner institutions</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PARTNER_SCHOOLS.map((school, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] transition-colors"
              >
                <div className="text-xs font-bold text-[#202124] truncate mb-1">
                  {school.name}
                </div>
                <div className="text-[11px] text-[#5f6368] flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-[#d93025] shrink-0" />
                  <span>{school.city}</span>
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
