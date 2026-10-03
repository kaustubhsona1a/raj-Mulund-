import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PatientAvatar } from '../common/VisualAvatar';
import {
  Calendar,
  Clock,
  AlertCircle,
  FileCheck,
  CreditCard,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface DoctorDashboardProps {
  onSelectPatient: (patientId: string) => void;
  onLaunchConsultation: (patientId: string, aptId?: string) => void;
  onNavigateTab: (tab: string) => void;
  onReviewReport: (reportId: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  onSelectPatient,
  onLaunchConsultation,
  onNavigateTab,
  onReviewReport,
}) => {
  const {
    currentUser,
    appointments,
    labReports,
    patients,
    invoices,
    tasks,
    toggleTask,
  } = useClinic();

  const todayStr = '2026-10-03';
  const todayFormatted = 'Saturday, 3 October 2026';

  // 1. Summary Metrics
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingReports = labReports.filter((r) => r.status === 'Pending Review');
  const followupsDue = patients.filter((p) => p.nextFollowupAt === todayStr);
  const pendingInvoices = invoices.filter((i) => i.status === 'Pending' || i.status === 'Overdue');
  const pendingInvoiceAmount = pendingInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  // 2. Attention Required Items
  const attentionItems: {
    id: string;
    type: 'report' | 'followup' | 'noshow' | 'task';
    title: string;
    subtitle: string;
    actionLabel: string;
    onClick: () => void;
  }[] = [];

  // Follow-ups due today
  followupsDue.forEach((p) => {
    attentionItems.push({
      id: `att-fu-${p.id}`,
      type: 'followup',
      title: `Follow-up due: ${p.firstName} ${p.lastName}`,
      subtitle: `${p.currentMedications.length} active medications · ${p.pastConditions[0] || 'Care Plan'}`,
      actionLabel: 'Open Patient',
      onClick: () => onSelectPatient(p.id),
    });
  });

  // Unreviewed reports
  pendingReports.forEach((r) => {
    attentionItems.push({
      id: `att-rep-${r.id}`,
      type: 'report',
      title: `Lab report awaiting review: ${r.patientName}`,
      subtitle: `${r.testName} · Uploaded ${r.date}`,
      actionLabel: 'Review Report',
      onClick: () => onReviewReport(r.id),
    });
  });

  // Urgent / High priority tasks
  tasks
    .filter((t) => !t.completed && (t.priority === 'High' || t.priority === 'Urgent'))
    .forEach((t) => {
      attentionItems.push({
        id: `att-task-${t.id}`,
        type: 'task',
        title: t.title,
        subtitle: `Due ${t.dueDate}${t.patientName ? ` · Patient: ${t.patientName}` : ''}`,
        actionLabel: 'Mark Done',
        onClick: () => toggleTask(t.id),
      });
    });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#EAE2D8] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#141213]">
            Good morning, {currentUser.name}
          </h1>
          <p className="text-xs text-[#554D45] mt-0.5 font-sans">
            Today: <span className="font-semibold text-[#141213]">{todayFormatted}</span> · Raj Hospital Clinical Station
          </p>
        </div>

        <div className="text-xs text-[#554D45] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#7B1E34] animate-pulse" />
          <span>Status: <strong className="text-[#7B1E34]">Active Consultation Session</strong></span>
        </div>
      </div>

      {/* 4 Focused Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Appointments */}
        <div
          onClick={() => onNavigateTab('appointments')}
          className="p-5 rounded-2xl bg-white border border-[#EAE2D8] shadow-2xs hover:border-[#7B1E34]/35 hover-lift transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-[#554D45]">
            <span className="text-xs font-medium">Today's Appointments</span>
            <Calendar className="w-4 h-4 text-[#7B1E34] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#141213] tabular-nums group-hover:text-[#7B1E34] transition-colors">
            {todayAppointments.length}
          </div>
          <p className="text-[11px] text-[#82787C]">
            {todayAppointments.filter((a) => a.status === 'Completed').length} completed today
          </p>
        </div>

        {/* Follow-ups Due */}
        <div
          onClick={() => onNavigateTab('patients')}
          className="p-5 rounded-2xl bg-white border border-[#EAE2D8] shadow-2xs hover:border-[#7B1E34]/35 hover-lift transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-[#554D45]">
            <span className="text-xs font-medium">Follow-ups Due</span>
            <Clock className="w-4 h-4 text-[#7B1E34] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#141213] tabular-nums group-hover:text-[#7B1E34] transition-colors">
            {followupsDue.length}
          </div>
          <p className="text-[11px] text-[#82787C]">
            Scheduled for clinical re-check
          </p>
        </div>

        {/* Reports to Review */}
        <div
          onClick={() => onNavigateTab('reports')}
          className="p-5 rounded-2xl bg-white border border-[#EAE2D8] shadow-2xs hover:border-[#7B1E34]/35 hover-lift transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-[#554D45]">
            <span className="text-xs font-medium">Reports to Review</span>
            <Activity className="w-4 h-4 text-[#B03251] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#141213] tabular-nums group-hover:text-[#7B1E34] transition-colors">
            {pendingReports.length}
          </div>
          <p className="text-[11px] text-[#B03251] font-medium">
            Requires physician sign-off
          </p>
        </div>

        {/* Pending Invoices */}
        <div
          onClick={() => onNavigateTab('billing')}
          className="p-5 rounded-2xl bg-white border border-[#EAE2D8] shadow-2xs hover:border-[#7B1E34]/35 hover-lift transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-[#554D45]">
            <span className="text-xs font-medium">Pending Invoices</span>
            <CreditCard className="w-4 h-4 text-[#7B1E34] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#141213] tabular-nums group-hover:text-[#7B1E34] transition-colors">
            ₹{pendingInvoiceAmount.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-[#82787C]">
            {pendingInvoices.length} outstanding invoice(s)
          </p>
        </div>
      </div>

      {/* Main Dual Grid: Today's Schedule + Attention Required */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* TODAY'S SCHEDULE (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display uppercase tracking-wider text-xs font-bold text-[#141213]">
              Today's Schedule ({todayAppointments.length})
            </h2>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs text-[#7B1E34] hover:underline font-semibold"
            >
              Full Calendar →
            </button>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EAE2D8] text-xs text-[#82787C]">
              Your schedule is clear for today.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#EAE2D8] divide-y divide-[#F2ECE3] shadow-2xs overflow-hidden">
              {todayAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 hover:bg-[#FDF4F6]/50 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-semibold text-[#7B1E34] bg-[#FDF4F6] border border-[#F2D5DC] px-2.5 py-1 rounded-md shrink-0">
                        {apt.time}
                      </span>

                      <div className="min-w-0">
                        <button
                          onClick={() => onSelectPatient(apt.patientId)}
                          className="font-semibold text-xs text-[#141213] hover:text-[#7B1E34] text-left truncate block cursor-pointer"
                        >
                          {apt.patientName}
                        </button>
                        <div className="text-[11px] text-[#554D45] truncate">
                          {apt.type} · {apt.reason}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          apt.status === 'Completed'
                            ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                            : 'bg-[#F5EFEB] text-[#332D28]'
                        }`}
                      >
                        {apt.status}
                      </span>

                      {apt.status !== 'Completed' && (
                        <button
                          onClick={() => onLaunchConsultation(apt.patientId, apt.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Start Clinical Consultation"
                        >
                          <Stethoscope className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Consult</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* ATTENTION REQUIRED (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display uppercase tracking-wider text-xs font-bold text-[#141213] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#7B1E34]" />
              <span>Attention Required ({attentionItems.length})</span>
            </h2>
          </div>

          {attentionItems.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EAE2D8] text-xs text-[#82787C]">
              No urgent items requiring attention.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#EAE2D8] divide-y divide-[#F2ECE3] shadow-2xs overflow-hidden">
              {attentionItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={item.onClick}
                  className="p-3.5 hover:bg-[#FDF4F6]/50 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-xs font-semibold text-[#141213] group-hover:text-[#7B1E34] transition-colors truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#554D45] truncate">
                      {item.subtitle}
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-[#7B1E34] group-hover:underline shrink-0 flex items-center gap-0.5">
                    <span>{item.actionLabel}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
