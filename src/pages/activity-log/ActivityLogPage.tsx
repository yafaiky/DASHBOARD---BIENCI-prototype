import React, { useState } from "react"
import { ListTodo, Search, Download, Filter } from "lucide-react"

export const ActivityLogPage: React.FC = () => {
  const [search, setSearch] = useState("")

  const logs = [
    {
      id: "LOG-8819",
      dateTime: "24 Sep 2026 08:42",
      user: "Budi Santoso (Admin)",
      module: "Employee Data",
      action: "Updated",
      record: "EMP-00125 (Maya Anggraeni)",
      ip: "192.168.10.42",
    },
    {
      id: "LOG-8818",
      dateTime: "24 Sep 2026 08:15",
      user: "Budi Santoso (Admin)",
      module: "Data Import",
      action: "Batch Ingestion",
      record: "store_recruitment_oct2026.xlsx (124 rows)",
      ip: "192.168.10.42",
    },
    {
      id: "LOG-8817",
      dateTime: "23 Sep 2026 17:02",
      user: "HR Directorate",
      module: "Discipline / IR",
      action: "Issue Sanction",
      record: "SP-109/HC-IR/X/2026 (SP-2 Dimas Kurniawan)",
      ip: "10.20.1.18",
    },
    {
      id: "LOG-8816",
      dateTime: "23 Sep 2026 15:30",
      user: "West Java HR Cluster",
      module: "Contract PKWT",
      action: "Renewed",
      record: "BATCH-PKWT-98 (42 Associates West Java)",
      ip: "192.168.12.80",
    },
    {
      id: "LOG-8815",
      dateTime: "23 Sep 2026 11:20",
      user: "Talent Offboarding",
      module: "Turnover",
      action: "Exit Clearance",
      record: "EMP-07921 (Bambang Sugiarto)",
      ip: "10.20.4.105",
    },
  ]

  const filteredLogs = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.module.toLowerCase().includes(search.toLowerCase()) ||
      l.record.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            System Audit & Activity Logs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable tracking of all operational transactions, security access,
            data edits and exports
          </p>
        </div>

        <button
          onClick={() => alert("Exporting full security audit log to CSV...")}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 -xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 -2xl border border-slate-200 shadow-2xs">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search activity by user, action, module, or record..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 -xl focus:outline-hidden"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white -2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">Log ID & Timestamp</th>
                <th className="p-3">Actor / User</th>
                <th className="p-3">Module</th>
                <th className="p-3">Action</th>
                <th className="p-3">Affected Record</th>
                <th className="p-3 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-900">
                      {log.dateTime}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {log.id}
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {log.user}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5  text-[10px] font-bold bg-slate-100 text-slate-700">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-900">{log.action}</td>
                  <td className="p-3 font-mono text-slate-600">{log.record}</td>
                  <td className="p-3 text-right font-mono text-slate-400">
                    {log.ip}
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
