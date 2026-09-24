import React, { useState } from "react"
import {
  TrendingDown,
  UserMinus,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react"
import Chart from "react-apexcharts"

export const TurnoverPage: React.FC = () => {
  const [subTab, setSubTab] = useState<
    "overview" | "voluntary" | "non-voluntary" | "contract-expiry"
  >("overview")

  // Turnover trend chart
  const trendOptions: ApexCharts.ApexOptions = {
    chart: { type: "area", height: 280, toolbar: { show: false } },
    colors: ["#DC2626", "#F59E0B"],
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
    grid: { borderColor: "#F1F5F9" },
  }
  const trendSeries = [
    {
      name: "Voluntary Resignation",
      data: [52, 58, 64, 60, 71, 65, 60, 68, 75, 62],
    },
    {
      name: "Contract End / Non-Voluntary",
      data: [23, 24, 26, 28, 31, 30, 29, 24, 34, 34],
    },
  ]

  // Turnover by position
  const positionOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 280, toolbar: { show: false } },
    colors: ["#172B4D"],
    plotOptions: { bar: { horizontal: true, borderRadius: 5 } },
    xaxis: {
      categories: [
        "Cashier",
        "Sales Advisor",
        "Store Leader",
        "Visual Merchandiser",
        "Area Store Manager",
        "Warehouse Helper",
      ],
    },
    grid: { borderColor: "#F1F5F9" },
  }
  const positionSeries = [
    { name: "Departures (YTD)", data: [184, 156, 42, 28, 12, 35] },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Turnover & Attrition Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Voluntary resignations, retail attrition velocity, contract
            expirations & offboarding analytics
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
          {[
            { id: "overview", label: "Overview" },
            { id: "voluntary", label: "Voluntary" },
            { id: "non-voluntary", label: "Non-Voluntary / PHK" },
            { id: "contract-expiry", label: "Contract Expiry" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`px-3 py-1.5 -lg transition-all ${
                subTab === tab.id
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
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Monthly Turnover Rate
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">0.77%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            ↓ -12.0% dropped vs Sep
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Departures
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            96 staff
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            October 2026 total
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Voluntary Resignation
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            62 staff
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            64.5% of total attrition
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Annualized Turnover
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">9.2%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Benchmark Indonesia Retail: 18%
          </span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Monthly Turnover Breakdown (2026)
            </h3>
            <span className="text-xs text-slate-400">Headcount</span>
          </div>
          <Chart
            options={trendOptions}
            series={trendSeries}
            type="area"
            height={280}
          />
        </div>

        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Turnover Velocity by Retail Position
            </h3>
            <span className="text-xs text-slate-400">Store Roles</span>
          </div>
          <Chart
            options={positionOptions}
            series={positionSeries}
            type="bar"
            height={280}
          />
        </div>
      </div>

      {/* Exit Interviews & Offboarding Roster */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recent Offboarded Associates (Exit Logs)
            </h3>
            <p className="text-xs text-slate-500">
              Documented reason of leaving & offboarding status
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Showing last 5 completed exits
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100">
              <tr>
                <th className="p-3">Associate</th>
                <th className="p-3">Position</th>
                <th className="p-3">Store / Hub</th>
                <th className="p-3">Exit Reason</th>
                <th className="p-3">Exit Date</th>
                <th className="p-3">Tenure</th>
                <th className="p-3 text-right">Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-900">
                  Bambang Sugiarto
                </td>
                <td className="p-3 text-slate-600">Warehouse Hub Supervisor</td>
                <td className="p-3 text-slate-600">Surabaya Central Hub</td>
                <td className="p-3">
                  <span className="px-2 py-0.5  text-[10px] font-bold bg-amber-50 text-amber-700">
                    Better Career Offer
                  </span>
                </td>
                <td className="p-3 text-slate-600 font-mono">23 Oct 2026</td>
                <td className="p-3 text-slate-600 font-medium">2.4 Years</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 -full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    Signed Off
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">
                  Fitri Handayani
                </td>
                <td className="p-3 text-slate-600">Cashier Senior</td>
                <td className="p-3 text-slate-600">
                  3Second Bandung Indah Plaza
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5  text-[10px] font-bold bg-blue-50 text-blue-700">
                    Family / Relocation
                  </span>
                </td>
                <td className="p-3 text-slate-600 font-mono">20 Oct 2026</td>
                <td className="p-3 text-slate-600 font-medium">1.1 Years</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 -full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    Signed Off
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Agus Salim</td>
                <td className="p-3 text-slate-600">Store Associate</td>
                <td className="p-3 text-slate-600">Famo Medan Focal Point</td>
                <td className="p-3">
                  <span className="px-2 py-0.5  text-[10px] font-bold bg-purple-50 text-purple-700">
                    Further Education
                  </span>
                </td>
                <td className="p-3 text-slate-600 font-mono">18 Oct 2026</td>
                <td className="p-3 text-slate-600 font-medium">0.8 Years</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 -full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    Signed Off
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
