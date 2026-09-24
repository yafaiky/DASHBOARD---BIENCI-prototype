import React, { useState } from "react"
import {
  Store,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  MapPin,
} from "lucide-react"
import { mockStorePerformances } from "../../data/mockData"

export const StorePerformancePage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [searchStore, setSearchStore] = useState("")

  const filteredStores = mockStorePerformances.filter((s) => {
    const matchBrand = selectedBrand === "All" || s.brand === selectedBrand
    const matchSearch =
      s.storeName.toLowerCase().includes(searchStore.toLowerCase()) ||
      s.storeId.toLowerCase().includes(searchStore.toLowerCase()) ||
      s.cluster.toLowerCase().includes(searchStore.toLowerCase())
    return matchBrand && matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Retail Store Performance (HR + Sales)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Correlating store staff roster, sales achievement, labor costs &
            revenue per store associate
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search store name / ID..."
            value={searchStore}
            onChange={(e) => setSearchStore(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 -xl shadow-2xs focus:outline-hidden"
          />
          <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
            {["All", "3SECOND", "GREENLIGHT", "FAMO"].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1.5 -lg transition-all ${
                  selectedBrand === b
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4  border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Network Sales
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 142.8 Miliar
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            ↑ +5.6% vs Q3 target
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Target Achievement
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            105.8%
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Over quota nationwide
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Active Retail Associates
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            11,240 staff
          </div>
          <span className="text-[11px] text-blue-600 font-medium">
            342 active retail stores
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Avg Revenue / FTE
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 68.4 Juta
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Optimal floor productivity
          </span>
        </div>
      </div>

      {/* Store Table */}
      <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Store Network Performance Leaderboard
          </h3>
          <span className="text-xs text-slate-500">
            342 stores reporting real-time
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
              <tr>
                <th className="p-3">Store Details</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Staff Roster</th>
                <th className="p-3">Sales (IDR)</th>
                <th className="p-3">Target</th>
                <th className="p-3">Achievement</th>
                <th className="p-3">Labor Cost</th>
                <th className="p-3">Revenue / Associate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStores.map((s) => (
                <tr
                  key={s.storeId}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-900">
                      {s.storeName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {s.storeId} • {s.cluster}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5  text-[10px] font-extrabold bg-slate-900 text-white">
                      {s.brand}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-800">
                    {s.headcount} staff
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    Rp {(s.sales / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3 text-slate-500">
                    Rp {(s.targetSales / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${s.achievementRate >= 100 ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {s.achievementRate}%
                      </span>
                      <div className="w-16 h-1.5 -full bg-slate-100 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full -full ${s.achievementRate >= 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                          style={{
                            width: `${Math.min(s.achievementRate, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-mono">
                    Rp {(s.labourCost / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3 font-bold text-emerald-600">
                    Rp {(s.revenuePerFte / 1000000).toFixed(1)}M
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
