import {
  Alert,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/features/auth/validation/auth.schema';
import { authService } from '@/features/auth/services/auth.service';

export default function LoginForm() {
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data) {
    setSubmitError('');

    try {
      await authService.login(data);
      navigate('/');
    } catch (error) {
      setSubmitError(error.message || 'Sign in failed');
    }
  }

  async function handleGoogleSignIn() {
    setSubmitError('');

    try {
      await authService.signInWithGoogle();
    } catch (error) {
      setSubmitError(error.message || 'Google authentication failed');
    }
  }

  return (
    <Stack spacing={3}>
      {submitError && <Alert severity="error">{submitError}</Alert>}

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          disabled={isSubmitting}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          disabled={isSubmitting}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Please wait...' : 'Sign In'}
        </Button>
      </Stack>

      <Button
        component={RouterLink}
        to="/auth/forgot-password"
        variant="text"
        disabled={isSubmitting}
        sx={{
          alignSelf: 'center',
          fontWeight: 400,
          textDecoration: 'underline',
        }}
      >
        Forgot password?
      </Button>

      <Divider>or</Divider>

      <Button
        variant="outlined"
        size="large"
        fullWidth
        disabled={isSubmitting}
        onClick={handleGoogleSignIn}
      >
        Continue with Google
      </Button>

      <Typography variant="body2" sx={{ textAlign: 'right' }}>
        Don’t have an account?{' '}
        <Button
          component={RouterLink}
          to="/auth/register"
          type="button"
          disabled={isSubmitting}
          sx={{
            fontWeight: 400,
            textDecoration: 'underline',
          }}
        >
          Sign up
        </Button>
      </Typography>
    </Stack>
  );
}
