import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  UserCheck, 
  Search, 
  Check, 
  Printer, 
  Share2, 
  ChevronRight,
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROOF_SCREENS_CONTENT } from '../constants';

interface ProductScreenshotsProofProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const ProductScreenshotsProof: React.FC<ProductScreenshotsProofProps> = ({
  onOpenBooking,
  onNavigateToSimulator
}) => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>('dashboard');

  const selectedScreen = PROOF_SCREENS_CONTENT.screens.find(
    (s) => s.id === selectedScreenId
  ) || PROOF_SCREENS_CONTENT.screens[0];

  const getScreenIcon = (id: string) => {
    switch (id) {
      case 'dashboard':
        return <LayoutDashboard className="w-4 h-4" />;
      case 'fees':
        return <CreditCard className="w-4 h-4" />;
      case 'attendance':
        return <UserCheck className="w-4 h-4" />;
      case 'search':
        return <Search className="w-4 h-4" />;
      default:
        return <LayoutDashboard className="w-4 h-4" />;
    }
  };

  return (
    <section id="proof" className="py-16 sm:py-20 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {PROOF_SCREENS_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-3">
            {PROOF_SCREENS_CONTENT.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            {PROOF_SCREENS_CONTENT.subheadline}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8 max-w-4xl mx-auto">
          {PROOF_SCREENS_CONTENT.screens.map((screen) => {
            const isSelected = screen.id === selectedScreenId;
            return (
              <button
                key={screen.id}
                onClick={() => setSelectedScreenId(screen.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#1a73e8] text-white border-[#1a73e8] shadow-sm'
                    : 'bg-[#f8f9fa] border-[#dadce0] text-[#5f6368] hover:text-[#202124] hover:bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-white border border-[#dadce0] text-[#1a73e8]'}`}>
                  {getScreenIcon(screen.id)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold leading-tight sm:truncate">{screen.name}</div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-[#5f6368]'}`}>
                    {screen.id === 'dashboard' ? 'Daily pulse' : screen.id === 'fees' ? 'Fee counter' : screen.id === 'attendance' ? '15s check-in' : 'Instant search'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Proof Showcase Frame */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedScreen.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#f8f9fa] border border-[#dadce0] shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Operational Explanation */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#dadce0] text-xs font-bold text-[#1a73e8]">
                  <span>{selectedScreen.name}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#202124] leading-snug">
                  “{selectedScreen.headline}”
                </h3>

                <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                  {selectedScreen.description}
                </p>

                <div className="space-y-2 pt-2">
                  {selectedScreen.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#202124] font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenBooking}
                    className="h-9 px-4 rounded-full text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Book a Free Demo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigateToSimulator('mschool')}
                    className="h-9 px-4 rounded-full text-xs font-semibold text-[#1a73e8] bg-white hover:bg-[#f8fafd] border border-[#dadce0] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Test This Screen Live</span>
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity UI Interface Preview */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dadce0] p-4 sm:p-5 shadow-xs">
                
                {/* Simulated Desktop Window Bar */}
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pb-3 border-b border-[#f1f3f4] mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex gap-1 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ea4335]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fbbc05]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34a853]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#5f6368] ml-2 min-w-0">MSchool — {selectedScreen.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full whitespace-nowrap">
                    Live Campus Connection
                  </span>
                </div>

                {/* Dashboard Screen Mockup */}
                {selectedScreen.id === 'dashboard' && (
                  <div className="space-y-3 font-sans">
                    <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2.5">
                      <div className="p-3 bg-[#e8f0fe]/50 border border-[#d2e3fc] rounded-xl grid grid-cols-[1fr_auto] gap-x-3 items-center text-left min-[480px]:block min-[480px]:text-center">
                        <div className="col-start-1 text-[11px] font-semibold text-[#1a73e8]">Present Today</div>
                        <div className="col-start-2 row-start-1 row-span-2 self-center text-xl font-black whitespace-nowrap text-[#1a73e8] min-[480px]:mt-0.5">94.8%</div>
                        <div className="col-start-1 text-[10px] text-[#5f6368]">1,374 / 1,450 students</div>
                      </div>
                      <div className="p-3 bg-[#e6f4ea]/50 border border-[#ceead6] rounded-xl grid grid-cols-[1fr_auto] gap-x-3 items-center text-left min-[480px]:block min-[480px]:text-center">
                        <div className="col-start-1 text-[11px] font-semibold text-[#137333]">Fee Collection</div>
                        <div className="col-start-2 row-start-1 row-span-2 self-center text-xl font-black whitespace-nowrap text-[#137333] min-[480px]:mt-0.5">Rs. 84,000</div>
                        <div className="col-start-1 text-[10px] text-[#5f6368]">42 receipts printed</div>
                      </div>
                      <div className="p-3 bg-[#fef7e0]/50 border border-[#fde293] rounded-xl grid grid-cols-[1fr_auto] gap-x-3 items-center text-left min-[480px]:block min-[480px]:text-center">
                        <div className="col-start-1 text-[11px] font-semibold text-[#b06000]">Staff Checked In</div>
                        <div className="col-start-2 row-start-1 row-span-2 self-center text-xl font-black whitespace-nowrap text-[#b06000] min-[480px]:mt-0.5">48 / 50</div>
                        <div className="col-start-1 text-[10px] text-[#5f6368]">2 late notices sent</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#f8f9fa] border border-[#dadce0] rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs font-bold text-[#202124]">
                        <span>Today&apos;s Urgent Defaulter Follow-ups</span>
                        <span className="text-[10px] text-[#1a73e8] cursor-pointer whitespace-nowrap">Export List</span>
                      </div>
                      <div className="divide-y divide-[#dadce0] text-xs">
                        <div className="py-1.5 flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-center">
                          <span>Zaheer Ahmed (Class 4-A) • GR #121</span>
                          <span className="font-bold text-[#d93025] whitespace-nowrap">Rs. 17,500 due</span>
                        </div>
                        <div className="py-1.5 flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-center">
                          <span>Khalid Hussain (Class 10-A) • GR #123</span>
                          <span className="font-bold text-[#d93025] whitespace-nowrap">Rs. 17,500 due</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fees & Counter Screen Mockup */}
                {selectedScreen.id === 'fees' && (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 bg-[#f8fafd] border border-[#d2e3fc] rounded-xl flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-xs text-[#202124]">Muhammad Ahmed (Class 5-A)</div>
                        <div className="text-[11px] text-[#5f6368]">Family ID: FAM-109 • 2 Siblings Enrolled</div>
                      </div>
                      <span className="text-xs font-extrabold text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-1 rounded-full whitespace-nowrap">
                        Rs. 2,000 / month
                      </span>
                    </div>

                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl space-y-2 text-xs">
                      <div className="font-bold text-[#202124] flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <span>Selected Billing Months</span>
                        <span className="text-[#137333] font-bold">Total: Rs. 6,000</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#e8f0fe] text-[#1a73e8] font-medium text-[11px]">Feb 2026 ✓</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#e8f0fe] text-[#1a73e8] font-medium text-[11px]">Mar 2026 ✓</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#e8f0fe] text-[#1a73e8] font-medium text-[11px]">Apr 2026 ✓</span>
                      </div>
                    </div>

                    <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-stretch gap-2 pt-1">
                      <div className="flex-1 p-2 rounded-lg bg-[#e6f4ea] text-[#137333] text-xs font-semibold flex items-center justify-center gap-1.5">
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print 58mm Thermal Slip (2s)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#e8f0fe] text-[#1a73e8] text-xs font-semibold flex items-center justify-center gap-1">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attendance Screen Mockup */}
                {selectedScreen.id === 'attendance' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs font-bold text-[#202124] bg-[#f8f9fa] p-2.5 rounded-xl border border-[#dadce0]">
                      <span>Class: Nursery - Section A</span>
                      <span className="text-[#137333]">32 Present • 2 Absent</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-lg bg-white border border-[#dadce0] flex items-center justify-between gap-2">
                        <span>103 • Umar Majeed</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap bg-[#e6f4ea] text-[#137333]">
                          PRESENT
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#dadce0] flex items-center justify-between gap-2">
                        <span>201 • Sammi Khan</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap bg-[#fef7e0] text-[#b06000]">
                          LATE (08:15 AM)
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#dadce0] flex items-center justify-between gap-2">
                        <span>203 • Bibi Sanjii</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap bg-[#fce8e6] text-[#c5221f]">
                          ABSENT (SMS Sent)
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#5f6368] text-center pt-1 italic">
                      Tap any row once to cycle status. Completed in 15 seconds.
                    </div>
                  </div>
                )}

                {/* Student Search Screen Mockup */}
                {selectedScreen.id === 'search' && (
                  <div className="space-y-3 font-sans">
                    <div className="relative">
                      <Search className="w-4 h-4 text-[#5f6368] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        readOnly
                        value="Ahmed | GR #90"
                        className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0] text-xs font-mono text-[#202124]"
                      />
                    </div>

                    <div className="p-3 bg-white border border-[#dadce0] rounded-xl space-y-2 text-xs">
                      <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1 border-b border-[#f1f3f4] pb-1.5">
                        <span className="font-bold text-[#202124]">Muhammad Ahmed</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333]">Active Enrolled</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5f6368]">
                        <div>Father: Muhammad Kashif</div>
                        <div>Phone: 0300-1234567</div>
                        <div>Class: Five-A (Roll 14)</div>
                        <div>Family ID: FAM-109</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button className="flex-1 py-1.5 rounded-lg border border-[#dadce0] bg-[#f8f9fa] text-[#202124] font-medium">
                        View Full History
                      </button>
                      <button className="flex-1 py-1.5 rounded-lg border border-[#dadce0] bg-[#f8f9fa] text-[#1a73e8] font-medium">
                        Print ID Card
                      </button>
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
