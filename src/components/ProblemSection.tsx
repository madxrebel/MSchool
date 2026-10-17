import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="problems" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The Recognition Moment & Callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#e8f0fe]/70 border border-[#d2e3fc] shadow-2xs flex flex-col justify-between"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block">
              Your School Is Next
            </span>
            <h4 className="text-lg sm:text-2xl font-bold text-[#202124]">
              These schools stopped chasing paperwork. Yours can too.
            </h4>
            <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
              Attendance ready by 8:40. Result cards in one click. Every teacher on their own phone. We will show you how MSchool fits your school’s mornings, in a free 15-minute walkthrough.
            </p>
          </div>

          <div className="pt-4 mt-4 flex items-center justify-between gap-4 border-t border-[#d2e3fc]">
            <span className="text-xs font-semibold text-[#1a73e8]">
              Fees, attendance, exams and expenses, all in one connected system.
            </span>
            <button
              onClick={onOpenBooking}
              className="h-8 px-3.5 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>See It in Your School</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
