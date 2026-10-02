import React from 'react';
import { useAdminStore } from '@/store/adminStore';
import { Printer, X } from 'lucide-react';

interface AdminOfficialReportPrintProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOfficialReportPrint: React.FC<AdminOfficialReportPrintProps> = ({
  isOpen,
  onClose,
}) => {
  const { masterAlumni, respondents, settings } = useAdminStore();

  if (!isOpen) return null;

  const totalMaster = masterAlumni.length;
  const totalResponden = respondents.length;

  const countKerja = respondents.filter(
    (r) => r.statusKegiatan === 'KERJA' || r.statusKegiatan === 'KERJA_KULIAH'
  ).length;
  const countKuliah = respondents.filter(
    (r) => r.statusKegiatan === 'KULIAH' || r.statusKegiatan === 'WIRAUSAHA_KULIAH'
  ).length;
  const countWirausaha = respondents.filter((r) => r.statusKegiatan === 'WIRAUSAHA').length;
  const countBelumKerja = respondents.filter((r) => r.statusKegiatan === 'BELUM_KERJA').length;

  const percentKerja = totalResponden > 0 ? ((countKerja / totalResponden) * 100).toFixed(1) : '0';
  const percentKuliah = totalResponden > 0 ? ((countKuliah / totalResponden) * 100).toFixed(1) : '0';
  const percentWirausaha = totalResponden > 0 ? ((countWirausaha / totalResponden) * 100).toFixed(1) : '0';
  const percentBelumKerja = totalResponden > 0 ? ((countBelumKerja / totalResponden) * 100).toFixed(1) : '0';

  const jurusanList = [
    { code: 'TKJ', name: 'Teknik Komputer dan Jaringan' },
    { code: 'TPM', name: 'Teknik Pemesinan' },
    { code: 'TITL', name: 'Teknik Instalasi Tenaga Listrik' },
    { code: 'TEI', name: 'Teknik Elektronika Industri' },
    { code: 'TKRO', name: 'Teknik Kendaraan Ringan Otomotif' },
    { code: 'TBSM', name: 'Teknik dan Bisnis Sepeda Motor' },
  ];

  const jurusanBreakdown = jurusanList.map((j) => {
    const totalInJurusan = masterAlumni.filter((a) => a.jurusan.includes(j.name)).length;
    const respInJurusan = respondents.filter((r) => r.jurusan.includes(j.name));
    const filledCount = respInJurusan.length;
    const kerjaCount = respInJurusan.filter(
      (r) => r.statusKegiatan === 'KERJA' || r.statusKegiatan === 'KERJA_KULIAH'
    ).length;
    const kuliahCount = respInJurusan.filter(
      (r) => r.statusKegiatan === 'KULIAH' || r.statusKegiatan === 'WIRAUSAHA_KULIAH'
    ).length;
    const usahaCount = respInJurusan.filter((r) => r.statusKegiatan === 'WIRAUSAHA').length;
    const belumCount = respInJurusan.filter((r) => r.statusKegiatan === 'BELUM_KERJA').length;

    const responseRate = totalInJurusan > 0 ? Math.round((filledCount / totalInJurusan) * 100) : 0;
    const bmwRate =
      filledCount > 0 ? Math.round(((kerjaCount + kuliahCount + usahaCount) / filledCount) * 100) : 0;

    return {
      ...j,
      total: totalInJurusan,
      filled: filledCount,
      kerja: kerjaCount,
      kuliah: kuliahCount,
      usaha: usahaCount,
      belum: belumCount,
      responseRate,
      bmwRate,
    };
  });

  const currentDateFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden print:border-none print:shadow-none print:rounded-none">
        {/* Floating Action Bar (Hidden during Print) */}
        <div className="p-4 border-b border-slate-200 bg-[#0d2346] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Pratinjau Lembar Rekapitulasi Penelusuran Lulusan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer border border-white/25"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Container */}
        <div className="p-8 sm:p-12 text-slate-900 font-serif leading-relaxed bg-white print:p-6">
          {/* Official Letterhead (KOP SURAT RESMI) */}
          <div className="flex items-center justify-between pb-4 border-b-4 border-double border-slate-900 gap-4">
            <img
              src="/logo-smk.png"
              alt="Logo SMK Sasmita Jaya 2"
              className="h-24 w-auto object-contain shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo smk sasmita.png';
              }}
            />
            <div className="text-center flex-1 font-sans">
              <h4 className="text-xs sm:text-sm font-bold tracking-wider text-slate-700 uppercase">
                Yayasan Sasmita Jaya
              </h4>
              <h2 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-950 uppercase">
                {settings.namaSekolah}
              </h2>
              <p className="text-[11px] text-slate-600 font-medium">
                NPSN: {settings.npsn} • Akreditasi A Unggul
              </p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                {settings.alamatSekolah} • Telp: {settings.kontakBkk}
              </p>
            </div>
            <div className="w-20 hidden sm:block" />
          </div>

          {/* Document Title */}
          <div className="text-center my-6 font-sans">
            <h3 className="text-sm sm:text-base font-extrabold uppercase underline tracking-wide">
              LAPORAN HASIL PENELUSURAN LULUSAN (TRACER STUDY)
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              TAHUN KELULUSAN {settings.targetYear} • PERIODE PENGUMPULAN DATA TAHUN 2026
            </p>
          </div>

          {/* Ringkasan Eksekutif */}
          <div className="space-y-4 text-xs font-sans">
            <p className="text-justify leading-relaxed">
              Berdasarkan hasil penelusuran lulusan yang diselenggarakan oleh Bursa Kerja Khusus (BKK) SMK Sasmita Jaya 2 terhadap alumni tahun kelulusan <strong>{settings.targetYear}</strong>, berikut adalah rekapitulasi data keterserapan dan aktivitas alumni:
            </p>

            {/* Matrix Quick Numbers */}
            <div className="grid grid-cols-4 gap-2 text-center my-3">
              <div className="border border-slate-300 p-2.5 rounded bg-slate-50/50">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Target Lulusan</span>
                <span className="text-lg font-bold text-slate-900">{settings.targetQuota} Siswa</span>
              </div>
              <div className="border border-slate-300 p-2.5 rounded bg-slate-50/50">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Kuesioner Terisi</span>
                <span className="text-lg font-bold text-slate-900">{totalResponden} Siswa</span>
              </div>
              <div className="border border-slate-300 p-2.5 rounded bg-slate-50/50">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Tingkat Pengisian</span>
                <span className="text-lg font-bold text-emerald-700">
                  {((totalResponden / (settings.targetQuota || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="border border-slate-300 p-2.5 rounded bg-slate-50/50">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Keterserapan Lulusan</span>
                <span className="text-lg font-bold text-[#0d2346]">
                  {(Number(percentKerja) + Number(percentKuliah) + Number(percentWirausaha)).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Table 1: Rekapitulasi per Jurusan */}
            <div>
              <h5 className="font-bold text-xs uppercase mb-1.5 text-slate-800">
                1. Rekapitulasi Pengisian per Program Keahlian
              </h5>
              <table className="w-full border-collapse border border-slate-400 text-center text-[11px]">
                <thead className="bg-slate-100 font-semibold">
                  <tr>
                    <th className="border border-slate-400 p-1.5">No</th>
                    <th className="border border-slate-400 p-1.5 text-left">Program Keahlian</th>
                    <th className="border border-slate-400 p-1.5">Total Alumni</th>
                    <th className="border border-slate-400 p-1.5">Isian Masuk</th>
                    <th className="border border-slate-400 p-1.5">Bekerja</th>
                    <th className="border border-slate-400 p-1.5">Kuliah</th>
                    <th className="border border-slate-400 p-1.5">Wirausaha</th>
                    <th className="border border-slate-400 p-1.5">Mencari Kerja</th>
                    <th className="border border-slate-400 p-1.5">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {jurusanBreakdown.map((item, idx) => (
                    <tr key={item.code} className="hover:bg-slate-50">
                      <td className="border border-slate-400 p-1">{idx + 1}</td>
                      <td className="border border-slate-400 p-1 text-left font-medium">
                        {item.name} ({item.code})
                      </td>
                      <td className="border border-slate-400 p-1">{item.total}</td>
                      <td className="border border-slate-400 p-1 font-semibold">{item.filled}</td>
                      <td className="border border-slate-400 p-1">{item.kerja}</td>
                      <td className="border border-slate-400 p-1">{item.kuliah}</td>
                      <td className="border border-slate-400 p-1">{item.usaha}</td>
                      <td className="border border-slate-400 p-1">{item.belum}</td>
                      <td className="border border-slate-400 p-1 font-semibold">{item.responseRate}%</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold">
                    <td colSpan={2} className="border border-slate-400 p-1 text-center">
                      TOTAL KESELURUHAN
                    </td>
                    <td className="border border-slate-400 p-1">{totalMaster}</td>
                    <td className="border border-slate-400 p-1">{totalResponden}</td>
                    <td className="border border-slate-400 p-1">{countKerja}</td>
                    <td className="border border-slate-400 p-1">{countKuliah}</td>
                    <td className="border border-slate-400 p-1">{countWirausaha}</td>
                    <td className="border border-slate-400 p-1">{countBelumKerja}</td>
                    <td className="border border-slate-400 p-1">
                      {((totalResponden / (totalMaster || 1)) * 100).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Distribusi Aktivitas Global */}
            <div className="pt-2">
              <h5 className="font-bold text-xs uppercase mb-1.5 text-slate-800">
                2. Distribusi Aktivitas Alumni (Bekerja, Kuliah, Wirausaha)
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 border border-slate-300 rounded bg-slate-50">
                  <span className="font-medium text-slate-700 block">Bekerja di Instansi / Perusahaan</span>
                  <span className="text-base font-bold text-slate-900">{countKerja} ({percentKerja}%)</span>
                </div>
                <div className="p-2 border border-slate-300 rounded bg-slate-50">
                  <span className="font-medium text-slate-700 block">Melanjutkan Kuliah</span>
                  <span className="text-base font-bold text-slate-900">{countKuliah} ({percentKuliah}%)</span>
                </div>
                <div className="p-2 border border-slate-300 rounded bg-slate-50">
                  <span className="font-medium text-slate-700 block">Wirausaha Mandiri</span>
                  <span className="text-base font-bold text-slate-900">{countWirausaha} ({percentWirausaha}%)</span>
                </div>
                <div className="p-2 border border-slate-300 rounded bg-slate-50">
                  <span className="font-medium text-slate-700 block">Sedang Mencari Kerja</span>
                  <span className="text-base font-bold text-slate-900">{countBelumKerja} ({percentBelumKerja}%)</span>
                </div>
              </div>
            </div>

            {/* Catatan Penutup */}
            <p className="text-justify leading-relaxed pt-2">
              Data ini telah melalui proses verifikasi dan validasi oleh pengelola Bursa Kerja Khusus (BKK) SMK Sasmita Jaya 2, serta dapat digunakan sebagai dokumen pelaporan resmi sekolah.
            </p>
          </div>

          {/* Signature Block (TANDA TANGAN RESMI) */}
          <div className="mt-10 pt-6 grid grid-cols-2 gap-8 text-center text-xs font-sans">
            <div>
              <p className="font-medium text-slate-600">Mengetahui,</p>
              <p className="font-bold text-slate-900">Kepala SMK Sasmita Jaya 2</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan & Cap Sekolah)</span>
              </div>
              <p className="font-bold text-slate-950 underline">{settings.kepalaSekolah}</p>
              <p className="text-[10px] text-slate-600 font-mono">NIP. {settings.nipKepalaSekolah}</p>
            </div>

            <div>
              <p className="font-medium text-slate-600">Pamulang, {currentDateFormatted}</p>
              <p className="font-bold text-slate-900">Ketua Bursa Kerja Khusus (BKK)</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold text-slate-950 underline">{settings.ketuaBkk}</p>
              <p className="text-[10px] text-slate-600 font-mono">NIP. {settings.nipKetuaBkk}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
