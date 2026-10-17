import { Student, StaffMember, DiaryEntry, Announcement } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '90',
    grNo: '90',
    name: 'Muhammad Ahmed',
    fatherName: 'Muhammad Kashif',
    class: 'Five',
    section: 'A',
    phone: '03001234567',
    familyId: 'FAM-109',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 18000,
    unpaidMonths: ['February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026', 'July 2026'],
  },
  {
    id: '121',
    grNo: '121',
    name: 'Zaheer Ahmed',
    fatherName: 'Waseem',
    class: 'Four',
    section: 'A',
    phone: '03219876543',
    familyId: 'FAM-204',
    status: 'Enrolled',
    monthlyFee: 2500,
    totalDues: 17500,
    unpaidMonths: ['April 2026', 'May 2026', 'June 2026', 'July 2026'],
  },
  {
    id: '123',
    grNo: '123',
    name: 'Khalid Hussain',
    fatherName: 'Hameedullah',
    class: 'Tenth',
    section: 'A',
    phone: '03335551212',
    familyId: 'FAM-301',
    status: 'Enrolled',
    monthlyFee: 3500,
    totalDues: 17500,
    unpaidMonths: ['May 2026', 'June 2026', 'July 2026'],
  },
  {
    id: '103',
    grNo: '103',
    name: 'Umar Majeed',
    fatherName: 'Abud Majeed',
    class: 'Nursery',
    section: 'A',
    phone: '03102553930',
    familyId: 'FAM-412',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 2000,
    unpaidMonths: ['September 2026'],
  },
  {
    id: '201',
    grNo: '201',
    name: 'Sammi Khan',
    fatherName: 'Gul Khan',
    class: 'Nursery',
    section: 'A',
    phone: '03452223344',
    familyId: 'FAM-413',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 4000,
    unpaidMonths: ['August 2026', 'September 2026'],
  },
  {
    id: '203',
    grNo: '203',
    name: 'Bibi Sanjii',
    fatherName: 'Tajkhan',
    class: 'Nursery',
    section: 'A',
    phone: '03117778899',
    familyId: 'FAM-414',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 6000,
    unpaidMonths: ['July 2026', 'August 2026', 'September 2026'],
  },
  {
    id: '9949',
    grNo: '9949',
    name: 'Essa Mehmood',
    fatherName: 'Mehmood Khan',
    class: 'Nursery',
    section: 'A',
    phone: '03223334455',
    familyId: 'FAM-502',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 0,
    unpaidMonths: [],
  },
  {
    id: '9951',
    grNo: '9951',
    name: 'Ayan Tariq',
    fatherName: 'Tariq Mehmood',
    class: 'Nursery',
    section: 'A',
    phone: '03348889900',
    familyId: 'FAM-503',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 2000,
    unpaidMonths: ['September 2026'],
  },
  {
    id: '9947',
    grNo: '9947',
    name: 'Abdul Raheem',
    fatherName: 'Nabi Bux',
    class: 'Nursery',
    section: 'B',
    phone: '03102553930',
    familyId: 'FAM-504',
    status: 'Enrolled',
    monthlyFee: 2000,
    totalDues: 2000,
    unpaidMonths: ['September 2026'],
  },
  {
    id: '120',
    grNo: '120',
    name: 'Arham Sultan',
    fatherName: 'Mahiwa Qamar',
    class: 'KG-1',
    section: 'A',
    phone: '03332221100',
    familyId: 'FAM-601',
    status: 'Enrolled',
    monthlyFee: 2200,
    totalDues: 11000,
    unpaidMonths: ['May 2026', 'June 2026', 'July 2026'],
  },
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'Wali Khan',
    fatherOrHusbandName: 'Ahmed Ali',
    role: 'Principal',
    phone: '03358009786',
    attendanceToday: 'PRESENT',
    baseSalary: 75000,
  },
  {
    id: '2',
    name: 'Shumaila',
    fatherOrHusbandName: 'Nadir Ali',
    role: 'Teacher',
    phone: '03123456789',
    attendanceToday: 'ABSENT',
    baseSalary: 38000,
  },
  {
    id: '3',
    name: 'Mahiwal Qammar Khan',
    fatherOrHusbandName: 'Sadiq Hussain',
    role: 'Principal',
    phone: '03456789012',
    attendanceToday: 'LATE',
    baseSalary: 70000,
  },
  {
    id: '4',
    name: 'Ali Nadeem',
    fatherOrHusbandName: 'Nadeem Akhtar',
    role: 'Teacher',
    phone: '03009998877',
    attendanceToday: 'ABSENT',
    baseSalary: 36000,
  },
];

export const INITIAL_DIARIES: DiaryEntry[] = [
  {
    id: 'd-1',
    class: 'Nursery',
    section: 'A',
    date: '2026-09-27',
    subject: 'English & Math',
    content: 'English: Trace letter "g" on workbook page 14. Math: Count and color 5 balloons. Learn poem.',
    hasAttachment: true,
  },
  {
    id: 'd-2',
    class: 'Five',
    section: 'A',
    date: '2026-09-27',
    subject: 'Science',
    content: 'Read Chapter 4: Solar System. Complete questions 1 to 4 in notebook. Bring model materials.',
    hasAttachment: false,
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mid-Term Examination Datesheets Released',
    description: 'The complete schedule for mid-term assessments has been uploaded to the Parent Portal. Please verify room allocations.',
    sendTo: 'All',
    isHighPriority: true,
    timestamp: 'Today at 08:49 AM',
    sender: 'Central Administration',
  },
  {
    id: 'ann-2',
    title: 'Monthly Fee Submission Reminders',
    description: 'Automated digital slips and WhatsApp receipt dispatches have begun for this billing cycle.',
    sendTo: 'By Role',
    roleTarget: 'Accountant',
    isHighPriority: false,
    timestamp: 'Yesterday at 02:15 PM',
    sender: 'Accounts Department',
  },
];

