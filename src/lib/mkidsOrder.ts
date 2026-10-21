import { BRAND_CONFIG } from '../constants';
import { CLASS_PRICES, PLANS, PRICES_CONFIRMED, calcOrder, formatPKR, type OrderSelection } from '../data/mkidsPricing';

export interface OrderContact {
  name: string;
  schoolName: string;
  phone: string;
  city: string;
  notes: string;
}

/** The order text that arrives in the MSchool WhatsApp. */
export const buildOrderMessage = (sel: OrderSelection, c: OrderContact): string => {
  const t = calcOrder(sel);
  const plan = PLANS.find((p) => p.id === sel.plan)?.name ?? '';
  const classes = CLASS_PRICES.filter((x) => (sel.qty[x.id] || 0) > 0).map((x) => `${x.name}: ${sel.qty[x.id]}`);
  return [
    '*New MKids order*',
    '',
    `Name: ${c.name}`,
    ...(sel.buyer === 'school' ? [`School: ${c.schoolName}`] : []),
    `Phone: ${c.phone}`,
    `City: ${c.city}`,
    `Ordering as: ${sel.buyer === 'school' ? 'School' : 'Parent'}`,
    `Plan: ${plan}`,
    `${sel.buyer === 'school' ? 'Students' : 'Children'}: ${classes.join(', ')}`,
    '',
    '*Order*',
    ...t.lines.map((l) => `- ${l.label} (${l.detail}): ${formatPKR(l.amount)}`),
    ...(t.discount > 0 ? [`- School discount (${Math.round(t.discountRate * 100)}%): -${formatPKR(t.discount)}`] : []),
    `*Total: ${formatPKR(t.total)}*${PRICES_CONFIRMED ? '' : ' (estimate, to be confirmed)'}`,
    ...(c.notes ? ['', `Notes: ${c.notes}`] : []),
    '',
    'Sent from the MKids page on the website',
  ].join('\n');
};

export const buildOrderUrl = (sel: OrderSelection, c: OrderContact): string =>
  `${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(buildOrderMessage(sel, c))}`;
