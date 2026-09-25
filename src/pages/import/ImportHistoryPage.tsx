import React from "react"
import {
  FileSpreadsheet,
} from "lucide-react"
import { Link } from "react-router-dom"

export const ImportHistoryPage: React.FC = () => {
  const historyItems = [
    {
      id: "IMP-2026-104",
      file: "rekrutmen_toko_okt2026.xlsx",
      type: "Roster Karyawan Ritel Toko",
      user: "Budi Santoso (Admin)",
      date: "24 Okt 2026 09:12",
      rows: 124,
      success: 124,
      failed: 0,
      status: "Berhasil",
    },
    {
      id: "IMP-2026-103",
      file: "biensi_logistik_shift_q3.xlsx",
      type: "Presensi & Roster Logistik",
      user: "Direktorat HC",
      date: "15 Okt 2026 14:30",
      rows: 2140,
      success: 2138,
      failed: 2,
      status: "Sebagian",
    },
    {
      id: "IMP-2026-102",
      file: "greenlight_design_intake.csv",
      type: "Karyawan Baru Kantor Pusat",
      user: "Budi Santoso (Admin)",
      date: "02 Okt 2026 10:05",
      rows: 18,
      success: 18,
      failed: 0,
      status: "Berhasil",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Riwayat Impor & Jejak Audit Data
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Log historis seluruh berkas spreadsheet massal yang telah diintegrasikan ke basis data personel
          </p>
        </div>

        <Link
          to="/import"
          className="px-4 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 rounded-xl shadow-xs"
        >
          Impor Berkas Baru
        </Link>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">ID Impor & Nama Berkas</th>
                <th className="p-3">Tipe Data</th>
                <th className="p-3">Diunggah Oleh</th>
                <th className="p-3">Tanggal & Waktu</th>
                <th className="p-3">Total Baris</th>
                <th className="p-3">Berhasil / Gagal</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">
                          {item.file}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {item.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">
                    {item.type}
                  </td>
                  <td className="p-3 text-slate-600 font-medium">
                    {item.user}
                  </td>
                  <td className="p-3 text-slate-500 font-mono">{item.date}</td>
                  <td className="p-3 font-bold text-slate-800">
                    {item.rows.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="text-emerald-600 font-bold">
                      {item.success}
                    </span>
                    <span className="text-slate-400"> / </span>
                    <span
                      className={
                        item.failed > 0
                          ? "text-red-600 font-bold"
                          : "text-slate-400"
                      }
                    >
                      {item.failed}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Berhasil"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
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
