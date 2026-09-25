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
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Karyawan</span>
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-20 h-20 object-cover rounded-full ring-4 ring-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {employee.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    employee.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : employee.status === "Probation"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {employee.status === "Active"
                    ? "Aktif"
                    : employee.status === "Probation"
                    ? "Masa Percobaan"
                    : employee.status === "Promotion"
                    ? "Promosi"
                    : employee.status}
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
                alert(`Membuat PDF Berkas HR untuk ${employee.name}...`)
              }
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Ekspor Berkas
            </button>
            <button
              onClick={() =>
                alert(`Membuka evaluasi kontrak PKWT untuk ${employee.name}...`)
              }
              className="px-4 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Kelola Kontrak
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-6 overflow-x-auto text-xs font-bold">
          {[
            { id: "overview", label: "Ringkasan Profil" },
            { id: "employment", label: "Kontrak & Pekerjaan" },
            { id: "attendance", label: "Roster Kehadiran" },
            { id: "discipline", label: "Kedisiplinan & SP" },
            { id: "history", label: "Riwayat Mutasi & Karir" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
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
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Informasi Pribadi
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Nama Lengkap Sesuai KTP</span>
                <span className="font-semibold text-slate-800">
                  {employee.name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Gender & Usia</span>
                <span className="font-semibold text-slate-800">
                  {employee.gender === "Female" ? "Perempuan" : "Laki-laki"} • {employee.age || 26} Tahun
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Pendidikan Terakhir</span>
                <span className="font-semibold text-slate-800">
                  {employee.education || "Sarjana S1"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Kontak Telepon</span>
                <span className="font-semibold text-slate-800">
                  {employee.phone || "+62 812-3456-7890"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Penempatan Kerja & Organisasi
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Portofolio Brand</span>
                <span className="font-extrabold text-red-600">
                  {employee.brand}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Divisi</span>
                <span className="font-semibold text-slate-800">
                  {employee.division}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Departemen & Unit</span>
                <span className="font-semibold text-slate-800">
                  {employee.department}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Klaster & Cabang Toko</span>
                <span className="font-semibold text-slate-800">
                  {employee.storeCluster}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Kompensasi & Status Kontrak
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">
                  Klasifikasi Kontrak
                </span>
                <span className="font-bold text-slate-900">
                  {employee.employmentType}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  Tanggal Mulai Bekerja
                </span>
                <span className="font-semibold text-slate-800">
                  {employee.joinDate}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  Kontrak Berlaku Hingga
                </span>
                <span className="font-semibold text-slate-800">
                  {employee.contractEndDate || "Karyawan Tetap (PKWTT)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">
                  Gaji Pokok Bulanan (Labour Cost)
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {employee.salary
                    ? `Rp ${employee.salary.toLocaleString()}`
                    : "Konfidensial"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "employment" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Perjalanan & Siklus Kontrak Karyawan
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">
                  Perjanjian Kerja Waktu Tertentu (PKWT) 2026/2027
                </span>
                <span className="text-slate-500">
                  Periode: 24 Okt 2026 – 24 Okt 2027 (12 Bulan)
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Aktif
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">
                  Evaluasi Masa Percobaan (Probation)
                </span>
                <span className="text-slate-500">
                  Lolos evaluasi nilai 92.4/100 oleh Store Leader
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                Lolos Evaluasi
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Ringkasan Presensi Biometrik (30 Hari Terakhir)
          </h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Hadir
              </span>
              <span className="text-xl font-bold text-emerald-600">
                22 Hari
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Libur Shift
              </span>
              <span className="text-xl font-bold text-slate-700">6 Hari</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Sakit
              </span>
              <span className="text-xl font-bold text-blue-600">0</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Terlambat
              </span>
              <span className="text-xl font-bold text-amber-600">
                1 (8 mnt)
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "discipline" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Catatan Kedisiplinan & Surat Peringatan (SP)
          </h3>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-medium">
            Tidak ada surat peringatan (SP) aktif atau catatan perselisihan kerja. Rekam jejak kedisiplinan bersih.
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Riwayat Karir & Mutasi
          </h3>
          <div className="pl-4 border-l-2 border-slate-200 space-y-4 text-xs">
            <div>
              <span className="font-bold text-slate-900">
                Onboarding ke Store Ops – Bandung 01
              </span>
              <span className="text-slate-400 block">
                24 Okt 2026 • Diverifikasi oleh HR Admin Budi Santoso
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900">
                Lolos Pemeriksaan Kesehatan Kerja (MCU)
              </span>
              <span className="text-slate-400 block">
                18 Okt 2026 • Sertifikasi Laik Kerja
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
