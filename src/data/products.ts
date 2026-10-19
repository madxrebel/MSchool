import type { LucideIcon } from 'lucide-react';
import { PLAY_STORE_PRODUCTS } from './playStore';

/**
 * The "Our Products" section is driven entirely by this list. To add or change a product, edit it here.
 * Facts for MSchool and MStudent come from their Google Play listings (see playStore.ts).
 * Do not add numbers that cannot be proven.
 */
export type ProductStatus = 'live' | 'preview';

export interface ProductScreen {
  src: string;
  caption: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  status: ProductStatus;
  color: string;
  description: string;
  platforms: ('Android' | 'Web' | 'Tablet')[];
  stats: [value: string, label: string][];
  includesTitle: string;
  includes: string[];
  /** App icon image (live apps) */
  iconSrc?: string;
  /** Fallback icon (products without a store icon yet) */
  Icon?: LucideIcon;
  playStoreUrl?: string;
  screens?: ProductScreen[];
  /** MKids runs in landscape; the MSchool and MStudent store screenshots are portrait. */
  screenShape?: 'portrait' | 'landscape';
  demo: 'screens';
}

const assetModules = import.meta.glob('../assets/products/*/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const asset = (product: string, file: string): string => assetModules[`../assets/products/${product}/${file}`];

const play = (id: 'mschool' | 'mstudent') => PLAY_STORE_PRODUCTS.find((p) => p.id === id)!;
const screensOf = (id: 'mschool' | 'mstudent'): ProductScreen[] =>
  play(id).screens.map((s) => ({ src: asset(id, s.file), caption: s.caption }));

export const PRODUCTS: Product[] = [
  {
    id: 'mschool',
    name: 'MSchool',
    subtitle: 'School management',
    status: 'live',
    color: '#1a73e8',
    description:
      'Run your whole school from an Android phone or tablet: students, fees, attendance, exams, question papers, ID cards and certificates, all in one place.',
    platforms: ['Android', 'Web'],
    stats: [
      ['12', 'Portals'],
      [`${play('mschool').rating}★`, 'Google Play rating'],
      ['10+', 'ID card designs'],
    ],
    includesTitle: 'Every portal in one app',
    includes: [
      'Student Portal',
      'Fee Portal',
      'Attendance Portal',
      'Exam Portal',
      'Time Table Portal',
      'Expenditure Portal',
      'Payroll Portal',
      'Family Portal',
      'Staff Portal',
      'Setup Portal',
      'Certificate Portal',
      'School Info Portal',
    ],
    iconSrc: asset('mschool', 'icon.png'),
    playStoreUrl: play('mschool').playStoreUrl,
    screens: screensOf('mschool'),
    demo: 'screens',
  },
  {
    id: 'mstudent',
    name: 'MStudent',
    subtitle: 'Parent and student app',
    status: 'live',
    color: '#1e8e3e',
    description:
      'The app that connects the school with parents. Track diaries, attendance, notices, fees and exam results, while students learn with lessons and practice quizzes.',
    platforms: ['Android'],
    stats: [
      [`${play('mstudent').rating}★`, 'Google Play rating'],
      [play('mstudent').downloads, 'Downloads'],
      ['1', 'App for parents and students'],
    ],
    includesTitle: 'What parents and students get',
    includes: play('mstudent').capabilities,
    iconSrc: asset('mstudent', 'icon.png'),
    playStoreUrl: play('mstudent').playStoreUrl,
    screens: screensOf('mstudent'),
    demo: 'screens',
  },
  {
    id: 'mkids',
    name: 'MKids',
    subtitle: 'The ebook of Dreamz books',
    status: 'preview',
    color: '#f29900',
    description:
      'MKids is the digital version of the Dreamz Publications Pre-Primary books for Nursery, KG-1 and KG-2. Every page comes alive: children play, trace and match, and can type or scan a page number from the book to jump straight to it.',
    platforms: ['Android'],
    stats: [
      ['3', 'Classes'],
      ['3', 'Play modes'],
      ['4', 'Subjects'],
    ],
    includesTitle: "What's inside",
    includes: [
      'Nursery, KG-1 and KG-2',
      'English, Urdu and Math',
      'General Knowledge',
      'Chapter Mode',
      'Random Play',
      'Arcade Mix',
      'Learning Space and Games Zone',
      'Voice and Scan QR',
      'Stars and points',
    ],
    iconSrc: asset('mkids', 'icon.png'),
    screenShape: 'landscape',
    // Order: how a child starts (class, subject, page, play mode), then English and Math games
    // mixed together, with the Urdu games at the end.
    screens: [
      { src: asset('mkids', 'screen-1.jpg'), caption: 'Pick the class: Nursery, KG-1 or KG-2' },
      { src: asset('mkids', 'screen-2.jpg'), caption: 'Each class has its subjects: English, Urdu, Math and General Knowledge' },
      { src: asset('mkids', 'screen-3.jpg'), caption: 'Type or scan the page number from the book to open that lesson' },
      { src: asset('mkids', 'screen-4.jpg'), caption: 'Choose how to play: Chapter Mode, Random Play or Arcade Mix' },
      { src: asset('mkids', 'screen-5.jpg'), caption: 'English: learn words with pictures and voice' },
      { src: asset('mkids', 'screen-6.jpg'), caption: 'Math: match the words to the numbers' },
      { src: asset('mkids', 'screen-9.jpg'), caption: 'English: find the missing half of the puzzle piece' },
      { src: asset('mkids', 'screen-7.jpg'), caption: 'Math: draw a line to connect each matching pair' },
      { src: asset('mkids', 'screen-8.jpg'), caption: 'Math: trace the number with a finger' },
      { src: asset('mkids', 'screen-10.jpg'), caption: 'Urdu: choose the correct letter for the picture' },
      { src: asset('mkids', 'screen-11.jpg'), caption: 'Urdu: join letters to make words, then read them' },
      { src: asset('mkids', 'screen-12.jpg'), caption: 'Urdu: read words' },
    ],
    demo: 'screens',
  },
];
