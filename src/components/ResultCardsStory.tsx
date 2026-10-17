import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Check, RotateCcw, Quote, FileText } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { SCHOOLS } from '../data/schools';

interface ResultCardsStoryProps {
  onOpenBooking: () => void;
}

/**
 * Second real story: exam results, from weeks of work to one click.
 * Edit the copy here. Confirm the quote wording with the speaker before publishing.
 */
const STORY = {
  eyebrow: 'Another Real Story',
  headline: 'Weeks of result work. Now one click.',
  quote:
    'We used to spend weeks preparing exam results. Now every teacher uploads their own class result, I only review and approve, and with one click all the result cards are ready, beautifully designed.',
  name: 'Sajda Usman',
  role: 'Vice Principal, Maymar-e-Noe Academy',
  schoolLogoName: 'Maymar e Noe Academy', // matches the file name in src/assets/schools
  students: 900,
};

const CLASSES = ['Nur', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// Stages of one loop of the animation
// 0 idle · 1 teachers uploading · 2 principal reviewing · 3 approved · 4 generating · 5 done
const UPLOAD_START_MS = 600;
const UPLOAD_STEP_MS = 220;
const COUNT_MS = 1400;
const HOLD_MS = 3200;
const RESET_PAUSE_MS = 900;

const STEPS = ['Teachers upload', 'Principal approves', 'One click'];

const MiniCard: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div
    className={`absolute w-24 h-32 rounded-lg bg-white shadow-xl border border-[#dadce0] p-2 flex flex-col gap-1.5 ${className}`}
    style={style}
    aria-hidden
  >
    <div className="h-2 rounded bg-[#1a73e8]" />
    <div className="flex items-center gap-1.5">
      <div className="w-5 h-5 rounded-full bg-[#e8f0fe]" />
      <div className="flex-1 space-y-1">
        <div className="h-1 rounded bg-[#dadce0]" />
        <div className="h-1 w-2/3 rounded bg-[#dadce0]" />
      </div>
    </div>
    {[0, 1, 2, 3].map((r) => (
      <div key={r} className="flex gap-1">
        <div className="h-1 flex-1 rounded bg-[#e8eaed]" />
        <div className="h-1 w-3 rounded bg-[#81c995]" />
      </div>
    ))}
    <div className="mt-auto h-3 rounded bg-[#e6f4ea] flex items-center justify-center">
      <div className="h-1 w-8 rounded bg-[#1e8e3e]" />
    </div>
  </div>
);

