import React, { useState } from "react"
import { User, Shield, Bell, Palette, Globe, Check } from "lucide-react"

export const SettingsPage: React.FC = () => {
  const [section, setSection] = useState<
    "profile" | "security" | "app" | "notification" | "appearance"
  >("profile")
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {saved && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-semibold -xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>System configuration updated successfully!</span>
        </div>
      )}

      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          System & Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your executive admin profile, authentication, alert routing &
          appearance preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Navigation Menu */}
        <div className="bg-white p-3 -2xl border border-slate-200 shadow-2xs space-y-1 text-xs font-bold">
          {[
            { id: "profile", label: "Admin Profile", icon: User },
            { id: "security", label: "Security & 2FA", icon: Shield },
            { id: "app", label: "Application & Engine", icon: Globe },
            { id: "notification", label: "Alert Center Triggers", icon: Bell },
            { id: "appearance", label: "Theme & Brand Palette", icon: Palette },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 -xl transition-all ${
                section === item.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Settings Form Container */}
        <div className="md:col-span-3 bg-white p-6 -2xl border border-slate-200 shadow-2xs">
          {section === "profile" && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Administrator Profile
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-16 h-16 -2xl object-cover ring-2 ring-red-500/20"
                />
                <div>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-xs font-bold -lg border border-slate-200 hover:bg-slate-50"
                  >
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Budi Santoso"
                    className="w-full px-3 py-2 border border-slate-200 -xl focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="budi.santoso@biensi.co.id"
                    className="w-full px-3 py-2 border border-slate-200 -xl focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Official Role
                  </label>
                  <input
                    type="text"
                    defaultValue="HR Senior Administrator"
                    readOnly
                    className="w-full px-3 py-2 border border-slate-200 -xl bg-slate-50 text-slate-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Corporate Phone
                  </label>
                  <input
                    type="text"
                    defaultValue="+62 22 7300-3333 (HQ Ext 201)"
                    className="w-full px-3 py-2 border border-slate-200 -xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-red-700 -xl shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {section === "security" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Security & Multi-Factor Authentication
              </h3>
              <div className="p-4 -xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    Two-Factor Authentication (2FA)
                  </span>
                  <span className="px-2 py-0.5 -full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Enabled
                  </span>
                </div>
                <p className="text-slate-500">
                  Your account is secured with Google Authenticator OTP
                  verification.
                </p>
              </div>
            </div>
          )}

          {section === "app" && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                BIENSI Live HR Engine Parameters
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 -xl bg-slate-50">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Biometric Shift Sync Frequency
                    </span>
                    <span className="text-slate-500">
                      How often store finger-scan data streams to central DB
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">
                    Every 15 Minutes
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 -xl bg-slate-50">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Contract Expiry Warning Threshold
                    </span>
                    <span className="text-slate-500">
                      Trigger Alert Center warnings prior to PKWT end date
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">
                    30 Days
                  </span>
                </div>
              </div>
            </div>
          )}

          {section === "notification" && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Alert Notification Subscriptions
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 -xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-red-600 accent-red-600"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Contract Expiring Alerts (&le; 30 days)
                    </span>
                    <span className="text-slate-500">
                      Receive real-time badges when associates enter critical
                      window
                    </span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 -xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-red-600 accent-red-600"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Store Labour Cost Over-Budget Warnings
                    </span>
                    <span className="text-slate-500">
                      Alert when retail division payroll exceeds budgeted
                      allocation ratio
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {section === "appearance" && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Theme & Brand Palette Settings
              </h3>
              <div className="p-4 -xl bg-slate-50 border border-slate-100 space-y-3">
                <span className="font-bold text-slate-800 block">
                  Corporate Brand Accent
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 -lg bg-[#C8102E] ring-2 ring-red-400"
                    title="3SECOND Crimson"
                  />
                  <div
                    className="w-8 h-8 -lg bg-[#172B4D]"
                    title="Navy Slate"
                  />
                  <div
                    className="w-8 h-8 -lg bg-[#0F172A]"
                    title="Dark Obsidian"
                  />
                </div>
                <p className="text-slate-500 mt-2">
                  Active design token is configured to{" "}
                  <strong>3SECOND Crimson Red (#C8102E)</strong> with Dark Slate
                  Sidebar.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
