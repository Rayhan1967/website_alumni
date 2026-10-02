import React, { useState } from "react";
import {
  Mail,
  Search,
  CheckCheck,
  Trash2,
  ExternalLink,
  Clock,
  Inbox,
  Filter,
  ArrowRight,
  Send,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { useMailStore, MailItem } from "@/store/mailStore";
import { useAuthStore } from "@/store/authStore";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface AdminMessagesTabProps {
  onNavigateTab?: (tab: string, respondentId?: string) => void;
}

export const AdminMessagesTab: React.FC<AdminMessagesTabProps> = ({
  onNavigateTab,
}) => {
  const { user } = useAuthStore();
  const {
    getMailsForUser,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteMail,
  } = useMailStore();

  const role = user?.role === "admin_bkk" ? "admin_bkk" : "alumni";
  const userNisn = user?.nisn;

  const mails = getMailsForUser(role, userNisn);
  const unreadCount = getUnreadCount(role, userNisn);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");
  const [selectedMailId, setSelectedMailId] = useState<string | null>(
    mails[0]?.id || null,
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter logic
  const filteredMails = mails.filter((mail) => {
    const matchSearch =
      mail.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mail.senderNisn && mail.senderNisn.includes(searchQuery)) ||
      (mail.submissionId &&
        mail.submissionId.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRead =
      activeFilter === "unread"
        ? !mail.isRead || mail.id === selectedMailId
        : true;

    const matchCategory =
      selectedCategory === "Semua" ||
      (selectedCategory === "tracer_submission" &&
        mail.category === "tracer_submission") ||
      (selectedCategory === "inquiry" && mail.category === "inquiry") ||
      (selectedCategory === "feedback" && mail.category === "feedback");

    return matchSearch && matchRead && matchCategory;
  });

  const selectedMail =
    mails.find((m) => m.id === selectedMailId) ||
    filteredMails.find((m) => m.id === selectedMailId) ||
    filteredMails[0] ||
    mails[0] ||
    null;

  const handleSelectMail = (mail: MailItem) => {
    setSelectedMailId(mail.id);
    if (!mail.isRead) {
      markAsRead(mail.id);
    }
  };

  const handleMarkAllRead = () => {
    markAllAsRead(role, userNisn);
    showToast("Semua pesan ditandai telah dibaca.");
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteMail(deleteConfirmId);
      showToast("Pesan berhasil dihapus.");
      if (selectedMailId === deleteConfirmId) {
        const remaining = mails.filter((m) => m.id !== deleteConfirmId);
        setSelectedMailId(remaining[0]?.id || null);
      }
      setDeleteConfirmId(null);
    }
  };

  const handleAction = (mail: MailItem) => {
    if (!mail.actionUrl) return;
    if (onNavigateTab) {
      onNavigateTab(mail.actionUrl.tab, mail.actionUrl.respondentId);
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

      if (diffMins < 1) return "Baru saja";
      if (diffMins < 60) return `${diffMins} mnt lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      if (diffDays === 1) return "Kemarin";
      return `${diffDays} hari lalu`;
    } catch {
      return dateStr;
    }
  };

  const getCategoryLabel = (category: MailItem["category"]) => {
    switch (category) {
      case "tracer_submission":
        return "Isian Tracer Baru";
      case "verification_update":
        return "Pembaruan Verifikasi";
      case "inquiry":
        return "Pertanyaan";
      case "feedback":
        return "Saran & Masukan";
      default:
        return "Pemberitahuan";
    }
  };

  const tracerCount = mails.filter(
    (m) => m.category === "tracer_submission",
  ).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#0d2346] text-white rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#0d2346]" />
            <span>Pesan & Kotak Masuk Alumni</span>
          </h1>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-[#0d2346] hover:bg-[#163868] text-white text-xs font-semibold shadow-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Pesan</p>
            <p className="text-2xl font-bold text-[#0d2346] mt-1">
              {mails.length}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Pesan masuk di sistem
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Belum Dibaca</p>
            <p className="text-2xl font-bold text-[#0d2346] mt-1">
              {unreadCount}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Perlu perhatian admin
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Tracer Baru</p>
            <p className="text-2xl font-bold text-[#0d2346] mt-1">
              {tracerCount}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Siap diverifikasi
            </p>
          </div>
        </div>
      </div>

      {/* Main Mail Center: 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: List & Filter (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Search & Tabs */}
          <div className="p-4 border-b border-slate-200 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama alumni, NISN, atau subjek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0d2346] focus:border-[#0d2346] transition"
              />
            </div>

            {/* Read/Unread Filter */}
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                    activeFilter === "all"
                      ? "bg-[#0d2346] text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  Semua ({mails.length})
                </button>
                <button
                  onClick={() => setActiveFilter("unread")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                    activeFilter === "unread"
                      ? "bg-[#0d2346] text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  Belum Dibaca ({unreadCount})
                </button>
              </div>

              <span className="text-[11px] text-slate-400">
                {filteredMails.length} pesan
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-[11px]">
              {[
                { id: "Semua", label: "Semua Kategori" },
                { id: "tracer_submission", label: "Isian Tracer" },
                { id: "inquiry", label: "Pertanyaan" },
                { id: "feedback", label: "Masukan" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer transition font-medium border ${
                    selectedCategory === cat.id
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mail Items List */}
          <div className="divide-y divide-slate-100 max-h-[560px] overflow-y-auto">
            {filteredMails.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                  <Inbox className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  Tidak ada pesan
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Coba sesuaikan kata kunci pencarian atau filter.
                </p>
              </div>
            ) : (
              filteredMails.map((mail) => {
                const isSelected = selectedMail?.id === mail.id;

                return (
                  <div
                    key={mail.id}
                    onClick={() => handleSelectMail(mail)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all relative border-l-4 ${
                      isSelected
                        ? "bg-slate-100/90 border-[#0d2346] shadow-2xs"
                        : mail.isRead
                          ? "bg-white border-transparent hover:bg-slate-50 hover:border-slate-300"
                          : "bg-slate-50/70 border-transparent hover:bg-slate-100/70 hover:border-slate-300 font-semibold"
                    }`}
                  >
                    {!mail.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#0d2346] shrink-0 mt-1.5" />
                    )}

                    <UserAvatar
                      name={mail.senderName}
                      gender={mail.senderAvatarGender}
                      className="w-8 h-8 shrink-0 border border-slate-200"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {mail.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1 font-normal">
                          <Clock className="w-2.5 h-2.5" />
                          {formatTimeAgo(mail.createdAt)}
                        </span>
                      </div>

                      <p
                        className={`text-xs truncate mb-1 ${
                          !mail.isRead
                            ? "font-bold text-[#0d2346]"
                            : "font-medium text-slate-700"
                        }`}
                      >
                        {mail.subject}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {getCategoryLabel(mail.category)}
                        </span>
                        {mail.submissionId && (
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-600 bg-white border border-slate-200">
                            {mail.submissionId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Message Reader (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {selectedMail ? (
            <div>
              {/* Message Header */}
              <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <UserAvatar
                    name={selectedMail.senderName}
                    gender={selectedMail.senderAvatarGender}
                    className="w-11 h-11 shrink-0 border border-slate-200"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold text-slate-900">
                        {selectedMail.senderName}
                      </h2>
                      {selectedMail.senderMajor && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {selectedMail.senderMajor}{" "}
                          {selectedMail.senderGradYear
                            ? `(${selectedMail.senderGradYear})`
                            : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedMail.senderEmail}
                      {selectedMail.senderNisn
                        ? ` • NISN: ${selectedMail.senderNisn}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400 block">
                    {new Date(selectedMail.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {getCategoryLabel(selectedMail.category)}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    SUBJEK PESAN
                  </span>
                  <h3 className="text-base font-bold text-[#0d2346]">
                    {selectedMail.subject}
                  </h3>
                </div>

                {selectedMail.submissionId && (
                  <div className="inline-flex items-center gap-2 text-xs font-medium">
                    <span>
                      Nomor Pengajuan Tracer Study:{" "}
                      <strong className="font-mono text-slate-900">
                        {selectedMail.submissionId}
                      </strong>
                    </span>
                  </div>
                )}

                <div className="p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {selectedMail.body}
                </div>
              </div>

              {/* Message Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleDelete(selectedMail.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Pesan</span>
                </button>

                <div className="flex items-center gap-2.5">
                  {selectedMail.actionUrl && (
                    <button
                      onClick={() => handleAction(selectedMail)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0d2346] hover:bg-[#163868] shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{selectedMail.actionUrl.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Pilih pesan untuk membaca
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pilih salah satu pesan di sebelah kiri untuk melihat rincian isi
                pesan secara lengkap.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom System Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Pesan Masuk?"
        message="Pesan yang dihapus akan dibersihkan dari kotak masuk sistem dan tidak dapat dipulihkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
};
