import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  TrendingDown,
  UserMinus,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Store,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import Chart from "react-apexcharts"
import {
  storeFormatTurnoverData,
  recruitmentKpiData,
} from "../../data/mockData"

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
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Monthly Turnover
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-200">
               Quest #5
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">0.77%</div>
          <span className="text-xs text-emerald-600 font-semibold">
            ↓ -12.0% dropped vs Sep
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Departures
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            96 staff
          </div>
          <span className="text-xs text-slate-500 font-medium">
            October 2026 total
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Voluntary Resign
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
               Quest #4 & #25
            </span>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1">
            62 staff
          </div>
          <span className="text-xs text-slate-500 font-medium">
            64.5% of total attrition
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Annualized Turnover
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">9.2%</div>
          <span className="text-xs text-emerald-600 font-semibold">
            Benchmark Indonesia: 18%
          </span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Monthly Turnover Breakdown (2026)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                 Quest #4 & #5
              </span>
            </div>
            <span className="text-xs text-slate-400">Headcount</span>
          </div>
          <Chart
            options={trendOptions}
            series={trendSeries}
            type="area"
            height={280}
          />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Turnover Velocity by Retail Position
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                 Quest #4 (High): ASM, VM & Leaders
              </span>
            </div>
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

      {/* Q6 & Q14: Store Format Turnover & Early Attrition Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Q6: Turnover by Store Format (Family Store vs Showroom vs Counter) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 mb-1.5">
                <Store className="w-3 h-3 text-amber-600" />
                <span>Critical Question #6 • High Priority</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Turnover by Store Format & Root Causes
              </h3>
              <p className="text-xs text-slate-500">
                Evaluating turnover disparity between Family Store, Mall Showroom, and Dept Store Counter
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">Benchmark: &lt; 3.0%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {storeFormatTurnoverData.map((fmt) => (
              <div
                key={fmt.format}
                className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{fmt.format}</span>
                    <span className="text-[10px] font-semibold">{fmt.status}</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900">{fmt.turnoverRate}%</span>
                    <span className="text-[11px] text-slate-500">/ mo</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {fmt.headcount.toLocaleString()} HC • {fmt.departuresYtd} exits YTD
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Dominant Exit Reasons
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {fmt.primaryReasons}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Format Insight:</strong> Counter turnover (3.9%) exceeds target threshold due to long single-brand shifts in department stores. Family Stores maintain lowest turnover (1.8%) supported by larger teams and structured shift rotations.
            </div>
          </div> */}
        </div>

        {/* Q14: Early Attrition Velocity (30 Days / 90 Days / 1 Year) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 mb-1.5">
              <Clock className="w-3 h-3 text-red-600" />
              <span>Critical Question #14 • Medium Priority</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Early Tenure Attrition (&lt; 30 Days)
            </h3>
            <p className="text-xs text-slate-500">
              Turnover velocity in the first 30 days of contract onboarding
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">30-Day Contract Attrition</span>
                <span className="text-base font-black text-emerald-600">1.8%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '18%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Current: 1.8%</span>
                <span>Max Target: 2.5%</span>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">90-Day Probation Success:</span>
                  <span className="font-bold text-slate-900">95.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">&lt; 1 Year Turnover (Annual):</span>
                  <span className="font-bold text-slate-900">{recruitmentKpiData.turnoverUnderOneYear}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Avg Cost per Hire Saved:</span>
                  <span className="font-bold text-emerald-600">Rp {(recruitmentKpiData.costPerHire / 1000000).toFixed(2)}M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
            {/* <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Buddy mentoring program at stores reduced initial 30-day drop-off by 34%.</span>
            </div> */}
            <Link
              to="/store-performance#quest-16"
              className="text-[#c8102e] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Lihat Analisis Gap Masa Kerja</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Exit Interviews & Offboarding Roster */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
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
