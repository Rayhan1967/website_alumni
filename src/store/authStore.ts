import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSession } from '@/types/tracer';

// 1 jam session timeout jika user tidak berada di dashboard (3.600.000 ms)
export const DASHBOARD_SESSION_TIMEOUT_MS = 60 * 60 * 1000;

interface AuthState {
  isAuthenticated: boolean;
  user: UserSession | null;
  lastDashboardActivity: number | null;
  login: (nisnOrEmail: string, role?: 'alumni' | 'admin_bkk') => Promise<boolean>;
  logout: () => void;
  recordDashboardActivity: () => void;
  checkSessionExpiry: (currentPathname: string) => boolean;
  updateUserTracerStatus: (status: 'SUDAH' | 'BELUM' | 'DRAFT', submissionId?: string) => void;
}

const DEFAULT_MOCK_USER: UserSession = {
  id: 'usr-001',
  nisn: '0051234567',
  nama: 'Ahmad Dani',
  email: 'ahmaddani@example.com',
  role: 'alumni',
  jurusan: 'Teknik Komputer dan Jaringan',
  tahun_lulus: 2024,
  tracerStatus: 'SUDAH',
  submissionId: 'TRC-2026-0001',
  submittedAt: '2026-09-26T13:38:16Z',
  jenisKelamin: 'L',
};

const DEFAULT_MOCK_ADMIN: UserSession = {
  id: 'adm-001',
  nisn: '0000000000',
  nama: 'Admin BKK Sasmita',
  email: 'admin@smksasmitajaya2.sch.id',
  role: 'admin_bkk',
  jurusan: 'Pengelola BKK & Tracer Study',
  tahun_lulus: 2020,
  tracerStatus: 'SUDAH',
  jenisKelamin: 'L',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      lastDashboardActivity: null,

      login: async (identifier: string, role = 'alumni') => {
        // Quick delay to simulate authentic authentication
        await new Promise((resolve) => setTimeout(resolve, 400));

        const cleanIdent = identifier.trim();
        const lowerIdent = cleanIdent.toLowerCase();
        const isAdmin = lowerIdent.includes('admin') || role === 'admin_bkk';

        if (isAdmin) {
          const user: UserSession = {
            ...DEFAULT_MOCK_ADMIN,
            role: 'admin_bkk',
            email: identifier.includes('@') ? identifier : DEFAULT_MOCK_ADMIN.email,
          };
          const now = Date.now();
          set({
            isAuthenticated: true,
            user,
            lastDashboardActivity: now,
          });
          return true;
        }

        // Dynamic lookup in Admin Store's master alumni list
        let foundAlumni: any = null;
        try {
          const { useAdminStore } = await import('./adminStore');
          const masterList = useAdminStore.getState().masterAlumni;
          foundAlumni = masterList.find(
            (a) =>
              a.nisn.trim() === cleanIdent ||
              a.nik.trim() === cleanIdent ||
              a.email.toLowerCase() === lowerIdent ||
              a.nama.toLowerCase() === lowerIdent
          );
        } catch {
          // Ignore if adminStore is not available
        }

        const isFemale =
          foundAlumni?.nama &&
          /^(citra|mega|olivia|qori|siti|vina|yasmin|bella|gita|indah)/i.test(
            foundAlumni.nama
          );

        let user: UserSession;
        if (foundAlumni) {
          user = {
            id: foundAlumni.id,
            nisn: foundAlumni.nisn,
            nama: foundAlumni.nama,
            email: foundAlumni.email,
            role: 'alumni',
            jurusan: foundAlumni.jurusan,
            tahun_lulus: foundAlumni.tahunLulus,
            tracerStatus: foundAlumni.statusTracer,
            submissionId: foundAlumni.submissionId,
            submittedAt: foundAlumni.submittedAt,
            jenisKelamin: isFemale ? 'P' : 'L',
          };
        } else {
          // Dynamic fallback for arbitrary NISN / Email
          const isNisn = /^\d{10}$/.test(cleanIdent);
          user = {
            ...DEFAULT_MOCK_USER,
            id: `usr-${Date.now()}`,
            nisn: isNisn ? cleanIdent : DEFAULT_MOCK_USER.nisn,
            email: cleanIdent.includes('@') ? cleanIdent : DEFAULT_MOCK_USER.email,
            nama: isNisn ? `Alumni (${cleanIdent})` : DEFAULT_MOCK_USER.nama,
            role: 'alumni',
            tracerStatus: 'BELUM',
            submissionId: undefined,
            submittedAt: undefined,
          };
        }

        const now = Date.now();
        set({
          isAuthenticated: true,
          user,
          lastDashboardActivity: now,
        });
        return true;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          lastDashboardActivity: null,
        });
      },

      recordDashboardActivity: () => {
        set({ lastDashboardActivity: Date.now() });
      },

      checkSessionExpiry: (currentPathname: string) => {
        const state = get();
        if (!state.isAuthenticated) return false;

        const now = Date.now();

        // Jika user sedang berada di halaman dashboard, perbarui waktu aktivitas dashboard
        if (currentPathname.startsWith('/dashboard')) {
          set({ lastDashboardActivity: now });
          return false;
        }

        // Jika user berada di luar dashboard:
        // Cek apakah sudah lebih dari 1 jam (DASHBOARD_SESSION_TIMEOUT_MS) sejak terakhir di dashboard
        if (state.lastDashboardActivity) {
          const elapsed = now - state.lastDashboardActivity;
          if (elapsed > DASHBOARD_SESSION_TIMEOUT_MS) {
            // Sesi kedaluwarsa karena tidak berada di dashboard selama 1 jam
            set({
              isAuthenticated: false,
              user: null,
              lastDashboardActivity: null,
            });
            return true; // Expired
          }
        } else {
          // Inisialisasi timestamp jika belum tersimpan
          set({ lastDashboardActivity: now });
        }

        return false;
      },

      updateUserTracerStatus: (status, submissionId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              tracerStatus: status,
              submissionId: submissionId || state.user.submissionId,
              submittedAt: new Date().toISOString(),
            },
          };
        });
      },
    }),
    {
      name: 'alumni_auth_session',
    }
  )
);

