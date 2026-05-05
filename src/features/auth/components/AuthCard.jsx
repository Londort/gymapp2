// src/features/auth/components/AuthForm.jsx
import {
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
} from '@/features/auth/validation/auth.schema';
import { authService } from '@/features/auth/services/auth.service';

export default function AuthCard({ mode, onChangeMode }) {
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgotPassword = mode === 'forgotPassword';

  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const currentSchema = isLogin
    ? loginSchema
    : isRegister
      ? registerSchema
      : forgotPasswordSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data) {
    setSubmitError('');

    try {
      if (isLogin) {
        await authService.login({
          email: data.email,
          password: data.password,
        });
      }

      if (isRegister) {
        await authService.register({
          email: data.email,
          password: data.password,
        });
      }

      if (isForgotPassword) {
        // console.log('Send reset link to:', data.email);
        await authService.sendResetPasswordEmail(data.email);
        setSuccessMessage('Password reset email sent. Check your inbox.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Authentication failed');
    }
  }

  async function handleGoogleSignIn() {
    setSubmitError('');

    try {
      await authService.signInWithGoogle();
    } catch (err) {
      setSubmitError(err.message || 'Google authentication failed');
    }
  }

  function handleChangeMode(nextMode) {
    reset();
    setSubmitError('');
    onChangeMode(nextMode);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {isLogin && 'Sign in'}
        {isRegister && 'Sign up'}
        {isForgotPassword && 'Reset password'}
      </Typography>

      {submitError && <Alert severity="error">{submitError}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

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

        {!isForgotPassword && (
          <TextField
            label="Password"
            type="password"
            fullWidth
            disabled={isSubmitting}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}

        {isRegister && (
          <TextField
            label="Confirm password"
            type="password"
            fullWidth
            disabled={isSubmitting}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Please wait...'
            : isLogin
              ? 'Sign In'
              : isRegister
                ? 'Create account'
                : 'Send reset link'}
        </Button>
      </Stack>

      {isLogin && (
        <Button
          type="button"
          variant="text"
          disabled={isSubmitting}
          onClick={() => handleChangeMode('forgotPassword')}
          sx={{
            alignSelf: 'center',
            fontWeight: 400,
            textDecoration: 'underline',
          }}
        >
          Forgot password?
        </Button>
      )}

      {!isForgotPassword && (
        <>
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
        </>
      )}

      <Typography variant="body2">
        {isLogin && 'Don’t have an account?'}
        {isRegister && 'Already have an account?'}
        {isForgotPassword && 'Remember your password?'}

        <Button
          type="button"
          disabled={isSubmitting}
          sx={{
            fontWeight: 400,
            textDecoration: 'underline',
          }}
          onClick={() => handleChangeMode(isLogin ? 'register' : 'login')}
        >
          {isLogin && 'Sign up'}
          {isRegister && 'Sign in'}
          {isForgotPassword && 'Sign in'}
        </Button>
      </Typography>
    </Stack>
  );
}
