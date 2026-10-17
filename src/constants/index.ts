/**
 * MSchool High-Converting Sales Page Configuration & Content Constants
 * 
 * Outcome-oriented, grounded in Pakistani school operations, zero generic fluff.
 */

// Where the "Login" button sends existing customers (the main web portal).
// Override per environment with VITE_PORTAL_URL (see .env.example).
export const PORTAL_URL: string =
  (import.meta as any).env?.VITE_PORTAL_URL || 'https://app.mschool.pk/login';

export const CTA_TEXTS = {
  // Primary low-risk action CTAs
  SEE_IN_ACTION: 'See MSchool in Action',
  BOOK_WALKTHROUGH: 'Book a Free Walkthrough',
  BOOK_DEMO: 'See MSchool in Action',
  BOOK_DEMO_SHORT: 'See in Action',
  SEE_HOW_IT_WORKS: 'See How MSchool Works',
  REQUEST_DEMO: 'Request a Free Walkthrough',
  TALK_WHATSAPP: 'Talk to Us on WhatsApp',
  INTERACTIVE_DEMO: 'Try Live App Demo',
  LOGIN: 'Login',
  BOOK_FREE_DEMO: 'Book a Free Demo',
  SUBMIT_DEMO: 'Request a Free Walkthrough',
  SUBMITTING: 'Arranging Walkthrough...',
  DONE: 'Walkthrough Arranged',
  WHATSAPP_LINK: 'https://wa.me/923358009786',

  // Low-risk guarantees & reassurance chips
  LOW_RISK_MICROCOPY: '15-minute walkthrough • Zero sales pressure • See it running with your fee structure',
  NO_PRESSURE: 'No pushy sales calls • No credit card required • Zero commitment',

  // Backward-compatible keys
  START_FREE_PILOT: 'See MSchool in Action',
  START_FREE_PILOT_SHORT: 'See in Action',
  START_FREE_PILOT_HERO: 'See MSchool in Action',
  START_FREE_PILOT_SUBMIT: 'Request a Free Walkthrough',
  TRY_DEMO: 'See How MSchool Works',
  LAUNCH_DEMO_SHORT: 'Live Demo',
  LAUNCH_SIMULATOR: 'Launch Live Demo',
  PLAY_MKIDS: 'Play mKids Games',
  REQUEST_PILOT: 'See MSchool in Action',
} as const;

export const FREE_PILOT_FORM_CONFIG = {
  sectionEyebrow: 'Free Campus Walkthrough',
  sectionTitle: 'See MSchool in action for your school',
  sectionDescription: 'Experience the full ecosystem at your campus. Our team assists with data import, staff training, and thermal printer setup.',
  modalEyebrow: 'Zero-Pressure Walkthrough',
  modalTitle: 'See How MSchool Fits Your School',
  modalDescription: 'A friendly 15-minute walkthrough over Google Meet or WhatsApp screen share. No sales pressure, no commitment.',
  successTitle: 'Walkthrough Request Received',
} as const;

export const PRICING_CONFIG = {
  eyebrow: 'Predictable Investment',
  title: 'Predictable pricing in Pakistani Rupees',
  subtitle: 'No hidden transaction fees or surprise add-ons. Every plan includes free initial student data onboarding and staff training.',
  currency: 'Rs.',
  defaultStudentCount: 450,
  minStudents: 150,
  maxStudents: 3000,
  sliderStep: 50,
  annualDiscountMultiplier: 0.8,
  annualSavingsPerStudentMonth: 3,
} as const;

