import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// --- Types ---
interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  expiry: number | null; // New field to track session expiration
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
}

// --- Mock Database ---
const MOCK_DB_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@buslink.com',
    password: 'password123',
    role: 'Admin' as const,
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'User' as const,
    avatar: 'https://i.pravatar.cc/150?u=john'
  }
];

// --- Constants ---
const SESSION_DURATION_SHORT = 4 * 60 * 60 * 1000; // 4 Hours
const SESSION_DURATION_LONG = 30 * 24 * 60 * 60 * 1000; // 30 Days

// --- Store ---
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      expiry: null,

      login: async (email, password, rememberMe = false) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundUser = MOCK_DB_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          // Remove password before saving to state
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...safeUser } = foundUser;

          // Calculate Expiry
          const now = Date.now();
          const duration = rememberMe ? SESSION_DURATION_LONG : SESSION_DURATION_SHORT;
          const expiryTime = now + duration;
          
          set({ 
            user: safeUser as User, 
            isAuthenticated: true,
            expiry: expiryTime
          });
          return true;
        }

        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false, expiry: null }),
    }),
    {
      name: 'auth-storage', // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
      
      // Logic to check expiration when the app reloads (hydrates)
      onRehydrateStorage: () => (state) => {
        if (state) {
          const now = Date.now();
          // If expiry exists and current time is past expiry, logout
          if (state.expiry && now > state.expiry) {
            console.log("Session expired. Logging out.");
            state.logout();
          }
        }
      },
    }
  )
);