export const WORD_OF_THE_DAY = {
  word: 'Brief',
  urdu: 'مختصر',
  transliteration: 'Mukhtasar',
  meaning: 'Short and quick in duration or expression',
  example: 'The principal delivered a brief morning address to the assembly.',
};

export const ECOSYSTEM_MODULES = [
  {
    id: 'mschool',
    title: 'MSchool Core',
    subtitle: 'Counter Administration & Fee Engine',
    badge: 'Core ERP',
    theme: 'navy',
    description: 'Zero-wait student lookup, atomic fee collection, 58mm thermal receipts, and unified sibling family ledgers.',
    highlights: [
      'Atomic 1-click fee collection',
      '58mm thermal receipt printing',
      'Unified sibling Family ID',
      'Zero-wait student search'
    ]
  },
  {
    id: 'mkids',
    title: 'mKids Books & Games',
    subtitle: 'Curriculum Books + Interactive Learning',
    badge: 'Early EdTech',
    theme: 'amber',
    description: 'Physical syllabus textbooks paired with gamified Math Car Racing, phonics speech, and handwriting tracing.',
    highlights: [
      'Paired with printed textbooks',
      'Math Car Racing & balloon games',
      'Letter tracing engine',
      'Bilingual phonics audio'
    ]
  },
  {
    id: 'mattendance',
    title: 'mAttendance',
    subtitle: 'Classroom & Staff Attendance',
    badge: '15-Sec Sweep',
    theme: 'emerald',
    description: 'Mark 40-student classrooms in under 15 seconds with automated absence SMS notifications to parents.',
    highlights: [
      '15-second sweep check-in',
      'Real-time parent absence SMS',
      'Staff biometric & late tracking',
      'Instant attendance stats'
    ]
  },
  {
    id: 'maymar',
    title: 'Maymar Academy',
    subtitle: 'Parent Companion & Updates',
    badge: 'Family App',
    theme: 'rose',
    description: 'Direct WhatsApp fee slips, digital examination report cards, and daily homework photo diary.',
    highlights: [
      'Automated WhatsApp receipts',
      'Digital report cards',
      'Photo homework feed',
      'Parent-teacher updates'
    ]
  }
];

export const ALL_PORTALS_LIST = [
  {
    name: 'Student Portal',
    icon: 'GraduationCap',
    items: ['Smart Enrollment & Photo Capture', 'Digital ID Card Generation', 'Update Student Profile', 'Search by Name, Class, Father, Family ID', 'Dropout & Admission Tracking']
  },
  {
    name: 'Fee Portal',
    icon: 'CreditCard',
    items: ['Atomic Fee Submission (One-click)', 'Top Defaulter Recovery Dashboard', '58mm Thermal Receipt Printing', 'WhatsApp & SMS Slip Broadcast', 'Fee Installments & Reversal Protection', 'Custom Fee Structures']
  },
  {
    name: 'Attendance Portal',
    icon: 'UserCheck',
    items: ['Quick Attendance Sweep Mode', 'Classwise Attendance Register', 'Staff Check-In & Late Arrival Logs', 'Real-time SMS Alert on Absence', 'Pre-calculated Daily Summary Nodes']
  },
  {
    name: 'Exam Portal',
    icon: 'FileText',
    items: ['Examination Schedule & Datesheets', 'Subject-wise Mark Entry Grid', 'Automated Combined Result Cards', 'Smart Exam Paper Generator', 'Past Paper Archive Repository']
  },
  {
    name: 'Time Table Portal',
    icon: 'Calendar',
    items: ['Dynamic Master Timetable Grid', 'Academic Insights (Brain) Engine', 'Class Incharge Setup', 'Teacher Period Load Balancing', 'Room & Subject Allocations']
  },
  {
    name: 'Expenditure Portal',
    icon: 'TrendingDown',
    items: ['Category Spending Breakdown (Utilities, Repairs, Supplies)', 'Cash in Hand Tracking', 'Monthly Expense Variance Reports', 'Daily Expense Vouchers']
  },
  {
    name: 'Payroll Portal',
    icon: 'DollarSign',
    items: ['Automated Salary Generation', 'Advance Payment Deductions', 'Late Arrival Salary Deductions', 'Staff Pay Slip Printing & Export']
  },
  {
    name: 'Family Portal',
    icon: 'Users',
    items: ['Unified Family ID Creation', 'Multi-Sibling Linking', 'Consolidated Family Fee Vouchers', 'Single-contact Guardian Broadcasts']
  },
  {
    name: 'Staff Portal',
    icon: 'Briefcase',
    items: ['Teacher & Administrative Onboarding', 'Role-Based Access Control', 'Monthly Staff Review Summaries', 'Emergency Contact Registers']
  },
  {
    name: 'Certificate Portal',
    icon: 'Award',
    items: ['Instant Birth Certificate Generator', 'School Leaving / Migration Certificate', 'Hope & Character Certificates', 'Tamper-Proof Verification Codes']
  },
  {
    name: 'School Info & Analytics',
    icon: 'BarChart3',
    items: ['Session Growth Year-over-Year', 'Dropout Reason Factor Analysis', 'Net Income vs Expenditure Summary', 'Class Strength Heatmaps']
  },
  {
    name: 'Setup & System Portal',
    icon: 'Settings',
    items: ['Academic Session Shifting', 'Class & Section Architecture', 'SMS / WhatsApp Gateway Settings', 'Instant Cloud Synchronization']
  }
];
