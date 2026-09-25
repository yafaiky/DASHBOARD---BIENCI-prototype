import React, { useState } from "react"
import Chart from "react-apexcharts"
import {
  Store,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  MapPin,
  Scale,
  Clock,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  AlertCircle,
  HeartHandshake,
  Flame,
  Search,
} from "lucide-react"
import {
  mockStorePerformances,
  storeStaffingRatioData,
  storeLeaderTenureImpact,
  regionalDemographicsProductivityData,
  storeTenureGapData,
} from "../../data/mockData"

export const StorePerformancePage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Barat" | "Timur">("All")
  const [searchStore, setSearchStore] = useState("")
  const [demographicCohortTab, setDemographicCohortTab] = useState<"tenure" | "age">("tenure")

  React.useEffect(() => {
    const hash = window.location.hash
    if (hash === "#quest-17" || hash === "#quest-16") {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""))
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 150)
    }
  }, [])

  // Q17 Chart 1: Bar Chart Perbandingan Metrik Kinerja (Revenue/FTE, Kuota, Turnover)
  const perfMetricsOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 280,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    colors: ["#2563EB", "#059669"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "46%",
        borderRadius: 4,
        dataLabels: {
          position: "top"
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -18,
      style: {
        fontSize: "11px",
        fontWeight: 700,
        colors: ["#0F172A"]
      },
      formatter: (val: number, opts) => {
        const idx = opts?.dataPointIndex
        if (idx === 0) return `Rp ${val}Jt`
        return `${val}%`
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Revenue / FTE (Jt)",
        "Pencapaian Kuota (%)",
        "Turnover Toko (%)"
      ],
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 600,
          colors: "#475569"
        }
      }
    },
    yaxis: {
      max: 125,
      labels: {
        formatter: (val: number) => `${val.toFixed(0)}`,
        style: {
          fontSize: "11px",
          colors: "#64748B"
        }
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "11px",
      fontWeight: 600,
      markers: {
        shape: "circle"
      }
    },
    tooltip: {
      y: {
        formatter: (val: number, opts) => {
          const idx = opts?.dataPointIndex
          if (idx === 0) return `Rp ${val.toFixed(1)} Juta / FTE`
          if (idx === 1) return `${val.toFixed(1)}% Kuota Target`
          return `${val.toFixed(1)}% Turnover Tahunan`
        }
      }
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 3
    }
  }

  const perfMetricsSeries = [
    {
      name: "Area Barat (Sumatera / Jabar)",
      data: [71.2, 104.2, 11.4]
    },
    {
      name: "Area Timur (Jateng / Jatim / Luar Jawa)",
      data: [64.8, 107.5, 6.8]
    }
  ]

  // Q17 Chart 2: Stacked Bar Chart Perbandingan Demografi (Masa Kerja)
  const demographicTenureOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 280,
      stacked: true,
      stackType: "100%",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif"
    },
    colors: ["#F59E0B", "#3B82F6", "#10B981"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "52%",
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
      style: {
        fontSize: "11px",
        fontWeight: 700,
        colors: ["#FFFFFF"]
      }
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    xaxis: {
      categories: ["Area Barat", "Area Timur"],
      labels: {
        formatter: (val: string) => `${val}%`,
        style: {
          fontSize: "11px",
          colors: "#64748B"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          colors: "#1E293B"
        }
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "11px",
      fontWeight: 600,
      markers: {
        shape: "circle"
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}% dari total staf regional`
      }
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 3
    }
  }

  const demographicTenureSeries = [
    {
      name: "< 1 Thn (Staf Baru)",
      data: [42, 22]
    },
    {
      name: "1 – 3 Thn (Terkonfirmasi)",
      data: [38, 48]
    },
    {
      name: "> 3 Thn (Senior / Core)",
      data: [20, 30]
    }
  ]

  // Q17 Chart 2: Stacked Bar Chart Perbandingan Demografi (Rentang Usia)
  const demographicAgeOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 280,
      stacked: true,
      stackType: "100%",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif"
    },
    colors: ["#38BDF8", "#6366F1", "#8B5CF6", "#64748B"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "52%",
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
      style: {
        fontSize: "11px",
        fontWeight: 700,
        colors: ["#FFFFFF"]
      }
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    xaxis: {
      categories: ["Area Barat", "Area Timur"],
      labels: {
        formatter: (val: string) => `${val}%`,
        style: {
          fontSize: "11px",
          colors: "#64748B"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          colors: "#1E293B"
        }
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "11px",
      fontWeight: 600,
      markers: {
        shape: "circle"
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}% dari total staf regional`
      }
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 3
    }
  }

  const demographicAgeSeries = [
    {
      name: "< 21 Thn",
      data: [22, 10]
    },
    {
      name: "21 – 25 Thn",
      data: [52, 42]
    },
    {
      name: "26 – 30 Thn",
      data: [18, 34]
    },
    {
      name: "> 30 Thn",
      data: [8, 14]
    }
  ]

  // Q16 Chart: 100% Stacked Bar Chart Horizontal (4 Kelompok Jabatan)
  const tenureGapStackedOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      stacked: true,
      stackType: "100%",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif"
    },
    colors: ["#F59E0B", "#3B82F6", "#10B981"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "56%",
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => (val >= 6 ? `${val.toFixed(0)}%` : ""),
      style: {
        fontSize: "11px",
        fontWeight: 700,
        colors: ["#FFFFFF"]
      }
    },
    stroke: {
      width: 1.5,
      colors: ["#ffffff"]
    },
    xaxis: {
      categories: [
        "Store Manager (Senior)",
        "Asst. Store Manager / Spv",
        "Senior Associate / Kasir Head",
        "Junior Sales Associate (SPG/B)"
      ],
      labels: {
        formatter: (val: string) => `${val}%`,
        style: {
          fontSize: "11px",
          fontWeight: 600,
          colors: "#64748B"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          colors: "#1E293B"
        }
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "11px",
      fontWeight: 600,
      markers: {
        shape: "circle"
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}% dari total staf kelompok jabatan ini`
      }
    },
    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 3
    }
  }

  const tenureGapStackedSeries = [
    {
      name: "< 1 Tahun (Staf Baru / First Jobbers)",
      data: [4, 12, 24, 71]
    },
    {
      name: "1 – 3 Tahun (Terkonfirmasi / Menengah)",
      data: [14, 48, 56, 25]
    },
    {
      name: "> 3 Tahun (Senior / Core Leaders)",
      data: [82, 40, 20, 4]
    }
  ]

  const filteredStores = mockStorePerformances.filter((s) => {
    const matchBrand = selectedBrand === "All" || s.brand === selectedBrand
    const matchRegion = selectedRegion === "All" || s.region === selectedRegion
    const matchSearch =
      s.storeName.toLowerCase().includes(searchStore.toLowerCase()) ||
      s.storeId.toLowerCase().includes(searchStore.toLowerCase()) ||
      s.cluster.toLowerCase().includes(searchStore.toLowerCase())
    return matchBrand && matchRegion && matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
          Kinerja Toko Retail (HR & Penjualan)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Korelasi jadwal staf toko, pencapaian target penjualan, biaya tenaga kerja, demografi regional, dan pendapatan per karyawan ritel
        </p>
      </div>

      {/* Filter Toolbar: Brand & Search Tetap di Kiri, Region di Kanan (Sejajar 1 Baris) */}
      <div className="w-full bg-slate-100/90 p-1 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar shadow-2xs">
        <div className="w-full flex items-center justify-between flex-nowrap whitespace-nowrap min-w-max gap-4 text-xs font-semibold">
          {/* Sisi Kiri: Search Box & Brand Filter */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Box */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari nama / ID toko..."
                value={searchStore}
                onChange={(e) => setSearchStore(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-500 w-56 font-inter shadow-2xs"
              />
            </div>

            {/* Brand Filter */}
            <div className="inline-flex items-center flex-nowrap p-0.5 bg-slate-200/70 rounded-lg text-xs font-semibold shrink-0 gap-0.5">
              {["All", "3SECOND", "GREENLIGHT", "FAMO"].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedBrand === b
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Sisi Kanan: Region Filter */}
          <div className="inline-flex items-center flex-nowrap p-0.5 bg-slate-200/70 rounded-lg text-xs font-semibold shrink-0 gap-0.5 ml-auto">
            {(["All", "Barat", "Timur"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedRegion === r
                    ? "bg-[#c8102e] text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {r === "All" ? "Semua Region" : `Area ${r}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Sales
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
               Quest #1
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 142.8 Miliar
          </div>
          <span className="text-xs text-emerald-600 font-semibold">
            ↑ +5.6% vs Q3 target
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Target Ach.
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
               Quest #28
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            105.8%
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Over quota nationwide
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Retail Associates
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
               Quest #1 & #18
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            11,240 staff
          </div>
          <span className="text-xs text-blue-600 font-medium">
            342 active retail stores
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Revenue / FTE
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
               Quest #21
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            Rp 68.4 Juta
          </div>
          <span className="text-xs text-emerald-600 font-semibold">
            Optimal floor productivity
          </span>
        </div>
      </div>

      {/*  Quest #17: Regional Demographics & Productivity Trend (Area Barat vs Area Timur) */}
      <div id="quest-17" className="bg-white p-6 border-2 border-slate-200 shadow-xs space-y-6 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#c8102e] border border-rose-200 mb-1.5">
              <Compass className="w-3.5 h-3.5 text-[#c8102e]" />
              <span>Critical Question #17 • Prioritas Medium</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 font-heading">
              Tren Demografi & Produktivitas Karyawan: Area Timur vs Area Barat
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Metrik Terkait: <strong>Demografi (Usia / Masa Kerja) & Area Store</strong> — Evaluasi korelasi profil demografi usia dan masa kerja terhadap pencapaian target penjualan retail
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Total 342 Toko (218 Barat vs 124 Timur)
            </span>
          </div>
        </div>

        {/* BARIS 1 (TOP): KARTU KPI RINGKAS (AREA BARAT VS AREA TIMUR) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Area Barat KPI Summary */}
          <div className="p-5 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white space-y-3.5 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-600" />
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    {regionalDemographicsProductivityData.west.regionName}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {regionalDemographicsProductivityData.west.totalStores} Toko
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {regionalDemographicsProductivityData.west.coverage}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Headcount</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {regionalDemographicsProductivityData.west.totalHeadcount.toLocaleString()} Staf
                </span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-white border border-blue-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Rata-rata Usia</span>
                <span className="text-base font-black text-slate-900">{regionalDemographicsProductivityData.west.avgAge} Thn</span>
                <span className="text-[10px] text-blue-600 block font-semibold mt-0.5">Gen-Z (Muda)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Masa Kerja (Tenure)</span>
                <span className="text-base font-black text-slate-900">{regionalDemographicsProductivityData.west.avgTenureYears} Thn</span>
                <span className="text-[10px] text-amber-600 block font-semibold mt-0.5">Turnover 11.4%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Revenue / FTE</span>
                <span className="text-base font-black text-emerald-700">Rp 71.2 Jt</span>
                <span className="text-[10px] text-emerald-600 block font-semibold mt-0.5"> Unggul Volume</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Pencapaian Kuota</span>
                <span className="text-base font-black text-slate-900">{regionalDemographicsProductivityData.west.targetAchievement}%</span>
                <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Ratio {regionalDemographicsProductivityData.west.supervisionRatio}</span>
              </div>
            </div>
          </div>

          {/* Area Timur KPI Summary */}
          <div className="p-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white space-y-3.5 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-600" />
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    {regionalDemographicsProductivityData.east.regionName}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {regionalDemographicsProductivityData.east.totalStores} Toko
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {regionalDemographicsProductivityData.east.coverage}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Headcount</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {regionalDemographicsProductivityData.east.totalHeadcount.toLocaleString()} Staf
                </span>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Rata-rata Usia</span>
                <span className="text-base font-black text-slate-900">{regionalDemographicsProductivityData.east.avgAge} Thn</span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5"> Lebih Matang</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Masa Kerja (Tenure)</span>
                <span className="text-base font-black text-slate-900">{regionalDemographicsProductivityData.east.avgTenureYears} Thn</span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5"> Turnover 6.8%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Revenue / FTE</span>
                <span className="text-base font-black text-slate-900">Rp 64.8 Jt</span>
                <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">Stabil & Efisien</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Pencapaian Kuota</span>
                <span className="text-base font-black text-emerald-700">{regionalDemographicsProductivityData.east.targetAchievement}%</span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5"> Kuota Tertinggi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Perbandingan Metrik Kinerja Kunci (Barat vs Timur)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Komparasi Revenue per FTE (Jt Rp), Pencapaian Target Kuota (%), dan Rasio Turnover (%)
              </p>
            </div>

            <div className="my-2">
              <Chart
                options={perfMetricsOptions}
                series={perfMetricsSeries}
                type="bar"
                height={270}
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Barat: <strong>Volume Rp 71.2 Jt/FTE</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Timur: <strong>Kuota 107.5% &amp; Retensi 6.8%</strong></span>
              </span>
            </div>
          </div>

          {/* Chart 2: Stacked Bar Chart Perbandingan Demografi */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
            <div>
              <div className="items-center flex items-center justify-between gap-2 mb-2">
                {/* Cohort Toggle Buttons */}
                <div className=" items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setDemographicCohortTab("tenure")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      demographicCohortTab === "tenure"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Masa Kerja
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemographicCohortTab("age")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      demographicCohortTab === "age"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Rentang Usia
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-black text-slate-900 font-heading">
                {demographicCohortTab === "tenure"
                  ? "Distribusi Komposisi Masa Kerja (Tenure Cohorts)"
                  : "Distribusi Kelompok Rentang Usia Staf Toko"}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {demographicCohortTab === "tenure"
                  ? "Proporsi staf baru (<1 Thn), berkembang (1-3 Thn), dan staf senior (>3 Thn)"
                  : "Proporsi staf usia <21 Thn, 21-25 Thn, 26-30 Thn, dan >30 Thn per regional"}
              </p>
            </div>

            <div className="my-2">
              <Chart
                options={demographicCohortTab === "tenure" ? demographicTenureOptions : demographicAgeOptions}
                series={demographicCohortTab === "tenure" ? demographicTenureSeries : demographicAgeSeries}
                type="bar"
                height={270}
              />
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* BARIS 3 (BOTTOM): TABEL EVALUASI MATRIKS 6 DIMENSI & KESIMPULAN STRATEGIS */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading flex items-center gap-2">
                <span>Tabel Evaluasi Matriks 6 Dimensi HR Retail (Head-to-Head)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Data Excel HR Biensi
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Referensi perbandingan detail metrik demografi dan produktivitas beserta status keunggulan strategis
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Dimensi Metrik Evaluasi</th>
                  <th className="p-3 text-blue-900">Area Barat (Sumatera / Jabodetabek / Jabar)</th>
                  <th className="p-3 text-emerald-900">Area Timur (Jateng / Jatim / Luar Jawa)</th>
                  <th className="p-3">Selisih &amp; Tren Komparasi</th>
                  <th className="p-3 text-right">Kesimpulan Strategis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {regionalDemographicsProductivityData.comparisonMetrics.map((row) => {
                  const isWestWinner = row.winner.includes("Barat")
                  const isEastWinner = row.winner.includes("Timur")

                  return (
                    <tr key={row.metric} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isWestWinner ? "bg-blue-600" : isEastWinner ? "bg-emerald-600" : "bg-slate-400"}`} />
                        <span>{row.metric}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-800 font-mono">{row.westVal}</td>
                      <td className="p-3 font-semibold text-slate-800 font-mono">{row.eastVal}</td>
                      <td className="p-3 text-slate-600">{row.diff}</td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-black border ${
                            isWestWinner
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : isEastWinner
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-800 border-slate-200"
                          }`}
                        >
                          {row.winner}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        </div>

      {/* Q3 & Q28: Staffing Ratio & Store Leader Tenure Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Q3: Store Staffing Composition & Ratio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 mb-1.5">
                <Scale className="w-3 h-3 text-blue-600" />
                <span>Pertanyaan Kritis #3 • Prioritas Tinggi</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Rasio Komposisi Staf Toko (SPG/B terhadap Store Leader)
              </h3>
              <p className="text-xs text-slate-500">
                Rentang supervisi optimal di seluruh format gerai ritel untuk produktivitas sales floor toko
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Rata-rata Nasional
              </span>
              <span className="text-base font-black text-slate-900 font-mono">
                {storeStaffingRatioData.nationalAverageRatio}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {storeStaffingRatioData.breakdown.map((item) => (
              <div
                key={item.format}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{item.format}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800">
                    {item.productivityStatus}
                  </span>
                </div>
                <div className="text-xs font-black text-slate-900 mt-1 font-mono">
                  {item.ratio}
                </div>
                <p className="text-[10px] text-slate-500">
                  Model pengawasan selaras dengan luas area gerai
                </p>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Keseimbangan Staf:</strong> 1 Pimpinan : 11 Rekan di Family Store mempertahankan interaksi pelanggan tinggi tanpa membebani pimpinan.
            </span>
          </div>
        </div>

        {/* Q28: Store Leader Tenure vs Consistent Target Achievement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 mb-1.5">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>Pertanyaan Kritis #28 • Prioritas Sedang</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Masa Kerja Store Leader vs Konsistensi Capai Target
              </h3>
              <p className="text-xs text-slate-500">
                Pengaruh pengalaman Store Manager (&gt;5 thn vs &lt;1 thn) terhadap konsistensi pencapaian target toko
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
              Korelasi Positif Kuat
            </span>
          </div>

          <div className="space-y-2.5">
            {storeLeaderTenureImpact.map((cohort) => (
              <div
                key={cohort.tenureGroup}
                className="p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/40 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{cohort.tenureGroup}</div>
                  <div className="text-[11px] text-slate-500">{cohort.countStores} Stores Nationwide</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    cohort.avgAchievement >= 105
                      ? 'bg-emerald-100 text-emerald-800'
                      : cohort.avgAchievement >= 100
                      ? 'bg-blue-100 text-blue-800'
                      : cohort.avgAchievement >= 95
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cohort.status}
                  </span>
                  <div className="text-right min-w-[55px]">
                    <div className="text-sm font-black text-slate-900 font-mono">{cohort.avgAchievement}%</div>
                    <div className="text-[10px] text-slate-400">Avg Ach.</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎯 Quest #16: Kesenjangan Masa Kerja (Tenure Gap) Antara Store Manager vs Staf Baru & Analisis Konflik */}
      <div id="quest-16" className="bg-white p-6 border-2 border-slate-200 shadow-xs space-y-6 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              <span>Critical Question #16 • Prioritas Medium</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 font-heading">
              Kesenjangan (Tenure Gap) Masa Kerja: Store Manager vs Staf Baru & Risiko Konflik
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Metrik Terkait: <strong>Komposisi masa kerja berdasarkan kelompok jabatan</strong> — Mengidentifikasi gap pengalaman senior-junior dan mitigasi pemicu friksi operasional toko
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Tenure Gap: {storeTenureGapData.overallGapYears} Tahun</span>
            </span>
          </div>
        </div>

        {/* 3 Overview Highlight Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              Store Manager (Senior)
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
              {storeTenureGapData.storeManagerTenure} Tahun
            </div>
            <span className="text-xs text-slate-600 font-medium">
              82% masa kerja &gt; 3 tahun (Stabilitas tinggi)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              Frontline Associate (Staf Baru)
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1 font-mono">
              {storeTenureGapData.frontlineStaffTenure} Tahun
            </div>
            <span className="text-xs text-amber-700 font-medium">
              71% masa kerja &lt; 1 tahun (First jobbers / Gen-Z)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <div className="text-[11px] font-bold uppercase text-amber-900 tracking-wider flex items-center justify-between">
              <span>Gap Kesenjangan Pengalaman</span>
              <Flame className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <div className="text-2xl font-black text-orange-700 mt-1 font-mono">
              Δ {storeTenureGapData.overallGapYears} Tahun
            </div>
            <span className="text-xs text-orange-800 font-semibold">
              Kesenjangan budaya & gaya komunikasi signifikan
            </span>
          </div>
        </div>

        {/* BAGIAN TENGAH (CHART UTAMA): 100% STACKED BAR CHART HORIZONTAL */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 font-heading">
                Komposisi Masa Kerja Berdasarkan 4 Kelompok Jabatan Toko
              </h3>
              <p className="text-xs text-slate-500">
                Visualisasi proporsi masa kerja &lt;1 Thn (Staf Baru), 1–3 Thn (Menengah), dan &gt;3 Thn (Senior) di 342 toko retail (11.240 staf)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                Total 11.240 Staf Toko
              </span>
            </div>
          </div>

          <div className="my-1">
            <Chart
              options={tenureGapStackedOptions}
              series={tenureGapStackedSeries}
              type="bar"
              height={300}
            />
          </div>
        </div>

        {/* BAGIAN BAWAH (KETERANGAN / TAKEAWAY & TABEL REFERENSI DETAIL) */}
        <div className="space-y-4">
          {/* Tabel Detail 4 Kelompok Jabatan Toko */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Kelompok Jabatan</th>
                  <th className="p-3">Level Jabatan</th>
                  <th className="p-3 text-right">Headcount</th>
                  <th className="p-3 text-right">Rata-Rata Tenure</th>
                  <th className="p-3">Distribusi Komposisi Masa Kerja</th>
                  <th className="p-3">Tingkat Risiko Friksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {storeTenureGapData.jobLevelBreakdown.map((job) => (
                  <tr key={job.role} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      <div>{job.role}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5 max-w-xs">{job.culturalTrait}</div>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{job.level}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800">{job.headcount.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono font-black text-slate-900">{job.avgTenureYears} Thn</td>
                    <td className="p-3">
                      <div className="space-y-1 min-w-[170px]">
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span className="text-amber-600">&lt;1 Thn: {job.tenureSpread.lessThan1Year}%</span>
                          <span className="text-blue-600">1-3 Thn: {job.tenureSpread.oneToThreeYears}%</span>
                          <span className="text-emerald-600">&gt;3 Thn: {job.tenureSpread.moreThan3Years}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-amber-400" style={{ width: `${job.tenureSpread.lessThan1Year}%` }} />
                          <div className="h-full bg-blue-500" style={{ width: `${job.tenureSpread.oneToThreeYears}%` }} />
                          <div className="h-full bg-emerald-600" style={{ width: `${job.tenureSpread.moreThan3Years}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          job.conflictRisk.includes("High")
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : job.conflictRisk.includes("Medium")
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {job.conflictRisk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Store Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Papan Peringkat Kinerja Jaringan Toko
            </h3>
            <p className="text-xs text-slate-500">
              Menampilkan {filteredStores.length} toko retail dari total 342 toko aktif
              {selectedRegion !== "All" && ` • Filter aktif: Area ${selectedRegion}`}
              {selectedBrand !== "All" && ` • Brand: ${selectedBrand}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              342 toko melapor waktu-nyata
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100 font-bold">
              <tr>
                <th className="p-3">Detail Toko</th>
                <th className="p-3">Region</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Format Gerai</th>
                <th className="p-3">Jumlah Staf (HC)</th>
                <th className="p-3">Rasio SPG/B:Pimpinan</th>
                <th className="p-3">Masa Kerja Leader</th>
                <th className="p-3">Penjualan (Rp)</th>
                <th className="p-3">Target (Rp)</th>
                <th className="p-3">Pencapaian (%)</th>
                <th className="p-3">Biaya Tenaga Kerja</th>
                <th className="p-3">Revenue / FTE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStores.map((s) => (
                <tr
                  key={s.storeId}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-900">
                      {s.storeName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {s.storeId} • {s.cluster}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.region === 'Barat'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : s.region === 'Timur'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      Area {s.region}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-900 text-white">
                      {s.brand}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {s.format || 'Family Store'}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-800">
                    {s.headcount} staff
                  </td>
                  <td className="p-3 font-mono text-slate-600 text-[11px]">
                    {s.staffRatio || '1 : 8.0'}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                      {s.leaderTenure || '2.5 Years'}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-900 font-mono">
                    Rp {(s.sales / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3 text-slate-500 font-mono">
                    Rp {(s.targetSales / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold font-mono ${s.achievementRate >= 100 ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {s.achievementRate}%
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${s.achievementRate >= 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                          style={{
                            width: `${Math.min(s.achievementRate, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-mono">
                    Rp {(s.labourCost / 1000000).toFixed(0)}M
                  </td>
                  <td className="p-3 font-bold text-emerald-600 font-mono">
                    Rp {(s.revenuePerFte / 1000000).toFixed(1)}M
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