export const BRAND_CONFIG = {
  name: 'MSchool',
  badge: 'Pakistan',
  tagline: 'School Management System Built for Schools in Pakistan',
  supportPhone: '0335-8009786',
  supportPhoneDisplay: '0335-8009786',
  supportEmail: 'inquiries@mschoolecosystem.com',
  whatsappUrl: 'https://wa.me/923358009786',
  trustClaim: '20+ schools already run on MSchool',
  partnerCount: '20+',
  pilotDuration: 'Free Walkthrough',
} as const;

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problems', label: 'Problems Solved' },
  { id: 'interactive-demo', label: 'Interactive Demo' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'proof', label: 'Product Proof' },
  { id: 'case-study', label: 'Origin Case Study' },
  { id: 'why-mschool', label: 'Why MSchool' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const HERO_CONTENT = {
  eyebrow: 'School Management System for Schools in Pakistan',
  primaryHeadline: "Stop managing your school like it's 1990.",
  supportingCopy:
    'Admissions, fees, attendance, exams and parent updates in one simple system, built for Pakistani schools.',
  primaryCta: 'See MSchool in Action',
  secondaryCta: 'See How MSchool Works',
  lowRiskBadge: 'Free 15-min walkthrough • Zero pushy sales tactics • See your fee structure on screen',
  credibilityPoints: [
    '20+ schools already use MSchool',
    'Built inside real family-run schools',
    'Designed to work reliably on weak internet',
  ],
  corePromiseHeadline: 'Your school is already doing a hundred things every day.',
  corePromiseSubheadline: 'MSchool puts them in one place.',
  corePromiseProofLead: 'See how everyday school tasks become faster and simpler.',
} as const;

export const PROBLEMS_CONTENT = {
  eyebrow: 'The Reality of School Operations',
  headline: "Running a school shouldn't mean chasing paperwork all day.",
  subheadline:
    'Most school principals, owners, and administrators spend more time tracking down information than leading their institutions.',
  painPoints: [
    {
      id: 'records',
      title: 'Student records scattered across registers and files',
      description:
        'Admission slips, family contacts, and previous session archives are divided across paper registers and cupboards, making simple searches take 20 minutes.',
    },
    {
      id: 'fees',
      title: 'Fee follow-ups taking hours of staff time',
      description:
        'Counter staff spend hours cross-referencing manual ledgers, writing duplicate receipts by hand, and calculating student balances during morning rush hours.',
    },
    {
      id: 'attendance',
      title: 'Attendance that is slow and difficult to verify',
      description:
        'Teachers spend 10–15 minutes of instructional time marking paper registers, while administrators remain unaware of daily campus-wide absentees.',
    },
    {
      id: 'parents',
      title: 'Parents asking for updates repeatedly',
      description:
        'Front desks are overwhelmed with repeat phone calls and WhatsApp inquiries for fee vouchers, diary homework, and upcoming exam schedules.',
    },
    {
      id: 'search',
      title: 'Staff spending time searching for information',
      description:
        'When an urgent parent inquiry or campus inspection happens, staff lose valuable time trying to locate one student file or payment history.',
    },
    {
      id: 'reports',
      title: 'Reports taking too long to prepare',
      description:
        'Compiling month-end fee collections, defaulter lists, and student character certificates requires days of manual consolidation.',
    },
    {
      id: 'split',
      title: 'Different people maintaining conflicting records',
      description:
        'Front desk notes, accounts registers, and classroom logs often contradict one another because they live in isolated silos.',
    },
  ],
  transitionText: 'MSchool brings these daily operations into one connected system.',
} as const;

export const BEFORE_AFTER_CONTENT = {
  eyebrow: 'Operational Comparison',
  headline: 'What changes when your school switches to MSchool',
  subheadline:
    'No exaggerated claims. Just clean, reliable, daily operational order across your school.',
  beforeLabel: 'Before MSchool',
  beforeSubtitle: 'Chasing registers, spreadsheets, and lost slips',
  beforeItems: [
    'Heavy paper registers and dusty file cupboards',
    'Scattered spreadsheets with manual data entry errors',
    'Manual fee reconciliation with risk of duplicate slips',
    'Searching through files to locate one student history',
    'Repeated parent phone calls for basic fee and diary updates',
    'Separate disconnected tools with conflicting figures',
    'Limited visibility into true daily attendance and fee totals',
  ],
  afterLabel: 'With MSchool',
  afterSubtitle: 'One connected system built for the school office',
  afterItems: [
    'One connected system accessible from desktop, tablet, and mobile',
    'Zero-wait student search — find any profile in seconds',
    'Organized fee collection with instant 58mm thermal receipts',
    '15-second morning attendance sweeps without class interruption',
    'Easier communication with direct WhatsApp fee receipts & notices',
    'Clean one-click operational reports and revenue summaries',
    'Clear, real-time administrative visibility over the entire school',
  ],
} as const;

export const OUTCOMES_CONTENT = {
  eyebrow: 'Outcome-Based Capabilities',
  headline: "Every tool designed around an administrator's outcome.",
  subheadline:
    'Software should not be a list of confusing buttons. Here is what MSchool accomplishes for your school.',
  outcomes: [
    {
      id: 'dashboard',
      outcome: "Know what's happening in your school.",
      tag: 'Dashboard & Insights',
      description:
        'See attendance, student information, dues, reminders and important actions from one place the moment you sit at your desk.',
      badge: 'Visibility',
      icon: 'BarChart3',
      color: '#1a73e8',
    },
    {
      id: 'fees',
      outcome: 'Stop chasing fee records.',
      tag: 'Fees & Receipts',
      description:
        'Track payments, dues and receipts without depending on piles of paperwork. Instant sibling consolidation and 58mm counter receipts.',
      badge: 'Cash Flow',
      icon: 'CreditCard',
      color: '#1e8e3e',
    },
    {
      id: 'attendance',
      outcome: 'Take attendance in seconds.',
      tag: 'Attendance Sweeps',
      description:
        'Quickly mark attendance and keep accurate records. Teachers complete entire class rolls in 15 seconds without losing teaching time.',
      badge: 'Speed',
      icon: 'UserCheck',
      color: '#f29900',
    },
    {
      id: 'search',
      outcome: 'Find any student instantly.',
      tag: 'Students & Search',
      description:
        'Search student information without digging through registers. Look up by GR number, name, father name, or contact number in milliseconds.',
      badge: 'Instant Lookup',
      icon: 'GraduationCap',
      color: '#1a73e8',
    },
    {
      id: 'communication',
      outcome: 'Keep parents informed.',
      tag: 'Notices & Communication',
      description:
        'Make communication easier and more organized. Dispatch official fee receipts and classroom notices straight to parents via WhatsApp.',
      badge: 'Parent Trust',
      icon: 'Share2',
      color: '#d93025',
    },
    {
      id: 'roles',
      outcome: 'Give every person the right access.',
      tag: 'Role-Based Access',
      description:
        'Admin, principal, accountant, teacher and operator access can be controlled according to their responsibilities. Keep financial records protected.',
      badge: 'Security',
      icon: 'ShieldCheck',
      color: '#5f6368',
    },
  ],
} as const;

export const PROOF_SCREENS_CONTENT = {
  eyebrow: 'Real Software in Active Schools',
  headline: "This isn't a concept. It's the software your school can use tomorrow.",
  subheadline:
    'Actual MSchool interfaces running on front desk computers and Android tablets in operating campuses.',
  screens: [
    {
      id: 'dashboard',
      name: 'Campus Dashboard',
      headline: 'See what needs attention today.',
      description:
        'View campus-wide attendance percentage, top fee defaulters requiring follow-up, pending admissions, and staff check-ins from a single summary screen.',
      highlights: [
        'Real-time morning student & staff attendance counts',
        'Top defaulter ledger for instant recovery',
        'Quick access to admissions, fees, and diary',
      ],
    },
    {
      id: 'fees',
      name: 'Fee Counter & Thermal Slips',
      headline: 'Know who has paid and who hasn’t.',
      description:
        'Collect monthly dues with atomic single-click accuracy. Print 58mm ink-free thermal receipts in 2 seconds and link all siblings under a single family ledger.',
      highlights: [
        'Atomic single-click fee collection',
        'Instant 58mm Bluetooth & USB thermal printing',
        'Unified family sibling accounts with single balance',
      ],
    },
    {
      id: 'attendance',
      name: '15-Second Attendance',
      headline: 'Mark and review attendance without paperwork.',
      description:
        'Teachers tap across student names in seconds. Automatically flags absentees and triggers instant SMS or WhatsApp notices to parents without register books.',
      highlights: [
        'Swipe or tap-to-cycle presence status in 15 seconds',
        'Pre-calculated daily stats with zero lag',
        'Immediate parent absentee notifications',
      ],
    },
    {
      id: 'search',
      name: 'Zero-Wait Student Directory',
      headline: 'Find the information you need in seconds.',
      description:
        'Search across 10,000+ student profiles in milliseconds. Pull up complete emergency contacts, parent details, family brothers/sisters, and fee payment histories.',
      highlights: [
        'Sub-50ms search by GR No, Name, or Phone',
        'Complete family sibling tree on one screen',
        'Immediate digital ID card and certificate generation',
      ],
    },
  ],
} as const;

export const CASE_STUDY_CONTENT = {
  eyebrow: 'Origin Case Study',
  headline: 'How MSchool was born in a family-run school with 1,450 students.',
  subheadline:
    'We didn’t build MSchool from a technology boardroom. We built it standing right behind a crowded Pakistani school fee counter.',
  storyStages: [
    {
      stage: '1. The Breaking Point (2021)',
      title: '300 parents in queue on the 1st of every month',
      description:
        'At our family campus in Karachi, peak fee days were chaos. Parents waited 45 minutes in the morning heat. Excel spreadsheets froze, paper registers had duplicate receipt numbers, and accountants spent evenings recounting cash slips.',
      metric: '45-min counter wait',
      tag: 'The Reality',
    },
    {
      stage: '2. Why Existing Software Failed',
      title: 'Cloud apps built for Western schools didn’t work here',
      description:
        'Every software we evaluated had the same fatal flaws: they froze when internet dipped, priced in US dollars, and required trained IT engineers. Our front-desk counter staff needed something fast, simple, and resilient to power outages.',
      metric: 'Internet dependency',
      tag: 'The Barrier',
    },
    {
      stage: '3. Building on the Front Counter',
      title: 'Tested in real front desks, classrooms, and accounts rooms',
      description:
        'We built MSchool right on the counter computer. We introduced instant 58mm ink-free thermal receipts (2-second print), unified sibling accounts under one Family ID, and local-first offline storage that never slows down.',
      metric: '2-sec receipt print',
      tag: 'The Breakthrough',
    },
    {
      stage: '4. The Measurable Result',
      title: 'Queue dropped from 45 minutes to 3 minutes',
      description:
        'Parents walked in, paid, received their thermal receipt in seconds, and walked out. Class roll calls dropped from 15 minutes of teacher time to 15 seconds. End-of-month reconciliation happened in one click with 0 lost slips.',
      metric: '3-min counter queue',
      tag: 'The Outcome',
    },
  ],
  expansionTitle: 'From one family campus to 20+ institutions',
  expansionDescription:
    'Principals from neighboring schools saw the thermal receipts and rapid attendance sweeps and asked to use the software. Today, over 20 institutions and 25,000+ enrolled students run daily operations on MSchool.',
  quote:
    '“When hundreds of parents visit the fee counter on peak days, you cannot afford frozen software. MSchool prints 58mm thermal receipts in two seconds and updates balances with zero errors.”',
  quoteAuthor: 'Wali Khan',
  quoteRole: 'Principal & Campus Administrator, Active Partner School',
  groundedMessage: 'We understand your environment because we operate in it every single day.',
} as const;

export const PAKISTAN_CONTEXT_CONTENT = {
  eyebrow: 'Built for the Real World',
  headline: 'Built for how schools actually work.',
  subheadline:
    'Most software fails because it assumes Silicon Valley internet and high-end computers. MSchool is engineered around local realities.',
  points: [
    {
      title: 'Works even when your internet isn’t perfect.',
      description:
        'MSchool keeps everyday student records, counter fees, and attendance available on the local device, and syncs reliably whenever connectivity resumes.',
      badge: 'Weak Internet Resilient',
      icon: 'WifiOff',
    },
    {
      title: 'Fast everyday operations without loading lag.',
      description:
        'Front-desk counters have queues of parents before morning assembly. Staff shouldn’t have to wait for spinning loaders for every single receipt.',
      badge: 'Zero Counter Waiting',
      icon: 'Zap',
    },
    {
      title: 'Reliable financial records with zero lost slips.',
      description:
        'Every fee transaction is atomic. Balances, receipt numbers, and logs update together, preventing duplicate slips or missing collections.',
      badge: 'Strict Financial Integrity',
      icon: 'ShieldCheck',
    },
    {
      title: 'Physical 58mm thermal receipt printing.',
      description:
        'Connects directly to affordable 58mm thermal counter printers via Bluetooth or USB. Official receipts printed in 2 seconds with zero ink costs.',
      badge: 'Zero-Ink Receipts',
      icon: 'Printer',
    },
    {
      title: 'Designed for the devices schools already own.',
      description:
        'Runs seamlessly on standard Windows PCs, Android tablets, and office smartphones. No need to purchase expensive proprietary hardware.',
      badge: 'Android & Desktop Ready',
      icon: 'Laptop',
    },
  ],
} as const;

export const WHY_CHOOSE_CONTENT = {
  eyebrow: 'Decision Factors',
  headline: 'Built for less waiting. Fewer mistakes. More control.',
  subheadline:
    'Why school directors choose MSchool instead of sticking with paper registers or generic spreadsheets.',
  pillars: [
    {
      title: 'Less waiting',
      description:
        'Fast everyday access to student information, instant admission entry, and zero-wait counter queues during peak morning hours.',
    },
    {
      title: 'Fewer mistakes',
      description:
        'Reliable record handling helps prevent duplicate fee receipts, missed payments, and conflicting student registers.',
    },
    {
      title: 'Better visibility',
      description:
        'Clear daily reports, defaulter lists, and attendance summaries help principals and owners understand what is happening at a glance.',
    },
    {
      title: 'Right information, right person',
      description:
        'Role-based access protects sensitive financial data so accountants, teachers, and operators only see what their job requires.',
    },
    {
      title: 'Works in the real world',
      description:
        'Engineered for schools where internet connectivity, electricity, and hardware resources are subject to everyday practical fluctuations.',
    },
  ],
} as const;

export const ECOSYSTEM_CONTENT = {
  eyebrow: 'Connected Learning Ecosystem',
  headline: 'More than a school management app.',
  subheadline: 'One ecosystem for the school, classroom, parent and child.',
  clarification:
    'MSchool Core gives you complete administrative control. Additional connected modules extend into classrooms and homes when you need them.',
  modules: [
    {
      id: 'mschool',
      title: 'MSchool Core',
      role: 'School Administration & Fee Counter',
      description:
        'The central operating hub for admissions, atomic fee collections, 58mm thermal receipts, student profiles, and executive visibility.',
      badge: 'Primary System',
      color: '#1a73e8',
    },
    {
      id: 'mattendance',
      title: 'mAttendance',
      role: 'Classroom Sweeps & Staff Check-in',
      description:
        'Fast classroom attendance tool for teachers with automated parent absence notifications and staff biometric check-in tracking.',
      badge: 'Teacher Tool',
      color: '#1e8e3e',
    },
    {
      id: 'maymar',
      title: 'Maymar Academy App',
      role: 'Parent Companion & Homework Diary',
      description:
        'Smartphone companion for parents with daily homework photos, digital report cards, and automated WhatsApp fee receipts.',
      badge: 'Parent Portal',
      color: '#d93025',
    },
    {
      id: 'mkids',
      title: 'mKids Learning Suite',
      role: 'Printed Textbooks + Interactive Games',
      description:
        'Physical school syllabus textbooks paired with gamified Math Car Racing, phonics speech, and interactive touch-screen handwriting tracing.',
      badge: 'Early EdTech',
      color: '#f29900',
    },
  ],
} as const;

export const DIRECT_OBJECTIONS_FAQS = [
  {
    question: 'Will this work with our internet?',
    tag: 'Infrastructure',
    shortAnswer: 'Yes. MSchool is local-first.',
    fullAnswer:
      'Yes, absolutely. MSchool does not depend on a continuous fast internet connection. Counter fee collections, student searches, and morning attendance work locally on your office computer or tablet. When internet is available, it automatically synchronizes in the background without freezing your screen.',
  },
  {
    question: 'Can my accountant, admin, and teachers actually use it?',
    tag: 'Usability',
    shortAnswer: 'Designed for non-IT staff.',
    fullAnswer:
      'Yes. If your staff can use WhatsApp and browse an Android phone, they can operate MSchool in 10 minutes. The interface has zero confusing technical jargon. A counter clerk only needs to search a student’s name, click the unpaid month, and click “Print Receipt”. Role-based permissions ensure each person only sees what they need.',
  },
  {
    question: 'Can I see the system before deciding?',
    tag: 'Risk-Free',
    shortAnswer: '100% free live walkthrough.',
    fullAnswer:
      'Yes. We offer a 15-minute live screen walkthrough tailored specifically to your campus. You can bring your principal, accountant, or admin. We will show you how MSchool handles your actual fee structure, sibling rules, and attendance before you commit to anything.',
  },
  {
    question: 'How difficult is it to get started?',
    tag: 'Onboarding',
    shortAnswer: 'We handle the setup for you.',
    fullAnswer:
      'You do not have to re-type thousands of student records manually. If you have existing student data in Excel, spreadsheets, or paper registers, our onboarding team assists with importing your classes, sections, and student profiles. We also assist with connecting your 58mm thermal printer.',
  },
  {
    question: 'Is this suitable for my type and size of school?',
    tag: 'Fit',
    shortAnswer: 'Built for 150 to 3,000+ students.',
    fullAnswer:
      'MSchool is designed specifically for private, matriculation, grammar, and model schools across Pakistan — from single-campus academies with 150 students up to multi-branch networks with 3,000+ enrolled students. It supports all standard Pakistani classes (Nursery, KG, Class 1–10) and sibling fee arrangements.',
  },
  {
    question: 'What happens after I request a demo walkthrough?',
    tag: 'Process',
    shortAnswer: 'No pushy sales calls, guaranteed.',
    fullAnswer:
      'Here is our exact 3-step process:\n1. Our coordinator will message you on WhatsApp or call your number to pick a 15-minute slot convenient for you.\n2. We conduct a friendly live screen walkthrough (over Google Meet or WhatsApp screen share) showing the exact workflows your staff care about.\n3. We leave you with full information to discuss with your management in your own time. No high-pressure sales calls or spam.',
  },
] as const;

export const DEMO_FORM_CONFIG = {
  eyebrow: 'Personalized Campus Walkthrough',
  headline: 'Ready to see what MSchool can do for your school?',
  subheadline:
    'See how your school’s everyday operations can run from one connected system. No sales pressure, no commitment.',
  cardTitle: "See MSchool in action for your school.",
  cardSubtitle: 'Pick a time that fits your school day for a practical 15-minute walkthrough.',
  steps: [
    {
      step: '1',
      title: 'Coordinate a convenient time',
      desc: 'We message on WhatsApp to find a 15-min slot that fits your schedule.',
    },
    {
      step: '2',
      title: 'See your real fee structure',
      desc: 'Live screen walkthrough tailored to your counter, admissions, and classes.',
    },
    {
      step: '3',
      title: 'Zero pressure to decide',
      desc: 'No contracts, no credit cards. Discuss with your leadership in your own time.',
    },
  ],
  labels: {
    name: 'Your Name *',
    namePlaceholder: 'e.g. Asad Ullah Khan',
    schoolName: 'School Name *',
    schoolNamePlaceholder: 'e.g. City Model Grammar School',
    phone: 'Phone / WhatsApp *',
    phonePlaceholder: '0300-1234567',
    studentCount: 'Estimated Active Students',
    message: 'Anything you’d like us to know? (Optional)',
    messagePlaceholder: 'e.g. Number of branches, current challenges with fee queues or registers...',
  },
  studentCountOptions: [
    'Under 300 Students',
    '300 - 500 Students',
    '500 - 1000 Students',
    '1000+ Students',
  ],
  submitButton: 'See MSchool in Action',
  reassurance: 'Zero commitment • No pushy sales calls • Walkthrough tailored to your school',
} as const;
