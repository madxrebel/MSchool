import React, { useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { CTA_TEXTS, PRICING_CONFIG } from '../constants';

interface PricingCalculatorProps {
  onOpenBooking: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenBooking }) => {
  const [studentCount, setStudentCount] = useState<number>(650);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const perStudentRate = billingCycle === 'annual' ? 12 : 15;
  const monthlyCost = Math.round(studentCount * perStudentRate);
  const annualSavings = billingCycle === 'annual' ? Math.round(studentCount * 3 * 12) : 0;

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {PRICING_CONFIG.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] mb-3">
            {PRICING_CONFIG.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            {PRICING_CONFIG.subtitle}
          </p>

          {/* Billing Cycle Toggle (Google Workspace Style) */}
          <div className="mt-5 inline-flex p-1 rounded-full bg-white border border-[#dadce0] shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#f1f3f4] text-[#202124]' : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              Monthly Plan
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-[#1a73e8] text-white shadow-xs' : 'text-[#5f6368] hover:text-[#202124]'
              }`}
            >
              <span>Annual Payment</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-[#e8f0fe] text-[#1a73e8]'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Calculator Card */}
        <div className="bg-white rounded-3xl border border-[#dadce0] p-6 sm:p-10 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Slider */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-[#3c4043]">
                    Active Student Enrollment:
                  </label>
                  <span className="text-xl sm:text-2xl font-bold text-[#1a73e8]">
                    {studentCount.toLocaleString()} Students
                  </span>
                </div>

                <input
                  type="range"
                  min={150}
                  max={3000}
                  step={50}
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#e8eaed] rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
                />

                <div className="flex justify-between text-[11px] text-[#5f6368] font-medium mt-1">
                  <span>150 Students</span>
                  <span>1,500 Students</span>
                  <span>3,000+ Students</span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-2.5 text-xs text-[#3c4043] border-t border-[#f1f3f4] pt-4">
                <div className="font-semibold text-[11px] uppercase tracking-wider text-[#1a73e8] mb-1">
                  Included in Every School Plan:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                    <span>Complete MSchool Android Suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                    <span>58mm Thermal Bluetooth Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                    <span>mAttendance High-Speed Sweep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                    <span>Maymar Parent App & WhatsApp Slips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                    <span>Free Staff Training & Onboarding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                    <span>Real-time Cloud Sync & Backups</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Calculated Price Card */}
            <div className="lg:col-span-5 bg-[#f8fafd] p-6 rounded-2xl border border-[#d2e3fc] text-center space-y-4">
              <span className="text-[11px] uppercase font-bold text-[#5f6368] tracking-wider">
                Estimated Subscription
              </span>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#202124]">
                  Rs. {monthlyCost.toLocaleString()}
                  <span className="text-sm font-normal text-[#5f6368]"> / mo</span>
                </div>
                <div className="text-xs text-[#1a73e8] font-semibold mt-1">
                  ~Rs. {perStudentRate} per student / month
                </div>
              </div>

              {annualSavings > 0 && (
                <div className="p-2 rounded-xl bg-[#e6f4ea] border border-[#ceead6] text-[#137333] text-xs font-semibold">
                  Annual plan saves Rs. {annualSavings.toLocaleString()} / year
                </div>
              )}

              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
              >
                <span>{CTA_TEXTS.START_FREE_PILOT}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
