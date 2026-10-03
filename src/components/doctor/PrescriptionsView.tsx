import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Prescription, PrescriptionItem } from '../../types';
import { PrintablePrescription } from '../common/PrintablePrescription';
import {
  FileText,
  Search,
  Plus,
  Printer,
  Calendar,
  User,
  Share2,
  Trash2,
  X,
} from 'lucide-react';

interface PrescriptionsViewProps {
  onSelectPatient: (patientId: string) => void;
}

export const PrescriptionsView: React.FC<PrescriptionsViewProps> = ({
  onSelectPatient,
}) => {
  const { prescriptions, createPrescription, patients, clinicInfo, currentUser } = useClinic();

  const [search, setSearch] = useState('');
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // New Prescription Form
  const [newRxPatientId, setNewRxPatientId] = useState(patients[0]?.id || '');
  const [newRxDiagnosis, setNewRxDiagnosis] = useState('');
  const [newRxInstructions, setNewRxInstructions] = useState('');
  const [newRxFollowup, setNewRxFollowup] = useState('2026-10-17');
  const [newRxItems, setNewRxItems] = useState<PrescriptionItem[]>([
    {
      id: 'item-1',
      medicineName: '',
      strength: '',
      dosage: '1 tablet',
      frequency: 'Once daily',
      duration: '30 days',
      instructions: 'Take in the morning with water.',
    },
  ]);

  const filteredPrescriptions = prescriptions.filter(
    (rx) =>
      rx.prescriptionNumber.toLowerCase().includes(search.toLowerCase()) ||
      rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
      rx.items.some((i) => i.medicineName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddItem = () => {
    setNewRxItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        medicineName: '',
        strength: '',
        dosage: '1 tablet',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: '',
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setNewRxItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof PrescriptionItem, value: string) => {
    setNewRxItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const p = patients.find((pat) => pat.id === newRxPatientId);
    if (!p) return;

    const birthYear = p.dateOfBirth ? new Date(p.dateOfBirth).getFullYear() : 1985;
    const age = new Date().getFullYear() - birthYear;
    const validItems = newRxItems.filter((i) => i.medicineName.trim().length > 0);

    const created = createPrescription({
      patientId: p.id,
      patientName: `${p.firstName} ${p.lastName}`,
      patientAge: age,
      patientGender: p.gender,
      date: '2026-10-03',
      doctorName: currentUser.name,
      doctorTitle: clinicInfo.doctorTitle,
      diagnosis: newRxDiagnosis ? newRxDiagnosis.split(',').map((d) => d.trim()) : [],
      items: validItems,
      generalInstructions: newRxInstructions,
      followupDate: newRxFollowup || undefined,
      signedBy: `${currentUser.name}, MD`,
    });

    setShowNewModal(false);
    setSelectedRx(created);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Prescriptions Vault
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            {prescriptions.length} digital prescriptions authorized
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write Prescription</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#828C86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by prescription reference, patient name, or medicine..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        {filteredPrescriptions.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            No prescriptions found matching the search.
          </div>
        ) : (
          <div className="divide-y divide-[#EFEAE1]">
            {filteredPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-5 hover:bg-[#FAF9F6] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#7B1E34] bg-[#FDF4F6] px-2 py-0.5 rounded">
                      {rx.prescriptionNumber}
                    </span>
                    <button
                      onClick={() => onSelectPatient(rx.patientId)}
                      className="font-semibold text-sm text-[#1C221F] hover:text-[#7B1E34] transition-colors"
                    >
                      {rx.patientName}
                    </button>
                    <span className="text-xs text-[#7A837E]">
                      ({rx.patientAge} yrs · {rx.patientGender})
                    </span>
                  </div>

                  <div className="text-xs text-[#4F5953] flex flex-wrap gap-2">
                    {rx.items.map((i, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FAF8F5] border border-[#E8E1D5] px-2 py-0.5 rounded text-[11px]"
                      >
                        {i.medicineName} ({i.strength}) — {i.dosage}, {i.frequency}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#717A74] flex items-center gap-3">
                    <span>Issued: {rx.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>Signer: {rx.signedBy}</span>
                    {rx.followupDate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#7B1E34] font-medium">Follow-up: {rx.followupDate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => setSelectedRx(rx)}
                    className="px-3.5 py-1.5 text-xs font-medium text-[#7B1E34] bg-[#FDF4F6] hover:bg-[#DCEAE3] border border-[#D0DFD7] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View / Print</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prescription Viewer Modal */}
      {selectedRx && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8">
            <PrintablePrescription
              prescription={selectedRx}
              clinicInfo={clinicInfo}
              onClose={() => setSelectedRx(null)}
            />
          </div>
        </div>
      )}

      {/* New Prescription Creator Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-2xl my-8 overflow-hidden">
            <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#E8E1D5] flex items-center justify-between">
              <div>
                <h2 className="text-base font-editorial font-semibold text-[#141213]">
                  Generate Digital Prescription
                </h2>
                <p className="text-xs text-[#6B756F]">
                  Issue and sign authorized medical prescription
                </p>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-[#736E64] hover:text-[#1F2421]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePrescription} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Select Patient *
                  </label>
                  <select
                    value={newRxPatientId}
                    onChange={(e) => setNewRxPatientId(e.target.value)}
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
                    Diagnosis / Indication
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hypertension, Dyslipidemia"
                    value={newRxDiagnosis}
                    onChange={(e) => setNewRxDiagnosis(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  />
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#141213] uppercase tracking-wider text-[11px]">
                    Prescription Medicines
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-[#7B1E34] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                {newRxItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      placeholder="Medicine Name"
                      value={item.medicineName}
                      onChange={(e) => handleItemChange(item.id, 'medicineName', e.target.value)}
                      className="sm:col-span-4 px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Strength"
                      value={item.strength}
                      onChange={(e) => handleItemChange(item.id, 'strength', e.target.value)}
                      className="sm:col-span-2 px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Dosage & Freq"
                      value={item.frequency}
                      onChange={(e) => handleItemChange(item.id, 'frequency', e.target.value)}
                      className="sm:col-span-3 px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={item.duration}
                      onChange={(e) => handleItemChange(item.id, 'duration', e.target.value)}
                      className="sm:col-span-2 px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="sm:col-span-1 p-1 text-rose-600 hover:text-rose-800 text-center"
                    >
                      <Trash2 className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  General Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Special instructions for patient..."
                  value={newRxInstructions}
                  onChange={(e) => setNewRxInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EAE3D6] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 text-xs text-[#525B56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Authorize & Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
