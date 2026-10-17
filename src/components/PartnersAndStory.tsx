import React from 'react';
import { 
  Building2, 
  MapPin, 
  Quote, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Printer, 
  TrendingDown,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { SCHOOLS } from '../data/schools';
import { CASE_STUDY_CONTENT } from '../constants';

interface PartnersAndStoryProps {
  onOpenBooking?: () => void;
}

export const PartnersAndStory: React.FC<PartnersAndStoryProps> = ({ onOpenBooking }) => {
  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <AlertTriangle className="w-5 h-5 text-[#d93025]" />;
      case 1:
        return <Clock className="w-5 h-5 text-[#f29900]" />;
      case 2:
        return <Printer className="w-5 h-5 text-[#1a73e8]" />;
      case 3:
        return <TrendingDown className="w-5 h-5 text-[#1e8e3e]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#1a73e8]" />;
    }
  };

  return (
    <section id="case-study" className="py-16 sm:py-22 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Case Study Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f0fe] border border-[#d2e3fc] text-xs font-bold text-[#1a73e8] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{CASE_STUDY_CONTENT.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202124] tracking-tight mb-3">
            {CASE_STUDY_CONTENT.headline}
          </h2>

          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            {CASE_STUDY_CONTENT.subheadline}
          </p>
        </div>

        {/* 4-Stage Operational Narrative Grid (Mini Case Study) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {CASE_STUDY_CONTENT.storyStages.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-5.5 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] shadow-2xs flex flex-col justify-between relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center">
                    {getStageIcon(idx)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#dadce0] text-[#3c4043]">
                    {stage.tag}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-[#1a73e8] uppercase tracking-wide">
                    {stage.stage}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#202124] mt-1 leading-snug">
                    {stage.title}
                  </h3>
                </div>

                <p className="text-xs text-[#5f6368] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#dadce0]/70 flex items-center justify-between text-xs font-bold">
                <span className="text-[11px] text-[#5f6368]">Key Indicator</span>
                <span className={idx === 3 ? 'text-[#1e8e3e]' : idx === 0 ? 'text-[#d93025]' : 'text-[#1a73e8]'}>
                  {stage.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expansion Proof & Testimonial Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-3xl bg-[#f8fafd] border border-[#d2e3fc] shadow-xs mb-14">
          
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8]">
              The Spread Across Schools
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#202124]">
              {CASE_STUDY_CONTENT.expansionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed">
              {CASE_STUDY_CONTENT.expansionDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#202124] font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e8e3e]" />
                <span>20+ Active Partner Campuses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a73e8]" />
                <span>25,000+ Enrolled Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f29900]" />
                <span>99.98% Fee Audit Accuracy</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#d2e3fc] shadow-2xs relative">
            <Quote className="w-7 h-7 text-[#1a73e8]/15 absolute top-4 right-4" />
            
            <p className="text-xs sm:text-sm text-[#3c4043] italic leading-relaxed mb-3 pr-4">
              {CASE_STUDY_CONTENT.quote}
            </p>

            <div className="flex items-center gap-2.5 pt-2 border-t border-[#f1f3f4]">
              <div className="w-8 h-8 rounded-full bg-[#e8f0fe] text-[#1a73e8] font-bold flex items-center justify-center text-xs">
                WK
              </div>
              <div>
                <div className="font-bold text-xs text-[#202124]">{CASE_STUDY_CONTENT.quoteAuthor}</div>
                <div className="text-[11px] text-[#5f6368]">{CASE_STUDY_CONTENT.quoteRole}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Real Partner Institutions Grid */}
        <div>
          <div className="text-center mb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5f6368]">
              Active partner schools relying on MSchool every morning
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {SCHOOLS.map((school) => (
              <div
                key={school.name}
                className="w-[calc(50%-0.5rem)] sm:w-48 p-4 rounded-2xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#bdc1c6] hover:shadow-sm transition-all flex flex-col items-center text-center gap-3"
              >
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  loading="lazy"
                  draggable={false}
                  className="w-20 h-20 rounded-2xl object-contain bg-white border border-[#e8eaed] p-0.5"
                />
                <div className="text-sm font-bold text-[#202124] leading-snug">{school.name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
