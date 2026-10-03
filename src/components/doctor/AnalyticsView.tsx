import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  BarChart2,
  TrendingUp,
  Users,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { appointments, consultations, patients, invoices } = useClinic();

  const totalApts = appointments.length;
  const completedApts = appointments.filter((a) => a.status === 'Completed').length;
  const noShows = appointments.filter((a) => a.status === 'No-show').length;
  const completionRate = totalApts > 0 ? Math.round((completedApts / totalApts) * 100) : 0;
  const noShowRate = totalApts > 0 ? Math.round((noShows / totalApts) * 100) : 0;

  const totalRevenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const pendingRevenue = invoices
    .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  // New vs Returning breakdown
  const newPatientsCount = patients.filter((p) => p.registeredAt.startsWith('2026-10')).length;
  const returningPatientsCount = patients.length - newPatientsCount;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="border-b border-[#EAE3D6] pb-5">
        <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
          Practice Analytics & Performance
        </h1>
        <p className="text-xs text-[#5D6761] mt-0.5">
          Restrained, longitudinal metrics for clinical throughput and practice health
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">Consultation Adherence</span>
          <div className="text-3xl font-editorial font-semibold text-[#141213] tabular-nums">
            {completionRate}%
          </div>
          <p className="text-[11px] text-[#717B75]">
            {completedApts} of {totalApts} appointments completed
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">No-Show Incident Rate</span>
          <div className="text-3xl font-editorial font-semibold text-[#141213] tabular-nums">
            {noShowRate}%
          </div>
          <p className="text-[11px] text-[#717B75]">
            Target threshold &lt; 5%
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">Realized Revenue</span>
          <div className="text-3xl font-editorial font-semibold text-[#141213] tabular-nums">
            ${totalRevenue.toFixed(0)}
          </div>
          <p className="text-[11px] text-[#7B1E34]">
            ${pendingRevenue.toFixed(0)} pending in ledger
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">Active Patient Roster</span>
          <div className="text-3xl font-editorial font-semibold text-[#141213] tabular-nums">
            {patients.length}
          </div>
          <p className="text-[11px] text-[#717B75]">
            {newPatientsCount} new this month
          </p>
        </div>
      </div>

      {/* Scannable Breakdown Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Composition */}
        <div className="bg-white p-6 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <h2 className="text-base font-editorial font-semibold text-[#141213]">
            Patient Cohort Distribution
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[#555F59] mb-1">
                <span>Active Longitudinal Patients</span>
                <span className="font-mono font-medium">{returningPatientsCount} (80%)</span>
              </div>
              <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                <div className="bg-[#7B1E34] h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#555F59] mb-1">
                <span>New Patient Intakes (October)</span>
                <span className="font-mono font-medium">{newPatientsCount} (20%)</span>
              </div>
              <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                <div className="bg-[#5B8877] h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Modality Mix */}
        <div className="bg-white p-6 rounded-xl border border-[#E5DDD1] shadow-2xs space-y-4">
          <h2 className="text-base font-editorial font-semibold text-[#141213]">
            Consultation Modality Breakdown
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[#555F59] mb-1">
                <span>In-Person Consultation (Suite 4B)</span>
                <span className="font-mono font-medium">70%</span>
              </div>
              <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                <div className="bg-[#7B1E34] h-full rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#555F59] mb-1">
                <span>Telehealth Video Consultations</span>
                <span className="font-mono font-medium">30%</span>
              </div>
              <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                <div className="bg-[#7CA090] h-full rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
