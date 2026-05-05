// src/pages/auth/AuthPage.jsx
import { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import AuthCard from '@/features/auth/components/AuthCard';

export default function AuthPage() {
  const [mode, setMode] = useState('login');

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ width: '100%', p: 4 }}>
          <AuthCard mode={mode} onChangeMode={setMode} />
        </Paper>
      </Box>
    </Container>
  );
}
