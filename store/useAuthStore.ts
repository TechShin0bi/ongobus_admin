import { loginEndpoint, logoutEndpoint, refreshEndpoint } from '@/src/utils/endpoints';
import { apiClient } from '@/src/utils/httpClient';
import { AuthResponse, User } from '@/types/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  access_expiration: string | null;
  refresh_expiration: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isRefreshing: false,
      access_expiration: null,
      refresh_expiration: null,

      login: async (username: string, password: string, rememberMe = false): Promise<boolean> => {
        try {
          const response = await apiClient.post<AuthResponse>(loginEndpoint, { username, password });
          
          set({ 
            user: response.user,
            isAuthenticated: true,
            access_expiration: response.access_expiration,
            refresh_expiration: response.refresh_expiration,
          });
          
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },

      checkAuth: async (): Promise<boolean> => {
        const { access_expiration, refresh_expiration, refreshToken, logout } = get();
        
        // If no tokens, not authenticated
        if (!access_expiration || !refresh_expiration) {
          return false;
        }

        const now = new Date();
        const accessExp = new Date(access_expiration);
        const refreshExp = new Date(refresh_expiration);

        // If refresh token is expired, log out
        if (refreshExp < now) {
          await logout();
          return false;
        }

        // If access token is expired but refresh token is still valid, try to refresh
        if (accessExp < now) {
          return await refreshToken();
        }

        return true;
      },

      refreshToken: async (): Promise<boolean> => {
        const { isRefreshing, refresh_expiration } = get();
        
        if (isRefreshing) {
          return false;
        }

        // If refresh token is expired, don't try to refresh
        if (refresh_expiration && new Date(refresh_expiration) < new Date()) {
          get().logout();
          return false;
        }

        try {
          set({ isRefreshing: true });
          
          const response = await apiClient.post<AuthResponse>(refreshEndpoint);
          
          set({ 
            isAuthenticated: true,
            access_expiration: response.access_expiration,
            refresh_expiration: response.refresh_expiration,
            user: response.user
          });

          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
          return false;
        } finally {
          set({ isRefreshing: false });
        }
      },

      logout: async (): Promise<void> => {
        try {
          await apiClient.post(logoutEndpoint);
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            access_expiration: null,
            refresh_expiration: null,
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        access_expiration: state.access_expiration,
        refresh_expiration: state.refresh_expiration
      })
    }
  )
);
