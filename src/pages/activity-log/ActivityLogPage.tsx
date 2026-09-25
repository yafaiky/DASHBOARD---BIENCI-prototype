import React, { useState } from "react"
import { Search, Download } from "lucide-react"

export const ActivityLogPage: React.FC = () => {
  const [search, setSearch] = useState("")

  const logs = [
    {
      id: "LOG-8819",
      dateTime: "24 Sep 2026 08:42",
      user: "Budi Santoso (Admin)",
      module: "Data Karyawan",
      action: "Pembaruan Profil",
      record: "EMP-00125 (Maya Anggraeni)",
      ip: "192.168.10.42",
    },
    {
      id: "LOG-8818",
      dateTime: "24 Sep 2026 08:15",
      user: "Budi Santoso (Admin)",
      module: "Impor Data",
      action: "Ingesti Massal",
      record: "rekrutmen_toko_okt2026.xlsx (124 baris)",
      ip: "192.168.10.42",
    },
    {
      id: "LOG-8817",
      dateTime: "23 Sep 2026 17:02",
      user: "Direktorat HC",
      module: "Disiplin / Hubungan Industrial",
      action: "Penerbitan Sanksi",
      record: "SP-109/HC-IR/X/2026 (SP-2 Dimas Kurniawan)",
      ip: "10.20.1.18",
    },
    {
      id: "LOG-8816",
      dateTime: "23 Sep 2026 15:30",
      user: "Klaster HR Jawa Barat",
      module: "Kontrak PKWT",
      action: "Perpanjangan Kontrak",
      record: "BATCH-PKWT-98 (42 Karyawan Toko Jabar)",
      ip: "192.168.12.80",
    },
    {
      id: "LOG-8815",
      dateTime: "23 Sep 2026 11:20",
      user: "Offboarding Bakat",
      module: "Turnover Karyawan",
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
            Log Aktivitas & Jejak Audit Sistem
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pencatatan riwayat transaksi operasional, akses keamanan, perubahan data dan ekspor laporan secara tidak dapat diubah (immutable)
          </p>
        </div>

        <button
          onClick={() => alert("Mengekspor log audit keamanan lengkap ke CSV...")}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Ekspor Log Audit</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari aktivitas berdasarkan nama pengguna, aksi, modul, atau data terkait..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">ID Log & Waktu Kejadian</th>
                <th className="p-3">Pengguna / Aktor</th>
                <th className="p-3">Modul</th>
                <th className="p-3">Aksi</th>
                <th className="p-3">Data yang Terpengaruh</th>
                <th className="p-3 text-right">Alamat IP</th>
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
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
