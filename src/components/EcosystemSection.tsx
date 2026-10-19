import React from 'react';
import { ArrowRight, Check, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/products';

interface EcosystemSectionProps {
  onOpenBooking?: () => void;
  onNavigateToSimulator?: (tab?: 'mschool' | 'mkids' | 'thermal') => void;
}

const STATUS_LABEL = { live: 'Live on Google Play', preview: 'Preview' } as const;

/** "How the products connect", built from the real product data in src/data/products.ts. */
export const EcosystemSection: React.FC<EcosystemSectionProps> = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#f8f9fa] text-[#202124] border-b border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">Connected ecosystem</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">More than a school management app.</h2>
          <p className="text-sm sm:text-base text-[#5f6368] max-w-2xl mx-auto leading-relaxed">
            MSchool runs the school. MStudent keeps parents and students in the loop. MKids brings the Dreamz Publications books to life.
          </p>
        </div>

        {/* School -> Parents -> Child */}
        <div className="hidden md:flex items-center justify-center gap-3 mb-6 text-xs font-bold uppercase tracking-[0.14em] text-[#5f6368]">
          <span>The school</span>
          <ArrowRight className="w-4 h-4" />
          <span>The parents</span>
          <ArrowRight className="w-4 h-4" />
          <span>The child</span>
        </div>

        {/* The products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dadce0] hover:border-[#bdc1c6] transition-colors shadow-2xs flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                {p.iconSrc && (
                  <img src={p.iconSrc} alt="" draggable={false} className="keep-theme w-12 h-12 rounded-2xl object-cover bg-white border border-[#e8eaed]" />
                )}
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{ backgroundColor: `${p.color}1a`, color: p.ink }}
                >
                  {STATUS_LABEL[p.status]}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-extrabold tracking-tight">{p.name}</h3>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: p.ink }}>
                {p.role}
              </p>

              <ul className="mt-4 space-y-2 flex-1">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-[#5f6368] leading-snug">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: p.ink }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-[#e8eaed] flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={`#product-${p.id}`}
                  className="text-sm font-semibold inline-flex items-center gap-1 group"
                  style={{ color: p.ink }}
                >
                  See inside
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                {p.playStoreUrl && (
                  <a
                    href={p.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#5f6368] hover:text-[#202124] inline-flex items-center gap-1 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Google Play
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
