import React, { useState } from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';

// Public Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { HeroSection } from './components/public/HeroSection';
import { CredibilitySection } from './components/public/CredibilitySection';
import { AreasOfCareSection } from './components/public/AreasOfCareSection';
import { PatientJourneySection } from './components/public/PatientJourneySection';
import { DoctorProfileSection } from './components/public/DoctorProfileSection';
import { AppointmentCTASection } from './components/public/AppointmentCTASection';
import { LocationContactSection } from './components/public/LocationContactSection';
import { PublicAboutView } from './components/public/PublicAboutView';
import { PublicServicesView } from './components/public/PublicServicesView';
import { PublicDoctorView } from './components/public/PublicDoctorView';
import { PublicBookingView } from './components/public/PublicBookingView';
import { PublicContactView } from './components/public/PublicContactView';
import { PublicPrivacyView } from './components/public/PublicPrivacyView';
import { PatientPortalView } from './components/public/PatientPortalView';

// Doctor OS Components
import { DoctorLayout } from './components/doctor/DoctorLayout';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { PatientListView } from './components/doctor/PatientListView';
import { PatientDetailView } from './components/doctor/PatientDetailView';
import { ConsultationWorkspace } from './components/doctor/ConsultationWorkspace';
import { AppointmentsView } from './components/doctor/AppointmentsView';
import { PrescriptionsView } from './components/doctor/PrescriptionsView';
import { ReportsView } from './components/doctor/ReportsView';
import { DocumentsVaultView } from './components/doctor/DocumentsVaultView';
import { BillingView } from './components/doctor/BillingView';
import { TasksView } from './components/doctor/TasksView';
import { AnalyticsView } from './components/doctor/AnalyticsView';
import { InventoryView } from './components/doctor/InventoryView';
import { SettingsView } from './components/doctor/SettingsView';

