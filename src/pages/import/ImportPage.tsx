import React, { useState } from "react"
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Check,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ImportPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    "store_recruitment_oct2026.xlsx",
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleSimulateUpload = () => {
    setStep(2)
  }

  const handleStartProcessing = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep(4)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Batch Data Import & Schema Mapping
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bulk ingest retail store employee data from multi-sheet Excel files
            directly into BIENSI Live HR Engine
          </p>
        </div>

        <button
          onClick={() => navigate("/import/history")}
          className="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 -xl hover:bg-slate-50 shadow-2xs"
        >
          View Import History Logs
        </button>
      </div>

      {/* Workflow Stepper */}
      <div className="bg-white p-4 -2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-bold">
          <div
            className={`flex items-center gap-2 ${step >= 1 ? "text-red-600" : "text-slate-400"}`}
          >
            <span
              className={`w-6 h-6 -full flex items-center justify-center text-xs ${
                step >= 1
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              1
            </span>
            <span>Upload</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />

          <div
            className={`flex items-center gap-2 ${step >= 2 ? "text-red-600" : "text-slate-400"}`}
          >
            <span
              className={`w-6 h-6 -full flex items-center justify-center text-xs ${
                step >= 2
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              2
            </span>
            <span>Mapping</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />

          <div
            className={`flex items-center gap-2 ${step >= 3 ? "text-red-600" : "text-slate-400"}`}
          >
            <span
              className={`w-6 h-6 -full flex items-center justify-center text-xs ${
                step >= 3
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              3
            </span>
            <span>Validation</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-200" />

          <div
            className={`flex items-center gap-2 ${step >= 4 ? "text-emerald-600" : "text-slate-400"}`}
          >
            <span
              className={`w-6 h-6 -full flex items-center justify-center text-xs ${
                step >= 4
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              4
            </span>
            <span>Result</span>
          </div>
        </div>
      </div>

      {/* Step 1: Upload Dropzone */}
      {step === 1 && (
        <div className="bg-white p-8 -2xl border-2 border-dashed border-slate-300 shadow-2xs text-center space-y-4">
          <div className="w-16 h-16 -2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center shadow-xs">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Drop Excel / CSV here
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports files formatted as .xlsx, .xls, or .csv up to 50MB
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleSimulateUpload}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 -xl shadow-sm shadow-red-900/20"
            >
              Choose File from Computer
            </button>
          </div>
          <div className="pt-4 border-t border-slate-100 max-w-md mx-auto text-left text-xs text-slate-500">
            <strong>Supported Store Templates:</strong> 3Second Retail Store
            Roster Template v4.2, Logistics Shift Roster, HQ New Intake Sheet.
          </div>
        </div>
      )}

      {/* Step 2: Column Mapping */}
      {step === 2 && (
        <div className="bg-white p-6 -2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Step 2: Schema Column Mapping
              </h3>
              <p className="text-xs text-slate-500">
                Match incoming spreadsheet header columns with BIENSI database
                fields
              </p>
            </div>
            <span className="px-3 py-1 -lg text-xs font-mono font-bold bg-slate-100 text-slate-700">
              {uploadedFile}
            </span>
          </div>

          <div className="space-y-3">
            {[
              { excel: "NIK", db: "employee_no (NIK)" },
              { excel: "NAMA KARYAWAN", db: "name" },
              { excel: "JABATAN", db: "position" },
              { excel: "DEPARTEMENT", db: "department" },
              { excel: "DIVISI", db: "division" },
              { excel: "TGL MASUK", db: "join_date" },
              { excel: "TGL HABIS KONTRAK", db: "contract_end_date" },
            ].map((col, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 -xl bg-slate-50 border border-slate-100 text-xs"
              >
                <span className="font-mono font-bold text-slate-800">
                  {col.excel}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 -lg">
                  {col.db}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 -xl"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 -xl shadow-xs"
            >
              Validate Data (Step 3) →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Validation Summary */}
      {step === 3 && (
        <div className="bg-white p-6 -2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Step 3: Pre-Ingestion Data Validation
              </h3>
              <p className="text-xs text-slate-500">
                Integrity check against NIK duplicates, master data references
                and dates
              </p>
            </div>
            <span className="text-xs font-extrabold text-slate-900">
              12,450 Total Rows Scanned
            </span>
          </div>

          {/* Validation Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 -xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <span className="text-xl font-black text-emerald-700">
                  12,310
                </span>
                <span className="text-xs font-bold text-emerald-800 block">
                  ✓ Valid Rows
                </span>
              </div>
            </div>
            <div className="p-4 -xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <div>
                <span className="text-xl font-black text-amber-700">95</span>
                <span className="text-xs font-bold text-amber-800 block">
                  ⚠ Warnings (Auto-fixed)
                </span>
              </div>
            </div>
            <div className="p-4 -xl bg-red-50 border border-red-200 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <span className="text-xl font-black text-red-700">45</span>
                <span className="text-xs font-bold text-red-800 block">
                  ✕ Blocked Errors
                </span>
              </div>
            </div>
          </div>

          {/* Error examples as described in AGENT.md */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Error Exceptions Log:
            </span>
            <div className="divide-y divide-slate-100 -xl border border-slate-200 text-xs">
              <div className="p-3 bg-red-50/40 text-red-900 flex justify-between">
                <span>
                  <strong>Row 128:</strong> Employee ID duplicated (EMP-09221
                  already assigned)
                </span>
                <span className="font-mono text-red-600 font-bold">
                  REJECTED
                </span>
              </div>
              <div className="p-3 bg-red-50/40 text-red-900 flex justify-between">
                <span>
                  <strong>Row 219:</strong> Department not found ("Store Ops
                  Outer Space")
                </span>
                <span className="font-mono text-red-600 font-bold">
                  REJECTED
                </span>
              </div>
              <div className="p-3 bg-red-50/40 text-red-900 flex justify-between">
                <span>
                  <strong>Row 442:</strong> Invalid contract date format
                  ("31/02/2027")
                </span>
                <span className="font-mono text-red-600 font-bold">
                  REJECTED
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 -xl"
            >
              Back
            </button>
            <button
              onClick={handleStartProcessing}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 -xl shadow-xs"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Ingestion...</span>
                </>
              ) : (
                <span>Commit & Ingest 12,405 Valid Records</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 4 && (
        <div className="bg-white p-8 -2xl border border-slate-200 shadow-2xs text-center space-y-4">
          <div className="w-16 h-16 -2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
            <Check className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Ingestion Succeeded!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              12,405 records processed and updated in the BIENSI HR Database.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-3">
            <button
              onClick={() => navigate("/employees")}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 -xl"
            >
              View Updated Roster
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 -xl"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
