import React, { useState } from "react"
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Clock,
  CheckCircle,
} from "lucide-react"
import { mockComplianceItems } from "../../data/mockData"

export const CompliancePage: React.FC = () => {
  const [filterArea, setFilterArea] = useState("All")

  const filteredItems =
    filterArea === "All"
      ? mockComplianceItems
      : mockComplianceItems.filter((i) =>
          i.area.toLowerCase().includes(filterArea.toLowerCase()),
        )

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Legal & Statutory Compliance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kemnaker WLKP, BPJS Ketenagakerjaan & Kesehatan, Peraturan
            Perusahaan (PP), and retail facility licensing
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
          {["All", "BPJS", "WLKP", "Peraturan Perusahaan"].map((item) => (
            <button
              key={item}
              onClick={() => setFilterArea(item)}
              className={`px-3 py-1.5 -lg transition-all ${
                filterArea === item
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Compliant Items
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            28 Areas
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            93.3% compliance score
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Expiring in ≤ 30 Days
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">1 Item</div>
          <span className="text-[11px] text-amber-600 font-semibold">
            WLKP 2026 Submission
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Overdue / Expired
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">1 Item</div>
          <span className="text-[11px] text-red-600 font-semibold">
            Store Surabaya SLF K3
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Audit Status
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">Pass</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Disnaker Bandung Validated
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Mandatory Statutory & Corporate Compliance Items
          </h3>
          <span className="text-xs text-slate-500">Real-time status</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
              <tr>
                <th className="p-3">Compliance Area</th>
                <th className="p-3">Item Description</th>
                <th className="p-3">Entity Scope</th>
                <th className="p-3">Valid Until</th>
                <th className="p-3">Timeline</th>
                <th className="p-3">PIC / Department</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 font-bold text-slate-900">{item.area}</td>
                  <td className="p-3 text-slate-700 font-medium">
                    {item.name}
                  </td>
                  <td className="p-3 text-slate-500">{item.entity}</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    {item.expiryDate}
                  </td>
                  <td className="p-3">
                    {item.daysRemaining > 0 ? (
                      <span className="text-slate-600 font-semibold">
                        {item.daysRemaining} days remaining
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        {Math.abs(item.daysRemaining)} days overdue
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600">{item.assignedTo}</td>
                  <td className="p-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 -full text-[10px] font-bold ${
                        item.status === "Compliant"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "Expiring"
                            ? "bg-amber-50 text-amber-700"
                            : item.status === "Expired"
                              ? "bg-red-50 text-red-700"
                              : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status === "Compliant" && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {item.status === "Expiring" && (
                        <Clock className="w-3 h-3" />
                      )}
                      {item.status === "Expired" && (
                        <XCircle className="w-3 h-3" />
                      )}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
