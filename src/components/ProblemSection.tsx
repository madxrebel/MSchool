import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Smartphone, MousePointerClick, Clock } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';

interface ProblemSectionProps {
  onOpenBooking: () => void;
}

const LINE_1 = 'These schools stopped chasing paperwork.'.split(' ');
const LINE_2 = 'Yours can too.'.split(' ');

// The attendance clock runs from 11:00 (the old way) down to 8:40 (with MSchool), in minutes
const CLOCK_FROM = 11 * 60;
const CLOCK_TO = 8 * 60 + 40;
const CLOCK_MS = 2200;

const fmt = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}:${String(m).padStart(2, '0')}`;
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' });
  const reduceMotion = useReducedMotion();
  const [play, setPlay] = useState(false);
  const [clock, setClock] = useState(CLOCK_FROM);

  // Plays once when the section scrolls into view and then stays put so it can be read.
  // Scrolling away resets it, so it plays again the next time the visitor comes back.
  useEffect(() => {
    if (reduceMotion) {
      setPlay(true);
      setClock(CLOCK_TO);
      return;
    }
    if (!inView) {
      setPlay(false);
      setClock(CLOCK_FROM);
      return;
    }
    let raf = 0;
    const run = () => {
      setPlay(true);
      setClock(CLOCK_FROM);
      const t0 = performance.now() + 900; // let the headline start first
      const tick = (now: number) => {
        const p = Math.min(1, Math.max(0, (now - t0) / CLOCK_MS));
        const eased = 1 - Math.pow(1 - p, 3);
        setClock(CLOCK_FROM + (CLOCK_TO - CLOCK_FROM) * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    run();
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [inView, reduceMotion]);

  const word = (w: string, i: number, offset: number, extra = '') => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-1">
      <span
        className={`inline-block transition-all duration-700 ease-out ${play ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'} ${extra}`}
        style={{ transitionDelay: play ? `${(offset + i) * 90}ms` : '0ms' }}
      >
        {w}&nbsp;
      </span>
    </span>
  );

  const proofs = [
    {
      Icon: Clock,
      value: fmt(clock),
      unit: 'AM',
      caption: 'Attendance is ready',
      note: 'It used to reach the principal at 10:00 and be checked until 11:00.',
    },
    {
      Icon: MousePointerClick,
      value: '1 click',
      unit: '',
      caption: 'Result cards, all done',
      note: 'Teachers upload, the principal approves, one click does the rest.',
    },
    {
      Icon: Smartphone,
      value: 'Every teacher',
      unit: '',
      caption: 'on their own phone',
      note: 'Nothing new to buy. Everyone already has a phone.',
    },
  ];

  return (
    <section id="problems" className="relative overflow-hidden py-20 sm:py-28 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      {/* Drifting colour behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb-a absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#1a73e8] opacity-[0.14] blur-3xl" />
        <div className="orb-b absolute -bottom-32 -right-20 w-[460px] h-[460px] rounded-full bg-[#34a853] opacity-[0.13] blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#1a73e8] mb-5 transition-all duration-700 ${play ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        >
          Your school is next
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
          <span className="block">{LINE_1.map((w, i) => word(w, i, 0))}</span>
          <span className="block relative mt-1 pb-3">
            {LINE_2.map((w, i) => word(w, i, LINE_1.length + 1, 'bg-gradient-to-r from-[#1a73e8] to-[#34a853] bg-clip-text text-transparent'))}
            <span
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1.5 w-40 sm:w-64 rounded-full bg-gradient-to-r from-[#1a73e8] to-[#34a853] origin-left"
              style={play ? { animation: `sweep-in 900ms ease-out ${(LINE_1.length + 3) * 90 + 300}ms both` } : { transform: 'scaleX(0)' }}
            />
          </span>
        </h2>

        {/* Three proof points: no boxes, just big numbers that count and pop in */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x sm:divide-[#dadce0]">
          {proofs.map(({ Icon, value, unit, caption, note }, i) => (
            <div
              key={caption}
              className={`px-4 sm:px-8 transition-all duration-700 ease-out ${play ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: play ? `${1100 + i * 220}ms` : '0ms' }}
            >
              <Icon className="w-7 h-7 mx-auto text-[#1a73e8] mb-3" />
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums text-[#202124]">
                {value}
                {unit && <span className="ml-1.5 text-lg sm:text-xl font-bold text-[#5f6368]">{unit}</span>}
              </div>
              <div className="mt-2 text-base font-bold text-[#1a73e8]">{caption}</div>
              <p className="mt-1.5 text-sm text-[#5f6368] leading-relaxed max-w-[16rem] mx-auto">{note}</p>
            </div>
          ))}
        </div>

        {/* Closing line and button */}
        <div
          className={`mt-14 sm:mt-20 transition-all duration-700 ease-out ${play ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: play ? '1900ms' : '0ms' }}
        >
          <p className="text-base sm:text-lg text-[#5f6368] max-w-2xl mx-auto">
            Fees, attendance, exams and expenses, all in one connected system. We will show you how it fits your school&apos;s mornings, in a free 15-minute walkthrough.
          </p>
          <button
            onClick={onOpenBooking}
            className="beam-border mt-8 h-12 px-8 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>See It in Your School</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
