// src/features/auth/components/AuthForm.jsx
import { Stack, Typography, TextField, Button, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, registerSchema } from '@/features/auth/auth.schema';
import { authService } from '@/features/auth/auth.service';

export default function AuthForm({ mode, onSwitchMode }) {
  const isLogin = mode === 'login';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data) {
    if (isLogin) {
      await authService.login({
        email: data.email,
        password: data.password,
      });
    } else {
      await authService.register({
        email: data.email,
        password: data.password,
      });
    }
  }

  async function handleGoogleSignIn() {
    await authService.signInWithGoogle();
  }

  function handleSwitchMode() {
    reset();
    onSwitchMode();
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {isLogin ? 'Sign in' : 'Sign up'}
      </Typography>

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

        {!isLogin && (
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
              : 'Create account'}
        </Button>
      </Stack>

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

      <Typography variant="body2" textAlign="center">
        {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        <Button
          type="button"
          disabled={isSubmitting}
          sx={{
            fontWeight: 400,
            textDecoration: 'underline',
          }}
          onClick={handleSwitchMode}
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </Button>
      </Typography>
    </Stack>
  );
}
