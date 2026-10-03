export type UserRole = 'doctor' | 'admin' | 'receptionist' | 'assistant' | 'accountant';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar?: string;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  doctorName: string;
  doctorTitle: string;
  doctorCredentials: string;
  specialization: string;
  address: string;
  suite: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  consultationFee: number;
  followupFee: number;
  taxRatePercent: number;
}

export interface Patient {
  id: string;
  code: string; // e.g. "PT-1042"
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  bloodGroup: string;
  address: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  currentMedications: string[];
  pastConditions: string[];
  pastProcedures: string[];
  familyHistory: string[];
  notes: string;
  status: 'Active' | 'Under Observation' | 'Discharged';
  registeredAt: string;
  lastVisitAt?: string;
  nextFollowupAt?: string;
}

export type ConsultationType = 'New Consultation' | 'Follow-up' | 'In-person' | 'Video Consultation';

export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show' | 'Rescheduled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: ConsultationType;
  status: AppointmentStatus;
  reason: string;
  bookingReference: string; // e.g. "REF-82910"
  notes?: string;
  createdAt: string;
}

export interface Vitals {
  bloodPressureSys: number;
  bloodPressureDia: number;
  heartRateBpm: number;
  respiratoryRate?: number;
  temperatureF?: number;
  oxygenSaturation?: number;
  weightKg?: number;
  heightCm?: number;
  bmi?: number;
}

export interface PrescriptionItem {
  id: string;
  medicineName: string;
  strength: string; // e.g. "500 mg", "10 mg"
  dosage: string; // e.g. "1 tablet"
  frequency: string; // e.g. "Once daily after meals", "Twice daily", "As needed"
  duration: string; // e.g. "14 days", "1 month"
  instructions: string; // e.g. "Take in the morning with water"
}

export interface Prescription {
  id: string;
  prescriptionNumber: string; // e.g. "RX-2026-081"
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  doctorName: string;
  doctorTitle: string;
  diagnosis: string[];
  items: PrescriptionItem[];
  investigationsRecommended?: string[];
  generalInstructions?: string;
  followupDate?: string;
  signedBy: string;
  createdAt: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Cardiology' | 'Imaging' | 'Pathology' | 'Other';
  date: string;
  status: 'Pending Review' | 'Reviewed';
  reviewedAt?: string;
  reviewedBy?: string;
  summaryNotes?: string;
  keyFindings?: string;
  fileUrl?: string;
  fileSize?: string;
}

export interface Consultation {
  id: string;
  consultationNumber: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  date: string;
  type: ConsultationType;
  chiefComplaint: string;
  symptoms: string[];
  vitals: Vitals;
  clinicalNotes: string;
  assessment: string;
  diagnosis: string[];
  investigationsOrdered: string[];
  doctorInstructions: string;
  prescriptionsIssued?: PrescriptionItem[];
  followupDate?: string;
  doctorName: string;
  durationMinutes: number;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  patientId: string;
  date: string;
  category: 'Consultation' | 'Lab Report' | 'Prescription' | 'Appointment' | 'Note';
  title: string;
  subtitle: string;
  details?: Record<string, any>;
  linkId?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "INV-2026-104"
  patientId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
  paymentMethod?: 'Card' | 'Bank Transfer' | 'Cash' | 'Insurance';
  paidAt?: string;
  consultationId?: string;
}

export interface ClinicDocument {
  id: string;
  title: string;
  category: 'Patient Medical Record' | 'Consent Form' | 'Clinic License' | 'Clinical Agreement' | 'Insurance Authorization';
  patientId?: string;
  patientName?: string;
  uploadedAt: string;
  size: string;
  accessRole: UserRole[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicines' | 'Consumables' | 'Diagnostic' | 'Surgical & Sterile';
  currentStock: number;
  unit: string; // e.g. "Vials", "Boxes", "Packs", "Units"
  minStockLevel: number;
  expiryDate: string; // YYYY-MM-DD
  batchNumber: string;
  location: string;
}

export interface DoctorTask {
  id: string;
  title: string;
  category: 'Review' | 'Patient Call' | 'Prescription' | 'Administrative' | 'Procedure';
  patientId?: string;
  patientName?: string;
  dueDate: string;
  priority: 'High' | 'Normal' | 'Urgent';
  completed: boolean;
  completedAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  entityType: 'Patient' | 'Consultation' | 'Prescription' | 'Report' | 'Invoice' | 'Appointment' | 'Settings';
  entityId?: string;
}

export interface ConsultationTemplate {
  id: string;
  name: string;
  description: string;
  chiefComplaint: string;
  symptoms: string[];
  assessmentTemplate: string;
  instructionsTemplate: string;
  standardInvestigations: string[];
}
