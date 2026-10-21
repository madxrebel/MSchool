import { BRAND_CONFIG } from '../constants';

export interface LeadMessageFields {
  name: string;
  schoolName: string;
  phone: string;
  studentCount: string;
  notes?: string;
  source?: string;
}

/** The text that arrives in the MSchool WhatsApp when a visitor sends their demo request. */
export const buildLeadMessage = (f: LeadMessageFields): string =>
  [
    '*New MSchool demo request*',
    '',
    `Name: ${f.name}`,
    `School: ${f.schoolName}`,
    `Phone: ${f.phone}`,
    `Students: ${f.studentCount}`,
    ...(f.notes ? [`Notes: ${f.notes}`] : []),
    '',
    `Sent from the website${f.source ? ` (${f.source})` : ''}`,
  ].join('\n');

/** wa.me link to the MSchool number with the lead message already typed in. */
export const buildLeadWhatsAppUrl = (f: LeadMessageFields): string =>
  `${BRAND_CONFIG.whatsappUrl}?text=${encodeURIComponent(buildLeadMessage(f))}`;
