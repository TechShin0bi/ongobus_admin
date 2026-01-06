import { create } from 'zustand';

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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// --- Mock Database ---
const MOCK_DB_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@buslink.com',
    password: 'password123', // In real app, this would be hashed
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'User',
    avatar: 'https://i.pravatar.cc/150?u=john'
  }
];

// --- Store ---
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = MOCK_DB_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Remove password before saving to state
      const { password, ...safeUser } = foundUser;
      
      set({ 
        user: safeUser as User, 
        isAuthenticated: true 
      });
      return true;
    }

    return false;
  },

  logout: () => set({ user: null, isAuthenticated: false }),
}));