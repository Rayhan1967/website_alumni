import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { MOCK_IJAZAH_DATABASE } from '@/lib/mockData';
import { IjazahStatus } from '@/types/tracer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  FileCheck2,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  Printer,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const CekIjazahTab: React.FC = () => {
  const { user } = useAuthStore();
  const [searchNisn, setSearchNisn] = useState(user?.nisn || '0051234567');
  const [ijazahData, setIjazahData] = useState<IjazahStatus | null>(
    MOCK_IJAZAH_DATABASE[user?.nisn || '0051234567'] || MOCK_IJAZAH_DATABASE['0051234567']
  );
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!searchNisn.trim()) {
      setError('Masukkan NISN 10 digit');
      return;
    }

    const found = MOCK_IJAZAH_DATABASE[searchNisn.trim()];
    if (found) {
      setIjazahData(found);
    } else {
      // Create dynamic fallback record for demonstration
      setIjazahData({
        nisn: searchNisn.trim(),
        nama: user?.nama || 'Alumni SMK Sasmita',
        jurusan: user?.jurusan || 'Teknik Komputer dan Jaringan',
        tahunLulus: user?.tahun_lulus || 2024,
        statusPengambilan: 'SIAP_DIAMBIL',
        nomorIjazah: `M-SMK/K13/24/${Math.floor(1000000 + Math.random() * 9000000)}`,
        nomorSertifikatBnsp: `BNSP-LSP-${Math.floor(10000 + Math.random() * 90000)}`,
        tanggalSiap: '15 Juli 2024',
        lokasiPengambilan: 'Ruang Tata Usaha (TU) SMK Sasmita Jaya 2 Pamulang',
        persyaratan: [
          'Bebas Administrasi Keuangan (Lengkap)',
          'Bebas Pustaka Perpustakaan (Lengkap)',
          'Sidik Jari 3 Jari Tengah (Datang Langsung)',
          'Menunjukkan Bukti Pengisian Tracer Study',
        ],
        barcode: `IJZ-SASMITA-${searchNisn}`,
      });
    }
  };

  const isSiap = ijazahData?.statusPengambilan === 'SIAP_DIAMBIL' || ijazahData?.statusPengambilan === 'SUDAH_DIAMBIL';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-xl font-bold text-slate-900">
          Verifikasi & Pelacakan Status Ijazah
        </h2>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Ketik NISN (10 Digit) untuk melacak..."
            value={searchNisn}
            onChange={(e) => setSearchNisn(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Button type="submit" variant="primary" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <span>Lacak Status</span>
        </Button>
      </form>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-xl">
          {error}
        </div>
      )}

      {ijazahData && (
        <div className="space-y-4 sm:space-y-6">
          {/* Main Status Tracker Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Pemilik Ijazah</span>
                <h3 className="text-lg font-bold text-slate-900">{ijazahData.nama}</h3>
                <p className="text-xs text-slate-500">
                  NISN: {ijazahData.nisn} • {ijazahData.jurusan} (Lulus {ijazahData.tahunLulus})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                    ijazahData.statusPengambilan === 'SUDAH_DIAMBIL'
                      ? 'bg-blue-100 text-blue-800'
                      : ijazahData.statusPengambilan === 'SIAP_DIAMBIL'
                      ? 'bg-blue-100 text-slate-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {ijazahData.statusPengambilan.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <CheckCircle2 className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <h4 className="text-xs font-bold text-slate-900">1. Percetakan Ijazah</h4>
                <p className="text-[10px] text-slate-700">Selesai & Valid</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <CheckCircle2 className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <h4 className="text-xs font-bold text-slate-900">2. Sertifikat BNSP</h4>
                <p className="text-[10px] text-slate-700">Lulus Uji Kompetensi</p>
              </div>

              <div className={`p-3 rounded-xl border ${isSiap ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                <CheckCircle2 className={`w-5 h-5 mx-auto mb-1 ${isSiap ? 'text-slate-600' : 'text-slate-400'}`} />
                <h4 className={`text-xs font-bold ${isSiap ? 'text-slate-900' : 'text-slate-700'}`}>3. Siap di Loket TU</h4>
                <p className={`text-[10px] ${isSiap ? 'text-slate-700' : 'text-slate-400'}`}>
                  {ijazahData.tanggalSiap || 'Tersedia'}
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${ijazahData.statusPengambilan === 'SUDAH_DIAMBIL' ? 'bg-slate-50 border-slate-200' : 'bg-slate-50 border-slate-200'}`}>
                <Clock className={`w-5 h-5 mx-auto mb-1 ${ijazahData.statusPengambilan === 'SUDAH_DIAMBIL' ? 'text-slate-600' : 'text-slate-400'}`} />
                <h4 className={`text-xs font-bold ${ijazahData.statusPengambilan === 'SUDAH_DIAMBIL' ? 'text-slate-900' : 'text-slate-700'}`}>
                  4. Pengambilan Fisik
                </h4>
                <p className="text-[10px] text-slate-500">
                  {ijazahData.tanggalDiambil ? `Diambil: ${ijazahData.tanggalDiambil}` : 'Menunggu Siswa'}
                </p>
              </div>
            </div>

            {/* Nomor Ijazah & Barcode */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-xs text-slate-700">
                <p>
                  <strong>Nomor Seri Ijazah (DN):</strong>{' '}
                  <span className="font-mono text-blue-700 font-bold">{ijazahData.nomorIjazah}</span>
                </p>
                {ijazahData.nomorSertifikatBnsp && (
                  <p>
                    <strong>Nomor Registrasi BNSP:</strong>{' '}
                    <span className="font-mono text-blue-700 font-bold">{ijazahData.nomorSertifikatBnsp}</span>
                  </p>
                )}
                <p className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{ijazahData.lokasiPengambilan}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-slate-300 rounded-xl shadow-xs">
                  <QrCode className="w-12 h-12 text-slate-900" />
                </div>
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" />
                  <span>Cetak Tanda Pengambilan</span>
                </Button>
              </div>
            </div>

            {/* Checklist Persyaratan */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-wider text-slate-700">
                Kelengkapan Berkas Pengambilan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {ijazahData.persyaratan.map((syarat, i) => (
                  <div
                    key={i}
                    className="p-3 flex items-center gap-2.5 text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>{syarat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
