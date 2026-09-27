import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  IdentitasAlumni,
  StatusKegiatan,
  MasaTunggu,
  DetailKerja,
  DetailKuliah,
  DetailUsaha,
  EvaluasiPembelajaran,
  TracerSubmissionPayload,
  SubmissionResponse,
} from '@/types/tracer';

interface TracerFormState {
  currentStep: number;
  identitas: Partial<IdentitasAlumni>;
  status_kegiatan: StatusKegiatan | '';
  masa_tunggu?: MasaTunggu;
  detail_kerja: Partial<DetailKerja> | null;
  detail_kuliah: Partial<DetailKuliah> | null;
  detail_usaha: Partial<DetailUsaha> | null;
  evaluasi: Partial<EvaluasiPembelajaran>;
  agreement: boolean;
  
  // Submission result
  isSubmitted: boolean;
  lastSubmissionId: string | null;
  lastSubmittedAt: string | null;
  submissionHistory: Array<{
    id: string;
    submittedAt: string;
    payload: TracerSubmissionPayload;
  }>;

  // Actions
  setStep: (step: number) => void;
  updateIdentitas: (data: Partial<IdentitasAlumni>) => void;
  updateStatusKegiatan: (status: StatusKegiatan, masaTunggu?: MasaTunggu) => void;
  updateDetailKerja: (data: Partial<DetailKerja> | null) => void;
  updateDetailKuliah: (data: Partial<DetailKuliah> | null) => void;
  updateDetailUsaha: (data: Partial<DetailUsaha> | null) => void;
  updateEvaluasi: (data: Partial<EvaluasiPembelajaran>) => void;
  setAgreement: (agreed: boolean) => void;
  submitTracer: (payload: TracerSubmissionPayload) => Promise<SubmissionResponse>;
  resetForm: () => void;
  loadSampleData: () => void;
}

const initialIdentitas: Partial<IdentitasAlumni> = {
  nik: '',
  nisn: '',
  nama_lengkap: '',
  tahun_masuk: 2021,
  tahun_lulus: 2024,
  jurusan: 'Teknik Komputer dan Jaringan',
  no_whatsapp: '',
  email: '',
};

const initialEvaluasi: Partial<EvaluasiPembelajaran> = {
  skor_relevansi: 5,
  kompetensi_bermanfaat: ['Keahlian Teknis / Hard Skills Kejuruan', 'Komunikasi & Kerjasama Tim'],
  saran_bkk: '',
  kesediaan_dihubungi: true,
};

