import React, { useState } from "react"
import { UserCog, Plus, Shield, CheckCircle2, MoreVertical } from "lucide-react"
import { Link } from "react-router-dom"

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    {
      id: "USR-01",
      name: "Budi Santoso",
      email: "budi.santoso@biensi.co.id",
      role: "Super Admin",
      status: "Active",
      lastLogin: "Today, 08:30 WIB",
      created: "15 Jan 2025",
    },
    {
      id: "USR-02",
      name: "Dewi Anggraeni",
      email: "dewi.a@biensi.co.id",
      role: "HR Manager",
      status: "Active",
      lastLogin: "Yesterday, 17:10 WIB",
      created: "01 Feb 2025",
    },
    {
      id: "USR-03",
      name: "Rudi Hermawan",
      email: "rudi.h@biensi.co.id",
      role: "HR Staff",
      status: "Active",
      lastLogin: "22 Oct 2026",
      created: "10 Mar 2025",
    },
    {
      id: "USR-04",
      name: "Sari Puspita",
      email: "sari.p@biensi.co.id",
      role: "Viewer (Store Cluster Lead)",
      status: "Active",
      lastLogin: "20 Oct 2026",
      created: "05 Jun 2025",
    },
  ])

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            System Users & Access Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Provision and govern HR administrators, executive reviewers and
            regional store analysts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/roles"
            className="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 -xl hover:bg-slate-50 shadow-2xs"
          >
            Permissions Matrix
          </Link>
          <button
            onClick={() => alert("Invite New User dialog")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#c8102e] hover:bg-red-700 text-white -xl text-xs font-bold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white -2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">User Name & Email</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Active Login</th>
                <th className="p-3">Account Created</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 -lg text-[10px] font-bold bg-slate-100 text-slate-800">
                      <Shield className="w-3 h-3 text-red-600" />
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 -full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">
                    {u.lastLogin}
                  </td>
                  <td className="p-3 text-slate-500">{u.created}</td>
                  <td className="p-3 text-right">
                    <button className="p-1 -md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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
