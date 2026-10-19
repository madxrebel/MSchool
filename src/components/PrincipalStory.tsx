import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Check, RotateCcw, Quote } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { SCHOOLS } from '../data/schools';

interface PrincipalStoryProps {
  onOpenBooking: () => void;
}

/**
 * A real principal's story, told as "a principal's morning getting freed up".
 * Edit the copy here. Confirm the quote wording with the principal before publishing.
 */
const STORY = {
  eyebrow: "A Principal's Story",
  headline: 'What would you do with the time paperwork takes?',
  quote:
    'Everything is digital now, from fees to attendance. The paperwork has finished, and I finally have time to think about how to take my school forward.',
  name: 'Asima Ibrahim',
  role: 'Principal, Maymar-e-Noe Academy',
  schoolLogoName: 'Maymar e Noe Academy', // matches the file name in src/assets/schools
  statValue: '2h 20m',
  statLabel: 'saved every morning, from attendance alone',
  statDetail: 'Before: attendance reached her at 10:00 and she reviewed it until 11:00. Now it is ready by 8:40.',
};

const TASKS = ['Attendance', 'Fee registers', 'Result cards', 'Expenses', 'Reports'];

const STEP_MS = 650;
const START_DELAY_MS = 700;
const HOLD_MS = 2800; // how long 'Time to lead' stays on screen before the loop restarts
const RESET_PAUSE_MS = 900;

export const PrincipalStory: React.FC<PrincipalStoryProps> = ({ onOpenBooking }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -25% 0px' });
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(0);
  const [replay, setReplay] = useState(0);

  // Plays whenever the section is on screen: paperwork melts away, "Time to lead" holds, then it
  // resets and plays again. Leaving the screen resets it, so it restarts on every scroll-in.
  useEffect(() => {
    if (reduceMotion) {
      setDone(TASKS.length);
      return;
    }
    if (!inView) {
      setDone(0);
      return;
    }
    let timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      setDone(0);
      TASKS.forEach((_, i) => {
        timers.push(setTimeout(() => setDone(i + 1), START_DELAY_MS + i * STEP_MS));
      });
      const endsAt = START_DELAY_MS + TASKS.length * STEP_MS + HOLD_MS;
      timers.push(setTimeout(() => setDone(0), endsAt));
      timers.push(setTimeout(runCycle, endsAt + RESET_PAUSE_MS));
    };
    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [inView, replay, reduceMotion]);

  const allDone = done === TASKS.length;
  const logo = SCHOOLS.find((s) => s.name === STORY.schoolLogoName)?.logo;

  return (
    <section id="principal-story" className="py-16 sm:py-20 bg-white text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">{STORY.eyebrow}</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{STORY.headline}</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: the principal's words + the one hard number */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            <figure className="relative p-6 sm:p-8 rounded-3xl bg-[#f8f9fa] border border-[#dadce0] flex-1">
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
                    className="keep-theme w-12 h-12 rounded-xl object-contain bg-white border border-[#e8eaed] p-0.5"
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

            <div className="beam-border p-5 sm:p-6 rounded-3xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center gap-5">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1a73e8] shrink-0">
                {STORY.statValue}
              </span>
              <span className="leading-snug">
                <span className="block text-sm font-bold text-[#202124]">{STORY.statLabel}</span>
                <span className="block text-xs text-[#3c4043] mt-1">{STORY.statDetail}</span>
              </span>
            </div>
          </div>

          {/* Right: the principal's morning, freed up step by step */}
          <div className="order-1 lg:order-2 p-5 sm:p-7 rounded-3xl bg-[#202124] text-white flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8ab4f8]">The principal&apos;s morning</span>
              <button
                onClick={() => setReplay((n) => n + 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Replay animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay
              </button>
            </div>

            {/* The day bar: paperwork blocks shrink away, free time grows */}
            <div className="flex h-20 sm:h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              {TASKS.map((task, i) => {
                const gone = done > i;
                return (
                  <div
                    key={task}
                    className="flex items-center justify-center bg-[#f29900]/90 text-[#202124] border-r border-[#202124]/30 overflow-hidden"
                    style={{
                      flexGrow: gone ? 0 : 1,
                      flexBasis: 0,
                      opacity: gone ? 0 : 1,
                      transition: 'flex-grow 700ms cubic-bezier(.4,0,.2,1), opacity 450ms ease',
                    }}
                  >
                    <span className="px-1 text-[10px] sm:text-xs font-bold whitespace-nowrap [writing-mode:vertical-rl] sm:[writing-mode:horizontal-tb] rotate-180 sm:rotate-0">
                      {task}
                    </span>
                  </div>
                );
              })}
              <div
                className="flex items-center justify-center bg-gradient-to-r from-[#1a73e8] to-[#34a853] overflow-hidden"
                style={{
                  flexGrow: 0.35 + done * 1.3,
                  flexBasis: 0,
                  transition: 'flex-grow 700ms cubic-bezier(.4,0,.2,1)',
                }}
              >
                <span
                  className="px-2 text-sm sm:text-lg font-extrabold whitespace-nowrap"
                  style={{ opacity: allDone ? 1 : 0, transition: 'opacity 500ms ease 250ms' }}
                >
                  Time to lead
                </span>
              </div>
            </div>

            {/* Checklist */}
            <ul className="mt-5 space-y-2.5" aria-label="Tasks moved to MSchool">
              {TASKS.map((task, i) => {
                const gone = done > i;
                return (
                  <li key={task} className="flex items-center gap-3 text-sm">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        gone ? 'bg-[#1e8e3e] text-white' : 'bg-white/10 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className={`flex-1 font-semibold transition-colors duration-300 ${gone ? 'text-white' : 'text-white/60'}`}>
                      {task}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all duration-300 ${
                        gone ? 'bg-[#1e8e3e]/20 text-[#81c995]' : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {gone ? 'Digital' : 'Paper'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onOpenBooking}
            className="beam-border [--beam-a:#34a853] [--beam-b:#a8dab5] h-12 px-7 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>See how your day could look</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
