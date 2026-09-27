import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('Principal');
  const [preferredMode, setPreferredMode] = useState('Free 30-Day On-Campus Pilot');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !schoolName.trim()) {
      setErrorMsg('Please complete all required fields (*)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name,
      schoolName,
      phone,
      city: city || 'Not specified',
      role,
      preferredMode,
      createdAt: new Date().toISOString(),
      source: 'Pilot Booking Modal',
    };

    try {
      await addDoc(collection(db, 'schoolInquiries'), payload);
      setSubmitted(true);
      confetti({ particleCount: 50, spread: 60 });
    } catch (err: any) {
      console.warn('Firebase error, saving locally:', err);
      try {
        const list = JSON.parse(localStorage.getItem('mschool_pilot_requests') || '[]');
        list.push(payload);
        localStorage.setItem('mschool_pilot_requests', JSON.stringify(list));
      } catch (e) {
        // ignore
      }
      setSubmitted(true);
      confetti({ particleCount: 50, spread: 60 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#dadce0] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-[#202124] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#202124]">Pilot Request Confirmed</h3>
            <p className="text-xs sm:text-sm text-[#5f6368] max-w-sm mx-auto">
              Thank you, <strong>{name}</strong>! We will reach out to <strong>{phone}</strong> on WhatsApp to configure MSchool for <strong>{schoolName}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold rounded-full text-xs cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] block mb-1">
              30-Day Free Evaluation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#202124] mb-1">
              Request Your Free School Pilot
            </h3>
            <p className="text-xs text-[#5f6368] mb-5">
              Experience the MSchool ecosystem with zero setup fee or long-term commitment.
            </p>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] text-xs font-medium mb-3">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#202124] font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:outline-[#1a73e8] text-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#202124] font-semibold mb-1">School / Academy Name *</label>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. Al-Hira Public Grammar School"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:outline-[#1a73e8] text-xs transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#202124] font-semibold mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:outline-[#1a73e8] text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#202124] font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Karachi, Lahore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:outline-[#1a73e8] text-xs transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#202124] font-semibold mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] text-xs"
                  >
                    <option value="Principal">Principal / Head</option>
                    <option value="Owner">School Owner</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Accountant">Accountant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#202124] font-semibold mb-1">Preferred Mode</label>
                  <select
                    value={preferredMode}
                    onChange={(e) => setPreferredMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] text-xs"
                  >
                    <option value="Free 30-Day On-Campus Pilot">30-Day Free Pilot</option>
                    <option value="Online Zoom/Video Demo">Online Walkthrough</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Start 30-Day Free Pilot</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#5f6368] text-center">
                No credit card required. Free on-site staff training included.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
