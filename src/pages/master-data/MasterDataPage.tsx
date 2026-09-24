import React, { useState } from "react"
import {
  Database,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
} from "lucide-react"

export const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "division" | "department" | "position" | "store" | "region"
  >("division")
  const [searchTerm, setSearchTerm] = useState("")

  const masterDivisions = [
    {
      code: "DIV-01",
      name: "Retail Store Operations",
      head: "Direktur Komersil",
      status: "Active",
      count: 6850,
    },
    {
      code: "DIV-02",
      name: "Supply Chain & Logistics",
      head: "Head of SC",
      status: "Active",
      count: 2140,
    },
    {
      code: "DIV-03",
      name: "Creative Brand & Design",
      head: "Creative Director",
      status: "Active",
      count: 1420,
    },
    {
      code: "DIV-04",
      name: "Digital & Omnichannel IT",
      head: "Chief Technology Officer",
      status: "Active",
      count: 210,
    },
    {
      code: "DIV-05",
      name: "Finance, Tax & Legal",
      head: "Finance Director",
      status: "Active",
      count: 620,
    },
    {
      code: "DIV-06",
      name: "Human Capital & GA",
      head: "VP Human Capital",
      status: "Active",
      count: 430,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Master Data Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain organizational entities, department codes, retail store
            registries & job architectures
          </p>
        </div>

        <button
          onClick={() => alert("Add New Master Record dialog")}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#c8102e] hover:bg-red-700 text-white -xl text-xs font-bold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: "division", label: "Divisions" },
          { id: "department", label: "Departments" },
          { id: "position", label: "Positions & Job Roles" },
          { id: "store", label: "Store Units (342)" },
          { id: "region", label: "Regional Clusters" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 -xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white -2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search master records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 -xl focus:outline-hidden"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            6 Divisions Configured
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">Entity Code</th>
                <th className="p-3">Division Name</th>
                <th className="p-3">Supervisory Head</th>
                <th className="p-3">Active Headcount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {masterDivisions.map((div) => (
                <tr
                  key={div.code}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-slate-700">
                    {div.code}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{div.name}</td>
                  <td className="p-3 text-slate-600 font-medium">{div.head}</td>
                  <td className="p-3 font-bold text-slate-800">
                    {div.count.toLocaleString()} employees
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 -full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      {div.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="p-1 -md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 -md text-slate-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
