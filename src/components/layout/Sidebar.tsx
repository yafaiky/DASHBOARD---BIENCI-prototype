import React from "react"
import { Link, useLocation } from "react-router-dom"
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
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

interface MenuItem {
  name: string
  path: string
  icon: React.ElementType
  badge?: string
}

interface MenuGroup {
  title: string
  items: MenuItem[]
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  const isPathActive = (itemPath: string) => {
    const current = location.pathname
    if (itemPath === "/dashboard") {
      return current === "/" || current === "/dashboard"
    }
    if (itemPath === "/employees/recent") {
      return current === "/employees/recent"
    }
    if (itemPath === "/employees/history") {
      return current === "/employees/history"
    }
    if (itemPath === "/employees") {
      // Active for /employees or /employees/:id, but strictly NOT /employees/recent and NOT /employees/history
      return (
        current === "/employees" ||
        (current.startsWith("/employees/") &&
          current !== "/employees/recent" &&
          current !== "/employees/history")
      )
    }
    if (itemPath === "/activity-log") {
      return current === "/activity-log"
    }
    if (itemPath === "/import") {
      return current === "/import"
    }
    if (itemPath === "/import/history") {
      return current === "/import/history"
    }
    if (itemPath === "/workforce") {
      return current === "/workforce" || current.startsWith("/workforce/")
    }
    if (itemPath === "/labour-cost") {
      return current === "/labour-cost" || current.startsWith("/labour-cost/")
    }
    if (itemPath === "/turnover") {
      return current === "/turnover" || current.startsWith("/turnover/")
    }
    if (itemPath === "/industrial-relation") {
      return (
        current === "/industrial-relation" ||
        current.startsWith("/industrial-relation/")
      )
    }
    if (itemPath === "/users") {
      return current === "/users"
    }
    return current === itemPath
  }

  const menuGroups: MenuGroup[] = [
    {
      title: "MAIN",
      items: [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
    },
    {
      title: "EMPLOYEE",
      items: [
        { name: "Recent", path: "/employees/recent", icon: Clock },
        { name: "History", path: "/employees/history", icon: History },
        { name: "All Data", path: "/employees", icon: Users },
      ],
    },
    {
      title: "ANALYTICS",
      items: [
        { name: "Workforce", path: "/workforce", icon: UserCheck },
        { name: "Labour Cost", path: "/labour-cost", icon: DollarSign },
        { name: "Turnover", path: "/turnover", icon: TrendingDown },
        { name: "Attendance", path: "/attendance", icon: CalendarCheck },
        {
          name: "Recruitment & Stores",
          path: "/store-performance",
          icon: Briefcase,
        },
      ],
    },
    {
      title: "RISK & COMPLIANCE",
      items: [
        {
          name: "SP / Discipline",
          path: "/industrial-relation",
          icon: AlertCircle,
          badge: "3",
        },
        { name: "Compliance & Legal", path: "/compliance", icon: ShieldCheck },
      ],
    },
    {
      title: "DATA MANAGEMENT",
      items: [
        { name: "Import Data", path: "/import", icon: FileSpreadsheet },
        { name: "Import History", path: "/import/history", icon: History },
        { name: "Trash", path: "/trash", icon: Trash2 },
        { name: "Activity Log", path: "/activity-log", icon: ListTodo },
      ],
    },
    {
      title: "MASTER DATA",
      items: [{ name: "Master Data", path: "/master-data", icon: Database }],
    },
    {
      title: "ADMINISTRATION",
      items: [
        { name: "User Management", path: "/users", icon: UserCog },
        { name: "Role & Permission", path: "/roles", icon: ShieldCheck },
        { name: "Settings", path: "/settings", icon: Settings },
      ],
    },
  ]

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
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col bg-[#141724] text-slate-300 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-slate-800/80 bg-[#10131d]">
          <div className="flex items-center gap-3">
            {/* Logo icon */}
            <div className="w-10">
              <img src="/public/BiensiIcon.webp" alt="icon" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <div className="w-20">
                  <img src="/public/BiensiType.webp" alt="Type" />
                </div>
                <span className="text-[11px] font-bold text-red-500 tracking-wider">
                  {/* HRMS */}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">
                3SECOND GROUP
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list with dark custom scrollbar */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isPathActive(item.path)
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024 && onClose) onClose()
                      }}
                      className={`flex items-center justify-between px-3 py-2.5  font-medium transition-colors ${
                        active
                          ? "bg-[#3b1522] text-white shadow-sm border-l-2 border-red-500 font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`w-4 h-4 ${active ? "text-red-400" : "text-slate-400"}`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 shrink-0 border-t border-slate-800/80 bg-[#10131d] text-center">
          <p className="text-[11px] text-slate-500 font-medium tracking-wide">
            Devtrine Studio @2026
          </p>
        </div>
      </aside>
    </>
  )
}
