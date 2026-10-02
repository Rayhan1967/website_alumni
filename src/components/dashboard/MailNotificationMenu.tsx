import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  CheckCheck,
  Trash2,
  ExternalLink,
  X,
  Send,
  MessageSquare,
  FileCheck2,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Inbox,
} from 'lucide-react';
import { useMailStore, MailItem } from '@/store/mailStore';
import { useAuthStore } from '@/store/authStore';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useNavigate } from 'react-router-dom';

interface MailNotificationMenuProps {
  onNavigateTab?: (tab: string, respondentId?: string) => void;
}

export const MailNotificationMenu: React.FC<MailNotificationMenuProps> = ({
  onNavigateTab,
}) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const role = user?.role === 'admin_bkk' ? 'admin_bkk' : 'alumni';
  const userNisn = user?.nisn;

  const {
    getMailsForUser,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteMail,
  } = useMailStore();

  const mails = getMailsForUser(role, userNisn);
  const unreadCount = getUnreadCount(role, userNisn);

  const filteredMails = mails.filter((m) =>
    activeFilter === 'unread' ? !m.isRead : true
  );

  // Close popup when clicking outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
    }
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  const handleOpenMail = (mail: MailItem) => {
    markAsRead(mail.id);
    setSelectedMail(mail);
  };

  const handleActionClick = (mail: MailItem) => {
    if (!mail.actionUrl) return;
    setIsOpen(false);
    setSelectedMail(null);

    if (onNavigateTab) {
      onNavigateTab(mail.actionUrl.tab, mail.actionUrl.respondentId);
    } else {
      if (role === 'admin_bkk') {
        navigate(`/admin?tab=${mail.actionUrl.tab}`);
      } else {
        navigate(`/dashboard?tab=${mail.actionUrl.tab}`);
      }
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Baru saja';
      if (diffMins < 60) return `${diffMins} mnt lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      if (diffDays === 1) return 'Kemarin';
      return `${diffDays} hari lalu`;
    } catch {
      return dateStr;
    }
  };

  const getCategoryBadge = (category: MailItem['category']) => {
    switch (category) {
      case 'tracer_submission':
        return {
          label: 'Isian Baru',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: FileCheck2,
        };
      case 'verification_update':
        return {
          label: 'Verifikasi',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: CheckCheck,
        };
      case 'inquiry':
        return {
          label: 'Pertanyaan',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: HelpCircle,
        };
      case 'feedback':
        return {
          label: 'Saran & Masukan',
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: MessageSquare,
        };
      default:
        return {
          label: 'Pemberitahuan',
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: Mail,
        };
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Mail Button with Unread Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isOpen
            ? 'bg-[#0d2346] text-white shadow-md'
            : 'bg-slate-100 hover:bg-slate-200 text-[#0d2346]'
        }`}
        aria-label="Pesan & Notifikasi"
        title="Kotak Masuk & Pesan Alumni"
      >
        <Mail className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isOpen ? 'fill-white/20' : ''}`} />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white shadow-xs animate-in zoom-in-50">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Floating Mail Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-[330px] sm:w-[390px] max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0d2346] to-[#182945] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/10 text-[#ffc72c]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                  {role === 'admin_bkk' ? 'Pesan & Isian Alumni' : 'Kotak Masuk BKK'}
                </h3>
                <p className="text-[10px] text-slate-300">
                  {unreadCount > 0 ? `${unreadCount} pesan belum dibaca` : 'Semua pesan sudah dibaca'}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead(role, userNisn)}
                className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white/15 hover:bg-white/25 text-white transition cursor-pointer flex items-center gap-1"
                title="Tandai semua sudah dibaca"
              >
                <CheckCheck className="w-3 h-3" />
                <span>Baca Semua</span>
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="px-3.5 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium text-[11px] cursor-pointer transition ${
                  activeFilter === 'all'
                    ? 'bg-white text-[#0d2346] font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Semua ({mails.length})
              </button>
              <button
                onClick={() => setActiveFilter('unread')}
                className={`px-2.5 py-1 rounded-lg font-medium text-[11px] cursor-pointer transition ${
                  activeFilter === 'unread'
                    ? 'bg-white text-[#0d2346] font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Belum Dibaca ({unreadCount})
              </button>
            </div>

            <span className="text-[10px] text-slate-400">
              {filteredMails.length} data
            </span>
          </div>

          {/* Mail List Body */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
            {filteredMails.length === 0 ? (
              <div className="py-10 text-center px-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                  <Inbox className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  Tidak ada pesan {activeFilter === 'unread' ? 'belum dibaca' : ''}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {role === 'admin_bkk'
                    ? 'Pemberitahuan isian tracer dan pesan dari alumni akan muncul di sini.'
                    : 'Pemberitahuan status verifikasi kuesioner Anda akan masuk di sini.'}
                </p>
              </div>
            ) : (
              filteredMails.map((mail) => {
                const badge = getCategoryBadge(mail.category);
                const BadgeIcon = badge.icon;

                return (
                  <div
                    key={mail.id}
                    onClick={() => handleOpenMail(mail)}
                    className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors relative hover:bg-slate-50 ${
                      !mail.isRead ? 'bg-blue-50/40' : 'bg-white'
                    }`}
                  >
                    {/* Unread indicator dot */}
                    {!mail.isRead && (
                      <span className="absolute left-1.5 top-5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}

                    {/* Sender Avatar */}
                    <div className="shrink-0 pt-0.5">
                      <UserAvatar
                        name={mail.senderName}
                        gender={mail.senderAvatarGender}
                        className="w-9 h-9 border border-slate-200"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className={`text-xs truncate ${
                            !mail.isRead
                              ? 'font-bold text-slate-900'
                              : 'font-semibold text-slate-700'
                          }`}
                        >
                          {mail.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {formatTimeAgo(mail.createdAt)}
                        </span>
                      </div>

                      <p
                        className={`text-xs line-clamp-1 mb-1 ${
                          !mail.isRead
                            ? 'font-bold text-[#0d2346]'
                            : 'font-medium text-slate-800'
                        }`}
                      >
                        {mail.subject}
                      </p>

                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                        {mail.preview}
                      </p>

                      {/* Tag badges */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${badge.bg}`}
                        >
                          <BadgeIcon className="w-2.5 h-2.5" />
                          {badge.label}
                        </span>

                        {mail.submissionId && (
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            {mail.submissionId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Chevron */}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 self-center" />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
            <span>SMK Sasmita Jaya 2 • Bursa Kerja Khusus (BKK)</span>
          </div>

        </div>
      )}

      {/* Mail Detail Modal */}
      {selectedMail && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0d2346] to-[#182945] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-[#ffc72c]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Detail Pesan / Notifikasi
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Diterima: {new Date(selectedMail.createdAt).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMail(null)}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Meta Box */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-start gap-3">
                <UserAvatar
                  name={selectedMail.senderName}
                  gender={selectedMail.senderAvatarGender}
                  className="w-11 h-11 border border-slate-300 shadow-xs shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {selectedMail.senderName}
                    </h4>
                    {selectedMail.senderMajor && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0d2346] border border-blue-200">
                        {selectedMail.senderMajor} {selectedMail.senderGradYear ? `(${selectedMail.senderGradYear})` : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedMail.senderEmail}
                    {selectedMail.senderNisn ? ` • NISN: ${selectedMail.senderNisn}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-4 sm:p-5 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  SUBJEK PESAN
                </span>
                <h2 className="text-base font-bold text-[#0d2346] leading-snug">
                  {selectedMail.subject}
                </h2>
              </div>

              {selectedMail.submissionId && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ID Pengajuan Tracer: <strong>{selectedMail.submissionId}</strong></span>
                </div>
              )}

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                {selectedMail.body}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => {
                  deleteMail(selectedMail.id);
                  setSelectedMail(null);
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Pesan</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedMail.actionUrl && (
                  <button
                    onClick={() => handleActionClick(selectedMail)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0d2346] hover:bg-[#182945] shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{selectedMail.actionUrl.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedMail(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
