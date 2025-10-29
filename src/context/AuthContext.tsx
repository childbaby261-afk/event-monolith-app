import { createContext } from 'react';

export type AuthData = {
  token: string;
  role: 'admin' | 'organizer' | 'attendee';
};

export interface AuthContextType {
  user: AuthData | null;
  token: string | null;
  role: AuthData['role'] | null;
  login: (token: string, role: AuthData['role']) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});
