import React, { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  BarChart2,
  Clock,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react"
import Chart from "react-apexcharts"
import {
  mockStorePerformances,
  peakSeasonSavingsData,
  salesPerHourData,
} from "../../data/mockData"

export const LabourCostPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("All")

  // Revenue vs Labour Cost Mixed Chart
  const mixedChartOptions: ApexCharts.ApexOptions = {
    chart: { height: 320, type: "line", toolbar: { show: false } },
    stroke: { width: [0, 3] },
    colors: ["#172B4D", "#C8102E"],
    dataLabels: { enabled: false },
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct '26"],
    yaxis: [
      {
        title: {
          text: "Monthly Revenue (IDR Billion)",
          style: { fontSize: "11px", color: "#172B4D" },
        },
        labels: { formatter: (val) => `Rp ${val.toFixed(1)}B` },
      },
      {
        opposite: true,
        title: {
          text: "Labour Cost Ratio (%)",
          style: { fontSize: "11px", color: "#C8102E" },
        },
        labels: { formatter: (val) => `${val.toFixed(1)}%` },
      },
    ],
    grid: { borderColor: "#F1F5F9" },
  }

  const mixedChartSeries = [
    { name: "Revenue", type: "column", data: [112, 118, 124, 131, 135, 142] },
    {
      name: "Labour Cost Ratio",
      type: "line",
      data: [8.4, 8.3, 8.1, 8.2, 8.0, 7.9],
    },
  ]

  const filteredStores =
    selectedRegion === "All"
      ? mockStorePerformances
      : mockStorePerformances.filter((s) => s.region === selectedRegion)

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Labour Cost & Productivity
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Workforce payroll analytics, revenue per FTE, budget variance &
            store cost ratio
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
          {["All", "Barat", "Tengah", "Timur"].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 -lg transition-all ${
                selectedRegion === reg
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Region {reg}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Monthly Labour Cost
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 74.2 Miliar
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Within -1.4% budget limit
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Avg Cost / FTE
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 5.95 Juta
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Includes basic + allowances + BPJS
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Revenue per FTE
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            Rp 68.4 Juta
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            ↑ +4.8% vs Q2 benchmark
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Labour Cost Ratio
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">7.92%</div>
          <span className="text-[11px] text-blue-600 font-semibold">
            Retail Healthy Band (&lt;10%)
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Revenue vs Labour Cost Efficiency
            </h3>
            <p className="text-xs text-slate-500">
              Tracking whether headcount and payroll growth stays aligned with
              gross sales
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#172B4D] -xs" /> Monthly Sales
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#C8102E] -full" /> Labour Cost %
            </span>
          </div>
        </div>
        <div className="pt-3">
          <Chart
            options={mixedChartOptions}
            series={mixedChartSeries}
            type="line"
            height={320}
          />
        </div>
      </div>

      {/* Q11 & Q22: Seasonal Staffing & Hourly Productivity Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Q11: Peak Season Cost Optimization */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 mb-1.5">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Critical Question #11 • High Priority</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Peak Season Staffing Cost Savings
              </h3>
              <p className="text-xs text-slate-500">
                Part-time & Internship deployment vs Full-time equivalent (Lebaran & Year-End)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                +{peakSeasonSavingsData.savingsPercentage}% Saved
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Seasonal Deployment
              </span>
              <div className="text-xl font-black text-slate-900 mt-0.5">
                {peakSeasonSavingsData.seasonalHeadcount} Staff
              </div>
              <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                {peakSeasonSavingsData.partTimeDeployed} Part-time • {peakSeasonSavingsData.internsDeployed} Interns
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Net Payroll Savings
              </span>
              <div className="text-xl font-black text-emerald-600 mt-0.5">
                Rp {(peakSeasonSavingsData.netCostSavings / 1000000000).toFixed(2)} M
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                Actual: Rp {(peakSeasonSavingsData.actualSeasonalCost / 1000000000).toFixed(2)}M vs FTE: Rp {(peakSeasonSavingsData.fulltimeBenchmarkCost / 1000000000).toFixed(2)}M
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Cost Comparison</span>
              <span className="font-bold text-slate-900">
                Rp 1.58M (Seasonal) vs Rp 3.42M (FTE)
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full rounded-l-full"
                style={{ width: `${(peakSeasonSavingsData.actualSeasonalCost / peakSeasonSavingsData.fulltimeBenchmarkCost) * 100}%` }}
                title="Actual Seasonal Cost"
              />
              <div
                className="bg-slate-300 h-full rounded-r-full"
                style={{ width: `${(peakSeasonSavingsData.netCostSavings / peakSeasonSavingsData.fulltimeBenchmarkCost) * 100}%` }}
                title="Saved Payroll Budget"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Actual Seasonal Outlay (46.2%)
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> Net Saved Budget (53.8%)
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Budget Impact:</strong> Reduced seasonal overhang without permanent severance or BPJS overhead.
            </span>
          </div>
        </div>

        {/* Q22: Sales per Hour Productivity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 mb-1.5">
                <Zap className="w-3 h-3 text-blue-600" />
                <span>Critical Question #22 • High Priority</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Hourly Productivity: Part-Time vs Full-Time
              </h3>
              <p className="text-xs text-slate-500">
                Comparing sales yield per hour during peak traffic window ({salesPerHourData.peakHoursRange})
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
                {salesPerHourData.productivityOutputPercentage}% Yield Equivalence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Full-time Box */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Full-Time Staff</span>
                <span className="text-[10px] text-slate-500 font-normal">Core Team</span>
              </div>
              <div className="text-lg font-black text-slate-900">
                Rp {(salesPerHourData.fullTime.salesPerHour / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">/hr</span>
              </div>
              <div className="text-[11px] text-slate-600">
                Hourly Cost: <strong>Rp {(salesPerHourData.fullTime.costPerHour / 1000).toFixed(0)}k</strong>
              </div>
              <div className="text-[11px] font-bold text-slate-800 pt-1 border-t border-slate-200">
                Efficiency: {salesPerHourData.fullTime.efficiencyRatio}x Sales/Cost
              </div>
            </div>

            {/* Part-time Box */}
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span>Part-Time Staff</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">High ROI</span>
              </div>
              <div className="text-lg font-black text-blue-950">
                Rp {(salesPerHourData.partTime.salesPerHour / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">/hr</span>
              </div>
              <div className="text-[11px] text-slate-600">
                Hourly Cost: <strong>Rp {(salesPerHourData.partTime.costPerHour / 1000).toFixed(0)}k</strong> (-42%)
              </div>
              <div className="text-[11px] font-bold text-blue-700 pt-1 border-t border-blue-200">
                Efficiency: {salesPerHourData.partTime.efficiencyRatio}x Sales/Cost (+58%)
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">Part-Time Sales Output</span>
              <span className="font-bold text-slate-900">{salesPerHourData.productivityOutputPercentage}% of Full-Time</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${salesPerHourData.productivityOutputPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Part-time retail staff deliver 91.9% of full-time sales output during busy hours while saving 42.1% in hourly wages.
            </p>
          </div>
        </div>
      </div>

      {/* Store Performance Productivity Matrix */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Store Productivity & Labour Cost Matrix
          </h3>
          <span className="text-xs text-slate-500">
            Showing {filteredStores.length} flagship stores
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
              <tr>
                <th className="p-3">Store Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">HC</th>
                <th className="p-3">Monthly Sales</th>
                <th className="p-3">Labour Cost</th>
                <th className="p-3">Revenue / FTE</th>
                <th className="p-3">Cost Ratio</th>
                <th className="p-3">Target Ach.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStores.map((store) => (
                <tr
                  key={store.storeId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-900">
                      {store.storeName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {store.storeId} • {store.cluster}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5  text-[10px] font-extrabold bg-slate-100 text-slate-700">
                      {store.brand}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-800">
                    {store.headcount}
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    Rp {(store.sales / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3 text-slate-600 font-mono">
                    Rp {(store.labourCost / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3 font-bold text-emerald-600">
                    Rp {(store.revenuePerFte / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    {store.labourCostRatio}%
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 -full text-[10px] font-bold ${
                        store.achievementRate >= 100
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {store.achievementRate}%
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
