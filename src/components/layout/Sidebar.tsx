import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  UserCheck,
  TrendingDown,
  CalendarCheck,
  Briefcase,
  FileSpreadsheet,
  History,
  Trash2,
  ListTodo,
  Database,
  UserCog,
  ShieldCheck,
  Settings,
  DollarSign,
  AlertCircle,
  Target,
  LineChart,
  Award,
  Compass,
  HeartHandshake,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
}

interface SubMenuItem {
  name: string;
  icon: React.ElementType;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  subItems?: SubMenuItem[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed = false, onClose }) => {
  const location = useLocation();
  const [executiveListOpen, setExecutiveListOpen] = React.useState(false);

  const isPathActive = (itemPath: string) => {
    const current = location.pathname;
    if (itemPath === '/dashboard') {
      return current === '/' || current === '/dashboard';
    }
    if (itemPath === '/employees/recent') {
      return current === '/employees/recent';
    }
    if (itemPath === '/employees/history') {
      return current === '/employees/history';
    }
    if (itemPath === '/employees') {
      return current === '/employees' || (
        current.startsWith('/employees/') &&
        current !== '/employees/recent' &&
        current !== '/employees/history'
      );
    }
    if (itemPath === '/activity-log') {
      return current === '/activity-log';
    }
    if (itemPath === '/import') {
      return current === '/import';
    }
    if (itemPath === '/import/history') {
      return current === '/import/history';
    }
    if (itemPath === '/workforce') {
      return current === '/workforce' || current.startsWith('/workforce/');
    }
    if (itemPath === '/labour-cost') {
      return current === '/labour-cost' || current.startsWith('/labour-cost/');
    }
    if (itemPath === '/turnover') {
      return current === '/turnover' || current.startsWith('/turnover/');
    }
    if (itemPath === '/industrial-relation') {
      return current === '/industrial-relation' || current.startsWith('/industrial-relation/');
    }
    if (itemPath === '/users') {
      return current === '/users';
    }
    return current === itemPath;
  };

  const menuGroups: MenuGroup[] = [
    {
      title: 'HR EXECUTIVE DASHBOARD',
      items: [
        {
          name: 'HR Executive Dashboard',
          path: '/dashboard',
          icon: LayoutDashboard,
          subItems: [
            { name: 'KPI Management', icon: Target },
            { name: 'Productivity Analysis', icon: LineChart },
            { name: 'Talent', icon: Award },
            { name: 'Go To Market - HR Analysis', icon: Compass },
            { name: 'Employee Engagement Survey', icon: HeartHandshake }
          ]
        }
      ]
    },
    {
      title: 'EMPLOYEE',
      items: [
        { name: 'Recent', path: '/employees/recent', icon: Clock },
        { name: 'History', path: '/employees/history', icon: History },
        { name: 'All Data', path: '/employees', icon: Users }
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { name: 'Workforce', path: '/workforce', icon: UserCheck },
        { name: 'Labour Cost', path: '/labour-cost', icon: DollarSign },
        { name: 'Turnover', path: '/turnover', icon: TrendingDown },
        { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
        { name: 'Recruitment & Stores', path: '/store-performance', icon: Briefcase }
      ]
    },
    {
      title: 'RISK & COMPLIANCE',
      items: [
        { name: 'SP / Discipline', path: '/industrial-relation', icon: AlertCircle, badge: '3' },
        { name: 'Compliance & Legal', path: '/compliance', icon: ShieldCheck }
      ]
    },
    {
      title: 'DATA MANAGEMENT',
      items: [
        { name: 'Import Data', path: '/import', icon: FileSpreadsheet },
        { name: 'Import History', path: '/import/history', icon: History },
        { name: 'Trash', path: '/trash', icon: Trash2 },
        { name: 'Activity Log', path: '/activity-log', icon: ListTodo }
      ]
    },
    {
      title: 'MASTER DATA',
      items: [
        { name: 'Master Data', path: '/master-data', icon: Database }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { name: 'User Management', path: '/users', icon: UserCog },
        { name: 'Role & Permission', path: '/roles', icon: ShieldCheck },
        { name: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col bg-[#141724] text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:w-20' : 'lg:w-64'
          } ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Brand Header */}
        <div
          className={`h-16 shrink-0 flex items-center border-b border-slate-800/80 bg-[#10131d] transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-5'
            }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo icon */}
            <div className="w-10 shrink-0 flex items-center justify-center">
              <img src="/BiensiIcon.webp" alt="icon" className="w-9 h-9 object-contain" />
            </div>

            {/* Logo text & subtext (hidden when collapsed) */}
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-1.5 leading-none">
                  <div className="w-20">
                    <img src="/BiensiType.webp" alt="Type" className="w-full object-contain" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5 whitespace-nowrap">
                  3SECOND GROUP
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-4 space-y-4 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {/* Group Title or subtle divider in collapsed mode */}
              {isCollapsed ? (
                <div className="my-2 border-t border-slate-800/60 mx-1" />
              ) : (
                <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {group.title}
                </div>
              )}

              {/* Group Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isPathActive(item.path);

                  if (item.subItems && item.subItems.length > 0) {
                    return (
                      <div key={item.path} className="space-y-1">
                        <div
                          className={`relative flex items-center font-medium transition-all ${isCollapsed
                              ? 'justify-center p-2.5 my-0.5'
                              : 'justify-between px-3 py-2.5'
                            } ${active
                              ? 'bg-[#3b1522] text-white shadow-sm border-l-2 border-red-500 font-semibold'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                            } rounded-lg`}
                        >
                          <Link
                            to={item.path}
                            title={item.name}
                            onClick={() => {
                              setExecutiveListOpen((prev) => !prev);
                              if (window.innerWidth < 1024 && onClose) onClose();
                            }}
                            className="flex items-center gap-3 flex-1 overflow-hidden"
                          >
                            <item.icon
                              className={`w-4 h-4 shrink-0 ${active ? 'text-red-400' : 'text-slate-400'
                                }`}
                            />
                            {!isCollapsed && <span className="truncate">{item.name}</span>}
                          </Link>

                          {/* Arrow Down: berbentuk arrow kebawah jika tidak diklik, berotasi saat terbuka */}
                          {!isCollapsed && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setExecutiveListOpen(!executiveListOpen);
                              }}
                              className="p-1 -mr-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
                              title={executiveListOpen ? 'Tutup list' : 'Buka list'}
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${executiveListOpen ? 'rotate-180 text-white' : ''
                                  }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* List diperlihatkan berbentuk list saat di-klik, polosan tanpa toast */}
                        {!isCollapsed && executiveListOpen && (
                          <div className="pl-4 ml-3 border-l border-slate-800/80 space-y-0.5 pt-0.5 pb-1 animate-in fade-in slide-in-from-top-1 duration-150">
                            {item.subItems.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-center gap-2.5 px-3 py-2 text-[11px] text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors"
                              >
                                <sub.icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <span className="truncate">{sub.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={item.name}
                      onClick={() => {
                        if (window.innerWidth < 1024 && onClose) onClose();
                      }}
                      className={`relative flex items-center font-medium transition-all ${isCollapsed
                          ? 'justify-center p-2.5 my-0.5'
                          : 'justify-between px-3 py-2.5'
                        } ${active
                          ? 'bg-[#3b1522] text-white shadow-sm border-l-2 border-red-500 font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                    >
                      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                        <item.icon
                          className={`w-4 h-4 shrink-0 ${active ? 'text-red-400' : 'text-slate-400'
                            }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </div>

                      {/* Full badge when expanded */}
                      {item.badge && !isCollapsed && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-red-600 text-white shrink-0 tracking-wider">
                          {item.badge}
                        </span>
                      )}

                      {/* Dot badge when collapsed */}
                      {item.badge && isCollapsed && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-[#141724]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`p-3 shrink-0 border-t border-slate-800/80 bg-[#10131d] text-center transition-all duration-300 ${isCollapsed ? 'px-1' : 'px-3'
            }`}
        >
          {isCollapsed ? (
            <span className="text-[10px] text-slate-500 font-mono font-bold tracking-tight">
              ©26
            </span>
          ) : (
            <p className="text-[11px] text-slate-500 font-medium tracking-wide whitespace-nowrap">
              Devtrine Studio @2026
            </p>
          )}
        </div>
      </aside>
    </>
  );
};
