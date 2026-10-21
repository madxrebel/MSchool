import React, { useState } from 'react';
import { 
  School, 
  Gamepad2, 
  Zap, 
  Users, 
  CheckCircle2, 
  ChevronRight
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
    <section id="ecosystem" className="py-14 sm:py-18 bg-[#f8f9fa] text-[#202124] border-t border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Brief and concise */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-1.5 block">
            Integrated Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124] mb-2">
            Everything your school needs, connected.
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368]">
            Admissions, fee collection, student attendance, and parent communication working in total synchrony.
          </p>
        </div>

        {/* 4 Interactive Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
          {ECOSYSTEM_MODULES.map((m) => {
            const isSelected = m.id === selectedPillarId;
            const theme = getPillarColor(m.id);
            return (
              <button
                key={m.id}
                onClick={() => setSelectedPillarId(m.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-white shadow-2xs border-[#1a73e8] ring-2 ring-[#e8f0fe]'
                    : 'bg-white/80 border-[#dadce0] hover:border-[#bdc1c6] text-[#5f6368]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="p-1.5 rounded-lg flex items-center justify-center shrink-0"
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
                <div className="font-bold text-xs sm:text-sm text-[#202124]">{m.title}</div>
                <div className="text-[11px] text-[#5f6368] mt-0.5 line-clamp-1">{m.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-5 sm:p-8 rounded-2xl bg-white border border-[#dadce0] shadow-2xs relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: getPillarColor(selectedModule.id).bg, color: getPillarColor(selectedModule.id).color }}>
                  {getPillarIcon(selectedModule.id)}
                  <span>{selectedModule.subtitle}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#202124]">
                  {selectedModule.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                  {selectedModule.description}
                </p>

                {/* Highlights List - Short bullets */}
                <div className="space-y-2 pt-1">
                  {selectedModule.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#3c4043]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1e8e3e] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="pt-3 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (selectedModule.id === 'mkids') {
                        onNavigateToSimulator('mkids');
                      } else {
                        onNavigateToSimulator('mschool');
                      }
                    }}
                    className="h-9 px-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Launch in Live Simulator</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="h-9 px-3.5 rounded-full bg-white hover:bg-[#f8fafd] text-[#1a73e8] font-medium text-xs border border-[#dadce0] transition-colors cursor-pointer"
                  >
                    Request School Pilot
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Preview Card */}
              <div className="lg:col-span-5 bg-[#f8f9fa] p-5 rounded-xl border border-[#dadce0] space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-[#dadce0] pb-2">
                  <span className="font-semibold text-[#5f6368] uppercase text-[10px]">Campus Impact</span>
                  <span className="text-[#137333] font-bold text-[10px] bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                    Active in Partner Schools
                  </span>
                </div>

                {selectedModule.id === 'mschool' && (
                  <div className="space-y-2 text-[#3c4043]">
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#202124] text-xs">Instant Sibling Fee Collection</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Combines family dues in one click with instant Bluetooth thermal slips.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#202124] text-xs">Zero-Wait Student Lookup</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Search across 10,000+ records in milliseconds with zero lag.
                      </p>
                    </div>
                  </div>
                )}

                {selectedModule.id === 'mkids' && (
                  <div className="space-y-2 text-[#3c4043]">
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#b06000] text-xs">Physical Workbooks + Apps</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Children complete printed exercises and reinforce learning through tablet games.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#b06000] text-xs">Early Math & Phonics</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Interactive racing, balloon popping, and letter tracing engines.
                      </p>
                    </div>
                  </div>
                )}

                {selectedModule.id === 'mattendance' && (
                  <div className="space-y-2 text-[#3c4043]">
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#137333] text-xs">15-Second Morning Sweeps</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Teachers mark full class rolls with rapid swipe taps.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#137333] text-xs">Automatic Parent Alerts</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Absences and late entries automatically trigger guardian notices.
                      </p>
                    </div>
                  </div>
                )}

                {selectedModule.id === 'maymar' && (
                  <div className="space-y-2 text-[#3c4043]">
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#c5221f] text-xs">Digital Homework & Diary</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Blackboard assignments and homework sent straight to parent smartphones.
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-[#dadce0]">
                      <div className="font-bold text-[#c5221f] text-xs">WhatsApp Slips & Results</div>
                      <p className="text-[11px] text-[#5f6368] mt-0.5">
                        Digital fee receipts and exam report cards saved on parents' WhatsApp.
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
