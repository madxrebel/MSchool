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
      description: "Search 10,000+ student profiles in milliseconds. No spinning loaders or unresponsive screens during rush hours."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#1a73e8]" />,
      bg: 'bg-[#e8f0fe]',
      title: "Atomic Financial Integrity",
      description: "Every fee transaction is strictly atomic. Balances, receipt numbers, and logs update together with zero risk of duplicate slips."
    },
    {
      icon: <Printer className="w-5 h-5 text-[#1e8e3e]" />,
      bg: 'bg-[#e6f4ea]',
      title: "58mm Counter Thermal Printing",
      description: "Connect standard counter thermal printers via Bluetooth or USB. Print official receipts in 2 seconds with zero ink costs."
    },
    {
      icon: <Share2 className="w-5 h-5 text-[#1a73e8]" />,
      bg: 'bg-[#e8f0fe]',
      title: "WhatsApp & SMS Slip Dispatch",
      description: "Send official fee receipts and absence alerts directly to parents' WhatsApp with a single tap from the counter."
    },
    {
      icon: <Users className="w-5 h-5 text-[#d93025]" />,
      bg: 'bg-[#fce8e6]',
      title: "Consolidated Family Accounting",
      description: "Link multiple siblings under a single Family ID so parents receive one clean monthly statement."
    },
    {
      icon: <Clock className="w-5 h-5 text-[#1e8e3e]" />,
      bg: 'bg-[#e6f4ea]',
      title: "15-Second Morning Sweeps",
      description: "Quick attendance cards allow teachers to complete classroom check-in in seconds without disrupting instruction."
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-white text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
            Platform Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#202124] mb-3">
            Why leading institutions choose MSchool
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368]">
            Engineered around the ground realities of modern educational administration.
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.map((adv, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#dadce0] hover:shadow-md transition-shadow space-y-3"
            >
              <div className={`p-2.5 rounded-xl ${adv.bg} w-fit`}>
                {adv.icon}
              </div>
              <h3 className="font-bold text-base text-[#202124]">{adv.title}</h3>
              <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
