import React, { useState } from "react"
import {
  CalendarCheck,
  UserCheck,
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react"
import Chart from "react-apexcharts"

export const AttendancePage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("October 2026")

  // Attendance 3-year trend
  const attendanceTrendOptions: ApexCharts.ApexOptions = {
    chart: { type: "area", height: 300, toolbar: { show: false } },
    colors: ["#16A34A", "#2563EB", "#F59E0B"],
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: { min: 94, max: 100, labels: { formatter: (v) => `${v}%` } },
    grid: { borderColor: "#F1F5F9" },
  }
  const attendanceTrendSeries = [
    {
      name: "2026 (Current)",
      data: [97.8, 98.1, 98.4, 98.0, 98.6, 98.5, 98.7, 98.9, 98.8, 98.2],
    },
    {
      name: "2025",
      data: [96.5, 96.9, 97.2, 97.0, 97.4, 97.6, 97.8, 98.0, 97.9, 97.7],
    },
    {
      name: "2024",
      data: [95.2, 95.8, 96.1, 96.0, 96.4, 96.8, 96.7, 97.1, 97.0, 96.9],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Attendance & Shift Roster
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time biometric attendance, store shift fulfillment, sick leaves
            & unexcused absence analytics
          </p>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 -xl shadow-2xs"
        >
          <option>October 2026</option>
          <option>September 2026</option>
          <option>August 2026</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Attendance Rate
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">98.2%</div>
          <span className="text-[11px] text-slate-500 font-medium">
            11,705 staff present
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Sick Leave
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">0.9%</div>
          <span className="text-[11px] text-slate-500 font-medium">
            108 doctors note
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Annual Leave
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">0.6%</div>
          <span className="text-[11px] text-slate-500 font-medium">
            72 approved leaves
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Permission / Dispensation
          </span>
          <div className="text-2xl font-black text-purple-600 mt-1">0.2%</div>
          <span className="text-[11px] text-slate-500 font-medium">
            24 formal permits
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Alpha / Unexcused
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">0.1%</div>
          <span className="text-[11px] text-red-500 font-semibold">
            11 unresolved cases
          </span>
        </div>
      </div>

      {/* 3-Year Trend Comparison */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Attendance Trend Progression (2024 – 2026)
            </h3>
            <p className="text-xs text-slate-500">
              Continuous discipline improvements across retail branches and
              central logistics
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 -full bg-[#16A34A]" /> 2026
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 -full bg-[#2563EB]" /> 2025
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 -full bg-[#F59E0B]" /> 2024
            </span>
          </div>
        </div>
        <div className="pt-3">
          <Chart
            options={attendanceTrendOptions}
            series={attendanceTrendSeries}
            type="area"
            height={300}
          />
        </div>
      </div>
    </div>
  )
}
