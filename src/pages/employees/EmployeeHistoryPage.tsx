import React, { useState } from 'react';
import { History, Search, ArrowRightLeft, Award, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmployeeHistoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const historyRecords = [
    {
      id: 'HIST-901',
      employeeId: 'EMP-10234',
      name: 'Maya Anggraeni',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      type: 'Promotion',
      event: 'Promoted to Regional VM Specialist',
      previous: 'Store Visual Merchandiser (Store Bandung 01)',
      current: 'Regional VM Specialist (Jakarta Flagship Hub)',
      date: '18 Oct 2026',
      approvedBy: 'Creative Director & HR VP'
    },
    {
      id: 'HIST-902',
      employeeId: 'EMP-10233',
      name: 'Budi Hartono',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      type: 'Transfer',
      event: 'Branch Transfer to Central Logistics Hub A',
      previous: 'Inventory Control Assistant (Warehouse Hub C)',
      current: 'Shift Supervisor Hub A (Cimahi)',
      date: '20 Oct 2026',
      approvedBy: 'Supply Chain Operations Head'
    },
    {
      id: 'HIST-903',
      employeeId: 'EMP-10235',
      name: 'Reza Pahlevi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      type: 'Contract Renewal',
      event: 'PKWT Contract Renewal 2026/2027',
      previous: 'Cashier Store Staff (PKWT Year 1)',
      current: 'Chief Cashier Leader (PKWT Year 2)',
      date: '17 Oct 2026',
      approvedBy: 'Retail HR West Java Cluster'
    },
    {
      id: 'HIST-904',
      employeeId: 'EMP-10231',
      name: 'Andi Pratama',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      type: 'Onboarding',
      event: 'Initial Employment Contract Execution',
      previous: 'Candidate / Roster Applicant',
      current: 'Senior Store Associate (3SECOND Bandung 01)',
      date: '24 Oct 2026',
      approvedBy: 'HR Recruitment Bandung'
    }
  ];

  const filtered = historyRecords.filter((rec) => {
    const matchSearch =
      rec.name.toLowerCase().includes(search.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      rec.event.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || rec.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Personnel Career & Transfer History</h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical milestones, branch transfers, grade promotions, and tenure contracts across all 3SECOND entities
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          {['All', 'Promotion', 'Transfer', 'Contract Renewal', 'Onboarding'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
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
            placeholder="Search employee name, NIK, or historical event..."
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
                <th className="p-3">Associate</th>
                <th className="p-3">Classification</th>
                <th className="p-3">Milestone Details</th>
                <th className="p-3">Previous Assignment</th>
                <th className="p-3">Effective Date</th>
                <th className="p-3 text-right">Approval Authority</th>
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
                      item.type === 'Promotion'
                        ? 'bg-blue-50 text-blue-700'
                        : item.type === 'Transfer'
                        ? 'bg-amber-50 text-amber-700'
                        : item.type === 'Contract Renewal'
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-900">{item.event}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Assigned: {item.current}</div>
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
