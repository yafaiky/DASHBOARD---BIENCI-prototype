import React, { useState } from "react"
import {
  X,
  User,
  Building,
  DollarSign,
  Calendar,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  Trash2,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Download,
  ShieldCheck,
  Check,
  Store,
  Layers,
  FileText
} from "lucide-react"
import type { Employee } from "../../types"

interface EmployeeInputStudioModalProps {
  isOpen: boolean
  onClose: () => void
  onSaveEmployee?: (newEmp: Employee) => void
  onSaveBatch?: (newEmps: Employee[]) => void
}

export const EmployeeInputStudioModal: React.FC<EmployeeInputStudioModalProps> = ({
  isOpen,
  onClose,
  onSaveEmployee,
  onSaveBatch,
}) => {
  // Mode Tab: Single Wizard vs Batch Grid vs Excel Guide
  const [activeMode, setActiveMode] = useState<"single" | "batch" | "guide">("single")

  // --- MODE 1: SINGLE ENTRY STATE ---
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1)
  const [singleForm, setSingleForm] = useState({
    id: `EMP-${Math.floor(10000 + Math.random() * 90000)}`,
    name: "",
    gender: "Male" as "Male" | "Female",
    age: 24,
    phone: "0812-3456-7890",
    email: "",
    brand: "3SECOND",
    division: "Operasional Toko Retail",
    department: "Store Ops – Bandung Martadinata",
    position: "Sales Advisor (SPG/B)",
    location: "Bandung, Jawa Barat",
    storeCluster: "Flagship Standalone",
    employmentType: "PKWT" as "PKWT" | "PKWTT" | "Probation" | "Internship",
    joinDate: new Date().toISOString().split("T")[0],
    contractEndDate: "2027-10-31",
    salary: 4350000,
  })
  const [singleSavedToast, setSingleSavedToast] = useState(false)

  // --- MODE 2: BATCH SPREADSHEET STATE ---
  interface BatchRow {
    id: string
    nik: string
    name: string
    brand: string
    department: string
    position: string
    type: "PKWT" | "PKWTT" | "Probation"
    salary: number
    isValid: boolean
    validationMessage?: string
  }

  const sampleRows: BatchRow[] = [
    {
      id: "row-1",
      nik: "EMP-09351",
      name: "Rizky Firmansyah",
      brand: "3SECOND",
      department: "Store Ops – Bandung Martadinata",
      position: "Sales Advisor (SPB)",
      type: "PKWT",
      salary: 4350000,
      isValid: true,
      validationMessage: "✓ Siap Impor",
    },
    {
      id: "row-2",
      nik: "EMP-09352",
      name: "Siti Rahmawati",
      brand: "GREENLIGHT",
      department: "Store Ops – Tasikmalaya",
      position: "Kasir Toko",
      type: "PKWT",
      salary: 3950000,
      isValid: true,
      validationMessage: "✓ Siap Impor",
    },
    {
      id: "row-3",
      nik: "EMP-09353",
      name: "Aditya Pratama",
      brand: "FAMO",
      department: "Store Ops – Showroom Summarecon",
      position: "Visual Merchandiser",
      type: "PKWTT",
      salary: 5600000,
      isValid: true,
      validationMessage: "✓ Siap Impor",
    },
    {
      id: "row-4",
      nik: "EMP-09354",
      name: "Dewi Anggraini",
      brand: "3SECOND",
      department: "Store Ops – Solo Paragon",
      position: "Store Leader",
      type: "PKWTT",
      salary: 6200000,
      isValid: true,
      validationMessage: "✓ Siap Impor",
    },
    {
      id: "row-5",
      nik: "EMP-09355",
      name: "Bambang Kurnia",
      brand: "MOUTLEY",
      department: "Store Ops – Cirebon Superblock",
      position: "Sales Advisor (SPB)",
      type: "PKWT",
      salary: 4100000,
      isValid: true,
      validationMessage: "✓ Siap Impor",
    },
  ]

  const [batchRows, setBatchRows] = useState<BatchRow[]>(sampleRows)
  const [isValidating, setIsValidating] = useState(false)
  const [validationDone, setValidationDone] = useState(true)

  if (!isOpen) return null

  // Handler simpan single employee
  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!singleForm.name.trim()) return

    const newEmployee: Employee = {
      id: singleForm.id,
      name: singleForm.name,
      email: singleForm.email || `${singleForm.name.toLowerCase().replace(/\s+/g, ".")}@biensi.co.id`,
      avatar:
        singleForm.gender === "Female"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      division: singleForm.division,
      department: singleForm.department,
      position: singleForm.position,
      location: singleForm.location,
      storeCluster: singleForm.storeCluster,
      brand: singleForm.brand,
      employmentType: singleForm.employmentType,
      status: "Active",
      joinDate: singleForm.joinDate,
      contractEndDate: singleForm.contractEndDate,
      salary: singleForm.salary,
      phone: singleForm.phone,
      gender: singleForm.gender,
      age: singleForm.age,
      tenureYears: 0.1,
    }

    if (onSaveEmployee) onSaveEmployee(newEmployee)

    setSingleSavedToast(true)
    setTimeout(() => {
      setSingleSavedToast(false)
      onClose()
    }, 1200)
  }

  // Handler auto-generate demo data untuk single wizard
  const handleAutoFillDemoSingle = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    setSingleForm({
      id: `EMP-0${randomNum}`,
      name: "Rian Hendrawan",
      gender: "Male",
      age: 23,
      phone: "0813-8821-9901",
      email: "rian.hendrawan@biensi.co.id",
      brand: "3SECOND",
      division: "Operasional Toko Retail",
      department: "Store Ops – Bandung Martadinata",
      position: "Sales Advisor (SPB)",
      location: "Bandung, Jawa Barat",
      storeCluster: "Flagship Standalone",
      employmentType: "PKWT",
      joinDate: new Date().toISOString().split("T")[0],
      contractEndDate: "2027-10-31",
      salary: 4350000,
    })
  }

  // Handler batch grid: tambah baris kosong
  const handleAddBatchRow = () => {
    const newId = `row-${Date.now()}`
    const randomNik = `EMP-0${Math.floor(1000 + Math.random() * 9000)}`
    setBatchRows([
      ...batchRows,
      {
        id: newId,
        nik: randomNik,
        name: "",
        brand: "3SECOND",
        department: "Store Ops – Bandung Martadinata",
        position: "Sales Advisor (SPB)",
        type: "PKWT",
        salary: 4350000,
        isValid: false,
        validationMessage: "Perlu diisi",
      },
    ])
    setValidationDone(false)
  }

  // Handler batch grid: hapus baris
  const handleDeleteBatchRow = (id: string) => {
    setBatchRows(batchRows.filter((r) => r.id !== id))
  }

  // Handler batch grid: ubah nilai sel
  const handleBatchCellChange = (id: string, field: keyof BatchRow, val: any) => {
    setBatchRows(
      batchRows.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: val }
        }
        return r
      }),
    )
    setValidationDone(false)
  }

  // Handler batch grid: validasi otomatis
  const handleRunBatchValidation = () => {
    setIsValidating(true)
    setTimeout(() => {
      const validated = batchRows.map((r) => {
        if (!r.name.trim()) {
          return { ...r, isValid: false, validationMessage: "✕ Nama wajib diisi" }
        }
        if (r.salary < 3500000) {
          return { ...r, isValid: false, validationMessage: "⚠ Gaji di bawah UMK" }
        }
        return { ...r, isValid: true, validationMessage: "✓ Siap Impor" }
      })
      setBatchRows(validated)
      setIsValidating(false)
      setValidationDone(true)
    }, 600)
  }

  // Handler batch grid: simpan semua data batch
  const handleSaveBatchAll = () => {
    const validRows = batchRows.filter((r) => r.name.trim())
    if (validRows.length === 0) return

    const newEmployees: Employee[] = validRows.map((r) => ({
      id: r.nik,
      name: r.name,
      email: `${r.name.toLowerCase().replace(/\s+/g, ".")}@biensi.co.id`,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      division: "Operasional Toko Retail",
      department: r.department,
      position: r.position,
      location: "Indonesia",
      storeCluster: "Retail Store",
      brand: r.brand,
      employmentType: r.type,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      contractEndDate: "2027-10-31",
      salary: r.salary,
      phone: "0812-0000-0000",
      gender: "Male",
      age: 24,
      tenureYears: 0.1,
    }))

    if (onSaveBatch) onSaveBatch(newEmployees)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 font-heading">
                  Studio Simulasi Input Data HR & Ritel Toko
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih metode input yang paling efisien: Formulir Terpandu (Single), Grid Spreadsheet Massal (Batch), atau Panduan Template Excel.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Navigasi Mode Input */}
        <div className="p-3 border-b border-slate-100 bg-white flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveMode("single")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${activeMode === "single"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <User className="w-3.5 h-3.5 text-red-600" />
              <span>Input Cepat Terpandu (1 Karyawan)</span>
            </button>

            <button
              onClick={() => setActiveMode("batch")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${activeMode === "batch"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulasi Input Massal (Grid Spreadsheet)</span>
            </button>

            <button
              onClick={() => setActiveMode("guide")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${activeMode === "guide"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Panduan Format & Templat Excel</span>
            </button>
          </div>

          {activeMode === "batch" && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBatchRows(sampleRows)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleAddBatchRow}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Baris</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-50/50">
          {/* ========================================================================= */}
          {/* MODE 1: SINGLE ENTRY GUIDED WIZARD */}
          {/* ========================================================================= */}
          {activeMode === "single" && (
            <div className="space-y-6">
              {/* Stepper Tabs */}
              <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-bold bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setWizardStep(1)}
                  className={`flex items-center gap-2 cursor-pointer ${wizardStep === 1 ? "text-[#c8102e]" : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep === 1
                      ? "bg-[#c8102e] text-white"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    1
                  </span>
                  <span>1. Identitas & Biodata</span>
                </button>

                <div className="w-8 h-0.5 bg-slate-200" />

                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
                  className={`flex items-center gap-2 cursor-pointer ${wizardStep === 2 ? "text-[#c8102e]" : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep === 2
                      ? "bg-[#c8102e] text-white"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    2
                  </span>
                  <span>2. Penempatan & Toko</span>
                </button>

                <div className="w-8 h-0.5 bg-slate-200" />

                <button
                  type="button"
                  onClick={() => setWizardStep(3)}
                  className={`flex items-center gap-2 cursor-pointer ${wizardStep === 3 ? "text-[#c8102e]" : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep === 3
                      ? "bg-[#c8102e] text-white"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    3
                  </span>
                  <span>3. Kontrak & Gaji</span>
                </button>
              </div>

              {/* Form Content */}
              <form
                onSubmit={handleSingleSubmit}
                className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4"
              >
                {/* Step 1: Identitas */}
                {wizardStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Langkah 1: Identitas Pribadi Karyawan
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Data dasar untuk profil sistem dan registrasi sidik jari / absensi biometrik
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Nomor Induk Karyawan (NIK) *
                        </label>
                        <input
                          type="text"
                          required
                          value={singleForm.id}
                          onChange={(e) => setSingleForm({ ...singleForm, id: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Nama Lengkap Karyawan *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="cth: Rian Hendrawan"
                          value={singleForm.name}
                          onChange={(e) => setSingleForm({ ...singleForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Jenis Kelamin
                        </label>
                        <select
                          value={singleForm.gender}
                          onChange={(e) => setSingleForm({ ...singleForm, gender: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700"
                        >
                          <option value="Male">Laki-laki</option>
                          <option value="Female">Perempuan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Usia (Tahun)
                        </label>
                        <input
                          type="number"
                          min="18"
                          max="60"
                          value={singleForm.age}
                          onChange={(e) => setSingleForm({ ...singleForm, age: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Nomor WhatsApp / HP
                        </label>
                        <input
                          type="text"
                          placeholder="0812-xxxx-xxxx"
                          value={singleForm.phone}
                          onChange={(e) => setSingleForm({ ...singleForm, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Email Korporat
                        </label>
                        <input
                          type="email"
                          placeholder="nama@biensi.co.id"
                          value={singleForm.email}
                          onChange={(e) => setSingleForm({ ...singleForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setWizardStep(2)}
                        className="px-5 py-2 bg-slate-900 hover:bg-[#c8102e] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Lanjut ke Penempatan Toko</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Penempatan Organisasi */}
                {wizardStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Langkah 2: Penempatan Kerja & Toko Ritel
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Alokasi brand, departemen toko, dan jabatan operasional
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Portofolio Brand
                        </label>
                        <select
                          value={singleForm.brand}
                          onChange={(e) => setSingleForm({ ...singleForm, brand: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                        >
                          <option>3SECOND</option>
                          <option>GREENLIGHT</option>
                          <option>FAMO</option>
                          <option>MOUTLEY</option>
                          <option>FMC SPEED SUPPLY</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Jabatan (Posisi)
                        </label>
                        <select
                          value={singleForm.position}
                          onChange={(e) => setSingleForm({ ...singleForm, position: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                        >
                          <option>Sales Advisor (SPG/B)</option>
                          <option>Kasir Toko</option>
                          <option>Visual Merchandiser</option>
                          <option>Store Leader</option>
                          <option>Area Store Manager</option>
                          <option>Staf Gudang / Logistik</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">
                          Unit Toko / Gerai Ritel
                        </label>
                        <select
                          value={singleForm.department}
                          onChange={(e) => setSingleForm({ ...singleForm, department: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        >
                          <option>Store Ops – Bandung Martadinata (Family Store)</option>
                          <option>Store Ops – Tasikmalaya Standalone</option>
                          <option>Store Ops – Garut Pemuda</option>
                          <option>Store Ops – Cirebon Superblock</option>
                          <option>Store Ops – Showroom Summarecon Serpong</option>
                          <option>Store Ops – Tangcity Mall</option>
                          <option>Store Ops – Solo Paragon Mall</option>
                          <option>Store Ops – Tegal Pacific Mall</option>
                          <option>Store Ops – Surabaya Tunjungan Plaza</option>
                          <option>Store Ops – Perintis Kemerdekaan Makassar</option>
                          <option>Kantor Pusat – Kreatif Brand & Desain</option>
                          <option>Kantor Pusat – Supply Chain Logistik</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Format Toko
                        </label>
                        <select
                          value={singleForm.storeCluster}
                          onChange={(e) => setSingleForm({ ...singleForm, storeCluster: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700"
                        >
                          <option>Flagship Standalone</option>
                          <option>Family Store</option>
                          <option>Showroom Mall</option>
                          <option>Counter Dept Store</option>
                          <option>Hub Logistik</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Lokasi Kota / Region
                        </label>
                        <input
                          type="text"
                          value={singleForm.location}
                          onChange={(e) => setSingleForm({ ...singleForm, location: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setWizardStep(1)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        ← Kembali
                      </button>
                      <button
                        type="button"
                        onClick={() => setWizardStep(3)}
                        className="px-5 py-2 bg-slate-900 hover:bg-[#c8102e] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Lanjut ke Kontrak & Remunerasi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Kontrak & Gaji */}
                {wizardStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="border-b border-slate-100 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Langkah 3: Remunerasi & Legalitas Kontrak
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Tipe perjanjian kerja, masa berlaku PKWT, dan standar penggajian
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Status Perjanjian Kerja
                        </label>
                        <select
                          value={singleForm.employmentType}
                          onChange={(e) => setSingleForm({ ...singleForm, employmentType: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                        >
                          <option value="PKWT">Kontrak Waktu Tertentu (PKWT)</option>
                          <option value="PKWTT">Karyawan Tetap (PKWTT)</option>
                          <option value="Probation">Masa Percobaan (3 Bulan)</option>
                          <option value="Internship">Magang / Musiman</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Gaji Pokok Bulanan (Rp)
                        </label>
                        <input
                          type="number"
                          step="50000"
                          value={singleForm.salary}
                          onChange={(e) => setSingleForm({ ...singleForm, salary: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Tanggal Bergabung (Join Date)
                        </label>
                        <input
                          type="date"
                          value={singleForm.joinDate}
                          onChange={(e) => setSingleForm({ ...singleForm, joinDate: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Akhir Kontrak (PKWT)
                        </label>
                        <input
                          type="date"
                          value={singleForm.contractEndDate}
                          onChange={(e) => setSingleForm({ ...singleForm, contractEndDate: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                      <span>✓ Otomatis terdaftar ke BPJS Ketenagakerjaan & BPJS Kesehatan</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setWizardStep(2)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        ← Kembali
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#c8102e] hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-red-900/20"
                      >
                        <Check className="w-4 h-4" />
                        <span>Simpan & Daftarkan Karyawan</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: BATCH SPREADSHEET LIVE GRID (SOLUSI DATA BANYAK SEKALI) */}
          {/* ========================================================================= */}
          {activeMode === "batch" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Grid Spreadsheet Langsung (Live Batch Ingestion)</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Solusi untuk input data banyak: Edit sel secara instan, validasi logika bisnis otomatis, dan simpan puluhan staf sekaligus.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunBatchValidation}
                    disabled={isValidating}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isValidating ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    <span>Jalankan Validasi Cerdas</span>
                  </button>

                  <button
                    onClick={handleSaveBatchAll}
                    className="px-4 py-1.5 bg-[#c8102e] hover:bg-red-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan & Sinkronkan ({batchRows.length} Baris)</span>
                  </button>
                </div>
              </div>

              {/* Editable Spreadsheet Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold sticky top-0 z-10">
                      <tr>
                        <th className="p-2.5 w-10 text-center">No</th>
                        <th className="p-2.5">NIK (Auto)</th>
                        <th className="p-2.5">Nama Lengkap Karyawan</th>
                        <th className="p-2.5">Brand</th>
                        <th className="p-2.5">Unit Toko / Departemen</th>
                        <th className="p-2.5">Jabatan</th>
                        <th className="p-2.5">Tipe Kontrak</th>
                        <th className="p-2.5">Gaji Pokok (Rp)</th>
                        <th className="p-2.5">Status Validasi</th>
                        <th className="p-2.5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {batchRows.map((row, index) => (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-2.5 text-center font-mono text-slate-400 text-[11px]">
                            {index + 1}
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={row.nik}
                              onChange={(e) => handleBatchCellChange(row.id, "nik", e.target.value)}
                              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-[11px] text-slate-800 w-28"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              placeholder="Ketik nama karyawan..."
                              value={row.name}
                              onChange={(e) => handleBatchCellChange(row.id, "name", e.target.value)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded font-semibold text-slate-900 w-44 focus:ring-1 focus:ring-red-500"
                            />
                          </td>
                          <td className="p-2.5">
                            <select
                              value={row.brand}
                              onChange={(e) => handleBatchCellChange(row.id, "brand", e.target.value)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-[11px]"
                            >
                              <option>3SECOND</option>
                              <option>GREENLIGHT</option>
                              <option>FAMO</option>
                              <option>MOUTLEY</option>
                            </select>
                          </td>
                          <td className="p-2.5">
                            <select
                              value={row.department}
                              onChange={(e) => handleBatchCellChange(row.id, "department", e.target.value)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-[11px] w-52"
                            >
                              <option>Store Ops – Bandung Martadinata</option>
                              <option>Store Ops – Tasikmalaya</option>
                              <option>Store Ops – Showroom Summarecon</option>
                              <option>Store Ops – Solo Paragon</option>
                              <option>Store Ops – Cirebon Superblock</option>
                              <option>Store Ops – Surabaya TP</option>
                            </select>
                          </td>
                          <td className="p-2.5">
                            <select
                              value={row.position}
                              onChange={(e) => handleBatchCellChange(row.id, "position", e.target.value)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-[11px] w-36"
                            >
                              <option>Sales Advisor (SPB)</option>
                              <option>Sales Advisor (SPG)</option>
                              <option>Kasir Toko</option>
                              <option>Visual Merchandiser</option>
                              <option>Store Leader</option>
                            </select>
                          </td>
                          <td className="p-2.5">
                            <select
                              value={row.type}
                              onChange={(e) => handleBatchCellChange(row.id, "type", e.target.value as any)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-[11px]"
                            >
                              <option value="PKWT">PKWT</option>
                              <option value="PKWTT">PKWTT</option>
                              <option value="Probation">Percobaan</option>
                            </select>
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              step="50000"
                              value={row.salary}
                              onChange={(e) => handleBatchCellChange(row.id, "salary", Number(e.target.value))}
                              className="px-2 py-1 bg-white border border-slate-200 rounded font-mono text-[11px] w-28 text-right"
                            />
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${row.isValid
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                                }`}
                            >
                              {row.validationMessage || "Siap"}
                            </span>
                          </td>
                          <td className="p-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteBatchRow(row.id)}
                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              title="Hapus Baris"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Total: <strong>{batchRows.length} baris</strong> • Valid:{" "}
                    <strong className="text-emerald-600">
                      {batchRows.filter((r) => r.isValid).length}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: PANDUAN FORMAT & TEMPLATE EXCEL (ENTERPRISE BULK WORKFLOW) */}
          {activeMode === "guide" && (
            <div className="space-y-6">
              {/* Infografis 4 Langkah Input Data Skala Besar */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-[#c8102e] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Unduh Format Baku</h4>
                  <p className="text-[11px] text-slate-500">
                    Gunakan templat resmi .XLSX dengan header kolom terstandarisasi untuk mencegah eror pembacaan skema.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Kompilasi Roster Toko</h4>
                  <p className="text-[11px] text-slate-500">
                    Kumpulkan daftar staf SPG/B, kasir, dan pimpinan toko dari cabang regional (Jabar, Jateng, Jatim).
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Validasi Pra-Ingesti</h4>
                  <p className="text-[11px] text-slate-500">
                    Mesin sistem memverifikasi duplikasi NIK, tanggal kontrak, dan kesesuaian unit toko secara otomatis.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Sinkronisasi Dashboard</h4>
                  <p className="text-[11px] text-slate-500">
                    Data langsung masuk ke metrik live labour cost, analisis turnover, dan roster direktori kepegawaian.
                  </p>
                </div>
              </div>

              {/* Downloadable Templates Section */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Templat Spreadsheet Resmi 3SECOND Group & BIENSI
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-xs text-slate-800">
                          Templat Roster Toko Ritel
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Untuk penerimaan staf baru SPG/B, Kasir, dan Store Leader (Format .xlsx, 18 kolom).
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Mengunduh templat_roster_toko_biensi.xlsx")}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unduh File (.xlsx)</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-xs text-slate-800">
                          Format Presensi & Lembur
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Format impor absensi scan sidik jari, sakit, cuti, dan shift logistik gudang.
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Mengunduh templat_presensi_lembur_biensi.xlsx")}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                      <span>Unduh File (.xlsx)</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                        <span className="font-bold text-xs text-slate-800">
                          Format Pembaharuan PKWT
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Daftar perpanjangan masa kontrak staf toko menjelang peak season akhir tahun.
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Mengunduh templat_pembaruan_pkwt.xlsx")}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-purple-600" />
                      <span>Unduh File (.xlsx)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
          >
            Tutup Studio Input
          </button>
        </div>
      </div>
    </div>
  )
}
