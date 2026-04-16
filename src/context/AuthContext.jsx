import React, { createContext, useState, useCallback } from 'react';
import { mockUser } from '../data/user';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    if (email === 'admin@cyberlearn.uz' && password === 'cyber2026') {
      setUser(mockUser);
      return { success: true, role: mockUser.role };
    }
    return { success: false, error: 'Email yoki parol noto\'g\'ri' };
  }, []);

  const register = useCallback(async (data) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setUser({ ...mockUser, name: data.name, email: data.email });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isEnrolled = useCallback(
    (slug) => user?.enrolledCourses?.includes(slug) ?? false,
    [user]
  );

  const enroll = useCallback(
    (slug) => {
      if (!user) return;
      setUser((prev) => ({
        ...prev,
        enrolledCourses: [...(prev.enrolledCourses || []), slug],
        progress: {
          ...prev.progress,
          [slug]: { completed: 0, total: 0, percentage: 0 },
        },
      }));
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isEnrolled, enroll }}>
      {children}
    </AuthContext.Provider>
  );
}
