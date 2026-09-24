import React, { useState } from "react"
import {
  AlertCircle,
  ShieldAlert,
  Scale,
  FileText,
  CheckCircle2,
  Search,
} from "lucide-react"
import { mockIRCases } from "../../data/mockData"

export const IndustrialRelationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "sp" | "fraud" | "bipartite"
  >("all")
  const [caseFilter, setCaseFilter] = useState("")

  const filteredCases = mockIRCases.filter((c) => {
    const matchSearch =
      c.employeeName.toLowerCase().includes(caseFilter.toLowerCase()) ||
      c.caseNo.toLowerCase().includes(caseFilter.toLowerCase()) ||
      c.store.toLowerCase().includes(caseFilter.toLowerCase())
    if (activeTab === "all") return matchSearch
    if (activeTab === "sp")
      return matchSearch && c.category === "Discipline / SP"
    if (activeTab === "fraud")
      return matchSearch && c.category === "Fraud / Shrinkage"
    if (activeTab === "bipartite")
      return matchSearch && c.category === "Bipartite"
    return matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Industrial Relations & Risk
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Disciplinary sanction records (SP), shrinkage/fraud audit, labor
            disputes & Disnaker bipartites
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
          {[
            { id: "all", label: "All Cases" },
            { id: "sp", label: "Discipline / SP" },
            { id: "fraud", label: "Fraud & Audit" },
            { id: "bipartite", label: "Bipartite / Legal" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 -lg transition-all ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Active Sanctions
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            18 Cases
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">
            12 SP-1, 4 SP-2, 2 SP-3
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Fraud & Shrinkage Audits
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">3 Cases</div>
          <span className="text-[11px] text-slate-500 font-medium">
            Under active audit investigation
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Estimated Financial Impact
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 40.5 Juta
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Rp 14.8M successfully recovered
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Bipartite / Disnaker
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">1 Case</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Mutually agreed resolution
          </span>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900">
            Incident Registry & Sanction Dossiers
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search case, employee, store..."
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 -lg placeholder-slate-400 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
              <tr>
                <th className="p-3">Case No. & Category</th>
                <th className="p-3">Employee Details</th>
                <th className="p-3">Store / Facility</th>
                <th className="p-3">Level / Sanction</th>
                <th className="p-3">Financial Value</th>
                <th className="p-3">Logged Date</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="font-mono font-bold text-slate-900">
                      {c.caseNo}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {c.category}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">
                      {c.employeeName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {c.position} • {c.employeeId}
                    </div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{c.store}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5  text-[10px] font-extrabold bg-red-100 text-red-700">
                      {c.level}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-800">
                    {c.financialImpact
                      ? `Rp ${c.financialImpact.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="p-3 text-slate-600 font-mono">
                    {c.startDate}
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`px-2 py-0.5 -full text-[10px] font-bold ${
                        c.status === "Resolved"
                          ? "bg-emerald-50 text-emerald-700"
                          : c.status === "Open"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {c.status}
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
