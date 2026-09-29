import React, { useState } from "react"
import {
  Calendar,
  Zap,
  ChevronDown,
  Building,
  Filter,
  BarChart2,
  Table as TableIcon,
  Sparkles,
  Download,
  Share2,
  HelpCircle,
  Eye,
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ExecutiveHeroMetrics } from "../../components/dashboard/ExecutiveHeroMetrics"
import { Phase1VisualCharts } from "../../components/dashboard/Phase1VisualCharts"
import { Phase1MetricsTable } from "../../components/dashboard/Phase1MetricsTable"
import { QuickActionsModal } from "../../components/ui/QuickActionsModal"

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"visual" | "matrix" | "both">("visual")
  const [selectedYear, setSelectedYear] = useState<"2026" | "2025" | "2024">("2026")
  const [selectedScope, setSelectedScope] = useState<"corporate" | "hq" | "store">("corporate")
  const [departmentFilter, setDepartmentFilter] = useState("Semua Departemen")
  const [divisionFilter, setDivisionFilter] = useState("Semua Divisi")
  const [storeTypeFilter, setStoreTypeFilter] = useState("Semua Tipe Store")
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleQuickActionSuccess = (name: string) => {
    setToastMessage(`Karyawan baru ${name} berhasil ditambahkan ke database!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 border border-red-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-top duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          TOP EXECUTIVE HEADER & CONTROLS
          Title: HR EXECUTIVE DASHBOARD
          Subtitle: HR DASHBOARD KPI 2026 Version 1.0 • Reporting : Monthly
          ========================================================================= */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              HR EXECUTIVE DASHBOARD
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            <strong className="text-slate-800 font-semibold">HR DASHBOARD KPI 2026 Version 1.0</strong> • Pelaporan Bulanan (Monthly Reporting) PT Biensi Fesyenindo secara terpadu nasional.
          </p>
        </div>

        {/* Executive Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Year Switcher (2026, 2025, 2024 from Phase 1.0 column) */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-mono font-semibold">
            {(["2026", "2025", "2024"] as const).map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedYear === year
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Scope Switcher: Total Corporate / HQ / Store */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedScope("corporate")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedScope === "corporate"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Corporate
            </button>
            <button
              type="button"
              onClick={() => setSelectedScope("hq")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedScope === "hq"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              HQ (Pusat)
            </button>
            <button
              type="button"
              onClick={() => setSelectedScope("store")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedScope === "store"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
                }`}
            >
              Store (Ritel)
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => setQuickActionsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#C8102E] hover:bg-[#b00d27] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Aksi Cepat</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE TABS: TAMPILAN VISUAL vs KATALOG MATRIKS PHASE 1.0
          ========================================================================= */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${activeTab === "visual"
              ? "bg-white text-slate-900 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <BarChart2 className="w-4 h-4 text-[#C8102E]" />
            <span>Tampilan Visual (Visual Charts)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("matrix")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer ${activeTab === "matrix"
              ? "bg-white text-slate-900 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <TableIcon className="w-4 h-4 text-slate-700" />
            <span>Matriks Metrik (51 KPI)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("both")}
            className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${activeTab === "both"
              ? "bg-white text-slate-900 font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <Layers className="w-4 h-4 text-slate-700" />
            <span>Lengkap (Keduanya)</span>
          </button>
        </div>

        {/* Quick Context Summary Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Skop: <strong className="text-slate-800 uppercase">{selectedScope}</strong> • Tahun: <strong className="text-slate-800">{selectedYear}</strong></span>
        </div>
      </div>

      {/* =========================================================================
          FILTERS BAR (Based on Phase 1.0 breakdown in Excel)
          ========================================================================= */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end text-xs">
          {/* Divisi */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Divisi HQ
            </label>
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option>Semua Divisi</option>
              <option>Commercial Business</option>
              <option>Supply Chain</option>
              <option>Business Support</option>
            </select>
          </div>

          {/* Departemen */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Departemen HQ
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option>Semua Departemen</option>
              <option>Marketing</option>
              <option>Sales Online</option>
              <option>Sales Offline</option>
              <option>Merchandising</option>
              <option>Product Development</option>
              <option>Production</option>
              <option>Research & Development</option>
              <option>Warehouse Finished Goods</option>
              <option>Logistics</option>
              <option>Finance</option>
              <option>IT</option>
              <option>Human Resource</option>
            </select>
          </div>

          {/* Tipe Store */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Tipe Store Ritel
            </label>
            <select
              value={storeTypeFilter}
              onChange={(e) => setStoreTypeFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option>Semua Tipe Store</option>
              <option>Family Store (FS)</option>
              <option>Showroom (Mall)</option>
              <option>Counter (Dept Store/YDS)</option>
            </select>
          </div>

          {/* Area Store */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Area Regional Store
            </label>
            <select
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option>Semua Area (Barat & Timur)</option>
              <option>Area Barat 1 (Bandung & Jabar)</option>
              <option>Area Barat 2 (DKI, Banten, Sumatera)</option>
              <option>Area Timur 1 (Jateng & Jatim)</option>
              <option>Area Timur 2 (Bali, Kalimantan, Sulawesi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TOP EXECUTIVE HERO CARDS
          Total Headcount • All Productivity - Sales • Productivity - Production
          ========================================================================= */}
      <ExecutiveHeroMetrics
        selectedYear={selectedYear}
        selectedScope={selectedScope}
      />

      {/* =========================================================================
          DYNAMIC MAIN CONTENT: VISUAL CHARTS OR EXACT PHASE 1.0 METRIC MATRIX
          ========================================================================= */}
      {activeTab === "visual" && (
        <Phase1VisualCharts
          selectedYear={selectedYear}
          selectedScope={selectedScope}
        />
      )}

      {activeTab === "matrix" && (
        <Phase1MetricsTable
          selectedYear={selectedYear}
          selectedScope={selectedScope}
        />
      )}

      {activeTab === "both" && (
        <div className="space-y-8">
          <Phase1VisualCharts
            selectedYear={selectedYear}
            selectedScope={selectedScope}
          />
          <Phase1MetricsTable
            selectedYear={selectedYear}
            selectedScope={selectedScope}
          />
        </div>
      )}

      {/* Quick Actions Modal */}
      <QuickActionsModal
        isOpen={quickActionsOpen}
        onClose={() => setQuickActionsOpen(false)}
        onAddEmployeeSuccess={handleQuickActionSuccess}
      />
    </div>
  )
}
