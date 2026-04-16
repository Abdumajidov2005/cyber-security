import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AuthRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  return children;
}

export function AdminRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  if (user.role !== 'admin') return <Navigate to="/login" replace />;
  return children;
}

export function InstructorRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />;
  if (user.role !== 'instructor' && user.role !== 'admin') return <Navigate to="/login" replace />;
  return children;
}
