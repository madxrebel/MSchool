import { Gamepad2, MonitorPlay } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PLAY_STORE_PRODUCTS } from './playStore';

/**
 * The "Our Products" section is driven entirely by this list. To add or change a product, edit it here.
 * Facts for MSchool and MStudent come from their Google Play listings (see playStore.ts).
 * Do not add numbers that cannot be proven.
 */
export type ProductStatus = 'live' | 'preview' | 'soon';

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
  platforms: ('Android' | 'Web' | 'Tablet' | 'Chromebook')[];
  stats: [value: string, label: string][];
  includesTitle: string;
  includes: string[];
  /** App icon image (live apps) */
  iconSrc?: string;
  /** Fallback icon (products without a store icon yet) */
  Icon?: LucideIcon;
  playStoreUrl?: string;
  screens?: ProductScreen[];
  demo: 'screens' | 'games' | 'soon';
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
    subtitle: 'Interactive learning for kids',
    status: 'preview',
    color: '#f29900',
    description:
      'The digital version of our Dreams Publishing books. Young learners play, practise and learn with touch games. Try the preview below.',
    platforms: ['Android', 'Tablet'],
    stats: [['3', 'Games in the preview']],
    includesTitle: 'In the preview',
    includes: ['Math Race', 'Letter Trace', 'Balloons'],
    Icon: Gamepad2,
    demo: 'games',
  },
  {
    id: 'digital-learning',
    name: 'Digital Learning Platform',
    subtitle: 'Daily learning on tablets',
    status: 'soon',
    color: '#9334e6',
    description:
      'A learning platform that connects with Android tablets and Chromebooks, so students can learn something new every day through videos and lessons.',
    platforms: ['Tablet', 'Chromebook'],
    stats: [],
    includesTitle: 'Planned for the platform',
    includes: ['Video lessons', 'Daily learning', 'Android tablets', 'Chromebooks'],
    Icon: MonitorPlay,
    demo: 'soon',
  },
];
