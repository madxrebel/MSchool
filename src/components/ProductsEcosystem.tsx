import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { ProductDetail, ProductIcon } from './ProductDetail';
import { ProductModal } from './ProductModal';

interface ProductsEcosystemProps {
  onOpenBooking: () => void;
}

const readProductHash = (): string | null => {
  if (typeof window === 'undefined') return null;
  const id = window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : '';
  return PRODUCTS.some((p) => p.id === id) ? id : null;
};

export const ProductsEcosystem: React.FC<ProductsEcosystemProps> = ({ onOpenBooking }) => {
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const N = PRODUCTS.length;

  // The full-screen pop-up is driven by the URL hash (#/mschool, #/mstudent, #/mkids), so the Back
  // button closes it and a copied link opens it. Any "#/<product>" link on the page works.
  const [openId, setOpenId] = useState<string | null>(() => readProductHash());
  const pushedRef = useRef(false); // true when the pop-up was opened by a click, so Back can close it

  useEffect(() => {
    const sync = () => {
      const id = readProductHash();
      setOpenId((prev) => {
        if (id && !prev) pushedRef.current = true;
        return id;
      });
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const openProduct = useCallback((id: string) => {
    window.location.hash = `/${id}`;
  }, []);

  const selectProduct = useCallback((id: string) => {
    // switching inside the pop-up does not add history entries
    window.history.replaceState(null, '', `#/${id}`);
    setOpenId(id);
  }, []);

  const closeProduct = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setOpenId(null);
    }
  }, []);

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

  return (
    <section id="products" className="bg-white text-[#202124] border-b border-[#dadce0] py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">Our Products</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">One ecosystem for the school, the parents and the child.</h2>
          <p className="mt-3 text-sm sm:text-base text-[#5f6368]">
            Scroll through each product, or click one to open it full screen.
          </p>
        </div>

        {/* Mobile: a slim product bar that stays under the navbar */}
        <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2 bg-white/95 backdrop-blur border-b border-[#e8eaed] overflow-x-auto no-scrollbar">
          <div className="flex gap-2 w-max">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => openProduct(p.id)}
                className={`h-9 px-3 rounded-full text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                  i === active ? 'border-transparent' : 'bg-white text-[#5f6368] border-[#dadce0]'
                }`}
                style={i === active ? { backgroundColor: p.color, color: p.on } : undefined}
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

              <div aria-label="Products" className="p-2.5 space-y-1">
                {PRODUCTS.map((p, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={p.id}
                      aria-current={on ? 'true' : undefined}
                      aria-haspopup="dialog"
                      onClick={() => openProduct(p.id)}
                      className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left cursor-pointer transition-colors hover:bg-[#f8f9fa]"
                      style={on ? { backgroundColor: `${p.color}12` } : undefined}
                    >
                      {on && <span className="absolute -left-2.5 top-2 bottom-2 w-1 rounded-full" style={{ backgroundColor: p.color }} />}
                      <ProductIcon product={p} size="w-11 h-11" active={on} />
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm font-bold truncate ${on ? '' : 'text-[#3c4043]'}`} style={on ? { color: p.ink } : undefined}>
                          {p.name}
                        </span>
                        <span className="block text-xs text-[#5f6368] truncate">{p.subtitle}</span>
                      </span>
                      <span
                        className={`w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 ${on ? '' : 'bg-[#f1f3f4] text-[#5f6368]'}`}
                        style={on ? { backgroundColor: p.color, color: p.on } : undefined}
                      >
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="px-5 pt-3 pb-4 border-t border-[#e8eaed]">
                <p className="text-[11px] text-[#5f6368] mb-3">Click a product to open it full screen.</p>
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
            {PRODUCTS.map((p, i) => (
              <article
                key={p.id}
                id={`product-${p.id}`}
                data-index={i}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className="scroll-mt-32 lg:scroll-mt-28"
              >
                <ProductDetail
                  product={p}
                  index={i}
                  total={N}
                  onOpenBooking={onOpenBooking}
                  onNext={(next) => openProduct(next.id)}
                  onOpenFull={() => openProduct(p.id)}
                />
              </article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openId && PRODUCTS.some((p) => p.id === openId) && (
          <ProductModal
            key="product-modal"
            product={PRODUCTS.find((p) => p.id === openId)!}
            onClose={closeProduct}
            onSelect={selectProduct}
            onOpenBooking={onOpenBooking}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
