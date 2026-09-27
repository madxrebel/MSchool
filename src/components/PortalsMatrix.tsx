import React, { useState } from 'react';
import { 
  GraduationCap, 
  CreditCard, 
  UserCheck, 
  FileText, 
  Calendar, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Briefcase, 
  Award, 
  BarChart3, 
  Settings, 
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PORTALS_LIST } from '../data/mockData';

interface PortalsMatrixProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const PortalsMatrix: React.FC<PortalsMatrixProps> = ({
  onOpenBooking,
  onNavigateToSimulator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'finance' | 'academic' | 'admin'>('finance');

  const categories = [
    { id: 'finance', label: 'Financial & Fees', count: '4 Modules' },
    { id: 'academic', label: 'Academic & Classroom', count: '4 Modules' },
    { id: 'admin', label: 'Campus & Family Ops', count: '4 Modules' },
  ];

  const getFilteredPortals = () => {
    switch (selectedCategory) {
      case 'finance':
        return ALL_PORTALS_LIST.filter((p) => 
          ['Fee Portal', 'Expenditure Portal', 'Payroll Portal', 'School Info & Analytics'].includes(p.name)
        );
      case 'academic':
        return ALL_PORTALS_LIST.filter((p) => 
          ['Student Portal', 'Attendance Portal', 'Exam Portal', 'Time Table Portal'].includes(p.name)
        );
      case 'admin':
        return ALL_PORTALS_LIST.filter((p) => 
          ['Family Portal', 'Staff Portal', 'Certificate Portal', 'Setup & System Portal'].includes(p.name)
        );
      default:
        return ALL_PORTALS_LIST.slice(0, 4);
    }
  };

  const getIconData = (name: string) => {
    switch (name) {
      case 'Student Portal': 
        return { icon: <GraduationCap className="w-5 h-5 text-[#1a73e8]" />, bg: 'bg-[#e8f0fe]' };
      case 'Fee Portal': 
        return { icon: <CreditCard className="w-5 h-5 text-[#1e8e3e]" />, bg: 'bg-[#e6f4ea]' };
      case 'Attendance Portal': 
        return { icon: <UserCheck className="w-5 h-5 text-[#1a73e8]" />, bg: 'bg-[#e8f0fe]' };
      case 'Exam Portal': 
        return { icon: <FileText className="w-5 h-5 text-[#f29900]" />, bg: 'bg-[#fef7e0]' };
      case 'Time Table Portal': 
        return { icon: <Calendar className="w-5 h-5 text-[#1a73e8]" />, bg: 'bg-[#e8f0fe]' };
      case 'Expenditure Portal': 
        return { icon: <TrendingDown className="w-5 h-5 text-[#d93025]" />, bg: 'bg-[#fce8e6]' };
      case 'Payroll Portal': 
        return { icon: <DollarSign className="w-5 h-5 text-[#1e8e3e]" />, bg: 'bg-[#e6f4ea]' };
      case 'Family Portal': 
        return { icon: <Users className="w-5 h-5 text-[#d93025]" />, bg: 'bg-[#fce8e6]' };
      case 'Staff Portal': 
        return { icon: <Briefcase className="w-5 h-5 text-[#1a73e8]" />, bg: 'bg-[#e8f0fe]' };
      case 'Certificate Portal': 
        return { icon: <Award className="w-5 h-5 text-[#f29900]" />, bg: 'bg-[#fef7e0]' };
      case 'School Info & Analytics': 
        return { icon: <BarChart3 className="w-5 h-5 text-[#1a73e8]" />, bg: 'bg-[#e8f0fe]' };
      case 'Setup & System Portal': 
        return { icon: <Settings className="w-5 h-5 text-[#5f6368]" />, bg: 'bg-[#f1f3f4]' };
      default: 
        return { icon: <Sparkles className="w-5 h-5 text-[#1a73e8]" />, bg: 'bg-[#e8f0fe]' };
    }
  };

  return (
    <section id="portals" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            Complete Operations Directory
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] mb-3">
            12 integrated school portals
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            Engineered to handle every facet of your institution with zero operational friction.
          </p>

          {/* Category Tabs (Google Style Segmented Pill) */}
          <div className="mt-6 inline-flex p-1 rounded-full bg-white border border-[#dadce0] shadow-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'text-[#5f6368] hover:text-[#202124]'
                }`}
              >
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {getFilteredPortals().map((portal) => {
              const { icon, bg } = getIconData(portal.name);
              return (
                <div
                  key={portal.name}
                  className="p-6 rounded-2xl bg-white border border-[#dadce0] hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex items-center gap-3 border-b border-[#f1f3f4] pb-3">
                    <div className={`p-2.5 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#202124]">{portal.name}</h3>
                      <span className="text-[11px] text-[#5f6368]">Integrated Android & Cloud Module</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {portal.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3c4043]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1e8e3e] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs border-t border-[#f1f3f4]">
                    <button
                      onClick={() => onNavigateToSimulator('mschool')}
                      className="text-[#1a73e8] hover:text-[#1557b0] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Try in simulator</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-[#5f6368]">Real-time sync</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
