// src/app/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import WorkoutPage from '@/pages/WorkoutPage';

import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        {/* Supabase password recovery redirect */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* App routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts/:workoutId" element={<WorkoutPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
