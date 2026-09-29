import React, { useState } from 'react';
import { MOCK_ALUMNI_LIST } from '@/lib/mockData';
import { Input } from '@/components/ui/Input';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Users, Search, GraduationCap, Building, MapPin, Sparkles } from 'lucide-react';

export const AlumniTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [jurusanFilter, setJurusanFilter] = useState('ALL');

  const filteredAlumni = MOCK_ALUMNI_LIST.filter((alumni) => {
    const matchSearch =
      alumni.nama.toLowerCase().includes(search.toLowerCase()) ||
      alumni.pekerjaan.toLowerCase().includes(search.toLowerCase()) ||
      alumni.kota.toLowerCase().includes(search.toLowerCase());

    const matchJurusan =
      jurusanFilter === 'ALL' || alumni.jurusan.toLowerCase().includes(jurusanFilter.toLowerCase());

    return matchSearch && matchJurusan;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-xl font-bold text-slate-900">
          Direktori & Jejaring Alumni Sasmita Jaya
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Cari nama alumni, profesi, atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <CustomSelect
          value={jurusanFilter}
          onChange={(val) => setJurusanFilter(val)}
          className="w-full sm:w-56"
          options={[
            { value: 'ALL', label: 'Semua Keahlian' },
            { value: 'Komputer', label: 'TKJ & RPL' },
            { value: 'Otomotif', label: 'TKRO & TBSM' },
            { value: 'Akuntansi', label: 'Akuntansi (AKL)' },
            { value: 'Bisnis', label: 'Bisnis & Perkantoran' },
          ]}
        />
      </div>

      {/* Alumni Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {filteredAlumni.map((alumni, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-3.5">
              <UserAvatar
                name={alumni.nama}
                gender={alumni.jenisKelamin}
                className="w-12 h-12 shrink-0 border-2 border-slate-100 shadow-xs"
              />
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm text-slate-900 truncate">
                  {alumni.nama}
                </h3>
                <p className="text-[11px] text-slate-600 font-medium truncate">
                  {alumni.jurusan}
                </p>
                <span className="inline-block text-[10px] text-slate-400 font-medium">
                  Angkatan {alumni.tahunLulus}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <p className="flex items-start gap-1.5 leading-snug">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800">{alumni.pekerjaan}</span>
              </p>

              {alumni.kampus !== '-' && (
                <p className="flex items-start gap-1.5 leading-snug text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{alumni.kampus}</span>
                </p>
              )}

              <p className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{alumni.kota}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
