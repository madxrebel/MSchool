import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DIRECT_OBJECTIONS_FAQS, CTA_TEXTS } from '../constants';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-14 items-start">

        {/* Left: short intro + the way to ask more (stays in view while scrolling the list) */}
        <div className="lg:sticky lg:top-24 text-center lg:text-left">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            Direct & Honest Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202124] mb-3">
            Questions school owners ask before trying MSchool
          </h2>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-5">
            The short answer is always visible. Tap a question for the details.
          </p>

          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e8e3e] mb-1">
              <ShieldCheck className="w-4 h-4" />
              Zero-pressure policy
            </div>
            <p className="text-sm text-[#3c4043] mb-5">
              No high-pressure sales calls. Just a helpful 15-minute walkthrough.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenBooking}
                className="h-10 px-5 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>{CTA_TEXTS.BOOK_FREE_DEMO}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={CTA_TEXTS.WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-full text-xs font-semibold text-[#137333] border border-[#dadce0] hover:border-[#1e8e3e] transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Right: slim accordion rows */}
        <div>
          <ul className="divide-y divide-[#e8eaed] border-y border-[#e8eaed]">
            {DIRECT_OBJECTIONS_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <li key={faq.question}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span className="min-w-0">
                      <span className="block font-bold text-sm sm:text-base text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                        {faq.question}
                      </span>
                      <span className="block text-xs sm:text-[13px] font-medium text-[#1e8e3e] mt-0.5">
                        {faq.shortAnswer}
                      </span>
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen ? 'rotate-180 bg-[#e8f0fe] text-[#1a73e8]' : 'bg-[#f1f3f4] text-[#5f6368]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pr-10 text-xs sm:text-sm text-[#3c4043] leading-relaxed whitespace-pre-line">
                          {faq.fullAnswer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Mobile: the contact buttons sit under the list */}
          <div className="lg:hidden mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              onClick={onOpenBooking}
              className="h-11 px-5 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{CTA_TEXTS.BOOK_FREE_DEMO}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href={CTA_TEXTS.WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-full text-sm font-semibold text-[#137333] border border-[#dadce0] inline-flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
