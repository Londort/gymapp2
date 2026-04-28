// src/pages/auth/AuthPage.jsx
import { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import theme from '@/styles/theme';
import AuthForm from '@/features/auth/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ width: '100%', p: 4 }}>
          <AuthForm
            mode={mode}
            onSwitchMode={() =>
              setMode(mode === 'login' ? 'register' : 'login')
            }
          />
        </Paper>
      </Box>
    </Container>
  );
}