export const ResultCardsStory: React.FC<ResultCardsStoryProps> = ({ onOpenBooking }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -25% 0px' });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [uploaded, setUploaded] = useState(0);
  const [count, setCount] = useState(0);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStage(5);
      setUploaded(CLASSES.length);
      setCount(STORY.students);
      return;
    }
    if (!inView) {
      setStage(0);
      setUploaded(0);
      setCount(0);
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    let ticker: ReturnType<typeof setInterval> | undefined;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    const runCycle = () => {
      setStage(1);
      setUploaded(0);
      setCount(0);

      CLASSES.forEach((_, i) => at(UPLOAD_START_MS + i * UPLOAD_STEP_MS, () => setUploaded(i + 1)));
      const uploadsDone = UPLOAD_START_MS + CLASSES.length * UPLOAD_STEP_MS;

      at(uploadsDone + 300, () => setStage(2));
      at(uploadsDone + 1100, () => setStage(3));
      const generateAt = uploadsDone + 1900;
      at(generateAt, () => {
        setStage(4);
        const t0 = Date.now();
        ticker = setInterval(() => {
          const p = Math.min(1, (Date.now() - t0) / COUNT_MS);
          setCount(Math.round(STORY.students * (1 - Math.pow(1 - p, 3))));
          if (p >= 1 && ticker) clearInterval(ticker);
        }, 40);
      });
      at(generateAt + COUNT_MS + 100, () => setStage(5));

      const endsAt = generateAt + COUNT_MS + HOLD_MS;
      at(endsAt, () => {
        setStage(0);
        setUploaded(0);
        setCount(0);
      });
      at(endsAt + RESET_PAUSE_MS, runCycle);
    };

    runCycle();
    return () => {
      timers.forEach(clearTimeout);
      if (ticker) clearInterval(ticker);
    };
  }, [inView, replay, reduceMotion]);

  const logo = SCHOOLS.find((s) => s.name === STORY.schoolLogoName)?.logo;
  const activeStep = stage <= 1 ? 0 : stage <= 3 ? 1 : 2;
  const cardsVisible = stage >= 4;

  return (
    <section id="result-cards-story" className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">{STORY.eyebrow}</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{STORY.headline}</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: the animated workflow */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#202124] text-white flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ab4f8]">Result day</span>
              <button
                onClick={() => setReplay((n) => n + 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Replay animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay
              </button>
            </div>

            {/* Step indicator */}
            <ol className="grid grid-cols-3 gap-2 mb-5">
              {STEPS.map((label, i) => {
                const active = i === activeStep && stage > 0;
                const past = i < activeStep && stage > 0;
                return (
                  <li
                    key={label}
                    className={`rounded-xl px-2.5 py-2 text-[11px] sm:text-xs font-bold leading-tight border transition-colors duration-300 ${
                      active
                        ? 'bg-[#1a73e8] border-[#1a73e8] text-white'
                        : past
                        ? 'bg-[#1e8e3e]/20 border-[#1e8e3e]/40 text-[#81c995]'
                        : 'bg-white/5 border-white/10 text-white/50'
                    }`}
                  >
                    <span className="block text-[10px] opacity-70">Step {i + 1}</span>
                    {label}
                  </li>
                );
              })}
            </ol>

            {/* Class tiles: each teacher uploads */}
            <div className="grid grid-cols-6 gap-2 mb-5" aria-label="Classes uploading results">
              {CLASSES.map((c, i) => {
                const ok = uploaded > i;
                return (
                  <div
                    key={c}
                    className={`relative h-12 rounded-xl flex items-center justify-center text-sm font-extrabold border transition-all duration-300 ${
                      ok ? 'bg-[#1e8e3e] border-[#1e8e3e] text-white scale-100' : 'bg-white/5 border-white/10 text-white/50'
                    }`}
                  >
                    {ok ? <Check className="w-5 h-5" /> : c}
                  </div>
                );
              })}
            </div>

            {/* Approve + generate */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div
                className={`h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold border transition-all duration-300 ${
                  stage === 2
                    ? 'bg-[#f29900] border-[#f29900] text-[#202124] scale-[1.03]'
                    : stage >= 3
                    ? 'bg-[#1e8e3e]/20 border-[#1e8e3e]/50 text-[#81c995]'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                {stage >= 3 ? <Check className="w-4 h-4" /> : null}
                {stage >= 3 ? 'Approved' : 'Approve'}
              </div>
              <div
                className={`h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold border transition-all duration-300 ${
                  stage === 3
                    ? 'bg-[#1a73e8] border-[#1a73e8] text-white animate-pulse scale-[1.03]'
                    : stage >= 4
                    ? 'bg-[#1a73e8] border-[#1a73e8] text-white'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                <FileText className="w-4 h-4" />
                Generate result cards
              </div>
            </div>

            {/* Output: counter + fanned result cards */}
            <div className="relative flex-1 min-h-[190px] rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  opacity: cardsVisible ? 1 : 0.15,
                  transition: 'opacity 500ms ease',
                }}
              >
                <MiniCard
                  className="transition-all duration-700 ease-out"
                  style={{
                    transform: cardsVisible ? 'translateX(-70px) rotate(-10deg)' : 'translateX(0) rotate(0deg) scale(0.6)',
                    opacity: cardsVisible ? 1 : 0,
                  }}
                />
                <MiniCard
                  className="transition-all duration-700 ease-out delay-100"
                  style={{
                    transform: cardsVisible ? 'translateX(70px) rotate(10deg)' : 'translateX(0) rotate(0deg) scale(0.6)',
                    opacity: cardsVisible ? 1 : 0,
                  }}
                />
                <MiniCard
                  className="transition-all duration-700 ease-out delay-200 z-10"
                  style={{
                    transform: cardsVisible ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(0.6)',
                    opacity: cardsVisible ? 1 : 0,
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-3 text-center">
                <span className="text-3xl sm:text-4xl font-extrabold tabular-nums">{count}</span>
                <span className="block text-xs font-semibold text-white/70">
                  {stage >= 5 ? 'result cards ready' : stage === 4 ? 'generating result cards…' : 'result cards'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: the vice principal's words and the facts */}
          <div className="flex flex-col gap-5">
            <figure className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#dadce0] flex-1">
              <Quote className="w-8 h-8 text-[#1a73e8]/30 mb-3" aria-hidden />
              <blockquote className="text-lg sm:text-xl font-semibold leading-relaxed text-[#202124]">
                “{STORY.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {logo ? (
                  <img
                    src={logo}
                    alt=""
                    draggable={false}
                    className="w-12 h-12 rounded-xl object-contain bg-white border border-[#e8eaed] p-0.5"
                  />
                ) : (
                  <span className="w-12 h-12 rounded-xl bg-[#e8f0fe] text-[#1a73e8] font-extrabold flex items-center justify-center">
                    {STORY.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                )}
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-[#202124]">{STORY.name}</span>
                  <span className="block text-xs text-[#5f6368]">{STORY.role}</span>
                </span>
              </figcaption>
            </figure>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-[#e8f0fe]/70 border border-[#d2e3fc]">
                <span className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a73e8]">{STORY.students}</span>
                <span className="block text-xs font-semibold text-[#3c4043] mt-1">students, one result day</span>
              </div>
              <div className="p-5 rounded-3xl bg-[#e6f4ea]/80 border border-[#ceead6]">
                <span className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[#137333]">1 click</span>
                <span className="block text-xs font-semibold text-[#3c4043] mt-1">to generate every result card</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onOpenBooking}
            className="h-12 px-7 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>See result day in your school</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
