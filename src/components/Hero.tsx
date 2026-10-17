import React from 'react';
import { 
  ChevronRight,
  ShieldCheck,
  Building2,
  WifiOff,
  Check,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { CTA_TEXTS, HERO_CONTENT } from '../constants';
import { InteractiveDeviceSimulator } from './InteractiveDeviceSimulator';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
  simulatorInitialTab?: 'mschool' | 'mkids' | 'thermal';
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToSimulator, simulatorInitialTab = 'mschool' }) => {
  return (
    <section id="overview" className="relative overflow-hidden pt-4 pb-10 sm:pt-6 sm:pb-12 bg-white text-[#202124]">
      
      {/* Subtle clean background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f3f4_1px,transparent_1px),linear-gradient(to_bottom,#f1f3f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)] gap-8 lg:gap-12 items-start mb-10">
        <div className="lg:text-left lg:pt-6 xl:pt-10">
        
        {/* PRIMARY HEADLINE (Direct, memorable, problem-oriented) */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#202124] max-w-4xl mx-auto lg:mx-0 mb-5 leading-[1.08]"
        >
          {HERO_CONTENT.primaryHeadline}
        </motion.h1>

        {/* SUPPORTING COPY (Clear, sales-oriented, grounded in Pakistan school realities) */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-xl lg:text-lg xl:text-xl text-[#5f6368] max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-8 font-normal"
        >
          {HERO_CONTENT.supportingCopy}
        </motion.p>

        {/* ACTION CTAs (Low-risk, action-oriented) */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-3">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto h-12 px-7 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-all shadow-xs hover:shadow inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{CTA_TEXTS.BOOK_FREE_DEMO}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <a
            href={CTA_TEXTS.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-6 rounded-full text-sm font-semibold text-[#137333] bg-white hover:bg-[#f3fbf5] border border-[#dadce0] hover:border-[#1e8e3e] transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#1e8e3e]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Low-Risk Microcopy Directly Under CTAs */}
        <div className="flex items-center justify-center lg:justify-start text-xs text-[#5f6368] font-medium">
          <span className="flex items-center gap-1.5 text-[#202124]">
            <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
            Free 15-minute walkthrough · No pressure
          </span>
        </div>
        </div>

        {/* Interactive product, visible on first load (right side on desktop) */}
        <div id="interactive-demo" className="scroll-mt-20 w-full">
          <InteractiveDeviceSimulator embedded initialTab={simulatorInitialTab} />
        </div>
        </div>

        {/* CREDIBILITY BAR (Directly under CTA) */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl mb-14"
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
