import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { LabReport } from '../../types';
import {
  Activity,
  Search,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Eye,
  Check,
  X,
} from 'lucide-react';

interface ReportsViewProps {
  onSelectPatient: (patientId: string) => void;
  selectedReportId?: string;
  onClearSelectedReport?: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  onSelectPatient,
  selectedReportId,
  onClearSelectedReport,
}) => {
  const { labReports, reviewLabReport, uploadLabReport, patients, currentUser } = useClinic();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Active Review Modal
  const [activeReport, setActiveReport] = useState<LabReport | null>(() => {
    if (selectedReportId) {
      return labReports.find((r) => r.id === selectedReportId) || null;
    }
    return null;
  });

  const [reviewNotes, setReviewNotes] = useState('');

  // Upload Report Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadPatientId, setUploadPatientId] = useState(patients[0]?.id || '');
  const [uploadTestName, setUploadTestName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<LabReport['category']>('Biochemistry');
  const [uploadDate, setUploadDate] = useState('2026-10-03');
  const [uploadFindings, setUploadFindings] = useState('');

  const filteredReports = labReports.filter((r) => {
    const matchesSearch =
      r.testName.toLowerCase().includes(search.toLowerCase()) ||
      r.patientName.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === 'All' ? true : r.category === filterCategory;

    const matchesStatus =
      filterStatus === 'All' ? true : r.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenReview = (report: LabReport) => {
    setActiveReport(report);
    setReviewNotes(report.summaryNotes || '');
  };

  const handleMarkReviewed = () => {
    if (!activeReport) return;
    reviewLabReport(activeReport.id, reviewNotes);
    setActiveReport(null);
    if (onClearSelectedReport) onClearSelectedReport();
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const p = patients.find((pat) => pat.id === uploadPatientId);
    if (!p || !uploadTestName) return;

    uploadLabReport({
      patientId: p.id,
      patientName: `${p.firstName} ${p.lastName}`,
      testName: uploadTestName,
      category: uploadCategory,
      date: uploadDate,
      keyFindings: uploadFindings,
      fileSize: '410 KB',
    });

    setShowUploadModal(false);
    setUploadTestName('');
    setUploadFindings('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Laboratory & Pathology Reports
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            {labReports.filter((r) => r.status === 'Pending Review').length} awaiting physician review
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Lab Report</span>
        </button>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#828C86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports or patient name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
          />
        </div>

        {/* Filter Category */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] uppercase font-semibold text-[#7D8781]">
            Category:
          </span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD5C7] text-xs py-1.5 px-2 rounded-md outline-none text-[#1C221F]"
          >
            <option value="All">All Categories</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Hematology">Hematology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Imaging">Imaging</option>
          </select>
        </div>

        {/* Filter Status */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] uppercase font-semibold text-[#7D8781]">
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD5C7] text-xs py-1.5 px-2 rounded-md outline-none text-[#1C221F]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        {filteredReports.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            No reports match the current criteria.
          </div>
        ) : (
          <div className="divide-y divide-[#EFEAE1]">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  report.status === 'Pending Review'
                    ? 'bg-[#FCFBF8] border-l-4 border-l-[#C27803]'
                    : 'hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        report.status === 'Pending Review'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                      }`}
                    >
                      {report.status}
                    </span>
                    <h3 className="font-semibold text-sm text-[#141213] truncate">
                      {report.testName}
                    </h3>
                  </div>

                  <div className="text-xs text-[#5D6761] flex items-center gap-2">
                    <span>Patient:</span>
                    <button
                      onClick={() => onSelectPatient(report.patientId)}
                      className="font-medium text-[#1C221F] hover:text-[#7B1E34] underline"
                    >
                      {report.patientName}
                    </button>
                    <span aria-hidden="true">·</span>
                    <span>Date: {report.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[#7B8580]">{report.category}</span>
                  </div>

                  {report.keyFindings && (
                    <div className="p-2.5 bg-[#FAF8F5] rounded border border-[#E8E1D5] font-mono text-xs text-[#333C37]">
                      {report.keyFindings}
                    </div>
                  )}

                  {report.status === 'Reviewed' && report.reviewedBy && (
                    <div className="text-[11px] text-[#717B75]">
                      Reviewed by {report.reviewedBy} on {report.reviewedAt?.slice(0, 10)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => handleOpenReview(report)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                      report.status === 'Pending Review'
                        ? 'bg-[#7B1E34] text-white hover:bg-[#631326] shadow-2xs'
                        : 'bg-[#FAF8F5] text-[#222A26] border border-[#DDD5C7] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{report.status === 'Pending Review' ? 'Review & Sign' : 'Inspect'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Dialog Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <div>
                <h3 className="text-base font-editorial font-semibold text-[#141213]">
                  Clinical Review: {activeReport.patientName}
                </h3>
                <span className="text-xs text-[#6B756F]">{activeReport.testName}</span>
              </div>
              <button
                onClick={() => {
                  setActiveReport(null);
                  if (onClearSelectedReport) onClearSelectedReport();
                }}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Findings Display */}
            {activeReport.keyFindings && (
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5] space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#76807A] block">
                  Report Findings
                </span>
                <p className="font-mono text-xs text-[#202723]">
                  {activeReport.keyFindings}
                </p>
              </div>
            )}

            {/* Physician Notes */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-[#3B443F] block">
                Doctor Review Assessment & Instructions:
              </label>
              <textarea
                rows={3}
                placeholder="Document clinical interpretation and follow-up directives..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#EAE3D6]">
              <button
                type="button"
                onClick={() => onSelectPatient(activeReport.patientId)}
                className="text-xs text-[#7B1E34] hover:underline"
              >
                Open Patient History →
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveReport(null);
                    if (onClearSelectedReport) onClearSelectedReport();
                  }}
                  className="px-3 py-1.5 text-xs text-[#525B56]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleMarkReviewed}
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark as Reviewed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <h3 className="text-base font-editorial font-semibold text-[#141213]">
                Upload Diagnostic Report
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Select Patient *
                </label>
                <select
                  value={uploadPatientId}
                  onChange={(e) => setUploadPatientId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Test / Investigation Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Comprehensive Metabolic Panel (CMP)"
                  value={uploadTestName}
                  onChange={(e) => setUploadTestName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e: any) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  >
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Date of Test
                  </label>
                  <input
                    type="date"
                    value={uploadDate}
                    onChange={(e) => setUploadDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Biomarker Values & Key Findings
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Glucose: 98 mg/dL · Creatinine: 0.9 mg/dL · eGFR: >90"
                  value={uploadFindings}
                  onChange={(e) => setUploadFindings(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 text-xs text-[#525B56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Save to Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
