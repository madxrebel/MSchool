import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDeviceSimulator } from './components/InteractiveDeviceSimulator';
import { ProblemSection } from './components/ProblemSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { OutcomeSolutions } from './components/OutcomeSolutions';
import { ProductScreenshotsProof } from './components/ProductScreenshotsProof';
import { PakistanContextSection } from './components/PakistanContextSection';
import { PartnersAndStory } from './components/PartnersAndStory';
import { WhyChooseSection } from './components/WhyChooseSection';
import { EcosystemSection } from './components/EcosystemSection';
import { StrategicDemoCallout } from './components/StrategicDemoCallout';
import { FAQSection } from './components/FAQSection';
import { FinalDemoSection } from './components/FinalDemoSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { CTA_TEXTS } from './constants';
import { 
  Smartphone, 
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [simulatorInitialTab, setSimulatorInitialTab] = useState<'mschool' | 'mkids' | 'thermal'>('mschool');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active section observer
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['overview', 'interactive-demo', 'problems', 'outcomes', 'proof', 'case-study', 'why-mschool', 'faq', 'book-demo'];
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
    const simElement = document.getElementById('interactive-demo');
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
        {/* Step 1 & 2: Hero Section with Core Promise */}
        <Hero 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* Step 3: Interactive Product Proof (Immediate experience) */}
        <InteractiveDeviceSimulator 
          initialTab={simulatorInitialTab}
        />

        {/* Step 4: Problem Recognition */}
        <ProblemSection 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Step 5: Before vs After Operational Comparison */}
        <BeforeAfterSection 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Step 6: Outcome-Based Product Solutions */}
        <OutcomeSolutions 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* Step 7: Real Product Screens as Proof */}
        <ProductScreenshotsProof 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* Step 8: Built for Real Pakistani Schools */}
        <PakistanContextSection 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Step 9: Trust / Origin Story (20+ Partner Schools) */}
        <PartnersAndStory />

        {/* Step 10: Why Schools Choose MSchool (Benefits) */}
        <WhyChooseSection 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Step 11: The Bigger Connected Ecosystem */}
        <EcosystemSection 
          onOpenBooking={() => setBookingModalOpen(true)}
          onNavigateToSimulator={handleNavigateToSimulator}
        />

        {/* Step 12: Mid-Page Strategic Demo Callout */}
        <StrategicDemoCallout 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Step 13: FAQ / Real Objection Handling */}
        <FAQSection 
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Step 14: Final High-Converting Demo Form */}
        <FinalDemoSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => setBookingModalOpen(true)}
        onNavigateToSimulator={handleNavigateToSimulator}
      />

      {/* Floating Quick Action Dock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#dadce0] shadow-lg backdrop-blur-md">
        <a
          href="#problems"
          className="px-3 py-1.5 rounded-full text-xs font-medium text-[#5f6368] hover:text-[#202124] transition-colors"
        >
          Problems
        </a>
        <button
          onClick={() => handleNavigateToSimulator('mschool')}
          className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 text-[#1a73e8] hover:bg-[#e8f0fe] transition-colors cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>Interactive Demo</span>
        </button>
        <a
          href="#outcomes"
          className="px-3 py-1.5 rounded-full text-xs font-medium text-[#5f6368] hover:text-[#202124] transition-colors"
        >
          Outcomes
        </a>
        <a
          href="#proof"
          className="px-3 py-1.5 rounded-full text-xs font-medium text-[#5f6368] hover:text-[#202124] transition-colors"
        >
          Screens
        </a>
        <a
          href="#faq"
          className="px-3 py-1.5 rounded-full text-xs font-medium text-[#5f6368] hover:text-[#202124] transition-colors"
        >
          FAQ
        </a>
        <div className="w-[1px] h-4 bg-[#dadce0] mx-1" />
        <button
          onClick={() => setBookingModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-xs transition-colors cursor-pointer"
        >
          {CTA_TEXTS.BOOK_DEMO_SHORT}
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

      {/* Booking / Demo Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
