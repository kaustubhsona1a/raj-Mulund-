import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ClinicDocument } from '../../types';
import {
  FolderLock,
  Search,
  Upload,
  FileText,
  Lock,
  Download,
  Shield,
  X,
} from 'lucide-react';

interface DocumentsVaultViewProps {
  onSelectPatient: (patientId: string) => void;
}

export const DocumentsVaultView: React.FC<DocumentsVaultViewProps> = ({
  onSelectPatient,
}) => {
  const { documents, addDocument, currentUser, patients } = useClinic();

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<ClinicDocument['category']>('Patient Medical Record');
  const [docPatientId, setDocPatientId] = useState(patients[0]?.id || '');

  // Role-based visibility
  const authorizedDocuments = documents.filter((d) =>
    d.accessRole.includes(currentUser.role)
  );

  const filteredDocs = authorizedDocuments.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.patientName && d.patientName.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      filterCategory === 'All' ? true : d.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    const p = patients.find((pat) => pat.id === docPatientId);

    addDocument({
      title: docTitle,
      category: docCategory,
      patientId: docCategory === 'Patient Medical Record' || docCategory === 'Consent Form' ? p?.id : undefined,
      patientName: docCategory === 'Patient Medical Record' || docCategory === 'Consent Form' ? `${p?.firstName} ${p?.lastName}` : undefined,
      size: '1.4 MB',
      accessRole: ['doctor', 'admin', 'assistant'],
    });

    setShowUploadModal(false);
    setDocTitle('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Encrypted Documents Vault
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            Role-gated clinical records, consent forms, and regulatory certificates
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#828C86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents or patient records..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
          />
        </div>

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
            <option value="Patient Medical Record">Patient Medical Record</option>
            <option value="Consent Form">Consent Form</option>
            <option value="Clinic License">Clinic License</option>
            <option value="Clinical Agreement">Clinical Agreement</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            No documents found matching the filter or permitted for your role ({currentUser.role}).
          </div>
        ) : (
          <div className="divide-y divide-[#EFEAE1]">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 sm:p-5 hover:bg-[#FAF9F6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#E5DDD1] flex items-center justify-center text-[#7B1E34] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <h3 className="font-semibold text-xs sm:text-sm text-[#141213] truncate">
                      {doc.title}
                    </h3>
                    <div className="text-[11px] text-[#69726D] flex flex-wrap items-center gap-2">
                      <span className="bg-[#FAF8F5] border border-[#E8E1D5] px-1.5 py-0.2 rounded font-medium">
                        {doc.category}
                      </span>
                      {doc.patientName && (
                        <>
                          <span aria-hidden="true">·</span>
                          <button
                            onClick={() => doc.patientId && onSelectPatient(doc.patientId)}
                            className="text-[#7B1E34] hover:underline"
                          >
                            {doc.patientName}
                          </button>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>Uploaded {doc.uploadedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{doc.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <span className="text-[10px] text-[#717A74] flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3 text-[#7B1E34]" />
                    <span>Encrypted</span>
                  </span>

                  <button
                    onClick={() => {
                      alert(`Document "${doc.title}" downloaded securely.`);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-[#141213] bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-[#DDD5C7] rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Dialog Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <h3 className="text-base font-editorial font-semibold text-[#141213]">
                Upload Vault Document
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prior Cardiology Assessment (2025)"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Document Category
                </label>
                <select
                  value={docCategory}
                  onChange={(e: any) => setDocCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                >
                  <option value="Patient Medical Record">Patient Medical Record</option>
                  <option value="Consent Form">Consent Form</option>
                  <option value="Clinic License">Clinic License</option>
                  <option value="Clinical Agreement">Clinical Agreement</option>
                </select>
              </div>

              {(docCategory === 'Patient Medical Record' || docCategory === 'Consent Form') && (
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Associated Patient
                  </label>
                  <select
                    value={docPatientId}
                    onChange={(e) => setDocPatientId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 text-xs text-[#5A645E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Upload & Secure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
