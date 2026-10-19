import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, type Product } from '../data/products';
import { ProductDetail, ProductIcon } from './ProductDetail';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSelect: (id: string) => void;
  onOpenBooking: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen view of one product. Esc, the X button and the browser Back button all close it. */
export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSelect, onOpenBooking }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = PRODUCTS.findIndex((p) => p.id === product.id);

  // Lock the page behind, remember where focus was, and move focus into the pop-up
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  // Each product starts at the top
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [product.id]);

  // Esc closes; Tab stays inside the pop-up
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !rootRef.current) return;
      const items = [...rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} in full screen`}
      className="fixed inset-0 z-[80] flex flex-col bg-white text-[#202124]"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Top bar: product tabs and the close button */}
      <header className="shrink-0 border-b border-[#e8eaed] bg-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 flex items-center gap-2 sm:gap-3">
          <nav aria-label="Products" className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {PRODUCTS.map((p) => {
              const on = p.id === product.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelect(p.id)}
                  aria-current={on ? 'true' : undefined}
                  className={`shrink-0 h-10 pl-1.5 pr-3.5 rounded-full border inline-flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
                    on ? 'border-transparent' : 'bg-white text-[#5f6368] border-[#dadce0] hover:border-[#bdc1c6]'
                  }`}
                  style={on ? { backgroundColor: p.color, color: p.on } : undefined}
                >
                  <ProductIcon product={p} size="w-7 h-7" active={on} />
                  <span className="whitespace-nowrap">{p.name}</span>
                </button>
              );
            })}
          </nav>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 h-10 w-10 sm:w-auto sm:px-4 rounded-full border border-[#dadce0] hover:border-[#bdc1c6] text-[#5f6368] hover:text-[#202124] inline-flex items-center justify-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer"
          >
            <X className="w-[18px] h-[18px]" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* The product itself */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <ProductDetail
            key={product.id}
            product={product}
            index={index}
            total={PRODUCTS.length}
            variant="modal"
            onOpenBooking={onOpenBooking}
            onNext={(next) => onSelect(next.id)}
          />
          <div className="mt-12 pt-6 border-t border-[#e8eaed] flex justify-center">
            <button
              onClick={onClose}
              className="h-11 px-6 rounded-full border border-[#dadce0] hover:border-[#bdc1c6] text-sm font-semibold text-[#5f6368] hover:text-[#202124] transition-colors cursor-pointer"
            >
              Back to the page
            </button>
          </div>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
};
