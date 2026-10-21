import React, { useMemo, useState } from 'react';
import { Check, Minus, Plus, School, User, MessageCircle, BookOpen } from 'lucide-react';
import {
  CLASS_PRICES,
  FLAT_ADDONS,
  PLANS,
  PRICES_CONFIRMED,
  SCHOOL_TIERS,
  calcOrder,
  emptySelection,
  formatPKR,
  type BuyerType,
  type ClassId,
  type OrderSelection,
} from '../data/mkidsPricing';
import { buildOrderUrl, type OrderContact } from '../lib/mkidsOrder';

const INPUT =
  'w-full h-11 px-3.5 rounded-xl border border-[#dadce0] bg-white text-sm text-[#202124] placeholder:text-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20';
const STEP = 'text-xs font-bold uppercase tracking-wider text-[#1a73e8]';

const Stepper: React.FC<{ value: number; onChange: (n: number) => void; label: string }> = ({ value, onChange, label }) => (
  <div className="inline-flex items-center rounded-full border border-[#dadce0] bg-white">
    <button
      type="button"
      aria-label={`Fewer ${label}`}
      onClick={() => onChange(Math.max(0, value - 1))}
      className="w-10 h-10 flex items-center justify-center text-[#5f6368] hover:text-[#1a73e8] cursor-pointer"
    >
      <Minus className="w-4 h-4" />
    </button>
    <input
      inputMode="numeric"
      aria-label={label}
      value={value === 0 ? '' : String(value)}
      placeholder="0"
      onChange={(e) => {
        const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
        onChange(Number.isFinite(n) ? Math.min(n, 5000) : 0);
      }}
      className="w-14 text-center text-sm font-bold text-[#202124] bg-transparent focus:outline-none"
    />
    <button
      type="button"
      aria-label={`More ${label}`}
      onClick={() => onChange(Math.min(5000, value + 1))}
      className="w-10 h-10 flex items-center justify-center text-[#5f6368] hover:text-[#1a73e8] cursor-pointer"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

export const MKidsOrderBuilder: React.FC = () => {
  const [sel, setSel] = useState<OrderSelection>(() => emptySelection('school'));
  const [contact, setContact] = useState<OrderContact>({ name: '', schoolName: '', phone: '', city: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const totals = useMemo(() => calcOrder(sel), [sel]);
  const isSchool = sel.buyer === 'school';
  const unitWord = isSchool ? 'students' : 'children';

  const setBuyer = (buyer: BuyerType) => setSel((s) => ({ ...emptySelection(buyer), plan: s.plan, qty: s.qty, withBooks: s.withBooks }));
  const setQty = (id: ClassId, n: number) => setSel((s) => ({ ...s, qty: { ...s.qty, [id]: n } }));
  const toggleBooks = (id: ClassId) => setSel((s) => ({ ...s, withBooks: { ...s.withBooks, [id]: !s.withBooks[id] } }));
  const toggleAddon = (id: string) =>
    setSel((s) => ({ ...s, addons: s.addons.includes(id) ? s.addons.filter((a) => a !== id) : [...s.addons, id] }));
  const field = (k: keyof OrderContact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact((c) => ({ ...c, [k]: e.target.value }));
    setSent(false);
  };

  const nextTier = SCHOOL_TIERS.find((t) => t.minStudents > totals.students && t.discount > totals.discountRate);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (totals.students === 0) err.items = `Choose at least one class and enter how many ${unitWord}.`;
    if (!contact.name.trim()) err.name = 'Please enter your name.';
    if (isSchool && !contact.schoolName.trim()) err.schoolName = 'Please enter your school name.';
    if (contact.phone.trim().length < 7) err.phone = 'Please enter a phone number we can reach.';
    if (!contact.city.trim()) err.city = 'Please enter your city.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const win = window.open(buildOrderUrl(sel, {
      name: contact.name.trim().slice(0, 120),
      schoolName: contact.schoolName.trim().slice(0, 160),
      phone: contact.phone.trim().slice(0, 20),
      city: contact.city.trim().slice(0, 80),
      notes: contact.notes.trim().slice(0, 1000),
    }), '_blank');
    if (win) win.opener = null;
    setSent(true);
  };

  return (
    <section id="order" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-y border-[#dadce0] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">Build your order</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Choose what you need. See the price instantly.</h2>
          <p className="mt-3 text-[#5f6368]">Pick your classes, add what you want, and send the order to us on WhatsApp in one tap.</p>
        </div>

        {!PRICES_CONFIRMED && (
          <p className="mb-6 mx-auto max-w-3xl rounded-xl bg-[#fef7e0] text-[#b06000] border border-[#f9e2a5] text-sm font-semibold px-4 py-3 text-center">
            Sample prices for review. Final prices are confirmed with you on WhatsApp before anything is charged.
          </p>
        )}

        <form onSubmit={submit} noValidate className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Left: the choices */}
          <div className="space-y-6">
            {/* 1. Who */}
            <div className="rounded-3xl bg-white border border-[#dadce0] p-5 sm:p-6">
              <div className={STEP}>Step 1</div>
              <h3 className="text-lg font-extrabold mt-0.5 mb-3">Who is ordering?</h3>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Who is ordering">
                {([['school', 'A school', School], ['parent', 'A parent', User]] as const).map(([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={sel.buyer === id}
                    onClick={() => setBuyer(id)}
                    className={`h-14 rounded-2xl border-2 text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      sel.buyer === id ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]' : 'border-[#dadce0] bg-white text-[#3c4043] hover:border-[#1a73e8]/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Classes */}
            <div className="rounded-3xl bg-white border border-[#dadce0] p-5 sm:p-6">
              <div className={STEP}>Step 2</div>
              <h3 className="text-lg font-extrabold mt-0.5 mb-1">Pick classes and numbers</h3>
              <p className="text-sm text-[#5f6368] mb-4">
                Enter how many {unitWord} are in each class. {isSchool ? 'The more students, the bigger the discount.' : ''}
              </p>
              <div className="space-y-3">
                {CLASS_PRICES.map((c) => {
                  const n = sel.qty[c.id];
                  return (
                    <div key={c.id} className={`rounded-2xl border p-4 transition-colors ${n > 0 ? 'border-[#1a73e8]/40 bg-[#e8f0fe]' : 'border-[#e8eaed]'}`}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-extrabold">{c.name}</div>
                          <div className="text-xs text-[#5f6368]">
                            English, Urdu and Math · {formatPKR(Math.round(c.perStudentYear * (PLANS.find((p) => p.id === sel.plan)?.multiplier ?? 1)))} per child
                          </div>
                        </div>
                        <Stepper value={n} onChange={(v) => setQty(c.id, v)} label={`${c.name} ${unitWord}`} />
                      </div>
                      {n > 0 && (
                        <label className="mt-3 flex items-start gap-2.5 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sel.withBooks[c.id]}
                            onChange={() => toggleBooks(c.id)}
                            className="mt-0.5 w-4 h-4 accent-[#1a73e8]"
                          />
                          <span>
                            <span className="font-semibold inline-flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-[#1a73e8]" /> Add the printed Dreamz books ({c.book})
                            </span>
                            <span className="block text-xs text-[#5f6368]">{formatPKR(c.bookSetPrice)} per child</span>
                          </span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
              {errors.items && <p role="alert" className="mt-3 text-sm font-semibold text-[#d93025]">{errors.items}</p>}
              {isSchool && (
                <p className="mt-4 text-xs text-[#5f6368]">
                  School discount: {SCHOOL_TIERS.filter((t) => t.discount > 0).map((t) => `${Math.round(t.discount * 100)}% from ${t.minStudents} students`).join(', ')}.
                  {nextTier && totals.students > 0 && (
                    <span className="font-semibold text-[#1a73e8]"> Add {nextTier.minStudents - totals.students} more for {Math.round(nextTier.discount * 100)}% off.</span>
                  )}
                </p>
              )}
            </div>

            {/* 3. Plan */}
            <div className="rounded-3xl bg-white border border-[#dadce0] p-5 sm:p-6">
              <div className={STEP}>Step 3</div>
              <h3 className="text-lg font-extrabold mt-0.5 mb-3">How long?</h3>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Plan length">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={sel.plan === p.id}
                    onClick={() => setSel((s) => ({ ...s, plan: p.id }))}
                    className={`rounded-2xl border-2 p-4 text-left cursor-pointer transition-colors ${
                      sel.plan === p.id ? 'border-[#1a73e8] bg-[#e8f0fe]' : 'border-[#dadce0] bg-white hover:border-[#1a73e8]/50'
                    }`}
                  >
                    <div className="font-extrabold">{p.name}</div>
                    <div className="text-xs text-[#5f6368] mt-0.5">{p.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Extras (schools) */}
            {isSchool && (
              <div className="rounded-3xl bg-white border border-[#dadce0] p-5 sm:p-6">
                <div className={STEP}>Step 4 · optional</div>
                <h3 className="text-lg font-extrabold mt-0.5 mb-3">Help for your school</h3>
                <div className="space-y-2.5">
                  {FLAT_ADDONS.filter((a) => a.buyer === 'school').map((a) => (
                    <label key={a.id} className="flex items-start gap-3 rounded-2xl border border-[#e8eaed] p-4 cursor-pointer hover:border-[#1a73e8]/40">
                      <input type="checkbox" checked={sel.addons.includes(a.id)} onChange={() => toggleAddon(a.id)} className="mt-1 w-4 h-4 accent-[#1a73e8]" />
                      <span className="flex-1">
                        <span className="block font-bold text-sm">{a.name}</span>
                        <span className="block text-xs text-[#5f6368]">{a.detail}</span>
                      </span>
                      <span className="text-sm font-bold">{formatPKR(a.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: summary + contact + send */}
          <aside className="lg:sticky lg:top-24 rounded-3xl bg-white border border-[#dadce0] shadow-sm p-5 sm:p-6" aria-label="Order summary">
            <h3 className="text-lg font-extrabold mb-3">Your order</h3>
            {totals.lines.length === 0 ? (
              <p className="text-sm text-[#5f6368] py-4">Nothing yet. Enter the number of {unitWord} in a class to start.</p>
            ) : (
              <ul className="divide-y divide-[#e8eaed] text-sm" aria-live="polite">
                {totals.lines.map((l) => (
                  <li key={l.label} className="py-2.5 flex justify-between gap-3">
                    <span>
                      <span className="block font-semibold">{l.label}</span>
                      <span className="block text-xs text-[#5f6368]">{l.detail}</span>
                    </span>
                    <span className="font-bold whitespace-nowrap">{formatPKR(l.amount)}</span>
                  </li>
                ))}
                {totals.discount > 0 && (
                  <li className="py-2.5 flex justify-between gap-3 text-[#137333]">
                    <span className="font-semibold">School discount ({Math.round(totals.discountRate * 100)}%)</span>
                    <span className="font-bold whitespace-nowrap">-{formatPKR(totals.discount)}</span>
                  </li>
                )}
              </ul>
            )}
            <div className="mt-3 pt-3 border-t-2 border-[#202124]/10 flex items-baseline justify-between">
              <span className="font-bold">Total{PRICES_CONFIRMED ? '' : ' (estimate)'}</span>
              <span className="text-2xl font-extrabold text-[#1a73e8]">{formatPKR(totals.total)}</span>
            </div>

            <div className="mt-5 space-y-3">
              {([
                ['name', 'Your name', 'name'],
                ...(isSchool ? [['schoolName', 'School name', 'organization']] : []),
                ['phone', 'Phone number', 'tel'],
                ['city', 'City', 'address-level2'],
              ] as [keyof OrderContact, string, string][]).map(([k, label, ac]) => (
                <div key={k}>
                  <input
                    className={INPUT}
                    placeholder={label}
                    aria-label={label}
                    autoComplete={ac}
                    value={contact[k]}
                    onChange={field(k)}
                    inputMode={k === 'phone' ? 'tel' : undefined}
                    maxLength={k === 'phone' ? 20 : 160}
                  />
                  {errors[k] && <p role="alert" className="mt-1 text-xs font-semibold text-[#d93025]">{errors[k]}</p>}
                </div>
              ))}
              <textarea
                className={`${INPUT} h-20 py-2.5 resize-none`}
                placeholder="Notes (optional): delivery address, questions"
                aria-label="Notes"
                maxLength={1000}
                value={contact.notes}
                onChange={field('notes')}
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full h-12 rounded-full bg-[#1e8e3e] hover:bg-[#188038] text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Send order on WhatsApp
            </button>
            <p className="mt-2.5 text-xs text-[#5f6368] text-center">
              WhatsApp opens with your order already typed. Tap Send there to place it. We reply to confirm price, payment and delivery.
            </p>
            {sent && (
              <p role="status" className="mt-3 rounded-xl bg-[#e6f4ea] text-[#137333] text-sm font-semibold px-3 py-2.5 flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
                <span>WhatsApp should have opened. The order is only placed once you tap Send there. If it did not open, press the button again.</span>
              </p>
            )}
          </aside>
        </form>
      </div>
    </section>
  );
};
