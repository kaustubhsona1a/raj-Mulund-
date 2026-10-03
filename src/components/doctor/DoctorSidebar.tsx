import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  FileText,
  Activity,
  FolderLock,
  Receipt,
  CheckSquare,
  BarChart2,
  Package,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface DoctorSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onExitToPublic: () => void;
  collapsed?: boolean;
}

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
  currentTab,
  onSelectTab,
  onExitToPublic,
  collapsed = false,
}) => {
  const { currentUser, labReports, appointments, tasks } = useClinic();

  // Calculate badges
  const pendingReportsCount = labReports.filter((r) => r.status === 'Pending Review').length;
  const todayAptsCount = appointments.filter((a) => a.date === '2026-10-03' && a.status !== 'Completed').length;
  const activeTasksCount = tasks.filter((t) => !t.completed).length;

  const allNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      allowedRoles: ['doctor', 'admin', 'receptionist', 'assistant', 'accountant'],
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: Users,
      allowedRoles: ['doctor', 'admin', 'receptionist', 'assistant'],
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      badge: todayAptsCount > 0 ? todayAptsCount : undefined,
      allowedRoles: ['doctor', 'admin', 'receptionist', 'assistant'],
    },
    {
      id: 'consultations',
      label: 'Consultations',
      icon: Stethoscope,
      allowedRoles: ['doctor', 'assistant'],
    },
    {
      id: 'prescriptions',
      label: 'Prescriptions',
      icon: FileText,
      allowedRoles: ['doctor', 'assistant'],
    },
    {
      id: 'reports',
      label: 'Lab Reports',
      icon: Activity,
      badge: pendingReportsCount > 0 ? pendingReportsCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
      allowedRoles: ['doctor', 'assistant', 'admin'],
    },
    {
      id: 'documents',
      label: 'Documents Vault',
      icon: FolderLock,
      allowedRoles: ['doctor', 'admin', 'assistant', 'receptionist', 'accountant'],
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: Receipt,
      allowedRoles: ['doctor', 'admin', 'accountant'],
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: activeTasksCount > 0 ? activeTasksCount : undefined,
      allowedRoles: ['doctor', 'admin', 'assistant', 'receptionist'],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart2,
      allowedRoles: ['doctor', 'admin'],
    },
    {
      id: 'inventory',
      label: 'Clinic Inventory',
      icon: Package,
      allowedRoles: ['doctor', 'admin', 'assistant'],
    },
    {
      id: 'settings',
      label: 'Settings & Audit',
      icon: Settings,
      allowedRoles: ['doctor', 'admin'],
    },
  ];

  const visibleItems = allNavItems.filter((item) =>
    item.allowedRoles.includes(currentUser.role)
  );

  return (
    <aside
      className={`bg-[#FAF7F2] border-r border-[#EAE3D6] flex flex-col justify-between transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-64'
      } shrink-0 min-h-screen`}
    >
      <div>
        {/* Workspace Brand Lockup */}
        <div className="h-16 px-5 border-b border-[#EAE3D6] flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <span className="text-base font-editorial font-semibold text-[#141213]">
                Aura Doctor OS
              </span>
              <span className="text-[10px] font-mono text-[#7B1E34] bg-[#FDF4F6] px-1.5 py-0.5 rounded font-medium">
                v2.6
              </span>
            </div>
          ) : (
            <span className="font-editorial text-lg font-bold text-[#141213] mx-auto">
              A
            </span>
          )}
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 space-y-1">
          {visibleItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#7B1E34] text-white shadow-xs'
                    : 'text-[#47524C] hover:text-[#141213] hover:bg-[#EFE9DF]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <item.icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-[#647069]'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badgeColor || 'bg-[#E2D8C8] text-[#343D38]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User & Exit Actions */}
      <div className="p-3 border-t border-[#EAE3D6] space-y-2">
        <button
          onClick={onExitToPublic}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#58635D] hover:text-[#141213] hover:bg-[#EFE9DF] rounded-lg transition-colors cursor-pointer"
          title="Return to Public Patient Website"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Public Website</span>}
        </button>

        {!collapsed && (
          <div className="px-3 py-2 bg-white/70 rounded-lg border border-[#E8E1D5] text-[11px]">
            <div className="font-semibold text-[#141213] truncate">
              {currentUser.name}
            </div>
            <div className="text-[#6D7771] capitalize text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B1E34]" />
              <span>Role: {currentUser.role}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
