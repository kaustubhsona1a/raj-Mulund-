import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Patient,
  Vitals,
  PrescriptionItem,
  ConsultationTemplate,
  ConsultationType,
} from '../../types';
import { PatientAvatar } from '../common/VisualAvatar';
import {
  Stethoscope,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  FileText,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

interface ConsultationWorkspaceProps {
  initialPatientId?: string;
  initialAppointmentId?: string;
  onFinish: (consultationId: string) => void;
  onCancel: () => void;
}

export const ConsultationWorkspace: React.FC<ConsultationWorkspaceProps> = ({
  initialPatientId,
  initialAppointmentId,
  onFinish,
  onCancel,
}) => {
  const {
    patients,
    templates,
    createConsultation,
    clinicInfo,
    currentUser,
    appointments,
  } = useClinic();

  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    initialPatientId || patients[0]?.id || ''
  );
  const patient = patients.find((p) => p.id === selectedPatientId);

  // Form State
  const [consultationType, setConsultationType] = useState<ConsultationType>('New Consultation');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [diagnosisInput, setDiagnosisInput] = useState('');
  const [investigationsInput, setInvestigationsInput] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [assessment, setAssessment] = useState('');
  const [doctorInstructions, setDoctorInstructions] = useState('');
  const [followupDate, setFollowupDate] = useState('2026-10-17');
  const [durationMinutes, setDurationMinutes] = useState(30);

  // Vitals
  const [vitals, setVitals] = useState<Vitals>({
    bloodPressureSys: 120,
    bloodPressureDia: 80,
    heartRateBpm: 72,
    respiratoryRate: 16,
    temperatureF: 98.6,
    oxygenSaturation: 99,
    weightKg: 70,
    heightCm: 172,
    bmi: 23.7,
  });

  // Inline Prescription Builder
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      id: `p-item-1`,
      medicineName: '',
      strength: '',
      dosage: '1 tablet',
      frequency: 'Once daily with food',
      duration: '30 days',
      instructions: 'Take in the morning with a glass of water.',
    },
  ]);

  // Recalculate BMI whenever weight or height changes
  useEffect(() => {
    if (vitals.weightKg && vitals.heightCm) {
      const hM = vitals.heightCm / 100;
      const calculatedBmi = Number((vitals.weightKg / (hM * hM)).toFixed(1));
      setVitals((prev) => ({ ...prev, bmi: calculatedBmi }));
    }
  }, [vitals.weightKg, vitals.heightCm]);

  // Apply Template Helper
  const applyTemplate = (tmpl: ConsultationTemplate) => {
    setChiefComplaint(tmpl.chiefComplaint);
    setSymptomsInput(tmpl.symptoms.join(', '));
    setAssessment(tmpl.assessmentTemplate);
    setDoctorInstructions(tmpl.instructionsTemplate);
    setInvestigationsInput(tmpl.standardInvestigations.join(', '));
  };

  const handleAddMedication = () => {
    setPrescriptions((prev) => [
      ...prev,
      {
        id: `p-item-${Date.now()}`,
        medicineName: '',
        strength: '',
        dosage: '1 tablet',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: '',
      },
    ]);
  };

  const handleRemoveMedication = (id: string) => {
    setPrescriptions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateMedication = (id: string, field: keyof PrescriptionItem, value: string) => {
    setPrescriptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    // Filter valid prescription items
    const validPrescriptions = prescriptions.filter((p) => p.medicineName.trim().length > 0);

    const created = createConsultation({
      appointmentId: initialAppointmentId,
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      date: '2026-10-03',
      type: consultationType,
      chiefComplaint: chiefComplaint || 'Routine medical evaluation',
      symptoms: symptomsInput ? symptomsInput.split(',').map((s) => s.trim()) : [],
      vitals,
      clinicalNotes,
      assessment: assessment || 'Clinical review completed. Vitals stable.',
      diagnosis: diagnosisInput ? diagnosisInput.split(',').map((d) => d.trim()) : [],
      investigationsOrdered: investigationsInput ? investigationsInput.split(',').map((i) => i.trim()) : [],
      doctorInstructions,
      prescriptionsIssued: validPrescriptions,
      followupDate: followupDate || undefined,
      doctorName: currentUser.name,
      durationMinutes,
    });

    onFinish(created.id);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-1.5 text-[#5D6761] hover:text-[#141213] rounded-md hover:bg-[#EFE9DF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
              Consultation Workspace
            </h1>
            <p className="text-xs text-[#5D6761]">
              Active clinical encounter · {currentUser.name}
            </p>
          </div>
        </div>

        {/* Template Quick Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7D8781]">
            Load Template:
          </span>
          <select
            onChange={(e) => {
              const tmpl = templates.find((t) => t.id === e.target.value);
              if (tmpl) applyTemplate(tmpl);
            }}
            defaultValue=""
            className="bg-white border border-[#DDD5C7] rounded-lg px-2.5 py-1.5 text-xs text-[#1C221F] outline-none"
          >
            <option value="" disabled>
              Select Template...
            </option>
            {templates.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Selection & Summary Strip */}
        <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-[#3C4540]">
                Patient:
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg px-3 py-1.5 text-xs font-medium text-[#1C221F] outline-none"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.firstName} {p.lastName} ({p.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <label className="text-xs font-semibold text-[#3C4540]">
                Consultation Type:
              </label>
              <select
                value={consultationType}
                onChange={(e: any) => setConsultationType(e.target.value)}
                className="bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg px-3 py-1.5 text-xs text-[#1C221F] outline-none"
              >
                <option value="New Consultation">New Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="In-person">In-person</option>
                <option value="Video Consultation">Video Consultation</option>
              </select>
            </div>
          </div>

          {patient && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#EAE3D6] text-xs">
              <div>
                <span className="text-[10px] text-[#7A847E] uppercase block">Allergies</span>
                <span className="font-semibold text-rose-700">
                  {patient.allergies.length ? patient.allergies.join(', ') : 'NKDA'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A847E] uppercase block">Current Meds</span>
                <span className="text-[#1C221F] font-medium truncate block">
                  {patient.currentMedications.length ? patient.currentMedications.join(', ') : 'None'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A847E] uppercase block">Last Visit</span>
                <span className="font-mono text-[#1C221F]">{patient.lastVisitAt || 'None'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A847E] uppercase block">Known History</span>
                <span className="text-[#1C221F] truncate block">
                  {patient.pastConditions.join(', ') || 'None recorded'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 1: Chief Complaint & Symptoms */}
        <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold text-[#141213] uppercase tracking-wider text-xs">
            1. Chief Complaint & Symptoms
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-[#3C4540] block mb-1">
                Chief Complaint *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Follow-up of glycemic control and HbA1c review"
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3C4540] block mb-1">
                Presenting Symptoms (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Mild fatigue, morning tension, postprandial lethargy"
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Patient Vitals */}
        <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold text-[#141213] uppercase tracking-wider text-xs">
            2. Vitals & Biometrics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-[#48534C] block mb-1">
                BP Systolic (mmHg)
              </label>
              <input
                type="number"
                value={vitals.bloodPressureSys}
                onChange={(e) =>
                  setVitals({ ...vitals, bloodPressureSys: Number(e.target.value) })
                }
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg font-mono text-center outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#48534C] block mb-1">
                BP Diastolic (mmHg)
              </label>
              <input
                type="number"
                value={vitals.bloodPressureDia}
                onChange={(e) =>
                  setVitals({ ...vitals, bloodPressureDia: Number(e.target.value) })
                }
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg font-mono text-center outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#48534C] block mb-1">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={vitals.heartRateBpm}
                onChange={(e) =>
                  setVitals({ ...vitals, heartRateBpm: Number(e.target.value) })
                }
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg font-mono text-center outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#48534C] block mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={vitals.weightKg || ''}
                onChange={(e) =>
                  setVitals({ ...vitals, weightKg: Number(e.target.value) })
                }
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg font-mono text-center outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#48534C] block mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={vitals.heightCm || ''}
                onChange={(e) =>
                  setVitals({ ...vitals, heightCm: Number(e.target.value) })
                }
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg font-mono text-center outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#48534C] block mb-1">
                Calculated BMI
              </label>
              <div className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg font-mono text-center font-semibold text-[#7B1E34]">
                {vitals.bmi || '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Clinical Notes, Assessment & Diagnosis */}
        <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold text-[#141213] uppercase tracking-wider text-xs">
            3. Clinical Notes & Assessment
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#3C4540] block mb-1">
                Objective Clinical Notes / Physical Examination
              </label>
              <textarea
                rows={3}
                placeholder="Document patient physical exam, auscultation findings, neurological/cardiac observations..."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  Clinical Assessment *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Physician synthesis and diagnostic impression..."
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  Working Diagnosis (comma-separated) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Type 2 Diabetes Mellitus (E11.9), Mixed Hyperlipidemia"
                  value={diagnosisInput}
                  onChange={(e) => setDiagnosisInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Prescription Generator */}
        <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#141213] uppercase tracking-wider text-xs flex items-center gap-1.5">
              <span>℞</span>
              <span>4. Digital Prescription Builder</span>
            </h2>

            <button
              type="button"
              onClick={handleAddMedication}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#7B1E34] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="space-y-3">
            {prescriptions.map((rxItem, idx) => (
              <div
                key={rxItem.id}
                className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end text-xs"
              >
                <div className="sm:col-span-4">
                  <label className="text-[10px] uppercase font-semibold text-[#6C7670] block mb-0.5">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Metformin Extended Release"
                    value={rxItem.medicineName}
                    onChange={(e) =>
                      handleUpdateMedication(rxItem.id, 'medicineName', e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase font-semibold text-[#6C7670] block mb-0.5">
                    Strength
                  </label>
                  <input
                    type="text"
                    placeholder="500 mg"
                    value={rxItem.strength}
                    onChange={(e) =>
                      handleUpdateMedication(rxItem.id, 'strength', e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase font-semibold text-[#6C7670] block mb-0.5">
                    Dosage & Freq
                  </label>
                  <input
                    type="text"
                    placeholder="1 tab / BID"
                    value={rxItem.frequency}
                    onChange={(e) =>
                      handleUpdateMedication(rxItem.id, 'frequency', e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] uppercase font-semibold text-[#6C7670] block mb-0.5">
                    Duration & Directions
                  </label>
                  <input
                    type="text"
                    placeholder="90 days with dinner"
                    value={rxItem.instructions}
                    onChange={(e) =>
                      handleUpdateMedication(rxItem.id, 'instructions', e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end pb-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(rxItem.id)}
                    className="p-1 text-rose-600 hover:text-rose-800 rounded"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Investigations, Patient Advice & Follow-up */}
        <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold text-[#141213] uppercase tracking-wider text-xs">
            5. Investigations & Follow-Up Plan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#3C4540] block mb-1">
                Diagnostic Investigations Ordered
              </label>
              <input
                type="text"
                placeholder="e.g. HbA1c, ApoB, Lipid Panel, ECG"
                value={investigationsInput}
                onChange={(e) => setInvestigationsInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3C4540] block mb-1">
                Next Follow-Up Date
              </label>
              <input
                type="date"
                min="2026-10-03"
                value={followupDate}
                onChange={(e) => setFollowupDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-[#3C4540] block mb-1">
                Doctor Instructions for Patient
              </label>
              <textarea
                rows={2}
                placeholder="Direct instructions shared with the patient and recorded in their patient portal..."
                value={doctorInstructions}
                onChange={(e) => setDoctorInstructions(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#DDD5C7] shadow-lg flex items-center justify-between">
          <div className="text-xs text-[#6B756F]">
            Saving will authoritatively update the patient record, generate digital Rx, invoice, and append to the chronological medical timeline.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium text-[#525C56] hover:text-[#141213]"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Finalize & Save Consultation</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
