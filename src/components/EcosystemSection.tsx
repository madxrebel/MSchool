import React from 'react';
import { School, CheckCircle2, Users, Gamepad2, ChevronRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { ECOSYSTEM_CONTENT } from '../constants';

interface EcosystemSectionProps {
  onOpenBooking: () => void;
  onNavigateToSimulator: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  onOpenBooking,
  onNavigateToSimulator
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'mschool':
        return <School className="w-5 h-5 text-[#1a73e8]" />;
      case 'mattendance':
        return <CheckCircle2 className="w-5 h-5 text-[#1e8e3e]" />;
      case 'maymar':
        return <Users className="w-5 h-5 text-[#d93025]" />;
      case 'mkids':
        return <Gamepad2 className="w-5 h-5 text-[#f29900]" />;
      default:
        return <Layers className="w-5 h-5 text-[#1a73e8]" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            {ECOSYSTEM_CONTENT.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#202124] mb-2">
            {ECOSYSTEM_CONTENT.headline}
          </h2>
          <h3 className="text-lg sm:text-2xl font-bold text-[#1a73e8] mb-3">
            {ECOSYSTEM_CONTENT.subheadline}
          </h3>
          <p className="text-xs sm:text-sm text-[#5f6368] max-w-2xl mx-auto leading-relaxed">
            {ECOSYSTEM_CONTENT.clarification}
          </p>
        </div>

        {/* 4 Connected Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {ECOSYSTEM_CONTENT.modules.map((m) => {
            const isPrimary = m.id === 'mschool';
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isPrimary
                    ? 'bg-white border-[#1a73e8] ring-2 ring-[#e8f0fe] shadow-xs'
                    : 'bg-white border-[#dadce0] hover:border-[#bdc1c6] shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-center">
                      {getIcon(m.id)}
                    </div>
                    <span 
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isPrimary ? 'bg-[#e8f0fe] text-[#1a73e8]' : 'bg-[#f1f3f4] text-[#3c4043]'
                      }`}
                    >
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-[#202124]">{m.title}</h4>
                    <p className="text-[11px] font-semibold text-[#1a73e8] mt-0.5">{m.role}</p>
                  </div>

                  <p className="text-xs text-[#5f6368] leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f3f4]">
                  <button
                    onClick={() => {
                      if (m.id === 'mkids') {
                        onNavigateToSimulator('mkids');
                      } else {
                        onNavigateToSimulator('mschool');
                      }
                    }}
                    className="text-xs font-semibold text-[#1a73e8] hover:text-[#1557b0] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{m.id === 'mkids' ? 'Play Games' : 'Launch Preview'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
