import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Gamepad2, 
  Users, 
  GraduationCap, 
  Printer, 
  Calendar,
  Layers,
  FileSpreadsheet,
  Check,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CTA_TEXTS, BRAND_CONFIG, HERO_CONTENT } from '../constants';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToSimulator }) => {
  const [activeApp, setActiveApp] = useState<'mschool' | 'mkids' | 'mattendance' | 'maymar'>('mschool');

  const apps = [
    {
      id: 'mschool' as const,
      name: 'MSchool',
      tagline: 'School Management & Finance',
      color: '#1a73e8', // Google Blue
      badgeBg: 'bg-[#e8f0fe]',
      badgeText: 'text-[#1a73e8]',
      borderColor: 'border-[#1a73e8]',
      icon: GraduationCap,
      description: 'The core administrative operating system: Smart student enrollment, atomic 1-click fee submission, family-centric sibling accounting, and 58mm thermal receipt printing.',
      stats: 'Instant zero-wait student search • Thermal receipts',
      tabTarget: 'mschool' as const,
    },
    {
      id: 'mkids' as const,
      name: 'mKids',
      tagline: 'Interactive Books & Early Learning',
      color: '#f29900', // Google Yellow/Amber
      badgeBg: 'bg-[#fef7e0]',
      badgeText: 'text-[#b06000]',
      borderColor: 'border-[#f29900]',
      icon: Gamepad2,
      description: 'Physical early-childhood textbooks synchronized with gamified Android apps. Features interactive Math Car Racing, Phonics balloon popping, and letter tracing.',
      stats: 'Physical curriculum books + Playable learning games',
      tabTarget: 'mkids' as const,
    },
    {
      id: 'mattendance' as const,
      name: 'mAttendance',
      tagline: 'High-Speed Classroom Sweeps',
      color: '#1e8e3e', // Google Green
      badgeBg: 'bg-[#e6f4ea]',
      badgeText: 'text-[#137333]',
      borderColor: 'border-[#1e8e3e]',
      icon: CheckCircle2,
      description: 'Dual-mode attendance: Rapid sweep marking for entire classes in under 30 seconds, plus dedicated biometric/manual staff registers with late-arrival tracking.',
      stats: '30-second classroom sweep • Instant parent alert',
      tabTarget: 'mschool' as const,
    },
    {
      id: 'maymar' as const,
      name: 'Maymar Academy',
      tagline: 'Parent & Student App',
      color: '#d93025', // Google Red
      badgeBg: 'bg-[#fce8e6]',
      badgeText: 'text-[#c5221f]',
      borderColor: 'border-[#d93025]',
      icon: Users,
      description: 'Connect parents directly to their child’s classroom with instant WhatsApp/SMS notifications, automated digital report cards, daily diaries, and fee vouchers.',
      stats: 'Real-time parent connection • Digital result cards',
      tabTarget: 'mschool' as const,
    },
  ];

  const currentApp = apps.find(a => a.id === activeApp)!;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white text-[#202124]">
      
      {/* Google-like subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f3f4_1px,transparent_1px),linear-gradient(to_bottom,#f1f3f4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium hover:border-[#1a73e8] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
            <span>{BRAND_CONFIG.trustBadge}</span>
          </div>
        </motion.div>

        {/* PROMINENT HOOK REQUIRED BY USER - Google Workspace Style Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8 text-center"
        >
          <div className="inline-block bg-[#f8fafd] border border-[#d2e3fc] rounded-2xl px-6 py-4 sm:px-8 sm:py-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block mb-1">
              {HERO_CONTENT.eyebrow}
            </span>
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#202124] tracking-tight leading-snug">
              {HERO_CONTENT.hookQuote}
            </p>
          </div>
        </motion.div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#202124] mb-5 leading-tight">
            {HERO_CONTENT.headlineLead}{' '}
            <span className="text-[#1a73e8]">
              {HERO_CONTENT.headlineAccent}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5f6368] max-w-2xl mx-auto leading-relaxed">
            {HERO_CONTENT.subtitle}
          </p>
        </div>

        {/* Action CTAs (Google Workspace Style) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{CTA_TEXTS.START_FREE_PILOT_HERO}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateToSimulator('mschool')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-[#1a73e8] bg-white hover:bg-[#f8fafd] border border-[#dadce0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#1a73e8]" />
            <span>{CTA_TEXTS.TRY_DEMO}</span>
          </button>

          <button
            onClick={() => onNavigateToSimulator('mkids')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-medium text-[#3c4043] bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#dadce0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 text-[#f29900]" />
            <span>{CTA_TEXTS.PLAY_MKIDS}</span>
          </button>
        </div>

        {/* GOOGLE WORKSPACE-STYLE APP SELECTOR BAR */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="text-center mb-3 text-xs font-semibold uppercase tracking-wider text-[#5f6368]">
            Explore the 4 unified ecosystem pillars
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 bg-[#f8f9fa] border border-[#dadce0] rounded-2xl">
            {apps.map((app) => {
              const Icon = app.icon;
              const isSelected = activeApp === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`flex flex-col sm:flex-row items-center gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-sm border border-[#dadce0]'
                      : 'hover:bg-white/60 text-[#5f6368]'
                  }`}
                >
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${app.color}15`, color: app.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#202124]">{app.name}</div>
                    <div className="text-[11px] text-[#5f6368] hidden sm:block truncate max-w-[120px]">
                      {app.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC APP PREVIEW CARD (Google Workspace feature spotlight card) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentApp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto bg-white border border-[#dadce0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between"
          >
            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${currentApp.color}15`, color: currentApp.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentApp.color }} />
                <span>{currentApp.name} Module</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#202124]">
                {currentApp.tagline}
              </h3>
              <p className="text-sm text-[#5f6368] leading-relaxed">
                {currentApp.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-[#3c4043] pt-1">
                <Check className="w-4 h-4 text-[#1e8e3e]" />
                <span>{currentApp.stats}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onNavigateToSimulator(currentApp.tabTarget)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: currentApp.color }}
              >
                <span>Launch {currentApp.name} Simulator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-[#3c4043] bg-[#f8f9fa] hover:bg-[#f1f3f4] border border-[#dadce0] transition-colors text-center cursor-pointer"
              >
                {CTA_TEXTS.REQUEST_DEPLOYMENT}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#dadce0] text-xs text-[#5f6368]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-[#202124]">Instant Zero-Wait Student Search</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fef7e0] text-[#f29900] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-[#202124]">58mm Thermal Bluetooth Receipts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#e6f4ea] text-[#1e8e3e] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-[#202124]">Atomic 100% Reliable Transactions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#fce8e6] text-[#d93025] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-[#202124]">Unified Sibling Family Ledger</span>
          </div>
        </div>

      </div>
    </section>
  );
};
