import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BEFORE_AFTER_CONTENT } from '../constants';

interface BeforeAfterSectionProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {BEFORE_AFTER_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {BEFORE_AFTER_CONTENT.headline}
          </h2>
          <p className="text-sm text-[#5f6368]">
            {BEFORE_AFTER_CONTENT.subheadline}
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Before MSchool */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#fdf7f7] border border-[#f5c6cb] shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d93025]" />
                <h3 className="font-extrabold text-lg text-[#d93025]">
                  {BEFORE_AFTER_CONTENT.beforeLabel}
                </h3>
              </div>
              <p className="text-xs text-[#5f6368] mb-6">
                {BEFORE_AFTER_CONTENT.beforeSubtitle}
              </p>

              <ul className="space-y-3">
                {BEFORE_AFTER_CONTENT.beforeItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3c4043]">
                    <XCircle className="w-4 h-4 text-[#d93025] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#f5c6cb]/60 text-xs text-[#5f6368] italic">
              Result: Chasing records, administrative fatigue, and delayed decisions.
            </div>
          </motion.div>

          {/* With MSchool */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#f6fbf7] border border-[#ceead6] shadow-2xs flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-[#ceead6]">
              Modern School Standard
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e8e3e]" />
                <h3 className="font-extrabold text-lg text-[#137333]">
                  {BEFORE_AFTER_CONTENT.afterLabel}
                </h3>
              </div>
              <p className="text-xs text-[#5f6368] mb-6">
                {BEFORE_AFTER_CONTENT.afterSubtitle}
              </p>

              <ul className="space-y-3">
                {BEFORE_AFTER_CONTENT.afterItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#202124] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#ceead6] flex items-center justify-between">
              <span className="text-xs font-bold text-[#137333]">
                Zero paperwork lag from day one.
              </span>
              <button
                onClick={onOpenBooking}
                className="h-8 px-3.5 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Book a Free Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
