import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClinicInfo,
  UserAccount,
  UserRole,
  Patient,
  Appointment,
  AppointmentStatus,
  Consultation,
  Prescription,
  LabReport,
  Invoice,
  InventoryItem,
  DoctorTask,
  AuditLog,
  ClinicDocument,
  TimelineEvent,
  ConsultationTemplate
} from '../types';
import {
  INITIAL_CLINIC_INFO,
  INITIAL_STAFF_ACCOUNTS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_LAB_REPORTS,
  INITIAL_INVOICES,
  INITIAL_TASKS,
  INITIAL_INVENTORY,
  INITIAL_DOCUMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TEMPLATES
} from '../data/initialData';

interface ClinicContextType {
  currentUser: UserAccount;
  setCurrentUser: (user: UserAccount) => void;
  availableStaff: UserAccount[];
  switchRole: (role: UserRole) => void;
  clinicInfo: ClinicInfo;
  updateClinicInfo: (info: Partial<ClinicInfo>) => void;

  // Patients
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'code' | 'registeredAt'>) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  getPatient: (id: string) => Patient | undefined;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (apt: {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    date: string;
    time: string;
    type: any;
    reason: string;
    patientId?: string;
    notes?: string;
  }) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;

  // Consultations
  consultations: Consultation[];
  createConsultation: (cst: Omit<Consultation, 'id' | 'consultationNumber' | 'createdAt'>) => Consultation;
  templates: ConsultationTemplate[];

  // Prescriptions
  prescriptions: Prescription[];
  createPrescription: (rx: Omit<Prescription, 'id' | 'prescriptionNumber' | 'createdAt'>) => Prescription;

  // Lab Reports
  labReports: LabReport[];
  reviewLabReport: (id: string, notes?: string) => void;
  uploadLabReport: (report: Omit<LabReport, 'id' | 'status'>) => LabReport;

  // Invoices & Billing
  invoices: Invoice[];
  createInvoice: (inv: Omit<Invoice, 'id' | 'invoiceNumber'>) => Invoice;
  updateInvoiceStatus: (id: string, status: Invoice['status'], paymentMethod?: Invoice['paymentMethod']) => void;

  // Tasks
  tasks: DoctorTask[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<DoctorTask, 'id' | 'completed' | 'completedAt'>) => void;
  deleteTask: (id: string) => void;

  // Inventory
  inventory: InventoryItem[];
  updateInventoryStock: (id: string, newStock: number) => void;

  // Documents
  documents: ClinicDocument[];
  addDocument: (doc: Omit<ClinicDocument, 'id' | 'uploadedAt'>) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  logAuditAction: (action: string, details: string, entityType: AuditLog['entityType'], entityId?: string) => void;

  // Patient Medical Timeline Helper
  getPatientTimeline: (patientId: string) => TimelineEvent[];

  // Global Search modal state
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Reset to initial demo data
  resetDemoData: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purge any stale legacy localStorage items from prior versions
  useEffect(() => {
    try {
      const legacyKeys = [
        'aura_current_user',
        'aura_clinic_info',
        'aura_patients',
        'aura_appointments',
        'aura_consultations',
        'aura_prescriptions',
        'aura_lab_reports',
        'aura_invoices',
        'aura_tasks',
        'aura_inventory',
        'aura_documents',
        'aura_audit_logs',
      ];
      legacyKeys.forEach((key) => localStorage.removeItem(key));
    } catch (e) {
      // Ignore if localStorage is disabled
    }
  }, []);

  // Load from local storage or initial
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && !parsed.name.includes('Marcus') && parsed.name.includes('Mukhi')) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_STAFF_ACCOUNTS[0]; // Dr. Kush Mukhi
  });

  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_clinic');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.doctorName && !parsed.doctorName.includes('Marcus') && parsed.doctorName.includes('Mukhi')) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_CLINIC_INFO;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_patients');
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch (e) {
      return INITIAL_PATIENTS;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_appointments');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch (e) {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_consultations');
      return saved ? JSON.parse(saved) : INITIAL_CONSULTATIONS;
    } catch (e) {
      return INITIAL_CONSULTATIONS;
    }
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_prescriptions');
      return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
    } catch (e) {
      return INITIAL_PRESCRIPTIONS;
    }
  });

  const [labReports, setLabReports] = useState<LabReport[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_lab_reports');
      return saved ? JSON.parse(saved) : INITIAL_LAB_REPORTS;
    } catch (e) {
      return INITIAL_LAB_REPORTS;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_invoices');
      return saved ? JSON.parse(saved) : INITIAL_INVOICES;
    } catch (e) {
      return INITIAL_INVOICES;
    }
  });

  const [tasks, setTasks] = useState<DoctorTask[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch (e) {
      return INITIAL_TASKS;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_inventory');
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    } catch (e) {
      return INITIAL_INVENTORY;
    }
  });

  const [documents, setDocuments] = useState<ClinicDocument[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_documents');
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch (e) {
      return INITIAL_DOCUMENTS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('raj_hospital_os_v4_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch (e) {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_user', JSON.stringify(currentUser));
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_clinic', JSON.stringify(clinicInfo));
    } catch (e) {}
  }, [clinicInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_patients', JSON.stringify(patients));
    } catch (e) {}
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_appointments', JSON.stringify(appointments));
    } catch (e) {}
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_consultations', JSON.stringify(consultations));
    } catch (e) {}
  }, [consultations]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_prescriptions', JSON.stringify(prescriptions));
    } catch (e) {}
  }, [prescriptions]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_lab_reports', JSON.stringify(labReports));
    } catch (e) {}
  }, [labReports]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_invoices', JSON.stringify(invoices));
    } catch (e) {}
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_inventory', JSON.stringify(inventory));
    } catch (e) {}
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_documents', JSON.stringify(documents));
    } catch (e) {}
  }, [documents]);

  useEffect(() => {
    try {
      localStorage.setItem('raj_hospital_os_v4_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {}
  }, [auditLogs]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const logAuditAction = (
    action: string,
    details: string,
    entityType: AuditLog['entityType'],
    entityId?: string
  ) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      details,
      entityType,
      entityId,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    const target = INITIAL_STAFF_ACCOUNTS.find((s) => s.role === role) || INITIAL_STAFF_ACCOUNTS[0];
    setCurrentUser(target);
    logAuditAction('SWITCH_ROLE', `Switched active session to ${target.name} (${role})`, 'Settings');
  };

  const updateClinicInfo = (updates: Partial<ClinicInfo>) => {
    setClinicInfo((prev) => ({ ...prev, ...updates }));
    logAuditAction('UPDATE_CLINIC_INFO', 'Updated practice profile settings', 'Settings');
  };

  const addPatient = (newP: Omit<Patient, 'id' | 'code' | 'registeredAt'>) => {
    const id = `pt-${Date.now()}`;
    const code = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
    const created: Patient = {
      ...newP,
      id,
      code,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    setPatients((prev) => [created, ...prev]);
    logAuditAction('PATIENT_CREATED', `Registered new patient ${created.firstName} ${created.lastName} (${created.code})`, 'Patient', id);
    return created;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    logAuditAction('PATIENT_UPDATED', `Updated patient record ${id}`, 'Patient', id);
  };

  const getPatient = (id: string) => {
    return patients.find((p) => p.id === id);
  };

  const bookAppointment = (data: {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    date: string;
    time: string;
    type: any;
    reason: string;
    patientId?: string;
    notes?: string;
  }) => {
    // Check if patient exists by email or create new patient
    let patientId = data.patientId;
    if (!patientId) {
      const existing = patients.find(
        (p) => p.email.toLowerCase() === data.patientEmail.toLowerCase() || p.phone === data.patientPhone
      );
      if (existing) {
        patientId = existing.id;
      } else {
        const parts = data.patientName.trim().split(' ');
        const firstName = parts[0] || 'Patient';
        const lastName = parts.slice(1).join(' ') || '';
        const created = addPatient({
          firstName,
          lastName,
          email: data.patientEmail,
          phone: data.patientPhone,
          dateOfBirth: '1990-01-01',
          gender: 'Prefer not to say',
          bloodGroup: 'Unknown',
          address: 'Self-registered via booking portal',
          emergencyContact: { name: '', relation: '', phone: '' },
          allergies: [],
          currentMedications: [],
          pastConditions: [],
          pastProcedures: [],
          familyHistory: [],
          notes: data.reason,
          status: 'Active',
        });
        patientId = created.id;
      }
    }

    const refNumber = `REF-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: patientId || 'pt-new',
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      date: data.date,
      time: data.time,
      type: data.type,
      status: 'Confirmed',
      reason: data.reason,
      bookingReference: refNumber,
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Also create corresponding task for the clinic staff
    const newTask: DoctorTask = {
      id: `tsk-${Date.now()}`,
      title: `Upcoming ${data.type} with ${data.patientName}`,
      category: 'Review',
      patientId: newAppointment.patientId,
      patientName: data.patientName,
      dueDate: data.date,
      priority: 'Normal',
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);

    logAuditAction(
      'APPOINTMENT_BOOKED',
      `Booked ${data.type} for ${data.patientName} on ${data.date} at ${data.time}`,
      'Appointment',
      newAppointment.id
    );

    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    logAuditAction('APPOINTMENT_STATUS_CHANGE', `Set appointment ${id} status to ${status}`, 'Appointment', id);
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' } : a
      )
    );
    logAuditAction(
      'APPOINTMENT_RESCHEDULED',
      `Rescheduled appointment ${id} to ${newDate} at ${newTime}`,
      'Appointment',
      id
    );
  };

  const createConsultation = (
    data: Omit<Consultation, 'id' | 'consultationNumber' | 'createdAt'>
  ) => {
    const consultationNumber = `CST-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newCst: Consultation = {
      ...data,
      id: `cst-${Date.now()}`,
      consultationNumber,
      createdAt: new Date().toISOString(),
    };

    setConsultations((prev) => [newCst, ...prev]);

    // Update patient last visit and next follow up
    if (data.patientId) {
      updatePatient(data.patientId, {
        lastVisitAt: data.date,
        nextFollowupAt: data.followupDate || undefined,
      });
    }

    // Mark appointment completed if linked
    if (data.appointmentId) {
      updateAppointmentStatus(data.appointmentId, 'Completed');
    }

    // If prescription items are attached, generate digital prescription record
    if (data.prescriptionsIssued && data.prescriptionsIssued.length > 0) {
      const patient = getPatient(data.patientId);
      const birthYear = patient?.dateOfBirth ? new Date(patient.dateOfBirth).getFullYear() : 1985;
      const age = new Date().getFullYear() - birthYear;

      createPrescription({
        patientId: data.patientId,
        patientName: data.patientName,
        patientAge: age,
        patientGender: patient?.gender || 'Unknown',
        date: data.date,
        doctorName: data.doctorName,
        doctorTitle: clinicInfo.doctorTitle,
        diagnosis: data.diagnosis,
        items: data.prescriptionsIssued,
        investigationsRecommended: data.investigationsOrdered,
        generalInstructions: data.doctorInstructions,
        followupDate: data.followupDate,
        signedBy: `${data.doctorName}, MD`,
      });
    }

    // Auto-generate invoice for consultation
    createInvoice({
      patientId: data.patientId,
      patientName: data.patientName,
      patientEmail: getPatient(data.patientId)?.email || '',
      date: data.date,
      dueDate: data.date,
      items: [
        {
          id: `inv-i-${Date.now()}`,
          description: `Medical Consultation (${data.type}) - ${data.doctorName}`,
          quantity: 1,
          unitPrice: clinicInfo.consultationFee,
          total: clinicInfo.consultationFee,
        },
      ],
      subtotal: clinicInfo.consultationFee,
      taxAmount: 0,
      discountAmount: 0,
      totalAmount: clinicInfo.consultationFee,
      status: 'Paid',
      paymentMethod: 'Card',
      paidAt: new Date().toISOString(),
      consultationId: newCst.id,
    });

    logAuditAction(
      'CONSULTATION_COMPLETED',
      `Logged consultation ${consultationNumber} for ${data.patientName}`,
      'Consultation',
      newCst.id
    );

    return newCst;
  };

  const createPrescription = (
    data: Omit<Prescription, 'id' | 'prescriptionNumber' | 'createdAt'>
  ) => {
    const prescriptionNumber = `RX-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRx: Prescription = {
      ...data,
      id: `rx-${Date.now()}`,
      prescriptionNumber,
      createdAt: new Date().toISOString(),
    };
    setPrescriptions((prev) => [newRx, ...prev]);

    logAuditAction(
      'PRESCRIPTION_ISSUED',
      `Authorized digital prescription ${prescriptionNumber} for ${data.patientName}`,
      'Prescription',
      newRx.id
    );
    return newRx;
  };

  const reviewLabReport = (id: string, notes?: string) => {
    setLabReports((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Reviewed',
              reviewedAt: new Date().toISOString(),
              reviewedBy: currentUser.name,
              summaryNotes: notes || r.summaryNotes,
            }
          : r
      )
    );
    logAuditAction('LAB_REPORT_REVIEWED', `Marked lab report ${id} as Reviewed`, 'Report', id);
  };

  const uploadLabReport = (report: Omit<LabReport, 'id' | 'status'>) => {
    const newRep: LabReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'Pending Review',
    };
    setLabReports((prev) => [newRep, ...prev]);
    logAuditAction(
      'LAB_REPORT_UPLOADED',
      `Uploaded report "${report.testName}" for ${report.patientName}`,
      'Report',
      newRep.id
    );
    return newRep;
  };

  const createInvoice = (inv: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const invoiceNumber = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newInv: Invoice = {
      ...inv,
      id: `inv-${Date.now()}`,
      invoiceNumber,
    };
    setInvoices((prev) => [newInv, ...prev]);
    logAuditAction('INVOICE_GENERATED', `Generated invoice ${invoiceNumber} for ${inv.patientName}`, 'Invoice', newInv.id);
    return newInv;
  };

  const updateInvoiceStatus = (
    id: string,
    status: Invoice['status'],
    paymentMethod?: Invoice['paymentMethod']
  ) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status,
              paymentMethod: paymentMethod || inv.paymentMethod,
              paidAt: status === 'Paid' ? new Date().toISOString() : inv.paidAt,
            }
          : inv
      )
    );
    logAuditAction('INVOICE_STATUS_UPDATED', `Invoice ${id} marked as ${status}`, 'Invoice', id);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t
      )
    );
  };

  const addTask = (data: Omit<DoctorTask, 'id' | 'completed' | 'completedAt'>) => {
    const newTask: DoctorTask = {
      ...data,
      id: `tsk-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateInventoryStock = (id: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, currentStock: newStock } : item))
    );
  };

  const addDocument = (doc: Omit<ClinicDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: ClinicDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // CORE PATIENT TIMELINE GENERATOR
  const getPatientTimeline = (patientId: string): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    // Consultations
    consultations
      .filter((c) => c.patientId === patientId)
      .forEach((c) => {
        events.push({
          id: `timeline-cst-${c.id}`,
          patientId,
          date: c.date,
          category: 'Consultation',
          title: `${c.type} · ${c.consultationNumber}`,
          subtitle: c.diagnosis.length ? c.diagnosis.join(', ') : 'Clinical Consultation',
          details: {
            symptoms: c.symptoms,
            assessment: c.assessment,
            vitals: c.vitals,
            prescriptions: c.prescriptionsIssued,
            investigations: c.investigationsOrdered,
            instructions: c.doctorInstructions,
            followupDate: c.followupDate,
          },
          linkId: c.id,
        });
      });

    // Prescriptions
    prescriptions
      .filter((rx) => rx.patientId === patientId)
      .forEach((rx) => {
        events.push({
          id: `timeline-rx-${rx.id}`,
          patientId,
          date: rx.date,
          category: 'Prescription',
          title: `Prescription ${rx.prescriptionNumber}`,
          subtitle: `${rx.items.length} medication(s) prescribed`,
          details: {
            items: rx.items,
            instructions: rx.generalInstructions,
            followupDate: rx.followupDate,
          },
          linkId: rx.id,
        });
      });

    // Lab Reports
    labReports
      .filter((rep) => rep.patientId === patientId)
      .forEach((rep) => {
        events.push({
          id: `timeline-rep-${rep.id}`,
          patientId,
          date: rep.date,
          category: 'Lab Report',
          title: rep.testName,
          subtitle: `Status: ${rep.status}${rep.reviewedBy ? ` by ${rep.reviewedBy}` : ''}`,
          details: {
            findings: rep.keyFindings,
            summary: rep.summaryNotes,
            status: rep.status,
          },
          linkId: rep.id,
        });
      });

    // Appointments
    appointments
      .filter((apt) => apt.patientId === patientId)
      .forEach((apt) => {
        events.push({
          id: `timeline-apt-${apt.id}`,
          patientId,
          date: apt.date,
          category: 'Appointment',
          title: `${apt.type} (${apt.status})`,
          subtitle: `Reason: ${apt.reason} · Ref: ${apt.bookingReference}`,
          details: {
            time: apt.time,
            status: apt.status,
          },
          linkId: apt.id,
        });
      });

    // Sort descending by date
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const resetDemoData = () => {
    localStorage.clear();
    setClinicInfo(INITIAL_CLINIC_INFO);
    setCurrentUser(INITIAL_STAFF_ACCOUNTS[0]);
    setPatients(INITIAL_PATIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setConsultations(INITIAL_CONSULTATIONS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setLabReports(INITIAL_LAB_REPORTS);
    setInvoices(INITIAL_INVOICES);
    setTasks(INITIAL_TASKS);
    setInventory(INITIAL_INVENTORY);
    setDocuments(INITIAL_DOCUMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    logAuditAction('RESET_DEMO_DATA', 'Reset clinical environment to baseline state', 'Settings');
  };

  return (
    <ClinicContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        availableStaff: INITIAL_STAFF_ACCOUNTS,
        switchRole,
        clinicInfo,
        updateClinicInfo,
        patients,
        addPatient,
        updatePatient,
        getPatient,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        consultations,
        createConsultation,
        templates: INITIAL_TEMPLATES,
        prescriptions,
        createPrescription,
        labReports,
        reviewLabReport,
        uploadLabReport,
        invoices,
        createInvoice,
        updateInvoiceStatus,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        inventory,
        updateInventoryStock,
        documents,
        addDocument,
        auditLogs,
        logAuditAction,
        getPatientTimeline,
        isSearchOpen,
        setIsSearchOpen,
        resetDemoData,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
