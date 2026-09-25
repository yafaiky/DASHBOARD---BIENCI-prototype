import React, { useState } from "react"
import { Check, Save } from "lucide-react"

export const RolesPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<
    "Super Admin" | "Manajer HR" | "Staf HR" | "Viewer"
  >("Manajer HR")
  const [saved, setSaved] = useState(false)

  const modules = [
    {
      name: "Dashboard Beranda",
      view: true,
      create: false,
      edit: false,
      delete: false,
      export: true,
    },
    {
      name: "Data Karyawan (Employees)",
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: true,
    },
    {
      name: "Impor Data Excel",
      view: true,
      create: true,
      edit: false,
      delete: false,
      export: false,
    },
    {
      name: "Labour Cost & Simulasi",
      view: true,
      create: false,
      edit: false,
      delete: false,
      export: true,
    },
    {
      name: "Analitik Turnover",
      view: true,
      create: false,
      edit: false,
      delete: false,
      export: true,
    },
    {
      name: "Presensi & Kehadiran",
      view: true,
      create: true,
      edit: true,
      delete: false,
      export: true,
    },
    {
      name: "Disiplin & Surat Peringatan (SP)",
      view: true,
      create: true,
      edit: true,
      delete: false,
      export: true,
    },
    {
      name: "Audit Fraud & Hubungan Industrial",
      view: true,
      create: true,
      edit: false,
      delete: false,
      export: false,
    },
    {
      name: "Pengelolaan Data Master",
      view: true,
      create: true,
      edit: true,
      delete: true,
      export: true,
    },
    {
      name: "Manajemen Akun Pengguna",
      view: true,
      create: true,
      edit: true,
      delete: false,
      export: false,
    },
    {
      name: "Log Aktivitas Sistem",
      view: true,
      create: false,
      edit: false,
      delete: false,
      export: true,
    },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {saved && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>
            Matriks izin hak akses berhasil diperbarui untuk peran {selectedRole}!
          </span>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Matriks Peran & Izin Hak Akses
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hak akses mendalam mencakup tindakan operasional, visibilitas data finansial tenaga kerja, dan izin penghapusan
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#c8102e] hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {/* Role Picker */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {(["Super Admin", "Manajer HR", "Staf HR", "Viewer"] as const).map(
            (r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedRole === r
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {r}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">Fitur Modul</th>
                <th className="p-3 text-center">Lihat</th>
                <th className="p-3 text-center">Tambah</th>
                <th className="p-3 text-center">Ubah</th>
                <th className="p-3 text-center">Hapus</th>
                <th className="p-3 text-center">Ekspor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modules.map((m) => (
                <tr
                  key={m.name}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 font-bold text-slate-900">{m.name}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={m.view}
                      className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={
                        selectedRole === "Super Admin" ? true : m.create
                      }
                      className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={
                        selectedRole === "Super Admin" ? true : m.edit
                      }
                      className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={
                        selectedRole === "Super Admin" ? true : m.delete
                      }
                      className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={
                        selectedRole === "Viewer" ? false : m.export
                      }
                      className="w-4 h-4 text-red-600 accent-red-600 cursor-pointer"
                    />
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
