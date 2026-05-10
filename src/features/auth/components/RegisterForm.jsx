import {
  Alert,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema } from '@/features/auth/validation/auth.schema';
import { authService } from '@/features/auth/services/auth.service';

export default function RegisterForm() {
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data) {
    setSubmitError('');
    setSuccessMessage('');

    try {
      await authService.register({
        email: data.email,
        password: data.password,
      });

      setSuccessMessage(
        'Account created. Check your email to confirm registration.',
      );

      setSubmittedEmail(data.email);
    } catch (error) {
      setSubmitError(error.message || 'Registration failed');
    }
  }

  async function handleGoogleSignIn() {
    setSubmitError('');
    setSuccessMessage('');

    try {
      await authService.signInWithGoogle();
    } catch (error) {
      setSubmitError(error.message || 'Google authentication failed');
    }
  }

  return (
    <Stack spacing={3}>
      {submitError && <Alert severity="error">{submitError}</Alert>}
      {/* {successMessage && <Alert severity="success">{successMessage}</Alert>} */}
      {!successMessage && (
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

          <TextField
            label="Confirm password"
            type="password"
            fullWidth
            disabled={isSubmitting}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Create account'}
          </Button>
        </Stack>
      )}

      {successMessage && (
        <Stack spacing={3}>
          <Alert severity="success">
            Account created. Check your email <strong>{submittedEmail}</strong>{' '}
            and confirm your account before signing in.
          </Alert>

          <Button
            component={RouterLink}
            to="/auth/login"
            variant="contained"
            fullWidth
          >
            Go to sign in
          </Button>
        </Stack>
      )}

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
        Already have an account?{' '}
        <Button
          component={RouterLink}
          to="/auth/login"
          type="button"
          disabled={isSubmitting}
          sx={{
            fontWeight: 400,
            textDecoration: 'underline',
          }}
        >
          Sign in
        </Button>
      </Typography>
    </Stack>
  );
}
