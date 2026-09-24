import React, { useState } from "react"
import { Users, Building, MapPin, Briefcase, Award } from "lucide-react"
import Chart from "react-apexcharts"

export const WorkforcePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "headcount" | "demographics" | "organization" | "employment"
  >("headcount")

  // Chart options for Division Breakdown
  const divisionOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 280, toolbar: { show: false } },
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
        "Retail Store Ops",
        "Supply Chain",
        "Design & Merch",
        "Marketing & Brand",
        "Business Support",
        "Digital & IT",
      ],
    },
    grid: { borderColor: "#F1F5F9" },
  }
  const divisionSeries = [
    { name: "Headcount", data: [6850, 2140, 1420, 1230, 630, 210] },
  ]

  // Gender chart
  const genderOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    colors: ["#2563EB", "#EC4899"],
    labels: ["Male (52%)", "Female (48%)"],
    legend: { position: "bottom" },
  }
  const genderSeries = [6490, 5990]

  // Age group chart
  const ageOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", height: 260, toolbar: { show: false } },
    colors: ["#C8102E"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
    xaxis: { categories: ["<25", "25–29", "30–34", "35–39", "40–44", "45+"] },
    grid: { borderColor: "#F1F5F9" },
  }
  const ageSeries = [
    { name: "Employees", data: [4210, 4850, 2100, 890, 310, 120] },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Workforce Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Headcount distribution, demographics, organizational hierarchy &
            contract statuses
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-slate-100 -xl border border-slate-200 text-xs font-semibold">
          {[
            { id: "headcount", label: "Headcount" },
            { id: "demographics", label: "Demographics" },
            { id: "organization", label: "Organization" },
            { id: "employment", label: "Employment" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 -lg transition-all ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Workforce
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">12,480</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            ↑ +3.2% MoM
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            HQ Roster
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">1,240</div>
          <span className="text-[11px] text-slate-500 font-medium">
            9.9% of workforce
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Store Network
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">11,240</div>
          <span className="text-[11px] text-blue-600 font-medium">
            342 active retail stores
          </span>
        </div>
        <div className="bg-white p-4 -xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Avg Employee Age
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            26.8 yrs
          </div>
          <span className="text-[11px] text-purple-600 font-medium">
            Gen Z & Millennial Core
          </span>
        </div>
      </div>

      {activeTab === "headcount" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Headcount by Division
            </h3>
            <Chart
              options={divisionOptions}
              series={divisionSeries}
              type="bar"
              height={280}
            />
          </div>

          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Department Headcount & Budget Variance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Department</th>
                    <th className="p-2.5">Actual HC</th>
                    <th className="p-2.5">Budget</th>
                    <th className="p-2.5">Gap</th>
                    <th className="p-2.5">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Store Operations – West Java
                    </td>
                    <td className="p-2.5">3,420</td>
                    <td className="p-2.5 text-slate-500">3,500</td>
                    <td className="p-2.5 text-red-600">-80</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5  bg-emerald-50 text-emerald-700 font-bold">
                        97.7%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Store Operations – Jabodetabek
                    </td>
                    <td className="p-2.5">3,430</td>
                    <td className="p-2.5 text-slate-500">3,450</td>
                    <td className="p-2.5 text-red-600">-20</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5  bg-emerald-50 text-emerald-700 font-bold">
                        99.4%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Supply Chain & Hub Logistik
                    </td>
                    <td className="p-2.5">2,140</td>
                    <td className="p-2.5 text-slate-500">2,100</td>
                    <td className="p-2.5 text-blue-600">+40</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5  bg-blue-50 text-blue-700 font-bold">
                        101.9%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Fashion Design HQ
                    </td>
                    <td className="p-2.5">185</td>
                    <td className="p-2.5 text-slate-500">190</td>
                    <td className="p-2.5 text-red-600">-5</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5  bg-emerald-50 text-emerald-700 font-bold">
                        97.3%
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">
                      Digital Omnichannel & IT
                    </td>
                    <td className="p-2.5">210</td>
                    <td className="p-2.5 text-slate-500">225</td>
                    <td className="p-2.5 text-red-600">-15</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5  bg-amber-50 text-amber-700 font-bold">
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

      {activeTab === "demographics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Workforce Age Distribution
            </h3>
            <Chart
              options={ageOptions}
              series={ageSeries}
              type="bar"
              height={260}
            />
          </div>

          <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Gender Diversity Roster
              </h3>
              <Chart
                options={genderOptions}
                series={genderSeries}
                type="donut"
                height={260}
              />
            </div>
            <div className="p-3 bg-slate-50 -xl text-xs text-slate-600 mt-4">
              <strong>Diversity Index:</strong> Highly balanced male/female
              ratio in both retail stores and Bandung corporate HQ.
            </div>
          </div>
        </div>
      )}

      {activeTab === "organization" && (
        <div className="bg-white p-6 -2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Organizational Hierarchy (3SECOND / BIENSI)
          </h3>
          <div className="p-4 bg-slate-50 -xl border border-slate-200 text-xs font-mono space-y-3">
            <div className="p-2  bg-slate-900 text-white font-bold inline-block">
              Board of Directors (PT BIENSI FESYENINDO)
            </div>
            <div className="pl-6 border-l-2 border-red-500 space-y-3">
              <div className="p-2  bg-white border border-slate-300 font-bold">
                ├── Commercial Business Directorate (Headcount: 7,450)
              </div>
              <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                <div className="text-slate-700">
                  ├── Store Operations (342 Stores nationwide)
                </div>
                <div className="text-slate-700">
                  ├── Regional Area Management (West, Central, East)
                </div>
                <div className="text-slate-700">
                  └── Visual Merchandising & Store Experience
                </div>
              </div>

              <div className="p-2  bg-white border border-slate-300 font-bold">
                ├── Supply Chain & Manufacturing Logistics (Headcount: 2,140)
              </div>
              <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                <div className="text-slate-700">
                  ├── Central Distribution Centers (Bandung, Surabaya, Medan)
                </div>
                <div className="text-slate-700">
                  └── Quality Assurance & Inventory Audit
                </div>
              </div>

              <div className="p-2  bg-white border border-slate-300 font-bold">
                ├── Brand Creative, Fashion & Marketing (Headcount: 1,420)
              </div>
              <div className="pl-6 border-l-2 border-slate-300 space-y-2">
                <div className="text-slate-700">
                  ├── 3SECOND, GREENLIGHT, FAMO, MOUTLEY, FMC Design Teams
                </div>
                <div className="text-slate-700">
                  └── Brand Communications & Digital Media
                </div>
              </div>

              <div className="p-2  bg-white border border-slate-300 font-bold">
                └── Human Capital, Finance & Digital Technology (Headcount:
                1,470)
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "employment" && (
        <div className="bg-white p-5 -2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Contract (PKWT) Expiry Monitoring & Operational Actions
              </h3>
              <p className="text-xs text-slate-500">
                Track contracts ending in next 7, 14, and 30 days
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold -lg bg-red-100 text-red-700">
              9 Contracts Expiring in 30 Days
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-100">
                <tr>
                  <th className="p-3">Associate</th>
                  <th className="p-3">Department / Store</th>
                  <th className="p-3">Position</th>
                  <th className="p-3">Contract End</th>
                  <th className="p-3">Days Left</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-900">
                    Rendi Wahyudi
                  </td>
                  <td className="p-3 text-slate-600">
                    Store Ops – PVJ Bandung
                  </td>
                  <td className="p-3 text-slate-600">Cashier</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    30 Oct 2026
                  </td>
                  <td className="p-3">
                    <span className="text-red-600 font-bold">6 days</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 -full text-[10px] font-bold bg-red-50 text-red-700">
                      Critical
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2 py-1 text-[11px] font-bold  bg-slate-900 text-white hover:bg-slate-800">
                      Renew
                    </button>
                    <button className="px-2 py-1 text-[11px] font-bold  border border-slate-200 text-slate-600 hover:bg-slate-50">
                      Extend
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">
                    Rizka Febriani
                  </td>
                  <td className="p-3 text-slate-600">
                    Store Ops – Pondok Indah
                  </td>
                  <td className="p-3 text-slate-600">Senior Store Associate</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    05 Nov 2026
                  </td>
                  <td className="p-3">
                    <span className="text-amber-600 font-bold">12 days</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 -full text-[10px] font-bold bg-amber-50 text-amber-700">
                      Warning
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2 py-1 text-[11px] font-bold  bg-slate-900 text-white hover:bg-slate-800">
                      Renew
                    </button>
                    <button className="px-2 py-1 text-[11px] font-bold  border border-slate-200 text-slate-600 hover:bg-slate-50">
                      Extend
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">
                    Ilham Pratama
                  </td>
                  <td className="p-3 text-slate-600">
                    Distribution Hub Cimahi
                  </td>
                  <td className="p-3 text-slate-600">Warehouse Staff</td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    18 Nov 2026
                  </td>
                  <td className="p-3">
                    <span className="text-slate-600 font-bold">25 days</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 -full text-[10px] font-bold bg-slate-100 text-slate-700">
                      Normal
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2 py-1 text-[11px] font-bold  bg-slate-900 text-white hover:bg-slate-800">
                      Renew
                    </button>
                    <button className="px-2 py-1 text-[11px] font-bold  border border-slate-200 text-slate-600 hover:bg-slate-50">
                      Extend
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
