import React from 'react';
import { Invoice, ClinicInfo } from '../../types';
import { Printer, X } from 'lucide-react';

interface PrintableInvoiceProps {
  invoice: Invoice;
  clinicInfo: ClinicInfo;
  onClose?: () => void;
}

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({
  invoice,
  clinicInfo,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#E5DFD5] max-w-2xl mx-auto overflow-hidden printable-document">
      {/* Action Bar */}
      <div className="no-print bg-[#FCFBF9] border-b border-[#E8E2D6] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#7B1E34] font-semibold font-display">
            Hospital Invoice & Tax Receipt
          </span>
          <span className="text-xs text-[#82787C] font-mono">
            {invoice.invoiceNumber}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-md transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#82787C] hover:text-[#141213] rounded-md hover:bg-[#EBE4D8] transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-8 sm:p-10 text-[#141213]">
        {/* Clinic Header */}
        <div className="flex justify-between items-start border-b border-[#E8E1D5] pb-6 mb-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#141213]">
              {clinicInfo.name}
            </h2>
            <p className="text-xs text-[#7B1E34] font-semibold">{clinicInfo.tagline}</p>
            <p className="text-xs text-[#554D45] mt-1 font-sans">
              {clinicInfo.address}, {clinicInfo.city}
            </p>
            <p className="text-xs text-[#554D45] font-mono">{clinicInfo.phone}</p>
          </div>

          <div className="text-right">
            <span
              className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full mb-1 ${
                invoice.status === 'Paid'
                  ? 'bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC]'
                  : invoice.status === 'Pending'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {invoice.status}
            </span>
            <div className="text-xs font-mono text-[#554D45]">
              {invoice.invoiceNumber}
            </div>
            <div className="text-xs text-[#82787C] mt-0.5">
              Date: {invoice.date}
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#82787C] block mb-1">
            Billed To Patient
          </span>
          <div className="font-semibold text-sm text-[#141213]">
            {invoice.patientName}
          </div>
          {invoice.patientEmail && (
            <div className="text-xs text-[#554D45]">{invoice.patientEmail}</div>
          )}
        </div>

        {/* Items Table */}
        <table className="w-full text-xs text-left mb-6 border-b border-[#E8E1D5]">
          <thead>
            <tr className="border-b border-[#E8E1D5] text-[#554D45]">
              <th className="py-2 font-semibold">Service Description</th>
              <th className="py-2 text-center font-semibold">Qty</th>
              <th className="py-2 text-right font-semibold">Rate</th>
              <th className="py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2ECE3]">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 font-medium text-[#141213]">{item.description}</td>
                <td className="py-3 text-center text-[#554D45]">{item.quantity}</td>
                <td className="py-3 text-right text-[#554D45] font-mono tabular-nums">
                  ₹{item.unitPrice.toLocaleString('en-IN')}
                </td>
                <td className="py-3 text-right font-semibold text-[#141213] font-mono tabular-nums">
                  ₹{item.total.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between text-[#554D45]">
              <span>Subtotal:</span>
              <span className="font-mono tabular-nums">₹{invoice.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {invoice.taxAmount > 0 && (
              <div className="flex justify-between text-[#554D45]">
                <span>Tax:</span>
                <span className="font-mono tabular-nums">₹{invoice.taxAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-[#554D45]">
                <span>Discount:</span>
                <span className="font-mono tabular-nums">-₹{invoice.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold text-[#141213] border-t border-[#D9D0C3] pt-2">
              <span>Total Settled:</span>
              <span className="font-mono tabular-nums text-[#7B1E34] font-bold">₹{invoice.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            {invoice.paymentMethod && (
              <div className="text-[11px] text-[#82787C] text-right pt-1">
                Settled via {invoice.paymentMethod}
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-[11px] text-[#82787C] border-t border-[#E8E1D5] pt-4 text-center">
          Thank you for trusting Raj Hospital with your orthopaedic care. Billing Desk: {clinicInfo.email}
        </div>
      </div>
    </div>
  );
};
