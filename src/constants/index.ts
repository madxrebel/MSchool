/**
 * MSchool Workspace Central Configuration & Content Constants
 * 
 * Edit strings, CTA labels, form options, and branding here without modifying components.
 */

export const CTA_TEXTS = {
  // Primary CTA buttons
  START_FREE_PILOT: 'Start Free Pilot',
  START_FREE_PILOT_SHORT: 'Free Pilot',
  START_FREE_PILOT_HERO: 'Start Free 7-Day Pilot',
  START_FREE_PILOT_SUBMIT: 'Activate 7-Day Free School Pilot',
  
  // Secondary action buttons
  TRY_DEMO: 'Launch Interactive Demo',
  LAUNCH_DEMO_SHORT: 'Live Demo',
  LAUNCH_SIMULATOR: 'Launch in Live Simulator',
  PLAY_MKIDS: 'Play mKids Games',
  REQUEST_DEPLOYMENT: 'Request Deployment',
  REQUEST_PILOT: 'Request School Pilot',
  DONE: 'Done',
  SUBMIT_ANOTHER: 'Submit another request',
  SUBMITTING: 'Submitting Request...',
} as const;

export const BRAND_CONFIG = {
  name: 'MSchool',
  badge: 'Pakistan',
  tagline: 'Integrated School OS & Learning Suite',
  supportPhone: '0335-8009786',
  supportEmail: 'inquiries@mschoolecosystem.com',
  trustBadge: 'Powering 20+ institutions with 25,000+ enrolled students',
  partnerCount: '20+',
  studentCount: '25,000+',
  feeAccuracy: '99.98%',
  pilotDuration: '7-Day',
} as const;

export const HERO_CONTENT = {
  eyebrow: 'Modern Educational Operating System',
  primaryHeadline: 'Stop managing your school like it\'s 1990.',
  headlineLead: 'Stop managing your school',
  headlineAccent: 'like it\'s 1990.',
  subheading: 'Turn your administrative burden into a competitive advantage with an integrated workspace for admissions, Bluetooth fee collection, and early learning.',
  subtitle: 'Turn your administrative burden into a competitive advantage with an integrated workspace for admissions, Bluetooth fee collection, and early learning.',
  hookQuote: 'Stop managing your school like it\'s 1990.',
  factsFigures: [
    {
      value: '20+',
      label: 'Partner Schools',
      sublabel: 'Campuses across Pakistan',
      color: '#1a73e8',
    },
    {
      value: '25,000+',
      label: 'Active Students',
      sublabel: 'Daily attendance & records',
      color: '#1e8e3e',
    },
    {
      value: '99.98%',
      label: 'Fee Accuracy',
      sublabel: 'Bluetooth thermal slips',
      color: '#f29900',
    },
  ],
  quickBadges: [
    'Zero-Wait Student Search',
    '58mm Bluetooth Receipts',
    'Automated WhatsApp Slips',
    'Sibling Family Ledger',
  ],
  trustBullets: [
    'Instant Zero-Wait Student Search',
    '58mm Thermal Bluetooth Receipts',
    'Atomic 100% Reliable Transactions',
    'Unified Sibling Family Ledger',
  ],
} as const;

export const FREE_PILOT_FORM_CONFIG = {
  // Section text
  sectionEyebrow: 'Free Institutional Onboarding',
  sectionTitle: 'Start your 7-day free pilot',
  sectionDescription: 'Experience the full ecosystem at your campus. Our team assists with data import, staff training, and thermal printer setup.',
  
  // Modal text
  modalEyebrow: '7-Day Free Evaluation',
  modalTitle: 'Request Your Free School Pilot',
  modalDescription: 'Experience the MSchool ecosystem with zero setup fee or long-term commitment.',
  
  // Field labels & placeholders
  labels: {
    fullName: 'Your Full Name *',
    fullNamePlaceholder: 'e.g. Asad Ullah Khan',
    schoolName: 'School / Academy Name *',
    schoolNamePlaceholder: 'e.g. City Model Grammar School',
    role: 'Your Designation',
    phone: 'Phone / WhatsApp *',
    phonePlaceholder: '0300-1234567',
    city: 'City',
    cityPlaceholder: 'e.g. Karachi, Lahore, etc.',
    studentCount: 'Estimated Active Students',
    interestedModules: 'Modules of Interest:',
  },

  // Dropdown options
  roleOptions: [
    'Principal',
    'School Owner',
    'Campus Administrator',
    'Academic Coordinator',
    'Accounts / Finance Head',
    'Teacher / Staff',
  ],

  studentCountOptions: [
    'Under 300 Students',
    '300 - 500 Students',
    '500 - 1000 Students',
    '1000 - 2000 Students',
    '2000+ Students',
  ],

  interestedProductsOptions: [
    'MSchool Management Suite',
    'mAttendance Quick Sweep',
    'mKids Books & Learning Games',
    'Maymar Academy Parent Portal',
    '58mm Thermal Printer Setup',
    'Fee Collection & WhatsApp Slips',
  ],

  defaultInterestedProducts: [
    'MSchool Management Suite',
    'mAttendance Quick Sweep',
  ],

  successTitle: 'Pilot Request Received',
  footerNote: 'Includes complimentary assistance with student data onboarding and staff training.',
} as const;

export const PRICING_CONFIG = {
  eyebrow: 'Transparent Investment',
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

export const NAV_ITEMS = [
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'portals', label: 'Portals' },
  { id: 'features', label: 'Advantages' },
  { id: 'pricing', label: 'Pricing' },
] as const;
