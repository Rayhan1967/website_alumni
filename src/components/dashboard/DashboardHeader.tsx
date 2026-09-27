import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTracerStore } from '@/store/tracerStore';
import { Menu, Bell, LogOut, FileText, ChevronDown } from 'lucide-react';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when tapping/clicking outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
    }
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [dropdownOpen]);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-3.5 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between shadow-xs">
      
      {/* Greetings Area (Left) matching Wireframe */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Halo, {user?.nama || 'Ahmad Dani'}!</span>
            
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
            aria-expanded={dropdownOpen}
          >
            <UserAvatar
              name={user?.nama}
              gender={user?.jenisKelamin}
              className="w-10 h-10 border border-slate-300"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-40 text-xs text-slate-700">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="font-bold text-slate-900">{user?.nama || 'Ahmad Dani'}</p>
                <p className="text-slate-400 text-[11px] truncate">{user?.email || 'alumni@example.com'}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenReceipt();
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-900" />
                  <span>Bukti Pengisian Tracer Study</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleLogoutClick}
                  className="w-full px-4 py-2 text-left hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

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
    </header>
  );
};
