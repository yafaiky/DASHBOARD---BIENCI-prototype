import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Users,
  Building,
  MapPin,
  Briefcase,
  Award,
  Sparkles,
  GraduationCap,
  UserCheck,
  Compass,
  Palette,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import Chart from "react-apexcharts"
import {
  recruitmentKpiData,
  designProductDevData,
  internshipConversionData,
  managerialGenderData,
} from "../../data/mockData"

export const WorkforcePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | "headcount"
    | "demographics"
    | "rnd-design"
    | "recruitment"
    | "organization"
    | "employment"
  >("headcount")

  // Chart options for Division Breakdown
  const divisionOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 280, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#172B4D"],
    plotOptions: {
      bar: { horizontal: true, borderRadius: 6, barHeight: "55%" },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      offsetX: 10,
      style: { fontSize: "11px", colors: ["#475569"] },
    },
    xaxis: {
      categories: [
        "Operasional Toko Retail",
        "Rantai Pasok & Gudang",
        "Desain & Merchandising",
        "Pemasaran & Brand",
        "Dukungan Korporat (HQ)",
        "Digital & TI",
      ],
    },
    grid: { borderColor: "#F1F5F9" },
    tooltip: {
      y: { formatter: (val) => `${val} Karyawan` }
    }
  }
  const divisionSeries = [
    { name: "Jumlah Karyawan", data: [6850, 2140, 1420, 1230, 630, 210] },
  ]

  // Gender chart
  const genderOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut", fontFamily: "Inter, sans-serif" },
    colors: ["#2563EB", "#EC4899"],
    labels: ["Laki-laki (52%)", "Perempuan (48%)"],
    legend: { position: "bottom" },
  }
  const genderSeries = [6490, 5990]

  // Age group chart
  const ageOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 260, toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#C8102E"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
    xaxis: { categories: ["<25 Thn", "25–29 Thn", "30–34 Thn", "35–39 Thn", "40–44 Thn", "45+ Thn"] },
    grid: { borderColor: "#F1F5F9" },
    tooltip: {
      y: { formatter: (val) => `${val} Staf` }
    }
  }
  const ageSeries = [
    { name: "Karyawan", data: [4210, 4850, 2100, 890, 310, 120] },
  ]

  return (
    <div className="space-y-6 no-scrollbar">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Analitik Tenaga Kerja & Demografi
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Distribusi jumlah karyawan, demografi usia, keragaman gender, hierarki organisasi, dan pemantauan kontrak PKWT.
        </p>
      </div>

      {/* Tab Switch: Sejajar Horizontal 1 Baris (Tidak Ada yang Turun ke Bawah) */}
      <div className="w-full bg-slate-100/90 p-1 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar shadow-2xs">
        <div className="flex items-center flex-nowrap whitespace-nowrap min-w-max gap-1 text-xs font-semibold">
          {[
            { id: "headcount", label: "Headcount & Divisi" },
            { id: "demographics", label: "Demografi & Gender" },
            { id: "rnd-design", label: "R&D & Desain" },
            { id: "recruitment", label: "Rekrutmen & Magang" },
            { id: "organization", label: "Struktur Organisasi" },
            { id: "employment", label: "Status Kontrak (PKWT)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Tenaga Kerja
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-50 text-[#c8102e] border border-red-200">
              Quest #1
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">12.480</div>
          <span className="text-xs text-emerald-600 font-semibold">
            ↑ +3.2% vs Bulan Lalu
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Staf Kantor Pusat (HQ)
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
              Quest #18
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">1.240</div>
          <span className="text-xs text-slate-500 font-medium">
            9.9% dari total tenaga kerja
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Jaringan Gerai Toko
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200">
              Quest #1
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">11.240</div>
          <span className="text-xs text-blue-600 font-medium">
            342 gerai aktif nasional
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rata-rata Usia Staf
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-purple-50 text-purple-700 border border-purple-200">
              Quest #8 & #10
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            26.8 Tahun
          </div>
          <span className="text-xs text-purple-600 font-medium">
            Inti Gen Z & Milenial Muda
          </span>
        </div>
      </div>

      {activeTab === "headcount" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Jumlah Karyawan per Divisi
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Quest #26 (Med): Komersial vs Pemasaran
              </span>
            </div>
            <Chart
              options={divisionOptions}
              series={divisionSeries}
              type="bar"
              height={280}
            />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Headcount Departemen & Varians Anggaran
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                Quest #23 (Med): Target & Kendala
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Departemen</th>
                    <th className="p-2.5">Aktual HC</th>
                    <th className="p-2.5">Anggaran</th>
                    <th className="p-2.5">Selisih</th>
                    <th className="p-2.5">Pemenuhan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Operasional Toko – Jawa Barat
                    </td>
                    <td className="p-2.5">3.420</td>
                    <td className="p-2.5 text-slate-500">3.500</td>
                    <td className="p-2.5 text-red-600">-80</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                        97.7%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Operasional Toko – Jabodetabek
                    </td>
                    <td className="p-2.5">3.430</td>
                    <td className="p-2.5 text-slate-500">3.450</td>
                    <td className="p-2.5 text-red-600">-20</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                        99.4%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Rantai Pasok & Hub Logistik
                    </td>
                    <td className="p-2.5">2.140</td>
                    <td className="p-2.5 text-slate-500">2.100</td>
                    <td className="p-2.5 text-blue-600">+40</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                        101.9%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Desain Fashion HQ
                    </td>
                    <td className="p-2.5">185</td>
                    <td className="p-2.5 text-slate-500">190</td>
                    <td className="p-2.5 text-red-600">-5</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                        97.3%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Digital Omnichannel & TI
                    </td>
                    <td className="p-2.5">210</td>
                    <td className="p-2.5 text-slate-500">225</td>
                    <td className="p-2.5 text-red-600">-15</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">
                        93.3%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Demographics & Gender */}
      {activeTab === "demographics" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 no-scrollbar">
            {/* Card 1: Age Distribution */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Distribusi Usia Karyawan
                  </h3>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    Rata-rata 26.8 Thn
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Rincian demografi generasi tenaga kerja
                </p>
                <Chart
                  options={ageOptions}
                  series={ageSeries}
                  type="bar"
                  height={220}
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mt-2 border border-slate-100">
                <strong className="text-slate-900">Profil Demografis:</strong> Mayoritas tenaga kerja toko terkonsentrasi pada rentang usia 20–29 tahun (72.6% Gen Z & Milenial Muda).
              </div>
            </div>

            {/* Card 2: Company-Wide Gender Diversity */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Keragaman Gender (Perusahaan)
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Total 12.480
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Keseimbangan jumlah karyawan laki-laki dan perempuan di seluruh divisi
                </p>
                <Chart
                  options={genderOptions}
                  series={genderSeries}
                  type="donut"
                  height={220}
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mt-2 border border-slate-100">
                <strong className="text-slate-900">Indeks Keragaman:</strong> Rasio gender sangat seimbang di seluruh jaringan toko ritel (52% L / 48% P) dan kantor pusat.
              </div>
            </div>

            {/* Card 3: Q29 Managerial Gender Representation */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-pink-700 mb-1">
                      <Award className="w-3.5 h-3.5 text-pink-600" />
                      <span>Pertanyaan Kritis #29</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      Keragaman Gender Tingkat Manajerial
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {managerialGenderData.totalManagerialPositions} Posisi
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Kepemimpinan level Store Manager hingga Direksi Korporat
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/40">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                      <span>Laki-laki</span>
                      <span className="text-sm font-black">{managerialGenderData.malePct}%</span>
                    </div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">
                      {managerialGenderData.maleLeaders} Pemimpin
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Area Store Manager & Logistik
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-pink-200 bg-pink-50/40">
                    <div className="flex items-center justify-between text-xs font-bold text-pink-900">
                      <span>Perempuan</span>
                      <span className="text-sm font-black">{managerialGenderData.femalePct}%</span>
                    </div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">
                      {managerialGenderData.femaleLeaders} Pemimpin
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Desain, VM & Manajer Gerai Utama
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Laki-laki ({managerialGenderData.malePct}%)</span>
                    <span>Perempuan ({managerialGenderData.femalePct}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-600 rounded-l-full" style={{ width: `${managerialGenderData.malePct}%` }} />
                    <div className="h-full bg-pink-500 rounded-r-full" style={{ width: `${managerialGenderData.femalePct}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-pink-50/50 rounded-xl text-xs text-pink-950 border border-pink-100">
                <strong className="text-pink-900">Tolok Ukur Kesetaraan:</strong> Seimbang di angka 46%–54%, melampaui tolok ukur ritel nasional (35% perempuan).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q9 & Q24: R&D, Design & Product Development Demographics */}
      {activeTab === "rnd-design" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 mb-1.5">
                  <Palette className="w-3 h-3 text-purple-600" />
                  <span>Pertanyaan Kritis #9 & #24 • Prioritas Tinggi & Sedang</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Intelijen Talenta R&D, Desain & Pengembangan Produk
                </h3>
                <p className="text-xs text-slate-500">
                  Retensi masa kerja, demografi generasi muda (Gen Z & Milenial), dan struktur divisi kreatif fashion
                </p>
              </div>
              <div className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
                {designProductDevData.headcount} Spesialis Kreatif
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rata-rata Usia</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{designProductDevData.avgAge} Thn</div>
                <span className="text-[10px] text-purple-600 font-semibold">78% Gen Z & Milenial Muda</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rasio Gender</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {designProductDevData.genderSplit.female}% P / {designProductDevData.genderSplit.male}% L
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Kesetaraan desain kreatif</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Inti Pertumbuhan (1-3 Thn)</span>
                <div className="text-xl font-black text-emerald-600 mt-0.5">40%</div>
                <span className="text-[10px] text-slate-500 font-medium">Kelompok paling produktif</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Senior Penjaga Brand (&gt;5 Thn)</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">12%</div>
                <span className="text-[10px] text-blue-600 font-semibold">Penjaga DNA identitas brand</span>
              </div>
            </div>

            {/* Detailed Tenure Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Kohort Masa Kerja di Desain & R&D (Quest #9)
                </h4>
                <div className="space-y-2.5">
                  {designProductDevData.tenureDistribution.map((item) => (
                    <div key={item.range} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700">{item.range}</span>
                        <span className="font-bold text-slate-900">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Alokasi Brand & Retensi Strategis (Quest #24)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tim desain terbagi ke dalam portofolio 3SECOND (Casualwear), GREENLIGHT (Modern Contemporary), FAMO (Minimalist Chic), dan FMC (Activewear).
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="font-semibold text-slate-800">3SECOND & 3SECOND KIDS</span>
                    <span className="font-bold text-slate-900">82 Desainer & Merchandiser</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="font-semibold text-slate-800">GREENLIGHT & FAMO</span>
                    <span className="font-bold text-slate-900">64 Desainer & Visual Merch</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="font-semibold text-slate-800">Hub Riset Kain & Pola</span>
                    <span className="font-bold text-slate-900">39 Spesialis Tekstil Teknis</span>
                  </div>
                </div>
                <div className="text-[11px] text-purple-900 bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                  <strong>Kebijakan Retensi:</strong> Jalur promosi kreatif berkala 18 bulan mencegah pembajakan talenta oleh kompetitor garmen ritel di Bandung & Jakarta.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Q20 & Q27: Recruitment KPIs & Internship Conversion */}
      {activeTab === "recruitment" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Q20: Recruitment & Time-to-Fill */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 mb-1.5">
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span>Pertanyaan Kritis #20 • Prioritas Tinggi</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Waktu Pemenuhan Lowongan (Time-to-Fill)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kecepatan pemenuhan staf toko menjelang musim ramai ritel
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                  {recruitmentKpiData.fulfillmentRate}% Terpenuhi
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Rata-rata Waktu Rekrut
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">
                    {recruitmentKpiData.avgTimeToHireDays} Hari
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    Tolok Ukur: &lt; 21 Hari (-32% lebih cepat)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Realisasi Permintaan Staf
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-0.5">
                    {recruitmentKpiData.positionsFilled.toLocaleString()} / {recruitmentKpiData.totalManpowerRequest2026.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold">
                    270 posisi dalam proses seleksi
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>Biaya Rekrutmen per Karyawan:</span>
                  <span className="font-bold text-slate-900">Rp {(recruitmentKpiData.costPerHire / 1000000).toFixed(2)} Jt</span>
                </div>
                <div className="flex justify-between text-slate-700 font-semibold">
                  <span>Tingkat Turnover Tahun Pertama:</span>
                  <span className="font-bold text-emerald-600">{recruitmentKpiData.turnoverUnderOneYear}% (Target &lt;10%)</span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  Audisi langsung di toko dan seleksi CV digital mempercepat siklus perekrutan staf dari 24 hari menjadi 14.2 hari.
                </div>
              </div>
            </div>

            {/* Q27: Internship Conversion to Full-Time */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 mb-1.5">
                    <GraduationCap className="w-3 h-3 text-emerald-600" />
                    <span>Pertanyaan Kritis #27 • Prioritas Sedang</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Konversi Magang Menjadi Staf Purna Waktu
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tingkat konversi pemagang ritel dan desain fashion menjadi karyawan PKWT / Tetap
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                  {internshipConversionData.conversionRate}% Dikonversi
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xl font-black text-slate-900">{internshipConversionData.totalInterns}</div>
                  <div className="text-[10px] font-bold uppercase text-slate-400 mt-0.5">Total Pemagang</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="text-xl font-black text-emerald-700">{internshipConversionData.convertedToFulltimePKWT}</div>
                  <div className="text-[10px] font-bold uppercase text-emerald-700 mt-0.5">Diangkat ke PKWT</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-xl font-black text-blue-700">{internshipConversionData.activeInterns}</div>
                  <div className="text-[10px] font-bold uppercase text-blue-700 mt-0.5">Aktif Pelatihan</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Tingkat Keberhasilan Konversi: {internshipConversionData.conversionRate}%</span>
                  <span className="font-bold text-emerald-600">65 dari 190 Lulus Evaluasi</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${internshipConversionData.conversionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "organization" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Hierarki Organisasi (3SECOND / BIENSI)
                </h3>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-50 text-[#C8102E] border border-rose-200">
                  Quest #12 & #18
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Struktur Kantor Pusat (HQ) vs Operasional Lapangan & rincian staf Pusat Distribusi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                Rasio HQ terhadap Toko: 1 : 5.8 (Organisasi Ramping)
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-3">
            <div className="p-2 rounded-lg bg-slate-900 text-white font-bold inline-block shadow-xs">
              Dewan Direksi (PT BIENSI FESYENINDO)
            </div>
            <div className="pl-6 border-l-2 border-red-500 space-y-3">
              <div className="p-2 rounded-lg bg-white border border-slate-300 font-bold flex items-center justify-between">
                <span>├── Direktorat Bisnis Komersial (Headcount: 7.450)</span>
                <span className="text-[11px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Jaringan Lapangan (Quest #18)</span>
              </div>
              <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                <div className="text-slate-700">
                  ├── Operasional Toko (342 Toko Nasional)
                </div>
                <div className="text-slate-700">
                  ├── Manajemen Area Regional (Barat, Tengah, Timur)
                </div>
                <div className="text-slate-700">
                  └── Visual Merchandising & Pengalaman Toko
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-300 font-bold flex items-center justify-between">
                <span>├── Rantai Pasok & Logistik Manufaktur (Headcount: 2.140)</span>
                <span className="text-[11px] font-sans font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Rasio Pergudangan (Quest #12)</span>
              </div>
              <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                <div className="text-slate-700">
                  ├── Pusat Distribusi Sentral (Bandung, Surabaya, Medan — 68% Staf Tetap / 32% PKWT Musiman)
                </div>
                <div className="text-slate-700">
                  └── Jaminan Kualitas (QA) & Audit Persediaan
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-300 font-bold">
                ├── Brand Kreatif, Fashion & Pemasaran (Headcount: 1.420)
              </div>
              <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                <div className="text-slate-700">
                  ├── Tim Desain 3SECOND, GREENLIGHT, FAMO, MOUTLEY, FMC
                </div>
                <div className="text-slate-700">
                  └── Komunikasi Brand & Media Digital
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-slate-300 font-bold flex items-center justify-between">
                <span>└── Human Capital, Keuangan & Teknologi Digital (Headcount: 1.470)</span>
                <span className="text-[11px] font-sans font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Korporat Pusat (Quest #18)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "employment" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Pemantauan Masa Habis Kontrak (PKWT) & Tindakan Operasional
                </h3>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-50 text-[#C8102E] border border-rose-200">
                  Quest #13
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pantau kontrak yang berakhir dalam 7, 14, dan 30 hari ke depan untuk perpanjangan proaktif atau offboarding
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-100 text-red-700">
              9 Kontrak Berakhir dalam 30 Hari
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-wider border-y border-slate-100">
                <tr>
                  <th className="p-3">Nama Karyawan</th>
                  <th className="p-3">Departemen / Gerai Toko</th>
                  <th className="p-3">Jabatan</th>
                  <th className="p-3">Jatuh Tempo Kontrak</th>
                  <th className="p-3">Sisa Hari</th>
                  <th className="p-3">Tingkat Urgensi</th>
                  <th className="p-3 text-right">Aksi HR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-900">
                    Rendi Wahyudi
                  </td>
                  <td className="p-3 text-slate-600">
                    Operasional Toko – PVJ Bandung
                  </td>
                  <td className="p-3 text-slate-600">Kasir</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    30 Okt 2026
                  </td>
                  <td className="p-3">
                    <span className="text-red-600 font-bold">6 hari lagi</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700">
                      Kritis
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                      Perbarui
                    </button>
                    <button className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                      Perpanjang
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">
                    Rizka Febriani
                  </td>
                  <td className="p-3 text-slate-600">
                    Operasional Toko – Pondok Indah
                  </td>
                  <td className="p-3 text-slate-600">Senior Store Associate</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    05 Nov 2026
                  </td>
                  <td className="p-3">
                    <span className="text-amber-600 font-bold">12 hari lagi</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                      Peringatan
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                      Perbarui
                    </button>
                    <button className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                      Perpanjang
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">
                    Ilham Pratama
                  </td>
                  <td className="p-3 text-slate-600">
                    Hub Distribusi Cimahi
                  </td>
                  <td className="p-3 text-slate-600">Staf Gudang</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    18 Nov 2026
                  </td>
                  <td className="p-3">
                    <span className="text-slate-600 font-bold">25 hari lagi</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      Normal
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                      Perbarui
                    </button>
                    <button className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                      Perpanjang
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
