import React, { useState } from "react"
import {
  AlertCircle,
  ShieldAlert,
  Scale,
  FileText,
  CheckCircle2,
  Search,
  DollarSign,
  Building,
  UserX
} from "lucide-react"

interface RichIRCase {
  id: string
  caseNo: string
  employeeName: string
  position: string
  store: string
  category: "Disiplin / SP" | "Fraud & Audit" | "Bipartit / Disnaker"
  level: "SP-1" | "SP-2" | "SP-3" | "PHK" | "Mediasi"
  financialImpact?: number
  reason: string
  startDate: string
  status: "Selesai" | "Proses Mediasi" | "Penyidikan" | "Aktif"
}

// Data kasus nyata dari sheet Rekap SP, Fraud Audit, dan Bipartit Excel
const actualIRCases: RichIRCase[] = [
  {
    id: "IR-2026-01",
    caseNo: "AUD-FR/JAMBI/2025",
    employeeName: "MUHAMMAD HADY PRAYOGA S",
    position: "Cashier",
    store: "FS JAMBI",
    category: "Fraud & Audit",
    level: "PHK",
    financialImpact: 43461000,
    reason: "Penggelapan uang penjualan toko untuk keperluan pribadi (Pinjol)",
    startDate: "15 Okt 2025",
    status: "Selesai"
  },
  {
    id: "IR-2026-02",
    caseNo: "AUD-FR/SOLO/2026",
    employeeName: "FUNGKY ELLY PAMUNGKAS",
    position: "Store Leader",
    store: "FS SOLO",
    category: "Fraud & Audit",
    level: "PHK",
    financialImpact: 51789150,
    reason: "Selisih kehilangan 399 pcs barang temuan audit internal & pemakaian modal",
    startDate: "26 Jun 2026",
    status: "Selesai"
  },
  {
    id: "IR-2026-03",
    caseNo: "AUD-FR/MKS/2026",
    employeeName: "ANGGA PRATAMA WIJAYANTO",
    position: "Store Leader",
    store: "FS PERINTIS MKS",
    category: "Fraud & Audit",
    level: "PHK",
    financialImpact: 51545182,
    reason: "Selisih 265 pcs barang & pemakaian uang modal toko Rp 1.344.682",
    startDate: "14 Mei 2026",
    status: "Selesai"
  },
  {
    id: "IR-2026-04",
    caseNo: "BP-DSN/LIPPO/2025",
    employeeName: "FERRY DARMAWAN",
    position: "Store Leader",
    store: "SHOWROOM LIPPO CIKARANG MALL",
    category: "Bipartit / Disnaker",
    level: "Mediasi",
    financialImpact: 12500000,
    reason: "Mediasi Disnaker terkait perselisihan penutupan gerai & kompensasi",
    startDate: "Mei 2025",
    status: "Selesai"
  },
  {
    id: "IR-2026-05",
    caseNo: "BP-DSN/JATOS/2025",
    employeeName: "CHIKA AURELIA PERMATASARI",
    position: "Store Leader",
    store: "SHOWROOM JATOS BANDUNG",
    category: "Bipartit / Disnaker",
    level: "Mediasi",
    financialImpact: 14200000,
    reason: "Mediasi Disnaker bipartit hak ketenagakerjaan pasca relokasi",
    startDate: "Mei 2025",
    status: "Selesai"
  },
  {
    id: "IR-2026-06",
    caseNo: "BP-DSN/SOREANG/2026",
    employeeName: "PATRIANA",
    position: "Store Leader",
    store: "FS SOREANG",
    category: "Bipartit / Disnaker",
    level: "Mediasi",
    financialImpact: 9800000,
    reason: "Perundingan Bipartit internal terkait evaluasi kedisiplinan shift",
    startDate: "Sep 2026",
    status: "Proses Mediasi"
  },
  {
    id: "IR-2026-07",
    caseNo: "SP-PLK/01/2026",
    employeeName: "TRI EKA HARYANTO",
    position: "Sales Advisor",
    store: "FS PALANGKARAYA",
    category: "Disiplin / SP",
    level: "SP-2",
    financialImpact: 0,
    reason: "Pelanggaran tata tertib shift kerja dan presensi toko",
    startDate: "02 Feb 2026",
    status: "Aktif"
  },
  {
    id: "IR-2026-08",
    caseNo: "SP-PLK/02/2026",
    employeeName: "SUDARMAWAN",
    position: "Sales Advisor",
    store: "FS PALANGKARAYA",
    category: "Disiplin / SP",
    level: "SP-3",
    financialImpact: 0,
    reason: "Kelalaian berulang dalam stock opname harian display toko",
    startDate: "08 Jun 2026",
    status: "Aktif"
  },
  {
    id: "IR-2026-09",
    caseNo: "SP-KNG/01/2026",
    employeeName: "MAYA AYU LESTARI",
    position: "Cashier",
    store: "FS KUNINGAN",
    category: "Disiplin / SP",
    level: "SP-2",
    financialImpact: 0,
    reason: "Ketidaksesuaian laporan modal kasir non tata tertib closing",
    startDate: "05 Jun 2026",
    status: "Aktif"
  }
]

