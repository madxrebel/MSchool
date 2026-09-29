import React from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Building2,
  WifiOff
} from 'lucide-react';
import { motion } from 'motion/react';
import { CTA_TEXTS, HERO_CONTENT } from '../constants';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToSimulator }) => {
  return (
    <section id="overview" className="relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16 bg-white text-[#202124]">
      
      {/* Subtle clean background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f3f4_1px,transparent_1px),linear-gradient(to_bottom,#f1f3f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] text-xs font-medium shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
            <span>{HERO_CONTENT.eyebrow}</span>
          </div>
        </motion.div>

        {/* PRIMARY HEADLINE (Direct, memorable, problem-oriented) */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#202124] max-w-4xl mx-auto mb-6 leading-[1.08]"
        >
          {HERO_CONTENT.primaryHeadline}
        </motion.h1>

        {/* SUPPORTING COPY (Clear, sales-oriented, grounded in Pakistan school realities) */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-xl text-[#5f6368] max-w-3xl mx-auto leading-relaxed mb-8 font-normal"
        >
          {HERO_CONTENT.supportingCopy}
        </motion.p>

        {/* ACTION CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto h-12 px-7 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-all shadow-xs hover:shadow inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{HERO_CONTENT.primaryCta}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateToSimulator('mschool')}
            className="w-full sm:w-auto h-12 px-6 rounded-full text-sm font-semibold text-[#1a73e8] bg-white hover:bg-[#f8fafd] border border-[#dadce0] hover:border-[#1a73e8] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#1a73e8]" />
            <span>{HERO_CONTENT.secondaryCta}</span>
          </button>
        </div>

        {/* CREDIBILITY BAR (Directly under CTA) */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl mb-14"
        >
          <div className="p-3 bg-white rounded-xl border border-[#dadce0]/60 flex items-center justify-center gap-2.5 text-xs text-[#202124] font-medium shadow-2xs">
            <Building2 className="w-4 h-4 text-[#1a73e8] shrink-0" />
            <span><strong>20+ schools</strong> already use MSchool</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#dadce0]/60 flex items-center justify-center gap-2.5 text-xs text-[#202124] font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#1e8e3e] shrink-0" />
            <span>Built inside real family-run schools</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#dadce0]/60 flex items-center justify-center gap-2.5 text-xs text-[#202124] font-medium shadow-2xs">
            <WifiOff className="w-4 h-4 text-[#f29900] shrink-0" />
            <span>Works reliably on weak internet</span>
          </div>
        </motion.div>

        {/* CORE PROMISE SALES REINFORCEMENT BANNER (Section 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="pt-4 pb-2 border-t border-[#f1f3f4]"
        >
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            The Core Promise
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-2">
            {HERO_CONTENT.corePromiseHeadline}
          </h2>
          <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-[#1a73e8] mb-3">
            {HERO_CONTENT.corePromiseSubheadline}
          </h3>
          <p className="text-xs sm:text-sm text-[#5f6368] max-w-xl mx-auto">
            {HERO_CONTENT.corePromiseProofLead}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
