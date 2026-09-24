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
  const [filterType, setFilterType] = useState("All")

  const timelineEvents = [
    {
      group: "Today – 24 October 2026",
      items: [
        {
          time: "09:30",
          name: "Andi Pratama",
          id: "EMP-10231",
          action: "Onboarded as Senior Store Associate",
          dept: "Store Ops – Bandung 01 (3SECOND)",
          type: "join",
          icon: UserPlus,
          color: "text-emerald-600 bg-emerald-50",
        },
        {
          time: "08:45",
          name: "Maya Anggraeni",
          id: "EMP-10234",
          action: "Promoted to Regional VM Specialist",
          dept: "Visual Merchandising – Jakarta Hub (FAMO)",
          type: "promotion",
          icon: Award,
          color: "text-blue-600 bg-blue-50",
        },
      ],
    },
    {
      group: "Yesterday – 23 October 2026",
      items: [
        {
          time: "16:15",
          name: "Bambang Sugiarto",
          id: "EMP-07921",
          action: "Offboarding Clearance Completed (Resigned)",
          dept: "Warehouse Hub Supervisor – Surabaya Central Hub",
          type: "resigned",
          icon: UserMinus,
          color: "text-red-600 bg-red-50",
        },
        {
          time: "14:20",
          name: "Sinta Maharani",
          id: "EMP-10232",
          action: "Onboarded on Probation (Apparel Designer)",
          dept: "Fashion Design – HQ Bandung (GREENLIGHT)",
          type: "join",
          icon: UserPlus,
          color: "text-emerald-600 bg-emerald-50",
        },
        {
          time: "11:00",
          name: "42 Retail Associates",
          id: "BATCH-PKWT-98",
          action: "PKWT 1-Year Contract Renewal Signed",
          dept: "West Java Store Operations Roster",
          type: "renewal",
          icon: FileCheck,
          color: "text-purple-600 bg-purple-50",
        },
      ],
    },
    {
      group: "20 October 2026",
      items: [
        {
          time: "10:00",
          name: "Budi Hartono",
          id: "EMP-10233",
          action: "Transfer to Shift Supervisor Hub A",
          dept: "Logistics & Distribution – Cimahi",
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
            Recent Personnel Movements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time feed of onboardings, promotions, branch transfers,
            resignations & contract milestones
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
          {["All", "Joiners", "Promotions", "Renewals", "Exits"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 -lg transition-all ${
                filterType === f
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-white p-6 -2xl border border-slate-200 shadow-2xs space-y-6">
        {timelineEvents.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 -full bg-slate-900" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {group.group}
              </h3>
            </div>

            <div className="pl-5 border-l-2 border-slate-100 space-y-4">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-start gap-4 p-4 -xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all"
                >
                  <div className={`p-2.5 -xl shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/employees/${item.id}`}
                          className="font-bold text-slate-900 hover:text-red-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <span className="text-[11px] font-mono text-slate-400">
                          ({item.id})
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.time} WIB
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 mt-1">
                      {item.action}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.dept}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
