import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { AdminLayout } from './components/admin/AdminLayout';
import { InstructorLayout } from './components/instructor/InstructorLayout';
import { AdminRoute, InstructorRoute } from './components/ProtectedRoute';

// Public pages
import { Landing } from './pages/Landing';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Learn } from './pages/Learn';
import { Dashboard } from './pages/Dashboard';
import { Login, Register } from './pages/Auth';
import { NotFound } from './pages/NotFound';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CourseManagement } from './pages/admin/CourseManagement';
import { CourseForm } from './pages/admin/CourseForm';
import { UserManagement } from './pages/admin/UserManagement';
import { PaymentHistory } from './pages/admin/PaymentHistory';
import { InstructorManagement } from './pages/admin/InstructorManagement';
import { ReviewModeration } from './pages/admin/ReviewModeration';
import { AdminSettings } from './pages/admin/AdminSettings';

// Instructor pages
import { InstructorDashboard } from './pages/instructor/InstructorDashboard';
import { InstructorCourses } from './pages/instructor/InstructorCourses';
import { InstructorRevenue } from './pages/instructor/InstructorRevenue';
import { InstructorStudents } from './pages/instructor/InstructorStudents';

function AnimatedRoutes() {
  const location = useLocation();
  const isLearnPage = location.pathname.startsWith('/learn/');
  const isAdminPage = location.pathname.startsWith('/admin');
  const isInstructorPage = location.pathname.startsWith('/instructor');
  const hideNavbar = isLearnPage || isAdminPage || isInstructorPage;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/learn/:slug/:lessonId" element={<Learn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="courses/new" element={<CourseForm />} />
            <Route path="courses/:id" element={<CourseForm />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="instructors" element={<InstructorManagement />} />
            <Route path="reviews" element={<ReviewModeration />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Instructor */}
          <Route path="/instructor" element={<InstructorRoute><InstructorLayout /></InstructorRoute>}>
            <Route index element={<InstructorDashboard />} />
            <Route path="courses" element={<InstructorCourses />} />
            <Route path="courses/new" element={<CourseForm />} />
            <Route path="courses/:id" element={<CourseForm />} />
            <Route path="revenue" element={<InstructorRevenue />} />
            <Route path="students" element={<InstructorStudents />} />
          </Route>

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
