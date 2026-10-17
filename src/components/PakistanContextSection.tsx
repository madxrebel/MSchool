import React from 'react';
import { 
  WifiOff, 
  Zap, 
  ShieldCheck, 
  Printer, 
  Laptop,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { PAKISTAN_CONTEXT_CONTENT } from '../constants';

interface PakistanContextSectionProps {
  onOpenBooking: () => void;
}

export const PakistanContextSection: React.FC<PakistanContextSectionProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'WifiOff':
        return <WifiOff className="w-5 h-5 text-[#1a73e8]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#f29900]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#1e8e3e]" />;
      case 'Printer':
        return <Printer className="w-5 h-5 text-[#1a73e8]" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#5f6368]" />;
      default:
        return <Zap className="w-5 h-5 text-[#1a73e8]" />;
    }
  };

  return (
    <section id="why-mschool" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {PAKISTAN_CONTEXT_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {PAKISTAN_CONTEXT_CONTENT.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            {PAKISTAN_CONTEXT_CONTENT.subheadline}
          </p>
        </div>

        {/* Practical Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 mb-10">
          {PAKISTAN_CONTEXT_CONTENT.points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5.5 rounded-2xl bg-white border border-[#dadce0] hover:border-[#1a73e8]/40 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center">
                    {getIcon(point.icon)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f1f3f4] text-[#3c4043]">
                    {point.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#202124] leading-snug">
                  {point.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 6th Reassurance Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="p-6 rounded-2xl bg-[#e8f0fe]/60 border border-[#d2e3fc] flex flex-col justify-between md:col-span-2 lg:col-span-2"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block">
                Local Currency & Support
              </span>
              <h4 className="text-base sm:text-lg font-bold text-[#202124]">
                Pakistani Rupees & Local Direct WhatsApp Support
              </h4>
              <p className="text-xs text-[#3c4043] leading-relaxed">
                No foreign dollar pricing, credit card requirements, or distant overseas call centers. Direct phone and WhatsApp assistance from Karachi.
              </p>
            </div>

            <div className="pt-3 border-t border-[#d2e3fc]">
              <button
                onClick={onOpenBooking}
                className="w-full h-9 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Book a Free Campus Walkthrough</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
