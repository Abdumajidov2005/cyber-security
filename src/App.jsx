import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Learn } from './pages/Learn';
import { Dashboard } from './pages/Dashboard';
import { Login, Register } from './pages/Auth';
import { NotFound } from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  const isLearnPage = location.pathname.startsWith('/learn/');

  return (
    <>
      {!isLearnPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/learn/:slug/:lessonId" element={<Learn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AnimatedRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
