import React, { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserPlus,
  UserMinus,
  FileText,
  ShieldCheck,
  Calendar,
  Zap,
  MoreVertical,
  ArrowRight,
  ChevronDown,
  Building,
  Lock,
  Layers,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { WorkforceChart } from "../../components/charts/WorkforceChart"
import { ContractDonutChart } from "../../components/charts/ContractDonutChart"
import {
  mockEmployees,
  mockActivityStream,
  workforceTrendData,
  departmentDistribution,
  contractTypesData,
} from "../../data/mockData"
import { QuickActionsModal } from "../../components/ui/QuickActionsModal"

export const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "YTD">("30D")
  const [selectedBrand, setSelectedBrand] = useState("3SECOND")
  const [departmentFilter, setDepartmentFilter] = useState(
    "All Departments (14)",
  )
  const [tableSearch, setTableSearch] = useState("")
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  // Filtered recent employees
  const displayEmployees = mockEmployees
    .filter(
      (emp) =>
        emp.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
        emp.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
        emp.position.toLowerCase().includes(tableSearch.toLowerCase()) ||
        emp.department.toLowerCase().includes(tableSearch.toLowerCase()),
    )
    .slice(0, 5)

  const handleQuickActionSuccess = (name: string) => {
    setToastMessage(`New associate ${name} added to live roster!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-4 py-3 -xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top duration-200">
          <span className="w-2 h-2 -full bg-white" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Welcome & Executive Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, Muntazier ganteng
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Here's what's happening with your workforce today across{" "}
            <strong className="text-slate-700 font-semibold">
              3SECOND Group
            </strong>{" "}
            & BIENSI retail footprint nationwide.
          </p>
        </div>

        {/* Date controls and Quick Action button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period selector */}
          <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
            {(["7D", "30D", "YTD"] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 -lg transition-all ${
                  timeRange === range
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Month Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 -xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>This Month: October 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Red Primary Quick Action Button */}
          <button
            type="button"
            onClick={() => setQuickActionsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#c8102e] hover:bg-[#b00d27] text-white -xl text-xs font-bold shadow-sm shadow-red-900/20 transition-colors"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Quick Actions</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 -2xl border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          {/* Department */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 -xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            >
              <option>All Departments (14)</option>
              <option>Retail Store Operations</option>
              <option>Supply Chain & Logistics</option>
              <option>Marketing, Brand & Creative</option>
              <option>Finance, Tax & Accounting</option>
              <option>Digital, Omnichannel & IT</option>
            </select>
          </div>

          {/* Division */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Division
            </label>
            <select className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 -xl focus:outline-hidden focus:ring-1 focus:ring-red-500">
              <option>Retail Operations (Active)</option>
              <option>Fashion & Design</option>
              <option>Supply Chain & Logistics</option>
              <option>Commercial Business</option>
              <option>Corporate Support</option>
            </select>
          </div>

          {/* Location / Store Cluster */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Location / Store Cluster
            </label>
            <select className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 -xl focus:outline-hidden focus:ring-1 focus:ring-red-500">
              <option>Bandung HQ & Stores (Primary)</option>
              <option>Jabodetabek Flagship Hub</option>
              <option>East Java Region</option>
              <option>Sumatera Regional Hub</option>
              <option>Bali & Nusa Tenggara</option>
            </select>
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Employment Status
            </label>
            <select className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 -xl focus:outline-hidden focus:ring-1 focus:ring-red-500">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Probation</option>
              <option>Contract (PKWT)</option>
              <option>Permanent (PKWTT)</option>
            </select>
          </div>

          {/* Brand Portfolio Pills */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Brand Portfolio
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["3SECOND", "GREENLIGHT", "FAMO"].map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-2.5 py-1.5 -lg text-[11px] font-extrabold tracking-wide transition-colors ${
                    selectedBrand === brand
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Total Employees */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                   Quest #1 & #18
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">
              12,480
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3.2% vs last month</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>HQ 1,240 • Store 11,240</span>
          </div>
        </div>

        {/* 2. Active Employees */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Staff
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">
              11,920
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2.4% vs Sep</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              95.5% active roster
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
              Optimal
            </span>
          </div>
        </div>

        {/* 3. New Joiners */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                New Joiners
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserPlus className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-black text-slate-900">284</span>
              <span className="text-xs text-slate-400 font-medium">
                / 300 target
              </span>
            </div>
            <div className="text-xs font-semibold text-emerald-600 mt-1">
              94.7% of monthly quota
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Retail + HQ intakes</span>
            <span className="font-bold text-slate-700">16 left</span>
          </div>
        </div>

        {/* 4. Resigned */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Resigned
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                   Quest #4
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <UserMinus className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">96</div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-12.0% turnover dropped</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Turnover Rate</span>
            <span className="font-bold text-emerald-600">0.77% (Low)</span>
          </div>
        </div>

        {/* 5. Contract (PKWT) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  PKWT
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                   Quest #13
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">2,180</div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Store associates & seasonal
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>17.5% of total force</span>
            <Building className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* 6. Permanent (PKWTT) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  PKWTT
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
                   Quest #19
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">9,740</div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              HQ core & retail leaders
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>78.0% workforce core</span>
            <Lock className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Middle Section: Trajectory Trend & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Workforce Trajectory Trend */}
        <div className="lg:col-span-8 bg-white p-5 -2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Workforce Trajectory Trend
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                     Quest #1 (High): Headcount Growth vs Sales
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Jan – Oct 2026
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-inter">
                  Progression of active staff headcount alongside onboarding &
                  attrition velocity
                </p>
              </div>

              {/* Legend matching screenshot */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#172B4D]" /> Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> Joiners
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /> Resigned
                </span>
              </div>
            </div>

            {/* Apex Chart */}
            <div className="pt-2">
              <WorkforceChart
                categories={workforceTrendData.categories}
                activeData={workforceTrendData.active}
                joinersData={workforceTrendData.joiners}
                resignedData={workforceTrendData.resigned}
              />
            </div>
          </div>

          {/* Chart KPI Footer */}
          <div className="grid grid-cols-3 gap-4 pt-4 mt-2 border-t border-slate-100 text-center">
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Avg Monthly Joiners
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-800">
                292 / mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Net Headcount Gain
              </span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-600">
                +188 this mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Annualized Turnover
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-800">
                9.2%{" "}
                <span className="text-xs text-slate-400 font-normal">
                  (Benchmark 18%)
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Contract Types & Staffing by Department */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Contract Types Donut */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Contract Types
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                   Quest #19
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                12,480 Headcount
              </span>
            </div>

            <ContractDonutChart
              series={contractTypesData.series}
              labels={contractTypesData.labels}
              colors={contractTypesData.colors}
            />

            {/* Donut Legend */}
            <div className="space-y-1.5 pt-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#172B4D]" /> Permanent
                </span>
                <span className="font-bold">
                  9,740{" "}
                  <span className="text-slate-400 font-normal">(78%)</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]" /> Contract
                  (PKWT)
                </span>
                <span className="font-bold">
                  2,180{" "}
                  <span className="text-slate-400 font-normal">(17.5%)</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Probation
                </span>
                <span className="font-bold">
                  370 <span className="text-slate-400 font-normal">(3.0%)</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" /> Internship
                  / Seasonal
                </span>
                <span className="font-bold">
                  190 <span className="text-slate-400 font-normal">(1.5%)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card: Staffing by Department */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Staffing by Department
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                   Quest #26
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                DISTRIBUTION
              </span>
            </div>

            <div className="space-y-3">
              {departmentDistribution.map((dept, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {dept.name}
                    </span>
                    <span className="text-slate-500 font-medium">
                      <strong className="text-slate-900">
                        {dept.count.toLocaleString()}
                      </strong>{" "}
                      ({dept.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 -full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full -full transition-all duration-500"
                      style={{
                        width: `${dept.percentage}%`,
                        backgroundColor: dept.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Onboarded Employees & System Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 cols): Recent Onboarded Employees Table */}
        <div className="lg:col-span-8 bg-white p-5 -2xl border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-slate-900">
                Recent Onboarded Employees
              </h3>
              <span className="px-2 py-0.5 -full text-[10px] font-bold bg-slate-100 text-slate-600">
                Latest 5 Records
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Filter table..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 -lg placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-red-500"
              />
              <Link
                to="/employees"
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-2.5 px-3 font-bold">EMP ID</th>
                  <th className="py-2.5 px-3 font-bold">EMPLOYEE DETAILS</th>
                  <th className="py-2.5 px-3 font-bold">DEPARTMENT</th>
                  <th className="py-2.5 px-3 font-bold">POSITION</th>
                  <th className="py-2.5 px-3 font-bold">STATUS</th>
                  <th className="py-2.5 px-3 font-bold">JOIN DATE</th>
                  <th className="py-2.5 px-3 font-bold text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => navigate(`/employees/${emp.id}`)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-semibold text-slate-600">
                      {emp.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 -full object-cover shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900">
                            {emp.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {emp.department}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {emp.position}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 -full text-[10px] font-bold ${
                          emp.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : emp.status === "Probation"
                              ? "bg-amber-50 text-amber-700"
                              : emp.status === "Promotion"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 -full ${
                            emp.status === "Active"
                              ? "bg-emerald-500"
                              : emp.status === "Probation"
                                ? "bg-amber-500"
                                : emp.status === "Promotion"
                                  ? "bg-blue-500"
                                  : "bg-slate-400"
                          }`}
                        />
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {emp.joinDate}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/employees/${emp.id}`)
                        }}
                        className="p-1 -md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Showing 5 of 284 new joiners this period</span>
            <div className="inline-flex items-center gap-1 font-semibold">
              <button
                type="button"
                className="px-2.5 py-1 -lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                type="button"
                className="w-7 h-7 -lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs"
              >
                1
              </button>
              <button
                type="button"
                className="w-7 h-7 -lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center text-xs"
              >
                2
              </button>
              <button
                type="button"
                className="w-7 h-7 -lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center text-xs"
              >
                3
              </button>
              <button
                type="button"
                className="px-2.5 py-1 -lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 cols): System Activity Stream */}
        <div className="lg:col-span-4 bg-white p-5 -2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                System Activity Stream
              </h3>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span className="w-2 h-2 -full bg-emerald-500" /> Real-time
              </span>
            </div>

            {/* Stream list */}
            <div className="divide-y divide-slate-100 mt-2">
              {mockActivityStream.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 text-xs">
                  <div className="mt-1">
                    <span
                      className="w-2.5 h-2.5 -full block"
                      style={{ backgroundColor: item.dotColor }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action button to Activity Log */}
          <div className="pt-4 mt-3 border-t border-slate-100">
            <Link
              to="/activity-log"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 -xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
            >
              <span>View All Activity Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Modal */}
      <QuickActionsModal
        isOpen={quickActionsOpen}
        onClose={() => setQuickActionsOpen(false)}
        onAddEmployeeSuccess={handleQuickActionSuccess}
      />
    </div>
  )
}
