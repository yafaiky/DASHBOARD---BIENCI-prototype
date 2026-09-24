import React, { useState } from "react"
import {
  Search,
  Filter,
  Download,
  UserPlus,
  MoreVertical,
  Eye,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { mockEmployees } from "../../data/mockData"
import type { Employee } from "../../types"

export const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate()

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDept =
      filterDepartment === "All" || emp.department.includes(filterDepartment)
    const matchStatus = filterStatus === "All" || emp.status === filterStatus
    return matchSearch && matchDept && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Employee Directory & Master Records
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse, filter, and audit full personnel records across all 3SECOND
            Group companies & store network
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              alert("Exporting full employee dataset (12,480 rows) to Excel...")
            }
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 -xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/import")}
            className="flex items-center gap-2 px-4 py-2 bg-[#c8102e] hover:bg-red-700 text-white -xl text-xs font-bold shadow-sm shadow-red-900/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add / Import</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 -2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee name, NIK, position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 -xl focus:outline-hidden focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 -xl text-slate-700"
            >
              <option value="All">All Departments</option>
              <option value="Store Ops">Store Operations</option>
              <option value="Fashion Design">Fashion Design</option>
              <option value="Logistics">Logistics & Supply Chain</option>
              <option value="Visual Merchandising">Visual Merchandising</option>
              <option value="IT">Digital & IT</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 -xl text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Probation">Probation</option>
              <option value="Promotion">Promotion</option>
            </select>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 -xl text-slate-700"
            >
              <option value={10}>10 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Employee Table */}
      <div className="bg-white -2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">EMP ID</th>
                <th className="p-3">ASSOCIATE</th>
                <th className="p-3">DIVISION & DEPT</th>
                <th className="p-3">POSITION</th>
                <th className="p-3">LOCATION</th>
                <th className="p-3">TYPE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">JOIN DATE</th>
                <th className="p-3 text-right">ACTION</th>
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
                    <span className="px-2 py-0.5  text-[10px] font-extrabold bg-slate-100 text-slate-700">
                      {emp.employmentType}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 -full text-[10px] font-bold ${
                        emp.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : emp.status === "Probation"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 -full ${
                          emp.status === "Active"
                            ? "bg-emerald-500"
                            : emp.status === "Probation"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      />
                      {emp.status}
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
                      className="p-1 -md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
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
            Showing {filteredEmployees.length} of 12,480 total personnel records
          </span>
          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1 -lg border border-slate-200 text-slate-400 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="w-7 h-7 -lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-7 h-7 -lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center">
              2
            </button>
            <button className="px-3 py-1 -lg border border-slate-200 text-slate-700 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
