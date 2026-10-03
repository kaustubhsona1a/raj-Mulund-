import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Settings,
  Shield,
  Clock,
  RotateCcw,
  CheckCircle2,
  Lock,
  User,
  Save,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    clinicInfo,
    updateClinicInfo,
    auditLogs,
    resetDemoData,
    currentUser,
    availableStaff,
  } = useClinic();

  const [activeTab, setActiveTab] = useState<'practice' | 'staff' | 'audit'>('practice');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    name: clinicInfo.name,
    tagline: clinicInfo.tagline,
    doctorName: clinicInfo.doctorName,
    doctorTitle: clinicInfo.doctorTitle,
    doctorCredentials: clinicInfo.doctorCredentials,
    specialization: clinicInfo.specialization,
    phone: clinicInfo.phone,
    emergencyPhone: clinicInfo.emergencyPhone,
    email: clinicInfo.email,
    consultationFee: clinicInfo.consultationFee,
    followupFee: clinicInfo.followupFee,
  });

  const handleSavePractice = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicInfo(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="border-b border-[#EAE3D6] pb-5">
        <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
          Practice Settings & Compliance Audit
        </h1>
        <p className="text-xs text-[#5D6761] mt-0.5">
          Configuration, staff role security, and immutable clinical audit logs
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAE3D6] text-xs font-medium">
        <button
          onClick={() => setActiveTab('practice')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'practice'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          Practice Profile & Fees
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'staff'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          Staff Roles & Access Control (RBAC)
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'border-[#7B1E34] text-[#141213] font-semibold'
              : 'border-transparent text-[#616B65] hover:text-[#141213]'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Clinical Audit Log</span>
          <span className="font-mono text-[10px] bg-[#EAE2D5] px-1.5 py-0.2 rounded">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* TAB 1: PRACTICE PROFILE & FEES */}
      {activeTab === 'practice' && (
        <form
          onSubmit={handleSavePractice}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD1] shadow-2xs space-y-6 text-xs"
        >
          <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
            <h2 className="text-base font-editorial font-semibold text-[#141213]">
              Practice Information & Clinical Tariff
            </h2>
            {savedSuccess && (
              <span className="text-xs text-[#7B1E34] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Settings updated</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Clinic Practice Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Practice Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Attending Physician Name
              </label>
              <input
                type="text"
                value={form.doctorName}
                onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Specialization Subtitle
              </label>
              <input
                type="text"
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Concierge Phone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Standard Consultation Fee ($)
              </label>
              <input
                type="number"
                value={form.consultationFee}
                onChange={(e) =>
                  setForm({ ...form, consultationFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-[#3B443F] block mb-1">
                Follow-Up Consultation Fee ($)
              </label>
              <input
                type="number"
                value={form.followupFee}
                onChange={(e) =>
                  setForm({ ...form, followupFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE3D6] flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all demo patients, visits, and data to initial baseline?')) {
                  resetDemoData();
                  alert('Demo database reset successfully.');
                }
              }}
              className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Practice Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: STAFF ROLES & ACCESS CONTROL */}
      {activeTab === 'staff' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DDD1] shadow-2xs space-y-6 text-xs">
          <div className="border-b border-[#EAE3D6] pb-3">
            <h2 className="text-base font-editorial font-semibold text-[#141213]">
              Role-Based Access Control (RBAC) Architecture
            </h2>
            <p className="text-[#657069] mt-0.5">
              Authorized clinical, administrative, and accounting permissions enforced on the server
            </p>
          </div>

          <div className="space-y-3">
            {availableStaff.map((staff) => (
              <div
                key={staff.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-semibold text-xs text-[#1C221F] flex items-center gap-2">
                    <span>{staff.name}</span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white border border-[#DDD5C7] text-[#7B1E34]">
                      {staff.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#69726D] mt-0.5">
                    {staff.title} · {staff.email}
                  </div>
                </div>

                <div className="text-[11px] text-[#555F59] sm:text-right">
                  {staff.role === 'doctor' && 'Full Clinical, Prescriptions, Diagnostics, Billing'}
                  {staff.role === 'receptionist' && 'Appointments, Patient Registration, Demographics'}
                  {staff.role === 'assistant' && 'Vitals, Documents, Limited Medical Notes'}
                  {staff.role === 'accountant' && 'Invoices, Receipts, Financial Ledger'}
                  {staff.role === 'admin' && 'Practice Settings, User Accounts, Configurations'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IMMUTABLE AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-[#EAE3D6] flex justify-between items-center bg-[#FAF7F2]">
            <div>
              <h2 className="text-base font-editorial font-semibold text-[#141213]">
                System Audit & Clinical Governance Log
              </h2>
              <p className="text-xs text-[#6B756F]">
                Tamper-evident record of patient updates, prescriptions, and session logins
              </p>
            </div>
            <span className="text-xs font-mono text-[#7B1E34] bg-[#FDF4F6] px-2 py-1 rounded">
              HIPAA & GDPR Compliant
            </span>
          </div>

          <div className="divide-y divide-[#EFEAE1] max-h-[500px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-[#FAF9F6] transition-colors text-xs flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[#1C221F]">
                      {log.action}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FAF8F5] border border-[#E5DDD1] text-[#5F6963]">
                      {log.entityType}
                    </span>
                  </div>
                  <p className="text-[#4E5852] text-xs">{log.details}</p>
                  <div className="text-[10px] text-[#7E8882] flex items-center gap-2">
                    <span>By: {log.userName} ({log.userRole})</span>
                  </div>
                </div>

                <span className="font-mono text-[11px] text-[#7E8882] shrink-0">
                  {log.timestamp.slice(0, 19).replace('T', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
