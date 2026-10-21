/**
 * Real product data copied from the apps' public Google Play listings (fetched 2026-10-18).
 * Only facts that appear on those listings. Add to this file as more products are linked.
 * Images live in src/assets/products/<product>/ (icon.png + screen-N.jpg, 720px-wide originals).
 */
export interface ProductScreen {
  file: string; // file name inside src/assets/products/<id>/
  caption: string; // from the Play Store screenshot's own headline
}

export interface PlayStoreProduct {
  id: 'mschool' | 'mstudent';
  name: string;
  tagline: string; // Play Store short description
  description: string; // Play Store full description (verbatim)
  playStoreUrl: string;
  packageId: string;
  rating: number;
  downloads: string; // as shown on the listing
  contentRating: string;
  capabilities: string[]; // taken from the description
  screens: ProductScreen[];
}

export const PLAY_STORE_PRODUCTS: PlayStoreProduct[] = [
  {
    id: 'mschool',
    name: 'MSchool',
    tagline: 'Innovative Mobile School Management System',
    description:
      'MSchool is an innovative Android based School Management System that enables schools to go complete digital through their android devices. It enables schools to store student information, collect fee, print out defaulter list, receipts, take digital or manual attendance, create and manage examinations, generate question papers, Roll No slips, ID cards, print certificates and much more.....',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.themudhousestudio.damadminpanel',
    packageId: 'com.themudhousestudio.damadminpanel',
    rating: 4.5,
    downloads: '100+',
    contentRating: '3+',
    capabilities: [
      'Student information',
      'Fee collection',
      'Defaulter lists',
      'Fee receipts',
      'Digital or manual attendance',
      'Exams',
      'Question papers',
      'Roll No slips',
      'ID cards',
      'Certificates',
    ],
    screens: [
      { file: 'screen-1.jpg', caption: 'Control your school from your mobile phone' },
      { file: 'screen-2.jpg', caption: 'Fee Portal: from submitting fee to printing the receipt or defaulters list' },
      { file: 'screen-3.jpg', caption: 'Design school ID cards with a single click' },
      { file: 'screen-4.jpg', caption: 'Submit fee individually or by family, share via WhatsApp' },
      { file: 'screen-5.jpg', caption: 'Daily diary with pictures or text, viewed on the parent app' },
      { file: 'screen-6.jpg', caption: 'Generate test and exam papers instantly' },
      { file: 'screen-7.jpg', caption: 'Student and staff attendance, manual or digital' },
    ],
  },
  {
    id: 'mstudent',
    name: 'MStudent',
    tagline: 'Student Record Tracking and Learning App',
    description:
      "MStudent App is a complete student record tracking app for students and parents. It provides parents to track their children's Daily Diaries, Attendance, Notices, Test and Exam Results. It also provides a complete learning platform for students to learn their school curriculum within their finger tips. Students can read, take quizzes to enhance their educational power.",
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.themudhousestudio.maymaracademy',
    packageId: 'com.themudhousestudio.maymaracademy',
    rating: 4.8,
    downloads: '1K+',
    contentRating: '3+',
    capabilities: [
      'Daily diaries',
      'Attendance',
      'Notices',
      'Test and exam results',
      'Fee tracking',
      'Lessons with translations and pronunciation',
      'Practice quizzes',
      'Several children on one account',
    ],
    screens: [
      { file: 'screen-1.jpg', caption: 'Track your children’s progress, fee, diary, attendance and results' },
      { file: 'screen-2.jpg', caption: 'Revise school lessons, with translations and pronunciations' },
      { file: 'screen-3.jpg', caption: 'Practice quizzes to strengthen your studies' },
      { file: 'screen-4.jpg', caption: 'Exam results on your mobile phone' },
      { file: 'screen-5.jpg', caption: 'Add your child with the ID and password from the school' },
      { file: 'screen-6.jpg', caption: 'Switch between your children’s profiles' },
    ],
  },
];
