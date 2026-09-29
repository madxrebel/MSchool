import React from 'react';
import { Clock, ShieldAlert, Eye, KeyRound, Globe2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_CONTENT } from '../constants';

interface WhyChooseSectionProps {
  onOpenBooking: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onOpenBooking }) => {
  const getPillarIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Clock className="w-5 h-5 text-[#1a73e8]" />;
      case 1:
        return <ShieldAlert className="w-5 h-5 text-[#1e8e3e]" />;
      case 2:
        return <Eye className="w-5 h-5 text-[#f29900]" />;
      case 3:
        return <KeyRound className="w-5 h-5 text-[#1a73e8]" />;
      case 4:
        return <Globe2 className="w-5 h-5 text-[#d93025]" />;
      default:
        return <Clock className="w-5 h-5 text-[#1a73e8]" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {WHY_CHOOSE_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {WHY_CHOOSE_CONTENT.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            {WHY_CHOOSE_CONTENT.subheadline}
          </p>
        </div>

        {/* 5 Benefit Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {WHY_CHOOSE_CONTENT.pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center">
                  {getPillarIcon(idx)}
                </div>
                <h3 className="font-extrabold text-base text-[#202124]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 6th Demo Opportunity Box */}
          <div className="p-6 rounded-2xl bg-[#e8f0fe]/60 border border-[#d2e3fc] flex flex-col justify-between text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block">
                Next Step
              </span>
              <h4 className="font-bold text-base text-[#202124]">
                See how it feels in your hands
              </h4>
              <p className="text-xs text-[#3c4043] leading-relaxed">
                We will walk your team through fee entry, student search, and report generation in 15 minutes.
              </p>
            </div>
            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="w-full h-9 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Book a Free Demo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
