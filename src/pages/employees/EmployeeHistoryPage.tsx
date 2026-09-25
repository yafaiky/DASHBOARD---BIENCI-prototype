import React, { useState } from 'react';
import { History, Search, ArrowRightLeft, Award, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmployeeHistoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Semua');

  const historyRecords = [
    {
      id: 'HIST-901',
      employeeId: 'EMP-10234',
      name: 'Maya Anggraeni',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      type: 'Promosi',
      event: 'Promosi Jabatan ke Regional VM Specialist',
      previous: 'Store Visual Merchandiser (Store Bandung 01)',
      current: 'Regional VM Specialist (Jakarta Flagship Hub)',
      date: '18 Okt 2026',
      approvedBy: 'Direktur Kreatif & VP HR'
    },
    {
      id: 'HIST-902',
      employeeId: 'EMP-10233',
      name: 'Budi Hartono',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      type: 'Mutasi',
      event: 'Mutasi Cabang ke Hub Logistik Sentral A',
      previous: 'Staf Kontrol Inventori (Warehouse Hub C)',
      current: 'Supervisor Shift Hub A (Cimahi)',
      date: '20 Okt 2026',
      approvedBy: 'Kepala Operasional Rantai Pasok'
    },
    {
      id: 'HIST-903',
      employeeId: 'EMP-10235',
      name: 'Reza Pahlevi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      type: 'Perpanjangan Kontrak',
      event: 'Perpanjangan Kontrak PKWT 2026/2027',
      previous: 'Staf Kasir Toko (PKWT Tahun 1)',
      current: 'Chief Cashier Leader (PKWT Tahun 2)',
      date: '17 Okt 2026',
      approvedBy: 'HR Retail Klaster Jawa Barat'
    },
    {
      id: 'HIST-904',
      employeeId: 'EMP-10231',
      name: 'Andi Pratama',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      type: 'Onboarding',
      event: 'Penandatanganan Kontrak Kerja Awal',
      previous: 'Kandidat Pelamar Roster',
      current: 'Senior Store Associate (3SECOND Bandung 01)',
      date: '24 Okt 2026',
      approvedBy: 'HR Rekrutmen Bandung'
    }
  ];

  const filtered = historyRecords.filter((rec) => {
    const matchSearch =
      rec.name.toLowerCase().includes(search.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      rec.event.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'Semua' || rec.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Riwayat Karir & Mutasi Karyawan</h1>
          <p className="text-xs text-slate-500 mt-1">
            Arsip riwayat promosi jabatan, mutasi antar cabang, perpanjangan kontrak kerja, dan onboarding personil di seluruh entitas 3SECOND Group.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          {['Semua', 'Promosi', 'Mutasi', 'Perpanjangan Kontrak', 'Onboarding'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama karyawan, NIK, atau peristiwa karir..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 font-bold">
              <tr>
                <th className="p-3">Nama Karyawan</th>
                <th className="p-3">Jenis Perubahan</th>
                <th className="p-3">Peristiwa Karir</th>
                <th className="p-3">Penugasan Sebelumnya</th>
                <th className="p-3">Tanggal Efektif</th>
                <th className="p-3 text-right">Otoritas Penyetuju</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <Link to={`/employees/${item.employeeId}`} className="flex items-center gap-2.5 group">
                      <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">{item.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{item.employeeId}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.type === 'Promosi'
                        ? 'bg-blue-50 text-blue-700'
                        : item.type === 'Mutasi'
                        ? 'bg-amber-50 text-amber-700'
                        : item.type === 'Perpanjangan Kontrak'
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-900">{item.event}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Penugasan Baru: {item.current}</div>
                  </td>
                  <td className="p-3 text-slate-500">{item.previous}</td>
                  <td className="p-3 font-mono font-medium text-slate-700">{item.date}</td>
                  <td className="p-3 text-right font-medium text-slate-600">{item.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
