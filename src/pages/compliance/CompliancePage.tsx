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
  const [filterArea, setFilterArea] = useState("Semua")

  const filteredItems =
    filterArea === "Semua"
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
            Kepatuhan Hukum & Legalitas Ketenagakerjaan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pemantauan WLKP Kemnaker, BPJS Ketenagakerjaan & Kesehatan, Peraturan Perusahaan (PP), serta sertifikasi K3 kelistrikan & genset toko.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          {["Semua", "BPJS", "WLKP", "Peraturan Perusahaan"].map((item) => (
            <button
              key={item}
              onClick={() => setFilterArea(item)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
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
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Kepatuhan Terpenuhi
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            28 Area
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Skor kepatuhan 93.3%
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Jatuh Tempo ≤ 30 Hari
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">1 Butir</div>
          <span className="text-[11px] text-amber-600 font-semibold">
            Pelaporan WLKP 2026
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Lewat Jatuh Tempo / Kadaluarsa
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">1 Butir</div>
          <span className="text-[11px] text-red-600 font-semibold">
            Riksa Uji K3 Toko Surabaya
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Status Audit Disnaker
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">Lolos</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Tervalidasi Disnaker Bandung
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Daftar Instrumen Kepatuhan Wajib Perusahaan & Gerai Ritel
          </h3>
          <span className="text-xs text-slate-500">Status Waktu Nyata</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
              <tr>
                <th className="p-3">Area Kepatuhan</th>
                <th className="p-3">Deskripsi Instrumen</th>
                <th className="p-3">Entitas / Cakupan</th>
                <th className="p-3">Berlaku Hingga</th>
                <th className="p-3">Tenggat Waktu</th>
                <th className="p-3">PIC / Departemen</th>
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
                        Sisa {item.daysRemaining} hari
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        Terlambat {Math.abs(item.daysRemaining)} hari
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600">{item.assignedTo}</td>
                  <td className="p-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Patuh</span>
                        </>
                      )}
                      {item.status === "Expiring" && (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Segera Habis</span>
                        </>
                      )}
                      {item.status === "Expired" && (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Kadaluarsa</span>
                        </>
                      )}
                      {item.status === "Missing" && <span>Belum Ada</span>}
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
