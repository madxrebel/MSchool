import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SchoolsMarquee } from './components/SchoolsMarquee';
import { PrincipalStory } from './components/PrincipalStory';
import { ResultCardsStory } from './components/ResultCardsStory';
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
import { 
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [simulatorInitialTab, setSimulatorInitialTab] = useState<'mschool' | 'mkids' | 'thermal'>('mschool');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);

  
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
          simulatorInitialTab={simulatorInitialTab}
        />

        <SchoolsMarquee />

        <PrincipalStory onOpenBooking={() => setBookingModalOpen(true)} />

        <ResultCardsStory onOpenBooking={() => setBookingModalOpen(true)} />

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
