import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PrintablePrescription } from '../common/PrintablePrescription';
import { Prescription } from '../../types';
import {
  Calendar,
  FileText,
  Activity,
  Printer,
  User,
  Shield,
  Search,
} from 'lucide-react';
import { AestheticHospitalBackground } from '../common/VisualAvatar';

interface PatientPortalViewProps {
  onBook: () => void;
}

export const PatientPortalView: React.FC<PatientPortalViewProps> = ({ onBook }) => {
  const {
    patients,
    appointments,
    prescriptions,
    labReports,
    clinicInfo,
  } = useClinic();

  const [lookupQuery, setLookupQuery] = useState('RH-4091'); // default to Rahul Mehta for instant demo
  const [activePatient, setActivePatient] = useState(patients[0]);
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupQuery.trim().toLowerCase();
    const matched = patients.find(
      (p) =>
        p.code.toLowerCase() === query ||
        p.email.toLowerCase() === query ||
        p.phone.includes(query) ||
        p.lastName.toLowerCase() === query
    );

    if (matched) {
      setActivePatient(matched);
    } else {
      const apt = appointments.find((a) => a.bookingReference.toLowerCase() === query);
      if (apt) {
        const p = patients.find((pat) => pat.id === apt.patientId);
        if (p) setActivePatient(p);
      }
    }
  };

  const patientAppointments = appointments.filter((a) => a.patientId === activePatient?.id);
  const patientPrescriptions = prescriptions.filter((rx) => rx.patientId === activePatient?.id);
  const patientReports = labReports.filter((r) => r.patientId === activePatient?.id);

  return (
    <div className="relative py-12 md:py-20 bg-[#FAF8F5]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FAF8F5]/92" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE2D8] pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7B1E34] font-bold">
              Raj Hospital Patient Portal
            </span>
            <h1 className="text-3xl font-editorial font-bold text-[#1F1B1D] mt-1">
              Your Orthopaedic Care & Surgical Records
            </h1>
            <p className="text-xs sm:text-sm text-[#554D51]">
              Instant access to your post-op protocols, imaging reviews, and digital prescriptions.
            </p>
          </div>

          {/* Quick Lookup Bar */}
          <form onSubmit={handleLookup} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Patient ID (e.g. RH-4091)"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
              className="px-3.5 py-2 text-xs bg-white border border-[#DDD3C5] rounded-xl text-[#1F1B1D] w-48 sm:w-56 outline-none focus:border-[#7B1E34] font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-2xs hover:shadow-sm cursor-pointer"
            >
              Verify
            </button>
          </form>
        </div>

        {/* Demo Patient Fast Switcher */}
        <div className="flex items-center gap-2 text-xs text-[#6B6165] overflow-x-auto pb-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#7B1E34]">
            Quick Records:
          </span>
          {patients.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePatient(p);
                setLookupQuery(p.code);
              }}
              className={`px-3 py-1 rounded-lg border text-xs transition-all whitespace-nowrap cursor-pointer ${
                activePatient?.id === p.id
                  ? 'bg-[#7B1E34] text-white border-[#7B1E34] font-semibold shadow-2xs'
                  : 'bg-white border-[#DDD3C5] text-[#332B2E] hover:bg-[#FDF4F6]'
              }`}
            >
              {p.firstName} {p.lastName} ({p.code})
            </button>
          ))}
        </div>

        {/* Patient Profile Banner */}
        {activePatient && (
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DDD3C5] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-lift">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FDF4F6] text-[#7B1E34] font-bold flex items-center justify-center text-sm font-mono border border-[#F2D5DC]">
                {activePatient.code}
              </div>
              <div>
                <h2 className="text-xl font-editorial font-bold text-[#1F1B1D]">
                  {activePatient.firstName} {activePatient.lastName}
                </h2>
                <div className="text-xs text-[#6B6165] flex items-center gap-2 mt-0.5">
                  <span>DOB: {activePatient.dateOfBirth}</span>
                  <span aria-hidden="true">·</span>
                  <span>Blood: <strong className="text-[#1F1B1D]">{activePatient.bloodGroup}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#7B1E34] font-semibold">{activePatient.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activePatient.nextFollowupAt && (
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#786E72] block">
                    Next Follow-up
                  </span>
                  <span className="text-xs font-bold text-[#7B1E34]">
                    {activePatient.nextFollowupAt}
                  </span>
                </div>
              )}
              <button
                onClick={onBook}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-2xs cursor-pointer burgundy-glow"
              >
                Schedule Follow-up
              </button>
            </div>
          </div>
        )}

        {/* Section 1: Upcoming Appointments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-editorial font-bold text-[#1F1B1D] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#7B1E34]" />
              <span>Hospital Appointments</span>
            </h3>
            <span className="text-xs text-[#71686C]">
              {patientAppointments.length} record(s)
            </span>
          </div>

          {patientAppointments.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EAE2D8] text-xs text-[#786E72]">
              No upcoming orthopaedic visits scheduled.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {patientAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl bg-white border border-[#DDD3C5] shadow-2xs space-y-3 hover-lift"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#1F1B1D]">
                        {apt.type}
                      </div>
                      <div className="text-xs text-[#7B1E34] font-semibold mt-0.5">
                        {apt.date} at {apt.time}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        apt.status === 'Confirmed' || apt.status === 'Completed'
                          ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#524B4E]">
                    <span className="font-semibold text-[#1F1B1D]">Clinical Indication:</span> {apt.reason}
                  </p>

                  <div className="pt-2 border-t border-[#EAE2D8] flex justify-between items-center text-[11px] text-[#71686C]">
                    <span className="font-mono">Ref: {apt.bookingReference}</span>
                    <span className="font-medium text-[#1F1B1D]">{clinicInfo.doctorName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Active Prescriptions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-editorial font-bold text-[#1F1B1D] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7B1E34]" />
              <span>Digital Orthopaedic Prescriptions</span>
            </h3>
            <span className="text-xs text-[#71686C]">
              {patientPrescriptions.length} issued
            </span>
          </div>

          {patientPrescriptions.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EAE2D8] text-xs text-[#786E72]">
              No prescriptions on file for this patient.
            </div>
          ) : (
            <div className="space-y-3">
              {patientPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-5 rounded-2xl bg-white border border-[#DDD3C5] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1F1B1D]">
                        Prescription {rx.prescriptionNumber}
                      </span>
                      <span className="text-xs text-[#786E72] font-mono">
                        · {rx.date}
                      </span>
                    </div>
                    <div className="text-xs text-[#4E4649]">
                      {rx.items.map((i) => `${i.medicineName} (${i.strength})`).join(' · ')}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRx(rx)}
                    className="px-4 py-2 text-xs font-semibold text-[#7B1E34] hover:text-[#541021] bg-[#FDF4F6] hover:bg-[#F9E8EC] border border-[#F2D5DC] rounded-xl transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View & Print Rx</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Diagnostic Imaging & Reports */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-editorial font-bold text-[#1F1B1D] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#7B1E34]" />
              <span>Radiology & Lab Reports</span>
            </h3>
            <span className="text-xs text-[#71686C]">
              {patientReports.length} uploaded
            </span>
          </div>

          {patientReports.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EAE2D8] text-xs text-[#786E72]">
              No radiology reports uploaded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {patientReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-5 rounded-2xl bg-white border border-[#DDD3C5] shadow-2xs space-y-2 hover-lift"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#1F1B1D]">
                        {rep.testName}
                      </div>
                      <div className="text-xs text-[#6B6165] mt-0.5">
                        Date: {rep.date} · Modality: {rep.category}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-md font-semibold ${
                        rep.status === 'Reviewed'
                          ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {rep.status}
                    </span>
                  </div>

                  {rep.keyFindings && (
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7DFD4] text-xs font-mono text-[#332B2E]">
                      {rep.keyFindings}
                    </div>
                  )}

                  {rep.summaryNotes && (
                    <p className="text-xs text-[#524A4E] italic font-editorial">
                      Surgeon Review: "{rep.summaryNotes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prescription Modal */}
      {selectedRx && (
        <div className="fixed inset-0 z-50 bg-[#141213]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
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
