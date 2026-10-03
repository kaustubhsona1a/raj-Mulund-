import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorSidebar } from './DoctorSidebar';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { UserRole } from '../../types';
import {
  Search,
  Plus,
  Stethoscope,
  Bell,
  Menu,
  Shield,
  UserCheck,
  ChevronDown,
} from 'lucide-react';

interface DoctorLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitToPublic: () => void;
  onLaunchConsultation: (patientId?: string) => void;
  onOpenNewPatient: () => void;
  onSelectPatient: (patientId: string) => void;
  children: React.ReactNode;
}

export const DoctorLayout: React.FC<DoctorLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitToPublic,
  onLaunchConsultation,
  onOpenNewPatient,
  onSelectPatient,
  children,
}) => {
  const {
    currentUser,
    switchRole,
    availableStaff,
    setIsSearchOpen,
    labReports,
    appointments,
  } = useClinic();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Attention alert tally
  const unreviewedReports = labReports.filter((r) => r.status === 'Pending Review').length;
  const todayApts = appointments.filter((a) => a.date === '2026-10-03').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row text-[#1E2421]">
      {/* Sidebar Navigation */}
      <DoctorSidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        onExitToPublic={onExitToPublic}
        collapsed={sidebarCollapsed}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#FAF7F2] border-b border-[#EAE3D6] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-[#5D6761] hover:text-[#141213] rounded-md hover:bg-[#EFE9DF] transition-colors cursor-pointer"
              title="Toggle sidebar width"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#7A847E]">Doctor OS</span>
              <span className="text-[#C2BAAE]">/</span>
              <span className="font-semibold text-[#141213] capitalize">
                {currentTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Right Header Zone */}
          <div className="flex items-center gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#5D6761] bg-white hover:bg-[#F6F2EC] border border-[#DDD5C7] rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#7B1E34]" />
              <span className="hidden sm:inline">Search records...</span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] text-[#808A84] bg-[#FAF8F5] px-1 py-0.5 rounded border border-[#E0D8CB]">
                ⌘K
              </kbd>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2E3732] bg-[#EFE9DF] hover:bg-[#E5DDD0] border border-[#DDD5C7] rounded-lg transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span className="capitalize">{currentUser.role}</span>
                <ChevronDown className="w-3 h-3 text-[#79837D]" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#DDD5C7] py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1.5 border-b border-[#EAE3D6] text-[10px] uppercase font-semibold text-[#7E8882]">
                    Switch Role (Security Testing)
                  </div>
                  {availableStaff.map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => {
                        switchRole(staff.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7F3EC] transition-colors cursor-pointer ${
                        currentUser.role === staff.role ? 'bg-[#FDF4F6] text-[#141213] font-semibold' : 'text-[#3E4742]'
                      }`}
                    >
                      <div>
                        <div>{staff.name}</div>
                        <div className="text-[10px] text-[#717B75] capitalize">
                          {staff.role} · {staff.title}
                        </div>
                      </div>
                      {currentUser.role === staff.role && (
                        <UserCheck className="w-3.5 h-3.5 text-[#7B1E34]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions (only for clinical or receptionist roles) */}
            {(currentUser.role === 'doctor' || currentUser.role === 'assistant') && (
              <button
                onClick={() => onLaunchConsultation()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>New Consultation</span>
              </button>
            )}

            {(currentUser.role === 'doctor' || currentUser.role === 'receptionist' || currentUser.role === 'admin') && (
              <button
                onClick={onOpenNewPatient}
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#2C342F] bg-white hover:bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>New Patient</span>
              </button>
            )}
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        onSelectPatient={onSelectPatient}
        onNavigateTab={onSelectTab}
      />
    </div>
  );
};
