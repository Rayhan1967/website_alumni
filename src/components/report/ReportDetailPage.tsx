import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { MOCK_YEARLY_TRACER_DATA } from "@/lib/mockData";
import { JurusanYearlyStat } from "@/types/tracer";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ChevronRight } from "lucide-react";

const JURUSAN_OPTIONS_MAP: { id: string; name: string; code: string }[] = [
  { id: "ALL", name: "Semua Jurusan (Total Global)", code: "Semua" },
  { id: "tpm", name: "Teknik Pemesinan (TPM)", code: "TPM" },
  { id: "titl", name: "Teknik Instalasi Tenaga Listrik (TITL)", code: "TITL" },
  { id: "el", name: "Teknik Elektronika Industri (EL)", code: "EL" },
  { id: "tkro", name: "Teknik Kendaraan Ringan Otomotif (TKRO)", code: "TKRO" },
  { id: "tbsm", name: "Teknik dan Bisnis Sepeda Motor (TBSM)", code: "TBSM" },
  { id: "tkj", name: "Teknik Komputer dan Jaringan (TKJ)", code: "TKJ" },
];

const YEAR_OPTIONS = [
  { value: "ALL", label: "Semua Tahun (Akumulatif 2022 - 2025)" },
  { value: "2025", label: "Tahun Lulus 2025" },
  { value: "2024", label: "Tahun Lulus 2024" },
  { value: "2023", label: "Tahun Lulus 2023" },
  { value: "2022", label: "Tahun Lulus 2022" },
];

