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
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (identifier: string, role = 'alumni') => {
        // Quick delay to simulate authentic authentication
        await new Promise((resolve) => setTimeout(resolve, 500));

        let user: UserSession = { ...DEFAULT_MOCK_USER, role };
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
