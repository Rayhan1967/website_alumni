import React, { useState } from 'react';
import { MOCK_FAQS } from '@/lib/mockData';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Headphones,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const HelpdeskTab: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    setSubmittedTicket(true);
    setTimeout(() => {
      setSubmittedTicket(false);
      setTicketSubject('');
      setTicketMessage('');
      alert('Tiket bantuan Anda telah dikirim ke Tim BKK Sasmita Jaya 2!');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-blue-600" />
          <span>Pusat Bantuan & Layanan BKK</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Konsultasi karir, bantuan verifikasi ijazah, atau kendala pengisian tracer study
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-emerald-950">WhatsApp BKK Hotline</h3>
            <p className="text-xs text-emerald-700">Pelayanan Senin - Jumat (08.00 - 16.00)</p>
            <a
              href="https://wa.me/6281298765432"
              target="_blank"
              rel="noreferrer"
              className="inline-block pt-1 text-xs font-bold text-emerald-800 hover:underline"
            >
              +62 812-9876-5432 ➜
            </a>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-blue-950">Email Resmi BKK</h3>
            <p className="text-xs text-blue-700">Untuk kemitraan DUDI & sertifikasi</p>
            <a
              href="mailto:bkk@smksasmitajaya2.sch.id"
              className="inline-block pt-1 text-xs font-bold text-blue-800 hover:underline"
            >
              bkk@smksasmitajaya2.sch.id ➜
            </a>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-900">Loket Fisik Tata Usaha</h3>
            <p className="text-xs text-slate-600">Gedung SMK Sasmita Jaya 2 Pamulang Barat</p>
            <span className="inline-block pt-1 text-xs font-bold text-slate-700">
              Loket Pelayanan Ijazah
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Form & FAQ Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Ticket Form (Left) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Kirim Pengaduan / Tiket Bantuan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tim admin BKK akan merespons pertanyaan Anda via WhatsApp atau Email
            </p>
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <Input
              label="Judul Permasalahan"
              placeholder="Contoh: Kendala Koreksi Data Ijazah / Pertanyaan Loker"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Isi Pesan / Pertanyaan
              </label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Jelaskan detail kendala Anda..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-blue-600 hover:bg-blue-700"
              isLoading={submittedTicket}
            >
              <Send className="w-3.5 h-3.5 mr-2" />
              <span>Kirim Tiket ke BKK</span>
            </Button>
          </form>
        </div>

        {/* FAQs (Right) */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Pertanyaan Umum Alumni (FAQ)</span>
          </h3>

          {MOCK_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
