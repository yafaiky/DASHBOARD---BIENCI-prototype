import React from 'react';
import { Users, TrendingUp, DollarSign, Factory, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { historicalYearData } from '../../data/phase1Data';

interface ExecutiveHeroMetricsProps {
  selectedYear: '2026' | '2025' | '2024';
  selectedScope: 'corporate' | 'hq' | 'store';
}

export const ExecutiveHeroMetrics: React.FC<ExecutiveHeroMetricsProps> = ({
  selectedYear,
  selectedScope,
}) => {
  const currentData = historicalYearData[selectedYear];

  // Headcount numbers based on scope
  const displayHeadcount =
    selectedScope === 'hq'
      ? currentData.hqHeadcount
      : selectedScope === 'store'
        ? currentData.storeHeadcount
        : currentData.totalHeadcount;

  // YoY comparison logic
  const prevYearKey = selectedYear === '2026' ? '2025' : selectedYear === '2025' ? '2024' : null;
  const prevData = prevYearKey ? historicalYearData[prevYearKey] : null;

  const headcountDiffPct = prevData
    ? (((currentData.totalHeadcount - prevData.totalHeadcount) / prevData.totalHeadcount) * 100).toFixed(1)
    : '-';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Total Headcount Card (Black Card style matching screenshot) */}
      <div className="bg-[#0f131f] text-white p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Headcount
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800/80 text-slate-300 border border-slate-700/60 tracking-wider">
              {selectedYear}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white tabular-nums">
              {displayHeadcount.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">Orang</span>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {Number(headcountDiffPct) <= 0 ? (
              <span className="inline-flex items-center gap-0.5 text-emerald-400 font-mono font-semibold">
                <ArrowDownRight className="w-3.5 h-3.5" />
                {headcountDiffPct}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-amber-400 font-mono font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{headcountDiffPct}%
              </span>
            )}
            <span className="text-slate-400 text-[11px]">vs tahun sebelumnya (As per Budget)</span>
          </div>
        </div>

        {/* Headcount Breakdown Footer */}
        <div className="pt-3 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">HQ (Kantor Pusat)</span>
            <span className="text-sm font-bold font-mono text-slate-200 tabular-nums">
              {currentData.hqHeadcount.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">(28.5%)</span>
            </span>
          </div>
          <div className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">Store (Jaringan Ritel)</span>
            <span className="text-sm font-bold font-mono text-slate-200 tabular-nums">
              {currentData.storeHeadcount.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">(71.5%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. All Productivity - Sales (Black Card style) */}
      <div className="bg-[#0f131f] text-white p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                All Productivity - Sales
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 tracking-wider">
              Ratio: {currentData.labourCostRatio}%
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white tabular-nums">
              Rp 45.08
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">Jt / FTE / Bln</span>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 text-emerald-400 font-mono font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +8.4%
            </span>
            <span className="text-slate-400 text-[11px]">vs tahun sebelumnya • Payroll Mult: 12.8x</span>
          </div>
        </div>

        {/* Productivity Details Footer */}
        <div className="pt-3 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">% Gaji vs Sales</span>
            <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums flex items-center gap-1">
              {currentData.labourCostRatio}% <span className="text-[10px] text-slate-400 font-normal">(&lt; 10%)</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
            </span>
          </div>
          <div className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">Peak Lebaran (Mar)</span>
            <span className="text-sm font-bold font-mono text-slate-200 tabular-nums">
              Rp 30.5M <span className="text-[10px] text-emerald-400 font-normal">(3.2%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Productivity - Production (Black Card style) */}
      <div className="bg-[#0f131f] text-white p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Productivity - Production
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/60 text-purple-300 border border-purple-800/40 tracking-wider">
              Target 0.05
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white tabular-nums">
              Ratio 1 : 20
            </span>
            <span className="text-xs text-purple-300 font-mono font-medium">(0.05)</span>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 text-emerald-400 font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Target Tercapai
            </span>
            <span className="text-slate-400 text-[11px]">vs tahun lalu: +4.2% Efisiensi CMT</span>
          </div>
        </div>

        {/* Production Details Footer */}
        <div className="pt-3 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">Tenaga Kerja CMT</span>
            <span className="text-sm font-bold font-mono text-slate-200 tabular-nums">
              48 FTE <span className="text-[10px] text-slate-400 font-normal">(QA & Aplikasi)</span>
            </span>
          </div>
          <div className="bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">On-Time Output</span>
            <span className="text-sm font-bold font-mono text-purple-300 tabular-nums">
              95.2% <span className="text-[10px] text-slate-400 font-normal">Garment</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
