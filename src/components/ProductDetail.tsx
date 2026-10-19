import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronRight, Globe, Maximize2, Smartphone, Tablet, PlayCircle } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { PRODUCTS, type Product, type ProductStatus } from '../data/products';
import { DreamzBridge } from './DreamzBridge';

export const STATUS: Record<ProductStatus, { label: string; dot: string; chip: string }> = {
  live: { label: 'Live on Google Play', dot: '#1e8e3e', chip: 'bg-[#e6f4ea] text-[#137333]' },
  preview: { label: 'Preview', dot: '#f29900', chip: 'bg-[#fef7e0] text-[#b06000]' },
};

export const PLATFORM_ICON = { Android: Smartphone, Web: Globe, Tablet: Tablet } as const;

export const ProductIcon: React.FC<{ product: Product; size?: string; active?: boolean }> = ({ product, size = 'w-12 h-12', active }) => {
  if (product.iconSrc) {
    return <img src={product.iconSrc} alt="" draggable={false} className={`${size} rounded-2xl object-cover shrink-0 bg-white`} />;
  }
  const Icon = product.Icon!;
  return (
    <span
      className={`${size} rounded-2xl flex items-center justify-center shrink-0 transition-colors`}
      style={{ backgroundColor: active ? product.color : `${product.color}1a`, color: active ? product.on : product.ink }}
    >
      <Icon className="w-1/2 h-1/2" />
    </span>
  );
};

/** Clickable list of real app screenshots with a short caption for each. Auto-plays until the visitor takes over. */
export const ScreenExplorer: React.FC<{ product: Product; large?: boolean }> = ({ product, large }) => {
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

  const landscape = product.screenShape === 'landscape';

  const captions = (
    <ol className={landscape ? 'grid grid-cols-1 sm:grid-cols-2 gap-1.5' : 'space-y-1.5'} aria-label={`${product.name} screens`}>
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
                className={`mt-0.5 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${active ? '' : 'bg-[#f1f3f4] text-[#5f6368]'}`}
                style={active ? { backgroundColor: product.color, color: product.on } : undefined}
              >
                {i + 1}
              </span>
              <span className={`text-sm leading-snug ${active ? 'font-semibold text-[#202124]' : 'text-[#5f6368]'}`}>{s.caption}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  const stack = screens.map((s, i) => (
    <img
      key={s.src}
      src={s.src}
      alt={s.caption}
      draggable={false}
      loading={i === 0 ? 'eager' : 'lazy'}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
    />
  ));

  if (landscape) {
    // Horizontal (tablet-style) frame, captions underneath
    return (
      <div ref={ref} className="space-y-6">
        <div className={`relative mx-auto w-full ${large ? 'max-w-3xl' : 'max-w-2xl'}`}>
          <div
            className="absolute -inset-6 -z-10 rounded-full blur-3xl opacity-25"
            style={{ background: `radial-gradient(circle, ${product.color}, transparent 70%)` }}
          />
          <div className="rounded-[26px] bg-[#111214] p-2 sm:p-3 shadow-2xl ring-1 ring-black/10">
            <div className="relative aspect-[1100/484] rounded-[16px] overflow-hidden bg-[#f1f3f4]">{stack}</div>
          </div>
        </div>
        {captions}
      </div>
    );
  }

  return (
    <div ref={ref} className={`grid grid-cols-1 ${large ? 'sm:grid-cols-[minmax(0,320px)_1fr]' : 'sm:grid-cols-[minmax(0,260px)_1fr]'} gap-6 sm:gap-8 items-center`}>
      <div className="relative mx-auto w-full max-w-[250px] sm:max-w-none">
        <div
          className="absolute -inset-6 -z-10 rounded-full blur-3xl opacity-25"
          style={{ background: `radial-gradient(circle, ${product.color}, transparent 70%)` }}
        />
        <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden shadow-2xl border border-black/10 bg-[#f1f3f4]">{stack}</div>
      </div>
      {captions}
    </div>
  );
};


interface ProductDetailProps {
  product: Product;
  index: number;
  total: number;
  onOpenBooking: () => void;
  /** Called when "Next: ..." is pressed (the next product is passed in) */
  onNext?: (next: Product) => void;
  /** Called when the visitor asks to see this product full screen (chapter view only) */
  onOpenFull?: () => void;
  /** 'modal' = inside the full-screen pop-up: bigger title and screenshots */
  variant?: 'chapter' | 'modal';
}

/** Everything about one product. Used for the scrolling chapters and for the full-screen pop-up. */
export const ProductDetail: React.FC<ProductDetailProps> = ({ product: p, index: i, total: N, onOpenBooking, onNext, onOpenFull, variant = 'chapter' }) => {
  const st = STATUS[p.status];
  const next = PRODUCTS[i + 1];
  const modal = variant === 'modal';
  const Title = modal ? 'h2' : 'h3';

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ backgroundColor: `${p.color}14`, color: p.ink }}
        >
          <i className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          Product {i + 1} of {N}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold ${st.chip}`}>
          <i className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: st.dot }} />
          {st.label}
        </span>
        {!modal && onOpenFull && (
          <button
            onClick={onOpenFull}
            className="ml-auto inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#dadce0] hover:border-[#bdc1c6] text-xs font-semibold text-[#5f6368] hover:text-[#202124] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Open full screen
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ProductIcon product={p} size="w-14 h-14 sm:w-16 sm:h-16" active />
        <Title className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
          {p.name}
          <sup className="text-xs text-[#5f6368] font-semibold ml-1">™</sup>
        </Title>
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
                  <Ic className="w-3.5 h-3.5" style={{ color: p.ink }} />
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
                <b className="block text-xl font-extrabold leading-tight" style={{ color: p.ink }}>
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

      {p.id === 'mkids' && p.screens && <DreamzBridge color={p.color} ink={p.ink} appIcon={p.iconSrc} screens={p.screens} />}

      {/* The interactive part */}
      <div className="mt-10 rounded-3xl bg-[#f8f9fa] border border-[#e8eaed] p-5 sm:p-8">
        {p.demo === 'screens' && <ScreenExplorer product={p} large={modal} />}
      </div>

      <div className="mt-10">
        <div className="text-sm font-bold mb-3">{p.includesTitle}</div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {p.includes.map((item) => (
            <li key={item} className="flex items-center gap-2 rounded-xl border border-[#e8eaed] px-3 py-2.5 text-sm font-semibold">
              <Check className="w-4 h-4 shrink-0" style={{ color: p.ink }} />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {next && onNext && (
        <button
          onClick={() => onNext(next)}
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold cursor-pointer group"
          style={{ color: next.ink }}
        >
          Next: {next.name}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </>
  );
};
