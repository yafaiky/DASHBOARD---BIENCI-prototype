import React, { useState } from "react"
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  User,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

interface TopbarProps {
  onToggleSidebar: () => void
  onOpenSearch: () => void
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  onOpenSearch,
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4 flex-1">
        {/* Toggle sidebar button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 -lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full hidden sm:block">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 -lg text-left transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search employee, ID, department...</span>
            </div>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-white border border-slate-300  shadow-xs">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="sm:hidden p-2 -lg text-slate-600 hover:bg-slate-100"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 -lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center -full bg-[#c8102e] text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white -xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Workforce Alerts
                </span>
                <span className="text-[11px] text-red-600 font-semibold cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <span className="w-2.5 h-2.5 mt-1 -full bg-red-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      9 contracts expire within 30 days
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      West Java & Jabodetabek retail associates
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      15 mins ago
                    </span>
                  </div>
                </div>
                <div className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <span className="w-2.5 h-2.5 mt-1 -full bg-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Labour cost Commercial exceeds budget
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      +4.2% over Q3 allocated limit
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      1 hour ago
                    </span>
                  </div>
                </div>
                <div className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <span className="w-2.5 h-2.5 mt-1 -full bg-blue-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Batch Import 124 records successful
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      store_recruitment.xlsx processed with 0 errors
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      3 hours ago
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                <Link
                  to="/activity-log"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  View All System Logs →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help icon */}
        <button
          type="button"
          className="p-2 -lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors hidden sm:block"
          title="Help & Documentation"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User profile dropdown */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1 -lg hover:bg-slate-100 transition-colors text-left cursor-pointer"
          >
            <img
              src="https://cdn.vectorstock.com/i/1000v/92/05/panda-cartoon-cute-animals-vector-39469205.jpg"
              alt="Budi Santoso"
              className="w-9 h-9 -full object-cover ring-2 ring-red-500/20"
            />
            <div className="hidden md:block">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>Muntazier</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                HR Senior Admin
              </div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white -xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Budi Santoso</p>
                <p className="text-[11px] text-slate-500">
                  budi.santoso@biensi.co.id
                </p>
                <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 ">
                  <CheckCircle2 className="w-3 h-3" /> Live Engine Connected
                </span>
              </div>
              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-slate-400" /> Profile Details
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" /> System
                  Settings
                </Link>
              </div>
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
