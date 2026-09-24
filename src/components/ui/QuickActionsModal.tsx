import React, { useState } from "react"
import {
  UserPlus,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  RefreshCw,
  X,
  Check,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface QuickActionsModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEmployeeSuccess?: (name: string) => void
}

export const QuickActionsModal: React.FC<QuickActionsModalProps> = ({
  isOpen,
  onClose,
  onAddEmployeeSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"menu" | "addEmployee">("menu")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Store Ops – Bandung 01",
    position: "Store Associate",
    brand: "3SECOND",
    employmentType: "PKWT",
  })
  const [savedSuccess, setSavedSuccess] = useState(false)
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
      setActiveTab("menu")
      if (onAddEmployeeSuccess) onAddEmployeeSuccess(formData.name)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg -2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="p-1.5 -lg bg-red-100 text-red-700">
              <UserPlus className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {activeTab === "menu"
                  ? "Executive Quick Actions"
                  : "Onboard New Employee"}
              </h3>
              <p className="text-[11px] text-slate-500">
                {activeTab === "menu"
                  ? "Trigger key operational workflows across 3SECOND Group"
                  : "Fast-track onboarding directly into BIENSI Live HR Engine"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 -lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "menu" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("addEmployee")}
                className="flex flex-col items-start p-4 -xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 text-left transition-all group"
              >
                <div className="w-10 h-10 -lg bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <UserPlus className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  Onboard Employee
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Add associate to roster, store, or HQ department
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/import")
                  onClose()
                }}
                className="flex flex-col items-start p-4 -xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-left transition-all group"
              >
                <div className="w-10 h-10 -lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  Import Excel Sheet
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Upload multiple stores batch recruitment file
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/turnover/contract-expiry")
                  onClose()
                }}
                className="flex flex-col items-start p-4 -xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-left transition-all group"
              >
                <div className="w-10 h-10 -lg bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  Contract Renewal
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Review & renew expiring PKWT contracts
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate("/industrial-relation")
                  onClose()
                }}
                className="flex flex-col items-start p-4 -xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 text-left transition-all group"
              >
                <div className="w-10 h-10 -lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  Issue SP / IR Case
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Log discipline warning, fraud audit or mediation
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {savedSuccess ? (
                <div className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 -full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Employee Successfully Enrolled!
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.name} has been added to {formData.department}.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rizky Fauzan"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 -lg focus:outline-hidden focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rizky.f@biensi.co.id"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 -lg focus:outline-hidden focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Position Title
                      </label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 -lg focus:outline-hidden focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            department: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 -lg focus:outline-hidden focus:ring-1 focus:ring-red-500 bg-white"
                      >
                        <option>Store Ops – Bandung 01</option>
                        <option>Fashion Design – HQ</option>
                        <option>Logistics & Fulfillment</option>
                        <option>Visual Merchandising</option>
                        <option>Store Ops – Jakarta Flagship</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Brand
                      </label>
                      <select
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({ ...formData, brand: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 -lg focus:outline-hidden focus:ring-1 focus:ring-red-500 bg-white"
                      >
                        <option>3SECOND</option>
                        <option>GREENLIGHT</option>
                        <option>FAMO</option>
                        <option>MOUTLEY</option>
                        <option>FMC SPEED SUPPLY</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={formData.employmentType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employmentType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 -lg focus:outline-hidden focus:ring-1 focus:ring-red-500 bg-white"
                      >
                        <option>PKWT (Contract)</option>
                        <option>PKWTT (Permanent)</option>
                        <option>Probation</option>
                        <option>Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveTab("menu")}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 -lg"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#c8102e] hover:bg-red-700 -lg shadow-sm"
                    >
                      Save & Add to Roster
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        {activeTab === "menu" && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Logged in as Budi Santoso</span>
            <button
              onClick={() => {
                alert(
                  "Exporting complete BIENSI Executive HR Dataset as XLSX...",
                )
              }}
              className="flex items-center gap-1.5 font-semibold text-red-600 hover:text-red-700"
            >
              <Download className="w-4 h-4" /> Download Complete HR Dossier
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
