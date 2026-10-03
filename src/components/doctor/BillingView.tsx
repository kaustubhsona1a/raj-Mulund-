import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Invoice, InvoiceItem } from '../../types';
import { PrintableInvoice } from '../common/PrintableInvoice';
import {
  Receipt,
  Search,
  Plus,
  Printer,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Trash2,
} from 'lucide-react';

interface BillingViewProps {
  onSelectPatient: (patientId: string) => void;
}

export const BillingView: React.FC<BillingViewProps> = ({ onSelectPatient }) => {
  const {
    invoices,
    createInvoice,
    updateInvoiceStatus,
    patients,
    clinicInfo,
    currentUser,
  } = useClinic();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Invoice Form
  const [newInvPatientId, setNewInvPatientId] = useState(patients[0]?.id || '');
  const [newInvDueDate, setNewInvDueDate] = useState('2026-10-10');
  const [newInvItems, setNewInvItems] = useState<InvoiceItem[]>([
    {
      id: 'inv-item-1',
      description: 'Comprehensive Orthopaedic Consultation (Dr. Kush Mukhi)',
      quantity: 1,
      unitPrice: clinicInfo.consultationFee,
      total: clinicInfo.consultationFee,
    },
  ]);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' ? true : inv.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const pendingRevenue = invoices
    .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const handleAddItem = () => {
    setNewInvItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        description: '',
        quantity: 1,
        unitPrice: 100,
        total: 100,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setNewInvItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: 'description' | 'quantity' | 'unitPrice',
    value: any
  ) => {
    setNewInvItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = (updated.quantity || 1) * (updated.unitPrice || 0);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const p = patients.find((pat) => pat.id === newInvPatientId);
    if (!p) return;

    const subtotal = newInvItems.reduce((acc, item) => acc + item.total, 0);
    const taxAmount = (subtotal * clinicInfo.taxRatePercent) / 100;
    const totalAmount = subtotal + taxAmount;

    const created = createInvoice({
      patientId: p.id,
      patientName: `${p.firstName} ${p.lastName}`,
      patientEmail: p.email,
      date: '2026-10-03',
      dueDate: newInvDueDate,
      items: newInvItems,
      subtotal,
      taxAmount,
      discountAmount: 0,
      totalAmount,
      status: 'Pending',
    });

    setShowCreateModal(false);
    setSelectedInvoice(created);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Billing & Invoices
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            Practice financial ledger, patient invoices, and payment tracking
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Generate Invoice</span>
        </button>
      </div>

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">Total Settled Revenue</span>
          <div className="text-2xl font-editorial font-semibold text-[#141213] tabular-nums">
            ${totalRevenue.toFixed(2)}
          </div>
          <p className="text-[11px] text-[#7B1E34]">
            {invoices.filter((i) => i.status === 'Paid').length} paid statement(s)
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">Pending & Outstanding</span>
          <div className="text-2xl font-editorial font-semibold text-[#C27803] tabular-nums">
            ${pendingRevenue.toFixed(2)}
          </div>
          <p className="text-[11px] text-[#C27803]">
            {invoices.filter((i) => i.status === 'Pending').length} pending payment
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#E5DDD1] shadow-2xs space-y-1">
          <span className="text-xs text-[#6B756F]">Consultation Fee Standard</span>
          <div className="text-2xl font-editorial font-semibold text-[#141213] tabular-nums">
            ${clinicInfo.consultationFee}
          </div>
          <p className="text-[11px] text-[#78827C]">
            Tax rate: {clinicInfo.taxRatePercent}% (Medical exemption)
          </p>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#828C86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice number or patient name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] uppercase font-semibold text-[#7D8781]">
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#FAF8F5] border border-[#DDD5C7] text-xs py-1.5 px-2 rounded-md outline-none text-[#1C221F]"
          >
            <option value="All">All Invoices</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        {filteredInvoices.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            No invoices found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#555F59] border-b border-[#E5DDD1]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Invoice #</th>
                  <th className="py-3 px-3 font-semibold">Patient</th>
                  <th className="py-3 px-3 font-semibold">Issue Date</th>
                  <th className="py-3 px-3 font-semibold">Due Date</th>
                  <th className="py-3 px-3 font-semibold">Amount</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFEAE1]">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#7B1E34]">
                      {inv.invoiceNumber}
                    </td>

                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => onSelectPatient(inv.patientId)}
                        className="font-semibold text-xs text-[#1C221F] hover:text-[#7B1E34] underline"
                      >
                        {inv.patientName}
                      </button>
                    </td>

                    <td className="py-3.5 px-3 text-[#5A645F] font-mono tabular-nums">
                      {inv.date}
                    </td>

                    <td className="py-3.5 px-3 text-[#5A645F] font-mono tabular-nums">
                      {inv.dueDate}
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-[#1C221F] font-mono tabular-nums">
                      ${inv.totalAmount.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          inv.status === 'Paid'
                            ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                            : inv.status === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.status !== 'Paid' && (
                          <button
                            onClick={() => updateInvoiceStatus(inv.id, 'Paid', 'Card')}
                            className="px-2.5 py-1 text-[11px] font-medium text-[#7B1E34] bg-[#FDF4F6] hover:bg-[#F9E8EC] border border-[#F2D5DC] rounded transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-2.5 py-1 text-[11px] font-medium text-[#1C221F] bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-[#DDD5C7] rounded transition-colors flex items-center gap-1"
                        >
                          <Printer className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <PrintableInvoice
              invoice={selectedInvoice}
              clinicInfo={clinicInfo}
              onClose={() => setSelectedInvoice(null)}
            />
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-lg my-8 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <h3 className="text-base font-editorial font-semibold text-[#141213]">
                Generate New Invoice
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Select Patient *
                  </label>
                  <select
                    value={newInvPatientId}
                    onChange={(e) => setNewInvPatientId(e.target.value)}
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
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newInvDueDate}
                    onChange={(e) => setNewInvDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  />
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#141213] uppercase tracking-wider text-[11px]">
                    Itemized Services
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-[#7B1E34] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {newInvItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E8E1D5] flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Service description"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white border border-[#DDD5C7] rounded text-[#1C221F] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                      className="w-20 px-2 py-1.5 bg-white border border-[#DDD5C7] rounded font-mono text-right"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EAE3D6] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-xs text-[#525B56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Create & View Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
