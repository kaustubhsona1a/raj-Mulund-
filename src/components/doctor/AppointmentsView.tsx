import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Plus,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  X,
} from 'lucide-react';

interface AppointmentsViewProps {
  onSelectPatient: (patientId: string) => void;
  onLaunchConsultation: (patientId: string, appointmentId?: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  onSelectPatient,
  onLaunchConsultation,
}) => {
  const {
    appointments,
    updateAppointmentStatus,
    rescheduleAppointment,
    bookAppointment,
    patients,
  } = useClinic();

  const [viewMode, setViewMode] = useState<'day' | 'week' | 'list'>('day');
  const [selectedDate, setSelectedDate] = useState('2026-10-03');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Reschedule Modal State
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('2026-10-05');
  const [rescheduleTime, setRescheduleTime] = useState('11:00');

  // New Appointment Modal State
  const [showNewAptModal, setShowNewAptModal] = useState(false);
  const [newAptPatientId, setNewAptPatientId] = useState(patients[0]?.id || '');
  const [newAptDate, setNewAptDate] = useState('2026-10-05');
  const [newAptTime, setNewAptTime] = useState('09:30');
  const [newAptType, setNewAptType] = useState<any>('Follow-up');
  const [newAptReason, setNewAptReason] = useState('');

  const filteredAppointments = appointments.filter((a) => {
    const matchesDate = viewMode === 'day' ? a.date === selectedDate : true;
    const matchesStatus = filterStatus === 'All' ? true : a.status === filterStatus;
    return matchesDate && matchesStatus;
  });

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingApt) return;
    rescheduleAppointment(reschedulingApt.id, rescheduleDate, rescheduleTime);
    setReschedulingApt(null);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const p = patients.find((pat) => pat.id === newAptPatientId);
    if (!p) return;

    bookAppointment({
      patientId: p.id,
      patientName: `${p.firstName} ${p.lastName}`,
      patientEmail: p.email,
      patientPhone: p.phone,
      date: newAptDate,
      time: newAptTime,
      type: newAptType,
      reason: newAptReason || 'Routine consultation',
    });

    setShowNewAptModal(false);
    setNewAptReason('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Appointment Management
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            Real-time practice schedule and patient queue
          </p>
        </div>

        <button
          onClick={() => setShowNewAptModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        {/* Date Navigator */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none font-mono"
          />
          <button
            onClick={() => setSelectedDate('2026-10-03')}
            className="px-2.5 py-1.5 text-xs font-medium text-[#7B1E34] bg-[#FDF4F6] hover:bg-[#DDE8E2] rounded-lg transition-colors"
          >
            Today
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#DDD5C7]">
          {(['day', 'list'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer ${
                viewMode === mode
                  ? 'bg-white text-[#141213] shadow-2xs font-semibold'
                  : 'text-[#646E68] hover:text-[#141213]'
              }`}
            >
              {mode === 'day' ? 'Day Schedule' : 'All Appointments'}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[11px] uppercase font-semibold text-[#7D8781]">
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD5C7] text-xs py-1.5 px-2.5 rounded-md outline-none text-[#1C221F]"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="No-show">No-show</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List / Grid */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            No appointments scheduled for this date or status.
          </div>
        ) : (
          <div className="divide-y divide-[#EFEAE1]">
            {filteredAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 sm:p-5 hover:bg-[#FAF9F6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="font-mono text-xs font-semibold text-[#7B1E34] bg-[#FDF4F6] px-3 py-1.5 rounded-lg border border-[#F2D5DC] text-center shrink-0">
                      <div>{apt.time}</div>
                      <div className="text-[10px] text-[#55635C] font-normal">{apt.date}</div>
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectPatient(apt.patientId)}
                          className="font-semibold text-sm text-[#1C221F] hover:text-[#7B1E34] transition-colors text-left"
                        >
                          {apt.patientName}
                        </button>
                        <span className="font-mono text-[10px] text-[#717A74]">
                          {apt.bookingReference}
                        </span>
                      </div>

                      <div className="text-xs text-[#5D6660]">
                        <span className="font-medium text-[#2E3732]">{apt.type}:</span>{' '}
                        {apt.reason}
                      </div>

                      <div className="text-[11px] text-[#78827C] flex items-center gap-3">
                        <span className="font-mono">{apt.patientPhone}</span>
                        <span aria-hidden="true">·</span>
                        <span>{apt.patientEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                    {/* Status Pill */}
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-md font-medium ${
                        apt.status === 'Completed'
                          ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                          : apt.status === 'Confirmed'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : apt.status === 'No-show'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-[#F2ECE1] text-[#3D4540]'
                      }`}
                    >
                      {apt.status}
                    </span>

                    {/* Launch Consultation */}
                    {apt.status !== 'Completed' && (
                      <button
                        onClick={() => onLaunchConsultation(apt.patientId, apt.id)}
                        className="px-3 py-1 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>Consult</span>
                      </button>
                    )}

                    {/* Reschedule */}
                    <button
                      onClick={() => {
                        setReschedulingApt(apt);
                        setRescheduleDate(apt.date);
                        setRescheduleTime(apt.time);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-[#38413C] bg-[#FAF8F5] hover:bg-[#EFE9DF] border border-[#DDD5C7] rounded-md transition-colors"
                      title="Reschedule appointment"
                    >
                      Reschedule
                    </button>

                    {/* No-Show marker */}
                    {apt.status !== 'Completed' && apt.status !== 'No-show' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'No-show')}
                        className="px-2 py-1 text-xs text-[#8A4A4A] hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-md transition-colors"
                        title="Mark patient as No-show"
                      >
                        No-show
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Reschedule Dialog Modal */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <h3 className="text-base font-editorial font-semibold text-[#141213]">
                Reschedule Appointment
              </h3>
              <button
                onClick={() => setReschedulingApt(null)}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5D6761]">
              Rescheduling for <strong className="text-[#1C221F]">{reschedulingApt.patientName}</strong> ({reschedulingApt.type}).
            </p>

            <form onSubmit={handleConfirmReschedule} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  min="2026-10-03"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  New Time Slot
                </label>
                <input
                  type="time"
                  required
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setReschedulingApt(null)}
                  className="px-3 py-1.5 text-xs text-[#5A645E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Save Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewAptModal && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <h3 className="text-base font-editorial font-semibold text-[#141213]">
                Book Appointment
              </h3>
              <button
                onClick={() => setShowNewAptModal(false)}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  Select Patient *
                </label>
                <select
                  value={newAptPatientId}
                  onChange={(e) => setNewAptPatientId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3C4540] block mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    min="2026-10-03"
                    required
                    value={newAptDate}
                    onChange={(e) => setNewAptDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#3C4540] block mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newAptTime}
                    onChange={(e) => setNewAptTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  Consultation Type
                </label>
                <select
                  value={newAptType}
                  onChange={(e: any) => setNewAptType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                >
                  <option value="New Consultation">New Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="In-person">In-person</option>
                  <option value="Video Consultation">Video Consultation</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#3C4540] block mb-1">
                  Reason for Consultation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up of glycemic control"
                  value={newAptReason}
                  onChange={(e) => setNewAptReason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setShowNewAptModal(false)}
                  className="px-3 py-1.5 text-xs text-[#5A645E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
