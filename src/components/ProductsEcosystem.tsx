import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronRight, Globe, Smartphone, Tablet, PlayCircle } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { PRODUCTS, type Product, type ProductStatus } from '../data/products';
import { InteractiveDeviceSimulator } from './InteractiveDeviceSimulator';

interface ProductsEcosystemProps {
  onOpenBooking: () => void;
}

const STATUS: Record<ProductStatus, { label: string; dot: string; chip: string }> = {
  live: { label: 'Live on Google Play', dot: '#1e8e3e', chip: 'bg-[#e6f4ea] text-[#137333]' },
  preview: { label: 'Preview', dot: '#f29900', chip: 'bg-[#fef7e0] text-[#b06000]' },
};

const PLATFORM_ICON = { Android: Smartphone, Web: Globe, Tablet: Tablet } as const;

const ProductIcon: React.FC<{ product: Product; size?: string; active?: boolean }> = ({ product, size = 'w-12 h-12', active }) => {
  if (product.iconSrc) {
    return <img src={product.iconSrc} alt="" draggable={false} className={`${size} rounded-2xl object-cover shrink-0 bg-white`} />;
  }
  const Icon = product.Icon!;
  return (
    <span
      className={`${size} rounded-2xl flex items-center justify-center shrink-0 transition-colors`}
      style={{ backgroundColor: active ? product.color : `${product.color}1a`, color: active ? '#fff' : product.color }}
    >
      <Icon className="w-1/2 h-1/2" />
    </span>
  );
};

