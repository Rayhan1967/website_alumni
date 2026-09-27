import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTracerStore } from '@/store/tracerStore';
import { Menu, Bell, User, LogOut, FileText, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenReceipt: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleMobileMenu,
  onOpenReceipt,
}) => {
  const { user, logout } = useAuthStore();
  const { isSubmitted } = useTracerStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
      
      {/* Greetings Area (Left) matching Wireframe */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Halo, {user?.nama || 'Ahmad Dani'}! 👋</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Alumni Aktif
            </span>
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            SMK Sasmita Jaya 2 Pamulang • Tahun Lulus {user?.tahun_lulus || 2024}
          </p>
        </div>
      </div>

      {/* Right Area: Profile Circle matching Wireframe */}
      <div className="flex items-center gap-3">
        
        {/* Notification Bell */}
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </div>

        {/* Profile Circle with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 overflow-hidden border border-slate-300 flex items-center justify-center font-bold text-xs">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-slate-600" />
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-40 text-xs text-slate-700">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="font-bold text-slate-900">{user?.nama}</p>
                <p className="text-slate-400 text-[11px] truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenReceipt();
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Bukti Pengisian Tracer Study</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
