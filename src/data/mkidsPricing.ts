/**
 * MKids price list. EVERY NUMBER HERE IS A PLACEHOLDER until the CEO confirms the real prices.
 * Edit this file only: the order page, the total and the WhatsApp message all read from it.
 * When the real prices are in, set PRICES_CONFIRMED to true and the "sample prices" notices disappear.
 */
export const PRICES_CONFIRMED = false;

export type ClassId = 'nursery' | 'kg1' | 'kg2';
export type BuyerType = 'school' | 'parent';
export type PlanId = 'year' | 'term';

export interface ClassPrice {
  id: ClassId;
  name: string;
  book: string; // Dreamz book set
  perStudentYear: number; // PKR, one student, one class, one year
  bookSetPrice: number; // PKR, optional printed Dreamz book set for one student
}

export const CLASS_PRICES: ClassPrice[] = [
  { id: 'nursery', name: 'Nursery', book: 'Book A', perStudentYear: 1200, bookSetPrice: 1500 },
  { id: 'kg1', name: 'KG-1', book: 'Book B', perStudentYear: 1300, bookSetPrice: 1600 },
  { id: 'kg2', name: 'KG-2', book: 'Book C', perStudentYear: 1400, bookSetPrice: 1700 },
];

export const PLANS: { id: PlanId; name: string; note: string; multiplier: number }[] = [
  { id: 'year', name: 'Full year', note: 'Best value', multiplier: 1 },
  { id: 'term', name: 'One term', note: 'About 3 months', multiplier: 0.45 },
];

/** Schools get a discount on the app price as the total number of students grows. */
export const SCHOOL_TIERS: { minStudents: number; discount: number }[] = [
  { minStudents: 0, discount: 0 },
  { minStudents: 50, discount: 0.1 },
  { minStudents: 150, discount: 0.15 },
  { minStudents: 300, discount: 0.2 },
];

export interface FlatAddon {
  id: string;
  name: string;
  detail: string;
  price: number; // PKR, once
  buyer: BuyerType;
}

export const FLAT_ADDONS: FlatAddon[] = [
  { id: 'training', name: 'Teacher training session', detail: 'One walkthrough for your teachers', price: 5000, buyer: 'school' },
  { id: 'setup', name: 'Setup and onboarding', detail: 'We set up your classes and devices guidance', price: 3000, buyer: 'school' },
];

export interface OrderSelection {
  buyer: BuyerType;
  plan: PlanId;
  qty: Record<ClassId, number>; // students (school) or children (parent) per class
  withBooks: Record<ClassId, boolean>; // add the printed Dreamz book set for that class
  addons: string[]; // FlatAddon ids
}

export interface OrderLine {
  label: string;
  detail: string;
  amount: number;
}

export interface OrderTotals {
  lines: OrderLine[];
  students: number;
  discountRate: number;
  discount: number;
  total: number;
}

const tierFor = (students: number) =>
  [...SCHOOL_TIERS].reverse().find((t) => students >= t.minStudents) ?? SCHOOL_TIERS[0];

export const emptySelection = (buyer: BuyerType = 'school'): OrderSelection => ({
  buyer,
  plan: 'year',
  qty: { nursery: 0, kg1: 0, kg2: 0 },
  withBooks: { nursery: false, kg1: false, kg2: false },
  addons: [],
});

export const calcOrder = (sel: OrderSelection): OrderTotals => {
  const plan = PLANS.find((p) => p.id === sel.plan) ?? PLANS[0];
  const lines: OrderLine[] = [];
  let appSubtotal = 0;
  let students = 0;

  for (const c of CLASS_PRICES) {
    const n = Math.max(0, Math.floor(sel.qty[c.id] || 0));
    if (n === 0) continue;
    students += n;
    const unit = Math.round(c.perStudentYear * plan.multiplier);
    const amount = unit * n;
    appSubtotal += amount;
    lines.push({
      label: `${c.name} app access`,
      detail: `${n} × Rs ${unit.toLocaleString('en-PK')} (${plan.name.toLowerCase()})`,
      amount,
    });
  }

  const discountRate = sel.buyer === 'school' ? tierFor(students).discount : 0;
  const discount = Math.round(appSubtotal * discountRate);

  for (const c of CLASS_PRICES) {
    const n = Math.max(0, Math.floor(sel.qty[c.id] || 0));
    if (n === 0 || !sel.withBooks[c.id]) continue;
    lines.push({
      label: `${c.name} printed books (${c.book})`,
      detail: `${n} × Rs ${c.bookSetPrice.toLocaleString('en-PK')}`,
      amount: c.bookSetPrice * n,
    });
  }

  if (sel.buyer === 'school' && students > 0) {
    for (const a of FLAT_ADDONS) {
      if (a.buyer === 'school' && sel.addons.includes(a.id)) {
        lines.push({ label: a.name, detail: 'One time', amount: a.price });
      }
    }
  }

  const gross = lines.reduce((s, l) => s + l.amount, 0);
  return { lines, students, discountRate, discount, total: gross - discount };
};

export const formatPKR = (n: number) => `Rs ${n.toLocaleString('en-PK')}`;
