import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthData } from './AuthContext'; // ✅ keep this if you're using AuthData

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthData | null>(null);

  useEffect(() => {
    const tokenRaw = localStorage.getItem('token');
    const roleRaw = localStorage.getItem('role');

    if (
      tokenRaw &&
      (roleRaw === 'admin' || roleRaw === 'organizer' || roleRaw === 'attendee')
    ) {
      setUser({ token: tokenRaw, role: roleRaw });
    }
  }, []);

  const login = (token: string, role: AuthData['role']) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token ?? null,
        role: user?.role ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
