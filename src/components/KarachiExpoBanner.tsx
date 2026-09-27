import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  School, 
  Users, 
  ShieldCheck,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import confetti from 'canvas-confetti';

interface SchoolDemoRequestProps {
  onOpenBooking?: () => void;
}

export const KarachiExpoBanner: React.FC<SchoolDemoRequestProps> = () => {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [role, setRole] = useState('Principal');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [studentCount, setStudentCount] = useState('500 - 1000 Students');
  const [interestedProducts, setInterestedProducts] = useState<string[]>([
    'MSchool Management Suite',
    'mAttendance Quick Sweep',
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

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !schoolName.trim()) {
      setErrorMessage('Please fill in your name, school name, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const bookingData = {
      name,
      schoolName,
      role,
      phone,
      city: city || 'Not specified',
      estimatedStudents: studentCount,
      interestedProducts,
      createdAt: new Date().toISOString(),
      source: 'School Pilot Request Form',
    };

    try {
      await addDoc(collection(db, 'schoolInquiries'), bookingData);
      setSubmitted(true);
      confetti({ particleCount: 60, spread: 70 });
    } catch (err: any) {
      console.warn('Firebase submission error, saving locally:', err);
      try {
        const stored = JSON.parse(localStorage.getItem('mschool_pilot_requests') || '[]');
        stored.push(bookingData);
        localStorage.setItem('mschool_pilot_requests', JSON.stringify(stored));
      } catch (e) {
        // ignore
      }
      setSubmitted(true);
      confetti({ particleCount: 60, spread: 70 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo-request" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] relative border-b border-[#dadce0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#dadce0] shadow-sm relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">
              Free Institutional Onboarding
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Start your 30-day free pilot
            </h2>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-2">
              Experience the full ecosystem at your campus. Our team assists with data import, staff training, and thermal printer setup.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#f8fafd] text-center space-y-3 border border-[#d2e3fc]">
              <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#202124]">Pilot Request Received</h3>
              <p className="text-xs sm:text-sm text-[#5f6368] max-w-md mx-auto">
                Thank you, <strong>{name}</strong>! We will contact you via WhatsApp at <strong>{phone}</strong> to schedule onboarding for <strong>{schoolName}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-semibold text-[#1a73e8] hover:underline pt-2 cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#202124] font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Ullah Khan"
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
                    placeholder="e.g. City Model Grammar School"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:outline-[#1a73e8] text-xs transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[#202124] font-semibold mb-1">Your Designation</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] text-xs"
                  >
                    <option value="Principal">Principal / Head</option>
                    <option value="School Owner">School Owner / Trustee</option>
                    <option value="Director">Academic Director</option>
                    <option value="Administrator">Administrator / Accountant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#202124] font-semibold mb-1">Phone / WhatsApp *</label>
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
                    placeholder="e.g. Karachi, Lahore, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#dadce0] text-[#202124] focus:outline-[#1a73e8] text-xs transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#202124] font-semibold mb-1.5">
                  Modules of Interest:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {[
                    'MSchool Management Suite',
                    '58mm Thermal Receipt Printing',
                    'mKids Books & Learning Games',
                    'mAttendance Quick Sweep',
                    'Maymar Academy Parent App'
                  ].map((prod) => (
                    <label
                      key={prod}
                      onClick={() => handleProductToggle(prod)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                        interestedProducts.includes(prod)
                          ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8] font-semibold'
                          : 'bg-white border-[#dadce0] text-[#5f6368] hover:border-[#bdc1c6]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={interestedProducts.includes(prod)}
                        readOnly
                        className="rounded text-[#1a73e8]"
                      />
                      <span>{prod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Activate 30-Day Free School Pilot</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#5f6368] text-center">
                Includes complimentary assistance with student data onboarding.
              </p>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
