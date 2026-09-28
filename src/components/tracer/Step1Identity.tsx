import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, JURUSAN_OPTIONS } from '@/schemas/tracerSchema';
import { useTracerStore } from '@/store/tracerStore';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { z } from 'zod';

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1Props {
  onNext: () => void;
}

export const Step1Identity: React.FC<Step1Props> = ({ onNext }) => {
  const { identitas, updateIdentitas, loadSampleData } = useTracerStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nik: identitas.nik || '',
      nisn: identitas.nisn || '',
      nama_lengkap: identitas.nama_lengkap || '',
      tahun_masuk: identitas.tahun_masuk || 2021,
      tahun_lulus: identitas.tahun_lulus || 2024,
      jurusan: (identitas.jurusan as any) || 'Teknik Komputer dan Jaringan',
      no_whatsapp: identitas.no_whatsapp || '',
      email: identitas.email || '',
    },
  });

  const onSubmit = (data: Step1FormData) => {
    updateIdentitas(data as any);
    onNext();
  };

  const handleFillDemo = () => {
    loadSampleData();
    setValue('nik', '3674012345670001');
    setValue('nisn', '0051234567');
    setValue('nama_lengkap', 'Ahmad Dani');
    setValue('tahun_masuk', 2021);
    setValue('tahun_lulus', 2024);
    setValue('jurusan', 'Teknik Komputer dan Jaringan');
    setValue('no_whatsapp', '081298765432');
    setValue('email', 'ahmaddani@example.com');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Langkah 1: Identifikasi Diri Alumni
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lengkapi data identitas alumni SMK Sasmita Jaya 2 dengan valid
          </p>
        </div>

        <button
          type="button"
          onClick={handleFillDemo}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
        >
          Isi Contoh Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* NIK */}
        <Input
          label="Nomor Induk Kependudukan (NIK)"
          placeholder="16 digit sesuai KTP/KK"
          maxLength={16}
          requiredStar
          error={errors.nik?.message}
          {...register('nik')}
        />

        {/* NISN */}
        <Input
          label="Nomor Induk Siswa Nasional (NISN)"
          placeholder="10 digit NISN sekolah"
          maxLength={10}
          requiredStar
          error={errors.nisn?.message}
          {...register('nisn')}
        />

        {/* Nama Lengkap */}
        <div className="sm:col-span-2">
          <Input
            label="Nama Lengkap Alumni"
            placeholder="Sesuai ijazah sekolah"
            requiredStar
            error={errors.nama_lengkap?.message}
            {...register('nama_lengkap')}
          />
        </div>

        {/* Tahun Masuk */}
        <Input
          label="Tahun Masuk Sekolah"
          type="number"
          placeholder="2021"
          requiredStar
          error={errors.tahun_masuk?.message}
          {...register('tahun_masuk', { valueAsNumber: true })}
        />

        {/* Tahun Lulus */}
        <Input
          label="Tahun Lulus Sekolah"
          type="number"
          placeholder="2024"
          requiredStar
          error={errors.tahun_lulus?.message}
          {...register('tahun_lulus', { valueAsNumber: true })}
        />

        {/* Jurusan / Kompetensi Keahlian */}
        <div className="sm:col-span-2">
          <Select
            label="Kompetensi Keahlian / Jurusan SMK"
            requiredStar
            error={errors.jurusan?.message}
            {...register('jurusan')}
          >
            {JURUSAN_OPTIONS.map((jurusan) => (
              <option key={jurusan} value={jurusan}>
                {jurusan}
              </option>
            ))}
          </Select>
        </div>

        {/* No WhatsApp */}
        <Input
          label="Nomor WhatsApp Aktif"
          placeholder="081234567890"
          requiredStar
          error={errors.no_whatsapp?.message}
          {...register('no_whatsapp')}
        />

        {/* Email */}
        <Input
          label="Alamat Email Aktif"
          type="email"
          placeholder="nama@email.com"
          requiredStar
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
        <Button type="submit" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
          Lanjut ke Status Kegiatan
        </Button>
      </div>
    </form>
  );
};
