import { Alert, Button, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { resetPasswordSchema } from '@/features/auth/validation/auth.schema';
import { authService } from '@/features/auth/services/auth.service';

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data) {
    setSubmitError('');
    setSuccessMessage('');

    try {
      await authService.updatePassword(data.password);
      setSuccessMessage('Password updated successfully.');

      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);
    } catch (error) {
      setSubmitError(error.message || 'Could not update password');
    }
  }

  return (
    <Stack spacing={3}>
      {submitError && <Alert severity="error">{submitError}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="New password"
          type="password"
          fullWidth
          disabled={isSubmitting}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="Confirm new password"
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
          {isSubmitting ? 'Please wait...' : 'Update password'}
        </Button>
      </Stack>
    </Stack>
  );
}
