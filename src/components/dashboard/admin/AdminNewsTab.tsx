import React, { useState } from "react";
import { useContentStore } from "@/store/contentStore";
import { NewsItem } from "@/types/tracer";
import {
  Newspaper,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Calendar,
  Clock,
  User,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const CATEGORIES = [
  "Semua",
  "BKK & Karir",
  "Tracer Study",
  "Kemitraan DUDI",
  "Fasilitas",
  "Panduan Karir",
  "Sertifikasi",
  "Prestasi Alumni",
];

const SAMPLE_IMAGES = [
  {
    name: "Workshop & Mesin",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pertemuan Industri",
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lab Jaringan & Komputer",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kerjasama Korporat",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Konseling & Alumni",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];

export const AdminNewsTab: React.FC = () => {
  const { newsList, addNews, updateNews, deleteNews } = useContentStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("BKK & Karir");
  const [author, setAuthor] = useState("Tim Humas BKK");
  const [readTime, setReadTime] = useState("3 min read");
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingNews(null);
    setTitle("");
    setCategory("BKK & Karir");
    setAuthor("Tim Humas BKK");
    setReadTime("3 min read");
    setImageUrl(SAMPLE_IMAGES[0].url);
    setExcerpt("");
    setContent("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: NewsItem) => {
    setEditingNews(item);
    setTitle(item.title);
    setCategory(item.category);
    setAuthor(item.author);
    setReadTime(item.readTime);
    setImageUrl(item.imageUrl);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert("Harap isi judul, ringkasan, dan konten berita.");
      return;
    }

    const todayStr = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (editingNews) {
      updateNews(editingNews.id, {
        title: title.trim(),
        category,
        author: author.trim() || "Tim Humas BKK",
        readTime: readTime.trim() || "3 min read",
        imageUrl: imageUrl.trim() || SAMPLE_IMAGES[0].url,
        excerpt: excerpt.trim(),
        content: content.trim(),
      });
      showToast("Berita berhasil diperbarui dan disinkronkan ke Landing Page!");
    } else {
      addNews({
        title: title.trim(),
        category,
        author: author.trim() || "Tim Humas BKK",
        readTime: readTime.trim() || "3 min read",
        imageUrl: imageUrl.trim() || SAMPLE_IMAGES[0].url,
        excerpt: excerpt.trim(),
        content: content.trim(),
        date: todayStr,
      });
      showToast(
        "Berita baru berhasil dibuat dan langsung tampil di Landing Page!",
      );
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteNews(id);
    setDeleteConfirmId(null);
    showToast("Berita berhasil dihapus dari sistem.");
  };

  // Filtered News
  const filteredNews = newsList.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#0d2346] text-white rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/40 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d2346] via-[#122e5d] to-[#182945] rounded-md p-5 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Kelola Berita & Informasi BKK
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Berita Baru</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Total Berita Publish
            </p>
            <p className="text-2xl font-black text-[#0d2346] mt-1">
              {newsList.length}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
              Tayang di Landing Page
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Kategori Aktif
            </p>
            <p className="text-2xl font-black text-[#0d2346] mt-1">
              {new Set(newsList.map((n) => n.category)).size}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Topik informasi BKK
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Update Terakhir
            </p>
            <p className="text-sm font-bold text-[#0d2346] mt-2">
              {newsList[0]?.date || "-"}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate max-w-[170px]">
              {newsList[0]?.title || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, ringkasan, atau penulis berita..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0d2346] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Menampilkan <strong>{filteredNews.length}</strong> dari{" "}
              {newsList.length} berita
            </span>
          </div>
        </div>

        {/* Category Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0d2346] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNews.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Newspaper className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Tidak ada berita ditemukan
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Coba gunakan kata kunci pencarian yang berbeda atau pilih kategori
              lain.
            </p>
          </div>
        ) : (
          filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Image & Category Overlay */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = SAMPLE_IMAGES[0].url;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#0d2346]/90 text-white backdrop-blur-xs shadow-sm">
                      {news.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {news.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {news.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0d2346] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>
                      Oleh:{" "}
                      <strong className="text-slate-600">{news.author}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <a
                  href={`/berita/${news.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                  title="Lihat halaman berita publik"
                >
                  <span>Lihat di Web</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(news)}
                    className="p-2 rounded-lg text-slate-600 hover:text-[#0d2346] hover:bg-slate-100 transition cursor-pointer"
                    title="Edit Berita"
                    aria-label="Edit Berita"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(news.id)}
                    className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                    title="Hapus Berita"
                    aria-label="Hapus Berita"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0d2346] to-[#182945] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-[#ffc72c]">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingNews
                      ? "Edit Berita / Pengumuman"
                      : "Buat Berita Baru"}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Berita akan langsung ditampilkan pada bagian Berita di
                    Landing Page.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto"
            >
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Judul Berita / Pengumuman{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pembukaan Rekrutmen PT Toyota Motor Manufacturing Indonesia Batch 2"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Kategori <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Penulis / Redaksi
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Contoh: Tim Humas BKK"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Estimasi Baca
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Contoh: 3 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Sample Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  URL Gambar Sampul (Cover Image)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  />
                </div>

                {/* Preset Image Options */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Pilih Gambar Siap Pakai:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setImageUrl(img.url)}
                        className={`px-2 py-1 rounded-md text-[10px] font-semibold border transition cursor-pointer ${
                          imageUrl === img.url
                            ? "bg-[#0d2346] text-white border-[#0d2346]"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Preview Box */}
                {imageUrl && (
                  <div className="mt-2.5 h-32 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          SAMPLE_IMAGES[0].url;
                      }}
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold">
                      Preview Cover
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Ringkasan Singkat (Excerpt){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat yang tampil di kartu berita landing page..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Isi Lengkap Berita (Paragraf){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi berita selengkapnya. Pisahkan antar-paragraf dengan baris kosong (tekan Enter dua kali)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0d2346] focus:outline-none"
                  required
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0d2346] hover:bg-[#182945] text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
                >
                  {editingNews ? "Simpan Perubahan" : "Publikasikan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Hapus Berita Ini?
            </h3>
            <p className="text-xs text-slate-500">
              Berita yang dihapus tidak akan lagi muncul di Landing Page maupun
              halaman detail berita.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
