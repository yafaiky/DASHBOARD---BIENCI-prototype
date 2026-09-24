import React, { useState } from "react"
import { Trash2, RotateCcw, AlertTriangle, Check } from "lucide-react"

export const TrashPage: React.FC = () => {
  const [deletedItems, setDeletedItems] = useState([
    {
      id: "DEL-01",
      recordType: "Employee Record",
      name: "Hendra Gunawan (EMP-08819)",
      dept: "Store Ops – Bandung 03",
      deletedAt: "22 Oct 2026 11:20",
      deletedBy: "Budi Santoso",
    },
    {
      id: "DEL-02",
      recordType: "Master Store Unit",
      name: "Pop-Up Booth – Trans Studio Mall (STR-BDO-99)",
      dept: "Commercial Retail Operations",
      deletedAt: "18 Oct 2026 15:40",
      deletedBy: "System Administrator",
    },
  ])
  const [notification, setNotification] = useState<string | null>(null)

  const handleRestore = (id: string, name: string) => {
    setDeletedItems(deletedItems.filter((item) => item.id !== id))
    setNotification(`Successfully restored ${name} back to live database!`)
    setTimeout(() => setNotification(null), 3500)
  }

  const handlePermanentDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to permanently purge this record from BIENSI database? This cannot be undone.",
      )
    ) {
      setDeletedItems(deletedItems.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-semibold -xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Recycle Bin & Purge Safety
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Soft-deleted personnel entries, retired store units, and archived
            master records
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm("Purge all items permanently?")) setDeletedItems([])
          }}
          disabled={deletedItems.length === 0}
          className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-red-600 -xl disabled:opacity-40 transition-colors"
        >
          Empty Trash Can
        </button>
      </div>

      {/* Table */}
      <div className="bg-white -2xl border border-slate-200 shadow-2xs overflow-hidden">
        {deletedItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Trash2 className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-slate-700">Trash is Empty</p>
            <p className="text-xs mt-1">
              No soft-deleted records currently pending permanent purge.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
                <tr>
                  <th className="p-3">Record Details</th>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Organizational Scope</th>
                  <th className="p-3">Deleted Date</th>
                  <th className="p-3">Deleted By</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deletedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 font-bold text-slate-900">
                      {item.name}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5  text-[10px] font-bold bg-slate-100 text-slate-700">
                        {item.recordType}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{item.dept}</td>
                    <td className="p-3 text-slate-500 font-mono">
                      {item.deletedAt}
                    </td>
                    <td className="p-3 text-slate-600">{item.deletedBy}</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleRestore(item.id, item.name)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold -lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore</span>
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(item.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold -lg bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Purge</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
