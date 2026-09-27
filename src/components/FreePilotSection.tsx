import React from 'react';
import { FREE_PILOT_FORM_CONFIG } from '../constants';
import { PilotRequestForm } from './PilotRequestForm';

interface FreePilotSectionProps {
  onOpenBooking?: () => void;
}

export const FreePilotSection: React.FC<FreePilotSectionProps> = () => {
  return (
    <section id="demo-request" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#dadce0] shadow-sm relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
              {FREE_PILOT_FORM_CONFIG.sectionEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              {FREE_PILOT_FORM_CONFIG.sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-2">
              {FREE_PILOT_FORM_CONFIG.sectionDescription}
            </p>
          </div>

          <PilotRequestForm source="Section Free Pilot Form" />

        </div>

      </div>
    </section>
  );
};

// Backward compatibility alias in case of legacy imports
export const KarachiExpoBanner = FreePilotSection;
