import React, { useState } from 'react';
import { 
  Smartphone, 
  Gamepad2, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Check,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CTA_TEXTS, HERO_CONTENT } from '../constants';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToSimulator }) => {
  const [activeApp, setActiveApp] = useState<'mschool' | 'mkids' | 'mattendance' | 'maymar'>('mschool');

  const headline = (HERO_CONTENT as any).primaryHeadline || 
    ((HERO_CONTENT as any).headlineLead ? `${(HERO_CONTENT as any).headlineLead} ${(HERO_CONTENT as any).headlineAccent || ''}` : "Turn your school's administrative burden into a competitive advantage.");

  const subheadingText = (HERO_CONTENT as any).subheading || 
    (HERO_CONTENT as any).subtitle || 
    "All your school operations together in one cohesive workspace — from zero-wait admissions to Bluetooth fee receipts and gamified early learning.";

  const factsFiguresList = (HERO_CONTENT as any).factsFigures || [
    { value: '20+', label: 'Partner Schools', sublabel: 'Campuses across Pakistan', color: '#1a73e8' },
    { value: '25,000+', label: 'Active Students', sublabel: 'Daily attendance & records', color: '#1e8e3e' },
    { value: '99.98%', label: 'Fee Accuracy', sublabel: 'Bluetooth thermal slips', color: '#f29900' }
  ];

  const quickBadgesList = (HERO_CONTENT as any).quickBadges || (HERO_CONTENT as any).trustBullets || [
    'Zero-Wait Student Search',
    '58mm Bluetooth Thermal Slips',
    'Instant WhatsApp Receipts',
    'Sibling Family Ledger'
  ];

  const apps = [
    {
      id: 'mschool' as const,
      name: 'MSchool Core',
      tagline: 'Admissions & Counter Finance',
      color: '#1a73e8', // Google Blue
      icon: GraduationCap,
      description: 'Zero-wait student search, atomic single-click fee collection, and instant 58mm thermal receipts.',
      tags: ['Instant Search', 'Thermal Receipts', 'Family Ledger'],
      tabTarget: 'mschool' as const,
    },
    {
      id: 'mkids' as const,
      name: 'mKids Early',
      tagline: 'Textbooks + Playable Games',
      color: '#f29900', // Google Amber
      icon: Gamepad2,
      description: 'Physical school syllabus books linked to gamified Math Car Racing, Phonics, and interactive tracing.',
      tags: ['Printed Textbooks', 'Playable Games', 'Kindergarten'],
      tabTarget: 'mkids' as const,
    },
    {
      id: 'mattendance' as const,
      name: 'mAttendance',
      tagline: '15-Second Morning Sweeps',
      color: '#1e8e3e', // Google Green
      icon: CheckCircle2,
      description: 'Swipe-to-mark entire class rolls in seconds, track staff biometric punch-in, and auto-alert parents.',
      tags: ['15-Sec Sweep', 'Staff Biometric', 'Absent Alerts'],
      tabTarget: 'mschool' as const,
    },
    {
      id: 'maymar' as const,
      name: 'Maymar Parent',
      tagline: 'Direct WhatsApp & Diary',
      color: '#d93025', // Google Red
      icon: Users,
      description: 'Automated WhatsApp receipt dispatch, digital examination report cards, and real-time homework diary.',
      tags: ['WhatsApp Slips', 'Digital Results', 'Daily Diary'],
      tabTarget: 'mschool' as const,
    },
  ];

  const currentApp = apps.find(a => a.id === activeApp)!;

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 bg-white text-[#202124]">
      
      {/* Subtle clean background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f3f4_1px,transparent_1px),linear-gradient(to_bottom,#f1f3f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
            <span>{HERO_CONTENT.eyebrow}</span>
          </div>
        </motion.div>

        {/* PRIMARY HEADLINE (One single punchy sentence, biggest font on page as requested) */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#202124] max-w-4xl mx-auto mb-6 leading-[1.08]"
        >
          {headline}
        </motion.h1>

        {/* SUBHEADING (Reduced in size, concise, high readability) */}
        <motion.p 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-lg lg:text-xl text-[#5f6368] max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
        >
          {subheadingText}
        </motion.p>

        {/* Action CTAs - Aligned and clean */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto h-11 px-6 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-all shadow-xs hover:shadow inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{CTA_TEXTS.START_FREE_PILOT_HERO}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateToSimulator('mschool')}
            className="w-full sm:w-auto h-11 px-5.5 rounded-full text-sm font-semibold text-[#1a73e8] bg-white hover:bg-[#f8fafd] border border-[#dadce0] hover:border-[#1a73e8] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#1a73e8]" />
            <span>{CTA_TEXTS.TRY_DEMO}</span>
          </button>
        </div>

        {/* 2-3 FACTS & FIGURES BAR IN HERO (Replaces long purple text) */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-12 p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl"
        >
          {factsFiguresList.map((stat: any, idx: number) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-white border border-[#dadce0]/70 shadow-2xs text-center flex flex-col justify-center"
            >
              <div 
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-bold text-[#202124] mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#5f6368] mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 4 UNIFIED MODULE SELECTOR (Workspace Style - Low text, highly scannable) */}
        <div className="max-w-4xl mx-auto mb-4 text-left">
          <div className="text-center mb-3 text-xs font-semibold uppercase tracking-wider text-[#5f6368]">
            Explore the 4 unified pillars
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl mb-4">
            {apps.map((app) => {
              const Icon = app.icon;
              const isSelected = activeApp === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-2xs border border-[#dadce0] ring-1 ring-[#1a73e8]/20'
                      : 'hover:bg-white/60 text-[#5f6368]'
                  }`}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${app.color}15`, color: app.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#202124] truncate">{app.name}</div>
                    <div className="text-[10px] text-[#5f6368] truncate">{app.tagline}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SPOTLIGHT CARD - Low text, clear value */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentApp.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#dadce0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${currentApp.color}15`, color: currentApp.color }}
                  >
                    {currentApp.name}
                  </span>
                  <span className="text-xs font-medium text-[#5f6368]">• {currentApp.tagline}</span>
                </div>
                <p className="text-sm text-[#3c4043] leading-relaxed">
                  {currentApp.description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {currentApp.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[11px] font-medium bg-[#f1f3f4] text-[#3c4043] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onNavigateToSimulator(currentApp.tabTarget)}
                  className="h-9 px-4 rounded-full text-xs font-semibold text-white shadow-2xs inline-flex items-center justify-center gap-1 cursor-pointer"
                  style={{ backgroundColor: currentApp.color }}
                >
                  <span>Launch Demo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenBooking}
                  className="h-9 px-3.5 rounded-full text-xs font-semibold text-[#3c4043] bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#dadce0] transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  {CTA_TEXTS.REQUEST_PILOT}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4 Feature Badges - Quick scannable footer strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-8 text-xs text-[#5f6368]">
          {quickBadgesList.map((badge: string, bIdx: number) => (
            <div key={bIdx} className="flex items-center gap-1.5 font-medium text-[#3c4043]">
              <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
              <span>{badge}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
