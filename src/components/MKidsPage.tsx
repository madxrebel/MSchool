import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, MessageCircle, QrCode, Sparkles, Star, Gamepad2 } from 'lucide-react';
import { BRAND_CONFIG } from '../constants';
import { PRODUCTS } from '../data/products';
import { CLASS_PRICES, PRICES_CONFIRMED, formatPKR } from '../data/mkidsPricing';
import logo from '../assets/brand/logo.png';
import dreamzLogo from '../assets/dreamz/logo.png';
import row1 from '../assets/dreamz/books-row-1.jpg';
import { ThemeToggle } from './ThemeToggle';
import { ScreenExplorer } from './ProductDetail';
import { DreamzBridge } from './DreamzBridge';
import { MKidsOrderBuilder } from './MKidsOrderBuilder';
import { Footer } from './Footer';

const mkids = PRODUCTS.find((p) => p.id === 'mkids')!;

const TITLE = 'MKids by Dreamz: the ebook for Nursery, KG-1 and KG-2 | MSchool Pakistan';
const DESC =
  'MKids brings the Dreamz Publications Pre-Primary books to life. English, Urdu and Math games for Nursery, KG-1 and KG-2. Choose your classes and order on WhatsApp.';

const FAQ = [
  ['Who can order MKids?', 'Schools and parents. Schools order for whole classes and get a discount as the number of students grows. Parents order for their own children.'],
  ['How does ordering work?', 'Build your order on this page, then tap Send order on WhatsApp. Your choices arrive in our WhatsApp already written out. We reply to confirm the price, payment and delivery.'],
  ['Which classes are covered?', 'Nursery, KG-1 and KG-2, each with English, Urdu, Math and General Knowledge.'],
  ['What is the link with the Dreamz books?', 'MKids is the digital version of the Dreamz Publications Pre-Primary books. A child can type or scan a page number from the book and the same page opens in the app.'],
  ['Does it run on a phone?', 'MKids is built for Android.'],
];

const MKidsPage: React.FC = () => {
  useEffect(() => {
    document.title = TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', DESC);
  }, []);

  const goOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#dadce0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <a href="/" aria-label="MSchool Pakistan home" className="shrink-0">
            <img src={logo} alt="MSchool Pakistan" draggable={false} className="h-11 sm:h-12 w-auto" />
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#5f6368] hover:text-[#1a73e8]">
              <ArrowLeft className="w-4 h-4" /> MSchool home
            </a>
            <ThemeToggle />
            <a
              href="#order"
              onClick={goOrder}
              className="h-10 px-4 sm:px-5 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-sm inline-flex items-center gap-1 shrink-0"
            >
              Order now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-12 sm:py-16 bg-[#fef7e0] border-b border-[#dadce0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={mkids.iconSrc} alt="MKids" className="w-16 h-16 rounded-2xl border border-[#e8eaed] bg-white object-cover" />
                <span className="keep-theme w-16 h-16 rounded-2xl bg-white border border-[#e8eaed] p-1.5 flex items-center justify-center">
                  <img src={dreamzLogo} alt="Dreamz Publications" className="w-full h-full object-contain" />
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                The Dreamz books, now a game every child can play.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#5f6368] max-w-xl">
                MKids is the ebook of the Dreamz Publications Pre-Primary books for Nursery, KG-1 and KG-2. Children learn English, Urdu and Math by playing, tracing and matching.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#order" onClick={goOrder} className="h-12 px-7 rounded-full text-sm font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] shadow-md inline-flex items-center gap-2">
                  Choose your classes <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-6 rounded-full text-sm font-semibold text-[#137333] bg-white border-2 border-[#1e8e3e] hover:bg-[#e6f4ea] inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                </a>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#3c4043]">
                {['Nursery, KG-1, KG-2', 'English, Urdu, Math', 'Android'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-[#1e8e3e]" />{t}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-[#5f6368]">
                From {formatPKR(Math.min(...CLASS_PRICES.map((c) => c.perStudentYear)))} per child per year{PRICES_CONFIRMED ? '' : ' (sample price)'}.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden border border-[#e8eaed] shadow-lg bg-white">
              <img src={mkids.screens![0].src} alt={mkids.screens![0].caption} className="w-full h-auto block" />
            </div>
          </div>
        </section>

        {/* What is inside */}
        <section className="py-16 bg-white border-b border-[#dadce0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">What children get</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Learning that feels like play</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                [BookOpen, 'Matches the book', 'Every Dreamz page has its own digital lesson.'],
                [QrCode, 'Type or scan the page', 'Enter the page number or scan it to jump straight in.'],
                [Gamepad2, 'Three ways to play', 'Chapter Mode, Random Play and Arcade Mix.'],
                [Star, 'Stars and points', 'Children collect stars as they learn.'],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof BookOpen;
                return (
                  <div key={t as string} className="rounded-3xl border border-[#dadce0] bg-[#f8f9fa] p-5">
                    <span className="w-11 h-11 rounded-2xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center mb-3"><I className="w-5 h-5" /></span>
                    <div className="font-extrabold">{t as string}</div>
                    <p className="text-sm text-[#5f6368] mt-1">{d as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Real screens */}
        <section className="py-16 bg-[#f8f9fa] border-b border-[#dadce0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">See it</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Real screens from the app</h2>
            </div>
            <ScreenExplorer product={mkids} large />
          </div>
        </section>

        {/* Dreamz link */}
        <section className="py-16 bg-white border-b border-[#dadce0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1a73e8] mb-2 block">Book and app together</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">From the Dreamz page to the screen</h2>
            </div>
            <DreamzBridge color={mkids.color} ink={mkids.ink} appIcon={mkids.iconSrc} screens={mkids.screens ?? []} />
            <img src={row1} alt="Dreamz Publications Pre-Primary books" loading="lazy" className="mt-8 w-full max-w-3xl mx-auto rounded-3xl border border-[#e8eaed]" />
          </div>
        </section>

        <MKidsOrderBuilder />

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-8">Questions about ordering</h2>
            <div className="divide-y divide-[#e8eaed] border border-[#dadce0] rounded-3xl bg-white overflow-hidden">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-3 font-bold">
                    {q}
                    <Sparkles className="w-4 h-4 text-[#1a73e8] shrink-0 group-open:rotate-12 transition-transform" />
                  </summary>
                  <p className="mt-2 text-sm text-[#5f6368] leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer homeBase="/" />
    </div>
  );
};

export default MKidsPage;
