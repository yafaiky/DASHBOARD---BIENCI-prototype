import React, { useState } from "react"
import {
  Clock,
  UserPlus,
  Award,
  ArrowRightLeft,
  FileCheck,
  UserMinus,
  ShieldAlert,
} from "lucide-react"
import { Link } from "react-router-dom"

export const RecentEmployeesPage: React.FC = () => {
  const [filterType, setFilterType] = useState("Semua")

  const timelineEvents = [
    {
      group: "Hari Ini – 24 Oktober 2026",
      items: [
        {
          time: "09:30",
          name: "Andi Pratama",
          id: "EMP-10231",
          action: "Onboarding sebagai Senior Store Associate",
          dept: "Store Ops – Bandung 01 (3SECOND)",
          type: "join",
          icon: UserPlus,
          color: "text-emerald-600 bg-emerald-50",
        },
        {
          time: "08:45",
          name: "Maya Anggraeni",
          id: "EMP-10234",
          action: "Promosi Jabatan sebagai Regional VM Specialist",
          dept: "Visual Merchandising – Jakarta Hub (FAMO)",
          type: "promotion",
          icon: Award,
          color: "text-blue-600 bg-blue-50",
        },
      ],
    },
    {
      group: "Kemarin – 23 Oktober 2026",
      items: [
        {
          time: "16:15",
          name: "Bambang Sugiarto",
          id: "EMP-07921",
          action: "Penyelesaian Clearance Keluar (Resign)",
          dept: "Supervisor Hub Gudang – Surabaya Central Hub",
          type: "resigned",
          icon: UserMinus,
          color: "text-red-600 bg-red-50",
        },
        {
          time: "14:20",
          name: "Sinta Maharani",
          id: "EMP-10232",
          action: "Mulai Masa Percobaan (Desainer Apparel)",
          dept: "Desain Fashion – HQ Bandung (GREENLIGHT)",
          type: "join",
          icon: UserPlus,
          color: "text-emerald-600 bg-emerald-50",
        },
        {
          time: "11:00",
          name: "42 Staf Toko Retail",
          id: "BATCH-PKWT-98",
          action: "Penandatanganan Perpanjangan PKWT 1 Tahun",
          dept: "Roster Toko Wilayah Jawa Barat",
          type: "renewal",
          icon: FileCheck,
          color: "text-purple-600 bg-purple-50",
        },
      ],
    },
    {
      group: "20 Oktober 2026",
      items: [
        {
          time: "10:00",
          name: "Budi Hartono",
          id: "EMP-10233",
          action: "Mutasi Cabang ke Supervisor Shift Hub A",
          dept: "Logistik & Distribusi – Cimahi",
          type: "transfer",
          icon: ArrowRightLeft,
          color: "text-amber-600 bg-amber-50",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Aktivitas Mutasi & Personalia Terbaru
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Linimasa waktu nyata penerimaan karyawan baru, promosi, mutasi toko, dan perpanjangan kontrak PKWT.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          {["Semua", "Penerimaan", "Promosi", "Mutasi", "Resign"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterType === t
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline view */}
      <div className="space-y-6">
        {timelineEvents.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e]" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {group.group}
              </h3>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {group.items.map((item, idx) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-slate-400 w-12 shrink-0">
                        {item.time}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {item.name}
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">
                            {item.id}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold mt-0.5">
                          {item.action}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.dept}
                        </p>
                      </div>
                    </div>

                    <div>
                      {item.id.startsWith("EMP") && (
                        <Link
                          to={`/employees/${item.id}`}
                          className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Lihat Detail
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
