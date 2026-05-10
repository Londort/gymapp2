import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotPasswordSchema } from '@/features/auth/validation/auth.schema';
import { authService } from '@/features/auth/services/auth.service';

export default function ForgotPasswordForm() {
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data) {
    setSubmitError('');
    setSuccessMessage('');

    try {
      await authService.sendResetPasswordEmail(data.email);
      setSuccessMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      setSubmitError(error.message || 'Could not send reset email');
    }
  }

  return (
    <Stack spacing={3}>
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

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Please wait...' : 'Send reset link'}
        </Button>
      </Stack>

      <Typography variant="body2" textAlign="center">
        Remember your password?{' '}
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