export const useTracerStore = create<TracerFormState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      identitas: initialIdentitas,
      status_kegiatan: 'KERJA_KULIAH',
      masa_tunggu: '1 - 3 bulan',
      detail_kerja: {
        nama_perusahaan: 'PT Solusi Teknologi Nusantara',
        jabatan: 'Technical Support',
        alamat_perusahaan: 'Jl. Raya Puspiptek No. 10, Tangerang Selatan',
        nama_atasan: 'Budi Santoso',
        kontak_atasan: '081311223344',
        sumber_info_kerja: 'BKK',
        tanggal_mulai_kerja: '2024-08',
        jenis_sertifikat: 'BNSP',
        nama_sertifikat: 'Junior Network Administrator',
        kesesuaian_jurusan: 'SANGAT_SESUAI',
      },
      detail_kuliah: {
        nama_kampus: 'Universitas Pamulang',
        alamat_kampus: 'Jl. Surya Kencana No. 1, Pamulang',
        jenjang: 'S1',
        program_studi: 'Teknik Informatika',
      },
      detail_usaha: null,
      evaluasi: initialEvaluasi,
      agreement: false,

      isSubmitted: false,
      lastSubmissionId: null,
      lastSubmittedAt: null,
      submissionHistory: [],

      setStep: (step) => set({ currentStep: Math.min(Math.max(step, 1), 5) }),

      updateIdentitas: (data) =>
        set((state) => ({ identitas: { ...state.identitas, ...data } })),

      updateStatusKegiatan: (status, masaTunggu) =>
        set({
          status_kegiatan: status,
          masa_tunggu: masaTunggu,
          // Initialize or reset child forms based on new status
          detail_kerja:
            status === 'KERJA' || status === 'KERJA_KULIAH'
              ? get().detail_kerja || {
                  nama_perusahaan: '',
                  jabatan: '',
                  alamat_perusahaan: '',
                  nama_atasan: '',
                  kontak_atasan: '',
                  sumber_info_kerja: 'BKK',
                  tanggal_mulai_kerja: '',
                  jenis_sertifikat: 'BNSP',
                  kesesuaian_jurusan: 'SANGAT_SESUAI',
                }
              : null,
          detail_kuliah:
            status === 'KULIAH' ||
            status === 'KERJA_KULIAH' ||
            status === 'WIRAUSAHA_KULIAH'
              ? get().detail_kuliah || {
                  nama_kampus: '',
                  alamat_kampus: '',
                  jenjang: 'S1',
                  program_studi: '',
                }
              : null,
          detail_usaha:
            status === 'WIRAUSAHA' || status === 'WIRAUSAHA_KULIAH'
              ? get().detail_usaha || {
                  nama_usaha: '',
                  kategori_usaha: 'Jasa',
                  alamat_usaha: '',
                  tanggal_mulai_usaha: '',
                }
              : null,
        }),

      updateDetailKerja: (data) =>
        set((state) => ({
          detail_kerja: data ? { ...state.detail_kerja, ...data } as DetailKerja : null,
        })),

      updateDetailKuliah: (data) =>
        set((state) => ({
          detail_kuliah: data ? { ...state.detail_kuliah, ...data } as DetailKuliah : null,
        })),

      updateDetailUsaha: (data) =>
        set((state) => ({
          detail_usaha: data ? { ...state.detail_usaha, ...data } as DetailUsaha : null,
        })),

      updateEvaluasi: (data) =>
        set((state) => ({ evaluasi: { ...state.evaluasi, ...data } })),

      setAgreement: (agreed) => set({ agreement: agreed }),

      submitTracer: async (payload: TracerSubmissionPayload) => {
        // Simulate REST API call with /api/v1/tracer-study contract
        await new Promise((resolve) => setTimeout(resolve, 800));

        const submissionId = `TRC-2026-${String(
          Math.floor(1000 + Math.random() * 9000)
        )}`;
        const submittedAt = new Date().toISOString();

        const response: SubmissionResponse = {
          success: true,
          message:
            'Data tracer study berhasil disimpan. Terima kasih atas partisipasi Anda.',
          data: {
            submission_id: submissionId,
            submitted_at: submittedAt,
          },
        };

        set((state) => ({
          isSubmitted: true,
          lastSubmissionId: submissionId,
          lastSubmittedAt: submittedAt,
          submissionHistory: [
            { id: submissionId, submittedAt, payload },
            ...state.submissionHistory,
          ],
        }));

        return response;
      },

      resetForm: () =>
        set({
          currentStep: 1,
          identitas: {
            nik: '',
            nisn: '',
            nama_lengkap: '',
            tahun_masuk: 2021,
            tahun_lulus: 2024,
            jurusan: 'Teknik Komputer dan Jaringan',
            no_whatsapp: '',
            email: '',
          },
          status_kegiatan: 'KERJA',
          masa_tunggu: '1 - 3 bulan',
          detail_kerja: null,
          detail_kuliah: null,
          detail_usaha: null,
          evaluasi: initialEvaluasi,
          agreement: false,
          isSubmitted: false,
        }),

      loadSampleData: () =>
        set({
          identitas: {
            nik: '3674012345670001',
            nisn: '0051234567',
            nama_lengkap: 'Ahmad Dani',
            tahun_masuk: 2021,
            tahun_lulus: 2024,
            jurusan: 'Teknik Komputer dan Jaringan',
            no_whatsapp: '081298765432',
            email: 'ahmaddani@example.com',
          },
          status_kegiatan: 'KERJA_KULIAH',
          masa_tunggu: '1 - 3 bulan',
          detail_kerja: {
            nama_perusahaan: 'PT Solusi Teknologi Nusantara',
            jabatan: 'Technical Support',
            alamat_perusahaan: 'Jl. Raya Puspiptek No. 10, Tangerang Selatan',
            nama_atasan: 'Budi Santoso',
            kontak_atasan: '081311223344',
            sumber_info_kerja: 'BKK',
            tanggal_mulai_kerja: '2024-08',
            jenis_sertifikat: 'BNSP',
            nama_sertifikat: 'Junior Network Administrator',
            kesesuaian_jurusan: 'SANGAT_SESUAI',
          },
          detail_kuliah: {
            nama_kampus: 'Universitas Pamulang',
            alamat_kampus: 'Jl. Surya Kencana No. 1, Pamulang',
            jenjang: 'S1',
            program_studi: 'Teknik Informatika',
          },
          detail_usaha: null,
          evaluasi: {
            skor_relevansi: 5,
            kompetensi_bermanfaat: [
              'Keahlian Teknis / Hard Skills Kejuruan',
              'Jaringan & Troubleshooting',
              'Komunikasi & Kerjasama Tim',
            ],
            saran_bkk: 'Perbanyak relasi loker industri di luar Tangerang Selatan.',
            kesediaan_dihubungi: true,
          },
          agreement: true,
        }),
    }),
    {
      name: 'tracer_study_sasmita2_store',
    }
  )
);
