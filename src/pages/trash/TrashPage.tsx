import React, { useState } from "react"
import { Trash2, RotateCcw, Check } from "lucide-react"

export const TrashPage: React.FC = () => {
  const [deletedItems, setDeletedItems] = useState([
    {
      id: "DEL-01",
      recordType: "Data Karyawan",
      name: "Hendra Gunawan (EMP-08819)",
      dept: "Store Ops – Bandung 03",
      deletedAt: "22 Okt 2026 11:20",
      deletedBy: "Budi Santoso",
    },
    {
      id: "DEL-02",
      recordType: "Unit Toko Master",
      name: "Pop-Up Booth – Trans Studio Mall (STR-BDO-99)",
      dept: "Operasional Ritel Komersial",
      deletedAt: "18 Okt 2026 15:40",
      deletedBy: "Administrator Sistem",
    },
  ])
  const [notification, setNotification] = useState<string | null>(null)

  const handleRestore = (id: string, name: string) => {
    setDeletedItems(deletedItems.filter((item) => item.id !== id))
    setNotification(`Berhasil memulihkan ${name} kembali ke basis data aktif!`)
    setTimeout(() => setNotification(null), 3500)
  }

  const handlePermanentDelete = (id: string) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus permanen data ini dari basis data BIENSI? Tindakan ini tidak dapat dibatalkan.",
      )
    ) {
      setDeletedItems(deletedItems.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tempat Sampah & Keamanan Penghapusan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data karyawan yang dihapus sementara (soft-delete), gerai toko nonaktif, dan arsip data master
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm("Kosongkan semua data di tempat sampah secara permanen?")) setDeletedItems([])
          }}
          disabled={deletedItems.length === 0}
          className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-red-600 rounded-xl disabled:opacity-40 transition-colors"
        >
          Kosongkan Tempat Sampah
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {deletedItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Trash2 className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-slate-700">Tempat Sampah Kosong</p>
            <p className="text-xs mt-1">
              Tidak ada data yang sedang menunggu penghapusan permanen.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
                <tr>
                  <th className="p-3">Rincian Data</th>
                  <th className="p-3">Klasifikasi</th>
                  <th className="p-3">Cakupan Organisasi</th>
                  <th className="p-3">Tanggal Dihapus</th>
                  <th className="p-3">Dihapus Oleh</th>
                  <th className="p-3 text-right">Aksi</th>
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
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Pulihkan</span>
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(item.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Permanen</span>
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
