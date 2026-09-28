import React, { useState } from 'react';
import { useTracerStore } from '@/store/tracerStore';
import {
  DetailKerja,
  DetailKuliah,
  DetailUsaha,
  SumberInfoKerja,
  JenisSertifikat,
  KesesuaianJurusan,
  JenjangKuliah,
  KategoriUsaha,
} from '@/types/tracer';
import {
  SUMBER_INFO_KERJA_OPTIONS,
  JENIS_SERTIFIKAT_OPTIONS,
  KESESUAIAN_JURUSAN_OPTIONS,
  JENJANG_OPTIONS,
  KATEGORI_USAHA_OPTIONS,
} from '@/schemas/tracerSchema';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface Step3Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Details: React.FC<Step3Props> = ({ onNext, onPrev }) => {
  const {
    status_kegiatan,
    detail_kerja,
    detail_kuliah,
    detail_usaha,
    updateDetailKerja,
    updateDetailKuliah,
    updateDetailUsaha,
  } = useTracerStore();

  const [warningModal, setWarningModal] = useState<{ title: string; message: string } | null>(null);

  const isKerja =
    status_kegiatan === 'KERJA' || status_kegiatan === 'KERJA_KULIAH';
  const isKuliah =
    status_kegiatan === 'KULIAH' ||
    status_kegiatan === 'KERJA_KULIAH' ||
    status_kegiatan === 'WIRAUSAHA_KULIAH';
  const isUsaha =
    status_kegiatan === 'WIRAUSAHA' || status_kegiatan === 'WIRAUSAHA_KULIAH';
  const isBelumKerja = status_kegiatan === 'BELUM_KERJA';

  const handleKerjaChange = (field: keyof DetailKerja, value: any) => {
    updateDetailKerja({
      ...detail_kerja,
      [field]: value,
    });
  };

  const handleKuliahChange = (field: keyof DetailKuliah, value: any) => {
    updateDetailKuliah({
      ...detail_kuliah,
      [field]: value,
    });
  };

  const handleUsahaChange = (field: keyof DetailUsaha, value: any) => {
    updateDetailUsaha({
      ...detail_usaha,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation Check
    if (isKerja) {
      if (!detail_kerja?.nama_perusahaan || !detail_kerja?.jabatan) {
        setWarningModal({
          title: 'Lengkapi Data Pekerjaan',
          message: 'Mohon lengkapi data nama perusahaan dan jabatan kerja Anda sebelum melanjutkan.',
        });
        return;
      }
    }
    if (isKuliah) {
      if (!detail_kuliah?.nama_kampus || !detail_kuliah?.program_studi) {
        setWarningModal({
          title: 'Lengkapi Data Kuliah',
          message: 'Mohon lengkapi data nama kampus dan program studi kuliah Anda sebelum melanjutkan.',
        });
        return;
      }
    }
    if (isUsaha) {
      if (!detail_usaha?.nama_usaha || !detail_usaha?.alamat_usaha) {
        setWarningModal({
          title: 'Lengkapi Data Wirausaha',
          message: 'Mohon lengkapi data nama usaha dan alamat bisnis Anda sebelum melanjutkan.',
        });
        return;
      }
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">
          Langkah 3: Detail Informasi Kegiatan
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Formulir menyesuaikan otomatis berdasarkan status yang Anda pilih (
          <span className="font-semibold text-blue-600">{status_kegiatan}</span>)
        </p>
      </div>

      {/* 1. Formulir Blok Bekerja */}
      {isKerja && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/20 p-5 sm:p-6 space-y-5">
          <div className="text-blue-900 font-bold text-sm border-b border-blue-100 pb-3">
            A. Detail Pekerjaan & Informasi Perusahaan
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Perusahaan / Instansi"
              placeholder="Contoh: PT Solusi Teknologi Nusantara"
              value={detail_kerja?.nama_perusahaan || ''}
              onChange={(e) => handleKerjaChange('nama_perusahaan', e.target.value)}
              requiredStar
            />

            <Input
              label="Posisi / Jabatan Pekerjaan"
              placeholder="Contoh: Technical Support / Junior Programmer"
              value={detail_kerja?.jabatan || ''}
              onChange={(e) => handleKerjaChange('jabatan', e.target.value)}
              requiredStar
            />

            <div className="sm:col-span-2">
              <Input
                label="Alamat Lengkap Perusahaan"
                placeholder="Jl. Raya Puspiptek No. 10, Tangerang Selatan"
                value={detail_kerja?.alamat_perusahaan || ''}
                onChange={(e) => handleKerjaChange('alamat_perusahaan', e.target.value)}
                requiredStar
              />
            </div>

            <Input
              label="Nama Atasan Langsung / HRD"
              placeholder="Contoh: Budi Santoso"
              value={detail_kerja?.nama_atasan || ''}
              onChange={(e) => handleKerjaChange('nama_atasan', e.target.value)}
              requiredStar
            />

            <Input
              label="Kontak Telp / HP Atasan"
              placeholder="081311223344"
              value={detail_kerja?.kontak_atasan || ''}
              onChange={(e) => handleKerjaChange('kontak_atasan', e.target.value)}
              requiredStar
            />

            <Select
              label="Sumber Info Lowongan Kerja"
              value={detail_kerja?.sumber_info_kerja || 'BKK'}
              onChange={(e) =>
                handleKerjaChange('sumber_info_kerja', e.target.value as SumberInfoKerja)
              }
              requiredStar
            >
              {SUMBER_INFO_KERJA_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>

            <Input
              label="Bulan & Tahun Mulai Bekerja"
              type="month"
              value={detail_kerja?.tanggal_mulai_kerja || '2024-08'}
              onChange={(e) => handleKerjaChange('tanggal_mulai_kerja', e.target.value)}
              requiredStar
            />

            <Select
              label="Jenis Sertifikasi yang Digunakan"
              value={detail_kerja?.jenis_sertifikat || 'BNSP'}
              onChange={(e) =>
                handleKerjaChange('jenis_sertifikat', e.target.value as JenisSertifikat)
              }
              requiredStar
            >
              {JENIS_SERTIFIKAT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>

            {detail_kerja?.jenis_sertifikat !== 'TIDAK_ADA' && (
              <Input
                label="Nama Sertifikat Kompetensi"
                placeholder="Contoh: Junior Network Administrator"
                value={detail_kerja?.nama_sertifikat || ''}
                onChange={(e) => handleKerjaChange('nama_sertifikat', e.target.value)}
                requiredStar
              />
            )}

            <div className={detail_kerja?.jenis_sertifikat === 'TIDAK_ADA' ? 'sm:col-span-2' : ''}>
              <Select
                label="Kesesuaian dengan Jurusan SMK"
                value={detail_kerja?.kesesuaian_jurusan || 'SANGAT_SESUAI'}
                onChange={(e) =>
                  handleKerjaChange(
                    'kesesuaian_jurusan',
                    e.target.value as KesesuaianJurusan
                  )
                }
                requiredStar
              >
                {KESESUAIAN_JURUSAN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* 2. Formulir Blok Melanjutkan Studi / Kuliah */}
      {isKuliah && (
        <div className="rounded-xl border border-purple-200 bg-purple-50/20 p-5 sm:p-6 space-y-5">
          <div className="text-purple-900 font-bold text-sm border-b border-purple-100 pb-3">
            B. Detail Pendidikan Tinggi / Perguruan Tinggi
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Perguruan Tinggi / Kampus"
              placeholder="Contoh: Universitas Pamulang"
              value={detail_kuliah?.nama_kampus || ''}
              onChange={(e) => handleKuliahChange('nama_kampus', e.target.value)}
              requiredStar
            />

            <Select
              label="Jenjang Program Pendidikan"
              value={detail_kuliah?.jenjang || 'S1'}
              onChange={(e) =>
                handleKuliahChange('jenjang', e.target.value as JenjangKuliah)
              }
              requiredStar
            >
              {JENJANG_OPTIONS.map((jenjang) => (
                <option key={jenjang} value={jenjang}>
                  Jenjang {jenjang}
                </option>
              ))}
            </Select>

            <Input
              label="Program Studi / Jurusan Kuliah"
              placeholder="Contoh: Teknik Informatika / Manajemen"
              value={detail_kuliah?.program_studi || ''}
              onChange={(e) => handleKuliahChange('program_studi', e.target.value)}
              requiredStar
            />

            <Input
              label="Alamat Kampus (Kota / Lokasi)"
              placeholder="Jl. Surya Kencana No. 1, Pamulang"
              value={detail_kuliah?.alamat_kampus || ''}
              onChange={(e) => handleKuliahChange('alamat_kampus', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 3. Formulir Blok Wirausaha */}
      {isUsaha && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/20 p-5 sm:p-6 space-y-5">
          <div className="text-slate-900 font-bold text-sm border-b border-amber-100 pb-3">
            C. Detail Usaha Mandiri / Bisnis
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Usaha / Merk Bisnis"
              placeholder="Contoh: Bengkel Dani Motor / Maya Hijab Store"
              value={detail_usaha?.nama_usaha || ''}
              onChange={(e) => handleUsahaChange('nama_usaha', e.target.value)}
              requiredStar
            />

            <Select
              label="Kategori Bidang Usaha"
              value={detail_usaha?.kategori_usaha || 'Jasa'}
              onChange={(e) =>
                handleUsahaChange('kategori_usaha', e.target.value as KategoriUsaha)
              }
              requiredStar
            >
              {KATEGORI_USAHA_OPTIONS.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </Select>

            <div className="sm:col-span-2">
              <Input
                label="Alamat / Domisili Usaha"
                placeholder="Jl. Pajajaran No. 45, Pamulang Barat"
                value={detail_usaha?.alamat_usaha || ''}
                onChange={(e) => handleUsahaChange('alamat_usaha', e.target.value)}
                requiredStar
              />
            </div>

            <Input
              label="Bulan & Tahun Mulai Berdiri"
              type="month"
              value={detail_usaha?.tanggal_mulai_usaha || '2024-06'}
              onChange={(e) => handleUsahaChange('tanggal_mulai_usaha', e.target.value)}
              requiredStar
            />
          </div>
        </div>
      )}

      {/* 4. Blok Belum Bekerja */}
      {isBelumKerja && (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <h3 className="font-bold text-slate-800 text-base">
            BKK SMK Sasmita Jaya 2 Siap Membantu Anda
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Data Anda akan dimasukkan ke dalam daftar prioritas penyaluran lowongan kerja dan pelatihan peningkatan keterampilan dari mitra BKK kami.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <Button type="button" onClick={onPrev} variant="outline" size="md">
          Kembali
        </Button>

        <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
          Lanjut ke Evaluasi Kurikulum
        </Button>
      </div>

      {/* Warning Modal */}
      <ConfirmModal
        isOpen={Boolean(warningModal)}
        onClose={() => setWarningModal(null)}
        title={warningModal?.title || 'Perhatian'}
        message={warningModal?.message || ''}
        confirmText="Mengerti"
        type="warning"
      />
    </form>
  );
};
