import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDeviceSimulator } from './components/InteractiveDeviceSimulator';
import { EcosystemOverview } from './components/EcosystemOverview';
import { PortalsMatrix } from './components/PortalsMatrix';
import { TechnicalEdge } from './components/TechnicalEdge';
import { KarachiExpoBanner } from './components/KarachiExpoBanner';
import { PartnersAndStory } from './components/PartnersAndStory';
import { PricingCalculator } from './components/PricingCalculator';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Smartphone, 
  Gamepad2, 
  Layers, 
  DollarSign, 
  ArrowUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [simulatorInitialTab, setSimulatorInitialTab] = useState<'mschool' | 'mkids' | 'thermal'>('mschool');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active section observer
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['ecosystem', 'simulator', 'portals', 'pricing', 'story'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateToSimulator = (tab: 'mschool' | 'mkids' | 'thermal' = 'mschool') => {
    setSimulatorInitialTab(tab);
    const simElement = document.getElementById('simulator');
    if (simElement) {
      simElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8] relative">
      
      {/* Top Header */}
      <Navbar 
        onOpenBooking={() => setBookingModalOpen(true)}
        onNavigateToSimulator={handleNavigateToSimulator}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section with prominent quote hook */}
        <Hero 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* 4 Pillars Interactive Deck */}
        <EcosystemOverview 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* Live Device Interactive Simulator (MSchool, mKids Games, 58mm Thermal Receipt) */}
        <InteractiveDeviceSimulator 
          initialTab={simulatorInitialTab}
        />

        {/* 12 Core Categorized Departmental Portals */}
        <PortalsMatrix 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* Why Schools Switch (Operational Benefits) */}
        <TechnicalEdge />

        {/* 30-Day Free School Pilot Request Form (Firebase Firestore) */}
        <KarachiExpoBanner 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Credible Origin Story & 20+ Partner Schools */}
        <PartnersAndStory />

        {/* Transparent PKR Pricing with student strength slider */}
        <PricingCalculator 
          onOpenBooking={() => setBookingModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => setBookingModalOpen(true)}
        onNavigateToSimulator={handleNavigateToSimulator}
      />

      {/* Floating Quick Navigation Dock (Google Workspace Clean Style) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#dadce0] shadow-lg backdrop-blur-md">
        <a
          href="#ecosystem"
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeSection === 'ecosystem' ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold' : 'text-[#5f6368] hover:text-[#202124]'
          }`}
        >
          Ecosystem
        </a>
        <button
          onClick={() => handleNavigateToSimulator('mschool')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
            activeSection === 'simulator' ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold' : 'text-[#5f6368] hover:text-[#202124]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>App Demo</span>
        </button>
        <button
          onClick={() => handleNavigateToSimulator('mkids')}
          className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 text-[#b06000] hover:text-[#202124] transition-colors cursor-pointer"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-[#f29900]" />
          <span>mKids</span>
        </button>
        <a
          href="#portals"
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeSection === 'portals' ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold' : 'text-[#5f6368] hover:text-[#202124]'
          }`}
        >
          Portals
        </a>
        <a
          href="#pricing"
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeSection === 'pricing' ? 'bg-[#e8f0fe] text-[#1a73e8] font-semibold' : 'text-[#5f6368] hover:text-[#202124]'
          }`}
        >
          Pricing
        </a>
        <div className="w-[1px] h-4 bg-[#dadce0] mx-1" />
        <button
          onClick={() => setBookingModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-xs transition-colors cursor-pointer"
        >
          Get Pilot
        </button>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 sm:right-6 z-40 w-10 h-10 rounded-full bg-white border border-[#dadce0] text-[#5f6368] hover:text-[#1a73e8] hover:bg-[#f8fafd] flex items-center justify-center shadow-md transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 30-Day Free Pilot Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
