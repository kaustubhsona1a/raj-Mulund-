import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Patient, TimelineEvent, Prescription, LabReport } from '../../types';
import { PatientAvatar } from '../common/VisualAvatar';
import { PrintablePrescription } from '../common/PrintablePrescription';
import {
  Calendar,
  Clock,
  Stethoscope,
  FileText,
  Activity,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Receipt,
  Printer,
  Shield,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Plus,
} from 'lucide-react';

interface PatientDetailViewProps {
  patientId: string;
  onBack: () => void;
  onLaunchConsultation: (patientId: string) => void;
  onReviewReport: (reportId: string) => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patientId,
  onBack,
  onLaunchConsultation,
  onReviewReport,
}) => {
  const {
    getPatient,
    getPatientTimeline,
    updatePatient,
    clinicInfo,
    prescriptions,
    labReports,
    currentUser,
  } = useClinic();

  const patient = getPatient(patientId);

  const [activeTab, setActiveTab] = useState<'timeline' | 'clinical' | 'prescriptions' | 'reports'>('timeline');
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>(null);

  if (!patient) {
    return (
      <div className="py-12 text-center text-xs text-[#7A847E]">
        <p>Patient record not found.</p>
        <button
          onClick={onBack}
          className="mt-3 text-[#7B1E34] underline cursor-pointer"
        >
          Return to Patients list
        </button>
      </div>
    );
  }

  const timelineEvents = getPatientTimeline(patient.id);
  const birthYear = patient.dateOfBirth ? new Date(patient.dateOfBirth).getFullYear() : 1985;
  const age = new Date().getFullYear() - birthYear;

  const toggleTimelineExpand = (id: string) => {
    setExpandedTimelineId(expandedTimelineId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[#525C56] hover:text-[#141213] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients Database</span>
        </button>

        {(currentUser.role === 'doctor' || currentUser.role === 'assistant') && (
          <button
            onClick={() => onLaunchConsultation(patient.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Launch Consultation</span>
          </button>
        )}
      </div>

      {/* Patient Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5DDD1] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <PatientAvatar name={`${patient.firstName} ${patient.lastName}`} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
                  {patient.firstName} {patient.lastName}
                </h1>
                <span className="font-mono text-xs font-medium text-[#7B1E34] bg-[#FDF4F6] px-2 py-0.5 rounded border border-[#F2D5DC]">
                  {patient.code}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    patient.status === 'Active'
                      ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                      : 'bg-amber-50 text-amber-800'
                  }`}
                >
                  {patient.status}
                </span>
              </div>

              <div className="text-xs text-[#6B756F] flex flex-wrap items-center gap-3 mt-1">
                <span>{age} Years ({patient.dateOfBirth})</span>
                <span aria-hidden="true">·</span>
                <span>Gender: {patient.gender}</span>
                <span aria-hidden="true">·</span>
                <span>Blood: <strong className="text-[#1C221F]">{patient.bloodGroup}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Registered: {patient.registeredAt}</span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Emergency */}
          <div className="text-xs text-[#525C56] space-y-1 md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-[#EAE3D6]">
            <div className="font-mono font-medium text-[#1C221F]">
              {patient.phone}
            </div>
            <div className="text-[#6B756F]">{patient.email}</div>
            {patient.emergencyContact?.name && (
              <div className="text-[11px] text-[#7A847E]">
                Emergency: {patient.emergencyContact.name} ({patient.emergencyContact.relation}) · {patient.emergencyContact.phone}
              </div>
            )}
          </div>
        </div>

        {/* Immediate Clinical Alert Strip (Allergies + Conditions) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#EAE3D6] text-xs">
          <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
            <span className="text-[10px] uppercase font-semibold text-[#7E8882] block mb-1">
              Drug Allergies
            </span>
            <div className="font-medium text-[#1C221F]">
              {patient.allergies.length > 0 ? (
                <span className="text-rose-700">{patient.allergies.join(', ')}</span>
              ) : (
                <span className="text-[#646E68]">NKDA</span>
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
            <span className="text-[10px] uppercase font-semibold text-[#7E8882] block mb-1">
              Current Medications
            </span>
            <div className="font-medium text-[#1C221F] truncate">
              {patient.currentMedications.length > 0
                ? patient.currentMedications.join(' · ')
                : 'None documented'}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5]">
            <span className="text-[10px] uppercase font-semibold text-[#7E8882] block mb-1">
              Next Follow-Up
            </span>
            <div className="font-medium text-[#7B1E34] font-mono">
              {patient.nextFollowupAt ? (
                <span>{patient.nextFollowupAt}</span>
              ) : (
                <span className="text-[#7A847E]">Not scheduled</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE3D6] text-xs font-medium">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'timeline'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Patient Timeline (Core)</span>
          <span className="font-mono text-[10px] bg-[#EAE2D5] px-1.5 py-0.2 rounded">
            {timelineEvents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('clinical')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'clinical'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Medical History & Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'prescriptions'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Prescriptions</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Lab Reports</span>
        </button>
      </div>

      {/* TAB 1: CHRONOLOGICAL MEDICAL TIMELINE (CORE FEATURE) */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="text-xs text-[#6B756F]">
            Chronological clinical continuum — every consultation, lab result, prescription, and visit in sequence.
          </div>

          {timelineEvents.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-[#EAE3D6] text-xs text-[#7A847E]">
              No clinical events recorded yet for this patient.
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#DCD3C5] space-y-6">
              {timelineEvents.map((evt) => {
                const isExpanded = expandedTimelineId === evt.id;

                const categoryStyles = {
                  Consultation: {
                    badge: 'bg-[#FDF4F6] text-[#7B1E34] border-[#F2D5DC]',
                    icon: Stethoscope,
                    bullet: 'bg-[#7B1E34]',
                  },
                  'Lab Report': {
                    badge: 'bg-amber-50 text-amber-900 border-amber-200',
                    icon: Activity,
                    bullet: 'bg-[#C27803]',
                  },
                  Prescription: {
                    badge: 'bg-blue-50 text-blue-900 border-blue-200',
                    icon: FileText,
                    bullet: 'bg-[#2563EB]',
                  },
                  Appointment: {
                    badge: 'bg-slate-50 text-slate-800 border-slate-200',
                    icon: Calendar,
                    bullet: 'bg-[#64748B]',
                  },
                  Note: {
                    badge: 'bg-stone-50 text-stone-800 border-stone-200',
                    icon: FileText,
                    bullet: 'bg-[#78716C]',
                  },
                }[evt.category] || {
                  badge: 'bg-gray-50 text-gray-800 border-gray-200',
                  icon: Clock,
                  bullet: 'bg-gray-600',
                };

                const IconComponent = categoryStyles.icon;

                return (
                  <div key={evt.id} className="relative group">
                    {/* Timeline Node Bullet on the left line */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#FAF8F5] ${categoryStyles.bullet}`}
                    />

                    {/* Timeline Card */}
                    <div className="bg-white p-5 rounded-xl border border-[#E5DDD1] shadow-2xs hover:border-[#D0C5B5] transition-all space-y-3">
                      {/* Top Row: Date, Category badge, Title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1C221F]">
                            {new Date(evt.date).toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }).toUpperCase()}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-medium border ${categoryStyles.badge}`}
                          >
                            {evt.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {evt.category === 'Prescription' && evt.linkId && (
                            <button
                              onClick={() => {
                                const rx = prescriptions.find((r) => r.id === evt.linkId);
                                if (rx) setSelectedRx(rx);
                              }}
                              className="text-[11px] text-[#7B1E34] hover:underline font-medium flex items-center gap-1"
                            >
                              <Printer className="w-3 h-3" />
                              <span>View Rx</span>
                            </button>
                          )}

                          {evt.category === 'Lab Report' && evt.linkId && (
                            <button
                              onClick={() => onReviewReport(evt.linkId!)}
                              className="text-[11px] text-[#7B1E34] hover:underline font-medium"
                            >
                              Open Report →
                            </button>
                          )}

                          <button
                            onClick={() => toggleTimelineExpand(evt.id)}
                            className="p-1 text-[#838D87] hover:text-[#141213] rounded cursor-pointer"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-sm font-semibold text-[#141213]">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-[#5B655F] mt-0.5">
                          {evt.subtitle}
                        </p>
                      </div>

                      {/* Expandable Deep Clinical Snapshot */}
                      {isExpanded && evt.details && (
                        <div className="pt-3 border-t border-[#EAE3D6] space-y-2 text-xs text-[#3D4741] bg-[#FAF8F5] p-3 rounded-lg">
                          {/* Symptoms */}
                          {evt.details.symptoms && evt.details.symptoms.length > 0 && (
                            <div>
                              <span className="font-semibold text-[#66706A]">Symptoms: </span>
                              <span>{evt.details.symptoms.join(', ')}</span>
                            </div>
                          )}

                          {/* Vitals */}
                          {evt.details.vitals && (
                            <div className="flex items-center gap-3 text-[11px] font-mono bg-white p-2 rounded border border-[#E0D8CB]">
                              <span>BP: {evt.details.vitals.bloodPressureSys}/{evt.details.vitals.bloodPressureDia} mmHg</span>
                              <span>·</span>
                              <span>HR: {evt.details.vitals.heartRateBpm} bpm</span>
                              <span>·</span>
                              <span>BMI: {evt.details.vitals.bmi}</span>
                            </div>
                          )}

                          {/* Assessment */}
                          {evt.details.assessment && (
                            <div>
                              <span className="font-semibold text-[#66706A]">Clinical Assessment: </span>
                              <p className="text-[#202723] mt-0.5 leading-relaxed">
                                {evt.details.assessment}
                              </p>
                            </div>
                          )}

                          {/* Prescriptions */}
                          {evt.details.prescriptions && evt.details.prescriptions.length > 0 && (
                            <div>
                              <span className="font-semibold text-[#66706A]">Prescriptions Issued: </span>
                              <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                                {evt.details.prescriptions.map((p: any, i: number) => (
                                  <li key={i}>
                                    {p.medicineName} ({p.strength}) — {p.dosage}, {p.frequency}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Investigations */}
                          {evt.details.investigations && evt.details.investigations.length > 0 && (
                            <div>
                              <span className="font-semibold text-[#66706A]">Investigations: </span>
                              <span>{evt.details.investigations.join(', ')}</span>
                            </div>
                          )}

                          {/* Lab Report Findings */}
                          {evt.details.findings && (
                            <div>
                              <span className="font-semibold text-[#66706A]">Biomarker Findings: </span>
                              <p className="font-mono text-[11px] text-[#1F2622] mt-0.5">
                                {evt.details.findings}
                              </p>
                            </div>
                          )}

                          {/* Doctor Instructions */}
                          {evt.details.instructions && (
                            <div className="pt-1">
                              <span className="font-semibold text-[#7B1E34]">Physician Advice: </span>
                              <span className="italic">{evt.details.instructions}</span>
                            </div>
                          )}

                          {/* Follow-up */}
                          {evt.details.followupDate && (
                            <div className="text-[11px] text-[#7B1E34] font-medium">
                              Scheduled Follow-up: {evt.details.followupDate}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MEDICAL HISTORY & PROFILE */}
      {activeTab === 'clinical' && (
        <div className="bg-white p-6 rounded-2xl border border-[#E5DDD1] shadow-2xs space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
            <h3 className="text-base font-editorial font-semibold text-[#141213]">
              Comprehensive Medical Baseline
            </h3>
            <span className="text-[11px] text-[#7A847E]">
              Last updated: {patient.lastVisitAt || patient.registeredAt}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-[#2F3732] uppercase tracking-wider text-[11px]">
                Past Medical Conditions
              </h4>
              <ul className="space-y-1 list-disc list-inside text-[#4A544E]">
                {patient.pastConditions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#2F3732] uppercase tracking-wider text-[11px]">
                Past Surgical & Procedural History
              </h4>
              <ul className="space-y-1 list-disc list-inside text-[#4A544E]">
                {patient.pastProcedures.length > 0 ? (
                  patient.pastProcedures.map((p, i) => <li key={i}>{p}</li>)
                ) : (
                  <li className="text-[#848F89] list-none">No past surgical procedures recorded.</li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#2F3732] uppercase tracking-wider text-[11px]">
                Hereditary & Family Medical History
              </h4>
              <ul className="space-y-1 list-disc list-inside text-[#4A544E]">
                {patient.familyHistory.length > 0 ? (
                  patient.familyHistory.map((f, i) => <li key={i}>{f}</li>)
                ) : (
                  <li className="text-[#848F89] list-none">Non-contributory</li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#2F3732] uppercase tracking-wider text-[11px]">
                General Physician Notes & Lifestyle
              </h4>
              <p className="text-[#4A544E] leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E1D5]">
                {patient.notes || 'No general notes recorded.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-editorial font-semibold text-[#141213]">
              Prescriptions on File
            </h3>
            <button
              onClick={() => onLaunchConsultation(patient.id)}
              className="text-xs font-medium text-[#7B1E34] hover:underline"
            >
              + Issue New Prescription
            </button>
          </div>

          {prescriptions.filter((r) => r.patientId === patient.id).length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-[#EAE3D6] text-xs text-[#7A847E]">
              No digital prescriptions issued for this patient.
            </div>
          ) : (
            <div className="space-y-3">
              {prescriptions
                .filter((r) => r.patientId === patient.id)
                .map((rx) => (
                  <div
                    key={rx.id}
                    className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#141213]">
                          {rx.prescriptionNumber}
                        </span>
                        <span className="text-xs font-mono text-[#6A746E]">
                          · {rx.date}
                        </span>
                      </div>
                      <div className="text-xs text-[#4F5953] mt-1">
                        {rx.items.map((i) => `${i.medicineName} (${i.strength})`).join(' · ')}
                      </div>
                      {rx.followupDate && (
                        <div className="text-[11px] text-[#7B1E34] mt-0.5">
                          Follow-up: {rx.followupDate}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedRx(rx)}
                      className="px-4 py-1.5 text-xs font-medium text-[#7B1E34] bg-[#FDF4F6] hover:bg-[#F9E8EC] rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Document</span>
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: LAB REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-editorial font-semibold text-[#141213]">
              Diagnostic & Pathology Reports
            </h3>
          </div>

          {labReports.filter((r) => r.patientId === patient.id).length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-[#EAE3D6] text-xs text-[#7A847E]">
              No laboratory reports uploaded for this patient.
            </div>
          ) : (
            <div className="space-y-3">
              {labReports
                .filter((r) => r.patientId === patient.id)
                .map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#141213]">
                          {rep.testName}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            rep.status === 'Reviewed'
                              ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {rep.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#6B756F]">
                        Date: {rep.date} · Category: {rep.category}
                      </div>
                      {rep.keyFindings && (
                        <div className="text-[11px] font-mono text-[#333C37]">
                          {rep.keyFindings}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onReviewReport(rep.id)}
                      className="px-4 py-1.5 text-xs font-medium text-[#141213] bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-[#DDD5C7] rounded-lg transition-colors shrink-0"
                    >
                      {rep.status === 'Pending Review' ? 'Review Now' : 'View Findings'}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Prescription Viewer Modal */}
      {selectedRx && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8">
            <PrintablePrescription
              prescription={selectedRx}
              clinicInfo={clinicInfo}
              onClose={() => setSelectedRx(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
