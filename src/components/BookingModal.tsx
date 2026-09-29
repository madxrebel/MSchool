import React from 'react';
import { X } from 'lucide-react';
import { DEMO_FORM_CONFIG } from '../constants';
import { PilotRequestForm } from './PilotRequestForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#dadce0] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#202124] max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block mb-1">
            {DEMO_FORM_CONFIG.eyebrow}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#202124] mb-1">
            {DEMO_FORM_CONFIG.cardTitle}
          </h3>
          <p className="text-xs text-[#5f6368]">
            {DEMO_FORM_CONFIG.cardSubtitle}
          </p>
        </div>

        {/* Demo Request Form */}
        <PilotRequestForm 
          source="Modal Demo Request" 
          onClose={onClose}
          isModal={true}
        />

      </div>
    </div>
  );
};
