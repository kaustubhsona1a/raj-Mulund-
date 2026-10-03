import React from 'react';
import { Prescription, ClinicInfo } from '../../types';
import { Printer, Download, Share2, X, Check } from 'lucide-react';
import { useState } from 'react';

interface PrintablePrescriptionProps {
  prescription: Prescription;
  clinicInfo: ClinicInfo;
  onClose?: () => void;
}

export const PrintablePrescription: React.FC<PrintablePrescriptionProps> = ({
  prescription,
  clinicInfo,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/portal?rx=${prescription.prescriptionNumber}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#E5DFD5] max-w-3xl mx-auto overflow-hidden printable-document">
      {/* Action Header - Hidden on Print */}
      <div className="no-print bg-[#FCFBF9] border-b border-[#E8E2D6] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#7B1E34] font-semibold font-display">
            Medical Prescription
          </span>
          <span className="text-xs text-[#736E64] font-mono">
            {prescription.prescriptionNumber}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#3D4440] hover:text-[#141213] border border-[#DDD5C7] rounded-md bg-white hover:bg-[#FDF4F6] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#7B1E34]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-md transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#736E64] hover:text-[#141213] rounded-md hover:bg-[#EBE4D8] transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Official Prescription Paper Layout */}
      <div className="p-8 sm:p-12 text-[#141213] bg-white">
        {/* Practice Letterhead */}
        <div className="flex justify-between items-start border-b border-[#D8CEBF] pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-serif tracking-tight text-[#141213] font-bold">
              {clinicInfo.name}
            </h1>
            <p className="text-xs text-[#7B1E34] font-semibold mt-0.5">{clinicInfo.tagline}</p>
            <p className="text-xs text-[#554D45] mt-1 font-sans">
              {clinicInfo.address} · {clinicInfo.city}
            </p>
            <p className="text-xs text-[#554D45] font-mono">
              Tel: {clinicInfo.phone} · {clinicInfo.email}
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-base font-serif font-bold text-[#141213]">
              {prescription.doctorName}
            </h2>
            <p className="text-xs text-[#7B1E34] font-medium">{prescription.doctorTitle}</p>
            <p className="text-[11px] text-[#554D45] max-w-[260px] mt-0.5 leading-tight">
              {clinicInfo.doctorCredentials}
            </p>
          </div>
        </div>

        {/* Patient Meta Strip */}
        <div className="bg-[#FCFBF9] border border-[#E7E0D4] rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-8">
          <div>
            <span className="text-[#82787C] block text-[10px] uppercase font-semibold">Patient Name</span>
            <span className="font-semibold text-[#141213] text-sm">{prescription.patientName}</span>
          </div>
          <div>
            <span className="text-[#82787C] block text-[10px] uppercase font-semibold">Patient Code</span>
            <span className="font-mono text-[#141213]">{prescription.patientId}</span>
          </div>
          <div>
            <span className="text-[#82787C] block text-[10px] uppercase font-semibold">Date of Issuance</span>
            <span className="text-[#141213]">{prescription.createdAt.slice(0, 10)}</span>
          </div>
          <div>
            <span className="text-[#82787C] block text-[10px] uppercase font-semibold">Rx Number</span>
            <span className="font-mono text-[#7B1E34] font-bold">{prescription.prescriptionNumber}</span>
          </div>
        </div>

        {/* Diagnosis & Clinical Findings */}
        <div className="mb-6 p-4 rounded-lg bg-[#FAF8F5] border border-[#EAE2D8]">
          <span className="text-[10px] uppercase font-semibold text-[#7B1E34] block mb-1">
            Clinical Diagnosis
          </span>
          <p className="font-semibold text-sm text-[#141213]">
            {Array.isArray(prescription.diagnosis) ? prescription.diagnosis.join(', ') : prescription.diagnosis}
          </p>
        </div>

        {/* Prescription Symbol & Items Table */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-serif italic font-bold text-3xl text-[#7B1E34] select-none">
              ℞
            </span>
            <span className="text-xs font-semibold text-[#554D45] uppercase tracking-wider">
              Prescribed Medications & Administration Schedule
            </span>
          </div>

          <div className="border border-[#E0D8CB] rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5EFEB] border-b border-[#E0D8CB] text-[#141213] font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Medication & Form</th>
                  <th className="py-2.5 px-4">Dosage</th>
                  <th className="py-2.5 px-4">Frequency</th>
                  <th className="py-2.5 px-4">Duration</th>
                  <th className="py-2.5 px-4">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE2D8]">
                {prescription.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FCFBF9]">
                    <td className="py-3 px-4 font-semibold text-[#141213]">
                      {item.medicineName}
                    </td>
                    <td className="py-3 px-4 text-[#4D4548] font-mono">{item.dosage}</td>
                    <td className="py-3 px-4 text-[#4D4548]">{item.frequency}</td>
                    <td className="py-3 px-4 text-[#4D4548]">{item.duration}</td>
                    <td className="py-3 px-4 text-[#554D45] italic">{item.instructions || 'As advised'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Advice & Investigation Requirements */}
        <div className="space-y-4 mb-10 text-xs">
          {prescription.generalInstructions && (
            <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EAE2D8]">
              <span className="font-semibold text-[#7B1E34] uppercase tracking-wider text-[10px] block mb-1">
                Clinical Advice & Rehabilitation Protocol
              </span>
              <p className="text-[#332D28] leading-relaxed whitespace-pre-line">
                {prescription.generalInstructions}
              </p>
            </div>
          )}

          {prescription.investigationsRecommended && prescription.investigationsRecommended.length > 0 && (
            <div className="p-4 rounded-lg bg-[#FDF4F6] border border-[#F2D5DC]">
              <span className="font-semibold text-[#7B1E34] uppercase tracking-wider text-[10px] block mb-1">
                Investigations Ordered Prior to Next Review
              </span>
              <ul className="list-disc list-inside space-y-1 text-[#541021]">
                {prescription.investigationsRecommended.map((inv: string, idx: number) => (
                  <li key={idx}>{inv}</li>
                ))}
              </ul>
            </div>
          )}

          {prescription.followupDate && (
            <div className="p-3.5 rounded-lg border border-[#EAE2D8] bg-[#FAF8F5]">
              <span className="font-semibold text-[#7B1E34] uppercase tracking-wider text-[10px] block mb-1">
                Next Clinical Follow-up
              </span>
              <p className="text-[#141213] font-medium text-sm">
                {new Date(prescription.followupDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-[11px] text-[#554D45] mt-0.5">
                Book via patient portal or telephone concierge.
              </p>
            </div>
          )}
        </div>

        {/* Verification & Signature Footer */}
        <div className="border-t border-[#D8CEBF] pt-6 flex justify-between items-end">
          <div className="text-[11px] text-[#82787C] max-w-sm">
            <p>This is a legally valid computer-generated clinical prescription issued by Raj Hospital.</p>
            <p className="mt-1 font-mono text-[10px]">
              Auth Ref: {prescription.prescriptionNumber} · Timestamp: {prescription.createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="text-right">
            <div className="font-serif italic text-lg text-[#7B1E34] pr-2">
              Dr. Kush Mukhi
            </div>
            <div className="w-48 border-b border-[#7B1E34] my-1 ml-auto"></div>
            <div className="text-xs font-semibold text-[#141213]">
              {prescription.signedBy || 'Dr. Kush Mukhi, MS (Ortho)'}
            </div>
            <div className="text-[10px] text-[#554D45]">Visiting Consultant Orthopaedic Surgeon</div>
          </div>
        </div>
      </div>
    </div>
  );
};
