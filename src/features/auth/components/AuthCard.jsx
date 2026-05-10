import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export default function AuthCard({ title, subtitle, children }) {
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
            <Box>
              <Typography variant="h5" fontWeight={700} textalign="right">
                {title}
              </Typography>

              {subtitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textalign="right"
                  sx={{ mt: 1 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {children}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
