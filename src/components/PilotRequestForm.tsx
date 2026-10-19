import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';
import { CTA_TEXTS, DEMO_FORM_CONFIG, BRAND_CONFIG } from '../constants';
import { buildLeadWhatsAppUrl } from '../lib/whatsappLead';

interface PilotRequestFormProps {
  source?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

const SAVE_TIMEOUT_MS = 6000;

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
  // After submit: did the request reach our database, did WhatsApp open, and the link to (re)open it
  const [saved, setSaved] = useState<boolean | null>(null);
  const [waOpened, setWaOpened] = useState(false);
  const [waUrl, setWaUrl] = useState<string>(BRAND_CONFIG.whatsappUrl);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !schoolName.trim()) {
      setErrorMessage('Please provide your name, school name, and phone/WhatsApp number.');
      return;
    }
    // Keep in sync with firestore.rules (phone 7-20 chars, name <=120, school <=160, notes <=1000).
    if (phone.trim().length < 7 || phone.trim().length > 20) {
      setErrorMessage('Please enter a valid phone/WhatsApp number (7-20 characters).');
      return;
    }
    if (name.trim().length > 120 || schoolName.trim().length > 160 || message.trim().length > 1000) {
      setErrorMessage('One of the fields is too long. Please shorten it and try again.');
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

    // 1) Open WhatsApp with the details already typed in. This must happen right here, inside the
    //    click, or the browser blocks it. The visitor only has to press Send.
    const url = buildLeadWhatsAppUrl({
      name: inquiryData.name,
      schoolName: inquiryData.schoolName,
      phone: inquiryData.phone,
      studentCount: inquiryData.studentCount,
      notes: inquiryData.notes,
      source,
    });
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    setWaUrl(url);
    setWaOpened(!!win);
    confetti({ particleCount: 65, spread: 70 });

    // 2) Save a copy in the database as a backup, and tell the truth about whether that worked.
    let didSave = false;
    try {
      // Firestore waits forever when the visitor is offline, so give the save a few seconds at most
      await Promise.race([
        addDoc(collection(db, 'schoolInquiries'), inquiryData),
        new Promise((_, reject) => setTimeout(() => reject(new Error('save timed out')), SAVE_TIMEOUT_MS)),
      ]);
      didSave = true;
    } catch (err: any) {
      console.warn('Firebase submission error, keeping a copy on this device:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('mschool_pilot_requests') || '[]');
        stored.push(inquiryData);
        localStorage.setItem('mschool_pilot_requests', JSON.stringify(stored));
      } catch (storageErr) {
        // ignore storage errors
      }
    }
    setSaved(didSave);
    setSubmitted(true);
    if (onSuccess) onSuccess();
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSaved(null);
    setWaOpened(false);
    setName('');
    setSchoolName('');
    setPhone('');
    setMessage('');
    if (onClose) onClose();
  };

  if (submitted) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-[#f8fafd] text-center space-y-3.5 border border-[#d2e3fc] animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mx-auto shadow-xs">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#202124]">One last step: send it on WhatsApp</h3>
        <p className="text-xs sm:text-sm text-[#5f6368] max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{name}</strong>!{' '}
          {waOpened
            ? 'WhatsApp should have opened with your details already typed in. Just tap Send and your request reaches us instantly.'
            : 'Tap the green button below. WhatsApp opens with your details already typed in. Just tap Send.'}
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 rounded-full bg-[#1e8e3e] hover:bg-[#188038] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{waOpened ? 'Open WhatsApp again' : 'Send on WhatsApp'}</span>
        </a>

        <p className="text-[11px] text-[#5f6368] max-w-md mx-auto leading-relaxed">
          {saved ? (
            <>
              <CheckCircle2 className="inline w-3.5 h-3.5 text-[#137333] -mt-0.5 mr-1" />
              Your request for <strong>{schoolName}</strong> is also saved with us. We will contact you on <strong>{phone}</strong>.
            </>
          ) : (
            <>Your request is not complete until you send the WhatsApp message, so please do not skip this step.</>
          )}
        </p>

        <div className="pt-1 flex items-center justify-center">
          {onClose ? (
            <button type="button" onClick={onClose} className="text-xs font-semibold text-[#5f6368] hover:text-[#202124] hover:underline cursor-pointer py-1">
              Close
            </button>
          ) : (
            <button type="button" onClick={handleReset} className="text-xs font-semibold text-[#1a73e8] hover:underline cursor-pointer py-1">
              Submit another inquiry
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

      {/* Heads-up about the WhatsApp step */}
      <p className="text-[11px] text-[#5f6368] text-center pt-1 flex items-center justify-center gap-1.5">
        <MessageSquare className="w-3.5 h-3.5 text-[#1e8e3e] shrink-0" />
        <span>Next, WhatsApp opens with your details typed in. Tap Send to finish.</span>
      </p>

      {/* Reassurance text */}
      <p className="text-[11px] text-[#5f6368] text-center pt-1">
        {DEMO_FORM_CONFIG.reassurance}
      </p>
    </form>
  );
};
