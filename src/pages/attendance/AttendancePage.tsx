import React, { useState } from "react"
import {
  CalendarCheck,
  UserCheck,
  AlertCircle,
  Clock,
  CheckCircle,
  Building,
  Store,
  Layers
} from "lucide-react"
import Chart from "react-apexcharts"

export const AttendancePage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("Agustus 2026")
  const [attendanceView, setAttendanceView] = useState<"store" | "hq">("store")

  // Attendance 3-year trend
  const attendanceTrendOptions: ApexCharts.ApexOptions = {
    chart: { type: "area", height: 300, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#16A34A", "#2563EB", "#F59E0B"],
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
      ],
    },
    yaxis: { min: 60, max: 100, labels: { formatter: (v) => `${v}%` } },
    grid: { borderColor: "#F1F5F9" },
    tooltip: {
      y: { formatter: (val) => `${val.toFixed(1)}% Kehadiran` }
    }
  }

  // Data aktual dari sheet Attendance Excel 2026, 2025, 2024
  const attendanceTrendSeries = [
    {
      name: "2026 (Aktual)",
      data: attendanceView === "store"
        ? [71.4, 66.3, 71.9, 66.5, 73.3, 73.9, 76.4, 82.5]
        : [80.7, 82.7, 87.4, 74.3, 79.0, 83.4, 75.4, 91.6],
    },
    {
      name: "2025",
      data: attendanceView === "store"
        ? [70.1, 72.8, 78.1, 62.1, 63.2, 72.5, 65.5, 72.3]
        : [82.3, 82.3, 82.8, 83.8, 87.3, 86.1, 77.3, 84.0],
    },
    {
      name: "2024",
      data: attendanceView === "store"
        ? [72.6, 76.4, 70.1, 67.0, 70.8, 73.8, 74.4, 69.3]
        : [79.3, 84.7, 80.8, 78.1, 78.7, 83.5, 81.0, 79.4],
    },
  ]

  // Data rekap kehadiran aktual 2026 dari Excel
  const actualAttendance2026Store = [
    { bulan: "Januari 2026", hc: 909, sakit: 170, sakitPct: "18.7%", izin: 6, izinPct: "0.7%", cuti: 468, cutiPct: "51.5%", alpha: 84, alphaPct: "9.2%", kehadiran: "71.4%" },
    { bulan: "Februari 2026", hc: 872, sakit: 186, sakitPct: "21.3%", izin: 7, izinPct: "0.8%", cuti: 250, cutiPct: "28.7%", alpha: 101, alphaPct: "11.6%", kehadiran: "66.3%" },
    { bulan: "Maret 2026", hc: 875, sakit: 179, sakitPct: "20.5%", izin: 9, izinPct: "1.0%", cuti: 60, cutiPct: "6.9%", alpha: 58, alphaPct: "6.6%", kehadiran: "71.9%" },
    { bulan: "April 2026", hc: 905, sakit: 188, sakitPct: "20.8%", izin: 4, izinPct: "0.4%", cuti: 421, cutiPct: "46.5%", alpha: 111, alphaPct: "12.3%", kehadiran: "66.5%" },
    { bulan: "Mei 2026", hc: 876, sakit: 130, sakitPct: "14.8%", izin: 3, izinPct: "0.3%", cuti: 506, cutiPct: "57.8%", alpha: 101, alphaPct: "11.5%", kehadiran: "73.3%" },
    { bulan: "Juni 2026", hc: 855, sakit: 162, sakitPct: "18.9%", izin: 8, izinPct: "0.9%", cuti: 523, cutiPct: "61.2%", alpha: 53, alphaPct: "6.2%", kehadiran: "73.9%" },
    { bulan: "Juli 2026", hc: 843, sakit: 150, sakitPct: "17.8%", izin: 4, izinPct: "0.5%", cuti: 348, cutiPct: "41.3%", alpha: 45, alphaPct: "5.3%", kehadiran: "76.4%" },
  ]

  const actualAttendance2026HQ = [
    { bulan: "Januari 2026", hc: 362, sakit: 57, sakitPct: "15.7%", izin: 11, izinPct: "3.0%", cuti: 150, cutiPct: "41.4%", alpha: 2, alphaPct: "0.6%", kehadiran: "80.7%" },
    { bulan: "Februari 2026", hc: 364, sakit: 51, sakitPct: "14.0%", izin: 10, izinPct: "2.7%", cuti: 142, cutiPct: "39.0%", alpha: 2, alphaPct: "0.5%", kehadiran: "82.7%" },
    { bulan: "Maret 2026", hc: 366, sakit: 32, sakitPct: "8.7%", izin: 12, izinPct: "3.3%", cuti: 316, cutiPct: "86.3%", alpha: 2, alphaPct: "0.5%", kehadiran: "87.4%" },
    { bulan: "April 2026", hc: 334, sakit: 61, sakitPct: "18.3%", izin: 16, izinPct: "4.8%", cuti: 49, cutiPct: "14.7%", alpha: 9, alphaPct: "2.7%", kehadiran: "74.3%" },
    { bulan: "Mei 2026", hc: 329, sakit: 46, sakitPct: "14.0%", izin: 14, izinPct: "4.3%", cuti: 197, cutiPct: "59.9%", alpha: 9, alphaPct: "2.7%", kehadiran: "79.0%" },
    { bulan: "Juni 2026", hc: 314, sakit: 38, sakitPct: "12.1%", izin: 11, izinPct: "3.5%", cuti: 50, cutiPct: "15.9%", alpha: 3, alphaPct: "1.0%", kehadiran: "83.4%" },
    { bulan: "Juli 2026", hc: 309, sakit: 56, sakitPct: "18.1%", izin: 15, izinPct: "4.9%", cuti: 52, cutiPct: "16.8%", alpha: 5, alphaPct: "1.6%", kehadiran: "75.4%" },
    { bulan: "Agustus 2026", hc: 308, sakit: 22, sakitPct: "7.1%", izin: 4, izinPct: "1.3%", cuti: 35, cutiPct: "11.4%", alpha: 0, alphaPct: "0.0%", kehadiran: "91.6%" },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Kehadiran & Presensi Karyawan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data absensi biometrik, tingkat sakit, izin, cuti tahunan, dan persentase mangkir (alpa) berdasarkan rekapitulasi aktual Excel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setAttendanceView("store")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                attendanceView === "store"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Staf Toko (Retail)
            </button>
            <button
              onClick={() => setAttendanceView("hq")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                attendanceView === "hq"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Kantor Pusat (HQ)
            </button>
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-2xs"
          >
            <option>Agustus 2026</option>
            <option>Juli 2026</option>
            <option>Juni 2026</option>
            <option>Mei 2026</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Aktual Berdasarkan Lingkup yang Dipilih */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Tingkat Kehadiran
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {attendanceView === "store" ? "76.4%" : "91.6%"}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {attendanceView === "store" ? "843 staf aktif toko" : "308 staf aktif HQ"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Cuti Sakit (%)
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">
            {attendanceView === "store" ? "17.8%" : "7.1%"}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {attendanceView === "store" ? "150 surat sakit dokter" : "22 surat sakit"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Cuti Tahunan
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {attendanceView === "store" ? "41.3%" : "11.4%"}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {attendanceView === "store" ? "348 cuti disetujui" : "35 cuti"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Izin / Dispensasi
          </span>
          <div className="text-2xl font-black text-purple-600 mt-1">
            {attendanceView === "store" ? "0.5%" : "1.3%"}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {attendanceView === "store" ? "4 permohonan izin" : "4 permohonan"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Alpa / Mangkir
          </span>
          <div className="text-2xl font-black text-red-600 mt-1">
            {attendanceView === "store" ? "5.3%" : "0.0%"}
          </div>
          <span className="text-[11px] text-red-500 font-semibold">
            {attendanceView === "store" ? "45 kasus alpa toko" : "0 kasus (Nihil)"}
          </span>
        </div>
      </div>

      {/* 3-Year Trend Comparison */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Tren Progresi Kehadiran 3 Tahun (2024 – 2026): {attendanceView === "store" ? "Staf Toko Retail" : "Kantor Pusat (HQ)"}
            </h3>
            <p className="text-xs text-slate-500">
              Evaluasi konsistensi kedisiplinan dan absensi karyawan tahun ke tahun.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> 2026
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> 2025
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> 2024
            </span>
          </div>
        </div>
        <div className="pt-3">
          <Chart
            options={attendanceTrendOptions}
            series={attendanceTrendSeries}
            type="area"
            height={300}
          />
        </div>
      </div>

      {/* Tabel Data Aktual Kehadiran 2026 dari Excel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Rincian Rekapitulasi Absensi Bulanan 2026 ({attendanceView === "store" ? "Karyawan Toko" : "Head Office"})
            </h3>
            <p className="text-xs text-slate-500">
              Data resmi bersumber langsung dari pencatatan presensi HR Excel 2026.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Tahun Berjalan 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
              <tr>
                <th className="p-3">Bulan</th>
                <th className="p-3">Jumlah Karyawan</th>
                <th className="p-3">Sakit</th>
                <th className="p-3">% Sakit</th>
                <th className="p-3">Izin</th>
                <th className="p-3">% Izin</th>
                <th className="p-3">Cuti Tahunan</th>
                <th className="p-3">% Cuti</th>
                <th className="p-3">Alpha / Mangkir</th>
                <th className="p-3">% Alpha</th>
                <th className="p-3">% Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(attendanceView === "store" ? actualAttendance2026Store : actualAttendance2026HQ).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{row.bulan}</td>
                  <td className="p-3 font-bold text-slate-700">{row.hc}</td>
                  <td className="p-3 font-mono text-slate-600">{row.sakit}</td>
                  <td className="p-3 font-mono text-blue-600 font-semibold">{row.sakitPct}</td>
                  <td className="p-3 font-mono text-slate-600">{row.izin}</td>
                  <td className="p-3 font-mono text-purple-600">{row.izinPct}</td>
                  <td className="p-3 font-mono text-slate-600">{row.cuti}</td>
                  <td className="p-3 font-mono text-amber-600">{row.cutiPct}</td>
                  <td className="p-3 font-mono font-bold text-red-600">{row.alpha}</td>
                  <td className="p-3 font-mono font-bold text-red-600">{row.alphaPct}</td>
                  <td className="p-3 font-mono font-black text-emerald-600">{row.kehadiran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
