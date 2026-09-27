import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSession } from '@/types/tracer';

interface AuthState {
  isAuthenticated: boolean;
  user: UserSession | null;
  login: (nisnOrEmail: string, role?: 'alumni' | 'admin_bkk') => Promise<boolean>;
  logout: () => void;
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
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (identifier: string, role = 'alumni') => {
        // Quick delay to simulate authentic authentication
        await new Promise((resolve) => setTimeout(resolve, 400));

        const isAdmin = identifier.toLowerCase().includes('admin') || role === 'admin_bkk';
        const baseUser = isAdmin ? DEFAULT_MOCK_ADMIN : DEFAULT_MOCK_USER;

        let user: UserSession = {
          ...baseUser,
          role: isAdmin ? 'admin_bkk' : 'alumni',
        };

        if (identifier && identifier.length === 10) {
          user.nisn = identifier;
        } else if (identifier.includes('@')) {
          user.email = identifier;
        }

        set({
          isAuthenticated: true,
          user,
        });
        return true;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
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