/** Clickable list of real app screenshots with a short caption for each. Auto-plays until the visitor takes over. */
const ScreenExplorer: React.FC<{ product: Product }> = ({ product }) => {
  const screens = product.screens ?? [];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -20% 0px' });
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || !inView || reduceMotion || screens.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % screens.length), 4200);
    return () => clearInterval(t);
  }, [auto, inView, reduceMotion, screens.length]);

  if (screens.length === 0) return null;

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-[minmax(0,260px)_1fr] gap-6 sm:gap-8 items-center">
      <div className="relative mx-auto w-full max-w-[250px] sm:max-w-none">
        <div
          className="absolute -inset-6 -z-10 rounded-full blur-3xl opacity-25"
          style={{ background: `radial-gradient(circle, ${product.color}, transparent 70%)` }}
        />
        <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden shadow-2xl border border-black/10 bg-[#f1f3f4]">
          {screens.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.caption}
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>

      <ol className="space-y-1.5" aria-label={`${product.name} screens`}>
        {screens.map((s, i) => {
          const active = i === idx;
          return (
            <li key={s.src}>
              <button
                onClick={() => {
                  setIdx(i);
                  setAuto(false);
                }}
                aria-current={active}
                className={`w-full text-left flex items-start gap-3 px-3.5 py-3 rounded-2xl border transition-all cursor-pointer ${
                  active ? 'bg-white shadow-sm' : 'border-transparent hover:bg-[#f8f9fa]'
                }`}
                style={active ? { borderColor: `${product.color}55` } : undefined}
              >
                <span
                  className="mt-0.5 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors"
                  style={active ? { backgroundColor: product.color, color: '#fff' } : { backgroundColor: '#f1f3f4', color: '#5f6368' }}
                >
                  {i + 1}
                </span>
                <span className={`text-sm leading-snug ${active ? 'font-semibold text-[#202124]' : 'text-[#5f6368]'}`}>{s.caption}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export const ProductsEcosystem: React.FC<ProductsEcosystemProps> = ({ onOpenBooking }) => {
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const N = PRODUCTS.length;

  // Scroll-spy: the last chapter whose top has passed a line 40% down the screen is the active one.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let idx = 0;
      chapterRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(i);
    chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section id="products" className="bg-white text-[#202124] border-b border-[#dadce0] py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">Our Products</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">One ecosystem for the school, the parents and the child.</h2>
          <p className="mt-3 text-sm sm:text-base text-[#5f6368]">
            Scroll through each product. Tap a screen to see how it really looks.
          </p>
        </div>

        {/* Mobile: a slim product bar that stays under the navbar */}
        <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2 bg-white/95 backdrop-blur border-b border-[#e8eaed] overflow-x-auto no-scrollbar">
          <div className="flex gap-2 w-max">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={`h-9 px-3 rounded-full text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                  i === active ? 'text-white border-transparent' : 'bg-white text-[#5f6368] border-[#dadce0]'
                }`}
                style={i === active ? { backgroundColor: p.color } : undefined}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-12 items-start mt-6 lg:mt-0">
          {/* Left: stays pinned while the right side scrolls */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <div className="rounded-3xl border border-[#e8eaed] bg-white shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-3 border-b border-[#e8eaed]">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5f6368]">Complete</div>
                <div className="text-xl font-bold mt-1">
                  MSchool <span className="text-[#1a73e8]">Ecosystem</span>
                </div>
              </div>

              <div role="tablist" aria-label="Products" className="p-2.5 space-y-1">
                {PRODUCTS.map((p, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={p.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => goTo(i)}
                      className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left cursor-pointer transition-colors hover:bg-[#f8f9fa]"
                      style={on ? { backgroundColor: `${p.color}12` } : undefined}
                    >
                      {on && <span className="absolute -left-2.5 top-2 bottom-2 w-1 rounded-full" style={{ backgroundColor: p.color }} />}
                      <ProductIcon product={p} size="w-11 h-11" active={on} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold truncate" style={on ? { color: p.color } : { color: '#3c4043' }}>
                          {p.name}
                        </span>
                        <span className="block text-xs text-[#5f6368] truncate">{p.subtitle}</span>
                      </span>
                      <span
                        className="w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0"
                        style={on ? { backgroundColor: p.color, color: '#fff' } : { backgroundColor: '#f1f3f4', color: '#5f6368' }}
                      >
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="px-5 pt-3 pb-4 border-t border-[#e8eaed]">
                <div className="flex justify-between text-xs text-[#5f6368] mb-2">
                  <span>Progress</span>
                  <span className="font-semibold text-[#202124]">
                    {active + 1} / {N}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-[#e8eaed] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((active + 1) / N) * 100}%`, backgroundColor: PRODUCTS[Math.min(active, N - 1)].color }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Right: one chapter per product, scrolled in order */}
          <div className="space-y-20 sm:space-y-28 min-w-0">
            {PRODUCTS.map((p, i) => {
              const st = STATUS[p.status];
              const next = PRODUCTS[i + 1];
              return (
                <article
                  key={p.id}
                  id={`product-${p.id}`}
                  data-index={i}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                  className="scroll-mt-32 lg:scroll-mt-28"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ backgroundColor: `${p.color}14`, color: p.color }}
                    >
                      <i className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      Product {i + 1} of {N}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold ${st.chip}`}>
                      <i className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: st.dot }} />
                      {st.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <ProductIcon product={p} size="w-14 h-14 sm:w-16 sm:h-16" active />
                    <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
                      {p.name}
                      <sup className="text-xs text-[#5f6368] font-semibold ml-1">™</sup>
                    </h3>
                  </div>
                  <p className="mt-4 text-base sm:text-lg text-[#5f6368] leading-relaxed max-w-2xl">{p.description}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.15em] text-[#5f6368] mb-1.5">AVAILABLE ON</div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.platforms.map((pl) => {
                          const Ic = PLATFORM_ICON[pl];
                          return (
                            <span key={pl} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#dadce0] text-xs font-semibold">
                              <Ic className="w-3.5 h-3.5" style={{ color: p.color }} />
                              {pl}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {p.stats.length > 0 && (
                      <div className="flex flex-wrap gap-2.5">
                        {p.stats.map(([v, l]) => (
                          <div key={l} className="rounded-2xl border border-[#e8eaed] px-4 py-2.5 min-w-[96px]">
                            <b className="block text-xl font-extrabold leading-tight" style={{ color: p.color }}>
                              {v}
                            </b>
                            <span className="text-[10px] uppercase tracking-[0.1em] text-[#5f6368]">{l}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {p.playStoreUrl && (
                      <a
                        href={p.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-5 rounded-full text-sm font-semibold text-white bg-[#202124] hover:bg-black transition-colors inline-flex items-center gap-2"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Get it on Google Play
                      </a>
                    )}
                    <button
                      onClick={onOpenBooking}
                      className="h-11 px-5 rounded-full text-sm font-semibold border border-[#dadce0] hover:border-[#bdc1c6] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {p.status === 'live' ? 'Book a Free Demo' : `Ask about ${p.name}`}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* The interactive part */}
                  <div className="mt-10 rounded-3xl bg-[#f8f9fa] border border-[#e8eaed] p-5 sm:p-8">
                    {p.demo === 'screens' && <ScreenExplorer product={p} />}
                    {p.demo === 'games' && (
                      <div className="max-w-[360px] mx-auto">
                        <InteractiveDeviceSimulator embedded lockedTab="mkids" />
                      </div>
                    )}
                  </div>

                  <div className="mt-10">
                    <div className="text-sm font-bold mb-3">{p.includesTitle}</div>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {p.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 rounded-xl border border-[#e8eaed] px-3 py-2.5 text-sm font-semibold">
                          <Check className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {next && (
                    <button
                      onClick={() => goTo(i + 1)}
                      className="mt-10 inline-flex items-center gap-2 text-sm font-semibold cursor-pointer group"
                      style={{ color: next.color }}
                    >
                      Next: {next.name}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
