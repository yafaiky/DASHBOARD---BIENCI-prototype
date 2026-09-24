import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  ShieldCheck,
  Award,
  Clock,
  FileText,
  DollarSign,
} from "lucide-react"
import { mockEmployees } from "../../data/mockData"

export const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<
    "overview" | "employment" | "attendance" | "discipline" | "history"
  >("overview")

  const employee = mockEmployees.find((e) => e.id === id) || mockEmployees[0]

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Employee Roster</span>
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white p-6 -2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-20 h-20 -2xl object-cover rounded-full ring-4 ring-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {employee.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 -full text-xs font-bold ${
                    employee.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : employee.status === "Probation"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {/* <span className="w-1.5 h-1.5 -full bg-current" /> */}
                  {employee.status}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-0.5">
                {employee.position} • {employee.department}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-slate-700">
                  {employee.id}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {employee.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                alert(`Generating HR Dossier PDF for ${employee.name}...`)
              }
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 -xl transition-colors"
            >
              Export Dossier
            </button>
            <button
              onClick={() =>
                alert(`Initiating PKWT contract review for ${employee.name}...`)
              }
              className="px-4 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 -xl shadow-xs transition-colors"
            >
              Manage Contract
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-6 overflow-x-auto text-xs font-bold">
          {[
            { id: "overview", label: "Overview" },
            { id: "employment", label: "Employment & Contract" },
            { id: "attendance", label: "Attendance Roster" },
            { id: "discipline", label: "Discipline / SP" },
            { id: "history", label: "Movement History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 -xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Personal Information
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Full Legal Name</span>
                <span className="font-semibold text-slate-800">
                  {employee.name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Gender & Age</span>
                <span className="font-semibold text-slate-800">
                  {employee.gender || "Male"} • {employee.age || 26} Years Old
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Highest Education</span>
                <span className="font-semibold text-slate-800">
                  {employee.education || "Bachelor Degree"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Direct Contact</span>
                <span className="font-semibold text-slate-800">
                  {employee.phone || "+62 812-3456-7890"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Job & Organizational Placement
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Brand Portfolio</span>
                <span className="font-extrabold text-red-600">
                  {employee.brand}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Division</span>
                <span className="font-semibold text-slate-800">
                  {employee.division}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Department & Unit</span>
                <span className="font-semibold text-slate-800">
                  {employee.department}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Cluster & Branch</span>
                <span className="font-semibold text-slate-800">
                  {employee.storeCluster}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Remuneration & Contract
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">
                  Contract Classification
                </span>
                <span className="font-bold text-slate-900">
                  {employee.employmentType}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  First Date of Joining
                </span>
                <span className="font-semibold text-slate-800">
                  {employee.joinDate}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  Contract Valid Until
                </span>
                <span className="font-semibold text-slate-800">
                  {employee.contractEndDate || "Permanent (PKWTT)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  Monthly Base Compensation
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {employee.salary
                    ? `Rp ${employee.salary.toLocaleString()}`
                    : "Confidential"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "employment" && (
        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Contract Journey & Lifecycle
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 -xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">
                  PKWT Contract 2026/2027
                </span>
                <span className="text-slate-500">
                  Period: 24 Oct 2026 – 24 Oct 2027 (12 Months)
                </span>
              </div>
              <span className="px-2.5 py-1 -full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <div className="p-4 -xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">
                  Probation Period Evaluation
                </span>
                <span className="text-slate-500">
                  Passed evaluation score 92.4/100 by Store Manager
                </span>
              </div>
              <span className="px-2.5 py-1 -full text-[10px] font-bold bg-blue-100 text-blue-800">
                Passed
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Biometric Attendance Summary (Last 30 Days)
          </h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 -xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Present
              </span>
              <span className="text-xl font-bold text-emerald-600">
                22 Days
              </span>
            </div>
            <div className="p-3 -xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Day Off
              </span>
              <span className="text-xl font-bold text-slate-700">6 Days</span>
            </div>
            <div className="p-3 -xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Sick
              </span>
              <span className="text-xl font-bold text-blue-600">0</span>
            </div>
            <div className="p-3 -xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Late Clock-in
              </span>
              <span className="text-xl font-bold text-amber-600">
                1 (8 mins)
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "discipline" && (
        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Disciplinary Record
          </h3>
          <div className="p-4 -xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-medium">
            No active disciplinary letters (SP) or IR investigation cases
            recorded. Clean conduct record.
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Career & Transfer History
          </h3>
          <div className="pl-4 border-l-2 border-slate-200 space-y-4 text-xs">
            <div>
              <span className="font-bold text-slate-900">
                Onboarding to Store Ops – Bandung 01
              </span>
              <span className="text-slate-400 block">
                24 Oct 2026 • Verified by HR Admin Budi Santoso
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900">
                Pre-employment Medical Check-up Passed
              </span>
              <span className="text-slate-400 block">
                18 Oct 2026 • Fit to Work Certification
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
