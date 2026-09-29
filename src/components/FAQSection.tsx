import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DIRECT_OBJECTIONS_FAQS, CTA_TEXTS } from '../constants';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-22 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            Direct & Honest Answers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            Questions School Owners Ask Before Trying MSchool
          </h2>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            Practical, direct answers about internet reliability, staff training, school sizes, and the walkthrough process.
          </p>
        </div>

        {/* 6 Direct Objection FAQ Cards */}
        <div className="space-y-3.5 mb-12">
          {DIRECT_OBJECTIONS_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'bg-[#f8fafd] border-[#d2e3fc] shadow-2xs' 
                    : 'bg-white border-[#dadce0] hover:border-[#bdc1c6]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                        {faq.tag}
                      </span>
                      <span className="text-xs font-semibold text-[#1e8e3e]">
                        • {faq.shortAnswer}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#202124] pt-0.5">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-1 rounded-full transition-transform shrink-0 mt-1 ${isOpen ? 'rotate-180 text-[#1a73e8]' : 'text-[#5f6368]'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#3c4043] leading-relaxed border-t border-[#d2e3fc]/60 whitespace-pre-line">
                        {faq.fullAnswer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Low-Risk Walkthrough Reassurance Box */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#1e8e3e]">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Pressure Policy</span>
            </div>
            <p className="text-xs sm:text-sm text-[#202124] font-medium">
              We never do high-pressure sales calls. Just a helpful 15-minute walkthrough of the software.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="h-10 px-5 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
          >
            <span>{CTA_TEXTS.SEE_IN_ACTION}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
