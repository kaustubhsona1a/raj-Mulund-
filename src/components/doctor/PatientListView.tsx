import React, { useState, useMemo } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Patient } from '../../types';
import { PatientAvatar } from '../common/VisualAvatar';
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  ChevronRight,
  UserPlus,
  X,
} from 'lucide-react';

interface PatientListViewProps {
  onSelectPatient: (patientId: string) => void;
  onLaunchConsultation: (patientId: string) => void;
  isNewPatientOpen?: boolean;
  onCloseNewPatient?: () => void;
}

export const PatientListView: React.FC<PatientListViewProps> = ({
  onSelectPatient,
  onLaunchConsultation,
  isNewPatientOpen = false,
  onCloseNewPatient,
}) => {
  const { patients, addPatient, currentUser } = useClinic();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Under Observation'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit' | 'code'>('name');
  const [showAddModal, setShowAddModal] = useState(isNewPatientOpen);

  // New patient modal state
  const [newPatientForm, setNewPatientForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '1985-06-15',
    gender: 'Female' as Patient['gender'],
    bloodGroup: 'O+',
    address: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    allergies: '',
    medications: '',
    pastConditions: '',
    notes: '',
  });

  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => {
        const matchesSearch =
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
          p.code.toLowerCase().includes(search.toLowerCase()) ||
          p.phone.includes(search) ||
          p.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === 'All' ? true : p.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.lastName.localeCompare(b.lastName);
        }
        if (sortBy === 'code') {
          return a.code.localeCompare(b.code);
        }
        return (b.lastVisitAt || '').localeCompare(a.lastVisitAt || '');
      });
  }, [patients, search, statusFilter, sortBy]);

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientForm.firstName || !newPatientForm.phone) return;

    const created = addPatient({
      firstName: newPatientForm.firstName,
      lastName: newPatientForm.lastName,
      email: newPatientForm.email,
      phone: newPatientForm.phone,
      dateOfBirth: newPatientForm.dateOfBirth,
      gender: newPatientForm.gender,
      bloodGroup: newPatientForm.bloodGroup,
      address: newPatientForm.address,
      emergencyContact: {
        name: newPatientForm.emergencyName,
        relation: newPatientForm.emergencyRelation,
        phone: newPatientForm.emergencyPhone,
      },
      allergies: newPatientForm.allergies ? newPatientForm.allergies.split(',').map((s) => s.trim()) : [],
      currentMedications: newPatientForm.medications ? newPatientForm.medications.split(',').map((s) => s.trim()) : [],
      pastConditions: newPatientForm.pastConditions ? newPatientForm.pastConditions.split(',').map((s) => s.trim()) : [],
      pastProcedures: [],
      familyHistory: [],
      notes: newPatientForm.notes,
      status: 'Active',
    });

    setShowAddModal(false);
    if (onCloseNewPatient) onCloseNewPatient();
    onSelectPatient(created.id);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Patients Database
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            {patients.length} registered clinical records
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#828C86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID (e.g. PT-1042), telephone, or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          {(['All', 'Active', 'Under Observation'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#7B1E34] text-white shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#555F59] hover:bg-[#EFE9DF] border border-[#DDD5C7]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs text-[#636C66]">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#828C86]" />
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD5C7] text-xs py-1.5 px-2 rounded-md outline-none text-[#1C221F]"
          >
            <option value="name">Sort by Last Name</option>
            <option value="code">Sort by Patient ID</option>
            <option value="lastVisit">Sort by Recent Visit</option>
          </select>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            No patients match the current search or filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#565F59] border-b border-[#E5DDD1]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Patient</th>
                  <th className="py-3 px-3 font-semibold">Contact</th>
                  <th className="py-3 px-3 font-semibold">Allergies</th>
                  <th className="py-3 px-3 font-semibold">Last Visit</th>
                  <th className="py-3 px-3 font-semibold">Next Follow-up</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFEAE1]">
                {filteredPatients.map((p) => {
                  const birthYear = p.dateOfBirth ? new Date(p.dateOfBirth).getFullYear() : 1985;
                  const age = new Date().getFullYear() - birthYear;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[#FAF9F6] transition-colors group cursor-pointer"
                      onClick={() => onSelectPatient(p.id)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <PatientAvatar name={`${p.firstName} ${p.lastName}`} size="md" />
                          <div>
                            <div className="font-semibold text-xs text-[#1C221F] group-hover:text-[#7B1E34] transition-colors flex items-center gap-1.5">
                              <span>
                                {p.firstName} {p.lastName}
                              </span>
                              <span className="font-mono text-[10px] text-[#7B1E34] bg-[#FDF4F6] px-1.5 py-0.2 rounded font-medium">
                                {p.code}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#69726D]">
                              {age} yrs · {p.gender} · {p.bloodGroup}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="text-[#323B36] font-mono text-[11px]">
                          {p.phone}
                        </div>
                        <div className="text-[11px] text-[#717B75] truncate max-w-[140px]">
                          {p.email}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        {p.allergies.length > 0 && !p.allergies.includes('NKDA') && !p.allergies.includes('No known drug allergies (NKDA)') ? (
                          <div className="text-rose-700 font-medium text-[11px] flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[120px]">{p.allergies.join(', ')}</span>
                          </div>
                        ) : (
                          <span className="text-[#7D8781] text-[11px]">NKDA</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-[#525B56] font-mono tabular-nums">
                        {p.lastVisitAt || '—'}
                      </td>

                      <td className="py-3.5 px-3">
                        {p.nextFollowupAt ? (
                          <span
                            className={`font-mono text-[11px] tabular-nums font-medium ${
                              p.nextFollowupAt === '2026-10-03'
                                ? 'text-[#7B1E34] bg-[#FDF4F6] px-1.5 py-0.5 rounded'
                                : 'text-[#525B56]'
                            }`}
                          >
                            {p.nextFollowupAt}
                          </span>
                        ) : (
                          <span className="text-[#8D9690]">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            p.status === 'Active'
                              ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {(currentUser.role === 'doctor' || currentUser.role === 'assistant') && (
                            <button
                              onClick={() => onLaunchConsultation(p.id)}
                              className="px-2.5 py-1 text-[11px] font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-md transition-colors"
                            >
                              Consult
                            </button>
                          )}
                          <button
                            onClick={() => onSelectPatient(p.id)}
                            className="p-1 text-[#78827C] hover:text-[#1C221F] rounded"
                            title="Open Profile & Timeline"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Patient Registration Modal */}
      {(showAddModal || isNewPatientOpen) && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-2xl my-8 overflow-hidden animate-in fade-in duration-150">
            <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#E8E1D5] flex items-center justify-between">
              <div>
                <h2 className="text-base font-editorial font-semibold text-[#141213]">
                  Register New Patient
                </h2>
                <p className="text-xs text-[#6B756F]">
                  Enter core demographic and clinical baseline details
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  if (onCloseNewPatient) onCloseNewPatient();
                }}
                className="p-1.5 text-[#736E64] hover:text-[#1F2421] rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPatientForm.firstName}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPatientForm.lastName}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPatientForm.phone}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newPatientForm.email}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newPatientForm.dateOfBirth}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, dateOfBirth: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Gender
                  </label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e: any) =>
                      setNewPatientForm({ ...newPatientForm, gender: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Blood Group
                  </label>
                  <select
                    value={newPatientForm.bloodGroup}
                    onChange={(e) =>
                      setNewPatientForm({ ...newPatientForm, bloodGroup: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Known Drug Allergies (comma-separated, or 'NKDA')
                </label>
                <input
                  type="text"
                  placeholder="e.g. Penicillin, Sulfa"
                  value={newPatientForm.allergies}
                  onChange={(e) =>
                    setNewPatientForm({ ...newPatientForm, allergies: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Current Medications (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metformin 500mg, Atorvastatin 20mg"
                  value={newPatientForm.medications}
                  onChange={(e) =>
                    setNewPatientForm({ ...newPatientForm, medications: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none focus:border-[#7B1E34]"
                />
              </div>

              <div className="pt-4 border-t border-[#EAE3D6] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    if (onCloseNewPatient) onCloseNewPatient();
                  }}
                  className="px-4 py-2 text-xs text-[#555F59] hover:text-[#141213]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs"
                >
                  Save & Open Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
