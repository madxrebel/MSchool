import React, { useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import { CTA_TEXTS, FREE_PILOT_FORM_CONFIG } from '../constants';

interface PilotRequestFormProps {
  source?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const PilotRequestForm: React.FC<PilotRequestFormProps> = ({
  source = 'Free Pilot Form',
  onSuccess,
  onClose,
  isModal = false,
}) => {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [role, setRole] = useState<string>(FREE_PILOT_FORM_CONFIG.roleOptions[0]);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [studentCount, setStudentCount] = useState<string>(FREE_PILOT_FORM_CONFIG.studentCountOptions[2]); // '500 - 1000 Students'
  const [interestedProducts, setInterestedProducts] = useState<string[]>([
    ...FREE_PILOT_FORM_CONFIG.defaultInterestedProducts,
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleProductToggle = (prod: string) => {
    if (interestedProducts.includes(prod)) {
      setInterestedProducts(interestedProducts.filter((p) => p !== prod));
    } else {
      setInterestedProducts([...interestedProducts, prod]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !schoolName.trim()) {
      setErrorMessage('Please fill in your name, school name, and phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const bookingData = {
      name: name.trim(),
      schoolName: schoolName.trim(),
      role,
      phone: phone.trim(),
      city: city.trim() || 'Not specified',
      estimatedStudents: studentCount,
      interestedProducts,
      createdAt: new Date().toISOString(),
      source,
    };

    try {
      await addDoc(collection(db, 'schoolInquiries'), bookingData);
      setSubmitted(true);
      confetti({ particleCount: 65, spread: 70 });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.warn('Firebase submission error, persisting locally:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('mschool_pilot_requests') || '[]');
        stored.push(bookingData);
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
    setCity('');
    if (onClose) onClose();
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-[#f8fafd] text-center space-y-3.5 border border-[#d2e3fc] animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-[#202124]">
          {FREE_PILOT_FORM_CONFIG.successTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#5f6368] max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{name}</strong>! We have received your request for <strong>{schoolName}</strong>. 
          Our academic onboarding team will reach out to you directly via WhatsApp at <strong>{phone}</strong> to activate your 30-day pilot.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold rounded-full text-xs cursor-pointer shadow-xs transition-colors"
            >
              {CTA_TEXTS.DONE}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-[#1a73e8] hover:underline cursor-pointer py-1"
            >
              {CTA_TEXTS.SUBMIT_ANOTHER}
            </button>
          )}
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

      {/* Row 1: Full Name & School Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-[#202124] font-semibold mb-1">
            {FREE_PILOT_FORM_CONFIG.labels.fullName}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={FREE_PILOT_FORM_CONFIG.labels.fullNamePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] placeholder:text-[#80868b] focus:border-[#1a73e8] focus:outline-none focus:ring-1 focus:ring-[#1a73e8] text-xs transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#202124] font-semibold mb-1">
            {FREE_PILOT_FORM_CONFIG.labels.schoolName}
          </label>
          <input
            type="text"
            required
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder={FREE_PILOT_FORM_CONFIG.labels.schoolNamePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] placeholder:text-[#80868b] focus:border-[#1a73e8] focus:outline-none focus:ring-1 focus:ring-[#1a73e8] text-xs transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Role, Phone, City */}
      <div className={`grid grid-cols-1 ${isModal ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3.5`}>
        <div>
          <label className="block text-[#202124] font-semibold mb-1">
            {FREE_PILOT_FORM_CONFIG.labels.role}
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:border-[#1a73e8] focus:outline-none text-xs"
          >
            {FREE_PILOT_FORM_CONFIG.roleOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[#202124] font-semibold mb-1">
            {FREE_PILOT_FORM_CONFIG.labels.phone}
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={FREE_PILOT_FORM_CONFIG.labels.phonePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] placeholder:text-[#80868b] focus:border-[#1a73e8] focus:outline-none focus:ring-1 focus:ring-[#1a73e8] text-xs transition-colors"
          />
        </div>

        <div className={isModal ? 'sm:col-span-2' : ''}>
          <label className="block text-[#202124] font-semibold mb-1">
            {FREE_PILOT_FORM_CONFIG.labels.city}
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={FREE_PILOT_FORM_CONFIG.labels.cityPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] placeholder:text-[#80868b] focus:border-[#1a73e8] focus:outline-none focus:ring-1 focus:ring-[#1a73e8] text-xs transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Estimated Students */}
      <div>
        <label className="block text-[#202124] font-semibold mb-1">
          {FREE_PILOT_FORM_CONFIG.labels.studentCount}
        </label>
        <select
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:border-[#1a73e8] focus:outline-none text-xs"
        >
          {FREE_PILOT_FORM_CONFIG.studentCountOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Row 4: Modules of Interest */}
      <div>
        <label className="block text-[#202124] font-semibold mb-1.5">
          {FREE_PILOT_FORM_CONFIG.labels.interestedModules}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          {FREE_PILOT_FORM_CONFIG.interestedProductsOptions.map((prod) => {
            const isChecked = interestedProducts.includes(prod);
            return (
              <label
                key={prod}
                onClick={() => handleProductToggle(prod)}
                className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8] font-semibold'
                    : 'bg-white border-[#dadce0] text-[#5f6368] hover:border-[#bdc1c6]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded text-[#1a73e8] focus:ring-0 cursor-pointer"
                />
                <span>{prod}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>{CTA_TEXTS.SUBMITTING}</span>
          ) : (
            <>
              <span>{CTA_TEXTS.START_FREE_PILOT_SUBMIT}</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-[#5f6368] text-center">
        {FREE_PILOT_FORM_CONFIG.footerNote}
      </p>
    </form>
  );
};
