import React from 'react';
import {
  Home,
  FileCheck2,
  FileSpreadsheet,
  Briefcase,
  Users,
  Headphones,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useNavigate } from 'react-router-dom';

export type DashboardTab =
  | 'beranda'
  | 'cek_ijazah'
  | 'tracer_study'
  | 'loker'
  | 'alumni'
  | 'helpdesk';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

const MENU_ITEMS = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'cek_ijazah', label: 'Cek Ijazah', icon: FileCheck2 },
  { id: 'tracer_study', label: 'Tracer Study', icon: FileSpreadsheet },
  { id: 'loker', label: 'Info Loker/Magang', icon: Briefcase },
  { id: 'alumni', label: 'Alumni', icon: Users },
  { id: 'helpdesk', label: 'Helpdesk', icon: Headphones },
] as const;

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari portal?')) {
      logout();
      navigate('/');
    }
  };

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-100/90 backdrop-blur-md border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 space-y-6">
        
        {/* Logo Section - Crisp Emblem Badge */}
        <div className="flex flex-col items-center justify-center text-center pb-5 border-b border-slate-200">
          <div className="w-14 h-14  p-1.5 flex items-center justify-center mb-2.5">
            <img
              src="/logo-emblem.png"
              alt="Logo SMK Sasmita Jaya 2"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-smk.png';
              }}
            />
          </div>
          <h2 className="font-extrabold text-sm text-slate-800 tracking-tight">
            SMK Sasmita Jaya 2
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">
            Portal Alumni
          </span>
        </div>

        {/* Navigation Menu Buttons matching Wireframe */}
        <nav className="space-y-1.5">
          {MENU_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id as DashboardTab)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-300/80 text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-900' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile footer & logout */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/60">
        <div className="flex items-center gap-2.5 mb-3 px-1">
          <UserAvatar
            name={user?.nama}
            gender={user?.jenisKelamin}
            className="w-9 h-9 border border-slate-300"
          />
          <div className="text-left overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">
              {user?.nama || 'Alumni Sasmita'}
            </p>
            <p className="text-[10px] text-slate-500">
              NISN: {user?.nisn || '0051234567'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </aside>
  );
};
