import React, { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  BarChart2,
} from "lucide-react"
import Chart from "react-apexcharts"
import { mockStorePerformances } from "../../data/mockData"

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
