// src/app/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import WorkoutPage from '@/pages/WorkoutPage';
import AuthPage from '@/pages/AuthPage';

// import { useAuth } from './providers/useAuth';

export default function App() {
  // console.log(useAuth());
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts/:workoutId" element={<WorkoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
