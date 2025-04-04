import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Simulated user storage
const users: { [email: string]: { password: string; id: string } } = {};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const user = users[email];
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    set({ user: { id: user.id, email } });
  },
  signUp: async (email, password) => {
    if (users[email]) {
      throw new Error('Email already exists');
    }
    const id = Math.random().toString(36).substr(2, 9);
    users[email] = { password, id };
    set({ user: { id, email } });
  },
  signOut: () => {
    set({ user: null });
  },
}));