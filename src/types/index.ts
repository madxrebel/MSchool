export interface Student {
  id: string;
  grNo: string;
  name: string;
  fatherName: string;
  class: string;
  section: string;
  phone: string;
  familyId: string;
  status: 'Enrolled' | 'Left';
  monthlyFee: number;
  totalDues: number;
  unpaidMonths: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'LEAVE';
  date: string;
  class: string;
  section: string;
}

export interface StaffMember {
  id: string;
  name: string;
  fatherOrHusbandName: string;
  role: 'Principal' | 'Teacher' | 'Accountant' | 'Operator' | 'Admin';
  phone: string;
  attendanceToday: 'PRESENT' | 'ABSENT' | 'LATE';
  baseSalary: number;
}

export interface FeeReceipt {
  slipNo: number;
  slipDate: string;
  studentId: string;
  studentName: string;
  fatherName: string;
  class: string;
  section: string;
  monthlyFee: number;
  monthsPaid: string[];
  totalDues: number;
  receivedAmount: number;
  remainingAmount: number;
  familyId: string;
  timestamp: number;
}

export interface DiaryEntry {
  id: string;
  class: string;
  section: string;
  date: string;
  content: string;
  hasAttachment?: boolean;
  subject?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  sendTo: 'All' | 'By Role' | 'Individual' | 'Self Reminder';
  roleTarget?: string;
  individualTarget?: string;
  isHighPriority: boolean;
  timestamp: string;
  sender: string;
}

export interface DemoRequest {
  name: string;
  schoolName: string;
  role: string;
  phone: string;
  city: string;
  estimatedStudents: string;
  interestedModules: string[];
  notes?: string;
  createdAt: string;
}
