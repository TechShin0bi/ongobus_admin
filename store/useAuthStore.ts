// In useAuthStore.ts
import { loginEndpoint, logoutEndpoint, refreshEndpoint } from '@/src/utils/endpoints';
import { apiClient } from '@/src/utils/httpClient';
import { AuthResponse, User } from '@/types/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface TokenData {
  access: string;
  refresh: string;
  access_expiration: string;
  refresh_expiration: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  tokens: TokenData | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  isRefreshing: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      tokens: null,
      isRefreshing: false,

      login: async (username: string, password: string, rememberMe = false): Promise<boolean> => {
        try {
          const response: AuthResponse = await apiClient.post<AuthResponse>(loginEndpoint, { username, password });
          const { user, ...tokens } = response;
          
          // const userData = {
          //   id: user.id.toString(),
          //   name: `${user.first_name} ${user.last_name}`.trim() || user.username,
          //   email: user.email,
          //   // avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name + ' ' + user.last_name)}`
          // };

          set({ 
            user,
            isAuthenticated: true,
            tokens
          });

          // Set auth header for subsequent requests
          apiClient.setHeader('Authorization', `Bearer ${tokens.access}`);
          
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },

      refreshToken: async () => {
        // Prevent multiple refresh attempts
        if (get().isRefreshing) {
          return false;
        }

        const { tokens } = get();
        if (!tokens?.refresh) {
          return false;
        }

        try {
          set({ isRefreshing: true });
          
          const response = await apiClient.post<Omit<AuthResponse, 'user'>>(refreshEndpoint, {
            refresh: tokens.refresh
          });

          const newTokens = {
            access: response.access,
            refresh: tokens.refresh, // Keep the same refresh token
            access_expiration: response.access_expiration,
            refresh_expiration: tokens.refresh_expiration
          };

          set({ 
            tokens: newTokens,
            isAuthenticated: true
          });

          // Update auth header
          apiClient.setHeader('Authorization', `Bearer ${newTokens.access}`);
          return true;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          // Auto-logout on refresh token failure
          get().logout();
          return false;
        } finally {
          set({ isRefreshing: false });
        }
      },

      logout: async () => {
        // Clear auth header
        await apiClient.post(logoutEndpoint)
        // apiClient.removeHeader('Authorization');
        // Clear the entire store
        set({
          user: null,
          isAuthenticated: false,
          tokens: null
        });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the tokens, not the loading state
      partialize: (state) => ({ 
        tokens: state.tokens,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Add request interceptor to handle token refresh
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If error is 401 and we haven't already tried to refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       const { refreshToken } = useAuthStore.getState();
//       const refreshed = await refreshToken();
      
//       if (refreshed) {
//         // Update the auth header and retry the original request
//         const { tokens } = useAuthStore.getState();
//         originalRequest.headers.Authorization = `Bearer ${tokens?.access}`;
//         return apiClient(originalRequest);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );