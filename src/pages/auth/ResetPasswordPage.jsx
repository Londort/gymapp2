// src/pages/auth/ResetPasswordPage.jsx
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { resetPasswordSchema } from '@/features/auth/validation/auth.schema';

export default function ResetPasswordPage() {
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
    console.log('Reset password form data:', data);
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            p: 4,
            borderRadius: 1,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={700}>
              Reset password
            </Typography>

            <Stack
              component="form"
              spacing={2}
              onSubmit={handleSubmit(onSubmit)}
            >
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
        </Paper>
      </Box>
    </Container>
  );
}
