import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  TrendingDown,
  UserMinus,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Store,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  FileCheck,
  Building,
  MapPin,
  ChevronRight,
  Briefcase,
  AlertCircle
} from "lucide-react"
import Chart from "react-apexcharts"
import {
  storeFormatTurnoverData,
  recruitmentKpiData,
} from "../../data/mockData"

export const TurnoverPage: React.FC = () => {
  // Tab pilihan sesuai dengan gambar yang dikirimkan user: [Ikhtisar] [Sukarela (Voluntary)] [Non-Sukarela / PHK] [Habis Kontrak (<30 hr)]
  const [subTab, setSubTab] = useState<
    "overview" | "voluntary" | "non-voluntary" | "contract-expiry"
  >("overview")

  // State untuk aksi simulasi persetujuan kontrak pada tab habis kontrak
  const [processedContracts, setProcessedContracts] = useState<{ [id: string]: "extended" | "evaluated" }>({})

  const handleContractAction = (nik: string, action: "extended" | "evaluated") => {
    setProcessedContracts((prev) => ({ ...prev, [nik]: action }))
  }

  // --- CHART OPTIONS & DATA ---

  // 1. Overview Trend Chart
  const trendOptions: ApexCharts.ApexOptions = {
    chart: { type: "area", height: 280, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#DC2626", "#F59E0B"],
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
    },
    grid: { borderColor: "#F1F5F9" },
    tooltip: { y: { formatter: (val) => `${val} Staf` } }
  }
  const trendSeries = [
    { name: "Pengunduran Diri Sukarela", data: [52, 58, 64, 60, 71, 65, 60, 68, 75, 62] },
    { name: "Habis Kontrak / Non-Sukarela", data: [23, 24, 26, 28, 31, 30, 29, 24, 34, 34] },
  ]

  // 2. Position Turnover Chart
  const positionOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 280, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#172B4D"],
    plotOptions: { bar: { horizontal: true, borderRadius: 5 } },
    xaxis: {
      categories: [
        "Kasir (Cashier)",
        "Sales Advisor (SPG/B)",
        "Store Leader",
        "Visual Merchandiser",
        "Area Store Manager",
        "Operator / Gudang Hub",
      ],
    },
    grid: { borderColor: "#F1F5F9" },
    tooltip: { y: { formatter: (val) => `${val} Karyawan Keluar` } }
  }
  const positionSeries = [
    { name: "Karyawan Keluar (YTD)", data: [184, 156, 42, 28, 12, 35] },
  ]

  // 3. Voluntary Reasons Donut Chart (Quest #25)
  const voluntaryReasonOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut", fontFamily: "Inter, sans-serif" },
    labels: [
      "Gaji & Penawaran Kompetitor Ritel (38.7%)",
      "Jarak Lokasi & Jam Kerja Toko (27.4%)",
      "Melanjutkan Pendidikan / Wirausaha (19.4%)",
      "Alasan Keluarga / Domisili (14.5%)",
    ],
    colors: ["#DC2626", "#F59E0B", "#2563EB", "#10B981"],
    legend: { position: "bottom", fontSize: "11px" },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => `${val} Karyawan` } }
  }
  const voluntaryReasonSeries = [24, 17, 12, 9]

  // 4. Key Positions Voluntary Rate Chart (Quest #4)
  const keyPositionsRateOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 260, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#C8102E"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "45%" } },
    xaxis: {
      categories: ["Area Store Mgr (ASM)", "Visual Merch (VM)", "Store Leader", "Senior SPG/B", "Kasir Toko"],
    },
    yaxis: {
      labels: { formatter: (val) => `${val}%` },
      title: { text: "Tingkat Turnover (%)", style: { fontSize: "11px" } }
    },
    grid: { borderColor: "#F1F5F9" },
    tooltip: { y: { formatter: (val) => `${val}% (Target: < 5.0%)` } }
  }
  const keyPositionsRateSeries = [
    { name: "Tingkat Turnover Sukarela", data: [2.1, 4.8, 3.5, 7.2, 8.9] }
  ]

  // 5. Non-Voluntary Regional Correlation Chart (Quest #5)
  const nonVoluntaryCorrelationOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 260, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#DC2626", "#172B4D"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
    xaxis: {
      categories: ["Region Barat (Jabar & JKT)", "Region Tengah (Jateng & DIY)", "Region Timur (Jatim & Luar Jawa)"],
    },
    yaxis: {
      labels: { formatter: (val) => `${val}` },
      title: { text: "Jumlah Kasus PHK / Restrukturisasi", style: { fontSize: "11px" } }
    },
    grid: { borderColor: "#F1F5F9" },
    tooltip: { y: { formatter: (val) => `${val} Staf Toko` } }
  }
  const nonVoluntaryCorrelationSeries = [
    { name: "Toko Di Bawah Target (<80%)", data: [9, 3, 9] },
    { name: "Toko Sesuai Target (≥80%)", data: [5, 5, 3] },
  ]

  // 6. Contract Expiry by Format Chart (Quest #13)
  const contractExpiryFormatOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut", fontFamily: "Inter, sans-serif" },
    labels: [
      "Counter Dept Store (MDS/Sogo) - 11 Staf",
      "Showroom Mall - 4 Staf",
      "Family Store Standalone - 3 Staf",
    ],
    colors: ["#C8102E", "#F59E0B", "#172B4D"],
    legend: { position: "bottom", fontSize: "11px" },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => `${val} Karyawan Segera Habis` } }
  }
  const contractExpiryFormatSeries = [11, 4, 3]

  // Mock data karyawan kontrak habis <30 hari (Quest #13)
  const expiringContractsList = [
    {
      nik: "EMP-09142",
      name: "Rina Oktaviani",
      position: "Sales Advisor (SPG)",
      store: "Counter Sogo PVJ Bandung",
      region: "Region Barat",
      format: "Counter",
      endDate: "12 Nov 2026",
      daysLeft: 8,
      perfScore: 92,
      recommendation: "Perpanjang PKWT",
    },
    {
      nik: "EMP-09188",
      name: "Dimas Anggara",
      position: "Sales Advisor (SPB)",
      store: "Counter Matahari Tasik",
      region: "Region Barat",
      format: "Counter",
      endDate: "15 Nov 2026",
      daysLeft: 11,
      perfScore: 88,
      recommendation: "Perpanjang PKWT",
    },
    {
      nik: "EMP-08831",
      name: "Siti Rahmawati",
      position: "Kasir Toko",
      store: "Showroom Summarecon Mall",
      region: "Region Barat",
      format: "Showroom",
      endDate: "18 Nov 2026",
      daysLeft: 14,
      perfScore: 95,
      recommendation: "Promosi PKWTT",
    },
    {
      nik: "EMP-09255",
      name: "Fajar Nugraha",
      position: "Sales Advisor (SPB)",
      store: "FS Salatiga Standalone",
      region: "Region Tengah",
      format: "Family Store",
      endDate: "20 Nov 2026",
      daysLeft: 16,
      perfScore: 78,
      recommendation: "Evaluasi Khusus",
    },
    {
      nik: "EMP-09312",
      name: "Nabila Putri",
      position: "Sales Advisor (SPG)",
      store: "Counter Matahari Tegal",
      region: "Region Tengah",
      format: "Counter",
      endDate: "24 Nov 2026",
      daysLeft: 20,
      perfScore: 86,
      recommendation: "Perpanjang PKWT",
    },
    {
      nik: "EMP-08990",
      name: "Bayu Pratama",
      position: "Visual Merchandiser Jr",
      store: "Showroom Tunjungan Plaza",
      region: "Region Timur",
      format: "Showroom",
      endDate: "28 Nov 2026",
      daysLeft: 24,
      perfScore: 91,
      recommendation: "Perpanjang PKWT",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title & Tab Header Sesuai Gambar User */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Turnover & Retensi Tenaga Kerja
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-50 text-[#c8102e] border border-red-200">
              Quest #4, #5, #6, #13, #14, #25
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analisis pengunduran diri sukarela vs non-sukarela (PHK/Habis Kontrak), retensi posisi kunci, dan pemantauan masa habis kontrak.
          </p>
        </div>

        {/* TAB PERSIS SESUAI SCREENSHOT USER: [Ikhtisar] [Sukarela (Voluntary)] [Non-Sukarela / PHK] [Habis Kontrak (<30 hr)] */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold shadow-2xs">
          {[
            { id: "overview", label: "Ikhtisar" },
            { id: "voluntary", label: "Sukarela (Voluntary)" },
            { id: "non-voluntary", label: "Non-Sukarela / PHK" },
            { id: "contract-expiry", label: "Habis Kontrak (<30 hr)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${subTab === tab.id
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: IKHTISAR (OVERVIEW) */}
      {/* ========================================================================= */}
      {subTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* KPI Cards Ikhtisar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Turnover Bulanan
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-200">
                  Quest #5
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">0.77%</div>
              <span className="text-xs text-emerald-600 font-semibold">
                ↓ -12.0% turun vs September
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Karyawan Keluar
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                96 staf
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Total periode berjalan
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Keluar Sukarela
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                  Quest #4 & #25
                </span>
              </div>
              <div className="text-2xl font-black text-amber-600 mt-1">
                62 staf
              </div>
              <span className="text-xs text-slate-500 font-medium">
                64.5% dari total turnover
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Turnover Tahunan (Rate)
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">9.2%</div>
              <span className="text-xs text-emerald-600 font-semibold">
                Tolok Ukur Ritel: 18% (Sangat Baik)
              </span>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Rincian Turnover Bulanan (2026)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Quest #4 & #5
                  </span>
                </div>
                <span className="text-xs text-slate-400">Jumlah Orang</span>
              </div>
              <Chart
                options={trendOptions}
                series={trendSeries}
                type="area"
                height={280}
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Kecepatan Turnover Berdasarkan Posisi Ritel
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                    Quest #4 (High): ASM, VM & Leaders
                  </span>
                </div>
                <span className="text-xs text-slate-400">Peran Toko</span>
              </div>
              <Chart
                options={positionOptions}
                series={positionSeries}
                type="bar"
                height={280}
              />
            </div>
          </div>

          {/* Q6 & Q14: Store Format Turnover & Early Attrition Velocity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Q6: Turnover by Store Format (Family Store vs Showroom vs Counter) */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 mb-1.5">
                    <Store className="w-3 h-3 text-amber-600" />
                    <span>Pertanyaan Kritis #6 • Prioritas Sedang</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Turnover Berdasarkan Tipe Toko & Akar Penyebab
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evaluasi perbedaan tingkat turnover antara Family Store, Showroom Mall, dan Counter Departemen Store
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">Target: &lt; 3.0%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {storeFormatTurnoverData.map((fmt) => (
                  <div
                    key={fmt.format}
                    className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{fmt.format}</span>
                        <span className="text-[10px] font-semibold text-slate-500">{fmt.status}</span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">{fmt.turnoverRate}%</span>
                        <span className="text-[11px] text-slate-500">/ bulan</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {fmt.headcount.toLocaleString()} HC • {fmt.departuresYtd} keluar YTD
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Alasan Keluar Dominan
                      </span>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {fmt.primaryReasons}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q14: Early Attrition Velocity (30 Days / 90 Days / 1 Year) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 mb-1.5">
                  <Clock className="w-3 h-3 text-red-600" />
                  <span>Pertanyaan Kritis #14 • Prioritas Sedang</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Turnover Masa Awal Kerja (&lt; 30 Hari)
                </h3>
                <p className="text-xs text-slate-500">
                  Kecepatan turnover pada 30 hari pertama onboarding karyawan kontrak toko
                </p>

                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">Turnover 30-Hari Pertama</span>
                    <span className="text-base font-black text-emerald-600">1.8%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '18%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Saat ini: 1.8%</span>
                    <span>Batas Target: 2.5%</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Kelulusan Percobaan 90 Hari:</span>
                      <span className="font-bold text-slate-900">95.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Turnover &lt; 1 Tahun (Tahunan):</span>
                      <span className="font-bold text-slate-900">{recruitmentKpiData.turnoverUnderOneYear}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Penghematan Biaya per Rekrutmen:</span>
                      <span className="font-bold text-emerald-600">Rp {(recruitmentKpiData.costPerHire / 1000000).toFixed(2)} Jt</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                <button
                  onClick={() => setSubTab("contract-expiry")}
                  className="text-[#c8102e] font-bold hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Pantau Kontrak Segera Habis (&lt;30 Hari)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Exit Interviews & Offboarding Roster */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Karyawan Selesai Bekerja Terbaru (Log Keluar)
                </h3>
                <p className="text-xs text-slate-500">
                  Dokumentasi alasan pengunduran diri dan status penyelesaian administrasi (clearance)
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600">
                Menampilkan 5 data keluar terbaru
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
                  <tr>
                    <th className="p-3">Nama Karyawan</th>
                    <th className="p-3">Jabatan</th>
                    <th className="p-3">Unit Toko / Hub</th>
                    <th className="p-3">Alasan Keluar</th>
                    <th className="p-3">Tanggal Efektif</th>
                    <th className="p-3">Masa Kerja</th>
                    <th className="p-3 text-right">Status Administrasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Bambang Sugiarto</td>
                    <td className="p-3 text-slate-600">Supervisor Hub Gudang</td>
                    <td className="p-3 text-slate-600">Surabaya Central Hub</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">
                        Peluang Karir Lebih Baik
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 font-mono">23 Okt 2026</td>
                    <td className="p-3 text-slate-600 font-medium">2.4 Tahun</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        Selesai (Signed Off)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Fitri Handayani</td>
                    <td className="p-3 text-slate-600">Kasir Senior</td>
                    <td className="p-3 text-slate-600">3Second Bandung Indah Plaza</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        Keluarga / Domisili
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 font-mono">20 Okt 2026</td>
                    <td className="p-3 text-slate-600 font-medium">1.1 Tahun</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        Selesai (Signed Off)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Agus Salim</td>
                    <td className="p-3 text-slate-600">Staf Toko (SPB)</td>
                    <td className="p-3 text-slate-600">Famo Medan Focal Point</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                        Melanjutkan Pendidikan
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 font-mono">18 Okt 2026</td>
                    <td className="p-3 text-slate-600 font-medium">0.8 Tahun</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        Selesai (Signed Off)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SUKARELA (VOLUNTARY) - QUEST #4 & QUEST #25 */}
      {/* ========================================================================= */}
      {subTab === "voluntary" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* KPI Cards Khusus Voluntary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Keluar Sukarela (YTD)
              </span>
              <div className="text-2xl font-black text-amber-600 mt-1">62 Staf</div>
              <span className="text-xs text-slate-500 font-medium">
                64.58% dari seluruh turnover karyawan
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Voluntary Rate ASM
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Quest #4
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-600 mt-1">2.1%</div>
              <span className="text-xs text-emerald-600 font-semibold">
                Sangat Sehat (Target batas &lt; 5.0%)
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Voluntary Rate VM
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                  Quest #4
                </span>
              </div>
              <div className="text-2xl font-black text-amber-600 mt-1">4.8%</div>
              <span className="text-xs text-amber-600 font-semibold">
                Perhatian: Rotasi display koleksi
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Penyebab Utama #1
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                  Quest #25
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">38.7%</div>
              <span className="text-xs text-slate-500 font-medium">
                Gaji & Penawaran Kompetitor Fashion
              </span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart: 3 Alasan Utama Pengunduran Diri (Quest #25) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      3 Alasan Utama Pengunduran Diri Sukarela Toko
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                      Quest #25 (High)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Evaluasi alasan dominan: kompensasi, jam kerja shift ritel, atau faktor keluarga.
                  </p>
                </div>
              </div>
              <Chart
                options={voluntaryReasonOptions}
                series={voluntaryReasonSeries}
                type="donut"
                height={260}
              />
            </div>

            {/* Chart: Tingkat Turnover Sukarela Posisi Kunci (Quest #4) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      Tingkat Turnover Sukarela di Posisi Kunci
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                      Quest #4 (High)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Memantau stabilitas manajerial toko (Area Store Manager & Visual Merchandiser).
                  </p>
                </div>
              </div>
              <Chart
                options={keyPositionsRateOptions}
                series={keyPositionsRateSeries}
                type="bar"
                height={260}
              />
              {/* <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800">
                ✓ <strong>Posisi ASM sangat stabil (2.1%)</strong> dengan rata-rata masa kerja &gt; 3.5 tahun, membuktikan kepemimpinan operasional toko tetap solid.
              </div> */}
            </div>
          </div>

          {/* Tabel Log Resign Posisi Kunci & Exit Interview Feedback */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Catatan Pengunduran Diri Posisi Kunci & Status Pengganti (Backfill)
                </h3>
                <p className="text-xs text-slate-500">
                  Data wawancara keluar ASM, Visual Merchandiser, dan Store Leader beserta status rekrutmen pengganti
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                Quest #4 & #25
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
                  <tr>
                    <th className="p-3">Nama & NIK</th>
                    <th className="p-3">Posisi Kunci</th>
                    <th className="p-3">Unit Toko / Area</th>
                    <th className="p-3">Masa Kerja</th>
                    <th className="p-3">Alasan Form Exit Interview</th>
                    <th className="p-3">Status Pengganti (Backfill)</th>
                    <th className="p-3 text-right">Rekomendasi Retensi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">Reza Pahlevi</div>
                      <div className="text-[10px] text-slate-400 font-mono">EMP-07612</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700">
                        Area Store Manager
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">Area Bandung Raya (6 Toko)</td>
                    <td className="p-3 font-medium">3.8 Tahun</td>
                    <td className="p-3 text-slate-700">
                      Tawaran posisi Operations Head di brand kompetitor
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        ✓ Promosi Internal Store Leader
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-slate-500 font-medium">Counter offer tidak disetujui</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">Anisa Larasati</div>
                      <div className="text-[10px] text-slate-400 font-mono">EMP-08204</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                        Visual Merchandiser
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">Flagship Jakarta Selatan</td>
                    <td className="p-3 font-medium">1.9 Tahun</td>
                    <td className="p-3 text-slate-700">
                      Jarak tempuh rumah &gt; 2 jam dari lokasi toko
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                        Proses Rekrutmen Eksternal
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-slate-500 font-medium">Relokasi toko penuh</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">Fikri Maulana</div>
                      <div className="text-[10px] text-slate-400 font-mono">EMP-08499</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        Store Leader
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">FS Cirebon Standalone</td>
                    <td className="p-3 font-medium">2.2 Tahun</td>
                    <td className="p-3 text-slate-700">
                      Melanjutkan usaha retail keluarga
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        ✓ Suksesor Siap
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-slate-500 font-medium">Exit clearance selesai</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: NON-SUKARELA / PHK - QUEST #5 */}
      {/* ========================================================================= */}
      {subTab === "non-voluntary" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* KPI Cards Non-Voluntary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Non-Sukarela (PHK)
              </span>
              <div className="text-2xl font-black text-red-600 mt-1">34 Staf</div>
              <span className="text-xs text-slate-500 font-medium">
                35.42% dari total turnover keseluruhan
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Region Barat
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">14 Staf</div>
              <span className="text-xs text-slate-500 font-medium">
                41.2% • Toko Bandung & Jabodetabek
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Region Tengah
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">8 Staf</div>
              <span className="text-xs text-slate-500 font-medium">
                23.5% • Jateng & DIY
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Region Timur (Korelasi Q5)
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                  Quest #5
                </span>
              </div>
              <div className="text-2xl font-black text-[#c8102e] mt-1">12 Staf</div>
              <span className="text-xs text-red-600 font-semibold">
                Tinggi di Toko Underperforming
              </span>
            </div>
          </div>

          {/* Analisis Korelasi Regional vs Performa Penjualan (Quest #5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      Korelasi Non-Voluntary Turnover vs Pencapaian Omzet Toko (Quest #5)
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                      Quest #5 (High)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Membandingkan angka pemutusan kerja pada toko berkinerja rendah (&lt;80% target) vs toko berkinerja baik.
                  </p>
                </div>
              </div>

              <Chart
                options={nonVoluntaryCorrelationOptions}
                series={nonVoluntaryCorrelationSeries}
                type="bar"
                height={260}
              />
            </div>

            {/* Komposisi Akar Masalah Non-Sukarela */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Klasifikasi Alasan Non-Sukarela
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pembagian 34 kasus pemutusan hubungan kerja
                </p>

                <div className="space-y-3 mt-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>Pelanggaran Disiplin Berat (SP-3)</span>
                      <span className="text-red-600">15 Kasus (44.1%)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Absensi tanpa kabar (mangkir &gt;5 hari) & kelalaian operasional kasir.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>Efisiensi Counter / Toko Ditutup</span>
                      <span className="text-amber-600">11 Kasus (32.4%)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Penutupan counter department store yang tidak mencapai break-even omzet.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>Gagal Evaluasi Masa Percobaan</span>
                      <span className="text-blue-600">8 Kasus (23.5%)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Skor KPI service & product knowledge &lt; 70 pada evaluasi 90 hari.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-700 font-semibold flex items-center justify-between">
                <span>Kompensasi Sesuai PP 35/2021:</span>
                <span className="text-emerald-700 font-bold">100% Tuntas</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: HABIS KONTRAK (<30 HARI) - QUEST #13 & QUEST #14 */}
      {/* ========================================================================= */}
      {subTab === "contract-expiry" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* KPI Cards Habis Kontrak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Kontrak Habis &le; 30 Hari
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                  Quest #13
                </span>
              </div>
              <div className="text-2xl font-black text-[#c8102e] mt-1">18 Staf</div>
              <span className="text-xs text-red-600 font-semibold">
                Krusial: Butuh Persetujuan Cepat
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Porsi di Counter Dept Store
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">61.1%</div>
              <span className="text-xs text-slate-500 font-medium">
                11 dari 18 staf adalah SPG/B Counter
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Rekomendasi Perpanjang
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">14 Staf</div>
              <span className="text-xs text-emerald-600 font-semibold">
                Performa toko & skor &gt; 85%
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estimasi Uang Kompensasi PKWT
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">Rp 48.6 Jt</div>
              <span className="text-xs text-slate-500 font-medium">
                Sesuai masa kerja regulasi PP 35
              </span>
            </div>
          </div>

          {/* Tabel Interaktif Simulasi Aksi Kontrak */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Daftar Karyawan Kontrak Menjelang Habis (&le; 30 Hari) & Tindakan HR
                </h3>
                <p className="text-xs text-slate-500">
                  Simulasikan persetujuan perpanjangan kontrak PKWT atau jadwal evaluasi manajerial
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Menampilkan 6 Staf Paling Kritis
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
                  <tr>
                    <th className="p-3">Nama & NIK</th>
                    <th className="p-3">Jabatan</th>
                    <th className="p-3">Unit Toko / Counter</th>
                    <th className="p-3">Tipe Gerai</th>
                    <th className="p-3">Tanggal Berakhir</th>
                    <th className="p-3">Sisa Waktu</th>
                    <th className="p-3">Skor Performa</th>
                    <th className="p-3">Rekomendasi</th>
                    <th className="p-3 text-right">Tindakan Keputusan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expiringContractsList.map((c) => {
                    const status = processedContracts[c.nik]
                    return (
                      <tr key={c.nik} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{c.nik}</div>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">{c.position}</td>
                        <td className="p-3 text-slate-600">{c.store}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.format === "Counter"
                            ? "bg-red-50 text-[#c8102e] border border-red-200"
                            : "bg-slate-100 text-slate-700"
                            }`}>
                            {c.format}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-700">{c.endDate}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${c.daysLeft <= 10
                            ? "bg-red-100 text-red-800"
                            : c.daysLeft <= 15
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                            }`}>
                            <Clock className="w-3 h-3" />
                            {c.daysLeft} Hari Lagi
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-900">
                          {c.perfScore}%
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.recommendation.includes("PKWTT")
                            ? "bg-blue-50 text-blue-700"
                            : c.recommendation.includes("Perpanjang")
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                            }`}>
                            {c.recommendation}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {status === "extended" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Disetujui Perpanjang
                            </span>
                          ) : status === "evaluated" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                              Dijadwalkan Evaluasi
                            </span>
                          ) : (
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleContractAction(c.nik, "extended")}
                                className="px-2.5 py-1 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Perpanjang
                              </button>
                              <button
                                onClick={() => handleContractAction(c.nik, "evaluated")}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                              >
                                Evaluasi
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakdown Per Format Toko */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Sebaran Kontrak Kritis Berdasarkan Tipe Format Gerai
              </h3>
              <span className="text-xs font-mono text-slate-400">Total 18 Staf</span>
            </div>
            <div className="pt-3">
              <Chart
                options={contractExpiryFormatOptions}
                series={contractExpiryFormatSeries}
                type="donut"
                height={240}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
