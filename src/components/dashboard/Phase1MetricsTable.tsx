import React, { useState } from 'react';
import type { Phase1Metric } from '../../data/phase1Data';
import { phase1Metrics } from '../../data/phase1Data';
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  Info,
  ChevronRight,
  HelpCircle,
  FileSpreadsheet,
  Layers,
  ArrowUpDown
} from 'lucide-react';

interface Phase1MetricsTableProps {
  selectedYear: '2026' | '2025' | '2024';
  selectedScope: 'corporate' | 'hq' | 'store';
}

export const Phase1MetricsTable: React.FC<Phase1MetricsTableProps> = ({
  selectedYear,
  selectedScope,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortField, setSortField] = useState<'no' | 'name' | 'category'>('no');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const categories = [
    'Semua',
    'Employee Demografi',
    'Employee Level',
    'Employment Type',
    'Employee Productivity',
    'Attendance Dashboard',
    'Recruitment Dashboard',
    'KPI Dashboard Completion',
    'Industrial Relation'
  ];

  const filteredMetrics = phase1Metrics
    .filter((m) => {
      const matchesCategory = selectedCategory === 'Semua' || m.category === selectedCategory;
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.formulae.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === 'no') {
        return sortDirection === 'asc' ? a.no - b.no : b.no - a.no;
      }
      if (sortField === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return sortDirection === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
    });

  const handleExportCSV = () => {
    const headers = ['No', 'Kategori', 'Nama Metrik', 'Formula', 'Target', 'Total Corporate', 'HQ', 'Store', 'Status'];
    const rows = filteredMetrics.map(m => [
      m.no,
      `"${m.category}"`,
      `"${m.name}"`,
      `"${m.formulae}"`,
      `"${m.target}"`,
      `"${m.formattedCorporate}"`,
      `"${m.formattedHQ}"`,
      `"${m.formattedStore}"`,
      `"${m.statusLabel || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HR_EXECUTIVE_DASHBOARD_Phase_1.0_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Table Toolbar Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-slate-900 tracking-tight font-heading">
              Matriks Metrik KPI (51 Metrik Baku)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Daftar lengkap seluruh metrik HR, formula baku, target, dan realisasi aktual per Total Corporate, HQ, dan Jaringan Store.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari metrik, formula, target..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-red-500 w-56 sm:w-64"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-100 overflow-x-auto">
        <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            KATEGORI:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Exact Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8fafc] text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 font-mono font-bold w-12 text-center">NO</th>
              <th className="py-3 px-4 font-bold min-w-[200px]">NAMA METRIK</th>
              <th className="py-3 px-3 font-bold min-w-[140px]">KATEGORI</th>
              <th className="py-3 px-3 font-bold min-w-[180px]">FORMULA</th>
              <th className="py-3 px-3 font-bold min-w-[130px]">TARGET</th>
              <th
                className={`py-3 px-3 font-bold min-w-[160px] ${selectedScope === 'corporate' ? 'bg-slate-200/60 text-slate-900 font-extrabold' : ''
                  }`}
              >
                TOTAL CORPORATE
              </th>
              <th
                className={`py-3 px-3 font-bold min-w-[150px] ${selectedScope === 'hq' ? 'bg-slate-200/60 text-slate-900 font-extrabold' : ''
                  }`}
              >
                HQ (KANTOR PUSAT)
              </th>
              <th
                className={`py-3 px-3 font-bold min-w-[150px] ${selectedScope === 'store' ? 'bg-slate-200/60 text-slate-900 font-extrabold' : ''
                  }`}
              >
                STORE (RITEL)
              </th>
              <th className="py-3 px-3 font-bold min-w-[120px] text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredMetrics.map((metric) => (
              <tr
                key={metric.no}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                {/* No */}
                <td className="py-3 px-3 font-mono font-bold text-slate-600 text-center tabular-nums">
                  {metric.no}
                </td>

                {/* Nama Metrik */}
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900">
                    {metric.name}
                  </div>
                  {metric.criticalQuest && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#C8102E] bg-red-50 px-1.5 py-0.5 rounded border border-red-200 mt-1">
                      {metric.criticalQuest}
                    </span>
                  )}
                </td>

                {/* Kategori */}
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 tracking-wide">
                    {metric.category}
                  </span>
                </td>

                {/* Formula */}
                <td className="py-3 px-3 text-slate-600 font-mono text-[11px] leading-relaxed">
                  {metric.formulae}
                </td>

                {/* Target */}
                <td className="py-3 px-3">
                  <span className="font-mono text-[11px] font-medium text-slate-700">
                    {metric.target}
                  </span>
                </td>

                {/* Total Corporate */}
                <td
                  className={`py-3 px-3 font-mono font-semibold text-slate-900 tabular-nums ${selectedScope === 'corporate' ? 'bg-blue-50/40 font-bold text-blue-900' : ''
                    }`}
                >
                  {metric.formattedCorporate}
                </td>

                {/* HQ */}
                <td
                  className={`py-3 px-3 font-mono text-slate-700 tabular-nums ${selectedScope === 'hq' ? 'bg-blue-50/40 font-bold text-blue-900' : ''
                    }`}
                >
                  {metric.formattedHQ}
                </td>

                {/* Store */}
                <td
                  className={`py-3 px-3 font-mono text-slate-700 tabular-nums ${selectedScope === 'store' ? 'bg-blue-50/40 font-bold text-blue-900' : ''
                    }`}
                >
                  {metric.formattedStore}
                </td>

                {/* Status */}
                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${metric.status === 'optimal'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : metric.status === 'normal'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : metric.status === 'alert'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                  >
                    {metric.status === 'optimal' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : metric.status === 'normal' ? (
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    ) : metric.status === 'alert' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    <span>{metric.statusLabel || 'Tercapai'}</span>
                  </span>
                </td>
              </tr>
            ))}

            {filteredMetrics.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                  Tidak ada metrik yang cocok dengan filter pencarian &ldquo;{searchQuery}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Summary */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-mono">
        <div>
          Menampilkan <span className="font-bold text-slate-800 tabular-nums">{filteredMetrics.length}</span> dari <span className="font-bold text-slate-800 tabular-nums">{phase1Metrics.length}</span> metrik baku
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Kepatuhan Standar ISO/Kemnaker 100%
          </span>
          <span className="text-slate-400">•</span>
          <span>Tahun Fiskal {selectedYear}</span>
        </div>
      </div>
    </div>
  );
};