export const IndustrialRelationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "sp" | "fraud" | "bipartite">("all")
  const [caseFilter, setCaseFilter] = useState("")

  const filteredCases = actualIRCases.filter((c) => {
    const matchSearch =
      c.employeeName.toLowerCase().includes(caseFilter.toLowerCase()) ||
      c.caseNo.toLowerCase().includes(caseFilter.toLowerCase()) ||
      c.store.toLowerCase().includes(caseFilter.toLowerCase()) ||
      c.reason.toLowerCase().includes(caseFilter.toLowerCase())

    if (activeTab === "all") return matchSearch
    if (activeTab === "sp") return matchSearch && c.category === "Disiplin / SP"
    if (activeTab === "fraud") return matchSearch && c.category === "Fraud & Audit"
    if (activeTab === "bipartite") return matchSearch && c.category === "Bipartit / Disnaker"
    return matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Hubungan Industrial & Manajemen Risiko
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pencatatan sanksi disiplin (SP 1-3), investigasi audit fraud/shrinkage, perselisihan kerja bipartit & mediasi Disnaker.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          {[
            { id: "all", label: "Semua Kasus" },
            { id: "sp", label: "Disiplin / SP" },
            { id: "fraud", label: "Fraud & Audit" },
            { id: "bipartite", label: "Bipartit & Disnaker" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
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
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Sanksi Aktif (SP)
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            31 Kasus
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">
            18 SP-1, 12 SP-2, 1 SP-3 (2026)
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Audit Fraud & Selisih
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">
            111 Kasus
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Rekap audit toko 2022 - 2026
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Nilai Kerugian Teridentifikasi
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 1.18 M
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Sebagian besar berhasil diselesaikan
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Bipartit & Mediasi Disnaker
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            25 Kasus
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            21 selesai, 4 dalam proses
          </span>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Daftar Insiden Disiplin, Kasus Fraud & Bipartit Ketenagakerjaan
            </h3>
            <p className="text-xs text-slate-500">
              Data kasus tercatat resmi dalam arsip Disiplin & Hubungan Industrial PT Biensi Fesyenindo.
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kasus, karyawan, toko, alasan..."
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-hidden w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
              <tr>
                <th className="p-3">No. Kasus & Kategori</th>
                <th className="p-3">Nama Karyawan & Posisi</th>
                <th className="p-3">Unit Toko / Cabang</th>
                <th className="p-3">Tingkat Sanksi</th>
                <th className="p-3">Dampak Kerugian (Rp)</th>
                <th className="p-3">Keterangan / Alasan Pelanggaran</th>
                <th className="p-3">Tanggal</th>
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
                      {c.position}
                    </div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{c.store}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      c.level === "PHK"
                        ? "bg-red-100 text-red-800"
                        : c.level.startsWith("SP")
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {c.level}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-slate-800">
                    {c.financialImpact && c.financialImpact > 0
                      ? `Rp ${c.financialImpact.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="p-3 text-[11px] text-slate-600 max-w-xs">
                    {c.reason}
                  </td>
                  <td className="p-3 text-slate-600 font-mono whitespace-nowrap">
                    {c.startDate}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === "Selesai"
                          ? "bg-emerald-50 text-emerald-700"
                          : c.status === "Penyidikan"
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
