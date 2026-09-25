import React, { useState } from "react"
import {
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
      name: "Operasional Toko Retail",
      head: "Direktur Komersial",
      status: "Aktif",
      count: 6850,
    },
    {
      code: "DIV-02",
      name: "Rantai Pasok & Logistik",
      head: "Head of SC",
      status: "Aktif",
      count: 2140,
    },
    {
      code: "DIV-03",
      name: "Kreatif Brand & Desain",
      head: "Creative Director",
      status: "Aktif",
      count: 1420,
    },
    {
      code: "DIV-04",
      name: "Digital & Omnichannel IT",
      head: "Chief Technology Officer",
      status: "Aktif",
      count: 210,
    },
    {
      code: "DIV-05",
      name: "Keuangan, Pajak & Legal",
      head: "Direktur Keuangan",
      status: "Aktif",
      count: 620,
    },
    {
      code: "DIV-06",
      name: "Human Capital & GA",
      head: "VP Human Capital",
      status: "Aktif",
      count: 430,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Pengelolaan Data Master
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola entitas organisasi, kode departemen, registri gerai ritel, dan arsitektur jabatan
          </p>
        </div>

        <button
          onClick={() => alert("Dialog Tambah Data Master Baru")}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#c8102e] hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Data Baru</span>
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: "division", label: "Divisi" },
          { id: "department", label: "Departemen" },
          { id: "position", label: "Posisi & Jabatan" },
          { id: "store", label: "Unit Toko (342)" },
          { id: "region", label: "Klaster Regional" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari data master..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            6 Divisi Dikonfigurasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">Kode Entitas</th>
                <th className="p-3">Nama Divisi</th>
                <th className="p-3">Pimpinan Pengawas</th>
                <th className="p-3">Jumlah Staf Aktif</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
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
                    {div.count.toLocaleString()} staf
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      {div.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50">
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
