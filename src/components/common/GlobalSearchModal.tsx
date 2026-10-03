import React, { useState, useMemo } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Search, User, Calendar, FileText, Activity, ArrowRight, X } from 'lucide-react';

interface GlobalSearchModalProps {
  onSelectPatient: (patientId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  onSelectPatient,
  onNavigateTab,
}) => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    patients,
    appointments,
    labReports,
    prescriptions,
  } = useClinic();

  const [query, setQuery] = useState('');

  const quickFilters = [
    { label: 'Follow-ups due today', q: 'follow-up' },
    { label: 'Unreviewed reports', q: 'pending' },
    { label: 'Appointments today', q: 'today' },
  ];

  const results = useMemo(() => {
    if (!query.trim()) return { patients: [], appointments: [], reports: [], prescriptions: [] };

    const lower = query.toLowerCase().trim();

    const matchedPatients = patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(lower) ||
        p.lastName.toLowerCase().includes(lower) ||
        p.phone.includes(lower) ||
        p.code.toLowerCase().includes(lower) ||
        p.email.toLowerCase().includes(lower)
    );

    const matchedAppointments = appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(lower) ||
        a.bookingReference.toLowerCase().includes(lower) ||
        a.reason.toLowerCase().includes(lower) ||
        (lower === 'today' && a.date === '2026-10-03') ||
        (lower === 'follow-up' && a.type.toLowerCase().includes('follow'))
    );

    const matchedReports = labReports.filter(
      (r) =>
        r.testName.toLowerCase().includes(lower) ||
        r.patientName.toLowerCase().includes(lower) ||
        (lower === 'pending' && r.status === 'Pending Review')
    );

    const matchedPrescriptions = prescriptions.filter(
      (rx) =>
        rx.prescriptionNumber.toLowerCase().includes(lower) ||
        rx.patientName.toLowerCase().includes(lower) ||
        rx.items.some((i) => i.medicineName.toLowerCase().includes(lower))
    );

    return {
      patients: matchedPatients.slice(0, 4),
      appointments: matchedAppointments.slice(0, 4),
      reports: matchedReports.slice(0, 4),
      prescriptions: matchedPrescriptions.slice(0, 4),
    };
  }, [query, patients, appointments, labReports, prescriptions]);

  if (!isSearchOpen) return null;

  const totalMatches =
    results.patients.length +
    results.appointments.length +
    results.reports.length +
    results.prescriptions.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-xl shadow-2xl border border-[#DDD5C8] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8E1D5] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#7B1E34]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, phone, patient IDs, reports, Rx, or 'unreviewed'..."
            className="w-full bg-transparent text-sm text-[#1C221F] placeholder-[#808983] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#808983] hover:text-[#1C221F]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-[#7A837E] hover:text-[#1C221F] px-2 py-1 rounded bg-[#EAE3D6] font-mono"
          >
            ESC
          </button>
        </div>

        {/* Quick query chips */}
        <div className="px-4 py-2.5 bg-[#F5F0E8] border-b border-[#E8E1D5] flex items-center gap-2 text-xs text-[#5D6660]">
          <span className="text-[11px] uppercase tracking-wider font-medium text-[#7D8681]">
            Quick:
          </span>
          {quickFilters.map((qf, i) => (
            <button
              key={i}
              onClick={() => setQuery(qf.q)}
              className="px-2.5 py-1 rounded bg-white hover:bg-[#EBE4D8] border border-[#DDD5C7] text-[#2C3330] transition-colors"
            >
              {qf.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-xs text-[#7F8882]">
              Type a patient name, phone number, medical test, or natural query like{' '}
              <span className="font-mono text-[#7B1E34]">"unreviewed"</span>
            </div>
          )}

          {query.trim() && totalMatches === 0 && (
            <div className="py-8 text-center text-xs text-[#7F8882]">
              No records found matching "{query}".
            </div>
          )}

          {/* Patients Section */}
          {results.patients.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#69726D] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Patients</span>
              </div>
              <div className="space-y-1">
                {results.patients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPatient(p.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F6F2EC] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#1C221F] flex items-center gap-2">
                        <span>
                          {p.firstName} {p.lastName}
                        </span>
                        <span className="font-mono text-[10px] text-[#7B1E34] bg-[#FDF4F6] px-1.5 py-0.5 rounded">
                          {p.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#69726D]">
                        {p.phone} · DOB: {p.dateOfBirth} · Status: {p.status}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A2ABA5] group-hover:text-[#7B1E34] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Appointments Section */}
          {results.appointments.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#69726D] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Appointments</span>
              </div>
              <div className="space-y-1">
                {results.appointments.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onNavigateTab('appointments');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F6F2EC] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#1C221F]">
                        {a.patientName} — {a.type}
                      </div>
                      <div className="text-[11px] text-[#69726D]">
                        {a.date} at {a.time} · {a.reason} · Ref: {a.bookingReference}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#7B1E34] font-medium bg-[#FDF4F6] px-2 py-0.5 rounded">
                      {a.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reports Section */}
          {results.reports.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#69726D] mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Lab Reports</span>
              </div>
              <div className="space-y-1">
                {results.reports.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onNavigateTab('reports');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F6F2EC] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#1C221F]">
                        {r.testName}
                      </div>
                      <div className="text-[11px] text-[#69726D]">
                        Patient: {r.patientName} · {r.date}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        r.status === 'Pending Review'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                      }`}
                    >
                      {r.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prescriptions Section */}
          {results.prescriptions.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#69726D] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Prescriptions</span>
              </div>
              <div className="space-y-1">
                {results.prescriptions.map((rx) => (
                  <button
                    key={rx.id}
                    onClick={() => {
                      onNavigateTab('prescriptions');
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F6F2EC] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#1C221F]">
                        {rx.prescriptionNumber} — {rx.patientName}
                      </div>
                      <div className="text-[11px] text-[#69726D]">
                        {rx.items.map((i) => i.medicineName).join(', ')}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#808983]">{rx.date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
