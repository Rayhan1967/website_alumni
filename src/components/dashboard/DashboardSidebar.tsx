import React, { useState } from "react";
import {
  Home,
  FileCheck2,
  FileSpreadsheet,
  Briefcase,
  Users,
  Headphones,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useNavigate } from "react-router-dom";

export type DashboardTab =
  | "beranda"
  | "cek_ijazah"
  | "tracer_study"
  | "loker"
  | "alumni"
  | "helpdesk";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

const MENU_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "cek_ijazah", label: "Cek Ijazah", icon: FileCheck2 },
  { id: "tracer_study", label: "Tracer Study", icon: FileSpreadsheet },
  { id: "loker", label: "Info Loker/Magang", icon: Briefcase },
  { id: "alumni", label: "Alumni", icon: Users },
  { id: "helpdesk", label: "Helpdesk", icon: Headphones },
] as const;

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#0d2346] text-white border-r border-[#163868] flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 w-72 max-w-[85vw] ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Desktop Collapse / Expand Toggle Button at Top-Right Border */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="hidden lg:flex absolute top-6 -right-3 w-6 h-6 rounded-full bg-[#163b6d] hover:bg-blue-600 text-white border border-white items-center justify-center shadow-md transition-all cursor-pointer z-50 hover:scale-110 active:scale-95"
          title={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
          aria-label={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-white" />
          )}
        </button>

        {/* Mobile / Tablet Close (X) Button */}
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-3.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer z-50"
            aria-label="Tutup Menu"
            title="Tutup Menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Scrollable Navigation Body */}
        <div className={`p-4 space-y-5 flex-1 overflow-y-auto overflow-x-hidden ${isCollapsed ? "lg:px-2.5 px-5" : "px-5"}`}>
          
          {/* Top Logo Section */}
          <div className="relative pb-4 border-b border-blue-900/60 flex flex-col items-center justify-center text-center">
            {/* Logo Emblem (Centered, no background, no border, standard size) */}
            <div className="flex items-center justify-center">
              <img
                src="/logo-emblem.png"
                alt="Logo SMK Sasmita Jaya 2"
                className={`object-contain transition-all duration-300 w-12 h-12 mb-2 ${
                  isCollapsed ? "lg:w-10 lg:h-10 lg:mb-0" : ""
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo-smk.png";
                }}
              />
            </div>

            {/* School Name & Portal Badge (Always shown on mobile/tablet, hidden on collapsed desktop) */}
            <div className={`space-y-0.5 overflow-hidden animate-in fade-in duration-200 text-center ${
              isCollapsed ? "lg:hidden block" : "block"
            }`}>
              <h2 className="font-bold text-sm text-white tracking-tight truncate">
                SMK Sasmita Jaya 2
              </h2>
              <span className="text-[11px] text-blue-200/80 font-normal block">
                Portal Alumni
              </span>
            </div>
          </div>

          {/* Navigation Menu Buttons */}
          <nav className="space-y-1.5">
            {MENU_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id as DashboardTab)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer gap-3 px-3.5 py-2.5 text-left ${
                    isCollapsed ? "lg:justify-center lg:p-3" : ""
                  } ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-white" />
                  <span className={`truncate ${isCollapsed ? "lg:hidden block" : "block"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer & Logout */}
        <div className={`p-3.5 border-t border-blue-900/60 bg-[#08172f]/80 shrink-0 ${isCollapsed ? "lg:px-2 px-4" : "px-4"}`}>
          <div
            className={`flex items-center gap-2.5 mb-3 px-1 ${
              isCollapsed ? "lg:justify-center" : ""
            }`}
          >
            <UserAvatar
              name={user?.nama}
              gender={user?.jenisKelamin}
              className="w-9 h-9 border border-blue-400/40 shrink-0"
            />
            <div className={`text-left overflow-hidden ${isCollapsed ? "lg:hidden block" : "block"}`}>
              <p className="text-xs font-bold text-white truncate">
                {user?.nama || "Alumni Sasmita"}
              </p>
              <p className="text-[10px] text-blue-300/70">
                NISN: {user?.nisn || "0051234567"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            title={isCollapsed ? "Keluar dari Akun" : undefined}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-white text-xs font-medium transition cursor-pointer ${
              isCollapsed ? "lg:p-2.5" : ""
            }`}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0 text-white" />
            <span className={isCollapsed ? "lg:hidden inline" : "inline"}>
              Keluar dari Akun
            </span>
          </button>
        </div>
      </aside>

      {/* Friendly Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Keluar dari Portal Alumni?"
        message="Sesi login Anda akan diakhiri. Anda dapat masuk kembali kapan saja menggunakan NISN atau NIK Anda."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="danger"
      />
    </>
  );
};
