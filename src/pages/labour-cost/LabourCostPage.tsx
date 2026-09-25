import React, { useState, useMemo } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  BarChart2,
  Clock,
  Sparkles,
  CheckCircle2,
  Zap,
  Sliders,
  RotateCcw,
  AlertTriangle,
  Building2,
  Layers,
  ArrowRight,
  Filter,
  Users,
  Store,
  ChevronRight
} from "lucide-react"
import Chart from "react-apexcharts"
import {
  mockStorePerformances,
  peakSeasonSavingsData,
  salesPerHourData,
  divisionLabourCostData,
  departmentLabourCostData,
  regionalLabourCostData,
} from "../../data/mockData"

export const LabourCostPage: React.FC = () => {
  // Region Selection Tab: All, Barat, Tengah, Timur (sesuai gambar yang dikirimkan)
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Barat" | "Tengah" | "Timur">("All")

  // View Tab
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "divisions" | "departments" | "productivity">("overview")

  // Ambil data regional aktif berdasarkan tab
  const currentRegionData = regionalLabourCostData[selectedRegion]

  // Mixed Chart Options (Monthly Revenue vs Labour Cost Ratio)
  const mixedChartOptions: ApexCharts.ApexOptions = {
    chart: { height: 320, type: "line", toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    stroke: { width: [0, 3], curve: "smooth" },
    colors: ["#172B4D", "#C8102E"],
    dataLabels: { enabled: false },
    labels: currentRegionData.chartMonths,
    xaxis: {
      labels: { style: { colors: "#64748B", fontSize: "11px" } }
    },
    yaxis: [
      {
        title: {
          text: "Penjualan Bulanan (Miliar Rp)",
          style: { fontSize: "11px", color: "#172B4D", fontWeight: 600 },
        },
        labels: { formatter: (val) => `Rp ${val.toFixed(1)}M` },
      },
      {
        opposite: true,
        title: {
          text: "Rasio Biaya Tenaga Kerja (%)",
          style: { fontSize: "11px", color: "#C8102E", fontWeight: 600 },
        },
        labels: { formatter: (val) => `${val.toFixed(1)}%` },
      },
    ],
    grid: { borderColor: "#F1F5F9" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number | undefined) => {
          if (val === undefined) return ""
          if (val > 20) return `Rp ${val.toFixed(2)} Miliar`
          return `${val.toFixed(2)}% dari Penjualan`
        }
      }
    }
  }

  const mixedChartSeries = [
    { name: "Penjualan Aktual", type: "column", data: currentRegionData.chartSalesData },
    {
      name: "Rasio Biaya Tenaga Kerja",
      type: "line",
      data: currentRegionData.chartRatioData,
    },
  ]

  // Filter toko berdasarkan region yang dipilih
  const filteredStores =
    selectedRegion === "All"
      ? mockStorePerformances
      : mockStorePerformances.filter((s) => s.region === selectedRegion)

  return (
    <div className="space-y-6">
      {/* Title & Regional Tab Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Biaya Tenaga Kerja & Produktivitas
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-50 text-[#c8102e] border border-red-200">
              Quest #2, #11, #15, #21, #22
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analisis komprehensif labour cost per divisi & departemen, kontribusi revenue, simulasi skenario regional, dan batas efisiensi ritel.
          </p>
        </div>

        {/* Tab yang Dikirimkan User: [Region All] [Region Barat] [Region Tengah] [Region Timur] */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold shadow-2xs">
            {(["All", "Barat", "Tengah", "Timur"] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${selectedRegion === reg
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                  }`}
              >
                Region {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigasi Sub-Tab Halaman */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${activeSubTab === "overview"
              ? "border-[#c8102e] text-[#c8102e]"
              : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Ikhtisar Biaya Regional</span>
        </button>

        <button
          onClick={() => setActiveSubTab("divisions")}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${activeSubTab === "divisions"
              ? "border-[#c8102e] text-[#c8102e]"
              : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Biaya per Divisi (Quest #2 & #15)</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-100 text-[#c8102e] font-black">
            High
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab("departments")}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${activeSubTab === "departments"
              ? "border-[#c8102e] text-[#c8102e]"
              : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
        >
          <Layers className="w-4 h-4" />
          <span>Biaya per Departemen (12 Dept)</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-100 text-blue-700 font-black">
            Ranking Rasio
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab("productivity")}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap flex items-center gap-2 ${activeSubTab === "productivity"
              ? "border-[#c8102e] text-[#c8102e]"
              : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
        >
          <Zap className="w-4 h-4" />
          <span>Produktivitas Toko & Musiman (Q11, Q22)</span>
        </button>
      </div>

      {/* TAB 1: IKHTISAR BIAYA REGIONAL */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          {/* KPI Cards Dinamis Berdasarkan Region yang Dipilih */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Labour Cost ({selectedRegion})
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
                  Quest #15
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                Rp {(currentRegionData.monthlyLabourCost / 1000000000).toFixed(2)} Miliar
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terkendali dalam batas anggaran (-1.4%)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Rata-rata Biaya / FTE
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {currentRegionData.totalHeadcount} Staf
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                Rp {(currentRegionData.avgCostPerFte / 1000000).toFixed(2)} Juta
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Gaji pokok + tunjangan toko + BPJS
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Revenue per FTE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Quest #21
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                Rp {(currentRegionData.revenuePerFte / 1000000).toFixed(1)} Juta
              </div>
              <span className="text-xs text-emerald-600 font-semibold">
                ↑ +4.8% di atas tolok ukur ritel
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Rasio Labour Cost (%)
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
                  Quest #2
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {currentRegionData.labourCostRatio.toFixed(2)}%
              </div>
              <span className="text-xs text-blue-600 font-semibold">
                Ambang Batas Sehat Ritel (&lt;10%)
              </span>
            </div>
          </div>

          {/* Chart Section: Revenue vs Labour Cost Efficiency */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Efisiensi Penjualan vs Biaya Tenaga Kerja ({currentRegionData.name})
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-[#c8102e] border border-red-200">
                    Quest #2 & #15 (High): Rasio Biaya & Evaluasi Anggaran
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Memantau korelasi antara pertumbuhan penjualan kotor toko dengan persentase penyerapan gaji bulanan.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#172B4D] rounded-xs" /> Penjualan Bulanan
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#C8102E] rounded-full" /> Rasio Labour Cost %
                </span>
              </div>
            </div>
            <div className="pt-3">
              <Chart
                options={mixedChartOptions}
                series={mixedChartSeries}
                type="line"
                height={320}
              />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-600">
              <span>
                💡 <strong>Catatan Ritel:</strong> Saat peak season Lebaran (Maret), rasio labour cost turun ke <strong>3.24%</strong> karena lonjakan omset signifikan, membuktikan efisiensi operasional sangat tinggi.
              </span>
              <button
                onClick={() => setActiveSubTab("departments")}
                className="text-[#c8102e] font-bold hover:underline shrink-0 flex items-center gap-1"
              >
                <span>Lihat Rincian Departemen</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANALISIS BIAYA PER DIVISI (QUEST #2 & #15 HIGH) */}
      {activeSubTab === "divisions" && (
        <div className="space-y-6">
          {/* Executive Callout */}

          {/* Tabel Labour Cost per Divisi */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Matriks Biaya Tenaga Kerja & Kontribusi Penjualan per Divisi
                </h3>
                <p className="text-xs text-slate-500">
                  Data aktual headcount, biaya gaji bulanan, kontribusi revenue, dan varians anggaran per divisi korporat.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">
                4 Divisi Utama (Pusat & Jaringan Toko)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
                  <tr>
                    <th className="p-3">Nama Divisi</th>
                    <th className="p-3">Headcount</th>
                    <th className="p-3">Labour Cost / Bulan</th>
                    <th className="p-3">Kontribusi Revenue</th>
                    <th className="p-3">Rasio Labour Cost (%)</th>
                    <th className="p-3">Anggaran (Budget)</th>
                    <th className="p-3">Varians Anggaran</th>
                    <th className="p-3">Status Anggaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {divisionLabourCostData.map((div) => (
                    <tr key={div.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{div.divisionName}</div>
                        <div className="text-[11px] text-slate-500">{div.notes}</div>
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {div.headcount} FTE
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">
                        Rp {(div.monthlyLabourCost / 1000000000).toFixed(2)} M
                      </td>
                      <td className="p-3 font-mono font-semibold text-emerald-700">
                        Rp {(div.revenueContribution / 1000000000).toFixed(2)} M
                      </td>
                      <td className="p-3 font-mono font-extrabold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${div.labourCostRatio > 10
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}>
                          {div.labourCostRatio.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        Rp {(div.budgetMonthly / 1000000000).toFixed(2)} M
                      </td>
                      <td className="p-3 font-bold font-mono">
                        <span className={div.variancePct > 0 ? "text-red-600" : "text-emerald-600"}>
                          {div.variancePct > 0 ? `+${div.variancePct.toFixed(2)}%` : `${div.variancePct.toFixed(2)}%`}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${div.status === "Over Budget"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}>
                          {div.status === "Over Budget" ? "Melebihi Anggaran" : "Sesuai Anggaran"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANALISIS BIAYA PER DEPARTEMEN (QUEST #2 & #15 HIGH) */}
      {activeSubTab === "departments" && (
        <div className="space-y-6">
          {/* Executive Insight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Peringkat 1 Rasio Tertinggi (Quest #2)
              </span>
              <div className="text-base font-black text-red-600 mt-1">
                Warehouse Finished Goods (12.58%)
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Menyerap biaya gaji Rp 478 Jt/bln (rata-rata gaji Rp 8.85 Jt/FTE) untuk 54 operator pergudangan sentral.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Departemen Over Budget Terbesar (Quest #15)
              </span>
              <div className="text-base font-black text-amber-600 mt-1">
                Sales Online (+4.28% di atas Anggaran)
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Kenaikan biaya akibat penambahan talent host live streaming dan staf operasional marketplace digital.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Rasio Biaya Operasional Toko (Retail Store)
              </span>
              <div className="text-base font-black text-emerald-600 mt-1">
                7.71% dari Total Omset Gerai
              </div>
              <p className="text-xs text-slate-500 mt-1">
                909 staf toko ritel menghasilkan kontribusi penjualan Rp 57.3 Miliar dengan total labour cost Rp 4.42 Miliar.
              </p>
            </div>
          </div>

          {/* Tabel Ranking Departemen */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Peringkat Rasio Biaya Tenaga Kerja terhadap Revenue per Departemen
                </h3>
                <p className="text-xs text-slate-500">
                  Diurutkan dari rasio labour cost tertinggi ke terendah (menjawab langsung Critical Question #2 & #15).
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                12 Departemen Terdaftar
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
                  <tr>
                    <th className="p-3 text-center">Rank</th>
                    <th className="p-3">Nama Departemen</th>
                    <th className="p-3">Divisi Induk</th>
                    <th className="p-3">Lingkup</th>
                    <th className="p-3">Headcount</th>
                    <th className="p-3">Rata-rata Gaji / FTE</th>
                    <th className="p-3">Labour Cost Bulanan</th>
                    <th className="p-3">Rasio thd Revenue (%)</th>
                    <th className="p-3">Varians Anggaran</th>
                    <th className="p-3">Faktor Pemicu (Key Driver)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departmentLabourCostData.map((dept) => (
                    <tr key={dept.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-center">
                        <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-black ${dept.rankingCostRatio <= 3
                            ? "bg-red-100 text-red-700 font-extrabold"
                            : "bg-slate-100 text-slate-600"
                          }`}>
                          #{dept.rankingCostRatio}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {dept.departmentName}
                      </td>
                      <td className="p-3 text-slate-600 font-medium">
                        {dept.divisionName}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dept.scope === "HQ"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}>
                          {dept.scope === "HQ" ? "Kantor Pusat" : "Gerai Toko"}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {dept.headcount}
                      </td>
                      <td className="p-3 font-mono text-slate-700">
                        Rp {(dept.avgSalaryPerFte / 1000000).toFixed(2)} Jt
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">
                        Rp {(dept.monthlyLabourCost / 1000000).toFixed(0)} Jt
                      </td>
                      <td className="p-3 font-mono font-black">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${dept.labourCostRatio >= 10
                            ? "bg-red-50 text-red-700 font-extrabold border border-red-200"
                            : dept.labourCostRatio >= 7
                              ? "bg-amber-50 text-amber-700 font-bold border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
                          }`}>
                          {dept.labourCostRatio.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold">
                        <span className={dept.variancePct > 0 ? "text-red-600" : "text-emerald-600"}>
                          {dept.variancePct > 0 ? `+${dept.variancePct.toFixed(1)}% (Over)` : `${dept.variancePct.toFixed(1)}% (Aman)`}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-slate-500 max-w-xs">
                        {dept.keyDriver}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRODUKTIVITAS TOKO & EFISIENSI MUSIMAN (QUEST #11 & #22 HIGH) */}
      {activeSubTab === "productivity" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Q11: Penghematan Musim Puncak (Lebaran & Akhir Tahun) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 mb-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Pertanyaan Kritis #11 • Prioritas Tinggi</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Penghematan Biaya Staf Musim Puncak (Peak Season)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Penggunaan staf paruh waktu & magang vs ekuivalen purnawaktu saat Lebaran & Akhir Tahun
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    +{peakSeasonSavingsData.savingsPercentage}% Hemat
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Pengerahan Staf Musiman
                  </span>
                  <div className="text-xl font-black text-slate-900 mt-0.5">
                    {peakSeasonSavingsData.seasonalHeadcount} Staf
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                    {peakSeasonSavingsData.partTimeDeployed} Paruh Waktu • {peakSeasonSavingsData.internsDeployed} Magang
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Penghematan Anggaran Gaji Bersih
                  </span>
                  <div className="text-xl font-black text-emerald-600 mt-0.5">
                    Rp {(peakSeasonSavingsData.netCostSavings / 1000000000).toFixed(2)} M
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Aktual: Rp {(peakSeasonSavingsData.actualSeasonalCost / 1000000000).toFixed(2)}M vs FTE: Rp {(peakSeasonSavingsData.fulltimeBenchmarkCost / 1000000000).toFixed(2)}M
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Perbandingan Beban Biaya</span>
                  <span className="font-bold text-slate-900">
                    Rp 1.58M (Musiman) vs Rp 3.42M (Purnawaktu FTE)
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full rounded-l-full"
                    style={{ width: `${(peakSeasonSavingsData.actualSeasonalCost / peakSeasonSavingsData.fulltimeBenchmarkCost) * 100}%` }}
                    title="Biaya Aktual Musiman"
                  />
                  <div
                    className="bg-slate-300 h-full rounded-r-full"
                    style={{ width: `${(peakSeasonSavingsData.netCostSavings / peakSeasonSavingsData.fulltimeBenchmarkCost) * 100}%` }}
                    title="Anggaran yang Berhasil Dihemat"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Biaya Staf Musiman (46.2%)
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-slate-300" /> Anggaran Dihemat (53.8%)
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Dampak Anggaran:</strong> Mengeliminasi beban pesangon pasca musim ramai dan iuran tetap BPJS tahunan.
                </span>
              </div>
            </div>

            {/* Q22: Produktivitas Penjualan per Jam: Part-Time vs Full-Time */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 mb-1.5">
                    <Zap className="w-3 h-3 text-blue-600" />
                    <span>Pertanyaan Kritis #22 • Prioritas Tinggi</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Produktivitas Penjualan per Jam: Paruh Waktu vs Purna Waktu
                  </h3>
                  <p className="text-xs text-slate-500">
                    Membandingkan hasil penjualan per jam pada jendela jam sibuk ritel ({salesPerHourData.peakHoursRange})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg">
                    {salesPerHourData.productivityOutputPercentage}% Ekuivalensi Output
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Full-time Box */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Staf Purna Waktu</span>
                    <span className="text-[10px] text-slate-500 font-normal">Tim Inti</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">
                    Rp {(salesPerHourData.fullTime.salesPerHour / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">/jam</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Biaya per Jam: <strong>Rp {(salesPerHourData.fullTime.costPerHour / 1000).toFixed(0)}k</strong>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 pt-1 border-t border-slate-200">
                    Efisiensi: {salesPerHourData.fullTime.efficiencyRatio}x Sales/Cost
                  </div>
                </div>

                {/* Part-time Box */}
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>Staf Paruh Waktu</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">ROI Tinggi</span>
                  </div>
                  <div className="text-lg font-black text-blue-950">
                    Rp {(salesPerHourData.partTime.salesPerHour / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">/jam</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Biaya per Jam: <strong>Rp {(salesPerHourData.partTime.costPerHour / 1000).toFixed(0)}k</strong> (-42%)
                  </div>
                  <div className="text-[11px] font-bold text-blue-700 pt-1 border-t border-blue-200">
                    Efisiensi: {salesPerHourData.partTime.efficiencyRatio}x Sales/Cost (+58%)
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Output Penjualan Paruh Waktu</span>
                  <span className="font-bold text-slate-900">{salesPerHourData.productivityOutputPercentage}% dari Purna Waktu</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${salesPerHourData.productivityOutputPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Staf toko paruh waktu menghasilkan 91.9% produktivitas penjualan staf tetap di jam sibuk dengan penghematan biaya upah per jam sebesar 42.1%.
                </p>
              </div>
            </div>
          </div>

          {/* Matriks Produktivitas & Biaya Tenaga Kerja Toko */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Matriks Kinerja Toko & Biaya Tenaga Kerja ({selectedRegion === "All" ? "Semua Region" : `Region ${selectedRegion}`})
                </h3>
                <p className="text-xs text-slate-500">
                  Data aktual gerai ritel 3Second, Greenlight, dan Famo berdasarkan rekapitulasi data HR Excel.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Menampilkan {filteredStores.length} gerai unggulan
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-100">
                  <tr>
                    <th className="p-3">Nama Toko</th>
                    <th className="p-3">Region</th>
                    <th className="p-3">Format Toko</th>
                    <th className="p-3">Headcount</th>
                    <th className="p-3">Penjualan Bulanan</th>
                    <th className="p-3">Labour Cost</th>
                    <th className="p-3">Revenue / FTE</th>
                    <th className="p-3">Rasio Biaya (%)</th>
                    <th className="p-3">Capaian Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStores.map((store) => (
                    <tr key={store.storeId} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{store.storeName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {store.storeId} • {store.cluster}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${store.region === "Barat"
                            ? "bg-blue-50 text-blue-700"
                            : store.region === "Timur"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                          {store.region}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {store.format || "Family Store"}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {store.headcount}
                      </td>
                      <td className="p-3 font-semibold text-slate-900 font-mono">
                        Rp {(store.sales / 1000000).toFixed(0)} Jt
                      </td>
                      <td className="p-3 text-slate-600 font-mono">
                        Rp {(store.labourCost / 1000000).toFixed(0)} Jt
                      </td>
                      <td className="p-3 font-bold text-emerald-600 font-mono">
                        Rp {(store.revenuePerFte / 1000000).toFixed(1)} Jt
                      </td>
                      <td className="p-3 font-mono font-medium text-slate-800">
                        {store.labourCostRatio.toFixed(2)}%
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${store.achievementRate >= 100
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                            }`}
                        >
                          {store.achievementRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
