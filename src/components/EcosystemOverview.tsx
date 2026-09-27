import React, { useState } from 'react';
import { 
  School, 
  Gamepad2, 
  Zap, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  FileText, 
  Printer, 
  Smartphone,
  ChevronRight,
  BookOpen,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ECOSYSTEM_MODULES } from '../data/mockData';

interface EcosystemOverviewProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const EcosystemOverview: React.FC<EcosystemOverviewProps> = ({
  onOpenBooking,
  onNavigateToSimulator,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('mschool');

  const selectedModule = ECOSYSTEM_MODULES.find((m) => m.id === selectedPillarId) || ECOSYSTEM_MODULES[0];

  const getPillarColor = (id: string) => {
    switch (id) {
      case 'mschool':
        return { color: '#1a73e8', bg: '#e8f0fe', border: '#d2e3fc' };
      case 'mkids':
        return { color: '#b06000', bg: '#fef7e0', border: '#fde293' };
      case 'mattendance':
        return { color: '#137333', bg: '#e6f4ea', border: '#ceead6' };
      case 'maymar':
        return { color: '#c5221f', bg: '#fce8e6', border: '#fad2cf' };
      default:
        return { color: '#1a73e8', bg: '#e8f0fe', border: '#d2e3fc' };
    }
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'mschool':
        return <School className="w-5 h-5 text-[#1a73e8]" />;
      case 'mkids':
        return <Gamepad2 className="w-5 h-5 text-[#f29900]" />;
      case 'mattendance':
        return <Zap className="w-5 h-5 text-[#1e8e3e]" />;
      case 'maymar':
        return <Users className="w-5 h-5 text-[#d93025]" />;
      default:
        return <School className="w-5 h-5 text-[#1a73e8]" />;
    }
  };

  return (
    <section id="ecosystem" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-t border-b border-[#dadce0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            Ecosystem Suite
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] mb-3">
            Everything your school needs, connected.
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            Rather than juggling disparate tools for admissions, morning rolls, junior books, and parent notices, MSchool keeps your entire school operating in total synchrony.
          </p>
        </div>

        {/* 4 Interactive Selector Tabs (Google Workspace Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {ECOSYSTEM_MODULES.map((m) => {
            const isSelected = m.id === selectedPillarId;
            const theme = getPillarColor(m.id);
            return (
              <button
                key={m.id}
                onClick={() => setSelectedPillarId(m.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-white shadow-sm border-[#1a73e8] ring-2 ring-[#e8f0fe]'
                    : 'bg-white/80 border-[#dadce0] hover:border-[#bdc1c6] text-[#5f6368]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div 
                    className="p-2 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: theme.bg }}
                  >
                    {getPillarIcon(m.id)}
                  </div>
                  <span 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: theme.bg, color: theme.color }}
                  >
                    {m.badge}
                  </span>
                </div>
                <div className="font-bold text-sm sm:text-base text-[#202124]">{m.title}</div>
                <div className="text-xs text-[#5f6368] mt-0.5 line-clamp-1">{m.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Active Module Feature Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-10 rounded-2xl bg-white border border-[#dadce0] shadow-sm relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getPillarColor(selectedModule.id).bg, color: getPillarColor(selectedModule.id).color }}>
                  {getPillarIcon(selectedModule.id)}
                  <span>{selectedModule.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
                  {selectedModule.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                  {selectedModule.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-2">
                  {selectedModule.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#3c4043]">
                      <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (selectedModule.id === 'mkids') {
                        onNavigateToSimulator('mkids');
                      } else {
                        onNavigateToSimulator('mschool');
                      }
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Launch in Live Simulator</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-2.5 rounded-full bg-white hover:bg-[#f8fafd] text-[#1a73e8] font-medium text-xs sm:text-sm border border-[#dadce0] transition-colors cursor-pointer"
                  >
                    Request School Pilot
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Preview Card */}
              <div className="lg:col-span-5 bg-[#f8f9fa] p-6 rounded-xl border border-[#dadce0] space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-[#dadce0] pb-3">
                  <span className="font-semibold text-[#5f6368] uppercase text-[11px]">School Impact</span>
                  <span className="text-[#137333] font-bold text-[11px] bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                    Active in 20+ Schools
                  </span>
                </div>

                {selectedModule.id === 'mschool' && (
                  <div className="space-y-2.5 text-[#3c4043]">
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#202124] text-xs mb-1">Instant Family Fee Collection</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Combines siblings under a single family voucher. One transaction clears dues with instant print & WhatsApp confirmation.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#202124] text-xs mb-1">Zero-Wait Student Directory</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Type any name, father name, or ID—results appear as you type with no loading delays.
                      </p>
                    </div>
                  </div>
                )}

                {selectedModule.id === 'mkids' && (
                  <div className="space-y-2.5 text-[#3c4043]">
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#b06000] text-xs mb-1">Physical Book & App Harmony</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Children complete exercises in our printed workbooks, then reinforce pronunciation and math via tablet games.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#b06000] text-xs mb-1">Active Handwriting & Phonics</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Includes canvas letter tracing and voice recognition for Urdu and English phonics.
                      </p>
                    </div>
                  </div>
                )}

                {selectedModule.id === 'mattendance' && (
                  <div className="space-y-2.5 text-[#3c4043]">
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#137333] text-xs mb-1">Rapid Classroom Sweeps</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Teachers mark students in quick-tap mode in seconds. Instantly updates principal morning dashboards.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#137333] text-xs mb-1">Automatic Guardian Alerts</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Late arrivals and unexcused absences trigger real-time notifications to parents.
                      </p>
                    </div>
                  </div>
                )}

                {selectedModule.id === 'maymar' && (
                  <div className="space-y-2.5 text-[#3c4043]">
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#c5221f] text-xs mb-1">Digital Homework Diary</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        Teachers photograph blackboard assignments or type tasks directly into the parent feed.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#c5221f] text-xs mb-1">WhatsApp Slip Archive</div>
                      <p className="text-[11px] text-[#5f6368] leading-normal">
                        No lost paper challans. Parents retain all paid receipts directly on their phones.
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
