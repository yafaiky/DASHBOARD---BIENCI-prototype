import React, { useState } from "react"
import {
  Search,
  Download,
  UserPlus,
  Eye,
  User,
  CheckCircle2,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { mockEmployees } from "../../data/mockData"
import type { Employee } from "../../types"
import { EmployeeInputStudioModal } from "../../components/modals/EmployeeInputStudioModal"

export const EmployeesPage: React.FC = () => {
  const [employeesList, setEmployeesList] = useState<Employee[]>(mockEmployees)
  const [inputStudioOpen, setInputStudioOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("Semua")
  const [filterStatus, setFilterStatus] = useState("Semua")
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate()

  const handleSaveEmployee = (newEmp: Employee) => {
    setEmployeesList((prev) => [newEmp, ...prev])
    setToastMessage(
      `✓ Karyawan baru ${newEmp.name} (${newEmp.id}) berhasil disimulasikan & ditambahkan ke direktori!`
    )
    setTimeout(() => setToastMessage(null), 6000)
  }

  const handleSaveBatch = (newEmps: Employee[]) => {
    setEmployeesList((prev) => [...newEmps, ...prev])
    setToastMessage(
      `✓ Berhasil mensinkronkan ${newEmps.length} data karyawan baru dari simulasi massal ke direktori!`
    )
    setTimeout(() => setToastMessage(null), 6000)
  }

  const filteredEmployees = employeesList.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDept =
      filterDepartment === "Semua" || emp.department.includes(filterDepartment)
    const matchStatus = filterStatus === "Semua" || emp.status === filterStatus
    return matchSearch && matchDept && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Direktori & Data Induk Karyawan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Telusuri, filter, dan audit arsip lengkap data kepegawaian di seluruh gerai ritel dan kantor pusat 3SECOND Group.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInputStudioOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-semibold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Input Karyawan</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/import")}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-slate-500" />
            <span>Impor Excel</span>
          </button>
          <button
            type="button"
            onClick={() =>
              alert("Mengekspor seluruh dataset karyawan ke format Excel...")
            }
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-800 shadow-xs animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama karyawan, NIK, jabatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value="Semua">Semua Departemen</option>
              <option value="Store Ops">Operasional Toko</option>
              <option value="Fashion Design">Desain Fashion</option>
              <option value="Logistics">Logistik & Rantai Pasok</option>
              <option value="Visual Merchandising">Visual Merchandising</option>
              <option value="Omnichannel">Digital & TI</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value="Semua">Semua Status</option>
              <option value="Active">Aktif</option>
              <option value="Probation">Masa Percobaan</option>
              <option value="Promotion">Promosi</option>
            </select>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value={10}>10 per halaman</option>
              <option value={50}>50 per halaman</option>
              <option value={100}>100 per halaman</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Employee Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">NIK</th>
                <th className="p-3">DETAIL KARYAWAN</th>
                <th className="p-3">DIVISI & DEPARTEMEN</th>
                <th className="p-3">JABATAN</th>
                <th className="p-3">LOKASI / KLASTER</th>
                <th className="p-3">KONTRAK</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">TGL BERGABUNG</th>
                <th className="p-3 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => navigate(`/employees/${emp.id}`)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-slate-600">
                    {emp.id}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
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
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">
                      {emp.department}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {emp.division}
                    </div>
                  </td>
                  <td className="p-3 text-slate-700 font-medium">
                    {emp.position}
                  </td>
                  <td className="p-3 text-slate-600 font-medium">
                    {emp.location}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700">
                      {emp.employmentType}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${emp.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : emp.status === "Probation"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active"
                          ? "bg-emerald-500"
                          : emp.status === "Probation"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                          }`}
                      />
                      {emp.status === "Active"
                        ? "Aktif"
                        : emp.status === "Probation"
                          ? "Percobaan"
                          : emp.status === "Promotion"
                            ? "Promosi"
                            : emp.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">
                    {emp.joinDate}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/employees/${emp.id}`)
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Menampilkan {filteredEmployees.length} dari total arsip kepegawaian
          </span>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50"
              disabled
            >
              Sebelumnya
            </button>
            <button className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center">
              2
            </button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
              Berikutnya
            </button>
          </div>
        </div>
      </div>

      {/* Input Simulation Studio Modal */}
      <EmployeeInputStudioModal
        isOpen={inputStudioOpen}
        onClose={() => setInputStudioOpen(false)}
        onSaveEmployee={handleSaveEmployee}
        onSaveBatch={handleSaveBatch}
      />
    </div>
  )
}
