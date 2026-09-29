import React from 'react';
import { 
  BarChart3, 
  CreditCard, 
  UserCheck, 
  GraduationCap, 
  Share2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { OUTCOMES_CONTENT } from '../constants';

interface OutcomeSolutionsProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const OutcomeSolutions: React.FC<OutcomeSolutionsProps> = ({ 
  onOpenBooking,
  onNavigateToSimulator
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#1a73e8]" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-[#1e8e3e]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#f29900]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#1a73e8]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#d93025]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#5f6368]" />;
      default:
        return <BarChart3 className="w-5 h-5 text-[#1a73e8]" />;
    }
  };

  return (
    <section id="outcomes" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {OUTCOMES_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {OUTCOMES_CONTENT.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            {OUTCOMES_CONTENT.subheadline}
          </p>
        </div>

        {/* 6 Outcome Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 mb-10">
          {OUTCOMES_CONTENT.outcomes.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-[#dadce0] hover:border-[#1a73e8]/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f1f3f4] text-[#3c4043]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#202124] leading-snug">
                  {item.outcome}
                </h3>

                <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#f1f3f4] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1a73e8]">
                  {item.badge}
                </span>
                <button
                  onClick={() => onNavigateToSimulator('mschool')}
                  className="text-[#5f6368] hover:text-[#1a73e8] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>See in app</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mid-Section Callout */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-base text-[#202124]">
              Want to see how these outcomes fit into your school’s daily routine?
            </h4>
            <p className="text-xs text-[#5f6368] mt-0.5">
              We will demonstrate the exact workflow for your counter staff, teachers, and accounts room.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="h-10 px-5 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Book a Free Demo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
