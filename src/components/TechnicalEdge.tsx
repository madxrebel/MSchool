import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Printer, 
  Share2, 
  Users, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const TechnicalEdge: React.FC = () => {
  const advantages = [
    {
      icon: <Zap className="w-5 h-5 text-[#f29900]" />,
      bg: 'bg-[#fef7e0]',
      title: "Instant Zero-Wait Response",
      description: "Search 10,000+ student profiles in milliseconds with zero loading lag during peak rush hours.",
      highlight: "< 50ms search"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#1a73e8]" />,
      bg: 'bg-[#e8f0fe]',
      title: "Atomic Financial Integrity",
      description: "Every fee transaction is strictly atomic with zero risk of duplicate slips or mismatched ledgers.",
      highlight: "100% ledger audit"
    },
    {
      icon: <Printer className="w-5 h-5 text-[#1e8e3e]" />,
      bg: 'bg-[#e6f4ea]',
      title: "58mm Counter Thermal Printing",
      description: "Connect standard counter thermal printers via Bluetooth or USB to print ink-free slips in 2 seconds.",
      highlight: "2-sec print speed"
    },
    {
      icon: <Share2 className="w-5 h-5 text-[#1a73e8]" />,
      bg: 'bg-[#e8f0fe]',
      title: "WhatsApp & SMS Slip Dispatch",
      description: "Send official fee receipts and absent notices directly to parent WhatsApp with one click.",
      highlight: "1-tap WhatsApp"
    },
    {
      icon: <Users className="w-5 h-5 text-[#d93025]" />,
      bg: 'bg-[#fce8e6]',
      title: "Consolidated Family Accounting",
      description: "Link all siblings under one Family ID so parents receive a single unified monthly fee slip.",
      highlight: "Unified sibling ledger"
    },
    {
      icon: <Clock className="w-5 h-5 text-[#1e8e3e]" />,
      bg: 'bg-[#e6f4ea]',
      title: "15-Second Morning Sweeps",
      description: "Teachers mark entire class attendance in 15 seconds without stopping morning lessons.",
      highlight: "15-sec check-in"
    }
  ];

  return (
    <section id="features" className="py-14 sm:py-18 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-1.5 block">
            Platform Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124] mb-2">
            Why leading institutions choose MSchool
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368]">
            Engineered for high-volume counters, fast attendance, and reliable school accounting.
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {advantages.map((adv, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#dadce0] hover:border-[#1a73e8]/40 hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${adv.bg}`}>
                    {adv.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f3f4] text-[#3c4043]">
                    {adv.highlight}
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#202124]">{adv.title}</h3>
                <p className="text-xs text-[#5f6368] leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
