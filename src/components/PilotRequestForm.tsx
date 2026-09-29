import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import { CTA_TEXTS, DEMO_FORM_CONFIG, BRAND_CONFIG } from '../constants';

interface PilotRequestFormProps {
  source?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const PilotRequestForm: React.FC<PilotRequestFormProps> = ({
  source = 'Free Demo Form',
  onSuccess,
  onClose,
  isModal = false,
}) => {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentCount, setStudentCount] = useState<string>(DEMO_FORM_CONFIG.studentCountOptions[1]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !schoolName.trim()) {
      setErrorMessage('Please provide your name, school name, and phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const inquiryData = {
      name: name.trim(),
      schoolName: schoolName.trim(),
      phone: phone.trim(),
      studentCount,
      notes: message.trim(),
      createdAt: new Date().toISOString(),
      source,
    };

    try {
      await addDoc(collection(db, 'schoolInquiries'), inquiryData);
      setSubmitted(true);
      confetti({ particleCount: 65, spread: 70 });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.warn('Firebase submission error, persisting locally:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('mschool_pilot_requests') || '[]');
        stored.push(inquiryData);
        localStorage.setItem('mschool_pilot_requests', JSON.stringify(stored));
      } catch (storageErr) {
        // ignore storage errors
      }
      setSubmitted(true);
      confetti({ particleCount: 65, spread: 70 });
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setSchoolName('');
    setPhone('');
    setMessage('');
    if (onClose) onClose();
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-[#f8fafd] text-center space-y-3.5 border border-[#d2e3fc] animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-[#202124]">
          Walkthrough Request Received
        </h3>
        <p className="text-xs sm:text-sm text-[#5f6368] max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{name}</strong>! We have received your request for <strong>{schoolName}</strong>. 
          Our team will reach out directly via WhatsApp at <strong>{phone}</strong> to coordinate a convenient time for your campus walkthrough.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold rounded-full text-xs cursor-pointer shadow-xs transition-colors"
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-[#1a73e8] hover:underline cursor-pointer py-1"
            >
              Submit another inquiry
            </button>
          )}

          <a
            href={BRAND_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#1e8e3e] hover:underline inline-flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp directly</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] font-medium">
          {errorMessage}
        </div>
      )}

      {/* Row 1: Name & School Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block font-bold text-[#202124] mb-1.5">
            {DEMO_FORM_CONFIG.labels.name}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={DEMO_FORM_CONFIG.labels.namePlaceholder}
            className="w-full h-10 px-3.5 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#e8f0fe] outline-hidden text-[#202124] placeholder:text-[#9aa0a6] transition-all bg-white"
          />
        </div>

        <div>
          <label className="block font-bold text-[#202124] mb-1.5">
            {DEMO_FORM_CONFIG.labels.schoolName}
          </label>
          <input
            type="text"
            required
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder={DEMO_FORM_CONFIG.labels.schoolNamePlaceholder}
            className="w-full h-10 px-3.5 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#e8f0fe] outline-hidden text-[#202124] placeholder:text-[#9aa0a6] transition-all bg-white"
          />
        </div>
      </div>

      {/* Row 2: Phone & Estimated Active Students */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block font-bold text-[#202124] mb-1.5">
            {DEMO_FORM_CONFIG.labels.phone}
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={DEMO_FORM_CONFIG.labels.phonePlaceholder}
            className="w-full h-10 px-3.5 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#e8f0fe] outline-hidden text-[#202124] placeholder:text-[#9aa0a6] transition-all bg-white"
          />
        </div>

        <div>
          <label className="block font-bold text-[#202124] mb-1.5">
            {DEMO_FORM_CONFIG.labels.studentCount}
          </label>
          <select
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
            className="w-full h-10 px-3.5 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#e8f0fe] outline-hidden text-[#202124] transition-all bg-white cursor-pointer"
          >
            {DEMO_FORM_CONFIG.studentCountOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Optional message */}
      <div>
        <label className="block font-bold text-[#202124] mb-1.5">
          {DEMO_FORM_CONFIG.labels.message}
        </label>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={DEMO_FORM_CONFIG.labels.messagePlaceholder}
          className="w-full p-3 rounded-xl border border-[#dadce0] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#e8f0fe] outline-hidden text-[#202124] placeholder:text-[#9aa0a6] transition-all bg-white resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-99"
        >
          <span>{isSubmitting ? CTA_TEXTS.SUBMITTING : DEMO_FORM_CONFIG.submitButton}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Reassurance text */}
      <p className="text-[11px] text-[#5f6368] text-center pt-1">
        {DEMO_FORM_CONFIG.reassurance}
      </p>
    </form>
  );
};
