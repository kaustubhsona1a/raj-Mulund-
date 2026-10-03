import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PublicPrivacyView: React.FC = () => {
  const { clinicInfo } = useClinic();

  return (
    <div className="py-16 md:py-24 bg-[#FCFBF9]">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Compliance & Data Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#141213]">
            Clinical Privacy & Medical Confidentiality
          </h1>
          <p className="text-xs sm:text-sm text-[#554D45]">
            Last updated: October 2026 · Raj Hospital Information Governance
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EAE2D8] space-y-6 text-xs sm:text-sm text-[#4D4548] leading-relaxed shadow-xs">
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#141213] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#7B1E34]" />
              <span>1. Physician-Patient Privilege & Diagnostic Records</span>
            </h2>
            <p>
              At {clinicInfo.name}, all consultations, diagnostic radiographs, MRI imaging studies,
              surgical operative notes, and laboratory findings are strictly protected under statutory
              physician-patient privilege and medical ethics standards.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#EAE2D8] pt-6">
            <h2 className="text-lg font-serif font-semibold text-[#141213] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#7B1E34]" />
              <span>2. Storage & Secure Architecture</span>
            </h2>
            <p>
              All patient records within our proprietary Doctor OS are safeguarded with end-to-end
              AES-256 bit encryption at rest and TLS 1.3 encryption in transit. Role-based access control
              (RBAC) restricts medical data visibility: accountants cannot view clinical diagnoses;
              reception staff only view scheduling coordinates.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#EAE2D8] pt-6">
            <h2 className="text-lg font-serif font-semibold text-[#141213] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7B1E34]" />
              <span>3. Telemedicine Consent & Informed Scope</span>
            </h2>
            <p>
              Video consultations are intended for clinical follow-up, symptom review, and post-operative
              guidance. Where physical examination or acute biomechanical palpation is warranted, Dr. Kush Mukhi
              reserves the professional discretion to recommend an immediate in-person evaluation or
              urgent medical referral.
            </p>
          </section>

          <section className="space-y-3 border-t border-[#EAE2D8] pt-6">
            <h2 className="text-lg font-serif font-semibold text-[#141213]">
              4. Patient Access Rights
            </h2>
            <p>
              Under healthcare law, you possess the unequivocal right to inspect, download, and request
              the porting of your entire medical record, including clinical consultation letters and
              laboratory findings, at any time through our secure Patient Portal.
            </p>
          </section>

          <div className="p-4 bg-[#FDF4F6] rounded-xl border border-[#F2D5DC] text-xs text-[#541021]">
            For data protection inquiries or to request an authorized medical record transfer, contact
            our clinical privacy officer at <span className="text-[#7B1E34] font-semibold">{clinicInfo.email}</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
