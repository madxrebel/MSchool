import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, BookOpen, QrCode, Sparkles } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import dreamzLogo from '../assets/dreamz/logo.png';
import row1 from '../assets/dreamz/books-row-1.jpg';
import row2 from '../assets/dreamz/books-row-2.jpg';
import row3 from '../assets/dreamz/books-row-3.jpg';

interface DreamzBridgeProps {
  color: string;
  /** Text colour that adapts to the theme */
  ink: string;
  /** MKids app icon */
  appIcon?: string;
  /** Landscape app screens; the first few are cycled next to the book */
  screens: { src: string; caption: string }[];
}

/**
 * Makes the link between the physical Dreamz Publications books and MKids obvious:
 * MKids is the ebook of those books. Book covers are illustrations from the company's poster.
 */
const CLASSES = [
  { cls: 'Nursery', book: 'Book A', color: '#1a73e8', ink: 'var(--ink-mschool)' },
  { cls: 'KG-1', book: 'Book B', color: '#1e8e3e', ink: 'var(--ink-mstudent)' },
  { cls: 'KG-2', book: 'Book C', color: '#f29900', ink: 'var(--ink-mkids)' },
];

const STEPS = [
  { Icon: BookOpen, title: 'Pick up the Dreamz book', text: 'Every class has its English and Mathematics books.' },
  { Icon: QrCode, title: 'Type or scan the page', text: 'Enter the page number or scan it with the phone.' },
  { Icon: Sparkles, title: 'The page comes alive', text: 'The same page opens in MKids to play, trace and match.' },
];

export const DreamzBridge: React.FC<DreamzBridgeProps> = ({ color, ink, appIcon, screens }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -15% 0px' });
  const reduceMotion = useReducedMotion();
  const cycle = [screens[0], screens[2], screens[5]].filter(Boolean); // class, type or scan, a game
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion || cycle.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % cycle.length), 3200);
    return () => clearInterval(t);
  }, [inView, reduceMotion, cycle.length]);

  return (
    <div ref={ref} className="mt-10 space-y-6">
      {/* Joined header: Dreamz + MKids */}
      <div className="rounded-3xl border p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-7" style={{ borderColor: `${color}40`, backgroundColor: `${color}0d` }}>
        <div className="flex items-center gap-3 shrink-0">
          <span className="keep-theme w-20 h-20 rounded-2xl bg-white border border-[#e8eaed] p-1.5 shadow-sm flex items-center justify-center">
            <img src={dreamzLogo} alt="Dreamz Publications" draggable={false} className="w-full h-full object-contain" />
          </span>
          <span className="text-2xl font-extrabold text-[#5f6368]">+</span>
          {appIcon && (
            <img src={appIcon} alt="MKids" draggable={false} className="w-20 h-20 rounded-2xl border border-[#e8eaed] shadow-sm object-cover bg-white" />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#202124] leading-tight">
            MKids is the ebook of Dreamz Publications books.
          </h4>
          <p className="mt-1.5 text-sm sm:text-base text-[#5f6368]">
            Every Dreamz Pre-Primary book has its playable digital twin, from Nursery to KG-2.
          </p>
        </div>
      </div>

      {/* Book -> App */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 lg:gap-5 items-center">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5f6368] mb-2.5">The Dreamz book</div>
          <div className="space-y-2.5">
            {[row1, row2, row3].map((src, i) => (
              <img key={src} src={src} alt={`Dreamz Pre-Primary books, set ${i + 1}`} draggable={false} loading="lazy" className="w-full rounded-2xl border border-[#e8eaed] shadow-sm" />
            ))}
          </div>
        </div>

        <div className="flex lg:flex-col items-center justify-center gap-2 text-center" style={{ color: ink }}>
          <ArrowRight className="hidden lg:block w-8 h-8 animate-pulse" />
          <ArrowDown className="lg:hidden w-7 h-7 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em]">Type or scan</span>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5f6368] mb-2.5">The MKids app</div>
          <div className="relative rounded-[22px] bg-[#111214] p-2 sm:p-2.5 shadow-2xl ring-1 ring-black/10">
            <div className="relative aspect-[1100/484] rounded-[14px] overflow-hidden bg-[#f1f3f4]">
              {cycle.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.caption}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2.5 text-sm text-center text-[#5f6368] min-h-[2.5rem]">{cycle[idx]?.caption}</p>
        </div>
      </div>

      {/* One book per class */}
      <div>
        <div className="text-sm font-bold mb-3">One book for every class</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CLASSES.map((c) => (
            <div key={c.cls} className="rounded-2xl border border-[#e8eaed] p-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold" style={{ color: c.ink }}>
                  {c.cls}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${c.color}1a`, color: c.ink }}>
                  {c.book}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-[#5f6368]">English {c.book.slice(-1)} and Mathematics {c.book.slice(-1)}, in print and in MKids.</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STEPS.map(({ Icon, title, text }, i) => (
          <li key={title} className="flex items-start gap-3 rounded-2xl bg-white border border-[#e8eaed] p-4">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}1a`, color: ink }}>
              <Icon className="w-[18px] h-[18px]" />
            </span>
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#5f6368]">Step {i + 1}</span>
              <span className="block text-sm font-bold text-[#202124]">{title}</span>
              <span className="block text-xs text-[#5f6368] mt-0.5">{text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
