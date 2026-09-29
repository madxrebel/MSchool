import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS_CONTENT } from '../constants';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            Straightforward answers to the practical questions school owners ask before booking a walkthrough.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-10">
          {FAQS_CONTENT.map((faq, idx) => {
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
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-[#202124]">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full transition-transform ${isOpen ? 'rotate-180 text-[#1a73e8]' : 'text-[#5f6368]'}`}>
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
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5f6368] leading-relaxed border-t border-[#d2e3fc]/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance */}
        <div className="text-center bg-[#f8f9fa] border border-[#dadce0] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-[#3c4043] font-medium">
            Have a question specific to your school’s fee structure or staff setup?
          </span>
          <button
            onClick={onOpenBooking}
            className="h-9 px-4 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Ask During Walkthrough</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
