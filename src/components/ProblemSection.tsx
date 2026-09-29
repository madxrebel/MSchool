import React from 'react';
import { 
  FileText, 
  Clock, 
  UserX, 
  PhoneCall, 
  Search, 
  FileSpreadsheet, 
  Split,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { PROBLEMS_CONTENT } from '../constants';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'records':
        return <FileText className="w-5 h-5 text-[#d93025]" />;
      case 'fees':
        return <Clock className="w-5 h-5 text-[#f29900]" />;
      case 'attendance':
        return <UserX className="w-5 h-5 text-[#d93025]" />;
      case 'parents':
        return <PhoneCall className="w-5 h-5 text-[#1a73e8]" />;
      case 'search':
        return <Search className="w-5 h-5 text-[#5f6368]" />;
      case 'reports':
        return <FileSpreadsheet className="w-5 h-5 text-[#f29900]" />;
      case 'split':
        return <Split className="w-5 h-5 text-[#d93025]" />;
      default:
        return <FileText className="w-5 h-5 text-[#d93025]" />;
    }
  };

  return (
    <section id="problems" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#d93025] mb-2 block">
            {PROBLEMS_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {PROBLEMS_CONTENT.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            {PROBLEMS_CONTENT.subheadline}
          </p>
        </div>

        {/* 7 Realistic School Operations Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {PROBLEMS_CONTENT.painPoints.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-white border border-[#dadce0] hover:border-[#bdc1c6] shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#fce8e6]/60 border border-[#fad2cf] flex items-center justify-center shrink-0">
                  {getIcon(item.id)}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#202124] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5f6368] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 8th Card - The Recognition Moment & Callout */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="p-6 rounded-2xl bg-[#e8f0fe]/70 border border-[#d2e3fc] shadow-2xs flex flex-col justify-between md:col-span-2 lg:col-span-2"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block">
                Sound Familiar?
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#202124]">
                “Yes. This is exactly what happens in our school every morning.”
              </h4>
              <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
                Schools don’t suffer from a lack of dedication. They suffer from disconnected tools and manual paper processes that consume hours of productive staff energy.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#d2e3fc]">
              <span className="text-xs font-semibold text-[#1a73e8]">
                {PROBLEMS_CONTENT.transitionText}
              </span>
              <button
                onClick={onOpenBooking}
                className="h-8 px-3.5 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>See the Solution</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