function AppContent() {
  // Mode: 'public' or 'doctor-os'
  const [appMode, setAppMode] = useState<'public' | 'doctor-os'>('public');

  // Public View: 'home' | 'about' | 'services' | 'doctor' | 'booking' | 'contact' | 'privacy' | 'terms' | 'portal'
  const [publicView, setPublicView] = useState<string>('home');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  // Doctor OS Tab: 'dashboard' | 'patients' | 'appointments' | 'consultations' | 'prescriptions' | 'reports' | 'documents' | 'billing' | 'tasks' | 'analytics' | 'inventory' | 'settings'
  const [doctorTab, setDoctorTab] = useState<string>('dashboard');

  // Doctor OS Active Patient / Consultation Selection
  const [activePatientId, setActivePatientId] = useState<string | null>(null);
  const [activeConsultationAppointmentId, setActiveConsultationAppointmentId] = useState<string | undefined>(undefined);
  const [activeReportId, setActiveReportId] = useState<string | undefined>(undefined);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);

  const handleLaunchConsultation = (patientId?: string, aptId?: string) => {
    if (patientId) setActivePatientId(patientId);
    setActiveConsultationAppointmentId(aptId);
    setDoctorTab('consultations');
    setAppMode('doctor-os');
  };

  const handleReviewReport = (reportId: string) => {
    setActiveReportId(reportId);
    setDoctorTab('reports');
    setAppMode('doctor-os');
  };

  const handleSelectPatient = (patientId: string) => {
    setActivePatientId(patientId);
    setDoctorTab('patients');
    setAppMode('doctor-os');
  };

  // Scroll to top on public view navigation
  const navigatePublicView = (view: string) => {
    setPublicView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* PUBLIC PATIENT-FACING WEBSITE */}
      {appMode === 'public' && (
        <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
          <PublicNavbar
            currentView={publicView}
            onNavigate={navigatePublicView}
            onOpenDoctorOS={() => {
              setAppMode('doctor-os');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <main className="flex-1">
            {publicView === 'home' && (
              <>
                <HeroSection onBook={() => navigatePublicView('booking')} />
                <CredibilitySection />
                <AreasOfCareSection
                  onSelectArea={(areaTitle) => {
                    setSelectedServiceTitle(areaTitle);
                    navigatePublicView('services');
                  }}
                />
                <PatientJourneySection />
                <DoctorProfileSection
                  onViewFullProfile={() => navigatePublicView('doctor')}
                />
                <AppointmentCTASection onBook={() => navigatePublicView('booking')} />
                <LocationContactSection />
              </>
            )}

            {publicView === 'about' && (
              <PublicAboutView onBook={() => navigatePublicView('booking')} />
            )}

            {publicView === 'services' && (
              <PublicServicesView
                onBook={() => navigatePublicView('booking')}
                initialSelected={selectedServiceTitle}
              />
            )}

            {publicView === 'doctor' && (
              <PublicDoctorView onBook={() => navigatePublicView('booking')} />
            )}

            {publicView === 'booking' && (
              <PublicBookingView
                onSuccess={(ref) => {}}
                onNavigate={navigatePublicView}
              />
            )}

            {publicView === 'portal' && (
              <PatientPortalView onBook={() => navigatePublicView('booking')} />
            )}

            {publicView === 'contact' && <PublicContactView />}

            {(publicView === 'privacy' || publicView === 'terms') && (
              <PublicPrivacyView />
            )}
          </main>

          <PublicFooter
            onNavigate={navigatePublicView}
            onOpenDoctorOS={() => {
              setAppMode('doctor-os');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* PRIVATE SECURE DOCTOR MANAGEMENT SYSTEM / DOCTOR OS */}
      {appMode === 'doctor-os' && (
        <DoctorLayout
          currentTab={doctorTab}
          onSelectTab={(tab) => {
            setDoctorTab(tab);
            if (tab === 'patients' && activePatientId) {
              // keep patient view or reset on explicit click
            }
          }}
          onExitToPublic={() => {
            setAppMode('public');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLaunchConsultation={handleLaunchConsultation}
          onOpenNewPatient={() => {
            setDoctorTab('patients');
            setIsNewPatientModalOpen(true);
          }}
          onSelectPatient={handleSelectPatient}
        >
          {/* Dashboard Tab */}
          {doctorTab === 'dashboard' && (
            <DoctorDashboard
              onSelectPatient={handleSelectPatient}
              onLaunchConsultation={handleLaunchConsultation}
              onNavigateTab={(tab) => setDoctorTab(tab)}
              onReviewReport={handleReviewReport}
            />
          )}

          {/* Patients Tab */}
          {doctorTab === 'patients' && (
            activePatientId ? (
              <PatientDetailView
                patientId={activePatientId}
                onBack={() => setActivePatientId(null)}
                onLaunchConsultation={handleLaunchConsultation}
                onReviewReport={handleReviewReport}
              />
            ) : (
              <PatientListView
                onSelectPatient={(pId) => setActivePatientId(pId)}
                onLaunchConsultation={handleLaunchConsultation}
                isNewPatientOpen={isNewPatientModalOpen}
                onCloseNewPatient={() => setIsNewPatientModalOpen(false)}
              />
            )
          )}

          {/* Appointments Tab */}
          {doctorTab === 'appointments' && (
            <AppointmentsView
              onSelectPatient={handleSelectPatient}
              onLaunchConsultation={handleLaunchConsultation}
            />
          )}

          {/* Consultations Workspace Tab */}
          {doctorTab === 'consultations' && (
            <ConsultationWorkspace
              initialPatientId={activePatientId || undefined}
              initialAppointmentId={activeConsultationAppointmentId}
              onFinish={(cstId) => {
                setDoctorTab('patients');
              }}
              onCancel={() => {
                setDoctorTab('dashboard');
              }}
            />
          )}

          {/* Prescriptions Tab */}
          {doctorTab === 'prescriptions' && (
            <PrescriptionsView onSelectPatient={handleSelectPatient} />
          )}

          {/* Lab Reports Tab */}
          {doctorTab === 'reports' && (
            <ReportsView
              onSelectPatient={handleSelectPatient}
              selectedReportId={activeReportId}
              onClearSelectedReport={() => setActiveReportId(undefined)}
            />
          )}

          {/* Documents Vault Tab */}
          {doctorTab === 'documents' && (
            <DocumentsVaultView onSelectPatient={handleSelectPatient} />
          )}

          {/* Billing & Invoices Tab */}
          {doctorTab === 'billing' && (
            <BillingView onSelectPatient={handleSelectPatient} />
          )}

          {/* Tasks Tab */}
          {doctorTab === 'tasks' && (
            <TasksView onSelectPatient={handleSelectPatient} />
          )}

          {/* Analytics Tab */}
          {doctorTab === 'analytics' && <AnalyticsView />}

          {/* Inventory Tab */}
          {doctorTab === 'inventory' && <InventoryView />}

          {/* Settings Tab */}
          {doctorTab === 'settings' && <SettingsView />}
        </DoctorLayout>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}
