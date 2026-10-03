import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { InventoryItem } from '../../types';
import {
  Package,
  AlertTriangle,
  Clock,
  Search,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { inventory, updateInventoryStock } = useClinic();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === 'All' ? true : item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStockLevel);
  const expiringSoonItems = inventory.filter((item) => item.expiryDate.startsWith('2026-11') || item.expiryDate.startsWith('2026-12'));

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Clinical Supplies & Inventory
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            Diagnostic kits, sterile supplies, emergency medicines, and storage tracking
          </p>
        </div>
      </div>

      {/* Alert Notices */}
      {(lowStockItems.length > 0 || expiringSoonItems.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {lowStockItems.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-900 block">
                  {lowStockItems.length} Item(s) Below Minimum Stock Level
                </span>
                <span className="text-amber-800">
                  {lowStockItems.map((i) => i.name).join(', ')}
                </span>
              </div>
            </div>
          )}

          {expiringSoonItems.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-3">
              <Clock className="w-4 h-4 text-rose-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-rose-900 block">
                  {expiringSoonItems.length} Item(s) Expiring Q4 2026
                </span>
                <span className="text-rose-800">
                  {expiringSoonItems.map((i) => i.name).join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E5DDD1] shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#828C86] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items or storage bay location..."
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
            <option value="Medicines">Medicines</option>
            <option value="Consumables">Consumables</option>
            <option value="Diagnostic">Diagnostic</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-[#555F59] border-b border-[#E5DDD1]">
              <tr>
                <th className="py-3 px-4 font-semibold">Supply Item</th>
                <th className="py-3 px-3 font-semibold">Location</th>
                <th className="py-3 px-3 font-semibold">Expiry Date</th>
                <th className="py-3 px-3 font-semibold">Batch Number</th>
                <th className="py-3 px-3 text-center font-semibold">Current Stock</th>
                <th className="py-3 px-4 text-right font-semibold">Stock Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEAE1]">
              {filteredInventory.map((item) => {
                const isLow = item.currentStock <= item.minStockLevel;

                return (
                  <tr key={item.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs text-[#1C221F]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#69726D]">
                        {item.category} · Min threshold: {item.minStockLevel} {item.unit}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-[#505A54]">
                      {item.location}
                    </td>

                    <td className="py-3.5 px-3 font-mono tabular-nums text-[#505A54]">
                      {item.expiryDate}
                    </td>

                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#717B75]">
                      {item.batchNumber}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block font-mono font-semibold px-2 py-0.5 rounded text-xs ${
                          isLow
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-[#FDF4F6] text-[#7B1E34]'
                        }`}
                      >
                        {item.currentStock} {item.unit}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() =>
                            updateInventoryStock(
                              item.id,
                              Math.max(0, item.currentStock - 1)
                            )
                          }
                          className="p-1 rounded bg-[#FAF8F5] hover:bg-[#EFE9DF] border border-[#DDD5C7] text-[#333C37]"
                          title="Decrease stock by 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            updateInventoryStock(item.id, item.currentStock + 1)
                          }
                          className="p-1 rounded bg-[#FAF8F5] hover:bg-[#EFE9DF] border border-[#DDD5C7] text-[#333C37]"
                          title="Increase stock by 1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