export const ReportDetailPage: React.FC = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 1. Filter States
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedJurusan, setSelectedJurusan] = useState<string>("ALL");

  // Filter raw data by year
  const rawFilteredByYear = useMemo(() => {
    if (selectedYear === "ALL") {
      return MOCK_YEARLY_TRACER_DATA;
    }
    const y = parseInt(selectedYear, 10);
    return MOCK_YEARLY_TRACER_DATA.filter((item) => item.year === y);
  }, [selectedYear]);

  // Table Data Grouped by Jurusan (TPM, TITL, EL, TKRO, TBSM, TKJ)
  const tableRows = useMemo(() => {
    const majors: JurusanYearlyStat["jurusanId"][] = [
      "tpm",
      "titl",
      "el",
      "tkro",
      "tbsm",
      "tkj",
    ];

    return majors.map((jId) => {
      const matching = rawFilteredByYear.filter(
        (item) => item.jurusanId === jId,
      );
      const totalAlumni = matching.reduce(
        (acc, curr) => acc + curr.totalAlumni,
        0,
      );
      const mengisiTracer = matching.reduce(
        (acc, curr) => acc + curr.mengisiTracer,
        0,
      );
      const bekerja = matching.reduce((acc, curr) => acc + curr.bekerja, 0);
      const kuliah = matching.reduce((acc, curr) => acc + curr.kuliah, 0);
      const wirausaha = matching.reduce((acc, curr) => acc + curr.wirausaha, 0);
      const belumKerja = matching.reduce(
        (acc, curr) => acc + curr.belumKerja,
        0,
      );

      const sample = matching[0] || {
        jurusanCode: jId.toUpperCase(),
        jurusanName: jId,
      };

      const tracerPercent =
        totalAlumni > 0
          ? ((mengisiTracer / totalAlumni) * 100).toFixed(1)
          : "0";

      return {
        id: jId,
        code: sample.jurusanCode,
        name: sample.jurusanName,
        totalAlumni,
        mengisiTracer,
        tracerPercent,
        bekerja,
        kuliah,
        wirausaha,
        belumKerja,
      };
    });
  }, [rawFilteredByYear]);

  // Total Summary Row
  const totalSummary = useMemo(() => {
    const totalAlumni = tableRows.reduce(
      (acc, curr) => acc + curr.totalAlumni,
      0,
    );
    const mengisiTracer = tableRows.reduce(
      (acc, curr) => acc + curr.mengisiTracer,
      0,
    );
    const bekerja = tableRows.reduce((acc, curr) => acc + curr.bekerja, 0);
    const kuliah = tableRows.reduce((acc, curr) => acc + curr.kuliah, 0);
    const wirausaha = tableRows.reduce((acc, curr) => acc + curr.wirausaha, 0);
    const belumKerja = tableRows.reduce(
      (acc, curr) => acc + curr.belumKerja,
      0,
    );
    const tracerPercent =
      totalAlumni > 0 ? ((mengisiTracer / totalAlumni) * 100).toFixed(1) : "0";

    return {
      totalAlumni,
      mengisiTracer,
      tracerPercent,
      bekerja,
      kuliah,
      wirausaha,
      belumKerja,
    };
  }, [tableRows]);

  // Aggregated Stats for the 3 Charts (filtered by Year and Jurusan)
  const chartStats = useMemo(() => {
    const targetData = rawFilteredByYear.filter((item) => {
      if (selectedJurusan === "ALL") return true;
      return item.jurusanId === selectedJurusan;
    });

    const totalResponden = targetData.reduce(
      (acc, curr) => acc + curr.mengisiTracer,
      0,
    );
    const bekerja = targetData.reduce((acc, curr) => acc + curr.bekerja, 0);
    const kuliah = targetData.reduce((acc, curr) => acc + curr.kuliah, 0);
    const wirausaha = targetData.reduce((acc, curr) => acc + curr.wirausaha, 0);
    const belumKerja = targetData.reduce(
      (acc, curr) => acc + curr.belumKerja,
      0,
    );

    // Kesesuaian
    const sangatSesuai = targetData.reduce(
      (acc, curr) => acc + curr.kesesuaian.sangatSesuai,
      0,
    );
    const sesuai = targetData.reduce(
      (acc, curr) => acc + curr.kesesuaian.sesuai,
      0,
    );
    const kurangSesuai = targetData.reduce(
      (acc, curr) => acc + curr.kesesuaian.kurangSesuai,
      0,
    );
    const tidakSesuai = targetData.reduce(
      (acc, curr) => acc + curr.kesesuaian.tidakSesuai,
      0,
    );

    // Skala Kerja
    const lokal = targetData.reduce(
      (acc, curr) => acc + curr.skalaKerja.lokal,
      0,
    );
    const nasional = targetData.reduce(
      (acc, curr) => acc + curr.skalaKerja.nasional,
      0,
    );
    const multinasional = targetData.reduce(
      (acc, curr) => acc + curr.skalaKerja.multinasional,
      0,
    );
    const skalaWirausaha = targetData.reduce(
      (acc, curr) => acc + curr.skalaKerja.wirausaha,
      0,
    );

    // Safe Percentage Helper
    const calcPct = (num: number, denom: number) => {
      if (!denom || denom === 0) return 0;
      return parseFloat(((num / denom) * 100).toFixed(1));
    };

    const totalKesesuaian = sangatSesuai + sesuai + kurangSesuai + tidakSesuai;
    const totalSkala = lokal + nasional + multinasional + skalaWirausaha;

    return {
      totalResponden,
      aktivitas: {
        bekerja: { count: bekerja, percent: calcPct(bekerja, totalResponden) },
        kuliah: { count: kuliah, percent: calcPct(kuliah, totalResponden) },
        wirausaha: {
          count: wirausaha,
          percent: calcPct(wirausaha, totalResponden),
        },
        belumKerja: {
          count: belumKerja,
          percent: calcPct(belumKerja, totalResponden),
        },
      },
      kesesuaian: {
        sangatSesuai: {
          count: sangatSesuai,
          percent: calcPct(sangatSesuai, totalKesesuaian),
        },
        sesuai: { count: sesuai, percent: calcPct(sesuai, totalKesesuaian) },
        kurangSesuai: {
          count: kurangSesuai,
          percent: calcPct(kurangSesuai, totalKesesuaian),
        },
        tidakSesuai: {
          count: tidakSesuai,
          percent: calcPct(tidakSesuai, totalKesesuaian),
        },
        totalLinear: calcPct(sangatSesuai + sesuai, totalKesesuaian),
      },
      skalaKerja: {
        lokal: { count: lokal, percent: calcPct(lokal, totalSkala) },
        nasional: { count: nasional, percent: calcPct(nasional, totalSkala) },
        multinasional: {
          count: multinasional,
          percent: calcPct(multinasional, totalSkala),
        },
        wirausaha: {
          count: skalaWirausaha,
          percent: calcPct(skalaWirausaha, totalSkala),
        },
      },
    };
  }, [rawFilteredByYear, selectedJurusan]);

  // Selected Jurusan display title
  const activeJurusanObj =
    JURUSAN_OPTIONS_MAP.find((j) => j.id === selectedJurusan) ||
    JURUSAN_OPTIONS_MAP[0];
  const activeYearLabel =
    YEAR_OPTIONS.find((y) => y.value === selectedYear)?.label || selectedYear;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-800">
      {/* Top Header / Sticky Navbar */}
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">
              Hasil & Laporan Tracer Study
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Header */}
      <section className="bg-[#102a4e] text-white py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Laporan Statistik Lulusan
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* 1. Filter Bar Sederhana (Bagian Atas: 2 Dropdown Sejajar) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Filter Data Evaluasi
              </h3>
              <p className="text-xs text-slate-500">
                Pilih tahun kelulusan dan program keahlian untuk memperbarui
                grafik secara otomatis
              </p>
            </div>
          </div>

          {/* The 2 Side-by-Side Dropdowns (Custom Designed) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Dropdown 1: Tahun Lulus / Periode */}
            <div>
              <label className="block text-xs font-bold text-slate-700  tracking-wider mb-2">
                Tahun Lulus / Periode
              </label>
              <CustomSelect
                value={selectedYear}
                options={YEAR_OPTIONS}
                onChange={(val) => setSelectedYear(val)}
              />
            </div>

            {/* Dropdown 2: Jurusan / Program Keahlian */}
            <div>
              <label className="block text-xs font-bold text-slate-700  tracking-wider mb-2">
                Jurusan / Program Keahlian
              </label>
              <CustomSelect
                value={selectedJurusan}
                options={JURUSAN_OPTIONS_MAP.map((j) => ({
                  value: j.id,
                  label: j.name,
                }))}
                onChange={(val) => setSelectedJurusan(val)}
              />
            </div>
          </div>

          {/* Active Filter Info Strip */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#182a4a]" />
              <span>
                Menampilkan data:{" "}
                <strong className="text-slate-900">
                  {activeJurusanObj.name}
                </strong>{" "}
                ({activeYearLabel})
              </span>
            </span>
            <span className="font-bold text-[#182a4a] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Total Responden Terhitung:{" "}
              {chartStats.totalResponden.toLocaleString("id-ID")} Orang
            </span>
          </div>
        </div>

        {/* 2. Tiga Chart Inti (Baku Standar Tracer Yayasan) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#182a4a]">
                Tiga Indikator Utama Evaluasi Lulusan
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Chart Card 1: Diagram Laju Serap / Status Aktivitas Lulusan */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="pb-3 border-b border-slate-100 mb-4">
                  <span className="text-[10px] font-bold text-[#182a4a]  tracking-wider block">
                    Indikator 1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Laju Serap & Aktivitas
                  </h3>
                </div>

                {/* Donut Chart Visual */}
                <div className="relative flex items-center justify-center my-4">
                  <svg
                    className="w-44 h-44 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-slate-100 stroke-current"
                      strokeWidth="14"
                      fill="transparent"
                    />
                    {/* Slices */}
                    {/* Bekerja: Primary Navy */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#182a4a"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={
                        251.2 -
                        (251.2 * chartStats.aktivitas.bekerja.percent) / 100
                      }
                      strokeLinecap="butt"
                      className="transition-all duration-700"
                    />
                    {/* Kuliah: Blue Accent */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={
                        251.2 -
                        (251.2 *
                          (chartStats.aktivitas.bekerja.percent +
                            chartStats.aktivitas.kuliah.percent)) /
                          100
                      }
                      style={{
                        transformOrigin: "center",
                        transform: `rotate(${(chartStats.aktivitas.bekerja.percent / 100) * 360}deg)`,
                      }}
                      strokeLinecap="butt"
                      className="transition-all duration-700"
                    />
                    {/* Wirausaha: Slate */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#64748b"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={
                        251.2 -
                        (251.2 *
                          (chartStats.aktivitas.bekerja.percent +
                            chartStats.aktivitas.kuliah.percent +
                            chartStats.aktivitas.wirausaha.percent)) /
                          100
                      }
                      style={{
                        transformOrigin: "center",
                        transform: `rotate(${
                          ((chartStats.aktivitas.bekerja.percent +
                            chartStats.aktivitas.kuliah.percent) /
                            100) *
                          360
                        }deg)`,
                      }}
                      strokeLinecap="butt"
                      className="transition-all duration-700"
                    />
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                      {chartStats.aktivitas.bekerja.percent}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 mt-1  tracking-wider">
                      Bekerja
                    </span>
                  </div>
                </div>

                {/* Legends & Breakdown */}
                <div className="space-y-2.5 mt-4">
                  {/* Bekerja */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#182a4a] shrink-0" />
                      <span className="font-semibold text-slate-800">
                        Bekerja
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-slate-500 font-normal">
                        ({chartStats.aktivitas.bekerja.count})
                      </span>
                      <span className="text-[#182a4a]">
                        {chartStats.aktivitas.bekerja.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Kuliah */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#3b82f6] shrink-0" />
                      <span className="font-semibold text-slate-800">
                        Melanjutkan Pendidikan
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-slate-500 font-normal">
                        ({chartStats.aktivitas.kuliah.count})
                      </span>
                      <span className="text-slate-900">
                        {chartStats.aktivitas.kuliah.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Wirausaha */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#64748b] shrink-0" />
                      <span className="font-semibold text-slate-800">
                        Wirausaha Mandiri
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-slate-500 font-normal">
                        ({chartStats.aktivitas.wirausaha.count})
                      </span>
                      <span className="text-slate-900">
                        {chartStats.aktivitas.wirausaha.percent}%
                      </span>
                    </div>
                  </div>

                  {/* Belum Bekerja */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-slate-300 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        Belum Kerja / Cari Kerja
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-slate-500 font-normal">
                        ({chartStats.aktivitas.belumKerja.count})
                      </span>
                      <span className="text-slate-900">
                        {chartStats.aktivitas.belumKerja.percent}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                Total Laju BMW:{" "}
                <strong className="text-slate-900">
                  {(
                    chartStats.aktivitas.bekerja.percent +
                    chartStats.aktivitas.kuliah.percent +
                    chartStats.aktivitas.wirausaha.percent
                  ).toFixed(1)}
                  %
                </strong>
              </div>
            </div>

            {/* Chart Card 2: Diagram Kesesuaian Bidang Kerja / Linieritas */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="pb-3 border-b border-slate-100 mb-4">
                  <span className="text-[10px] font-bold text-[#182a4a]  tracking-wider block">
                    Indikator 2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Kesesuaian Bidang Kerja
                  </h3>
                </div>

                {/* Big Linear Badge */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center my-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Indeks Linieritas Kompetensi
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#182a4a] mt-1">
                    {chartStats.kesesuaian.totalLinear}%
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Alumni bekerja sesuai dengan kompetensi keahlian kejuruannya
                  </p>
                </div>

                {/* Progress Bars for 4 Levels */}
                <div className="space-y-3.5 mt-5">
                  {/* Sangat Sesuai */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#182a4a]" />
                        <span>Sangat Sesuai</span>
                      </span>
                      <span className="text-slate-900 font-bold">
                        {chartStats.kesesuaian.sangatSesuai.percent}% (
                        {chartStats.kesesuaian.sangatSesuai.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#182a4a] rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.kesesuaian.sangatSesuai.percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Sesuai */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>Sesuai</span>
                      </span>
                      <span className="text-slate-900 font-bold">
                        {chartStats.kesesuaian.sesuai.percent}% (
                        {chartStats.kesesuaian.sesuai.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.kesesuaian.sesuai.percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Kurang Sesuai */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-500" />
                        <span>Kurang Sesuai</span>
                      </span>
                      <span className="text-slate-900 font-bold">
                        {chartStats.kesesuaian.kurangSesuai.percent}% (
                        {chartStats.kesesuaian.kurangSesuai.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.kesesuaian.kurangSesuai.percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Tidak Sesuai */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span>Tidak Sesuai</span>
                      </span>
                      <span className="text-slate-900 font-bold">
                        {chartStats.kesesuaian.tidakSesuai.percent}% (
                        {chartStats.kesesuaian.tidakSesuai.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-300 rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.kesesuaian.tidakSesuai.percent}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                Standar Target Linieritas Kemendikbud:{" "}
                <strong className="text-slate-900">&gt; 80%</strong>
              </div>
            </div>

            {/* Chart Card 3: Diagram Sektor / Skala Tempat Kerja */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="pb-3 border-b border-slate-100 mb-4">
                  <span className="text-[10px] font-bold text-[#182a4a]  tracking-wider block">
                    Indikator 3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Sektor & Skala Tempat Kerja
                  </h3>
                </div>

                <p className="text-xs text-slate-500 mb-4">
                  Distribusi penyerapan alumni berdasarkan jangkauan dan skala
                  tempat bekerja:
                </p>

                {/* Visual Comparative Bars */}
                <div className="space-y-3.5">
                  {/* Nasional */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">
                        Nasional / BUMN
                      </span>
                      <span className="font-extrabold text-[#182a4a]">
                        {chartStats.skalaKerja.nasional.percent}% (
                        {chartStats.skalaKerja.nasional.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#182a4a] rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.skalaKerja.nasional.percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Lokal / Wilayah */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">
                        Lokal / Wilayah (Jabodetabek)
                      </span>
                      <span className="font-extrabold text-slate-900">
                        {chartStats.skalaKerja.lokal.percent}% (
                        {chartStats.skalaKerja.lokal.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.skalaKerja.lokal.percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Multinasional / Internasional */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">
                        Multinasional / Global
                      </span>
                      <span className="font-extrabold text-slate-900">
                        {chartStats.skalaKerja.multinasional.percent}% (
                        {chartStats.skalaKerja.multinasional.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-600 rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.skalaKerja.multinasional.percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Wirausaha / Mandiri */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">
                        Wirausaha / Mandiri
                      </span>
                      <span className="font-extrabold text-slate-900">
                        {chartStats.skalaKerja.wirausaha.percent}% (
                        {chartStats.skalaKerja.wirausaha.count})
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-400 rounded-full transition-all duration-700"
                        style={{
                          width: `${chartStats.skalaKerja.wirausaha.percent}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                Mayoritas Terserap di:{" "}
                <strong className="text-slate-900">
                  Korporasi Nasional & Manufaktur
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Tabel Rekapitulasi Data (Di Bawah Chart) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#182a4a]">
                Rekapitulasi Data Tracer Study per Program Keahlian
              </h3>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
              Periode:{" "}
              <strong className="text-slate-900">
                {selectedYear === "ALL"
                  ? "Seluruh Tahun Kelulusan"
                  : `Tahun ${selectedYear}`}
              </strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-800 font-bold">
                  <th className="py-3.5 px-4 rounded-l-xl">
                    Program Keahlian (Jurusan)
                  </th>
                  <th className="py-3.5 px-4 text-center">Total Alumni</th>
                  <th className="py-3.5 px-4 text-center">Mengisi Tracer</th>
                  <th className="py-3.5 px-4 text-center">Bekerja</th>
                  <th className="py-3.5 px-4 text-center">Kuliah</th>
                  <th className="py-3.5 px-4 text-center">Wirausaha</th>
                  <th className="py-3.5 px-4 text-center rounded-r-xl">
                    Belum Kerja
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableRows.map((row) => {
                  const isSelected = selectedJurusan === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() =>
                        setSelectedJurusan(isSelected ? "ALL" : row.id)
                      }
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50/80 font-semibold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isSelected
                              ? "bg-[#182a4a] ring-2 ring-blue-200"
                              : "bg-slate-300"
                          }`}
                        />
                        <span>
                          {row.name} ({row.code})
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-800">
                        {row.totalAlumni}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#182a4a]">
                        {row.mengisiTracer}{" "}
                        <span className="text-[11px] font-normal text-slate-500">
                          ({row.tracerPercent}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-800">
                        {row.bekerja}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-800">
                        {row.kuliah}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-800">
                        {row.wirausaha}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-800">
                        {row.belumKerja}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* Summary Row */}
              <tfoot>
                <tr className="border-t-2 border-slate-300 bg-slate-100 font-extrabold text-slate-900">
                  <td className="py-4 px-4 rounded-l-xl text-slate-900">
                    Total Keseluruhan
                  </td>
                  <td className="py-4 px-4 text-center text-slate-900">
                    {totalSummary.totalAlumni}
                  </td>
                  <td className="py-4 px-4 text-center text-[#182a4a]">
                    {totalSummary.mengisiTracer}{" "}
                    <span className="text-[11px] font-bold text-slate-600">
                      ({totalSummary.tracerPercent}%)
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-900">
                    {totalSummary.bekerja}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-900">
                    {totalSummary.kuliah}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-900">
                    {totalSummary.wirausaha}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-900 rounded-r-xl">
                    {totalSummary.belumKerja}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Klik pada salah satu baris jurusan di tabel untuk memfilter 3
              chart di atas secara langsung.
            </span>
            {selectedJurusan !== "ALL" && (
              <button
                onClick={() => setSelectedJurusan("ALL")}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Reset Filter ke Semua Jurusan
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
